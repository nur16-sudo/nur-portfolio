/**
 * MD FOYSAL AL NUR - SOFTWARE & TOOLS FLOATING ARENA ENGINE
 * Phase 5 Strict Requirements:
 * 1. ONE single Software & Tools section
 * 2. ONE large rectangular animation container
 * 3. All logos inside the same rectangle (No separate Adobe or Other sections)
 * 4. 28 Initial logos with authentic SVG brand marks
 * 5. 2D smooth floating physics, independent speeds & directions, boundary bouncing
 * 6. Overlapping prevention, never escapes rectangle
 * 7. Hover pauses individual logo & reveals tool name + details
 * 8. Pause / Resume control & Speed controls
 * 9. Reduced motion support
 * 10. Unlimited Software Manager: Admin can add new logos, which dynamically appear
 *     inside this SAME existing rectangle!
 */

const DEFAULT_TOOLS = [
  {
    id: 'tool-ps',
    name: 'Adobe Photoshop',
    category: 'Design & Retouching',
    role: 'Photo Editing & Manipulation',
    url: 'https://www.adobe.com/products/photoshop.html',
    bg: '#001E36',
    border: '#31A8FF',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#001E36"/><text x="12" y="16" font-size="11" font-weight="800" fill="#31A8FF" text-anchor="middle" font-family="sans-serif">Ps</text></svg>`
  },
  {
    id: 'tool-pr',
    name: 'Adobe Premiere Pro',
    category: 'Video Editing',
    role: 'Timeline Video Post-Production',
    url: 'https://www.adobe.com/products/premiere.html',
    bg: '#00005B',
    border: '#9999FF',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#00005B"/><text x="12" y="16" font-size="11" font-weight="800" fill="#9999FF" text-anchor="middle" font-family="sans-serif">Pr</text></svg>`
  },
  {
    id: 'tool-ae',
    name: 'Adobe After Effects',
    category: 'Motion & VFX',
    role: 'Visual Effects & Motion Graphics',
    url: 'https://www.adobe.com/products/aftereffects.html',
    bg: '#00005B',
    border: '#DDA0DD',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#00005B"/><text x="12" y="16" font-size="11" font-weight="800" fill="#DDA0DD" text-anchor="middle" font-family="sans-serif">Ae</text></svg>`
  },
  {
    id: 'tool-ai',
    name: 'Adobe Illustrator',
    category: 'Vector Graphics',
    role: 'Vector Illustration & Logos',
    url: 'https://www.adobe.com/products/illustrator.html',
    bg: '#330000',
    border: '#FF9A00',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#330000"/><text x="12" y="16" font-size="11" font-weight="800" fill="#FF9A00" text-anchor="middle" font-family="sans-serif">Ai</text></svg>`
  },
  {
    id: 'tool-xd',
    name: 'Adobe XD',
    category: 'UI/UX Design',
    role: 'UI Prototyping & Wireframing',
    url: 'https://www.adobe.com/products/xd.html',
    bg: '#2E001F',
    border: '#FF61F6',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#2E001F"/><text x="12" y="16" font-size="11" font-weight="800" fill="#FF61F6" text-anchor="middle" font-family="sans-serif">Xd</text></svg>`
  },
  {
    id: 'tool-lr',
    name: 'Adobe Lightroom',
    category: 'Photography',
    role: 'RAW Grading & Presets',
    url: 'https://www.adobe.com/products/photoshop-lightroom.html',
    bg: '#001E36',
    border: '#31A8FF',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#001E36"/><text x="12" y="16" font-size="11" font-weight="800" fill="#31A8FF" text-anchor="middle" font-family="sans-serif">Lr</text></svg>`
  },
  {
    id: 'tool-figma',
    name: 'Figma',
    category: 'UI/UX & Product',
    role: 'Collaborative Interface Design',
    url: 'https://www.figma.com',
    bg: 'rgba(242, 78, 30, 0.1)',
    border: 'rgba(242, 78, 30, 0.5)',
    svg: `<svg viewBox="0 0 38 57" fill="none"><path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/><path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/><path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/><path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/><path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/></svg>`
  },
  {
    id: 'tool-canva',
    name: 'Canva',
    category: 'Content Design',
    role: 'Social Media & Graphic Kits',
    url: 'https://www.canva.com',
    bg: 'rgba(0, 196, 204, 0.1)',
    border: 'rgba(0, 196, 204, 0.5)',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="12" fill="#00C4CC"/><text x="12" y="16" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">Ca</text></svg>`
  },
  {
    id: 'tool-capcut',
    name: 'CapCut',
    category: 'Mobile & Video',
    role: 'Shorts, Reels & Speed Ramping',
    url: 'https://www.capcut.com',
    bg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.3)',
    svg: `<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M4 6.5C4 5.12 5.12 4 6.5 4h11C18.88 4 20 5.12 20 6.5v11c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 20 4 18.88 4 17.5v-11zm5 3.5l6 4-6 4V10z"/></svg>`
  },
  {
    id: 'tool-inshot',
    name: 'InShot',
    category: 'Mobile Video',
    role: 'Quick Video Trimming & Transitions',
    url: 'https://inshot.com',
    bg: 'rgba(255, 75, 75, 0.1)',
    border: 'rgba(255, 75, 75, 0.5)',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#FF4B4B" stroke-width="2.2"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="4.5"/></svg>`
  },
  {
    id: 'tool-vscode',
    name: 'VS Code',
    category: 'Development',
    role: 'Code Editor & IDE',
    url: 'https://code.visualstudio.com',
    bg: 'rgba(0, 122, 204, 0.1)',
    border: 'rgba(0, 122, 204, 0.5)',
    svg: `<svg viewBox="0 0 24 24" fill="#007ACC"><path d="M17.5 2.5L7.2 10.5 3 7.3 1 8.8l4 3.2-4 3.2 2 1.5 4.2-3.2 10.3 8L23 20V4l-5.5-1.5zM17 17.2l-6.8-5.2L17 6.8v10.4z"/></svg>`
  },
  {
    id: 'tool-html5',
    name: 'HTML5',
    category: 'Web Development',
    role: 'Semantic Web Structure',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    bg: 'rgba(227, 79, 38, 0.1)',
    border: 'rgba(227, 79, 38, 0.5)',
    svg: `<svg viewBox="0 0 24 24" fill="#E34F26"><path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm14.8 5.7h-7.6l.2 2.5h7.2l-.6 6.8L12 18.3l-5-1.3-.3-3.7h2.5l.2 1.8 2.6.7 2.6-.7.3-3.4H6.5L5.8 4.5h12.4l-.4 3.2z"/></svg>`
  },
  {
    id: 'tool-css3',
    name: 'CSS3',
    category: 'Web Development',
    role: 'Modern Layouts & Animations',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    bg: 'rgba(21, 114, 182, 0.1)',
    border: 'rgba(21, 114, 182, 0.5)',
    svg: `<svg viewBox="0 0 24 24" fill="#1572B6"><path d="M3 2l1.8 17.5L12 22l7.2-2.5L21 2H3zm14.8 5.7h-7.6l.2 2.5h7.2l-.6 6.8L12 18.3l-5-1.3-.3-3.7h2.5l.2 1.8 2.6.7 2.6-.7.3-3.4H6.5L5.8 4.5h12.4l-.4 3.2z"/></svg>`
  },
  {
    id: 'tool-js',
    name: 'JavaScript',
    category: 'Web Development',
    role: 'Client-Side Interactivity',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    bg: 'rgba(247, 223, 30, 0.1)',
    border: 'rgba(247, 223, 30, 0.5)',
    svg: `<svg viewBox="0 0 24 24" fill="#F7DF1E"><rect width="24" height="24" rx="4" fill="#111111"/><text x="12" y="17" font-size="13" font-weight="900" fill="#F7DF1E" text-anchor="middle" font-family="sans-serif">JS</text></svg>`
  },
  {
    id: 'tool-react',
    name: 'React',
    category: 'Frontend Framework',
    role: 'Component Architecture & State',
    url: 'https://react.dev',
    bg: 'rgba(97, 218, 251, 0.1)',
    border: 'rgba(97, 218, 251, 0.5)',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="1.8"><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.8" fill="#61DAFB"/></svg>`
  },
  {
    id: 'tool-ms-word',
    name: 'Microsoft Word',
    category: 'Office Productivity',
    role: 'Documentation & Typography',
    url: 'https://www.microsoft.com/en-us/microsoft-365/word',
    bg: 'rgba(27, 85, 155, 0.15)',
    border: '#1B559B',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#185ABD"/><text x="12" y="16" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">W</text></svg>`
  },
  {
    id: 'tool-ms-excel',
    name: 'Microsoft Excel',
    category: 'Office Productivity',
    role: 'Spreadsheets & Data Formulas',
    url: 'https://www.microsoft.com/en-us/microsoft-365/excel',
    bg: 'rgba(16, 124, 65, 0.15)',
    border: '#107C41',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#107C41"/><text x="12" y="16" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">X</text></svg>`
  },
  {
    id: 'tool-ms-ppt',
    name: 'Microsoft PowerPoint',
    category: 'Office Productivity',
    role: 'Presentation Decks & Slides',
    url: 'https://www.microsoft.com/en-us/microsoft-365/powerpoint',
    bg: 'rgba(196, 62, 28, 0.15)',
    border: '#C43E1C',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#C43E1C"/><text x="12" y="16" font-size="12" font-weight="800" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">P</text></svg>`
  },
  {
    id: 'tool-g-docs',
    name: 'Google Docs',
    category: 'Cloud Productivity',
    role: 'Cloud Collaborative Editing',
    url: 'https://docs.google.com',
    bg: 'rgba(66, 133, 244, 0.15)',
    border: '#4285F4',
    svg: `<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`
  },
  {
    id: 'tool-g-sheets',
    name: 'Google Sheets',
    category: 'Cloud Productivity',
    role: 'Online Analysis & Tables',
    url: 'https://sheets.google.com',
    bg: 'rgba(15, 157, 88, 0.15)',
    border: '#0F9D58',
    svg: `<svg viewBox="0 0 24 24" fill="#0F9D58"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14H6v-3h4v3zm0-5H6V9h4v3zm7 5h-5v-3h5v3zm0-5h-5V9h5v3z"/></svg>`
  },
  {
    id: 'tool-g-slides',
    name: 'Google Slides',
    category: 'Cloud Productivity',
    role: 'Online Presentations & Pitch Decks',
    url: 'https://slides.google.com',
    bg: 'rgba(244, 180, 0, 0.15)',
    border: '#F4B400',
    svg: `<svg viewBox="0 0 24 24" fill="#F4B400"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 14H6V5h12v12zm-3-8h-6v4h6V9z"/></svg>`
  },
  {
    id: 'tool-meta-ads',
    name: 'Meta Ads Manager',
    category: 'Digital Advertising',
    role: 'Paid Facebook & IG Ad Funnels',
    url: 'https://adsmanager.facebook.com',
    bg: 'rgba(0, 129, 251, 0.15)',
    border: '#0081FB',
    svg: `<svg viewBox="0 0 24 24" fill="#0081FB"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>`
  },
  {
    id: 'tool-meta-suite',
    name: 'Meta Business Suite',
    category: 'Social Management',
    role: 'Page, Feed & Message Ops',
    url: 'https://business.facebook.com',
    bg: 'rgba(6, 104, 225, 0.15)',
    border: '#0668E1',
    svg: `<svg viewBox="0 0 24 24" fill="#0668E1"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.5 14.5a3.5 3.5 0 0 1-5 0l-3.5-3.5a3.5 3.5 0 1 1 5-5l3.5 3.5a3.5 3.5 0 0 1 0 5z"/></svg>`
  },
  {
    id: 'tool-git',
    name: 'Git',
    category: 'Version Control',
    role: 'Branching, Commits & Merges',
    url: 'https://git-scm.com',
    bg: 'rgba(240, 80, 50, 0.15)',
    border: '#F05032',
    svg: `<svg viewBox="0 0 24 24" fill="#F05032"><path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9.4 4 12 6.6c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l2.5 2.5c.6-.2 1.3 0 1.8.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.4-.4-2.1L13.2 9.4v5.4c.2.1.4.3.5.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.7-.7-.7-1.9 0-2.6.2-.2.4-.4.6-.5V9.1c-.2-.1-.4-.3-.6-.5-.6-.6-.7-1.5-.3-2.2L8.2 3.8 2.4 9.6c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.6.1-2.2z"/></svg>`
  },
  {
    id: 'tool-github',
    name: 'GitHub',
    category: 'Source Code Hub',
    role: 'Remote Repositories & CI/CD',
    url: 'https://github.com',
    bg: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.4)',
    svg: `<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`
  },
  {
    id: 'tool-firebase',
    name: 'Firebase',
    category: 'Backend & Cloud',
    role: 'Database, Auth & Cloud Hosting',
    url: 'https://firebase.google.com',
    bg: 'rgba(255, 150, 0, 0.15)',
    border: '#FF9600',
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 17.5L7.2 4.2c.1-.4.6-.5.8-.2l3.4 6.2-6.9 7.3zm15 0l-2.1-13c-.1-.4-.6-.6-.9-.3l-9.9 13.3H19.5zM12 11.2l-3.3-6c-.1-.3-.6-.3-.7 0L2.1 17.5 11.5 22.8c.3.2.7.2 1 0l9.4-5.3L12 11.2z" fill="#FFA000"/><path d="M12.5 22.8c-.3.2-.7.2-1 0L2.1 17.5l.1-.2 9.3 5.2c.3.2.7.2 1 0l9.3-5.2.1.2-9.4 5.3z" fill="#FFCA28"/></svg>`
  },
  {
    id: 'tool-supabase',
    name: 'Supabase',
    category: 'Backend & Database',
    role: 'Postgres & Edge Functions',
    url: 'https://supabase.com',
    bg: 'rgba(62, 207, 142, 0.15)',
    border: '#3ECF8E',
    svg: `<svg viewBox="0 0 24 24" fill="#3ECF8E"><path d="M13.5 2.5L3.8 14.8c-.4.5-.1 1.2.6 1.2h6.1L8.8 21.5c-.3.5.2 1 .7.8l9.7-12.3c.4-.5.1-1.2-.6-1.2h-6.1l1.7-5.5c.3-.5-.2-1-.7-.8z"/></svg>`
  },
  {
    id: 'tool-inkscape',
    name: 'Inkscape',
    category: 'Vector Graphics',
    role: 'Open-Source SVG Illustration',
    url: 'https://inkscape.org',
    bg: 'rgba(255, 255, 255, 0.08)',
    border: '#FFFFFF',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.8"><path d="M12 2L2 12l4 4 6-6 6 6 4-4L12 2z"/><path d="M8 18l4 4 4-4"/><circle cx="12" cy="14" r="2" fill="#FFFFFF"/></svg>`
  },
  // 22 Additional Tools (User Request: Add ~20 more tools into same arena)
  {
    id: 'tool-ts',
    name: 'TypeScript',
    category: 'Development',
    role: 'Type-Safe JavaScript Architecture',
    url: 'https://www.typescriptlang.org',
    bg: 'rgba(49, 120, 198, 0.15)',
    border: '#3178C6',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#3178C6"/><path d="M12 9v9m-4-9h8m3 6.5c-.3-.2-.7-.4-1.2-.4-.6 0-1 .2-1 .6 0 .4.4.5 1 .7 1 .3 1.7.7 1.7 1.7 0 1.1-.9 1.9-2.3 1.9-.8 0-1.5-.2-2-.5l.4-1.3c.4.3 1 .5 1.6.5.6 0 1-.2 1-.6 0-.4-.4-.5-1-.7-1-.3-1.7-.7-1.7-1.7 0-1 .9-1.9 2.2-1.9.7 0 1.3.2 1.8.4l-.2 1.3z" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/></svg>`
  },
  {
    id: 'tool-nextjs',
    name: 'Next.js',
    category: 'React Framework',
    role: 'Server Components & SSR Performance',
    url: 'https://nextjs.org',
    bg: 'rgba(255, 255, 255, 0.1)',
    border: '#FFFFFF',
    svg: `<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm3.8 14.5l-4.5-6.4v6.4H9.6V7.5h1.7l4.5 6.4V7.5h1.7v9z"/></svg>`
  },
  {
    id: 'tool-nodejs',
    name: 'Node.js',
    category: 'Backend Runtime',
    role: 'Asynchronous JavaScript Runtime',
    url: 'https://nodejs.org',
    bg: 'rgba(67, 133, 61, 0.15)',
    border: '#43853D',
    svg: `<svg viewBox="0 0 24 24" fill="#43853D"><path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 2.3L5.3 8.2v7.6L12 19.7l6.7-3.9V8.2L12 4.3z"/></svg>`
  },
  {
    id: 'tool-tailwind',
    name: 'Tailwind CSS',
    category: 'CSS Engine',
    role: 'Utility-First Responsive UI Styling',
    url: 'https://tailwindcss.com',
    bg: 'rgba(56, 189, 248, 0.15)',
    border: '#38BDF8',
    svg: `<svg viewBox="0 0 24 24" fill="#38BDF8"><path d="M12 6c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.8-2.5 4.5-2.1.9.2 1.6.9 2.3 1.6C13.4 12 14.8 13.5 18 13.5c3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.8 2.5-4.5 2.1-.9-.2-1.6-.9-2.3-1.6C16.6 7.5 15.2 6 12 6zM6 13.5c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.8-2.5 4.5-2.1.9.2 1.6.9 2.3 1.6C7.4 19.5 8.8 21 12 21c3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.8 2.5-4.5 2.1-.9-.2-1.6-.9-2.3-1.6C10.6 15 9.2 13.5 6 13.5z"/></svg>`
  },
  {
    id: 'tool-python',
    name: 'Python',
    category: 'Programming',
    role: 'Backend Scripting & Computational Logic',
    url: 'https://www.python.org',
    bg: 'rgba(55, 118, 171, 0.15)',
    border: '#3776AB',
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M11.9 2C8.8 2 7 3.3 7 5.8v2.7h5v.8H5.2C2.7 9.3 2 11.2 2 13.7s.7 4.4 3.2 4.4H7v-2.3c0-2.3 1.9-4.2 4.2-4.2h3.9c.7 0 1.2-.5 1.2-1.2V5.8C16.3 3.3 14.9 2 11.9 2z" fill="#3776AB"/><path d="M12.1 22c3.1 0 4.9-1.3 4.9-3.8v-2.7h-5v-.8h6.8c2.5 0 3.2-1.9 3.2-4.4s-.7-4.4-3.2-4.4H17v2.3c0 2.3-1.9 4.2-4.2 4.2H8.9c-.7 0-1.2.5-1.2 1.2v4.6c0 2.5 1.4 3.8 4.4 3.8z" fill="#FFD43B"/></svg>`
  },
  {
    id: 'tool-vite',
    name: 'Vite',
    category: 'Frontend Tooling',
    role: 'Fast Hot Module Replacement Bundling',
    url: 'https://vitejs.dev',
    bg: 'rgba(100, 108, 255, 0.15)',
    border: '#646CFF',
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M21.5 4.5l-9.2 16.2c-.2.4-.8.4-1 0L2.5 4.5c-.3-.5.2-1.1.7-.9l8.6 3.6 8.6-3.6c.6-.2 1.1.4.9.9z" fill="#646CFF"/><path d="M12.5 8.1L8.8 3.5c-.3-.4.1-.9.6-.8l7.2 2.9-4.1 2.5z" fill="#BD34FE"/></svg>`
  },
  {
    id: 'tool-docker',
    name: 'Docker',
    category: 'DevOps',
    role: 'Containerization & Environments',
    url: 'https://www.docker.com',
    bg: 'rgba(36, 150, 237, 0.15)',
    border: '#2496ED',
    svg: `<svg viewBox="0 0 24 24" fill="#2496ED"><path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5zm-3 0h2v2H7V5zm-3 3h2v2H4V8zm18 3c-.3-1.2-1.4-2.1-2.6-2.1-.4 0-.8.1-1.1.3-.6-1-1.8-1.7-3.1-1.7H2v4.5C2 17.5 5.5 21 12 21c6.5 0 9.8-3.5 10-8.5.1-.5 0-1-.1-1.5z"/></svg>`
  },
  {
    id: 'tool-postman',
    name: 'Postman',
    category: 'API Development',
    role: 'Endpoint Testing & API Documentation',
    url: 'https://www.postman.com',
    bg: 'rgba(255, 108, 55, 0.15)',
    border: '#FF6C37',
    svg: `<svg viewBox="0 0 24 24" fill="#FF6C37"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5l-3.5-3.5L11 11.5l1 1 3-3 1.5 1.5-3.5 3.5z"/></svg>`
  },
  {
    id: 'tool-mongodb',
    name: 'MongoDB',
    category: 'Database',
    role: 'NoSQL Document Database & Aggregation',
    url: 'https://www.mongodb.com',
    bg: 'rgba(71, 162, 72, 0.15)',
    border: '#47A248',
    svg: `<svg viewBox="0 0 24 24" fill="#47A248"><path d="M12 1.5s-6 5.8-6 10.7c0 4.2 3.1 8 6 9.8 2.9-1.8 6-5.6 6-9.8C18 7.3 12 1.5 12 1.5zm-.5 18v-8.2c-.4.4-.8.9-1.1 1.4-.4.8-.6 1.7-.6 2.6 0 1.9 1 3.5 1.7 4.2zm1 0c.7-.7 1.7-2.3 1.7-4.2 0-.9-.2-1.8-.6-2.6-.3-.5-.7-1-1.1-1.4v8.2z"/></svg>`
  },
  {
    id: 'tool-mysql',
    name: 'MySQL',
    category: 'Database',
    role: 'Relational Database Queries & Indexing',
    url: 'https://www.mysql.com',
    bg: 'rgba(0, 117, 143, 0.15)',
    border: '#00758F',
    svg: `<svg viewBox="0 0 24 24" fill="#00758F"><path d="M12 3C7 3 3 5 3 8v8c0 3 4 5 9 5s9-2 9-5V8c0-3-4-5-9-5zm0 2c4.4 0 7 1.5 7 3s-2.6 3-7 3-7-1.5-7-3 2.6-3 7-3zm0 14c-4.4 0-7-1.5-7-3v-2.2c1.7 1.3 4.2 2.2 7 2.2s5.3-.9 7-2.2V16c0 1.5-2.6 3-7 3z"/></svg>`
  },
  {
    id: 'tool-blender',
    name: 'Blender',
    category: '3D Graphics',
    role: '3D Modeling, Shading & Rendering',
    url: 'https://www.blender.org',
    bg: 'rgba(232, 125, 41, 0.15)',
    border: '#E87D29',
    svg: `<svg viewBox="0 0 24 24" fill="#E87D29"><path d="M12 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm-1 4.5a3.5 3.5 0 1 1-3.5 3.5A3.5 3.5 0 0 1 11 8.5zm3.5 6.5a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"/></svg>`
  },
  {
    id: 'tool-c4d',
    name: 'Cinema 4D',
    category: '3D Motion',
    role: 'Broadcast Motion Graphics & 3D Typography',
    url: 'https://www.maxon.net/cinema-4d',
    bg: 'rgba(34, 114, 255, 0.15)',
    border: '#2272FF',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="#08102A"/><path d="M8 8a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4H8zm8 0h-2v8h2a4 4 0 0 0 4-4v0a4 4 0 0 0-4-4z" fill="#2272FF"/></svg>`
  },
  {
    id: 'tool-davinci',
    name: 'DaVinci Resolve',
    category: 'Color & NLE',
    role: 'Color Wheels, Curves & Post-Grading',
    url: 'https://www.blackmagicdesign.com/products/davinciresolve',
    bg: 'rgba(235, 75, 55, 0.15)',
    border: '#EB4B37',
    svg: `<svg viewBox="0 0 24 24" fill="#EB4B37"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 5l6 5-6 5V7z"/></svg>`
  },
  {
    id: 'tool-webflow',
    name: 'Webflow',
    category: 'Visual Development',
    role: 'Responsive Visual Box-Model Design',
    url: 'https://webflow.com',
    bg: 'rgba(20, 110, 245, 0.15)',
    border: '#146EF5',
    svg: `<svg viewBox="0 0 24 24" fill="#146EF5"><path d="M18.8 8.4c-.6 0-1.2.3-1.6.8L14.7 13l-2.1-7.2h-3l2.8 9.6-2.5 4.3h3.2l6.7-10.7c.3-.4.2-.6-.2-.6h-.8z"/></svg>`
  },
  {
    id: 'tool-notion',
    name: 'Notion',
    category: 'Productivity & Planning',
    role: 'Design System Roadmaps & Workflows',
    url: 'https://www.notion.so',
    bg: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.5)',
    svg: `<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M4.5 4.2L18.4 3c.7 0 1.1.4 1.1 1.1v15.7c0 .7-.4 1.1-1.1 1.1L4.5 22.1c-.7 0-1.1-.4-1.1-1.1V5.3c0-.7.4-1.1 1.1-1.1zm2.3 3.8v9.9l4.5-5.9v5.9h2.2V8.1l-4.5 5.8V8H6.8z"/></svg>`
  },
  {
    id: 'tool-slack',
    name: 'Slack',
    category: 'Collaboration',
    role: 'Async Creative Team Communication',
    url: 'https://slack.com',
    bg: 'rgba(224, 30, 90, 0.15)',
    border: '#E01E5A',
    svg: `<svg viewBox="0 0 24 24" fill="#E01E5A"><path d="M6 15a2 2 0 1 1-2-2h2v2zm1 0a2 2 0 1 1 2 2v-2H7zm8-9a2 2 0 1 1 2 2h-2V6zm-1 0a2 2 0 1 1-2-2v2h2zm-8 8a2 2 0 1 1 2-2v2H6zm0-1a2 2 0 1 1-2-2h2v2zm12 2a2 2 0 1 1-2 2v-2h2zm0-1a2 2 0 1 1 2 2h-2v-2z"/></svg>`
  },
  {
    id: 'tool-jira',
    name: 'Jira',
    category: 'Project Tracking',
    role: 'Agile Epics, User Stories & Bug Triage',
    url: 'https://www.atlassian.com/software/jira',
    bg: 'rgba(0, 82, 204, 0.15)',
    border: '#0052CC',
    svg: `<svg viewBox="0 0 24 24" fill="#0052CC"><path d="M11.5 2.5a5.5 5.5 0 0 1 5.5 5.5v3h-5.5a5.5 5.5 0 0 1 0-11zm0 7.5a5.5 5.5 0 0 1 5.5 5.5v3h-5.5a5.5 5.5 0 0 1 0-11z"/></svg>`
  },
  {
    id: 'tool-linux',
    name: 'Linux',
    category: 'Operating System',
    role: 'Bash Terminal, Permissions & Servers',
    url: 'https://www.kernel.org',
    bg: 'rgba(255, 212, 59, 0.15)',
    border: '#FFD43B',
    svg: `<svg viewBox="0 0 24 24" fill="#FFD43B"><path d="M12 2C8.7 2 6 4.7 6 8v3.5c0 1.4-.4 2.8-1.2 3.9-.5.7-.8 1.5-.8 2.4C4 20 6 22 8.5 22h7c2.5 0 4.5-2 4.5-4.2 0-.9-.3-1.7-.8-2.4-.8-1.1-1.2-2.5-1.2-3.9V8c0-3.3-2.7-6-6-6zm-1.5 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>`
  },
  {
    id: 'tool-cpp',
    name: 'C++',
    category: 'Core Engineering',
    role: 'Data Structures, Pointers & Algorithms',
    url: 'https://isocpp.org',
    bg: 'rgba(0, 89, 156, 0.15)',
    border: '#00599C',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#00599C"/><text x="8" y="16" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">C</text><text x="17" y="15" font-size="10" font-weight="900" fill="#60A5FA" text-anchor="middle" font-family="sans-serif">++</text></svg>`
  },
  {
    id: 'tool-vercel',
    name: 'Vercel',
    category: 'Cloud Platform',
    role: 'Edge Deployment, CI/CD & Serverless',
    url: 'https://vercel.com',
    bg: 'rgba(255, 255, 255, 0.1)',
    border: '#FFFFFF',
    svg: `<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2L2 20h20L12 2z"/></svg>`
  },
  {
    id: 'tool-netlify',
    name: 'Netlify',
    category: 'Cloud Hosting',
    role: 'Static Site Hosting & Form Handlers',
    url: 'https://www.netlify.com',
    bg: 'rgba(0, 199, 183, 0.15)',
    border: '#00C7B7',
    svg: `<svg viewBox="0 0 24 24" fill="#00C7B7"><path d="M12 2L4 12l8 10 8-10-8-10zm0 3.2L17.4 12 12 18.8 6.6 12 12 5.2z"/></svg>`
  },
  {
    id: 'tool-redux',
    name: 'Redux',
    category: 'State Management',
    role: 'Predictable Global UI State Store',
    url: 'https://redux.js.org',
    bg: 'rgba(118, 74, 188, 0.15)',
    border: '#764ABC',
    svg: `<svg viewBox="0 0 24 24" fill="#764ABC"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 4a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm-4 6a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm8 0a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm-4 4a2 2 0 1 1 2 2 2 2 0 0 1-2-2z"/></svg>`
  }
];

