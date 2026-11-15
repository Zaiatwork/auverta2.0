// Screenshots of every route at 390/768/1440 -> .shots/. Needs a running server: npm run shots [baseUrl]
import { chromium } from 'playwright'
import { mkdirSync, readFileSync } from 'node:fs'

const base = process.argv[2] ?? 'http://localhost:3000'
const { routes } = JSON.parse(readFileSync(new URL('../content/routes.json', import.meta.url), 'utf8'))
const widths = [[390, 844], [768, 1024], [1440, 900]]
mkdirSync('.shots', { recursive: true })

const browser = await chromium.launch()
for (const [w, h] of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } })
  await ctx.addCookies([{ name: 'auverta-seen', value: '1', url: base }]) // skip the first-visit preloader
  const page = await ctx.newPage()
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2500) // preloader and intro motion
    const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '_')
    await page.screenshot({ path: `.shots/${name}-${w}.png`, fullPage: true })
    console.log(`${name} ${w}`)
  }
  await ctx.close()
}
await browser.close()
