const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../assets/projects');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function makeSVG(title, category, subtitle, visualContent) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050912"/>
      <stop offset="50%" stop-color="#09142e"/>
      <stop offset="100%" stop-color="#0F1F6D"/>
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#162E93"/>
      <stop offset="100%" stop-color="#60A5FA"/>
    </linearGradient>
    <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#60A5FA" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(96, 165, 250, 0.07)" stroke-width="1"/>
    </pattern>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Layer -->
  <rect width="800" height="500" fill="url(#bgGrad)"/>
  <rect width="800" height="500" fill="url(#grid)"/>

  <!-- Top Accent Beam -->
  <rect x="0" y="0" width="800" height="4" fill="url(#primaryGrad)"/>

  <!-- Header Meta -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="120" height="24" rx="12" fill="rgba(96, 165, 250, 0.12)" stroke="rgba(96, 165, 250, 0.3)"/>
    <circle cx="12" cy="12" r="4" fill="#60A5FA"/>
    <text x="24" y="16" fill="#60A5FA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="1">${category.toUpperCase()}</text>
  </g>

  <!-- Visual Central Workspace -->
  <g transform="translate(40, 90)">
    ${visualContent}
  </g>

  <!-- Bottom Label Bar -->
  <g transform="translate(40, 435)">
    <line x1="0" y1="0" x2="720" y2="0" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
    <text x="0" y="32" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700">${title}</text>
    <text x="720" y="32" text-anchor="end" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13">${subtitle}</text>
  </g>
