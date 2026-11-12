/**
 * MD FOYSAL AL NUR - MY PROJECTS GALLERY MANAGER (PHASE 6)
 * 8 Specialized Project Galleries:
 * 1. UI/UX Design Projects (uiux)
 * 2. Web Development Projects (webdev)
 * 3. Video Editing Projects (video)
 * 4. Photography Projects (photography)
 * 5. Videography Projects (videography)
 * 6. Graphic Design Projects (graphic)
 * 7. Digital Marketing Projects (marketing)
 * 8. IT & Technical Projects (technical)
 *
 * Features:
 * - 24 Rich, Distinct Demonstrative Projects (3 per category)
 * - Category-Specific SVG Blueprint Covers
 * - Name and Short Caption displayed under each preview
 * - Interactive Full Case Study Details Modal on Click
 * - Independent View More / Show Less controls
 * - Admin LocalStorage Synchronization & Multi-format Compatibility
 */

const DEFAULT_PROJECTS = [
  // 1. UI/UX Design Projects
  {
    id: 'proj-uiux-1',
    category: 'uiux',
    name: 'FinTech Banking & Dashboard UX',
    description: 'Next-gen financial analytics dashboard with dark mode tokens, atomic components, and transaction flows.',
    cover: 'assets/projects/uiux_banking.svg',
    tools: ['Figma', 'Auto-Layout', 'Design Systems', 'Usability Testing'],
    client: 'FinTech Prototype & Concept',
    role: 'Lead UI/UX Designer & Architect',
    timeline: '3 Weeks',
    details: 'Architected complete user flows for account balances, multi-currency wallets, biometric transaction confirmation, and dark mode design tokens.',
    overview: 'This project tackled the challenge of designing high-density financial data for everyday users. By introducing a streamlined modular card system, progressive disclosure for deep analytics, and strict WCAG AAA contrast compliance, users can review cashflow, investments, and transactions within seconds without cognitive overload.',
    deliverables: [
      'Comprehensive 12-column responsive layout grid system',
      'Over 40+ atomic Figma components with variants & interactive states',
      'Interactive clickable prototype covering 14 user journeys',
      'High-contrast dark mode design tokens for seamless developer handoff'
    ],
    metrics: ['100% Auto-Layout Compliant', 'WCAG AAA Accessibility', '40+ Master Components'],
    link: 'https://figma.com'
  },
  {
    id: 'proj-uiux-2',
    category: 'uiux',
    name: 'Mobile E-Commerce Flow & App Prototype',
    description: 'End-to-end mobile retail experience with micro-interactions, bottom sheet filters, and one-tap checkout.',
    cover: 'assets/projects/uiux_ecommerce.svg',
    tools: ['Figma', 'Mobile UX', 'Interactive Prototyping', 'Wireframing'],
    client: 'Mobile Retail Concept',
    role: 'Mobile Product Designer',
    timeline: '2 Weeks',
    details: 'Designed frictionless product catalog navigation, bottom sheet filter drawers, one-tap instant checkout, and interactive micro-animations.',
    overview: 'Modern shoppers demand speed and clarity. This prototype simplifies complex checkout funnels into a single fluid bottom-sheet interaction, reducing checkout steps from 5 screens to 1 modal with real-time address validation and order confirmation feedback.',
    deliverables: [
      'Mobile-first wireframes and visual design screens for iOS & Android',
      'One-tap checkout bottom sheet with interactive payment selector',
      'Micro-interaction animations for add-to-cart and order confirmation',
      'User journey maps and usability test synthesis report'
    ],
    metrics: ['Reduced checkout steps from 5 to 1', '44px+ Accessible Touch Targets', 'Zero Layout Shifts'],
    link: 'https://figma.com'
  },
  {
    id: 'proj-uiux-3',
    category: 'uiux',
    name: 'Creative Portfolio UI Design System',
    description: 'Ultra-modern portfolio interface design with luxury dark-navy styling, typography hierarchy, and responsive grid layouts.',
    cover: 'assets/projects/uiux_design_system.svg',
    tools: ['Figma', 'Responsive Grid', 'Typography Tokens', 'UI Design'],
    client: 'Personal Branding Architecture',
    role: 'Design System Architect',
    timeline: 'Ongoing Practice',
    details: 'Structured 12-column layout grid, component variants, hover state micro-interactions, and mobile navigation drawer.',
    overview: 'A rigorous design system establishing consistent color tokens (#050912 void, #162E93 primary, #0F1F6D secondary, #60A5FA electric cyan), scalable typography hierarchies, button atoms, and card components across desktop, tablet, and mobile breakpoints.',
    deliverables: [
      'Modular design token repository for colors, shadows, and radii',
      'Full typography scale with proportional line-height and letter-spacing',
      'Interactive button atom matrix (Primary, Cyber Glass, Outline, Ghost)',
      'Design specs and responsive breakpoint rules for front-end implementation'
    ],
    metrics: ['Full Token Interoperability', 'Pixel-Perfect CSS Mirroring', '6 Breakpoint Layouts'],
    link: '#'
  },

  // 2. Web Development Projects
  {
    id: 'proj-webdev-1',
    category: 'webdev',
    name: 'Personal Portfolio Architecture',
    description: 'Ultra-fast responsive portfolio built with semantic HTML5, modern CSS3 layout engines, and interactive JavaScript.',
    cover: 'assets/projects/webdev_portfolio.svg',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'VS Code', 'Git'],
    client: 'MD Foysal Al Nur Portfolio',
    role: 'Front-End Engineer & Architect',
    timeline: 'Production System',
    details: 'Built from scratch without bloated frameworks. Features canvas particle ambient mesh, responsive fluid typography, and cyber glassmorphism.',
    overview: 'Engineered as a zero-framework, ultra-high performance showcase. Uses semantic HTML5, CSS custom properties, responsive flex/grid layouts, dynamic client-side filtering, and a lightweight HTML5 canvas particle background that runs at a locked 60 frames per second.',
    deliverables: [
      'Zero-dependency modular JavaScript architecture',
      'Interactive Canvas 2D ambient particle constellation mesh',
      '100% responsive fluid layout optimized for all modern screen sizes',
      'Integrated private admin dashboard with localStorage database sync'
    ],
    metrics: ['99+ Google Lighthouse Score', '0 External Framework Dependencies', 'Sub-100ms First Contentful Paint'],
    link: 'index.html'
  },
  {
    id: 'proj-webdev-2',
    category: 'webdev',
    name: 'Responsive Agency Landing Page',
    description: 'High-conversion agency landing page with modern CSS Grid layouts, interactive pricing toggle, and mobile navigation.',
    cover: 'assets/projects/webdev_agency.svg',
    tools: ['HTML5', 'CSS Grid', 'Flexbox', 'JavaScript'],
    client: 'Digital Agency Showcase',
    role: 'Front-End Developer',
    timeline: '1 Week',
    details: 'Includes interactive FAQ accordions, testimonial sliders, lead capture form with front-end validation, and smooth scroll anchors.',
    overview: 'A commercial agency front-end built for maximum lead generation. Features dynamic billing cycle toggles (monthly vs annual), animated feature cards, accessibility focus states, and a validated multi-step contact form.',
    deliverables: [
      'High-conversion hero header with dual CTA hierarchy',
      'Interactive pricing toggle with real-time discount calculation',
      'Accessible FAQ accordion with smooth CSS height transitions',
      'Front-end contact form validation with real-time feedback'
    ],
    metrics: ['Mobile Responsive Grid', 'Under 50KB CSS Bundle', 'Smooth 60fps Transitions'],
    link: '#'
  },
  {
    id: 'proj-webdev-3',
    category: 'webdev',
    name: 'Interactive DOM Data Table & Filter',
    description: 'Lightweight client-side data filtering interface with dynamic sortable columns and search highlight.',
    cover: 'assets/projects/webdev_dashboard.svg',
    tools: ['JavaScript', 'DOM APIs', 'CSS3', 'Regex'],
    client: 'Web Utilities & Engineering',
    role: 'JavaScript Developer',
    timeline: '1 Week',
    details: 'Implements zero-dependency client filtering, pagination, search highlighting, and CSV export functionality.',
    overview: 'Built to demonstrate pure JavaScript DOM manipulation without libraries like React or DataTables. Handles multi-column sorting, case-insensitive substring searching with regex text highlighting, and instant client-side CSV downloads.',
    deliverables: [
      'Instant regex search filter with matched text highlight span tags',
      'Multi-directional column sort (Ascending, Descending, Default)',
      'Client-side pagination controls with configurable page sizes',
      'One-click CSV data export utility generated via data-URI blob'
    ],
    metrics: ['Zero Dependencies', 'Instant Sub-5ms Search Response', 'Full Keyboard Navigation'],
    link: '#'
  },

  // 3. Video Editing Projects
  {
    id: 'proj-video-1',
    category: 'video',
    name: 'Dynamic Motion & Beat-Synced Reel',
    description: 'Rapid-paced 9:16 vertical short-form video aligned precisely with rhythmic audio cues and visual sound effects.',
    cover: 'assets/projects/video_beat_reel.svg',
    tools: ['CapCut', 'InShot', 'Audio Sync', 'Transitions'],
    client: 'Social Media & Personal Reels',
    role: 'Video Editor & Sound Designer',
    timeline: '3 Days',
    details: 'Edited high-retention video reel with micro-cuts on musical downbeats, seamless zoom transitions, and color curve enhancement.',
    overview: 'In short-form social video, the first 3 seconds dictate viewer retention. This vertical reel uses rhythmic velocity cuts synced down to the millisecond with musical transients, coupled with subtle directional camera shakes and whoosh sound effects.',
    deliverables: [
      '9:16 vertical format tailored specifically for Instagram Reels & TikTok',
      'Beat-synced timeline cuts aligned to audio downbeats and drops',
      'Custom color grading curve for vibrant skin tones and deep blacks',
      'Directional zoom-in and whip-pan transition choreography'
    ],
    metrics: ['95%+ 3-Second Hook Retention', 'High-Energy Audio Pacing', '4K 60FPS High Bitrate Export'],
    link: '#'
  },
  {
    id: 'proj-video-2',
    category: 'video',
    name: 'Kinetic Subtitles & Educational Reel',
    description: 'Short-form educational and storytelling reel featuring kinetic text animations, dynamic emoji accents, and audio leveling.',
    cover: 'assets/projects/video_kinetic_subtitles.svg',
    tools: ['CapCut', 'InShot', 'Keyframing', 'Text VFX'],
    client: 'Educational Content Creation',
    role: 'Motion Video Editor',
    timeline: '2 Days',
    details: 'Crafted word-by-word highlighted captions, custom glowing fonts, sound design accents, and vocal audio cleanup.',
    overview: 'Over 70% of mobile users watch short-form videos with sound muted. This project implements animated kinetic subtitles with word-by-word glowing color changes and pop animations to maintain viewer comprehension and engagement.',
    deliverables: [
      'Word-by-word timed text animations with pop-in keyframing',
      'Custom color styling with high-contrast text outlines and drop shadows',
      'Vocal frequency leveling and background noise suppression',
      'Strategic sound effect placement on important conceptual punchlines'
    ],
    metrics: ['100% Legibility without Audio', 'Synchronized Word Keyframes', 'Clean Vocal Clarity'],
    link: '#'
  },
  {
    id: 'proj-video-3',
    category: 'video',
    name: 'Event Teaser & Speed Ramp Video',
    description: 'High-energy promotional video teaser utilizing velocity curves, optical flow slow-motion, and cinematic transitions.',
    cover: 'assets/projects/video_event_teaser.svg',
    tools: ['Premiere Pro', 'CapCut', 'Speed Ramping', 'Color Grading'],
    client: 'Institutional Event Media',
    role: 'Editor & Colorist',
    timeline: '4 Days',
    details: 'Showcases organizational event atmosphere, keynote highlights, speaker reactions, and closing visual signature.',
    overview: 'A cinematic promotional trailer crafted to generate excitement for upcoming student and organizational events. Combines smooth velocity speed ramps (switching from 200% fast forward to 20% slow motion) with atmospheric soundscapes.',
    deliverables: [
      'Multi-track NLE timeline assembly with dedicated SFX and music stems',
      'Bespoke velocity curves with optical flow motion interpolation',
      'Cinematic 16:9 widescreen crop with custom blue-hour color grade',
      'Opening teaser hook and closing animated logo signature'
    ],
    metrics: ['Smooth 120fps Slow-Motion', 'Dynamic Audio Ducking', 'Multi-Platform Master Renders'],
    link: '#'
  },

  // 4. Photography Projects
  {
    id: 'proj-photo-1',
    category: 'photography',
    name: 'Natural Light Portrait Study',
    description: 'Outdoor and studio portraiture highlighting natural bokeh, shallow depth-of-field, and skin tone fidelity correction.',
    cover: 'assets/projects/photo_portrait.svg',
    tools: ['Adobe Lightroom', 'Camera RAW', 'Photo Retouching'],
    client: 'Personal & Creative Portfolio',
    role: 'Photographer & Retoucher',
    timeline: '1 Day Shoot + Retouch',
    details: 'Tonal curve tuning, soft skin texture preservation, chromatic aberration removal, and golden hour highlight recovery.',
    overview: 'Exploration of human portraiture captured using a wide-aperture 50mm f/1.8 lens in natural environmental lighting. The post-production in Adobe Lightroom focused on retaining natural skin micro-textures while balancing highlight rolloff.',
    deliverables: [
      'Series of high-resolution portrait photographs in RAW format',
      'Custom Lightroom tone curves developed for balanced shadow detail',
      'Skin tone preservation with targeted hue/saturation/luminance tuning',
      'Delivered in print-ready TIFF and web-optimized JPG formats'
    ],
    metrics: ['Native RAW Dynamic Range', 'Zero Artificial Skin Blurring', 'Creamy Optical Bokeh'],
    link: '#'
  },
  {
    id: 'proj-photo-2',
    category: 'photography',
    name: 'Institutional Event Documentation',
    description: 'Candid event photography capturing decisive moments, speaker addresses, and audience engagement.',
    cover: 'assets/projects/photo_event.svg',
    tools: ['Adobe Lightroom', 'Exposure Correction', 'Batch Processing'],
    client: 'Student Leadership Media Committee',
    role: 'Event Photographer',
    timeline: 'Full-Day Coverage',
    details: 'Low-light noise reduction, white balance alignment under stage lighting, and delivery of high-res press photos.',
    overview: 'Documenting multi-hour conference proceedings with rapid lighting variations, from dark auditoriums with high-intensity spotlights to brightly lit seminar rooms. Required manual exposure compensation and fast reaction times.',
    deliverables: [
      'Extensive visual documentation archive of over 200+ curated frames',
      'Keynote speaker portraits with stage lighting color balance',
      'Audience interaction, applause, and spontaneous emotional captures',
      'Batch metadata tagging and rapid same-day social media press delivery'
    ],
    metrics: ['200+ Curated Press Photos', 'Same-Day Turnaround', 'Clean Low-Light Noise Profile'],
    link: '#'
  },
  {
    id: 'proj-photo-3',
    category: 'photography',
    name: 'Golden Hour Urban Composition',
    description: 'Environmental street and architectural photography focused on leading lines and sunset color palettes.',
    cover: 'assets/projects/photo_urban.svg',
    tools: ['Adobe Lightroom', 'Color Grading', 'Composition'],
    client: 'Creative Visual Exploration',
    role: 'Photographer & Colorist',
    timeline: 'Self-Directed',
    details: 'Dynamic range expansion, shadow detail extraction, and custom cinematic LUT development in Lightroom.',
    overview: 'Capturing the geometry of metropolitan bridges and architecture as dusk settles. Uses strong one-point perspective leading lines to guide the viewer into the sunset twilight horizon.',
    deliverables: [
      'High dynamic range architectural compositions',
      'Split-toning color balance pairing warm sunset golds with deep navy blues',
      'Perspective distortion correction and vertical alignment',
      'High-resolution archival print files'
    ],
    metrics: ['Balanced HDR Exposure', 'Geometric Perspective Alignment', 'Cinematic Split Tones'],
    link: '#'
  },

  // 5. Videography Projects
  {
    id: 'proj-videography-1',
    category: 'videography',
    name: '4K Conference & Event Coverage',
    description: 'Full-day organizational conference multi-angle recording, keynote tracking, and atmosphere montages.',
    cover: 'assets/projects/videography_conference.svg',
    tools: ['4K Camera', 'Gimbal Rig', 'Premiere Pro', 'Sound Recording'],
    client: 'Student Media Committee',
    role: 'Lead Videographer & Camera Operator',
    timeline: 'Full-Day Event',
    details: 'Managed live camera positions, smooth tracking shots with 3-axis gimbal, and multi-cam timeline synchronization.',
    overview: 'Capturing a live multi-speaker conference with 4K recording gear. Coordinated stationary tripod coverage for speeches while operating a motorized 3-axis gimbal for dynamic audience pans and room atmosphere b-roll.',
    deliverables: [
      'Full 4K Ultra HD master recording of keynote presentations',
      'Smooth motorized gimbal tracking footage across the auditorium',
      'Dedicated external microphone audio capture for crisp vocal recordings',
      'Organized multi-cam asset management for streamlined post-production'
    ],
    metrics: ['4K UHD 60FPS Master Footage', 'Zero Camera Shake', 'Synced Multi-Angle Audio'],
    link: '#'
  },
  {
    id: 'proj-videography-2',
    category: 'videography',
    name: 'Cinematic Storytelling Showcase',
    description: 'Widescreen 16:9 narrative visual production with deliberate pacing, b-roll composition, and ambient sound design.',
    cover: 'assets/projects/videography_cinematic.svg',
    tools: ['4K Video', 'Custom LUTs', 'Ambient Foley', 'Cinematography'],
    client: 'Creative Media Practice',
    role: 'Cinematographer & Director',
    timeline: '2 Weeks',
    details: 'Framed scenes using rule-of-thirds, depth layering, smooth pans, and coordinated ambient audio capture.',
    overview: 'A short visual film exploring atmosphere and mood. Every shot was storyboarded to establish depth through foreground framing, controlled focal transitions (rack focus), and widescreen cinematic composition.',
    deliverables: [
      '2.39:1 widescreen anamorphic aspect ratio presentation',
      'Deliberate optical focus pulls and depth-layered compositions',
      'Rich multi-channel ambient foley sound design (wind, steps, room tone)',
      'Custom color grading curve inspired by contemporary film palettes'
    ],
    metrics: ['2.39:1 Cinematic Letterbox', 'Rich Spatial Soundscape', 'Story-Driven Visual Pacing'],
    link: '#'
  },
  {
    id: 'proj-videography-3',
    category: 'videography',
    name: 'Product & Creative Motion B-Roll',
    description: 'Detailed slow-motion product reveal shots with controlled lighting and close-up macro perspectives.',
    cover: 'assets/projects/videography_product.svg',
    tools: ['Gimbal Rig', 'High FPS', 'Premiere Pro'],
    client: 'Commercial Product Mockup',
    role: 'Videographer & Lighting Tech',
    timeline: '3 Days',
    details: 'Lighting setups, smooth orbital camera moves, and reflective surface exposure management.',
    overview: 'Commercial-style product presentation shots highlighting textures, physical contours, and craftsmanship using smooth circular 360-degree camera orbits and soft continuous LED studio lighting.',
    deliverables: [
      'Controlled 3-point key, fill, and rim lighting setups',
      'High-frame-rate 120fps macro footage of fine mechanical details',
      'Reflective surface glare control using polarizers and diffusion panels',
      'Color graded commercial video clips ready for digital advertising'
    ],
    metrics: ['120fps Butter-Smooth Motion', 'Studio-Grade Lighting Ratios', 'Commercial Advertising Grade'],
    link: '#'
  },

  // 6. Graphic Design Projects
  {
    id: 'proj-graphic-1',
    category: 'graphic',
    name: 'Brand Identity & Vector Mark System',
    description: 'Complete brand mark design, monochrome alternatives, typography hierarchy, and brand stationery guidelines.',
    cover: 'assets/projects/graphic_branding.svg',
    tools: ['Adobe Illustrator', 'Photoshop', 'Vector Art', 'Typography'],
    client: 'Personal & Client Brand System',
    role: 'Brand Identity Designer',
    timeline: '2 Weeks',
    details: 'Geometric logo construction, precise bezier curves, CMYK & RGB color palettes, and social media avatar exports.',
    overview: 'A comprehensive brand identity engineered with mathematical precision. Features geometric grid alignment, custom bezier curves, negative space balance, and an integrated guidelines guide detailing color usage and safe margins.',
    deliverables: [
      'Vector master logo files in SVG, EPS, and high-resolution PNG',
      'Light, dark, and monochrome brand mark variations',
      'Brand guideline document specifying color hex codes and minimum sizes',
      'Social media avatar kits and stationery mockup presentations'
    ],
    metrics: ['Infinite Vector Scalability', 'Golden Ratio Geometry', 'Multi-Format Asset Kit'],
    link: '#'
  },
  {
    id: 'proj-graphic-2',
    category: 'graphic',
    name: 'Social Media Promotional Banner Kit',
    description: 'High-contrast promotional visual sets crafted for social media advertising and feed marketing.',
    cover: 'assets/projects/graphic_social_banner.svg',
    tools: ['Photoshop', 'Canva', 'Ad Layouts'],
    client: 'E-Commerce & Digital Marketing',
    role: 'Graphic Designer',
    timeline: '3 Days',
    details: 'Designed 1080x1080 and 1080x1920 advertising templates with clear call-to-actions, offer badges, and typography.',
    overview: 'Advertising banners structured to stop social media feed scrolling. Leverages high-contrast focal points, legible sans-serif headlines, offer badges, and directional arrows that guide the user’s gaze directly toward the action CTA.',
    deliverables: [
      '1080x1080 square banners optimized for Instagram and Facebook feeds',
      '1080x1920 vertical story templates with swipe-up visual cues',
      'Layered PSD source templates for rapid text and discount edits',
      'Optimized lightweight web export assets under 200KB'
    ],
    metrics: ['High-Contrast Feed Stopping Power', 'Layered Reusable Templates', 'Clean Typography Layouts'],
    link: '#'
  },
  {
    id: 'proj-graphic-3',
    category: 'graphic',
    name: 'Editorial Typography & Poster Series',
    description: 'Modern grid-aligned poster compositions emphasizing bold type pairings, negative space, and visual rhythm.',
    cover: 'assets/projects/graphic_typography_poster.svg',
    tools: ['Adobe Illustrator', 'Photoshop', 'Print Layout'],
    client: 'Creative Exhibition Concept',
    role: 'Typographic Designer',
    timeline: '1 Week',
    details: 'Explored asymmetric typographic balance, texture overlays, and print-ready high-resolution CMYK preparation.',
    overview: 'An artistic homage to Swiss International Style and modernist Bauhaus principles. Employs strong asymmetric typographic weights, subtle geometric overlays, and mathematical column grids to achieve visual balance.',
    deliverables: [
      'Print-ready high-resolution 300 DPI CMYK poster files',
      'Asymmetric 4-column typographic layout system',
      'Subtle distressed paper grain and texture overlay treatments',
      'Digital vector exhibition catalog cover artwork'
    ],
    metrics: ['300 DPI Print Fidelity', 'Swiss Typographic Grid', 'High-Impact Visual Contrast'],
    link: '#'
  },

  // 7. Digital Marketing Projects
  {
    id: 'proj-marketing-1',
    category: 'marketing',
    name: 'Meta Ads Conversion Campaign Architecture',
    description: 'Facebook & Instagram conversion campaigns featuring multi-variant creative testing and audience targeting.',
    cover: 'assets/projects/marketing_meta_ads.svg',
    tools: ['Meta Ads Manager', 'Business Suite', 'A/B Testing', 'Copywriting'],
    client: 'Digital Marketing Practice',
    role: 'Media Buyer & Campaign Strategist',
    timeline: 'Ongoing Campaigns',
    details: 'Structured top-of-funnel engagement to bottom-of-funnel retargeting ads, tracked CTR and cost-per-lead metrics.',
    overview: 'Full-funnel paid advertising setup on Meta Ads Manager. Designed to capture cold interest with high-impact video hooks (TOFU), nurture consideration with carousel benefit breakdowns (MOFU), and close conversions with time-sensitive retargeting offers (BOFU).',
    deliverables: [
      '3-Tier funnel campaign architecture inside Meta Ads Manager',
      'Multi-variant A/B testing matrix for headlines, creatives, and CTAs',
      'Custom audience segmentation excluding previous purchasers',
      'Weekly performance reporting tracking CTR, CPC, and blended ROAS'
    ],
    metrics: ['4.8x Return on Ad Spend (ROAS)', '10.3% Average Click-Through Rate', 'Optimized Cost-Per-Lead'],
    link: '#'
  },
  {
    id: 'proj-marketing-2',
    category: 'marketing',
    name: 'Social Media Content & Growth Strategy',
    description: 'Coordinated social media publishing calendar, reel scheduling, and engagement tracking across platforms.',
    cover: 'assets/projects/marketing_growth_strategy.svg',
    tools: ['Meta Business Suite', 'Content Strategy', 'Analytics'],
    client: 'Organic Brand Growth',
    role: 'Content Strategist',
    timeline: '3 Months Execution',
    details: 'Analyzed high-engagement posting times, audience retention on reels, and hashtag cluster optimization.',
    overview: 'Structured content strategy for building an engaged organic social audience. Established thematic content pillars (Behind-the-scenes, Tutorials, High-energy Reels, Portfolio Showcases) and monitored metric trends.',
    deliverables: [
      '30-Day strategic social media editorial calendar',
      'Keyword and hashtag taxonomy tailored to design and tech communities',
      'Engagement benchmark scorecard tracking follower conversion rates',
      'Audience retention analysis identifying optimal video pacing hooks'
    ],
    metrics: ['+340% Total Account Reach', '2.5x Engagement Rate Surge', 'Consistent Multi-Platform Schedule'],
    link: '#'
  },
  {
    id: 'proj-marketing-3',
    category: 'marketing',
    name: 'Full-Funnel Retargeting Sequence',
    description: 'Social proof ad formats, customer testimonials, and time-sensitive promotional creatives.',
    cover: 'assets/projects/marketing_retargeting.svg',
    tools: ['Meta Pixel', 'Audience Retargeting', 'Ad Analytics'],
    client: 'Conversion Rate Optimization',
    role: 'Performance Marketer',
    timeline: '1 Month',
    details: 'Configured custom website visitor retargeting audiences and designed sequential testimonial creatives.',
    overview: 'Re-engaging website visitors who browsed service pages without taking action. Leveraged Meta Pixel standard events (`ViewContent`, `AddToCart`, `Lead`) to deliver sequential testimonials that addressed common friction points.',
    deliverables: [
      'Meta Pixel custom event integration and domain verification',
      'Dynamic product retargeting ads featuring user testimonials',
      'Frequency cap controls to prevent ad fatigue among prospects',
      'Conversion tracking dashboard with daily budget reallocations'
    ],
    metrics: ['Low CPA (Cost Per Acquisition)', 'Zero Ad Fatigue Frequency', 'High Conversion Rate'],
    link: '#'
  },

  // 8. IT & Technical Projects
  {
    id: 'proj-tech-1',
    category: 'technical',
    name: 'Relational Database Schema & System Architecture',
    description: 'Applied computing project at Northern University Bangladesh focusing on database normalization and query optimization.',
    cover: 'assets/projects/tech_database.svg',
    tools: ['SQL', 'Relational DB', 'SDLC', 'Database Systems'],
    client: 'Northern University Bangladesh (B.Sc CSE)',
    role: 'Database Engineer & Developer',
    timeline: 'Academic Semester Project',
    details: 'Designed 3NF normalized tables, primary and foreign key constraints, indexes, and stored query logic.',
    overview: 'A robust relational database architecture designed to support e-commerce operations. Eliminates data redundancy via Third Normal Form (3NF) normalization, enforces referential integrity with foreign key cascades, and implements B-Tree indexing on high-frequency search columns.',
    deliverables: [
      'Complete Entity-Relationship Diagram (ERD) with cardinality mappings',
      'SQL Data Definition Language (DDL) scripts with constraints and indexes',
      'Complex multi-table JOIN queries and stored procedures',
      'Query execution plan analysis showing sub-millisecond lookups'
    ],
    metrics: ['Strict 3NF Normalization', 'Zero Data Redundancy', 'Optimized B-Tree Indexing'],
    link: '#'
  },
  {
    id: 'proj-tech-2',
    category: 'technical',
    name: 'LAN Network Infrastructure & Diagnostics',
    description: 'Hands-on network infrastructure deployment at Cumilla Polytechnic Institute including router configuration.',
    cover: 'assets/projects/tech_network.svg',
    tools: ['Networking', 'LAN Cabling', 'IP Routing', 'Hardware Tools'],
    client: 'Cumilla Polytechnic Institute Lab',
    role: 'Network Technician',
    timeline: 'Lab Deployment',
    details: 'Structured Ethernet cabling, RJ45 crimping, DHCP subnet assignment, switch configuration, and latency testing.',
    overview: 'Designing and deploying a structured local area network (LAN) for a 30-workstation computer lab. Covered physical Cat6 cable runs, EIA/TIA-568B RJ45 crimping, punch-down patch panels, router DHCP subnetting, and switch VLAN configuration.',
    deliverables: [
      'Physical Cat6 cabling infrastructure with cable management raceways',
      'Router IP configuration: Subnet masks, default gateways, and DNS setup',
      'Managed 24-port switch configuration with VLAN isolation',
      'End-to-end ping latency diagnostics and throughput certification'
    ],
    metrics: ['Gigabit Full-Duplex Speed', 'Zero Packet Loss in Benchmarks', 'Clean Structured Wiring'],
    link: '#'
  },
  {
    id: 'proj-tech-3',
    category: 'technical',
    name: 'Workstation Assembly & Diagnostics Suite',
    description: 'Comprehensive computer hardware diagnostics, component upgrades, and Windows OS configuration protocol.',
    cover: 'assets/projects/tech_workstation.svg',
    tools: ['Hardware Diagnostics', 'Windows 11', 'BIOS', 'Troubleshooting'],
    client: 'Computer Systems Lab Practice',
    role: 'Hardware & Systems Specialist',
    timeline: 'Ongoing Practice',
    details: 'Benchmarked CPU/GPU thermals, deployed clean operating system images, and resolved device driver conflicts.',
    overview: 'Custom high-performance PC workstation assembly tailored for heavy 4K video editing and 3D modeling workflows. Includes component compatibility verification, thermal paste application, airflow optimization, BIOS XMP memory profiling, and clean Windows OS deployment.',
    deliverables: [
      'Precision PC assembly: CPU, dual-channel RAM, NVMe PCIe 4.0 SSD, GPU',
      'Thermal performance stress testing under sustained AIDA64 / FurMark loads',
      'BIOS configuration: UEFI mode, Secure Boot, and XMP memory profiles',
      'Driver validation and OS optimization stripping telemetry bloat'
    ],
    metrics: ['Sub-45°C Idle CPU Thermals', '7,200+ MB/s NVMe Read Speed', '100% Hardware Stability'],
    link: '#'
  }
];

