// Super Powers = the services. Copy from the client; links go to /services/<slug>/.
import type { Category } from './superPowerTiles'

export type SuperPower = {
  title: [string, string]
  text: string
  href: string
  imgs: string[] // files in /public/images/super-power
  tone: string
  category: Category // which tunnel tiles light up while this service is shown
}

export const SUPER_POWERS: SuperPower[] = [
  {
    title: ['Web-Development', '& Web-Designing'],
    text: 'Designing responsive, stunning web experiences that reflect your brand identity and drive digital growth.',
    href: '/services/web-design-development/', imgs: ['web.webp'], tone: 'from-violet to-plum', category: 'business',
  },
  {
    title: ['AI Content Creation', '(Images and Videos)'],
    text: 'Harnessing generative AI to craft photorealistic images, cinematic video sequences, and scroll-stopping campaign media.',
    href: '/services/ai-content/', imgs: ['ai-content.webp'], tone: 'from-pink to-wine', category: 'ai',
  },
  {
    title: ['Digital', 'Marketing'],
    text: 'Combining SEO, paid media, and conversion rate optimization to turn digital channels into predictable revenue drivers.',
    href: '/services/digital-marketing/', imgs: ['digital-marketing.webp', 'seo.webp'], tone: 'from-night to-violet', category: 'ugc',
  },
  {
    title: ['Graphic Designing', '& Video Editing'],
    text: 'Bringing your brand story to life with custom visual assets, cinematic video production, and polished post-production styling.',
    href: '/services/graphic-design-video/', imgs: ['creative.webp'], tone: 'from-wine to-plum', category: 'reel',
  },
]
