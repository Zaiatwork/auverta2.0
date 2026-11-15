import NammaHeroSection from '@/components/namma/NammaHeroSection'
import NammaVideoSection from '@/components/namma/NammaVideoSection'
import NammaIntroSection from '@/components/namma/NammaIntroSection'
import NammaLatestSection from '@/components/namma/NammaLatestSection'
import NammaHomeServices from '@/components/namma/NammaHomeServices'
import ClientMarquee from '@/components/home/ClientMarquee'
import NammaCTASection from '@/components/namma/NammaCTASection'
import { getProjects } from '@/lib/projects'

export default async function HomePage() {
  const projects = await getProjects()

  return (
    <>
      {/* 1. HERO SECTION: Giant Typography + Mousemove Image Spawner Trail */}
      <NammaHeroSection />

      {/* 2. SHOWREEL SECTION: Scroll-Driven Scale Video Container (Real Video) */}
      <NammaVideoSection />

      {/* 3. INTRO SECTION: SplitText Line Blur Scrub + Interactive Hover Images */}
      <NammaIntroSection />

      {/* 4. SELECTED PROJECTS: Tabs (Selected/Playground) + Real Video Hover Preview */}
      <NammaLatestSection projects={projects} />

      {/* 5. SERVICES: Editorial List with Real Video Expanding Hover Previews */}
      <NammaHomeServices />

      {/* 6. CLIENTS MARQUEE: Section Home Clients */}
      <ClientMarquee />

      {/* 7. CTA: Embedded Visual Headline + Magnetic Button */}
      <NammaCTASection />

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Auverta Studio',
            url: 'https://auverta.studio',
            description:
              'Auverta Studio is a creative design and development studio crafting bold brand systems and bespoke digital architectures.',
          }),
        }}
      />
    </>
  )
}