</svg>`;
}

const projects = [
  // UI/UX
  {
    file: 'uiux_banking.svg',
    title: 'FinTech Banking & Dashboard UX',
    category: 'UI/UX Design',
    sub: 'Figma • Design Tokens • Prototyping',
    content: `
      <!-- Window Frame -->
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)" stroke-width="1.5"/>
      <!-- Window Titlebar -->
      <path d="M 0 12 Q 0 0 12 0 L 708 0 Q 720 0 720 12 L 720 36 L 0 36 Z" fill="#0A1329"/>
      <circle cx="20" cy="18" r="5" fill="#EF4444"/>
      <circle cx="36" cy="18" r="5" fill="#F59E0B"/>
      <circle cx="52" cy="18" r="5" fill="#10B981"/>
      <text x="360" y="22" text-anchor="middle" fill="#94A3B8" font-size="11" font-family="sans-serif">dashboard.fintech.bank • Dark Mode Design System</text>
      
      <!-- Left Sidebar -->
      <rect x="15" y="50" width="130" height="245" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
      <rect x="25" y="65" width="80" height="12" rx="4" fill="#60A5FA"/>
      <rect x="25" y="95" width="110" height="8" rx="3" fill="rgba(255,255,255,0.2)"/>
      <rect x="25" y="115" width="95" height="8" rx="3" fill="rgba(255,255,255,0.1)"/>
      <rect x="25" y="135" width="105" height="8" rx="3" fill="rgba(255,255,255,0.1)"/>
      <rect x="25" y="155" width="85" height="8" rx="3" fill="rgba(255,255,255,0.1)"/>

      <!-- Stat Cards -->
      <rect x="160" y="50" width="170" height="75" rx="8" fill="rgba(22, 46, 147, 0.3)" stroke="rgba(96, 165, 250, 0.3)"/>
      <text x="175" y="75" fill="#94A3B8" font-size="11" font-family="sans-serif">Total Liquid Balance</text>
      <text x="175" y="105" fill="#FFFFFF" font-size="20" font-weight="700" font-family="sans-serif">$48,250.00</text>
      
      <rect x="345" y="50" width="170" height="75" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
      <text x="360" y="75" fill="#94A3B8" font-size="11" font-family="sans-serif">Monthly Cashflow</text>
      <text x="360" y="105" fill="#10B981" font-size="20" font-weight="700" font-family="sans-serif">+$12,480.00</text>

      <rect x="530" y="50" width="175" height="75" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
      <text x="545" y="75" fill="#94A3B8" font-size="11" font-family="sans-serif">Active Investments</text>
      <text x="545" y="105" fill="#60A5FA" font-size="20" font-weight="700" font-family="sans-serif">8 Portfolios</text>

      <!-- Main Chart Area -->
      <rect x="160" y="140" width="545" height="155" rx="8" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.06)"/>
      <path d="M 180 260 Q 240 220 300 240 T 420 180 T 540 210 T 680 160" fill="none" stroke="#60A5FA" stroke-width="3" filter="url(#glow)"/>
      <path d="M 180 260 Q 240 220 300 240 T 420 180 T 540 210 T 680 160 L 680 280 L 180 280 Z" fill="url(#cyanGlow)" opacity="0.4"/>
      <circle cx="680" cy="160" r="5" fill="#60A5FA" stroke="#FFFFFF" stroke-width="2"/>
    `
  },
  {
    file: 'uiux_ecommerce.svg',
    title: 'Mobile E-Commerce Flow & App Prototype',
    category: 'UI/UX Design',
    sub: 'Figma • Mobile UX • Checkout Funnel',
    content: `
      <!-- Phone Mockup 1 -->
      <rect x="80" y="10" width="160" height="290" rx="24" fill="#0A1329" stroke="rgba(96, 165, 250, 0.4)" stroke-width="3"/>
      <rect x="120" y="16" width="80" height="10" rx="5" fill="#050912"/>
      <rect x="95" y="45" width="130" height="90" rx="10" fill="rgba(22, 46, 147, 0.5)"/>
      <circle cx="160" cy="90" r="28" fill="rgba(96, 165, 250, 0.3)"/>
      <rect x="95" y="150" width="90" height="10" rx="4" fill="#FFFFFF"/>
      <rect x="95" y="168" width="60" height="8" rx="3" fill="#60A5FA"/>
      <rect x="95" y="195" width="130" height="28" rx="8" fill="#162E93"/>
      <text x="160" y="213" text-anchor="middle" fill="#FFFFFF" font-size="10" font-weight="700">ADD TO CART</text>

      <!-- Phone Mockup 2 (Center Primary) -->
      <rect x="280" y="0" width="170" height="305" rx="26" fill="#0B1633" stroke="#60A5FA" stroke-width="3.5" filter="url(#glow)"/>
      <rect x="325" y="8" width="80" height="12" rx="6" fill="#050912"/>
      <rect x="295" y="35" width="140" height="110" rx="12" fill="url(#primaryGrad)" opacity="0.8"/>
      <text x="365" y="95" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="800">PRO</text>
      <rect x="295" y="160" width="110" height="12" rx="4" fill="#FFFFFF"/>
      <text x="295" y="190" fill="#60A5FA" font-size="16" font-weight="800">$189.00</text>
      <rect x="295" y="210" width="140" height="35" rx="10" fill="#60A5FA"/>
      <text x="365" y="232" text-anchor="middle" fill="#050912" font-size="12" font-weight="800">INSTANT CHECKOUT</text>
      <!-- Bottom Nav -->
      <rect x="295" y="265" width="140" height="25" rx="8" fill="rgba(255,255,255,0.05)"/>
      <circle cx="320" cy="277" r="4" fill="#60A5FA"/>
      <circle cx="365" cy="277" r="4" fill="#94A3B8"/>
      <circle cx="410" cy="277" r="4" fill="#94A3B8"/>

      <!-- Phone Mockup 3 -->
      <rect x="490" y="10" width="160" height="290" rx="24" fill="#0A1329" stroke="rgba(96, 165, 250, 0.4)" stroke-width="3"/>
      <rect x="530" y="16" width="80" height="10" rx="5" fill="#050912"/>
      <text x="570" y="60" text-anchor="middle" fill="#10B981" font-size="14" font-weight="700">Order Confirmed</text>
      <circle cx="570" cy="110" r="30" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" stroke-width="2"/>
      <path d="M 558 110 L 566 118 L 582 102" fill="none" stroke="#10B981" stroke-width="3"/>
      <rect x="505" y="165" width="130" height="50" rx="8" fill="rgba(255,255,255,0.03)"/>
      <rect x="505" y="235" width="130" height="28" rx="8" fill="rgba(255,255,255,0.1)"/>
    `
  },
  {
    file: 'uiux_design_system.svg',
    title: 'Creative Portfolio UI Design System',
    category: 'UI/UX Design',
    sub: 'Design Tokens • Auto-Layout • Atomic UI',
    content: `
      <!-- Canvas Board -->
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)" stroke-width="1.5"/>
      <text x="30" y="35" fill="#60A5FA" font-size="14" font-weight="700">COLOR PALETTE TOKENS</text>
      
      <!-- Color Chips -->
      <g transform="translate(30, 50)">
        <rect x="0" y="0" width="60" height="45" rx="6" fill="#050912" stroke="#60A5FA" stroke-width="1"/>
        <text x="5" y="60" fill="#94A3B8" font-size="9">#050912</text>
        
        <rect x="75" y="0" width="60" height="45" rx="6" fill="#162E93"/>
        <text x="80" y="60" fill="#94A3B8" font-size="9">#162E93</text>

        <rect x="150" y="0" width="60" height="45" rx="6" fill="#0F1F6D"/>
        <text x="155" y="60" fill="#94A3B8" font-size="9">#0F1F6D</text>

        <rect x="225" y="0" width="60" height="45" rx="6" fill="#60A5FA"/>
        <text x="230" y="60" fill="#60A5FA" font-size="9" font-weight="700">#60A5FA</text>

        <rect x="300" y="0" width="60" height="45" rx="6" fill="#FFFFFF"/>
        <text x="305" y="60" fill="#FFFFFF" font-size="9">#FFFFFF</text>
      </g>

      <!-- Typography Scale -->
      <g transform="translate(420, 30)">
        <text x="0" y="20" fill="#60A5FA" font-size="14" font-weight="700">TYPOGRAPHY HIERARCHY</text>
        <text x="0" y="55" fill="#FFFFFF" font-size="24" font-weight="800">Display Hero (48px)</text>
        <text x="0" y="85" fill="#FFFFFF" font-size="18" font-weight="700">H2 Section Heading (28px)</text>
        <text x="0" y="110" fill="#94A3B8" font-size="14">Body Regular Inter Sans-Serif (16px)</text>
      </g>

      <!-- Component Variants Section -->
      <line x1="30" y1="165" x2="690" y2="165" stroke="rgba(255,255,255,0.08)"/>
      <text x="30" y="195" fill="#60A5FA" font-size="14" font-weight="700">BUTTON ATOMS & VARIANTS</text>
      
      <!-- Primary Pill -->
      <g transform="translate(30, 215)">
        <rect x="0" y="0" width="140" height="42" rx="21" fill="url(#primaryGrad)"/>
        <text x="70" y="26" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="700">Primary CTA</text>
      </g>

      <!-- Cyber Outline -->
      <g transform="translate(190, 215)">
        <rect x="0" y="0" width="140" height="42" rx="8" fill="rgba(96, 165, 250, 0.08)" stroke="#60A5FA" stroke-width="1.5"/>
        <text x="70" y="26" text-anchor="middle" fill="#60A5FA" font-size="12" font-weight="700">Cyber Glass</text>
      </g>

      <!-- Ghost / Secondary -->
      <g transform="translate(350, 215)">
        <rect x="0" y="0" width="140" height="42" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)"/>
        <text x="70" y="26" text-anchor="middle" fill="#FFFFFF" font-size="12">Secondary</text>
      </g>
    `
  },

  // WEB DEV
  {
    file: 'webdev_portfolio.svg',
    title: 'Personal Portfolio Architecture',
    category: 'Web Development',
    sub: 'HTML5 • CSS3 • JavaScript • Responsive Canvas',
    content: `
      <!-- Code Editor on Left -->
      <rect x="0" y="0" width="340" height="310" rx="10" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      <path d="M 0 10 Q 0 0 10 0 L 330 0 Q 340 0 340 10 L 340 32 L 0 32 Z" fill="#0A1329"/>
      <circle cx="16" cy="16" r="4" fill="#EF4444"/>
      <circle cx="28" cy="16" r="4" fill="#F59E0B"/>
      <circle cx="40" cy="16" r="4" fill="#10B981"/>
      <text x="170" y="20" text-anchor="middle" fill="#94A3B8" font-size="10">index.html &amp; main.js</text>

      <text x="20" y="65" fill="#60A5FA" font-family="monospace" font-size="12">const</text>
      <text x="70" y="65" fill="#FFFFFF" font-family="monospace" font-size="12">developer = {</text>
      <text x="35" y="90" fill="#94A3B8" font-family="monospace" font-size="12">name:</text>
      <text x="85" y="90" fill="#10B981" font-family="monospace" font-size="12">'MD FOYSAL AL NUR'</text>
      <text x="35" y="115" fill="#94A3B8" font-family="monospace" font-size="12">roles:</text>
      <text x="85" y="115" fill="#60A5FA" font-family="monospace" font-size="12">['UI/UX', 'Dev', 'Video']</text>
      <text x="35" y="140" fill="#94A3B8" font-family="monospace" font-size="12">degree:</text>
      <text x="95" y="140" fill="#10B981" font-family="monospace" font-size="12">'B.Sc CSE Northern Univ'</text>
      <text x="35" y="165" fill="#94A3B8" font-family="monospace" font-size="12">status:</text>
      <text x="95" y="165" fill="#F59E0B" font-family="monospace" font-size="12">'Available'</text>
      <text x="20" y="195" fill="#FFFFFF" font-family="monospace" font-size="12">};</text>

      <text x="20" y="235" fill="#60A5FA" font-family="monospace" font-size="12">initPortfolio(developer);</text>
      <text x="20" y="260" fill="#94A3B8" font-family="monospace" font-size="11">// 0 dependencies, 60fps canvas</text>

      <!-- Live Preview on Right -->
      <rect x="360" y="0" width="360" height="310" rx="10" fill="#0A1329" stroke="rgba(96, 165, 250, 0.4)"/>
      <rect x="380" y="30" width="120" height="10" rx="4" fill="#60A5FA"/>
      <rect x="380" y="60" width="220" height="24" rx="4" fill="#FFFFFF"/>
      <rect x="380" y="95" width="280" height="40" rx="6" fill="rgba(255,255,255,0.06)"/>
      <!-- Button Preview -->
      <rect x="380" y="155" width="130" height="36" rx="18" fill="url(#primaryGrad)"/>
      <text x="445" y="178" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="700">Explore Work</text>
      <!-- Floating Grid Element -->
      <circle cx="620" cy="220" r="50" fill="rgba(96, 165, 250, 0.15)" stroke="#60A5FA" stroke-width="2"/>
      <text x="620" y="226" text-anchor="middle" fill="#60A5FA" font-size="16" font-weight="800">&lt;/&gt;</text>
    `
  },
  {
    file: 'webdev_agency.svg',
    title: 'Responsive Agency Landing Page',
    category: 'Web Development',
    sub: 'CSS Grid • Flexbox • High-Conversion Layout',
    content: `
      <!-- Desktop Browser -->
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.3)"/>
      <!-- Top Navbar -->
      <rect x="0" y="0" width="720" height="45" fill="#0A1329"/>
      <circle cx="30" cy="22" r="8" fill="#60A5FA"/>
      <text x="45" y="27" fill="#FFFFFF" font-size="12" font-weight="700">AGENCY.IO</text>
      <text x="500" y="27" fill="#94A3B8" font-size="11">Services</text>
      <text x="560" y="27" fill="#94A3B8" font-size="11">Pricing</text>
      <rect x="620" y="10" width="80" height="26" rx="13" fill="#162E93"/>
      <text x="660" y="26" text-anchor="middle" fill="#FFFFFF" font-size="10" font-weight="700">Sign Up</text>

      <!-- Hero Banner -->
      <text x="50" y="110" fill="#FFFFFF" font-size="28" font-weight="800">Scale Your Brand Fast.</text>
      <text x="50" y="140" fill="#94A3B8" font-size="14">Data-driven design &amp; agile engineering under one roof.</text>
      <rect x="50" y="165" width="160" height="42" rx="8" fill="url(#primaryGrad)"/>
      <text x="130" y="191" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">Book A Demo</text>

      <!-- 3 Feature Cards Below -->
      <rect x="50" y="230" width="190" height="65" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
      <text x="70" y="255" fill="#60A5FA" font-size="12" font-weight="700">01. UI Systems</text>
      <text x="70" y="275" fill="#94A3B8" font-size="10">Pixel-perfect Figma designs</text>

      <rect x="260" y="230" width="190" height="65" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
      <text x="280" y="255" fill="#60A5FA" font-size="12" font-weight="700">02. Web Architecture</text>
      <text x="280" y="275" fill="#94A3B8" font-size="10">Clean semantic HTML &amp; JS</text>

      <rect x="470" y="230" width="200" height="65" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
      <text x="490" y="255" fill="#60A5FA" font-size="12" font-weight="700">03. Performance</text>
      <text x="490" y="275" fill="#94A3B8" font-size="10">Lighthouse 99+ Core Web Vitals</text>
    `
  },
  {
    file: 'webdev_dashboard.svg',
    title: 'Interactive DOM Data Table & Filter',
    category: 'Web Development',
    sub: 'Vanilla JS • Zero Dependencies • Client Search',
    content: `
      <!-- Table Container -->
      <rect x="0" y="0" width="720" height="310" rx="10" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Search Input Bar -->
      <rect x="20" y="20" width="260" height="36" rx="6" fill="#0A1329" stroke="rgba(96, 165, 250, 0.3)"/>
      <circle cx="40" cy="38" r="6" fill="none" stroke="#60A5FA" stroke-width="1.5"/>
      <line x1="44" y1="42" x2="50" y2="48" stroke="#60A5FA" stroke-width="1.5"/>
      <text x="60" y="43" fill="#FFFFFF" font-size="12">filter: "active"|</text>

      <!-- Action buttons -->
      <rect x="580" y="20" width="120" height="36" rx="6" fill="#162E93"/>
      <text x="640" y="43" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="700">Export CSV</text>

      <!-- Table Header -->
      <rect x="20" y="70" width="680" height="32" fill="rgba(255,255,255,0.04)"/>
      <text x="40" y="91" fill="#60A5FA" font-size="11" font-weight="700">ID</text>
      <text x="100" y="91" fill="#60A5FA" font-size="11" font-weight="700">PROJECT NAME</text>
      <text x="350" y="91" fill="#60A5FA" font-size="11" font-weight="700">CATEGORY</text>
      <text x="500" y="91" fill="#60A5FA" font-size="11" font-weight="700">STATUS</text>
      <text x="620" y="91" fill="#60A5FA" font-size="11" font-weight="700">REVENUE</text>

      <!-- Row 1 -->
      <rect x="20" y="110" width="680" height="40" fill="rgba(96, 165, 250, 0.05)"/>
      <text x="40" y="135" fill="#94A3B8" font-size="11">#001</text>
      <text x="100" y="135" fill="#FFFFFF" font-size="12" font-weight="600">FinTech Banking App</text>
      <text x="350" y="135" fill="#94A3B8" font-size="11">UI/UX Design</text>
      <rect x="495" y="120" width="60" height="20" rx="10" fill="rgba(16,185,129,0.2)"/>
      <text x="525" y="134" text-anchor="middle" fill="#10B981" font-size="10" font-weight="700">LIVE</text>
      <text x="620" y="135" fill="#FFFFFF" font-size="12">$3,400</text>

      <!-- Row 2 -->
      <rect x="20" y="160" width="680" height="40" fill="rgba(255,255,255,0.02)"/>
      <text x="40" y="185" fill="#94A3B8" font-size="11">#002</text>
      <text x="100" y="185" fill="#FFFFFF" font-size="12" font-weight="600">E-Commerce Mobile Flow</text>
      <text x="350" y="185" fill="#94A3B8" font-size="11">UI/UX Prototype</text>
      <rect x="495" y="170" width="60" height="20" rx="10" fill="rgba(96, 165, 250, 0.2)"/>
      <text x="525" y="184" text-anchor="middle" fill="#60A5FA" font-size="10" font-weight="700">READY</text>
      <text x="620" y="185" fill="#FFFFFF" font-size="12">$2,100</text>

      <!-- Row 3 -->
      <rect x="20" y="210" width="680" height="40" fill="rgba(255,255,255,0.01)"/>
      <text x="40" y="235" fill="#94A3B8" font-size="11">#003</text>
      <text x="100" y="235" fill="#FFFFFF" font-size="12" font-weight="600">4K Cinematic Video Reel</text>
      <text x="350" y="235" fill="#94A3B8" font-size="11">Video Editing</text>
      <rect x="495" y="220" width="60" height="20" rx="10" fill="rgba(16,185,129,0.2)"/>
      <text x="525" y="234" text-anchor="middle" fill="#10B981" font-size="10" font-weight="700">LIVE</text>
      <text x="620" y="235" fill="#FFFFFF" font-size="12">$1,850</text>
    `
  },

  // VIDEO EDITING
  {
    file: 'video_beat_reel.svg',
    title: 'Dynamic Motion & Beat-Synced Reel',
    category: 'Video Editing',
    sub: 'CapCut • InShot • Audio Beat Sync',
    content: `
      <!-- Smartphone 9:16 Frame -->
      <rect x="260" y="0" width="200" height="310" rx="20" fill="#0A1329" stroke="#60A5FA" stroke-width="2.5" filter="url(#glow)"/>
      <!-- Notch -->
      <rect x="320" y="8" width="80" height="10" rx="5" fill="#050912"/>
      
      <!-- Video Center Subject -->
      <rect x="275" y="30" width="170" height="200" rx="12" fill="url(#primaryGrad)" opacity="0.6"/>
      <circle cx="360" cy="120" r="35" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" stroke-width="2"/>
      <polygon points="352,105 352,135 376,120" fill="#FFFFFF"/>

      <text x="360" y="190" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="900" letter-spacing="1">BEAT SYNC</text>

      <!-- Audio Waveform Visualizer -->
      <g transform="translate(275, 240)">
        <rect x="0" y="15" width="4" height="20" rx="2" fill="#60A5FA"/>
        <rect x="10" y="5" width="4" height="40" rx="2" fill="#60A5FA"/>
        <rect x="20" y="0" width="4" height="50" rx="2" fill="#FFFFFF"/>
        <rect x="30" y="8" width="4" height="35" rx="2" fill="#60A5FA"/>
        <rect x="40" y="2" width="4" height="45" rx="2" fill="#FFFFFF"/>
        <rect x="50" y="12" width="4" height="25" rx="2" fill="#60A5FA"/>
        <rect x="60" y="0" width="4" height="50" rx="2" fill="#60A5FA"/>
        <rect x="70" y="18" width="4" height="15" rx="2" fill="#60A5FA"/>
        <rect x="80" y="6" width="4" height="38" rx="2" fill="#FFFFFF"/>
        <rect x="90" y="2" width="4" height="46" rx="2" fill="#60A5FA"/>
        <rect x="100" y="10" width="4" height="30" rx="2" fill="#60A5FA"/>
        <rect x="110" y="0" width="4" height="50" rx="2" fill="#FFFFFF"/>
        <rect x="120" y="14" width="4" height="22" rx="2" fill="#60A5FA"/>
        <rect x="130" y="5" width="4" height="40" rx="2" fill="#60A5FA"/>
        <rect x="140" y="18" width="4" height="14" rx="2" fill="#60A5FA"/>
        <rect x="150" y="8" width="4" height="34" rx="2" fill="#60A5FA"/>
        <rect x="160" y="2" width="4" height="45" rx="2" fill="#60A5FA"/>
      </g>
    `
  },
  {
    file: 'video_kinetic_subtitles.svg',
    title: 'Kinetic Subtitles & Educational Reel',
    category: 'Video Editing',
    sub: 'Typography Animations • Word Highlight',
    content: `
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Video Screen Area -->
      <rect x="40" y="30" width="640" height="170" rx="8" fill="#0A1329" stroke="rgba(255,255,255,0.06)"/>
      <text x="360" y="90" text-anchor="middle" fill="#94A3B8" font-size="20" font-weight="700">CREATIVITY IS JUST</text>
      
      <!-- Highlighted Word with Glow -->
      <rect x="180" y="110" width="360" height="60" rx="10" fill="url(#primaryGrad)"/>
      <text x="360" y="152" text-anchor="middle" fill="#FFFFFF" font-size="34" font-weight="900" letter-spacing="2" filter="url(#glow)">CONNECTING THINGS</text>

      <!-- Keyframe Timeline -->
      <line x1="40" y1="230" x2="680" y2="230" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <polygon points="360,215 365,225 355,225" fill="#60A5FA"/>
      <line x1="360" y1="225" x2="360" y2="295" stroke="#60A5FA" stroke-width="2"/>

      <rect x="60" y="245" width="100" height="30" rx="4" fill="rgba(255,255,255,0.06)"/>
      <text x="110" y="264" text-anchor="middle" fill="#94A3B8" font-size="10">Word 01</text>
      
      <rect x="170" y="245" width="140" height="30" rx="4" fill="rgba(255,255,255,0.06)"/>
      <text x="240" y="264" text-anchor="middle" fill="#94A3B8" font-size="10">Word 02</text>

      <rect x="320" y="245" width="180" height="30" rx="4" fill="#162E93"/>
      <text x="410" y="264" text-anchor="middle" fill="#60A5FA" font-size="11" font-weight="700">CONNECTING (Active)</text>

      <rect x="510" y="245" width="120" height="30" rx="4" fill="rgba(255,255,255,0.06)"/>
      <text x="570" y="264" text-anchor="middle" fill="#94A3B8" font-size="10">THINGS</text>
    `
  },
  {
    file: 'video_event_teaser.svg',
    title: 'Event Teaser & Speed Ramp Video',
    category: 'Video Editing',
    sub: 'Premiere Pro • Velocity Curves • Color LUT',
    content: `
      <!-- NLE Editor Workspace -->
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      <rect x="0" y="0" width="720" height="36" fill="#0A1329"/>
      <text x="25" y="23" fill="#60A5FA" font-size="12" font-weight="700">NLE TIMELINE</text>
      <text x="640" y="23" text-anchor="end" fill="#10B981" font-size="12" font-family="monospace">00:01:24:18</text>

      <!-- Video Track 1 -->
      <g transform="translate(20, 50)">
        <rect x="0" y="0" width="680" height="40" rx="6" fill="#162E93" opacity="0.6"/>
        <text x="15" y="25" fill="#FFFFFF" font-size="11" font-weight="600">V1: 4K Event Master B-Roll</text>
        <path d="M 200 35 C 240 35 250 5 280 5 C 310 5 320 35 360 35" fill="none" stroke="#60A5FA" stroke-width="2.5"/>
        <text x="280" y="25" text-anchor="middle" fill="#60A5FA" font-size="10" font-weight="700">250% SPEED RAMP</text>
      </g>

      <!-- Video Track 2: Text Overlays -->
      <g transform="translate(20, 100)">
        <rect x="0" y="0" width="680" height="40" rx="6" fill="rgba(255,255,255,0.03)"/>
        <rect x="180" y="5" width="220" height="30" rx="4" fill="rgba(96, 165, 250, 0.2)" stroke="#60A5FA" stroke-width="1"/>
        <text x="290" y="24" text-anchor="middle" fill="#60A5FA" font-size="11">V2: Lower Third Keyframe</text>
      </g>

      <!-- Audio Track A1 -->
      <g transform="translate(20, 150)">
        <rect x="0" y="0" width="680" height="50" rx="6" fill="#0B1D47"/>
        <text x="15" y="30" fill="#94A3B8" font-size="11">A1: Cinematic Orchestral Build</text>
        <!-- Waveform -->
        <path d="M 180 25 Q 210 5 240 25 T 300 25 T 360 10 T 420 25 T 480 5 T 540 25 T 660 15" fill="none" stroke="#10B981" stroke-width="2"/>
      </g>

      <!-- Audio Track A2: SFX Whoosh -->
      <g transform="translate(20, 210)">
        <rect x="0" y="0" width="680" height="40" rx="6" fill="rgba(255,255,255,0.02)"/>
        <rect x="260" y="5" width="60" height="30" rx="4" fill="rgba(245, 158, 11, 0.2)" stroke="#F59E0B"/>
        <text x="290" y="24" text-anchor="middle" fill="#F59E0B" font-size="10">Whoosh</text>
      </g>

      <!-- Playhead Needle -->
      <line x1="280" y1="40" x2="280" y2="290" stroke="#EF4444" stroke-width="2"/>
      <polygon points="275,40 285,40 280,48" fill="#EF4444"/>
    `
  },

  // PHOTOGRAPHY
  {
    file: 'photo_portrait.svg',
    title: 'Natural Light Portrait Study',
    category: 'Photography',
    sub: 'Adobe Lightroom • RAW • 50mm f/1.8 Bokeh',
    content: `
      <!-- Camera Viewfinder HUD -->
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.35)"/>
      
      <!-- Rule of Thirds Grid -->
      <line x1="240" y1="20" x2="240" y2="290" stroke="rgba(96, 165, 250, 0.15)" stroke-dasharray="4"/>
      <line x1="480" y1="20" x2="480" y2="290" stroke="rgba(96, 165, 250, 0.15)" stroke-dasharray="4"/>
      <line x1="20" y1="100" x2="700" y2="100" stroke="rgba(96, 165, 250, 0.15)" stroke-dasharray="4"/>
      <line x1="20" y1="200" x2="700" y2="200" stroke="rgba(96, 165, 250, 0.15)" stroke-dasharray="4"/>

      <!-- Subject Silhouette -->
      <circle cx="360" cy="115" r="40" fill="url(#primaryGrad)"/>
      <path d="M 290 240 C 290 175 430 175 430 240 Z" fill="#162E93"/>

      <!-- AF Focus Box (Green Lock) -->
      <rect x="330" y="90" width="60" height="50" fill="none" stroke="#10B981" stroke-width="2"/>
      <circle cx="360" cy="115" r="2" fill="#10B981"/>

      <!-- Viewfinder Telemetry -->
      <text x="40" y="45" fill="#FFFFFF" font-family="monospace" font-size="14" font-weight="700">[AF-C]</text>
      <text x="110" y="45" fill="#60A5FA" font-family="monospace" font-size="14">ISO 100</text>
      <text x="200" y="45" fill="#60A5FA" font-family="monospace" font-size="14">f/1.8</text>
      <text x="260" y="45" fill="#60A5FA" font-family="monospace" font-size="14">1/500s</text>
      <text x="640" y="45" text-anchor="end" fill="#10B981" font-family="monospace" font-size="14">+0.3 EV</text>

      <!-- Histogram on Bottom Right -->
      <g transform="translate(560, 220)">
        <rect x="0" y="0" width="120" height="60" rx="4" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.2)"/>
        <path d="M 10 50 Q 30 10 50 35 T 80 15 T 110 50 Z" fill="#60A5FA" opacity="0.5"/>
      </g>
    `
  },
  {
    file: 'photo_event.svg',
    title: 'Institutional Event Documentation',
    category: 'Photography',
    sub: 'Low-Light Stage • Decisive Moments • Batch Color',
    content: `
      <!-- Auditorium Stage Silhouette -->
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Stage Spotlights -->
      <polygon points="100,0 280,240 380,240" fill="url(#cyanGlow)" opacity="0.3"/>
      <polygon points="620,0 340,240 440,240" fill="url(#cyanGlow)" opacity="0.3"/>

      <!-- Speaker Silhouette at Podium -->
      <rect x="345" y="160" width="30" height="80" fill="#0A1329"/>
      <circle cx="360" cy="130" r="16" fill="#162E93"/>
      <path d="M 335 180 C 335 150 385 150 385 180 Z" fill="#60A5FA"/>

      <!-- Stage Backdrop Screen -->
      <rect x="220" y="50" width="280" height="80" rx="6" fill="#0A1329" stroke="rgba(96, 165, 250, 0.3)"/>
      <text x="360" y="95" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="700">ANNUAL CSE SUMMIT</text>

      <!-- Audience Silhouettes -->
      <path d="M 0 310 Q 60 260 120 310 Q 180 250 240 310 Q 300 265 360 310 Q 420 250 480 310 Q 540 265 600 310 Q 660 255 720 310 Z" fill="#04070F"/>
    `
  },
  {
    file: 'photo_urban.svg',
    title: 'Golden Hour Urban Composition',
    category: 'Photography',
    sub: 'Leading Lines • Dynamic Range • Custom LUTs',
    content: `
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Sky Gradient -->
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0F1F6D"/>
        <stop offset="60%" stop-color="#162E93"/>
        <stop offset="100%" stop-color="#60A5FA"/>
      </linearGradient>
      <rect x="0" y="0" width="720" height="180" fill="url(#skyGrad)"/>

      <!-- City Buildings Silhouettes -->
      <rect x="40" y="90" width="50" height="90" fill="#050912"/>
      <rect x="100" y="60" width="70" height="120" fill="#080E1E"/>
      <rect x="180" y="40" width="60" height="140" fill="#050912"/>
      <polygon points="210,15 210,40 205,40" stroke="#60A5FA" stroke-width="2"/>
      <rect x="250" y="80" width="80" height="100" fill="#080E1E"/>
      <rect x="340" y="30" width="90" height="150" fill="#050912"/>
      <rect x="440" y="70" width="75" height="110" fill="#080E1E"/>
      <rect x="530" y="50" width="80" height="130" fill="#050912"/>
      <rect x="620" y="100" width="60" height="80" fill="#080E1E"/>

      <!-- Leading Lines / Bridge Perspective -->
      <polygon points="0,310 720,310 400,180 320,180" fill="#0A1329"/>
      <line x1="360" y1="180" x2="360" y2="310" stroke="#60A5FA" stroke-width="2" stroke-dasharray="10 5"/>
      <line x1="320" y1="180" x2="0" y2="310" stroke="#60A5FA" stroke-width="2"/>
      <line x1="400" y1="180" x2="720" y2="310" stroke="#60A5FA" stroke-width="2"/>
    `
  },

  // VIDEOGRAPHY
  {
    file: 'videography_conference.svg',
    title: '4K Conference & Event Coverage',
    category: 'Videography',
    sub: '4K Ultra HD • Multi-Cam • Gimbal Rig',
    content: `
      <!-- Camera Monitor Frame -->
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.4)"/>
      <rect x="0" y="0" width="720" height="40" fill="#0A1329"/>
      
      <!-- REC Indicator -->
      <circle cx="30" cy="20" r="6" fill="#EF4444" filter="url(#glow)"/>
      <text x="45" y="24" fill="#EF4444" font-family="monospace" font-size="12" font-weight="700">● REC 4K UHD</text>
      <text x="360" y="24" text-anchor="middle" fill="#FFFFFF" font-family="monospace" font-size="12">FPS: 59.94 • 10-BIT 4:2:2</text>
      <text x="690" y="24" text-anchor="end" fill="#10B981" font-family="monospace" font-size="12">BAT 94%</text>

      <!-- Safe Area Frame -->
      <rect x="60" y="60" width="600" height="210" fill="none" stroke="rgba(96, 165, 250, 0.3)" stroke-width="1.5" stroke-dasharray="8 4"/>
      <!-- Crosshairs -->
      <line x1="340" y1="165" x2="380" y2="165" stroke="#60A5FA" stroke-width="2"/>
      <line x1="360" y1="145" x2="360" y2="185" stroke="#60A5FA" stroke-width="2"/>

      <!-- Audio Meters on Right -->
      <g transform="translate(680, 80)">
        <rect x="0" y="0" width="6" height="150" fill="rgba(255,255,255,0.1)"/>
        <rect x="0" y="50" width="6" height="100" fill="#10B981"/>
        <rect x="10" y="0" width="6" height="150" fill="rgba(255,255,255,0.1)"/>
        <rect x="10" y="45" width="6" height="105" fill="#10B981"/>
      </g>
    `
  },
  {
    file: 'videography_cinematic.svg',
    title: 'Cinematic Storytelling Showcase',
    category: 'Videography',
    sub: '2.39:1 Anamorphic • Narrative B-Roll',
    content: `
      <rect x="0" y="0" width="720" height="310" fill="#000000"/>
      <!-- 2.39:1 Letterbox Frame -->
      <rect x="0" y="35" width="720" height="240" fill="#070D1D" stroke="rgba(96, 165, 250, 0.4)"/>
      
      <!-- Anamorphic Blue Flare Line -->
      <line x1="0" y1="155" x2="720" y2="155" stroke="#60A5FA" stroke-width="3" filter="url(#glow)"/>
      <circle cx="360" cy="155" r="40" fill="rgba(96, 165, 250, 0.4)" filter="url(#glow)"/>
      <circle cx="360" cy="155" r="10" fill="#FFFFFF"/>

      <!-- Film Clapper Slate in Corner -->
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="130" height="85" rx="6" fill="#0A1329" stroke="#FFFFFF" stroke-width="1.5"/>
        <rect x="0" y="0" width="130" height="20" fill="#FFFFFF"/>
        <text x="65" y="15" text-anchor="middle" fill="#000000" font-size="10" font-weight="900">PROD: SCENE 04</text>
        <text x="15" y="45" fill="#94A3B8" font-size="9">ROLL: A01</text>
        <text x="80" y="45" fill="#94A3B8" font-size="9">TAKE: 03</text>
        <text x="15" y="70" fill="#60A5FA" font-size="11" font-weight="700">DIR: FOYSAL</text>
      </g>
    `
  },
  {
    file: 'videography_product.svg',
    title: 'Product & Creative Motion B-Roll',
    category: 'Videography',
    sub: 'Gimbal Rig • High FPS • Lighting Setups',
    content: `
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Studio Pedestal -->
      <ellipse cx="360" cy="220" rx="180" ry="40" fill="#0A1329" stroke="rgba(96, 165, 250, 0.4)" stroke-width="2"/>
      <rect x="310" y="120" width="100" height="100" rx="16" fill="url(#primaryGrad)"/>
      <text x="360" y="180" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="800">4K PRO</text>

      <!-- Orbital Dotted Path with Arrow -->
      <ellipse cx="360" cy="200" rx="240" ry="70" fill="none" stroke="#60A5FA" stroke-width="2" stroke-dasharray="6 6"/>
      <polygon points="600,200 590,190 590,210" fill="#60A5FA"/>

      <!-- Studio Lighting Beams -->
      <polygon points="100,20 280,140 220,180" fill="url(#cyanGlow)" opacity="0.3"/>
      <polygon points="620,20 440,140 500,180" fill="url(#cyanGlow)" opacity="0.3"/>
    `
  },

  // GRAPHIC DESIGN
  {
    file: 'graphic_branding.svg',
    title: 'Brand Identity & Vector Mark System',
    category: 'Graphic Design',
    sub: 'Illustrator • Vector Geometry • Typography',
    content: `
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Golden Ratio / Geometric Guide Circles -->
      <circle cx="360" cy="140" r="110" fill="none" stroke="rgba(96, 165, 250, 0.15)" stroke-width="1.5"/>
      <circle cx="360" cy="140" r="70" fill="none" stroke="rgba(96, 165, 250, 0.2)" stroke-width="1.5"/>
      <line x1="200" y1="140" x2="520" y2="140" stroke="rgba(96, 165, 250, 0.2)"/>
      <line x1="360" y1="20" x2="360" y2="260" stroke="rgba(96, 165, 250, 0.2)"/>

      <!-- Vector Monogram Logo Mark -->
      <path d="M 280 200 L 340 80 L 400 200 L 450 140" fill="none" stroke="url(#primaryGrad)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
      
      <!-- Bezier Anchor Points -->
      <circle cx="280" cy="200" r="6" fill="#FFFFFF" stroke="#162E93" stroke-width="2"/>
      <circle cx="340" cy="80" r="6" fill="#FFFFFF" stroke="#162E93" stroke-width="2"/>
      <circle cx="400" cy="200" r="6" fill="#FFFFFF" stroke="#162E93" stroke-width="2"/>
      <circle cx="450" cy="140" r="6" fill="#FFFFFF" stroke="#162E93" stroke-width="2"/>

      <!-- Brand Mark Label -->
      <text x="360" y="270" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="700" letter-spacing="4">FOYSAL AL NUR</text>
    `
  },
  {
    file: 'graphic_social_banner.svg',
    title: 'Social Media Promotional Banner Kit',
    category: 'Graphic Design',
    sub: 'Photoshop • 1080x1080 • Advertising Creatives',
    content: `
      <!-- Social Media Square Canvas in Center -->
      <rect x="220" y="10" width="280" height="280" rx="16" fill="#0A1329" stroke="#60A5FA" stroke-width="2"/>
      <rect x="220" y="10" width="280" height="280" fill="url(#grid)" opacity="0.3"/>
      
      <!-- Top Badge -->
      <rect x="245" y="35" width="110" height="26" rx="13" fill="#162E93"/>
      <text x="300" y="52" text-anchor="middle" fill="#60A5FA" font-size="10" font-weight="800">LIMITED TIME</text>

      <!-- Headline -->
      <text x="245" y="105" fill="#FFFFFF" font-size="24" font-weight="900">TRANSFORM</text>
      <text x="245" y="132" fill="#60A5FA" font-size="24" font-weight="900">YOUR BRAND</text>
      <text x="245" y="160" fill="#94A3B8" font-size="12">High impact visual design solutions</text>

      <!-- CTA Button -->
      <rect x="245" y="185" width="130" height="38" rx="8" fill="url(#primaryGrad)"/>
      <text x="310" y="209" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="700">GET STARTED</text>

      <!-- Discount Circle Tag -->
      <circle cx="450" cy="190" r="32" fill="#EF4444" filter="url(#glow)"/>
      <text x="450" y="188" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="900">50%</text>
      <text x="450" y="204" text-anchor="middle" fill="#FFFFFF" font-size="9" font-weight="700">OFF</text>
    `
  },
  {
    file: 'graphic_typography_poster.svg',
    title: 'Editorial Typography & Poster Series',
    category: 'Graphic Design',
    sub: 'Swiss Style • Grid Alignment • Modern Minimal',
    content: `
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Huge Poster Numbers -->
      <text x="50" y="170" fill="rgba(96, 165, 250, 0.12)" font-size="170" font-weight="900" font-family="sans-serif">26</text>
      
      <text x="60" y="70" fill="#60A5FA" font-size="12" font-weight="700" letter-spacing="3">SWISS INTERNATIONAL STYLE</text>
      <text x="60" y="115" fill="#FFFFFF" font-size="34" font-weight="800">TYPOGRAPHY</text>
      <text x="60" y="150" fill="#FFFFFF" font-size="34" font-weight="800">&amp; FORM</text>

      <line x1="60" y1="180" x2="360" y2="180" stroke="#60A5FA" stroke-width="2"/>

      <text x="60" y="210" fill="#94A3B8" font-size="12">Asymmetric grid composition • Negative balance</text>
      <text x="60" y="235" fill="#94A3B8" font-size="12">Designed for exhibition catalogue release 2026</text>

      <!-- Right Column Visual Blocks -->
      <rect x="440" y="40" width="220" height="220" fill="none" stroke="#60A5FA" stroke-width="2"/>
      <rect x="460" y="60" width="180" height="180" fill="rgba(22, 46, 147, 0.3)"/>
      <circle cx="550" cy="150" r="45" fill="none" stroke="#FFFFFF" stroke-width="2"/>
    `
  },

  // DIGITAL MARKETING
  {
    file: 'marketing_meta_ads.svg',
    title: 'Meta Ads Conversion Campaign Architecture',
    category: 'Digital Marketing',
    sub: 'Meta Ads Manager • Pixel • A/B Testing',
    content: `
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Campaign Funnel Blocks -->
      <!-- TOFU -->
      <polygon points="60,40 660,40 580,105 140,105" fill="#162E93" opacity="0.6"/>
      <text x="360" y="75" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="700">TOP OF FUNNEL (TOFU): 120,000 IMPRESSIONS</text>

      <!-- MOFU -->
      <polygon points="145,115 575,115 510,180 210,180" fill="#0F1F6D" stroke="#60A5FA" stroke-width="1.5"/>
      <text x="360" y="152" text-anchor="middle" fill="#60A5FA" font-size="13" font-weight="700">MIDDLE OF FUNNEL (MOFU): 12,450 CLICKS (CTR 10.3%)</text>

      <!-- BOFU -->
      <polygon points="215,190 505,190 450,250 270,250" fill="url(#primaryGrad)"/>
      <text x="360" y="225" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="800">BOTTOM OF FUNNEL (BOFU): 1,120 CONVERSIONS</text>

      <!-- Outcome Badge -->
      <rect x="290" y="265" width="140" height="30" rx="15" fill="#10B981"/>
      <text x="360" y="284" text-anchor="middle" fill="#050912" font-size="11" font-weight="800">4.8X ROAS ACHIEVED</text>
    `
  },
  {
    file: 'marketing_growth_strategy.svg',
    title: 'Social Media Content & Growth Strategy',
    category: 'Digital Marketing',
    sub: 'Content Calendar • Viral Hooks • Reach Metrics',
    content: `
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Chart Axis -->
      <line x1="80" y1="240" x2="660" y2="240" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <line x1="80" y1="40" x2="80" y2="240" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>

      <!-- Upward Growth Line -->
      <path d="M 80 230 C 200 220 280 180 380 140 C 480 100 560 60 650 45" fill="none" stroke="#60A5FA" stroke-width="4" filter="url(#glow)"/>
      <path d="M 80 230 C 200 220 280 180 380 140 C 480 100 560 60 650 45 L 650 240 L 80 240 Z" fill="url(#cyanGlow)" opacity="0.3"/>

      <!-- Growth Callout -->
      <circle cx="650" cy="45" r="7" fill="#60A5FA" stroke="#FFFFFF" stroke-width="2"/>
      <rect x="520" y="15" width="110" height="30" rx="6" fill="#162E93"/>
      <text x="575" y="34" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="700">+340% REACH</text>

      <!-- Calendar Tags -->
      <text x="140" y="265" fill="#94A3B8" font-size="11">Week 1</text>
      <text x="280" y="265" fill="#94A3B8" font-size="11">Week 4</text>
      <text x="440" y="265" fill="#94A3B8" font-size="11">Week 8</text>
      <text x="600" y="265" fill="#60A5FA" font-size="11" font-weight="700">Week 12</text>
    `
  },
  {
    file: 'marketing_retargeting.svg',
    title: 'Full-Funnel Retargeting Sequence',
    category: 'Digital Marketing',
    sub: 'Custom Audiences • Dynamic Creative • LTV',
    content: `
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Flow Nodes -->
      <!-- Step 1 -->
      <g transform="translate(40, 110)">
        <rect x="0" y="0" width="130" height="80" rx="8" fill="#0A1329" stroke="rgba(96, 165, 250, 0.3)"/>
        <text x="65" y="35" text-anchor="middle" fill="#60A5FA" font-size="11" font-weight="700">01. VISITOR</text>
        <text x="65" y="55" text-anchor="middle" fill="#FFFFFF" font-size="10">Landing Page</text>
      </g>

      <!-- Arrow 1 -->
      <line x1="180" y1="150" x2="220" y2="150" stroke="#60A5FA" stroke-width="2"/>
      <polygon points="220,150 210,145 210,155" fill="#60A5FA"/>

      <!-- Step 2 -->
      <g transform="translate(230, 110)">
        <rect x="0" y="0" width="130" height="80" rx="8" fill="#0F1F6D" stroke="#60A5FA" stroke-width="1.5"/>
        <text x="65" y="35" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="700">02. PIXEL EVENT</text>
        <text x="65" y="55" text-anchor="middle" fill="#60A5FA" font-size="10">ViewContent</text>
      </g>

      <!-- Arrow 2 -->
      <line x1="370" y1="150" x2="410" y2="150" stroke="#60A5FA" stroke-width="2"/>
      <polygon points="410,150 400,145 400,155" fill="#60A5FA"/>

      <!-- Step 3 -->
      <g transform="translate(420, 110)">
        <rect x="0" y="0" width="130" height="80" rx="8" fill="#162E93"/>
        <text x="65" y="35" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="700">03. RETARGET</text>
        <text x="65" y="55" text-anchor="middle" fill="#94A3B8" font-size="10">Social Proof Ad</text>
      </g>

      <!-- Arrow 3 -->
      <line x1="560" y1="150" x2="600" y2="150" stroke="#60A5FA" stroke-width="2"/>
      <polygon points="600,150 590,145 590,155" fill="#60A5FA"/>

      <!-- Step 4 -->
      <g transform="translate(610, 110)">
        <rect x="0" y="0" width="80" height="80" rx="8" fill="#10B981"/>
        <text x="40" y="35" text-anchor="middle" fill="#050912" font-size="11" font-weight="800">SALE</text>
        <text x="40" y="55" text-anchor="middle" fill="#050912" font-size="10" font-weight="700">$$$</text>
      </g>
    `
  },

  // IT & TECHNICAL
  {
    file: 'tech_database.svg',
    title: 'Relational Database Schema & Architecture',
    category: 'IT & Technical',
    sub: 'SQL • 3NF Normalization • Query Optimization',
    content: `
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Table 1: USERS -->
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="180" height="180" rx="8" fill="#0A1329" stroke="rgba(96, 165, 250, 0.3)"/>
        <rect x="0" y="0" width="180" height="28" rx="8" fill="#162E93"/>
        <text x="15" y="19" fill="#FFFFFF" font-size="11" font-weight="700">USERS (3NF)</text>
        <text x="15" y="50" fill="#60A5FA" font-size="10">PK  user_id (INT)</text>
        <text x="15" y="75" fill="#94A3B8" font-size="10">    full_name (VARCHAR)</text>
        <text x="15" y="100" fill="#94A3B8" font-size="10">    email (VARCHAR)</text>
        <text x="15" y="125" fill="#94A3B8" font-size="10">    created_at (TIMESTAMP)</text>
        <text x="15" y="150" fill="#94A3B8" font-size="10">    role_type (VARCHAR)</text>
      </g>

      <!-- Relationship Line 1 -->
      <path d="M 220 100 L 290 100" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4"/>

      <!-- Table 2: PROJECTS -->
      <g transform="translate(290, 50)">
        <rect x="0" y="0" width="190" height="210" rx="8" fill="#0A1329" stroke="#60A5FA" stroke-width="1.5"/>
        <rect x="0" y="0" width="190" height="28" rx="8" fill="url(#primaryGrad)"/>
        <text x="15" y="19" fill="#FFFFFF" font-size="11" font-weight="700">PORTFOLIO_PROJECTS</text>
        <text x="15" y="50" fill="#60A5FA" font-size="10">PK  project_id (VARCHAR)</text>
        <text x="15" y="75" fill="#F59E0B" font-size="10">FK  owner_id (INT)</text>
        <text x="15" y="100" fill="#94A3B8" font-size="10">    category (VARCHAR)</text>
        <text x="15" y="125" fill="#94A3B8" font-size="10">    title (VARCHAR)</text>
        <text x="15" y="150" fill="#94A3B8" font-size="10">    tools_array (JSON)</text>
        <text x="15" y="175" fill="#10B981" font-size="10">    is_visible (BOOLEAN)</text>
      </g>

      <!-- Relationship Line 2 -->
      <path d="M 480 100 L 540 100" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4"/>

      <!-- Table 3: ANALYTICS -->
      <g transform="translate(540, 50)">
        <rect x="0" y="0" width="150" height="150" rx="8" fill="#0A1329" stroke="rgba(96, 165, 250, 0.3)"/>
        <rect x="0" y="0" width="150" height="28" rx="8" fill="#0F1F6D"/>
        <text x="15" y="19" fill="#FFFFFF" font-size="11" font-weight="700">METRICS_LOG</text>
        <text x="15" y="50" fill="#60A5FA" font-size="10">PK  log_id (BIGINT)</text>
        <text x="15" y="75" fill="#F59E0B" font-size="10">FK  project_id (VARCHAR)</text>
        <text x="15" y="100" fill="#94A3B8" font-size="10">    views_count (INT)</text>
        <text x="15" y="125" fill="#94A3B8" font-size="10">    duration_ms (INT)</text>
      </g>
    `
  },
  {
    file: 'tech_network.svg',
    title: 'LAN Network Infrastructure & Diagnostics',
    category: 'IT & Technical',
    sub: 'Cisco Routing • DHCP Subnets • Cat6 Cabling',
    content: `
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      
      <!-- Core Router Node -->
      <g transform="translate(320, 20)">
        <rect x="0" y="0" width="80" height="50" rx="8" fill="#162E93" stroke="#60A5FA" stroke-width="1.5"/>
        <text x="40" y="25" text-anchor="middle" fill="#FFFFFF" font-size="10" font-weight="700">ROUTER</text>
        <text x="40" y="40" text-anchor="middle" fill="#60A5FA" font-size="9">192.168.1.1</text>
      </g>

      <line x1="360" y1="70" x2="360" y2="120" stroke="#60A5FA" stroke-width="2"/>

      <!-- Managed Switch -->
      <g transform="translate(200, 120)">
        <rect x="0" y="0" width="320" height="50" rx="8" fill="#0A1329" stroke="#60A5FA" stroke-width="2"/>
        <text x="20" y="30" fill="#FFFFFF" font-size="11" font-weight="700">24-PORT GIGABIT SWITCH (VLAN 10 / 20)</text>
        <!-- Port LEDs -->
        <circle cx="250" cy="25" r="4" fill="#10B981"/>
        <circle cx="265" cy="25" r="4" fill="#10B981"/>
        <circle cx="280" cy="25" r="4" fill="#10B981"/>
        <circle cx="295" cy="25" r="4" fill="#10B981"/>
      </g>

      <!-- Connections to Endpoints -->
      <line x1="250" y1="170" x2="120" y2="230" stroke="#60A5FA" stroke-width="1.5"/>
      <line x1="360" y1="170" x2="360" y2="230" stroke="#60A5FA" stroke-width="1.5"/>
      <line x1="470" y1="170" x2="600" y2="230" stroke="#60A5FA" stroke-width="1.5"/>

      <!-- Workstation 1 -->
      <g transform="translate(60, 230)">
        <rect x="0" y="0" width="120" height="50" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)"/>
        <text x="60" y="25" text-anchor="middle" fill="#FFFFFF" font-size="10">Lab PC 01</text>
        <text x="60" y="40" text-anchor="middle" fill="#94A3B8" font-size="9">192.168.10.12</text>
      </g>

      <!-- Workstation 2 -->
      <g transform="translate(300, 230)">
        <rect x="0" y="0" width="120" height="50" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)"/>
        <text x="60" y="25" text-anchor="middle" fill="#FFFFFF" font-size="10">Lab PC 02</text>
        <text x="60" y="40" text-anchor="middle" fill="#94A3B8" font-size="9">192.168.10.13</text>
      </g>

      <!-- Server Node -->
      <g transform="translate(540, 230)">
        <rect x="0" y="0" width="120" height="50" rx="6" fill="#0F1F6D" stroke="#60A5FA" stroke-width="1"/>
        <text x="60" y="25" text-anchor="middle" fill="#60A5FA" font-size="10" font-weight="700">LOCAL SERVER</text>
        <text x="60" y="40" text-anchor="middle" fill="#FFFFFF" font-size="9">192.168.20.5</text>
      </g>
    `
  },
  {
    file: 'tech_workstation.svg',
    title: 'Workstation Assembly & System Diagnostics',
    category: 'IT & Technical',
    sub: 'Hardware Benchmarking • Windows 11 • BIOS',
    content: `
      <!-- Telemetry Dashboard -->
      <rect x="0" y="0" width="720" height="310" rx="12" fill="#070D1D" stroke="rgba(96, 165, 250, 0.25)"/>
      <rect x="0" y="0" width="720" height="35" fill="#0A1329"/>
      <text x="25" y="22" fill="#60A5FA" font-size="12" font-weight="700">SYSTEM HEALTH &amp; HARDWARE TELEMETRY</text>
      <text x="690" y="22" text-anchor="end" fill="#10B981" font-size="11">STATUS: OPTIMAL</text>

      <!-- Gauge 1: CPU Temp -->
      <g transform="translate(50, 60)">
        <rect x="0" y="0" width="180" height="110" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
        <text x="20" y="30" fill="#94A3B8" font-size="11">CPU Temperature</text>
        <text x="20" y="70" fill="#10B981" font-size="28" font-weight="800">42°C</text>
        <text x="20" y="95" fill="#94A3B8" font-size="10">Intel Core i7 • 16 Cores</text>
      </g>

      <!-- Gauge 2: RAM Usage -->
      <g transform="translate(270, 60)">
        <rect x="0" y="0" width="180" height="110" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
        <text x="20" y="30" fill="#94A3B8" font-size="11">Memory Allocation</text>
        <text x="20" y="70" fill="#60A5FA" font-size="28" font-weight="800">12.4 GB</text>
        <text x="20" y="95" fill="#94A3B8" font-size="10">of 32 GB DDR5 (38%)</text>
      </g>

      <!-- Gauge 3: NVMe Speed -->
      <g transform="translate(490, 60)">
        <rect x="0" y="0" width="180" height="110" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
        <text x="20" y="30" fill="#94A3B8" font-size="11">NVMe PCIe 4.0 Read</text>
        <text x="20" y="70" fill="#FFFFFF" font-size="28" font-weight="800">7,240</text>
        <text x="20" y="95" fill="#60A5FA" font-size="10">MB/s Read Throughput</text>
      </g>

      <!-- Bottom Benchmark Bar -->
      <g transform="translate(50, 190)">
        <rect x="0" y="0" width="620" height="90" rx="8" fill="#0A1329" stroke="rgba(96, 165, 250, 0.3)"/>
        <text x="25" y="30" fill="#FFFFFF" font-size="13" font-weight="700">Operating System &amp; Driver Stack</text>
        <text x="25" y="55" fill="#94A3B8" font-size="11">Windows 11 Pro 64-bit • Clean Installation • Driver Verification • Zero Bloatware</text>
        <rect x="25" y="68" width="570" height="8" rx="4" fill="rgba(255,255,255,0.1)"/>
        <rect x="25" y="68" width="570" height="8" rx="4" fill="#10B981"/>
      </g>
    `
  }
];

projects.forEach((p) => {
  const svg = makeSVG(p.title, p.category, p.sub, p.content);
  fs.writeFileSync(path.join(targetDir, p.file), svg, 'utf8');
  console.log('Generated: ' + p.file);
});
console.log('Successfully generated 24 custom project SVGs!');
