import type { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'nova-trading-analytics',
    name: 'Nova Trading Analytics',
    summary:
      'A stock analysis platform that helps traders track price movements, visualise charts, and weigh up opportunities without wading through spreadsheets.',
    media: 'nova.gif',
    stack: ['React', 'Express', 'PostgreSQL'],
    type: 'Freelance',
    github: 'https://github.com/gilangmukharom/novo',
    demo: 'https://app.nova-trading-analytics.my.id/',
    featured: true,
  },
  {
    slug: 'lingtar',
    name: 'Lingtar',
    summary:
      'A school companion app that lets parents keep track of their children from anywhere, built end to end from the API up to the responsive interface.',
    media: 'lingtar.gif',
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL'],
    type: 'Mini Project',
    github: 'https://github.com/gilangmukharom/lingtar',
    featured: true,
  },
  {
    slug: 'yayasan-nur-assyifa',
    name: 'Yayasan Nur Assyifa',
    summary:
      'A profile site for a medical foundation, with an admin side for creating and editing content and a layout that holds up on any screen.',
    media: 'nursyifa.gif',
    stack: ['CodeIgniter 4', 'Bootstrap', 'MySQL'],
    type: 'Freelance',
    github: 'https://github.com/gilangmukharom/Yayasan_Nursyifa',
    demo: 'https://yayasannurassyifasamarinda.com/',
    featured: true,
  },
  {
    slug: 'sipaldeba',
    name: 'Sipaldeba',
    summary:
      'A village administration portal so residents can handle paperwork remotely instead of queueing at the village office.',
    media: 'desa.gif',
    stack: ['Laravel 11', 'Bootstrap', 'MySQL'],
    type: 'Freelance',
    github: 'https://github.com/gilangmukharom/Desa_CI4',
  },
  {
    slug: 'rental-go',
    name: 'Rental Go',
    summary:
      'A rental marketplace connecting owners and renters, focused on a simple browse-and-book flow that works the same on mobile.',
    media: 'rentalgo.gif',
    stack: ['React', 'Tailwind'],
    type: 'Mini Project',
    github: 'https://github.com/gilangmukharom/frontend-rjs',
  },
  {
    slug: 'portfolio',
    name: 'This portfolio',
    summary:
      'The site you are on. Rebuilt from Vue to React and TypeScript, with a design system driven by CSS custom properties so light and dark share one set of components.',
    media: 'porto.gif',
    stack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    type: 'Portfolio',
    github: 'https://github.com/gilangmukharom/Portofolio',
    demo: 'https://gilangmukharom.vercel.app',
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export const projectTypes = ['All', ...new Set(projects.map((p) => p.type))] as const

export type ProjectFilter = (typeof projectTypes)[number]
