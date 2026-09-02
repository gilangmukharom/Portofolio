export type ProjectType = 'Freelance' | 'Mini Project' | 'Portfolio'

export interface Project {
  slug: string
  name: string
  summary: string
  /** Basename of the preview file in `public/img/`, extension included. */
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

export interface Topic {
  label: string
  /** Query passed through to NewsAPI via `api/news.js`. */
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
