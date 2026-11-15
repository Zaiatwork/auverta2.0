// npm run verify: typecheck, lint, build, then against a production server: e2e (routes, console, axe, links) and Lighthouse; then npm audit.
// Stops at the first failing gate; nothing is skipped or loosened.
import { spawn, spawnSync } from 'node:child_process'

const PORT = '3100'
const base = `http://localhost:${PORT}`
const run = (cmd, args = [], env = {}) => {
  console.log(`\n> ${cmd} ${args.join(' ')}`)
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: true, env: { ...process.env, ...env } })
  if (r.status !== 0) {
    console.error(`\nverify FAILED at: ${cmd} ${args.join(' ')}`)
    process.exit(r.status ?? 1)
  }
}

run('npx', ['tsc', '--noEmit'])
run('npm', ['run', 'lint'])
run('npm', ['run', 'build'])

const server = spawn('npx', ['next', 'start', '-p', PORT], { stdio: 'inherit', shell: true })
const stop = () => spawnSync('taskkill', ['/pid', String(server.pid), '/T', '/F'], { shell: true })
process.on('exit', stop)

for (let i = 0; i < 60; i++) {
  if (await fetch(base).then((r) => r.ok, () => false)) break
  await new Promise((r) => setTimeout(r, 1000))
}

run('node', ['scripts/e2e.mjs', base])
run('npx', ['lhci', 'autorun'], { LHCI_BASE: base })
run('npm', ['audit', '--omit=dev', '--audit-level=high'])
console.log('\nverify PASSED')
