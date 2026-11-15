// Every route: HTTP 200, zero console errors, zero serious/critical axe violations; then every internal link resolves.
// Needs a running server: node scripts/e2e.mjs [baseUrl]
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { readFileSync } from 'node:fs'

const base = process.argv[2] ?? 'http://localhost:3000'
const { routes } = JSON.parse(readFileSync(new URL('../content/routes.json', import.meta.url), 'utf8'))
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
// Skip the once-per-session preloader so axe and console checks see the real page.
await context.addCookies([{ name: 'auverta-seen', value: '1', url: base }])
const page = await context.newPage()

const problems = []
const links = new Set()
let errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

for (const route of routes) {
  errors = []
  const res = await page.goto(base + route, { waitUntil: 'networkidle' })
  if (res?.status() !== 200) problems.push(`${route}: HTTP ${res?.status()}`)
  await page.waitForTimeout(1500)
  for (const e of errors) problems.push(`${route}: console error: ${e.slice(0, 140)}`)
  const axe = await new AxeBuilder({ page }).analyze()
  for (const v of axe.violations.filter((v) => ['serious', 'critical'].includes(v.impact)))
    problems.push(`${route}: axe ${v.impact} ${v.id} (${v.nodes.length} nodes)`)
  const hrefs = await page.$$eval('a[href^="/"]', (a) => a.map((e) => e.getAttribute('href').split('#')[0]))
  hrefs.filter(Boolean).forEach((h) => links.add(h))
}

for (const l of links) {
  const r = await page.request.get(base + l)
  if (r.status() !== 200) problems.push(`broken link ${l}: HTTP ${r.status()}`)
}

await browser.close()
console.log(`${routes.length} routes, ${links.size} internal links checked`)
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('e2e clean')
