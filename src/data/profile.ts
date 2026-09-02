import type { Experience, SocialLink } from '@/types'

export const profile = {
  name: 'Gilang Mukharom',
  role: 'Software Engineer',
  location: 'Tangerang, Indonesia',
  email: 'gilangmukharom53@gmail.com',
  resumeUrl:
    'https://drive.google.com/file/d/1lgHqVL1YPSvG9I3Nj_NXEBCvMb4mvJ2p/view?usp=sharing',
  avatar: '/img/profile_resizes.jpg',

  /** Rotates inside a static sentence in the hero. */
  roles: ['front-end engineer', 'back-end engineer', 'software engineer', 'problem solver'],

  /** The two halves of the split hero portrait. */
  halves: {
    left: {
      label: 'Front end',
      caption: 'Interfaces people actually enjoy using',
      stack: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    },
    right: {
      label: 'Back end',
      caption: 'APIs and data that hold up under load',
      stack: ['Express', 'Prisma', 'PostgreSQL', 'Laravel'],
    },
  },

  intro:
    'I build both halves of the product — the interface people touch and the services behind it.',

  bio: [
    'I’m a software engineer based in Tangerang, Indonesia. For the past 2+ years I’ve been building enterprise web applications for Garuda Indonesia — the Internet Booking Engine, the CMS, and the Loyalty Program platform — using React, TypeScript, Laravel, Express, PostgreSQL and Prisma.',
    'I enjoy turning complex problems into reliable, fast, intuitive web applications and backend services. I design and ship RESTful APIs with Express and Prisma, wire them into modern frontend stacks, and work closely with cross-functional teams in Agile environments to deliver smooth, end-to-end experiences.',
    'My focus is helping businesses launch products that are robust, maintainable, and genuinely pleasant to use.',
  ],
} as const

export const stats = [
  { value: '2+', label: 'Years shipping production software' },
  { value: '3', label: 'Enterprise platforms at Garuda Indonesia' },
  { value: '6', label: 'Projects shipped end to end' },
] as const

export const experience: Experience[] = [
  {
    company: 'Garuda Indonesia',
    role: 'Software Engineer',
    period: '2023 — Present',
    location: 'Tangerang, Indonesia',
    highlights: [
      'Built and maintained the Internet Booking Engine (IBE) front end in React and TypeScript.',
      'Shipped a CMS used by internal teams to manage customer-facing content.',
      'Designed and delivered RESTful services for the Loyalty Program with Express, Prisma and PostgreSQL.',
      'Worked in Agile, cross-functional squads from discovery through release.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: '2021 — Present',
    location: 'Remote',
    highlights: [
      'Delivered profile sites, admin dashboards and internal tools for foundations, villages and small businesses.',
      'Stacks ranged from Laravel and CodeIgniter with MySQL to React with Express and PostgreSQL.',
    ],
  },
]

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/gilangmukharom' },
  { label: 'Email', href: `mailto:${profile.email}` },
]
