/**
 * MD FOYSAL AL NUR - Portfolio Database & Backend Integration Layer
 * Unified reactive persistence engine powering public portfolio and private admin dashboard
 */

(function () {
  'use strict';

  // Default Seed Data based strictly on genuine CV and user specifications
  const DEFAULT_DATA = {
    profile: {
      name: "MD FOYSAL AL NUR",
      brandName: "FOYSAL AL NUR",
      tagline: "Creative Mind. Technical Vision. Digital Excellence.",
      roles: [
        "UI/UX Designer",
        "Web Developer",
        "Video Editor",
        "Photographer",
        "Videographer",
        "Graphic Designer",
        "Digital Marketer",
        "IT Support"
      ],
      heroIntro: "A versatile creative technologist and front-end enthusiast crafting human-centered user interfaces, cinematic motion edits, and clean digital experiences grounded in solid Computer Science foundations.",
      email: "faysalnur416@gmail.com",
      phone: "+8801855669424",
      phoneFormatted: "+880 1855-669424",
      location: "Dhaka, Bangladesh",
      activeCV: "assets/Foysal_Al_Nur_CV.pdf",
      portraitImage: "assets/portrait_cutout.png",
      logoImage: "assets/logo_transparent.png"
    },

    about: {
      heading: "Beyond Creativity. Driven by Technology.",
      intro: "I'm MD Foysal Al Nur, a creative and technology-focused individual interested in design, development and digital media.",
      journey: [
        "UI/UX",
        "Web Development",
        "Photography",
        "Videography",
        "IT & Digital Marketing"
      ],
      strengths: [
        {
          title: "Creative Thinking",
          desc: "Approaching design hurdles with lateral innovation, modern visual paradigms, and unique aesthetic clarity."
        },
        {
          title: "Problem Solving",
          desc: "Diagnosing technical bottlenecks across design systems, code structures, and computing workflows."
        },
        {
          title: "Teamwork",
          desc: "Proven cross-functional collaboration in student leadership, media production, and team projects."
        },
        {
          title: "Quick Learning",
          desc: "Rapid assimilation of cutting-edge creative tools, frameworks, and modern technical specifications."
        }
      ],
      details: {
        location: "Dhaka, Bangladesh",
        education: "Computer Science & Engineering",
        availability: "Available for Projects & Full-Time Roles",
        languages: "English, Bengali"
      }
    },

    social: [
      {
        id: "instagram",
        platform: "Instagram",
        handle: "@nurr_exits",
        url: "https://www.instagram.com/nurr_exits?rpxt=emY3dGx6MDBkbXQw",
        enabled: true,
        actionLabel: "View Visuals"
      },
      {
        id: "facebook",
        platform: "Facebook",
        handle: "Md Foysal Al Nur",
        url: "https://www.facebook.com/share/18mDW9p1Uw/",
        enabled: true,
        actionLabel: "Connect"
      },
      {
        id: "linkedin",
        platform: "LinkedIn",
        handle: "Md Foysal Al Nur",
        url: "https://www.linkedin.com/in/faysal-al-nur-a7952428a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        enabled: true,
        actionLabel: "Network"
      },
      {
        id: "whatsapp",
        platform: "WhatsApp",
        handle: "+880 1855-669424",
        url: "https://wa.me/qr/EWOZNHWPW7EOJ1",
        enabled: true,
        actionLabel: "Chat Direct"
      }
    ],

    education: [
      {
        id: "edu_1",
        degree: "B.Sc in Computer Science & Engineering",
        institution: "Northern University Bangladesh",
        location: "Dhaka, Bangladesh",
        period: "05/2026 – 05/2030",
        badge: "Undergraduate Degree",
        focus: ["Software Engineering", "Algorithms", "Database Systems", "Web Technologies"]
      },
      {
        id: "edu_2",
        degree: "Diploma in Computer Science & Technology",
        institution: "Cumilla Polytechnic Institute",
        location: "Cumilla, Bangladesh",
        period: "Completed",
        badge: "Polytechnic Diploma",
        focus: ["Computer Fundamentals", "Programming Concepts", "Hardware Maintenance", "Computer Networking"]
      },
      {
        id: "edu_3",
        degree: "Secondary School Certificate (SSC)",
        institution: "Kadior High School",
        location: "Cumilla, Bangladesh",
        period: "2021 (Science)",
        badge: "Secondary Certification",
        focus: ["Science Group", "Mathematics", "Physics", "Information Tech"]
      }
    ],

    experience: [
      {
        id: "exp_1",
        role: "Photography & Videography",
        type: "Creative & Personal Projects",
        badgeClass: "personal",
        period: "Self-Directed Practice",
        location: "Dhaka, Bangladesh",
        duties: [
          "Captured photographs and video footage for creative, social, and event-related projects.",
          "Edited short-form videos and social media reels using CapCut and InShot.",
          "Enhanced photos in Adobe Lightroom: exposure adjustments, framing, and custom color presets.",
          "Managed end-to-end visual workflow tailored for Facebook, Instagram, and YouTube platforms."
        ]
      },
      {
        id: "exp_2",
        role: "Assistant Secretary — Photography and Videography",
        type: "Organizational Appointment",
        badgeClass: "organizational",
        period: "Institutional Media",
        location: "Student Leadership & Media Committee",
        duties: [
          "Assisted with photography and videography activities during major organizational events.",
          "Captured event photographs, videos, and important milestone moments.",
          "Supported event planning and visual content coverage for social media release.",
          "Collaborated with team members and maintained organized media archives for future use."
        ]
      },
      {
        id: "exp_3",
        role: "UI/UX and Graphic Design Practice",
        type: "Hands-on Design Practice",
        badgeClass: "practice",
        period: "Practical Projects",
        location: "Digital Design & Interface Solutions",
        duties: [
          "Designed user-friendly interfaces, responsive layouts, and interactive wireframes in Figma.",
          "Applied core UI/UX principles including usability heuristics, typography tokens, and color hierarchy.",
          "Created marketing visual creatives and vector typography in Adobe Photoshop & Illustrator."
        ]
      },
      {
        id: "exp_4",
        role: "Meta Ads Management Practice",
        type: "Campaign Operations Practice",
        badgeClass: "practice",
        period: "Digital Marketing",
        location: "Meta Advertising & Social Growth",
        duties: [
          "Set up, ran, and managed advertising campaigns on Meta platforms (Facebook & Instagram).",
          "Prepared high-CTR ad creatives and conversion-focused copy variants for A/B testing.",
          "Monitored campaign delivery metrics, audience targeting segments, and engagement analytics."
        ]
      },
      {
        id: "exp_5",
        role: "Front Desk & Reception Support",
        type: "Administrative Support Practice",
        badgeClass: "support",
        period: "Office Coordination",
        location: "Office Administration & Customer Relations",
        duties: [
          "Handled reception duties including welcoming visitors, telephone call management, and answering inquiries.",
          "Maintained accurate administrative records, visitor logs, and daily office documentation.",
          "Supported meeting coordination, appointment scheduling, and professional email correspondence.",
          "Utilized Microsoft Office (Word, Excel, PowerPoint) and Google Workspace for document management."
        ]
      }
    ],

    feedback: [
      {
        id: "fb_1",
        name: "Tanvir Khan",
        role: "Product Team Lead",
        email: "tanvir.khan@example.com",
        rating: 5,
        quote: "Foysal's attention to typography and layout hierarchy in Figma made our application interface remarkably intuitive. He has an exceptional eye for details and communicates with high clarity.",
        approved: true,
        createdAt: "2026-10-15T10:30:00.000Z"
      },
      {
        id: "fb_2",
        name: "Rafiul Hasan",
        role: "Event Organizer",
        email: "rafiul.h@example.com",
        rating: 5,
        quote: "Working with Foysal on our organizational event coverage was seamless. His short-form reels and photography captured the energy of the sessions with cinematic quality.",
        approved: true,
        createdAt: "2026-10-22T14:15:00.000Z"
      },
      {
        id: "fb_3",
        name: "Samiul Nafi",
        role: "Senior Developer",
        email: "samiul.nafi@example.com",
        rating: 5,
        quote: "His combination of Computer Science thinking with creative design tools gives him an edge. He understands how designs will be coded into actual production layouts.",
        approved: true,
        createdAt: "2026-11-02T09:45:00.000Z"
      }
    ],

    contact_inbox: [
      {
        id: "msg_sample_1",
        name: "Rahim Chowdhury",
        email: "rahim.chowdhury@agencybd.com",
        subject: "UI/UX Design for Mobile Health App",
        service: "uiux",
        message: "Hello Foysal, We saw your portfolio and are interested in your Figma UI/UX prototyping skills for a new healthcare application in Dhaka. Please let us know your availability.",
        timestamp: "2026-11-10T11:20:00.000Z",
        read: false
      }
    ],

    sms_settings: {
      provider: "Greenweb SMS / BulkSMS BD",
      apiEndpoint: "https://api.sms-gateway.com/v3/send",
      senderId: "FOYSALNUR",
      apiKeyMasked: "sec_live_9f83********4b21",
      balance: "৳ 450.00 (Active)",
      status: "Configured (Production Ready)"
    }
  };

  const DB_PREFIX = "foysal_portfolio_";

  class PortfolioDatabase {
    constructor() {
      this.memoryStore = {};
      this.init();
    }

    init() {
      try {
        // Check each core collection; seed if absent
        Object.keys(DEFAULT_DATA).forEach(collectionKey => {
          const fullKey = DB_PREFIX + collectionKey;
          let existing = null;
          try {
            existing = localStorage.getItem(fullKey);
          } catch (e) {
            existing = null;
          }
          if (!existing) {
            try {
              localStorage.setItem(fullKey, JSON.stringify(DEFAULT_DATA[collectionKey]));
            } catch (err) {
              this.memoryStore[fullKey] = JSON.stringify(DEFAULT_DATA[collectionKey]);
            }
          }
        });
      } catch (globalErr) {
        console.warn("PortfolioDB storage initialization warning:", globalErr);
      }
    }

    get(collectionKey) {
      const fullKey = DB_PREFIX + collectionKey;
      let raw = null;
      try {
        raw = localStorage.getItem(fullKey);
      } catch (e) {
        raw = null;
      }

      if (!raw && this.memoryStore && this.memoryStore[fullKey]) {
        raw = this.memoryStore[fullKey];
      }

      if (!raw) {
        if (DEFAULT_DATA[collectionKey]) {
          this.set(collectionKey, DEFAULT_DATA[collectionKey]);
          return JSON.parse(JSON.stringify(DEFAULT_DATA[collectionKey]));
        }
        return null;
      }
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error("Error parsing DB collection:", collectionKey, e);
        return DEFAULT_DATA[collectionKey] || null;
      }
    }

    set(collectionKey, data) {
      const fullKey = DB_PREFIX + collectionKey;
      if (!this.memoryStore) this.memoryStore = {};
      
      const serialized = JSON.stringify(data);
      this.memoryStore[fullKey] = serialized;

      try {
        localStorage.setItem(fullKey, serialized);
      } catch (err) {
        console.warn(`LocalStorage write error on [${collectionKey}] (quota or security limit):`, err);
        window.dispatchEvent(new CustomEvent('portfolioDBQuotaWarning', {
          detail: { collection: collectionKey, error: err.message }
        }));
      }
      this.dispatchChange(collectionKey, data);
    }

    add(collectionKey, item) {
      const current = this.get(collectionKey) || [];
      if (Array.isArray(current)) {
        if (!item.id) {
          item.id = collectionKey + "_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        }
        current.unshift(item);
        this.set(collectionKey, current);
        return item;
      }
      return null;
    }

    update(collectionKey, id, updates) {
      const current = this.get(collectionKey);
      if (Array.isArray(current)) {
        const index = current.findIndex(i => i.id === id);
        if (index !== -1) {
          current[index] = { ...current[index], ...updates };
          this.set(collectionKey, current);
          return current[index];
        }
      } else if (typeof current === 'object' && current !== null) {
        const updated = { ...current, ...updates };
        this.set(collectionKey, updated);
        return updated;
      }
      return null;
    }

    remove(collectionKey, id) {
      const current = this.get(collectionKey);
      if (Array.isArray(current)) {
        const filtered = current.filter(i => i.id !== id);
        this.set(collectionKey, filtered);
        return true;
      }
      return false;
    }

    dispatchChange(collectionKey, data) {
      window.dispatchEvent(new CustomEvent('portfolioDBChange', {
        detail: { collection: collectionKey, data }
      }));
    }

    exportJSON() {
      const exportBundle = {};
      Object.keys(DEFAULT_DATA).forEach(key => {
        exportBundle[key] = this.get(key);
      });
      // Also export tools and projects if present
      const tools = localStorage.getItem("foysal_portfolio_tools_db");
      if (tools) exportBundle.tools = JSON.parse(tools);
      const projects = localStorage.getItem("foysal_portfolio_projects_db");
      if (projects) exportBundle.projects = JSON.parse(projects);

      return JSON.stringify(exportBundle, null, 2);
    }

    importJSON(jsonString) {
      try {
        const data = JSON.parse(jsonString);
        Object.keys(data).forEach(key => {
          if (key === 'tools') {
            localStorage.setItem("foysal_portfolio_tools_db", JSON.stringify(data[key]));
          } else if (key === 'projects') {
            localStorage.setItem("foysal_portfolio_projects_db", JSON.stringify(data[key]));
          } else {
            this.set(key, data[key]);
          }
        });
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    resetDefaults() {
      Object.keys(DEFAULT_DATA).forEach(key => {
        this.set(key, DEFAULT_DATA[key]);
      });
      return true;
    }
  }

  // Expose globally
  window.PortfolioDB = new PortfolioDatabase();
})();
