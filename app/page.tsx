import Hero from '@/components/hero/Hero'
import ServicesTunnel from '@/components/ServicesTunnel'
import EdgeScene from '@/components/EdgeScene'
import ValueCards from '@/components/ValueCards'

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <ServicesTunnel />
      <EdgeScene />
      <ValueCards />
    </main>
  )
}