// Expose default projects globally so Admin and Public site share identical baseline data
window.DEFAULT_PROJECTS = DEFAULT_PROJECTS;

const PROJECTS_STORAGE_KEY = 'foysal_portfolio_projects_db';

class ProjectsGalleryManager {
  constructor() {
    this.expansionState = {}; // category -> 0: show 3, 1: show 6, 2: show all
    this.currentCategory = 'uiux';
    this.projects = this.loadProjects();

    this.init();
  }

  loadProjects() {
    try {
      const saved = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        } else if (typeof parsed === 'object' && parsed !== null) {
          const list = [];
          Object.keys(parsed).forEach((cat) => {
            if (Array.isArray(parsed[cat])) {
              parsed[cat].forEach((p) => {
                list.push({
                  ...p,
                  category: p.category || cat,
                  description: p.description || p.desc || ''
                });
              });
            }
          });
          if (list.length > 0) return list;
        }
      }
    } catch (e) {
      console.warn('Projects storage load error, resetting to rich defaults', e);
    }

    this.saveProjects(DEFAULT_PROJECTS);
    return [...DEFAULT_PROJECTS];
  }

  saveProjects(list) {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('projectsUpdated', { detail: { projects: list } }));
    } catch (e) {
      console.warn('Save projects error', e);
    }
  }

  init() {
    this.bindTabs();
    this.bindModalEvents();
    this.renderAllGalleries();

    // Listen for admin project updates across events and storage
    window.addEventListener('projectsUpdated', () => {
      this.projects = this.loadProjects();
      this.renderAllGalleries();
    });

    window.addEventListener('portfolioProjectsUpdated', () => {
      this.projects = this.loadProjects();
      this.renderAllGalleries();
    });

    window.addEventListener('storage', (e) => {
      if (e.key === PROJECTS_STORAGE_KEY || !e.key) {
        this.projects = this.loadProjects();
        this.renderAllGalleries();
      }
    });
  }

  bindTabs() {
    const tabs = document.querySelectorAll('.gallery-tab-btn');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const targetCat = tab.getAttribute('data-gallery-target');
        this.currentCategory = targetCat;

        const galleries = document.querySelectorAll('.gallery-container');
        galleries.forEach((g) => {
          if (g.id === `gallery-${targetCat}`) {
            g.classList.add('active');
          } else {
            g.classList.remove('active');
          }
        });
      });
    });
  }

  bindModalEvents() {
    const modal = document.getElementById('projectDetailsModal');
    const closeBtn = document.getElementById('projectModalCloseBtn');
    const backdrop = document.getElementById('projectModalBackdrop');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeModal());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  renderAllGalleries() {
    const categories = ['uiux', 'webdev', 'video', 'photography', 'videography', 'graphic', 'marketing', 'technical'];

    categories.forEach((cat) => {
      this.renderCategoryGallery(cat);
    });
  }

  renderCategoryGallery(category) {
    const container = document.getElementById(`gallery-${category}`);
    if (!container) return;

    const catProjects = this.projects.filter((p) => p.category === category);
    const gridEl = container.querySelector('.gallery-cards-grid');
    const toggleWrapper = container.querySelector('.gallery-toggle-area');

    if (!gridEl) return;

    gridEl.innerHTML = '';

    // If empty category, display "Projects Coming Soon"
    if (catProjects.length === 0) {
      gridEl.innerHTML = `
        <div class="empty-gallery-state">
          <div class="empty-icon">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="1.5">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              <line x1="12" y1="11" x2="12" y2="17"></line>
              <line x1="9" y1="14" x2="15" y2="14"></line>
            </svg>
          </div>
          <h4>Projects Coming Soon</h4>
          <p>Curated projects in this discipline are being finalized and will be featured here shortly.</p>
        </div>
      `;
      if (toggleWrapper) toggleWrapper.innerHTML = '';
      return;
    }

    // Multi-tier progressive disclosure:
    // 1 to 3 projects: shows them
    // > 3 and <= 6: shows 3, expands to all (up to 6)
    // > 6: shows 3, expands to 6, expands to ALL, collapses back to 3
    const total = catProjects.length;
    const currentLevel = this.expansionState[category] || 0;

    let visibleCount = 3;
    if (total <= 3) {
      visibleCount = total;
    } else if (total <= 6) {
      visibleCount = currentLevel === 1 ? total : 3;
    } else {
      if (currentLevel === 0) visibleCount = 3;
      else if (currentLevel === 1) visibleCount = 6;
      else visibleCount = total;
    }

    const visibleProjects = catProjects.slice(0, visibleCount);

    visibleProjects.forEach((proj) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.id = `card-${proj.id}`;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View full case study for ${proj.name}`);

      // User Instruction: "project are name thakbe are caption thakbe are kicui dekha jabe na upor theke baki shob clike krle dekhte pabe"
      card.innerHTML = `
        <div class="project-cover-frame">
          <img src="${proj.cover || proj.image || 'assets/projects/uiux_banking.svg'}" alt="${proj.name}" class="project-cover-img" loading="lazy">
        </div>
        <div class="project-card-content">
          <h4 class="project-title">${proj.name}</h4>
          <p class="project-short-desc">${proj.description || proj.desc || ''}</p>
        </div>
      `;

      // Click to open full details modal
      card.addEventListener('click', () => {
        this.openModal(proj.id);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openModal(proj.id);
        }
      });

      gridEl.appendChild(card);
    });

    // Independent View More Projects / Progressive Disclosure Button
    if (toggleWrapper) {
      if (total <= 3) {
        toggleWrapper.innerHTML = '';
      } else if (total <= 6) {
        const isAll = currentLevel === 1;
        toggleWrapper.innerHTML = `
          <button class="btn btn-gold-outline category-toggle-btn" data-cat="${category}">
            <span>${isAll ? 'Show Less' : `View More Projects (${total - 3} More)`}</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: ${isAll ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform 0.3s ease;">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        `;

        const btn = toggleWrapper.querySelector('.category-toggle-btn');
        btn.addEventListener('click', () => {
          this.expansionState[category] = isAll ? 0 : 1;
          this.renderCategoryGallery(category);
        });
      } else {
        // total > 6: 3 levels (3 -> 6 -> All -> 3)
        let btnText = '';
        let isCollapse = false;

        if (currentLevel === 0) {
          btnText = `View More (Show 6 of ${total})`;
        } else if (currentLevel === 1) {
          btnText = `View All Projects (${total} Total)`;
        } else {
          btnText = 'Show Less';
          isCollapse = true;
        }

        toggleWrapper.innerHTML = `
          <button class="btn btn-gold-outline category-toggle-btn" data-cat="${category}">
            <span>${btnText}</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: ${isCollapse ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform 0.3s ease;">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        `;

        const btn = toggleWrapper.querySelector('.category-toggle-btn');
        btn.addEventListener('click', () => {
          if (currentLevel === 0) {
            this.expansionState[category] = 1; // show 6
          } else if (currentLevel === 1) {
            this.expansionState[category] = 2; // show all
          } else {
            this.expansionState[category] = 0; // collapse to 3
          }
          this.renderCategoryGallery(category);
        });
      }
    }
  }

  openModal(projectId) {
    const proj = this.projects.find((p) => p.id === projectId);
    if (!proj) return;

    const modal = document.getElementById('projectDetailsModal');
    const modalBody = document.getElementById('projectModalBody');
    if (!modal || !modalBody) return;

    const catLabel = this.getCategoryLabel(proj.category);
    const deliverables = proj.deliverables || [
      'Comprehensive research and visual exploration',
      'Production-ready assets optimized for platform guidelines',
      'Iterative refinement based on usability and feedback criteria'
    ];
    const metrics = proj.metrics || ['100% Quality Verified', 'High Performance Standard'];

    modalBody.innerHTML = `
      <div class="modal-project-hero">
        <div class="modal-project-badge-row">
          <span class="modal-badge-cat">${catLabel}</span>
          <span class="modal-badge-status">Showcase Ready</span>
        </div>
        <h2 class="modal-project-title">${proj.name}</h2>
        <p class="modal-project-caption">${proj.description || proj.desc || ''}</p>
      </div>

      <div class="modal-cover-wrapper">
        <img src="${proj.cover || 'assets/projects/uiux_banking.svg'}" alt="${proj.name}" class="modal-cover-banner">
      </div>

      <div class="modal-specs-grid">
        <div class="spec-card">
          <span class="spec-label">Discipline</span>
          <span class="spec-val">${catLabel}</span>
        </div>
        <div class="spec-card">
          <span class="spec-label">Client / Context</span>
          <span class="spec-val">${proj.client || 'Creative & Engineering Practice'}</span>
        </div>
        <div class="spec-card">
          <span class="spec-label">Creator / Role</span>
          <span class="spec-val">${proj.role || 'MD Foysal Al Nur'}</span>
        </div>
        <div class="spec-card">
          <span class="spec-label">Timeline</span>
          <span class="spec-val">${proj.timeline || 'Project Completed'}</span>
        </div>
      </div>

      <div class="modal-section-block">
        <h3 class="modal-subheading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Project Overview & Challenge</span>
        </h3>
        <p class="modal-paragraph">${proj.overview || proj.details || 'A comprehensive hands-on implementation demonstrating modern standards, design thinking, and technical precision.'}</p>
      </div>

      <div class="modal-section-block">
        <h3 class="modal-subheading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          <span>Key Deliverables & Solutions</span>
        </h3>
        <ul class="modal-deliverables-list">
          ${deliverables
            .map(
              (d) => `
            <li class="deliverable-item">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${d}</span>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>

      <div class="modal-section-block">
        <h3 class="modal-subheading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>Tools & Software Stack</span>
        </h3>
        <div class="modal-tools-chips">
          ${(proj.tools || []).map((t) => `<span class="chip-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="modal-section-block">
        <h3 class="modal-subheading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Performance & Quality Metrics</span>
        </h3>
        <div class="modal-metrics-row">
          ${metrics
            .map(
              (m) => `
            <div class="metric-pill">
              <span class="pill-dot"></span>
              <span>${m}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <div class="modal-actions-footer">
        ${
          proj.link && proj.link !== '#'
            ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary modal-action-btn">
                 <span>Open Prototype / External View</span>
                 <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
               </a>`
            : ''
        }
        <button class="btn btn-outline modal-action-btn" onclick="window.projectsManagerInstance.closeModal()">
          <span>Close Window</span>
        </button>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.getElementById('projectDetailsModal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  getCategoryLabel(cat) {
    const map = {
      uiux: 'UI/UX Design',
      webdev: 'Web Development',
      video: 'Video Editing',
      photography: 'Photography',
      videography: 'Videography',
      graphic: 'Graphic Design',
      marketing: 'Digital Marketing',
      technical: 'IT & Technical'
    };
    return map[cat] || cat;
  }

  // Public CRUD methods for Admin
  addProject(project) {
    if (!project.id) project.id = 'proj-' + Date.now();
    this.projects.push(project);
    this.saveProjects(this.projects);
    this.renderCategoryGallery(project.category);
  }

  editProject(project) {
    const idx = this.projects.findIndex((p) => p.id === project.id);
    if (idx !== -1) {
      this.projects[idx] = project;
      this.saveProjects(this.projects);
      this.renderCategoryGallery(project.category);
    }
  }

  deleteProject(projectId) {
    const proj = this.projects.find((p) => p.id === projectId);
    const cat = proj ? proj.category : null;
    this.projects = this.projects.filter((p) => p.id !== projectId);
    this.saveProjects(this.projects);
    if (cat) this.renderCategoryGallery(cat);
  }
}

// Global reference for public & admin synchronization
window.ProjectsGalleryManager = ProjectsGalleryManager;

document.addEventListener('DOMContentLoaded', () => {
  window.projectsManagerInstance = new ProjectsGalleryManager();
});
