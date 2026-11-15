import type { Path, Segment } from '@/types/content'

export const HERO = {
  tag: 'Beyond Ordinary · Available for projects',
  lines: ['One Studio.', 'Zero Juggling.'],
  sub: 'Auverta is a full-service digital agency. Brand, web, AI content, and marketing, all under one roof.',
}

export const SEGMENTS: { key: Segment; label: string }[] = [
  { key: 'startup', label: 'Startup' },
  { key: 'small', label: 'Small business' },
  { key: 'brand', label: 'Established brand' },
]

export const MARQUEE = ['Web Design', 'AI Content', 'Branding', 'Digital Marketing', 'Video']

export const STORY = { before: ['Freelancers.', 'Tools.', 'Deadlines.', 'Sound familiar?'], after: ['Everything.', 'Under one roof.'] }

// PLACEHOLDER: no real clients, counts or results yet (see content/PLACEHOLDERS.md).
export const PROOF = {
  eyebrow: 'Trusted by',
  title: 'Proof goes here.',
  logos: 6,
  stats: [
    { value: '00+', label: 'Projects delivered' },
    { value: '00+', label: 'Brands scaled' },
    { value: '00%', label: 'Result metric' },
  ],
}

export const PATHS: Path[] = [
  { key: 'startup', eyebrow: '01 · Startups & founders', title: "Your idea's ready. Your brand isn't.", href: '/start/startups', cta: 'For startups →',
    body: 'Launch-ready brand, website, and content in one sprint. (draft copy)' },
  { key: 'small', eyebrow: '02 · Small businesses', title: 'Be found. Be chosen.', href: '/start/small-business', cta: 'For small business →',
    body: 'A professional site, search visibility, and content that works while you run the business. (draft copy)' },
  { key: 'brand', eyebrow: '03 · Established brands', title: 'One brand. Everywhere.', href: '/start/established-brands', cta: 'For brands →',
    body: 'Creative systems and content at volume, consistent across every channel. (draft copy)' },
]

export const LEVERS = [
  { name: 'Reach', body: 'More people see you.' },
  { name: 'Output', body: 'More content, faster, with AI and humans together.' },
  { name: 'Consistency', body: 'All of it looks like one brand.' },
]

export const DIVISIONS = [
  { title: 'Brand & Web', body: 'Identity, websites, and visuals that look like one brand everywhere.',
    items: [
      { label: 'Web design & development', href: '/services/web-design-development' },
      { label: 'Branding & identity', href: '/services/branding-identity' },
      { label: 'Graphic design', href: '/services/graphic-design-video' },
    ] },
  { title: 'AI Content & Growth', body: 'Generative visuals, video, and marketing that keep your channels full.',
    items: [
      { label: 'AI images & video', href: '/services/ai-content' },
      { label: 'Video editing & social content', href: '/services/graphic-design-video' },
      { label: 'SEO, paid media & conversion', href: '/services/digital-marketing' },
    ] },
]

export const IDEAS: Record<Segment, { h: string; s: string }> = {
  startup: { h: 'Launch like you mean it.', s: 'Brand, site, and content. One sprint.' },
  small: { h: 'Get found. Look the part.', s: 'A professional site and content that works for you.' },
  brand: { h: 'One look. Every channel.', s: 'Consistent creative, at the volume you need.' },
}

// PLACEHOLDER: tier names are drafts, prices unknown.
export const TIERS = [
  { name: 'Launch', fit: 'For getting live fast.' },
  { name: 'Grow', fit: 'For building momentum.' },
  { name: 'Scale', fit: 'For going bigger, everywhere.' },
]

// PLACEHOLDER: no real testimonials yet.
export const VOICES = 3

export const CTA = { lines: ['Let’s go', 'beyond', 'ordinary.'] }
