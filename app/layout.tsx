import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Montserrat } from 'next/font/google'
import './globals.css'
import './namma.css'
import NammaNavigation from '@/components/namma/NammaNavigation'
import NammaFooter from '@/components/namma/NammaFooter'
import CustomCursor from '@/components/common/CustomCursor'
import GSAPProvider from '@/components/providers/GSAPProvider'
import SmoothScroll from '@/components/common/SmoothScroll'
import { SITE_URL } from '@/lib/content'

const display = localFont({ src: './fonts/GHIGA.otf', weight: '400', variable: '--font-ghiga', display: 'swap' })
const body = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-montserrat', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Auverta Studio | We think, craft and design', template: '%s | Auverta Studio' },
  description: 'Auverta is a multidisciplinary creative studio: brand architecture, bespoke Next.js & Webflow development, 3D experiences, and growth.',
  openGraph: { siteName: 'Auverta Studio', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Auverta Studio' }] },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#09090F', colorScheme: 'dark' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`is-dark ${display.variable} ${body.variable}`}>
      <body className="bg-abyss text-ghost-white overflow-x-hidden antialiased">
        <GSAPProvider>
          <SmoothScroll />
          <NammaNavigation />
          <main id="main" className="page-main will-change-transform">
            {children}
            <NammaFooter />
          </main>
          <CustomCursor />
        </GSAPProvider>
      </body>
    </html>
  )
}
