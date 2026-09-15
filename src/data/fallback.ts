import type { ContentBlock, SiteContent } from '@/types'

/**
 * The content the site shipped with, kept as a bundled fallback.
 *
 * The CMS is the source of truth, but a portfolio that renders nothing when
 * the API is asleep is worse than one that renders slightly stale copy — so
 * the first paint uses this and swaps in live content when it arrives.
 * It mirrors what `prisma/seed.ts` in the CMS repo inserts.
 */

function block(
  key: string,
  page: string,
  label: string,
  fields: Partial<Omit<ContentBlock, 'key' | 'page' | 'label'>> = {},
): ContentBlock {
  return {
    key,
    page,
    label,
    eyebrow: null,
    title: null,
    description: null,
    body: [],
    primary: null,
    secondary: null,
    ...fields,
  }
}

const blocks: ContentBlock[] = [
  block('home.hero', 'home', 'Home — hero buttons', {
    primary: { label: 'View my work', href: '/work' },
    secondary: { label: 'Read my resume', href: null },
  }),
  block('home.selected_work', 'home', 'Home — selected work', {
    eyebrow: 'Selected work',
    title: "A few things I've shipped",
    description: 'Products taken from an empty repository to something real people use.',
    primary: { label: 'See all projects', href: '/work' },
  }),
  block('home.about', 'home', 'Home — about teaser', {
    eyebrow: 'About',
    title: 'Two halves of the same engineer',
    primary: { label: 'More about me', href: '/about' },
  }),
  block('about.hero', 'about', 'About — hero', {
    eyebrow: 'About me',
    primary: { label: 'Read my resume', href: null },
  }),
  block('about.experience', 'about', 'About — experience heading', {
    eyebrow: 'Experience',
    title: "Where I've been",
  }),
  block('about.skills', 'about', 'About — skills heading', {
    eyebrow: 'Skills',
    title: 'What I build with',
    description:
      'The tools I reach for day to day, split between what ships to the browser and what keeps the workflow sane.',
  }),
  block('work.hero', 'work', 'Work — hero', {
    eyebrow: 'Work',
    title: "Projects I've taken end to end",
    description:
      'Client work, side projects, and the odd experiment — from the database schema all the way to the last bit of polish on the interface.',
  }),
  block('news.hero', 'news', 'News — hero', {
    eyebrow: 'Reading',
    title: 'What the industry is talking about',
    description:
      'A live feed of updates, tutorials and trends from the tech world. Pick a topic — every headline links straight to the original source.',
  }),
  block('global.contact_cta', 'global', 'Contact call to action', {
    eyebrow: 'Say hello',
    title: 'Got something you want built properly?',
    description:
      'I’m open to product work, freelance builds, and the occasional stubborn bug. Tell me what you’re working on.',
    secondary: { label: 'GitHub', href: 'https://github.com/gilangmukharom' },
  }),
  block('global.not_found', 'global', '404 page', {
    eyebrow: 'Dead end',
    title: '404',
    description: 'That page doesn’t exist — it may have moved during the rebuild.',
    primary: { label: 'Back to home', href: '/' },
  }),
  block('global.footer', 'global', 'Footer note', {
    description: 'Built with React, TypeScript and Tailwind.',
  }),
  block('ui.project_filter', 'global', 'Project filter labels', {
    body: ['All', 'Freelance', 'Mini Project', 'Portfolio'],
  }),
  block('ui.skill_groups', 'global', 'Skill group tab labels', {
    body: ['Tech stack', 'Tools'],
  }),
]

