import type { Skill } from '@/types'

export const skills: Skill[] = [
  // Stack
  {
    name: 'React',
    role: 'Frontend',
    group: 'stack',
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
  },
  {
    name: 'TypeScript',
    role: 'Fullstack',
    group: 'stack',
    iconUrl: '/img/typescript.png',
  },
  {
    name: 'JavaScript',
    role: 'Fullstack',
    group: 'stack',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'Next.js',
    role: 'Fullstack',
    group: 'stack',
    iconUrl: 'https://img.icons8.com/fluency/48/nextjs.png',
  },
  {
    name: 'Tailwind',
    role: 'Frontend',
    group: 'stack',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
  },
  {
    name: 'Material UI',
    role: 'Frontend',
    group: 'stack',
    iconUrl: 'https://img.icons8.com/color/48/material-ui.png',
  },
  {
    name: 'SCSS',
    role: 'Frontend',
    group: 'stack',
    iconUrl:
      'https://img.icons8.com/external-creatype-filed-outline-colourcreatype/64/external-document-file-extension-web-format-file-creatype-filed-outline-colourcreatype-8.png',
  },
  {
    name: 'Express',
    role: 'Backend',
    group: 'stack',
    iconUrl: 'https://img.icons8.com/nolan/64/express-js.png',
  },
  {
    name: 'Prisma',
    role: 'ORM',
    group: 'stack',
    iconUrl: 'https://img.icons8.com/color/48/prisma-orm.png',
  },
  {
    name: 'Laravel',
    role: 'Fullstack',
    group: 'stack',
    iconUrl: '/img/laravel.png',
  },
  {
    name: 'PostgreSQL',
    role: 'Database',
    group: 'stack',
    iconUrl: '/img/postgree.png',
  },
  {
    name: 'MySQL',
    role: 'Database',
    group: 'stack',
    iconUrl: '/img/mysql.png',
  },

  // Tools
  {
    name: 'Git',
    role: 'Version control',
    group: 'tools',
    iconUrl: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
  },
  {
    name: 'GitHub',
    role: 'Version control',
    group: 'tools',
    iconUrl: 'https://img.icons8.com/glyph-neue/64/github.png',
  },
  {
    name: 'Docker',
    role: 'Containers',
    group: 'tools',
    iconUrl: 'https://img.icons8.com/fluency/48/docker.png',
  },
  {
    name: 'VS Code',
    role: 'Editor',
    group: 'tools',
    iconUrl: 'https://img.icons8.com/fluency/96/visual-studio-code-2019.png',
  },
  {
    name: 'npm',
    role: 'Package manager',
    group: 'tools',
    iconUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-npm-3-1175132.png',
  },
  {
    name: 'Yarn',
    role: 'Package manager',
    group: 'tools',
    iconUrl: '/img/yarn.png',
  },
]

/** Logos scrolled in the home-page marquee. */
export const marqueeLogos = skills

export const skillGroups = [
  { id: 'stack', label: 'Tech stack' },
  { id: 'tools', label: 'Tools' },
] as const
