'use client'

// Fallback when the root layout itself fails: no providers, no fonts, plain inline styles.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ background: '#0b0b12', color: '#f3efff', fontFamily: 'system-ui, sans-serif', display: 'grid', placeItems: 'center', minHeight: '100vh', margin: 0 }}>
        <div style={{ textAlign: 'center', padding: 24 }}>
          <h1>Something broke.</h1>
          <p>Reload the page, or try again.</p>
          <button type="button" onClick={reset} style={{ minHeight: 44, padding: '0 24px', borderRadius: 999, border: 0, background: '#f3efff', color: '#0b0b12' }}>Retry</button>
        </div>
      </body>
    </html>
  )
}