export const fallbackContent: SiteContent = {
  profile: {
    name: 'Gilang Mukharom',
    role: 'Software Engineer',
    location: 'Tangerang, Indonesia',
    email: 'gilangmukharom53@gmail.com',
    resumeUrl:
      'https://drive.google.com/file/d/1lgHqVL1YPSvG9I3Nj_NXEBCvMb4mvJ2p/view?usp=sharing',
    avatar: '/img/profile_resizes.jpg',
    roles: ['front-end engineer', 'back-end engineer', 'software engineer', 'problem solver'],
    intro:
      'I build both halves of the product — the interface people touch and the services behind it.',
    bio: [
      'I’m a software engineer based in Tangerang, Indonesia. For the past 2+ years I’ve been building enterprise web applications for Garuda Indonesia — the Internet Booking Engine, the CMS, and the Loyalty Program platform — using React, TypeScript, Laravel, Express, PostgreSQL and Prisma.',
      'I enjoy turning complex problems into reliable, fast, intuitive web applications and backend services. I design and ship RESTful APIs with Express and Prisma, wire them into modern frontend stacks, and work closely with cross-functional teams in Agile environments to deliver smooth, end-to-end experiences.',
      'My focus is helping businesses launch products that are robust, maintainable, and genuinely pleasant to use.',
    ],
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
  },

  settings: {
    siteTitle: 'Gilang Mukharom — Software Engineer',
    siteDescription:
      'Portfolio of Gilang Mukharom, a software engineer building web applications and backend services with React, TypeScript, Express, Prisma and PostgreSQL.',
    ogImage: '/img/Home2.jpeg',
    themeDefault: 'system',
    footerNote: 'Built with React, TypeScript and Tailwind.',
    maintenanceMode: false,
  },

  stats: [
    { value: '2+', label: 'Years shipping production software' },
    { value: '3', label: 'Enterprise platforms at Garuda Indonesia' },
    { value: '6', label: 'Projects shipped end to end' },
  ],

  experience: [
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
  ],

  socials: [
    { label: 'GitHub', href: 'https://github.com/gilangmukharom' },
    { label: 'Email', href: 'mailto:gilangmukharom53@gmail.com' },
  ],

  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Work', to: '/work' },
    { label: 'News', to: '/news' },
  ],

  projects: [
    {
      slug: 'nova-trading-analytics',
      name: 'Nova Trading Analytics',
      summary:
        'A stock analysis platform that helps traders track price movements, visualise charts, and weigh up opportunities without wading through spreadsheets.',
      media: '/img/nova.gif',
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
      media: '/img/lingtar.gif',
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
      media: '/img/nursyifa.gif',
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
      media: '/img/desa.gif',
      stack: ['Laravel 11', 'Bootstrap', 'MySQL'],
      type: 'Freelance',
      github: 'https://github.com/gilangmukharom/Desa_CI4',
    },
    {
      slug: 'rental-go',
      name: 'Rental Go',
      summary:
        'A rental marketplace connecting owners and renters, focused on a simple browse-and-book flow that works the same on mobile.',
      media: '/img/rentalgo.gif',
      stack: ['React', 'Tailwind'],
      type: 'Mini Project',
      github: 'https://github.com/gilangmukharom/frontend-rjs',
    },
    {
      slug: 'portfolio',
      name: 'This portfolio',
      summary:
        'The site you are on. Rebuilt from Vue to React and TypeScript, with a design system driven by CSS custom properties so light and dark share one set of components.',
      media: '/img/porto.gif',
      stack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
      type: 'Portfolio',
      github: 'https://github.com/gilangmukharom/Portofolio',
      demo: 'https://gilangmukharom.vercel.app',
    },
  ],

  skills: [
    {
      name: 'React',
      role: 'Frontend',
      group: 'stack',
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
    },
    { name: 'TypeScript', role: 'Fullstack', group: 'stack', iconUrl: '/img/typescript.png' },
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
    { name: 'Laravel', role: 'Fullstack', group: 'stack', iconUrl: '/img/laravel.png' },
    { name: 'PostgreSQL', role: 'Database', group: 'stack', iconUrl: '/img/postgree.png' },
    { name: 'MySQL', role: 'Database', group: 'stack', iconUrl: '/img/mysql.png' },
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
    { name: 'Yarn', role: 'Package manager', group: 'tools', iconUrl: '/img/yarn.png' },
  ],

  topics: [
    { label: 'Technology', value: 'technology' },
    { label: 'Programming', value: 'programming' },
    { label: 'AI & Machine Learning', value: 'ai OR machine learning' },
    { label: 'JS & TypeScript', value: 'javascript OR typescript' },
  ],

  blocks: Object.fromEntries(blocks.map((entry) => [entry.key, entry])),
}
