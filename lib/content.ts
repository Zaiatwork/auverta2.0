import { SITE as SITE_BASE, NAV as NAV_BASE, FOOTER_NAV as FOOTER_NAV_BASE } from '@/content/site'

export const SITE_URL = 'https://auverta.studio'
export const CONTACT_EMAIL = 'hello@auverta.studio'
export const SITE = SITE_BASE
export const NAV = NAV_BASE
export const FOOTER_NAV = FOOTER_NAV_BASE

export interface ServiceDetail {
  slug: string
  title: string
  body: string
  tags: string[]
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: 'art-direction',
    title: 'Art Direction & Culture',
    body: 'We define the aesthetic universe of your brand. From visual metaphors to high-fidelity photography and editorial narrative, we shape how the world perceives your story.',
    tags: ['Visual Storytelling', 'Campaign Architecture', 'Creative Advisory', 'Editorial Tone'],
  },
  {
    slug: 'branding-identity',
    title: 'Brand Architecture & Systems',
    body: 'Complete visual identity systems designed to dominate in competitive spaces. Typography scales, bespoke color palettes, iconography, and exhaustive design guidelines.',
    tags: ['Brand Strategy', 'Typography Systems', 'Packaging & Print', 'Design Guidelines'],
  },
  {
    slug: 'web-design-development',
    title: 'Bespoke Next.js & Webflow',
    body: 'Ultra-fast, buttery smooth, and technically uncompromising web platforms. Clean component architectures powered by React, Next.js, Webflow, and custom headless stacks.',
    tags: ['Next.js App Router', 'Webflow Implementations', 'GSAP Motion', 'Lighthouse 95+'],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX & Product Design',
    body: 'High-conversion, human-centric interfaces engineered for friction-free digital interaction. Deep wireframing, component-driven design systems, and rapid prototyping.',
    tags: ['Wireframing & UX', 'Figma Systems', 'Interactive Prototyping', 'Accessibility'],
  },
  {
    slug: 'gsap-creative-motion',
    title: 'Fluid GSAP & Motion Systems',
    body: 'We bring static pages to life through scroll-triggered storytelling, micro-interactions, custom WebGL shaders, and 60fps smooth kinetic typography.',
    tags: ['ScrollTrigger', 'Kinetic Typography', 'WebGL Shaders', 'Lenis Smooth Scroll'],
  },
  {
    slug: 'growth-advertising',
    title: 'Creative Advertising & Growth',
    body: 'High-impact creative assets designed for customer acquisition. Converting high-ticket design into tangible revenue through performance-tested motion ad creatives.',
    tags: ['Performance Motion Ads', 'Social Systems', 'CRO & Funnels', 'Campaign Creative'],
  },
]

export const VALUES = [
  {
    num: '01',
    title: 'Uncompromising Craft',
    body: 'No generic boilerplate templates. Every frame, transition, and micro-interaction is intentionally designed and custom engineered.',
    desc: 'No generic boilerplate templates. Every frame, transition, and micro-interaction is intentionally designed and custom engineered.',
  },
  {
    num: '02',
    title: 'Extreme Performance',
    body: 'Breathtaking aesthetics shouldn’t come at the cost of slow load times. We optimize every asset, script, and layout for instant execution.',
    desc: 'Breathtaking aesthetics shouldn’t come at the cost of slow load times. We optimize every asset, script, and layout for instant execution.',
  },
  {
    num: '03',
    title: 'Direct Collaboration',
    body: 'Zero account managers, zero telephone games. You collaborate directly with the creative directors and technical architects making your project.',
    desc: 'Zero account managers, zero telephone games. You collaborate directly with the creative directors and technical architects making your project.',
  },
  {
    num: '04',
    title: 'Enduring Longevity',
    body: 'We design brand systems and digital architectures that look fresh for years to come, standing resilient above transient design fads.',
    desc: 'We design brand systems and digital architectures that look fresh for years to come, standing resilient above transient design fads.',
  },
]

export interface TechStackGroup {
  group: string
  items: string[]
}

export const TECH_STACK: TechStackGroup[] = [
  {
    group: 'ENGINEERING',
    items: ['Next.js 15 / React 19', 'TypeScript', 'Tailwind CSS', 'Node.js & Edge API'],
  },
  {
    group: 'MOTION & INTERACTION',
    items: ['GSAP 3 & ScrollTrigger', 'Lenis Smooth Scroll', 'Three.js / WebGL', 'Framer Motion'],
  },
  {
    group: 'DESIGN & IDENTITY',
    items: ['Figma Design Systems', 'Cinema 4D / Blender', 'Adobe Creative Cloud', 'Glyphs Typography'],
  },
  {
    group: 'CMS & HOSTING',
    items: ['Webflow Enterprise', 'Vercel Edge Platform', 'Sanity / Payload CMS', 'Cloudflare CDN'],
  },
]
