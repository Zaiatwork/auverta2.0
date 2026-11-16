import Hero from '@/components/hero/Hero'
import ServicesTunnel from '@/components/ServicesTunnel'
import EdgeHeading from '@/components/EdgeHeading'
import EdgeStatement from '@/components/EdgeStatement'
import ValueCards from '@/components/ValueCards'

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <ServicesTunnel />
      <EdgeHeading />
      <EdgeStatement />
      <ValueCards />
    </main>
  )
}
