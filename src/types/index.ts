export type ProjectType = 'Freelance' | 'Mini Project' | 'Portfolio'

export interface Project {
  slug: string
  name: string
  summary: string
  /** Full URL or app-relative path to the preview image, straight from the CMS. */
  media: string
  stack: string[]
  type: ProjectType
  github?: string
  demo?: string
  featured?: boolean
}

export type SkillGroup = 'stack' | 'tools'

export interface Skill {
  name: string
  role: string
  group: SkillGroup
  iconUrl: string
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
}

export interface SocialLink {
  label: string
  href: string
}

export interface NavItem {
  label: string
  to: string
}

export interface Stat {
  value: string
  label: string
}

export interface HeroHalf {
  label: string
  caption: string
  stack: string[]
}

export interface Profile {
  name: string
  role: string
  location: string
  email: string
  resumeUrl: string
  avatar: string
  /** Rotates inside a static sentence in the hero. */
  roles: string[]
  intro: string
  bio: string[]
  halves: { left: HeroHalf; right: HeroHalf }
}

export interface SiteSettings {
  siteTitle: string
  siteDescription: string
  ogImage: string | null
  themeDefault: 'system' | 'light' | 'dark'
  footerNote: string | null
  maintenanceMode: boolean
}

export interface Topic {
  label: string
  /** Query passed through to NewsAPI by the CMS. */
  value: string
}

export interface Article {
  id: string
  title: string
  description: string
  publishedAt: string
  imageUrl: string | null
  url: string
  source: string
}

export interface BlockAction {
  label: string | null
  href: string | null
}

/** A named piece of page copy, editable in the CMS under "Page copy". */
export interface ContentBlock {
  key: string
  page: string
  label: string
  eyebrow: string | null
  title: string | null
  description: string | null
  body: string[]
  primary: BlockAction | null
  secondary: BlockAction | null
}

/** Everything GET /api/v1/content returns, and the shape of the fallback. */
export interface SiteContent {
  profile: Profile
  settings: SiteSettings | null
  stats: Stat[]
  experience: Experience[]
  socials: SocialLink[]
  nav: NavItem[]
  projects: Project[]
  skills: Skill[]
  topics: Topic[]
  blocks: Record<string, ContentBlock>
}
