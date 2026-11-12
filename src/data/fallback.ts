import type { ContentBlock, SiteContent } from '@/types'

/**
 * The content the site shipped with, kept as a bundled fallback.
 *
 * The CMS is the source of truth, but a portfolio that renders nothing when
 * the API is asleep is worse than one that renders slightly stale copy - so
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
  block('home.hero', 'home', 'Home - hero buttons', {
    primary: { label: 'View my work', href: '/work' },
    secondary: { label: 'Read my resume', href: null },
  }),
  block('home.selected_work', 'home', 'Home - selected work', {
    eyebrow: 'Selected work',
    title: "A few things I've shipped",
    description: 'Products taken from an empty repository to something real people use.',
    primary: { label: 'See all projects', href: '/work' },
  }),
  block('home.about', 'home', 'Home - about teaser', {
    eyebrow: 'About',
    title: 'Two halves of the same engineer',
    primary: { label: 'More about me', href: '/about' },
  }),
  block('about.hero', 'about', 'About - hero', {
    eyebrow: 'About me',
    primary: { label: 'Read my resume', href: null },
  }),
  block('about.experience', 'about', 'About - experience heading', {
    eyebrow: 'Experience',
    title: "Where I've been",
  }),
  block('about.skills', 'about', 'About - skills heading', {
    eyebrow: 'Skills',
    title: 'What I build with',
    description:
      'The tools I reach for day to day, split between what ships to the browser and what keeps the workflow sane.',
  }),
  block('work.hero', 'work', 'Work - hero', {
    eyebrow: 'Work',
    title: "Projects I've taken end to end",
    description:
      'Client work, side projects, and the odd experiment - from the database schema all the way to the last bit of polish on the interface.',
  }),
  block('news.hero', 'news', 'News - hero', {
    eyebrow: 'Reading',
    title: 'What the industry is talking about',
    description:
      'A live feed of updates, tutorials and trends from the tech world. Pick a topic - every headline links straight to the original source.',
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
    description: 'That page doesn’t exist - it may have moved during the rebuild.',
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
    role: 'Full-Stack Software Engineer',
    location: 'Tangerang, Indonesia',
    email: 'gilangmukharom53@gmail.com',
    resumeUrl:
      'https://drive.google.com/file/d/1lgHqVL1YPSvG9I3Nj_NXEBCvMb4mvJ2p/view?usp=sharing',
    avatar: '/img/profile_resizes.jpg',
    roles: ['full-stack engineer', 'front-end engineer', 'back-end engineer', 'problem solver'],
    intro:
      'I build both halves of the product - the interface people touch and the services behind it.',
    bio: [
      'I’m a full-stack software engineer based in Tangerang, Indonesia, with 2+ years of experience delivering production-grade web applications for the aviation sector at PT Aero Systems Indonesia, part of the Garuda Indonesia Group - including the Internet Booking Engine (IBE), a headless CMS and the AMALA Loyalty Program.',
      'My day-to-day stack is JavaScript and TypeScript (React, Next.js, Express) and PHP (Laravel), backed by PostgreSQL, MySQL and Redis. I design RESTful APIs and middleware, tune SQL queries and indexes, and ship with Docker and CI/CD pipelines on Jenkins and GitHub Actions to cloud platforms like GCP and Tencent Cloud.',
      'I care about clean architecture, performance and maintainable code - and I enjoy the whole loop, from Agile planning with cross-functional teams to triaging a live incident in production.',
    ],
    halves: {
      left: {
        label: 'Front end',
        caption: 'Interfaces people actually enjoy using',
        stack: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
      },
      right: {
        label: 'Back end',
        caption: 'APIs and data that hold up under load',
        stack: ['Express', 'Laravel', 'PostgreSQL', 'Redis'],
      },
    },
  },

  settings: {
    siteTitle: 'Gilang Mukharom - Full-Stack Software Engineer',
    siteDescription:
      'Portfolio of Gilang Mukharom, a full-stack software engineer building production web applications and APIs with React, Next.js, TypeScript, Express, Laravel, PostgreSQL and Redis.',
    ogImage: '/img/Home2.jpeg',
    themeDefault: 'system',
    footerNote: 'Built with React, TypeScript and Tailwind.',
    maintenanceMode: false,
  },

  stats: [
    { value: '2+', label: 'Years shipping production software' },
    { value: '10K+', label: 'Daily bookings on the Garuda Indonesia IBE' },
    { value: '30%', label: 'Faster page loads on the booking engine' },
  ],

  experience: [
    {
      company: 'PT Aero Systems Indonesia (Garuda Indonesia Group)',
      role: 'Software Engineer (Fullstack Developer)',
      period: 'Feb 2024 - Present',
      location: 'Tangerang, Indonesia',
      highlights: [
        'Built and optimised the Internet Booking Engine (IBE) for Garuda Indonesia with React, Express and TypeScript - improving page load speed by 30% and supporting 10,000+ daily bookings.',
        'Designed RESTful APIs and middleware with Express and TypeScript, moving the backend toward a microservices-style architecture for cleaner routing and modularity.',
        'Built and maintained a headless CMS with Laravel, PostgreSQL and Redis that cut content update time.',
        'Contributed to the AMALA Loyalty Program with React and TypeScript.',
        'Developed a wearable app for Huawei devices in ArkTS, synced in real time with backend services and a companion mobile app.',
        'Developed backend services for special service requests, order management and airline reservation system integration with real-time booking status updates.',
        'Optimised MySQL and PostgreSQL with indexing strategies, query tuning and faster bulk uploads, and used Redis for caching and asynchronous queueing.',
        'Built reusable UI components and a design system with Material UI, Tailwind CSS and SCSS.',
        'Handled production support, code reviews, unit testing and CI/CD alongside project managers, QA and business analysts.',
      ],
    },
    {
      company: 'Freelance',
      role: 'Full-Stack Developer',
      period: '2021 - Present',
      location: 'Remote',
      highlights: [
        'Built a school attendance and payroll system (SIPP), a program proposal platform (SIAYUB) and a location-based mobile game (Nusaverse) end to end - from the database schema and API to the web and mobile clients.',
        'Delivered profile sites, admin dashboards and internal tools for foundations, villages and small businesses.',
        'Stacks ranged from Laravel and CodeIgniter with MySQL to Next.js, Express, Go and Flutter on PostgreSQL.',
      ],
    },
    {
      company: 'PT Media Kreasi Abadi',
      role: 'Front-End Developer Internship',
      period: 'Jul 2022 - Dec 2022',
      location: 'Balikpapan, Indonesia',
      highlights: [
        'Built responsive web applications for corporate clients in logistics and education with React, Ant Design and Tailwind CSS.',
        'Implemented Redux for centralised state management, business logic and API communication layers.',
        'Integrated backend APIs with the front end across two web and mobile application launches.',
        'Set up CI/CD pipelines with GitHub Actions to automate build, test and deployment.',
        'Helped define technical requirements in application design sessions.',
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
      slug: 'sipp',
      name: 'SIPP',
      summary:
        'Sistem Informasi Presensi PGRI - an attendance and payroll system for a school. Teachers and staff clock in with face recognition, while admins run daily attendance, leave, teaching hours, payroll recaps and the staff cooperative from one dashboard.',
      media: '/img/sipp.webp',
      stack: ['Next.js', 'TypeScript', 'Material UI', 'Express', 'Prisma', 'PostgreSQL'],
      type: 'Freelance',
      featured: true,
    },
    {
      slug: 'nusaverse',
      name: 'Nusaverse',
      summary:
        'A location-based educational game for mobile. Players explore historic sites on a custom vector map to discover Indonesian national heroes, collect hero cards, take quizzes and spend NUSA POINTS in a reward store.',
      media: '/img/nusaverse.webp',
      stack: ['Flutter', 'BLoC', 'Express', 'Prisma', 'PostgreSQL'],
      type: 'Freelance',
      featured: true,
    },
    {
      slug: 'siayub',
      name: 'SIAYUB',
      summary:
        'A program proposal platform for youth organisations. Groups submit and track proposals, reviewers verify them against a 30-day SLA, and the agency follows budgets, KPIs and a regional distribution map through to disbursement.',
      media: '/img/siayub.webp',
      stack: ['Next.js', 'TypeScript', 'Material UI', 'Go', 'PostgreSQL'],
      type: 'Freelance',
      featured: true,
    },
    {
      // Slug kept from the project's earlier name so the CMS row updates in place.
      slug: 'nova-trading-analytics',
      name: 'Fundametrics',
      summary:
        'A stock analysis platform for fundamentals tracking, financial ratio analysis and portfolio watchlists, with premium subscriptions paid through Midtrans. Containerised with Docker and deployed on Tencent Cloud.',
      media: '/img/nova.gif',
      stack: ['Next.js', 'Express', 'TypeScript', 'PostgreSQL', 'Docker'],
      type: 'Mini Project',
      github: 'https://github.com/gilangmukharom/novo',
      demo: 'https://app.nova-trading-analytics.my.id/',
      featured: false,
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
      name: 'Redis',
      role: 'Caching & queues',
      group: 'stack',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    },
    {
      name: 'PHP',
      role: 'Backend',
      group: 'stack',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    },
    {
      name: 'Redux',
      role: 'State management',
      group: 'stack',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    },
    {
      name: 'Zustand',
      role: 'State management',
      group: 'stack',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zustand/zustand-original.svg',
    },
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
      name: 'Jenkins',
      role: 'CI/CD',
      group: 'tools',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
    },
    {
      name: 'GitHub Actions',
      role: 'CI/CD',
      group: 'tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',
    },
    {
      name: 'Postman',
      role: 'API testing',
      group: 'tools',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    },
    {
      name: 'Google Cloud',
      role: 'Cloud',
      group: 'tools',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
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