const STORAGE_KEY = 'foysal_portfolio_tools_db';
const SPEED_STORAGE_KEY = 'foysal_portfolio_tools_speed';

class FloatingToolsArena {
  constructor(arenaId, counterBadgeId) {
    this.arena = document.getElementById(arenaId);
    this.counterBadge = document.getElementById(counterBadgeId);
    this.tools = this.loadTools();
    this.nodes = [];
    this.isPaused = false;
    
    // Persistent speed multiplier (0.5x - 5.0x)
    const savedSpeed = parseFloat(localStorage.getItem(SPEED_STORAGE_KEY));
    this.speedMultiplier = (!isNaN(savedSpeed) && savedSpeed >= 0.5 && savedSpeed <= 5.0) ? savedSpeed : 1.0;
    
    this.animationFrameId = null;
    this.initialized = false;

    if (!this.arena) return;

    this.init();
  }

  loadTools() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage error, using defaults', e);
    }
    this.saveTools(DEFAULT_TOOLS);
    return [...DEFAULT_TOOLS];
  }

  saveTools(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Save tools error', e);
    }
  }

  init() {
    this.renderNodes();
    this.bindControls();
    this.bindResize();
    this.startPhysics();
    this.initialized = true;

    // Real-time synchronization from Admin updates across tabs and events
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY || !e.key) {
        this.tools = this.loadTools();
        this.renderNodes();
      }
    });
    window.addEventListener('portfolioToolsUpdated', () => {
      this.tools = this.loadTools();
      this.renderNodes();
    });
    window.addEventListener('toolsUpdated', () => {
      this.tools = this.loadTools();
      this.renderNodes();
    });

    // Listen for cross-window or admin tool updates
    window.addEventListener('toolsUpdated', () => {
      this.tools = this.loadTools();
      this.renderNodes();
    });
  }

  renderNodes() {
    if (!this.arena) return;
    this.arena.innerHTML = '';
    this.nodes = [];

    const rect = this.arena.getBoundingClientRect();
    const arenaW = rect.width || 1100;
    const arenaH = rect.height || 580;
    const nodeSize = arenaW < 480 ? 50 : (arenaW < 768 ? 54 : 58);

    if (this.counterBadge) {
      this.counterBadge.textContent = `${this.tools.length} Tools Active`;
    }

    this.tools.forEach((tool, index) => {
      // Create DOM node
      const el = document.createElement('div');
      el.className = 'floating-logo-node';
      el.id = `node-${tool.id}`;
      el.setAttribute('data-name', tool.name.toLowerCase());
      el.style.borderColor = tool.border || 'var(--blue-border)';

      el.innerHTML = `
        <div class="floating-logo-icon">
          ${tool.svg || '<span style="font-weight:800;color:#FFF;">' + tool.name.slice(0, 2) + '</span>'}
        </div>
        <div class="logo-tooltip">
          <span class="tooltip-title">${tool.name}</span>
          <span class="tooltip-role">${tool.role || tool.category}</span>
        </div>
      `;

      // Non-overlapping initial placement
      const margin = 15;
      const x = Math.max(margin, Math.min(arenaW - nodeSize - margin, (margin + (index % 8) * ((arenaW - nodeSize - margin * 2) / 8)) + (Math.random() * 20 - 10)));
      const y = Math.max(margin, Math.min(arenaH - nodeSize - margin, (margin + Math.floor(index / 8) * ((arenaH - nodeSize - margin * 2) / 7)) + (Math.random() * 20 - 10)));

      // Individual tool speed factor configured from Admin (0.5x to 5.0x)
      const toolSpeed = Math.max(0.5, Math.min(5.0, parseFloat(tool.speed) || 1.0));
      const angle = Math.random() * Math.PI * 2;
      const baseVelocity = (1.6 + Math.random() * 0.8) * toolSpeed;
      const vx = Math.cos(angle) * baseVelocity;
      const vy = Math.sin(angle) * baseVelocity;

      const nodeData = {
        el,
        x,
        y,
        vx,
        vy,
        baseSpeed: baseVelocity,
        toolSpeed,
        w: nodeSize,
        h: nodeSize,
        isHovered: false,
        name: tool.name.toLowerCase()
      };

      // Set initial transform
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Hover pause on this individual logo
      el.addEventListener('mouseenter', () => {
        nodeData.isHovered = true;
        el.classList.add('is-hovered');
      });

      el.addEventListener('mouseleave', () => {
        nodeData.isHovered = false;
        el.classList.remove('is-hovered');
      });

      // Mobile Touch Interaction: Tap to inspect tooltip & pause, tap again to visit link
      let touchMoved = false;
      el.addEventListener('touchstart', () => {
        touchMoved = false;
      }, { passive: true });

      el.addEventListener('touchmove', () => {
        touchMoved = true;
      }, { passive: true });

      el.addEventListener('touchend', (e) => {
        if (touchMoved) return;
        const wasHovered = nodeData.isHovered;
        this.nodes.forEach(n => {
          n.isHovered = false;
          n.el.classList.remove('is-hovered');
        });
        if (!wasHovered) {
          nodeData.isHovered = true;
          el.classList.add('is-hovered');
          e.preventDefault();
        } else if (tool.url) {
          window.open(tool.url, '_blank', 'noopener,noreferrer');
        }
      });

      if (tool.url) {
        el.addEventListener('click', () => {
          window.open(tool.url, '_blank', 'noopener,noreferrer');
        });
      }

      this.arena.appendChild(el);
      this.nodes.push(nodeData);
    });
  }

  startPhysics() {
    const step = () => {
      if (!this.isPaused) {
        this.updatePhysics();
      }
      this.animationFrameId = requestAnimationFrame(step);
    };
    this.animationFrameId = requestAnimationFrame(step);
  }

  updatePhysics() {
    const rect = this.arena.getBoundingClientRect();
    const arenaW = rect.width;
    const arenaH = rect.height;
    if (arenaW <= 0 || arenaH <= 0) return;

    const currentMultiplier = this.speedMultiplier;

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      // If hovered, pause this individual logo
      if (!node.isHovered) {
        node.x += node.vx * currentMultiplier;
        node.y += node.vy * currentMultiplier;
      }

      // STRICT BOUNDARY CLAMPING & BOUNCING - NEVER ESCAPES THE RECTANGLE
      if (node.x <= 0) {
        node.x = 0;
        node.vx = Math.abs(node.vx);
      } else if (node.x + node.w >= arenaW) {
        node.x = arenaW - node.w;
        node.vx = -Math.abs(node.vx);
      }

      if (node.y <= 0) {
        node.y = 0;
        node.vy = Math.abs(node.vy);
      } else if (node.y + node.h >= arenaH) {
        node.y = arenaH - node.h;
        node.vy = -Math.abs(node.vy);
      }

      // JITTER-FREE SMOOTH SOFT ELASTIC REPULSION
      // Replaces abrupt position snapping with smooth impulse physics
      for (let j = i + 1; j < this.nodes.length; j++) {
        const other = this.nodes[j];
        const dx = (node.x + node.w / 2) - (other.x + other.w / 2);
        const dy = (node.y + node.h / 2) - (other.y + other.h / 2);
        const dist = Math.hypot(dx, dy);
        const minDist = 62; // nodeSize + gap

        if (dist < minDist && dist > 0.05) {
          const nx = dx / dist;
          const ny = dy / dist;

          // Gentle elastic repulsion impulse
          const impulse = 0.07;
          if (!node.isHovered) {
            node.vx += nx * impulse;
            node.vy += ny * impulse;
          }
          if (!other.isHovered) {
            other.vx -= nx * impulse;
            other.vy -= ny * impulse;
          }

          // Very gentle soft nudge (prevents vibration / shaking)
          const nudge = Math.min((minDist - dist) * 0.06, 0.35);
          if (!node.isHovered) {
            node.x += nx * nudge;
            node.y += ny * nudge;
          }
          if (!other.isHovered) {
            other.x -= nx * nudge;
            other.y -= ny * nudge;
          }
        }
      }

      // Stabilize velocity vector so velocity stays smooth and constant
      const vMag = Math.hypot(node.vx, node.vy);
      if (vMag > 0.001) {
        node.vx = (node.vx / vMag) * node.baseSpeed;
        node.vy = (node.vy / vMag) * node.baseSpeed;
      }

      // Hardware accelerated GPU subpixel translation (No layout reflow, No jitter)
      node.el.style.transform = `translate3d(${node.x.toFixed(2)}px, ${node.y.toFixed(2)}px, 0)`;
    }
  }

  bindControls() {
    const pauseBtn = document.getElementById('pauseArenaBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        this.isPaused = !this.isPaused;
        pauseBtn.innerHTML = this.isPaused
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Resume Motion`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause Motion`;
        pauseBtn.classList.toggle('active', this.isPaused);
      });
    }

    // Dynamic Multi-speed Controls (0.5x to 5.0x) with Persistence
    const speedBtns = document.querySelectorAll('.tools-speed-group .btn-tool-ctrl');
    const updateSpeedBtns = (targetSpeed) => {
      speedBtns.forEach((btn) => {
        const btnSpeed = parseFloat(btn.getAttribute('data-speed'));
        if (Math.abs(btnSpeed - targetSpeed) < 0.1) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    };

    updateSpeedBtns(this.speedMultiplier);

    speedBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const speed = parseFloat(btn.getAttribute('data-speed')) || 1.0;
        this.speedMultiplier = speed;
        localStorage.setItem(SPEED_STORAGE_KEY, speed);
        updateSpeedBtns(speed);
      });
    });

    // Also support legacy button IDs if present
    const legacyMap = [
      { id: 'speedSlowBtn', speed: 0.5 },
      { id: 'speedNormalBtn', speed: 1.0 },
      { id: 'speedFastBtn', speed: 2.5 }
    ];
    legacyMap.forEach(item => {
      const el = document.getElementById(item.id);
      if (el && !el.hasAttribute('data-speed')) {
        el.addEventListener('click', () => {
          this.speedMultiplier = item.speed;
          localStorage.setItem(SPEED_STORAGE_KEY, item.speed);
          updateSpeedBtns(item.speed);
        });
      }
    });

    // Search filter
    const searchInput = document.getElementById('toolsSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.nodes.forEach((node) => {
          if (!query) {
            node.el.style.opacity = '1';
            node.el.classList.remove('highlighted');
          } else if (node.name.includes(query)) {
            node.el.style.opacity = '1';
            node.el.classList.add('highlighted');
          } else {
            node.el.style.opacity = '0.2';
            node.el.classList.remove('highlighted');
          }
        });
      });
    }

    // Dismiss active tooltips on arena background touch
    this.arena.addEventListener('touchstart', (e) => {
      if (e.target === this.arena) {
        this.nodes.forEach((n) => {
          n.isHovered = false;
          n.el.classList.remove('is-hovered');
        });
      }
    }, { passive: true });
  }

  bindResize() {
    window.addEventListener('resize', () => {
      const rect = this.arena.getBoundingClientRect();
      const arenaW = rect.width;
      const arenaH = rect.height;
      if (arenaW <= 0 || arenaH <= 0) return;
      this.nodes.forEach((node) => {
        if (node.x + node.w > arenaW) node.x = Math.max(0, arenaW - node.w);
        if (node.y + node.h > arenaH) node.y = Math.max(0, arenaH - node.h);
        if (node.x < 0) node.x = 0;
        if (node.y < 0) node.y = 0;
      });
    });
  }

  // Public method: Add unlimited new tool dynamically into the same rectangle
  addTool(newTool) {
    if (!newTool.id) newTool.id = 'tool-' + Date.now();
    this.tools.push(newTool);
    this.saveTools(this.tools);
    this.renderNodes();
  }

  // Public method: Delete tool with persistence
  deleteTool(toolId) {
    this.tools = this.tools.filter((t) => t.id !== toolId);
    this.saveTools(this.tools);
    this.renderNodes();
  }
}

// Global hook for public & admin synchronization
window.FloatingToolsArena = FloatingToolsArena;

document.addEventListener('DOMContentLoaded', () => {
  window.toolsArenaInstance = new FloatingToolsArena('toolsFloatingArena', 'toolsCounterBadge');
});
