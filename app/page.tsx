import Hero from '@/components/hero/Hero'
import ServicesTunnel from '@/components/ServicesTunnel'
import EdgeScene from '@/components/EdgeScene'
import ValueCards from '@/components/ValueCards'
import ContactCta from '@/components/contact/ContactCta'
import FaqSection from '@/components/faq/FaqSection'
import SiteFooter from '@/components/footer/SiteFooter'

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <ValueCards />
        <EdgeScene />
        <ServicesTunnel />
        <ContactCta />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  )
}
