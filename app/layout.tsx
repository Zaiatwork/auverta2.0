import type { Metadata, Viewport } from 'next'
import { Boldonse, Inter } from 'next/font/google'
import './globals.css'
import { SITE_URL } from '@/lib/content'
import VideoPreloader from '@/components/common/VideoPreloader'

// Fonts from the Figma frame. Both are open-source (OFL), so nothing licensed is committed.
const display = Boldonse({ subsets: ['latin'], weight: '400', variable: '--font-boldonse', display: 'swap' })
const body = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Auverta Studio', template: '%s | Auverta Studio' },
  description: 'Auverta builds brands and growth.',
  openGraph: { siteName: 'Auverta Studio', type: 'website' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#ffffff', colorScheme: 'light' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        <VideoPreloader />
        {children}
      </body>
    </html>
  )
}
