import type { NavItem } from '@/types/content'

export const SITE = {
  name: 'Auverta Studio',
  url: 'https://auverta.studio',
  promise: 'One Studio. Zero Juggling.',
  description: 'Auverta is a full-service digital agency. Brand, web, AI content, and marketing, all under one roof.',
  /** PLACEHOLDER: owner has not confirmed the public email (see content/PLACEHOLDERS.md). */
  email: 'hello@auverta.studio',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/auverta.studio' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/auverta/' },
    { label: 'Facebook', href: 'https://www.facebook.com/share/1CKadD9TnT/' },
  ],
} as const

export const NAV: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Method', href: '/method' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
]

export const FOOTER_NAV: NavItem[] = [
  ...NAV,
  { label: 'Studio', href: '/studio' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

/** Pages where the mascot sparks and cursor trail stay off. */
export const CALM_PATHS = ['/pricing', '/contact', '/privacy', '/terms']
