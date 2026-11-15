export type Mood = 'happy' | 'wow' | 'wink' | 'cool' | 'sleep'
export type Segment = 'startup' | 'small' | 'brand'

export interface Project {
  id: string
  slug: string
  title: string
  tags: string
  category: string
  client_name: string
  thumbnail_url: string
  year: string
  bg: string
  fg: string
  mood: Mood
  blurb: string
  video?: string
}

export interface NavItem {
  label: string
  href: string
}

export interface Faq {
  q: string
  a: string
}

export interface MethodStep {
  n: string
  title: string
  body: string
  when?: string
}

export interface Path {
  key: Segment
  eyebrow: string
  title: string
  body: string
  href: string
  cta: string
}
