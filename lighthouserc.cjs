// Mobile Lighthouse (default preset) on the key routes, thresholds from CLAUDE.md quality gates.
const { lighthouse } = require('./content/routes.json')
const base = process.env.LHCI_BASE ?? 'http://localhost:3100'

module.exports = {
  ci: {
    collect: { url: lighthouse.map((r) => base + r), numberOfRuns: 1 },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
}
