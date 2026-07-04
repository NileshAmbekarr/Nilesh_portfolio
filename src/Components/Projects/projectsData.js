// Project data for portfolio
const project = [
  {
    id: 1,
    title: 'InternSync',
    description: ' Multi-Tenant Intern Management SaaS',
    points: [
      'Architected a multi-tenant SaaS backend with org-scoped query filtering and hierarchical RBAC across multipleuser levels, with Cloudflare R2 pre-signed uploads and plan-based storage quotas',
      'Optimized tenant-scoped queries with compound indexes, delivering sub-second API responses while preserving data isolation.',
    ],
    techStack: ['Node.js', 'MongoDB', 'React.js', 'JWT', 'Passport.js', 'Cloudflare r2'],
    year: '2025',
    // image: MarathiLang,
    media: [
      { type: 'image', src: '/projects/Internsync1.png' },
      { type: 'image', src: '/projects/internsync2.png' },
      { type: 'image', src: '/projects/internsync3.png' },
    ],
    githubLink: 'https://github.com/NileshAmbekarr/Internsync',
    liveDemo: 'https://intern-sync-client.vercel.app/',
  },
  {
    id: 2,
    title: 'Marathi-lang',
    description: 'A Toy programming language that uses DevNagri script for its syntax',
    points: [
      'A toy programming language that uses the DevNagri script for its syntax.',
      'Python-based interpreter shipped via pip, with a React playground to try it in the browser.',
    ],
    techStack: ['Python', 'pip', 'React', 'JavaScript'],
    year: '2024',
    media: [
      { type: 'image', src: '/projects/marathilang1.png' },
      { type: 'image', src: '/projects/marathilang2.png' },
    ],
    githubLink: 'https://github.com/NileshAmbekarr/Marathi-lang',
    liveDemo: 'https://marathi-lang.netlify.app/',
  },
  {
    id: 3,
    title: 'Email Schedular',
    description: 'Production Grade Bulk Email Service',
    points: [
      'Built BullMQ/Redis delayed-job scheduling with restart persistence, per-sender rate limiting via atomic Redis counters, and idempotent processing to prevent duplicate sends.',
      'Developed a Next.js 14 dashboard with Google OAuth, CSV upload, and campaign tracking, with retry and failure-recovery logic for worker resilience.',
    ],
    techStack: ['Node.js', 'Next.js', 'Express', 'Typescript', 'BullMQ', 'Redis(upstash)', 'PostgreSQL', 'Drizzle ORM', ],
    year: '2026',
    media: [
      { type: 'image', src: '/projects/emailscheduler2.png' },
      { type: 'image', src: '/projects/emailscheduler1.png' },
    ],
    githubLink: 'https://github.com/NileshAmbekarr/EmailSchedular',
    liveDemo: 'https://email-schedular-br6a.vercel.app/login',
  },
  // will add the remaining later
];

export default project;
