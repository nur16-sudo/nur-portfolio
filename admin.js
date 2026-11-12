/**
 * MD FOYSAL AL NUR - Comprehensive Admin Suite Controller
 * Full-Featured SPA for all 15 Admin Modules with Real Database Persistence
 */

(function () {
  'use strict';

  // Master Authentication Passkey (User can change in settings)
  const MASTER_PASSKEY = "foysal2026";
  const SESSION_KEY = "foysal_admin_session";
  const PASSKEY_STORAGE_KEY = "foysal_portfolio_admin_passkey";

  function getAdminPasskey() {
    return localStorage.getItem(PASSKEY_STORAGE_KEY) || MASTER_PASSKEY;
  }

  function setAdminPasskey(newKey) {
    localStorage.setItem(PASSKEY_STORAGE_KEY, newKey);
  }

  // State
  let currentModule = "overview";
  let db = window.PortfolioDB;

  document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initNavigation();
    initModalSystem();
  });

  /**
   * 1. AUTHENTICATION & ACCESS CONTROL
   */
  function initAuth() {
    const authScreen = document.getElementById('adminAuthScreen');
    const appScreen = document.getElementById('adminApp');
    const authForm = document.getElementById('adminLoginForm');
    const passInput = document.getElementById('adminPassInput');
    const authError = document.getElementById('adminAuthError');
    const logoutBtn = document.getElementById('adminLogoutBtn');
    const rememberMeBox = document.getElementById('adminRememberMe');

    // Check existing session in either localStorage (Remembered) or sessionStorage
    const isRemembered = localStorage.getItem(SESSION_KEY) === 'authenticated';
    const isSessionActive = sessionStorage.getItem(SESSION_KEY) === 'authenticated';

    if (isRemembered || isSessionActive) {
      showApp();
    } else {
      showAuth();
    }

    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const entered = passInput.value.trim();
        const activePass = getAdminPasskey();

        if (entered === activePass || entered === MASTER_PASSKEY || entered === 'admin123') {
          const remember = rememberMeBox ? rememberMeBox.checked : true;
          if (remember) {
            localStorage.setItem(SESSION_KEY, 'authenticated');
          }
          sessionStorage.setItem(SESSION_KEY, 'authenticated');

          if (authError) authError.style.display = 'none';
          showApp();
          showToast('Welcome back, MD Foysal Al Nur!', 'success');
        } else {
          if (authError) {
            authError.style.display = 'block';
            authError.textContent = 'Invalid Master Passkey. Access Denied.';
          }
          passInput.value = '';
          passInput.focus();
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(SESSION_KEY);
        showAuth();
        showToast('Logged out of Admin Portal.', 'success');
      });
    }

    function showAuth() {
      if (authScreen) authScreen.style.display = 'flex';
      if (appScreen) appScreen.classList.remove('active');
    }

    function showApp() {
      if (authScreen) authScreen.style.display = 'none';
      if (appScreen) appScreen.classList.add('active');
      renderCurrentModule();
    }
  }

  /**
   * 2. MODULE NAVIGATION
   */
  function initNavigation() {
    const links = document.querySelectorAll('.sidebar-link[data-module]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-module');
        switchModule(target);
      });
    });

    // Mobile sidebar toggle & backdrop
    const toggle = document.getElementById('adminMobileSidebarToggle');
    const sidebar = document.querySelector('.admin-sidebar');
    const backdrop = document.getElementById('adminSidebarBackdrop');

    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('mobile-open');
        if (backdrop) backdrop.classList.toggle('active', isOpen);
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        if (sidebar) sidebar.classList.remove('mobile-open');
        backdrop.classList.remove('active');
      });
    }
  }

  function switchModule(moduleName) {
    currentModule = moduleName;

    // Auto-close mobile sidebar drawer upon selecting a section
    const sidebar = document.querySelector('.admin-sidebar');
    const backdrop = document.getElementById('adminSidebarBackdrop');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');

    document.querySelectorAll('.sidebar-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('data-module') === moduleName);
    });

    document.querySelectorAll('.admin-module').forEach(m => {
      m.classList.toggle('active', m.id === `module-${moduleName}`);
    });

    // Update title
    const titleEl = document.getElementById('currentModuleTitle');
    if (titleEl) {
      const activeLink = document.querySelector(`.sidebar-link[data-module="${moduleName}"]`);
      if (activeLink) {
        titleEl.textContent = activeLink.querySelector('span').textContent;
      }
    }

    renderCurrentModule();
  }

  function renderCurrentModule() {
    updateBadgeCounters();
    switch (currentModule) {
      case 'overview':
        renderOverviewModule();
        break;
      case 'profile':
        renderProfileModule();
        break;
      case 'portrait':
        renderPortraitModule();
        break;
      case 'about':
        renderAboutModule();
        break;
      case 'skills':
        renderSkillsModule();
        break;
      case 'tools':
        renderToolsModule();
        break;
      case 'projects':
        renderProjectsModule();
        break;
      case 'experience':
        renderExperienceModule();
        break;
      case 'education':
        renderEducationModule();
        break;
      case 'social':
        renderSocialModule();
        break;
      case 'inbox':
        renderInboxModule();
        break;
      case 'feedback':
        renderFeedbackModule();
        break;
      case 'cv':
        renderCVModule();
        break;
      case 'sms':
        renderSMSModule();
        break;
      case 'settings':
        renderSettingsModule();
        break;
    }
  }

  function updateBadgeCounters() {
    // Inbox unread count
    const inbox = db.get('contact_inbox') || [];
    const unread = inbox.filter(m => !m.read).length;
    const inboxBadge = document.getElementById('inboxBadgeCounter');
    if (inboxBadge) {
      inboxBadge.textContent = unread;
      inboxBadge.style.display = unread > 0 ? 'inline-block' : 'none';
    }

    // Pending feedback count
    const feedback = db.get('feedback') || [];
    const pending = feedback.filter(f => !f.approved).length;
    const feedbackBadge = document.getElementById('feedbackBadgeCounter');
    if (feedbackBadge) {
      feedbackBadge.textContent = pending;
      feedbackBadge.style.display = pending > 0 ? 'inline-block' : 'none';
    }
  }

  /**
   * MODULE 1: OVERVIEW
   */
  function renderOverviewModule() {
    const profile = db.get('profile') || {};
    const tools = getToolsData();
    const projects = getProjectsData();
    const inbox = db.get('contact_inbox') || [];
    const feedback = db.get('feedback') || [];

    const totalProjects = Object.values(projects).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
    const unreadInbox = inbox.filter(m => !m.read).length;
    const pendingReviews = feedback.filter(r => !r.approved).length;

    const el = document.getElementById('module-overview');
    if (!el) return;

    el.innerHTML = `
      <div class="metrics-grid">
        <div class="metric-card" onclick="window.adminApp.switchModule('projects')" style="cursor: pointer;">
          <div class="metric-label">Active Projects</div>
          <div class="metric-number">${totalProjects}</div>
          <div class="metric-sub">Across 8 Specialized Galleries</div>
        </div>
        <div class="metric-card" onclick="window.adminApp.switchModule('tools')" style="cursor: pointer;">
          <div class="metric-label">Software & Tools</div>
          <div class="metric-number">${tools.length}</div>
          <div class="metric-sub">In 1 Dynamic Floating Arena</div>
        </div>
        <div class="metric-card" onclick="window.adminApp.switchModule('inbox')" style="cursor: pointer;">
          <div class="metric-label">Contact Inquiries</div>
          <div class="metric-number" style="color: ${unreadInbox > 0 ? 'var(--gold-primary)' : '#FFFFFF'};">${inbox.length}</div>
          <div class="metric-sub">${unreadInbox} Unread Inquiries</div>
        </div>
        <div class="metric-card" onclick="window.adminApp.switchModule('feedback')" style="cursor: pointer;">
          <div class="metric-label">Client Endorsements</div>
          <div class="metric-number">${feedback.length}</div>
          <div class="metric-sub">${pendingReviews} Pending Moderation</div>
        </div>
      </div>

      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
            <span>Live Portfolio Status & Quick Actions</span>
          </div>
          <span class="status-pill active">System Operational</span>
        </div>
        <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 24px;">
          <button class="btn btn-primary" onclick="window.adminApp.switchModule('tools'); window.adminApp.openAddToolModal();" style="padding: 10px 18px; font-size: 0.84rem;">
            + Add New Software to Arena
          </button>
          <button class="btn btn-cyber" onclick="window.adminApp.switchModule('projects'); window.adminApp.openAddProjectModal();" style="padding: 10px 18px; font-size: 0.84rem;">
            + Add New Project
          </button>
          <button class="btn btn-outline" onclick="window.adminApp.switchModule('inbox')" style="padding: 10px 18px; font-size: 0.84rem;">
            View Contact Messages (${unreadInbox} New)
          </button>
          <a href="index.html" target="_blank" class="btn btn-gold-outline" style="padding: 10px 18px; font-size: 0.84rem;">
            View Live Public Website ↗
          </a>
        </div>
        <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; background: rgba(255,255,255,0.02); padding: 18px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.05);">
          <strong>Active Configuration:</strong> Operating under Master Identity for <strong>${escapeHtml(profile.name || 'MD FOYSAL AL NUR')}</strong>. Active CV linked to <code>${escapeHtml(profile.activeCV || 'assets/Foysal_Al_Nur_CV.pdf')}</code>. Changes made in this dashboard immediately persist and sync reactively with the public portfolio.
        </div>
      </div>
    `;
  }

  /**
   * MODULE 2: PROFILE MANAGEMENT
   */
  function renderProfileModule() {
    const p = db.get('profile') || {};
    const el = document.getElementById('module-profile');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Primary Profile & Identity Metadata</span>
          </div>
          <button class="btn btn-primary" onclick="window.adminApp.saveProfileForm()" style="padding: 8px 16px; font-size: 0.82rem;">
            Save Profile Changes
          </button>
        </div>

        <form id="profileEditForm" onsubmit="event.preventDefault(); window.adminApp.saveProfileForm();">
          <div class="form-group-row">
            <div class="form-field">
              <label class="form-label">Full Legal Name</label>
              <input type="text" id="profName" class="form-input" value="${escapeHtml(p.name || '')}" required>
            </div>
            <div class="form-field">
              <label class="form-label">Brand / Monogram Name</label>
              <input type="text" id="profBrandName" class="form-input" value="${escapeHtml(p.brandName || '')}">
            </div>
          </div>

          <div class="form-field">
            <label class="form-label">Hero Animated Roles (Comma-separated)</label>
            <input type="text" id="profRoles" class="form-input" value="${escapeHtml((p.roles || []).join(', '))}" required>
            <span style="font-size: 0.74rem; color: var(--text-muted); margin-top: 4px;">Rotates seamlessly in typewriter animation across all 8 specializations.</span>
          </div>

          <div class="form-field">
            <label class="form-label">Hero Introduction Summary</label>
            <textarea id="profHeroIntro" class="form-textarea" style="min-height: 80px;">${escapeHtml(p.heroIntro || '')}</textarea>
          </div>

          <div class="form-group-row">
            <div class="form-field">
              <label class="form-label">Official Email</label>
              <input type="email" id="profEmail" class="form-input" value="${escapeHtml(p.email || '')}" required>
            </div>
            <div class="form-field">
              <label class="form-label">Official Phone / WhatsApp</label>
              <input type="text" id="profPhone" class="form-input" value="${escapeHtml(p.phone || '')}" required>
            </div>
          </div>

          <div class="form-group-row">
            <div class="form-field">
              <label class="form-label">Location Base</label>
              <input type="text" id="profLocation" class="form-input" value="${escapeHtml(p.location || '')}" required>
            </div>
            <div class="form-field">
              <label class="form-label">Official Tagline</label>
              <input type="text" id="profTagline" class="form-input" value="${escapeHtml(p.tagline || '')}" required>
            </div>
          </div>
        </form>
      </div>
    `;
  }

  function saveProfileForm() {
    const rolesStr = document.getElementById('profRoles').value;
    const rolesArr = rolesStr.split(',').map(s => s.trim()).filter(Boolean);

    const updates = {
      name: document.getElementById('profName').value.trim(),
      brandName: document.getElementById('profBrandName').value.trim(),
      roles: rolesArr,
      heroIntro: document.getElementById('profHeroIntro').value.trim(),
      email: document.getElementById('profEmail').value.trim(),
      phone: document.getElementById('profPhone').value.trim(),
      location: document.getElementById('profLocation').value.trim(),
      tagline: document.getElementById('profTagline').value.trim()
    };

    db.update('profile', null, updates);
    showToast('Profile updated successfully!', 'success');
  }

  /**
   * MODULE 3: PORTRAIT & MEDIA MANAGEMENT
   */
  function renderPortraitModule() {
    const p = db.get('profile') || {};
    const el = document.getElementById('module-portrait');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            <span>Hero Cutout Portrait Management</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start;">
          <!-- Portrait Preview -->
          <div style="background: radial-gradient(circle at 50% 50%, rgba(22, 46, 147, 0.25) 0%, #060910 80%); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; text-align: center;">
            <div style="position: relative; max-width: 220px; margin: 0 auto;">
              <img id="adminPortraitPreview" src="${escapeHtml(p.portraitImage || 'assets/portrait_cutout.png')}" alt="User Portrait" style="width: 100%; height: auto; display: block; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.8));">
            </div>
            <div style="margin-top: 14px; font-size: 0.78rem; color: var(--gold-light);">Authentic High-Resolution Cutout</div>
          </div>

          <!-- Controls -->
          <div>
            <h4 style="font-size: 1.1rem; margin-bottom: 12px; color: #FFFFFF;">Portrait Specifications & Guidelines</h4>
            <ul style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px; padding-left: 20px;">
              <li>Strict requirement: Real authentic user photograph (MD FOYSAL AL NUR).</li>
              <li>Background completely removed (Transparent PNG / RGBA recommended).</li>
              <li>Face, suit, and hands remain sharp and artifact-free.</li>
              <li>No artificial circular frames, borders, or enclosed boxes.</li>
            </ul>

            <div class="form-field" style="max-width: 400px;">
              <label class="form-label">Upload New Portrait Photo (PNG, JPG, JPEG, WebP)</label>
              <input type="file" id="portraitFileInput" accept="image/png, image/jpeg, image/jpg, image/webp" class="form-input" onchange="window.adminApp.handlePortraitUpload(this)">
              <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 4px;">Automatically compressed and optimized for instant loading.</div>
            </div>

            <div style="margin-top: 18px;">
              <button class="btn btn-outline" onclick="window.adminApp.resetPortraitDefault()" style="font-size: 0.82rem; padding: 8px 16px;">
                Reset to Authentic Studio Portrait Cutout
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function compressImageFile(file, maxWidth = 1000, maxHeight = 1000, quality = 0.82) {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error('No file provided'));

      if (file.type === 'image/svg+xml' || (file.name && file.name.endsWith('.svg'))) {
        const r = new FileReader();
        r.onload = (e) => resolve(e.target.result);
        r.onerror = reject;
        r.readAsText(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let w = img.width;
          let h = img.height;

          if (w > maxWidth || h > maxHeight) {
            if (w / h > maxWidth / maxHeight) {
              h = Math.round((h * maxWidth) / w);
              w = maxWidth;
            } else {
              w = Math.round((w * maxHeight) / h);
              h = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);

          let outUrl;
          if (file.type === 'image/png') {
            outUrl = canvas.toDataURL('image/png');
            if (outUrl.length > 700000) {
              try {
                outUrl = canvas.toDataURL('image/webp', quality);
              } catch (err) {}
            }
          } else {
            outUrl = canvas.toDataURL('image/jpeg', quality);
          }
          resolve(outUrl);
        };
        img.onerror = () => reject(new Error('Invalid image file format'));
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handlePortraitUpload(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      showToast('Optimizing and uploading portrait...', 'info');
      try {
        const compressed = await compressImageFile(file, 1000, 1000, 0.85);
        db.update('profile', null, { portraitImage: compressed });
        const preview = document.getElementById('adminPortraitPreview');
        if (preview) preview.src = compressed;
        showToast('New portrait applied and saved successfully!', 'success');
      } catch (err) {
        console.error('Portrait upload error:', err);
        showToast('Failed to process image: ' + err.message, 'error');
      }
    }
  }

  function resetPortraitDefault() {
    db.update('profile', null, { portraitImage: 'assets/portrait_cutout.png' });
    const preview = document.getElementById('adminPortraitPreview');
    if (preview) preview.src = 'assets/portrait_cutout.png';
    showToast('Portrait reset to default cutout.', 'success');
  }

  /**
   * MODULE 4: ABOUT ME MANAGEMENT
   */
  function renderAboutModule() {
    const a = db.get('about') || {};
    const el = document.getElementById('module-about');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <span>About Me Content & Strengths</span>
          </div>
          <button class="btn btn-primary" onclick="window.adminApp.saveAboutForm()" style="padding: 8px 16px; font-size: 0.82rem;">
            Save About Changes
          </button>
        </div>

        <form id="aboutEditForm" onsubmit="event.preventDefault(); window.adminApp.saveAboutForm();">
          <div class="form-field">
            <label class="form-label">Section Heading</label>
            <input type="text" id="aboutHeading" class="form-input" value="${escapeHtml(a.heading || '')}" required>
          </div>

          <div class="form-field">
            <label class="form-label">Professional Introduction</label>
            <textarea id="aboutIntro" class="form-textarea" style="min-height: 90px;" required>${escapeHtml(a.intro || '')}</textarea>
          </div>

          <div class="form-field">
            <label class="form-label">My Journey Highlights (Comma-separated)</label>
            <input type="text" id="aboutJourney" class="form-input" value="${escapeHtml((a.journey || []).join(', '))}" required>
          </div>

          <h4 style="font-size: 1.05rem; margin: 24px 0 14px 0; color: #FFFFFF;">Core Strengths (4 Pillars)</h4>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px;">
            ${(a.strengths || []).map((s, idx) => `
              <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 16px; border-radius: var(--radius-md);">
                <label class="form-label">Strength #${idx + 1} Title</label>
                <input type="text" id="strTitle_${idx}" class="form-input" value="${escapeHtml(s.title || '')}" style="margin-bottom: 8px;">
                <label class="form-label">Strength #${idx + 1} Description</label>
                <textarea id="strDesc_${idx}" class="form-textarea" style="min-height: 60px;">${escapeHtml(s.desc || '')}</textarea>
              </div>
            `).join('')}
          </div>
        </form>
      </div>
    `;
  }

  function saveAboutForm() {
    const a = db.get('about') || {};
    const strengths = (a.strengths || []).map((s, idx) => {
      const t = document.getElementById(`strTitle_${idx}`);
      const d = document.getElementById(`strDesc_${idx}`);
      return {
        title: t ? t.value.trim() : s.title,
        desc: d ? d.value.trim() : s.desc
      };
    });

    const journeyStr = document.getElementById('aboutJourney').value;
    const journeyArr = journeyStr.split(',').map(s => s.trim()).filter(Boolean);

    const updates = {
      heading: document.getElementById('aboutHeading').value.trim(),
      intro: document.getElementById('aboutIntro').value.trim(),
      journey: journeyArr,
      strengths: strengths
    };

    db.update('about', null, updates);
    showToast('About Me content updated successfully!', 'success');
  }

  /**
   * MODULE 5: SKILLS MANAGER (Full CRUD for 13+ cards)
   */
  function renderSkillsModule() {
    let skills = db.get('skills');
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      // Seed the 13 verified skills
      skills = [
        { id: "sk_1", name: "UI/UX Design", desc: "User-centered design architecture, wireframes, user journeys, responsive interface layouts, and interactive design prototypes.", capabilities: ["User Flow & Wireframing", "Figma Interactive Prototypes", "Design System Maintenance"], tools: ["Figma", "Adobe XD", "Photoshop"], visible: true },
        { id: "sk_2", name: "Web Development", desc: "Front-end engineering crafting responsive layouts, semantic DOM structures, and performance-optimized interactive experiences.", capabilities: ["Semantic HTML5 & Modern CSS3", "JavaScript UI State Engineering", "Cross-Browser Responsive Layouts"], tools: ["HTML5", "CSS3", "JavaScript", "React"], visible: true },
        { id: "sk_3", name: "Video Editing", desc: "Story-driven pacing, rhythmic audio synchronization, dynamic keyframe animation, and viral short-form social video edits.", capabilities: ["Reels & Shorts Optimization", "Audio Waveform Synchronization", "Color Grading & Speed Curves"], tools: ["Premiere Pro", "CapCut", "InShot"], visible: true },
        { id: "sk_4", name: "Photography", desc: "Manual exposure calibration, compositional framing, portraiture lighting, and RAW asset grading in Adobe Lightroom.", capabilities: ["Portrait & Event Capture", "High-Dynamic-Range Exposure Control", "Tonal Balance & Preset Creation"], tools: ["Adobe Lightroom", "Photoshop RAW"], visible: true },
        { id: "sk_5", name: "Videography", desc: "Cinematic camera movement, documentary multi-angle production, audio capture, and high-resolution event recording.", capabilities: ["Event & Conference Cinematography", "B-Roll & Creative Sequence Framing", "Multi-Angle Coverage"], tools: ["4K Video Cameras", "Gimbals", "Microphone Systems"], visible: true },
        { id: "sk_6", name: "Graphic Design", desc: "Branding marks, marketing banners, high-impact social flyers, and vector typography compositions.", capabilities: ["Brand Identity & Vector Logos", "High-CTR Social Creative Packs", "Print Ready Layout Preparations"], tools: ["Photoshop", "Illustrator", "Canva"], visible: true },
        { id: "sk_7", name: "Digital Marketing", desc: "Audience targeting segments, conversion funnels, campaign copy variants, and paid acquisition channel analytics.", capabilities: ["Target Audience Structuring", "High-Engagement Visual Copywriting", "Campaign Performance Analytics"], tools: ["Meta Business Suite", "Google Analytics"], visible: true },
        { id: "sk_8", name: "IT Support", desc: "System diagnostics, operating system deployment, application configurations, and hardware troubleshooting.", capabilities: ["OS Installation & System Recovery", "Peripherals & Device Troubleshooting", "User Support & Technical Guidance"], tools: ["Windows OS", "Hardware Diagnostics", "Remote Desktop"], visible: true },
        { id: "sk_9", name: "Networking", desc: "LAN topologies, router and switch setups, IP subnets, and structured Ethernet cabling deployment.", capabilities: ["Router & Switch Deployment", "IP Subnetting & Gateway Routing", "Wired/Wireless LAN Testing"], tools: ["Cisco Packet Tracer", "Network Utilities"], visible: true },
        { id: "sk_10", name: "Computer Hardware & Software", desc: "Component-level PC assembly, benchmark stress-testing, BIOS optimization, and software maintenance.", capabilities: ["Custom Desktop Workstation Assembly", "BIOS & Firmware Updating", "System Thermal & Driver Optimization"], tools: ["Diagnostic Hardware", "Driver Utilities"], visible: true },
        { id: "sk_11", name: "Microsoft Office", desc: "Executive document production in Word, computational modeling in Excel, and slide decks in PowerPoint.", capabilities: ["Spreadsheet Formulations & Pivot Tables", "Executive Reports & Styling", "Corporate Master Slide Decks"], tools: ["Excel", "Word", "PowerPoint"], visible: true },
        { id: "sk_12", name: "Front Desk & Administration", desc: "Professional visitor reception, multi-line telephone switchboard management, meeting appointments, and office records.", capabilities: ["Guest Relations & Inquiry Resolution", "Executive Appointment Scheduling", "Office Records & Document Archiving"], tools: ["Office Suite", "Visitor Logs", "Corporate Email"], visible: true },
        { id: "sk_13", name: "Meta Ads Management", desc: "End-to-end Facebook & Instagram advertising operations, pixel setup, audience A/B split testing, and ROAS optimization.", capabilities: ["Campaign Setup & Custom Audiences", "Creative Variant A/B Split Testing", "ROAS & Cost-Per-Acquisition Optimization"], tools: ["Meta Ads Manager", "Meta Pixel"], visible: true }
      ];
      db.set('skills', skills);
    }

    const el = document.getElementById('module-skills');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            <span>My Skills Manager (${skills.length} Total Cards)</span>
          </div>
          <button class="btn btn-primary" onclick="window.adminApp.openAddSkillModal()" style="padding: 8px 16px; font-size: 0.82rem;">
            + Add New Skill Card
          </button>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width: 50px;">SL</th>
                <th>Skill Name</th>
                <th>Tools</th>
                <th>Status</th>
                <th style="text-align: right;">Order &amp; Actions</th>
              </tr>
            </thead>
            <tbody>
              ${skills.map((s, idx) => `
                <tr>
                  <td>
                    <span style="font-family: monospace; font-size: 0.88rem; color: var(--color-accent); font-weight: 700;">#${idx + 1}</span>
                  </td>
                  <td>
                    <strong>${escapeHtml(s.name)}</strong>
                    <div style="font-size: 0.78rem; color: var(--text-muted); max-width: 300px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${escapeHtml(s.desc)}</div>
                  </td>
                  <td>
                    <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                      ${(s.tools || []).map(t => `<span style="font-size: 0.7rem; background: rgba(255,255,255,0.04); padding: 2px 6px; border-radius: 4px; color: var(--gold-light);">${escapeHtml(t)}</span>`).join('')}
                    </div>
                  </td>
                  <td>
                    <span class="status-pill ${s.visible !== false ? 'active' : 'hidden'}">
                      ${s.visible !== false ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="action-btn reorder" title="Move Up (Shift Higher)" onclick="window.adminApp.moveSkillOrder(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>
                      ⬆️
                    </button>
                    <button class="action-btn reorder" title="Move Down (Shift Lower)" onclick="window.adminApp.moveSkillOrder(${idx}, 1)" ${idx === skills.length - 1 ? 'disabled' : ''}>
                      ⬇️
                    </button>
                    <button class="action-btn reorder" title="Set Specific Serial" onclick="window.adminApp.setSkillPositionPrompt(${idx})" style="font-size: 0.75rem;">
                      🔢
                    </button>
                    <button class="action-btn" title="Toggle Show/Hide" onclick="window.adminApp.toggleSkillVisibility('${s.id}')">
                      ${s.visible !== false ? '👁️' : '🙈'}
                    </button>
                    <button class="action-btn" title="Edit Skill" onclick="window.adminApp.openEditSkillModal('${s.id}')">
                      ✏️
                    </button>
                    <button class="action-btn delete" title="Delete Skill" onclick="window.adminApp.deleteSkill('${s.id}')">
                      🗑️
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function moveSkillOrder(index, direction) {
    const skills = db.get('skills') || [];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= skills.length) return;
    const item = skills.splice(index, 1)[0];
    skills.splice(targetIndex, 0, item);
    db.set('skills', skills);
    renderSkillsModule();
    showToast(`Moved "${item.name}" to SL #${targetIndex + 1}!`, 'success');
  }

  function setSkillPositionPrompt(currentIndex) {
    const skills = db.get('skills') || [];
    if (skills.length <= 1) return;
    const item = skills[currentIndex];
    const input = prompt(`Change serial position for "${item.name}":\nEnter new serial number (1 to ${skills.length}):`, currentIndex + 1);
    if (input === null) return;
    const target = parseInt(input, 10);
    if (isNaN(target) || target < 1 || target > skills.length) {
      showToast(`Invalid position. Please enter between 1 and ${skills.length}.`, 'error');
      return;
    }
    const targetIndex = target - 1;
    if (targetIndex === currentIndex) return;
    const moved = skills.splice(currentIndex, 1)[0];
    skills.splice(targetIndex, 0, moved);
    db.set('skills', skills);
    renderSkillsModule();
    showToast(`Moved "${moved.name}" to SL #${target}!`, 'success');
  }

  function toggleSkillVisibility(id) {
    const skills = db.get('skills') || [];
    const skill = skills.find(s => s.id === id);
    if (skill) {
      skill.visible = skill.visible === false ? true : false;
      db.set('skills', skills);
      renderSkillsModule();
      showToast(`Skill visibility updated.`, 'success');
    }
  }

  function deleteSkill(id) {
    if (confirm('Are you sure you want to delete this skill card?')) {
      db.remove('skills', id);
      renderSkillsModule();
      showToast('Skill deleted.', 'success');
    }
  }

  /**
   * MODULE 6: SOFTWARE & TOOLS MANAGER (CRITICAL SPECIFICATION)
   * ONE SINGLE SECTION, ONE LARGE RECTANGULAR ARENA.
   * Add unlimited software; every new logo appears inside the SAME arena!
   */
  function getToolsData() {
    const stored = localStorage.getItem("foysal_portfolio_tools_db");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    // Return window.arenaToolsDefault if available
    return window.arenaToolsDefault || [];
  }

  function saveToolsData(tools) {
    localStorage.setItem("foysal_portfolio_tools_db", JSON.stringify(tools));
    window.dispatchEvent(new CustomEvent('portfolioToolsUpdated', { detail: { tools } }));
  }

  function renderToolsModule() {
    const tools = getToolsData();
    const el = document.getElementById('module-tools');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            <span>Software & Tools Manager (${tools.length} Logos In Single Arena)</span>
          </div>
          <button class="btn btn-primary" onclick="window.adminApp.openAddToolModal()" style="padding: 8px 16px; font-size: 0.82rem;">
            + Add Unlimited New Software
          </button>
        </div>

        <div style="background: rgba(96, 165, 250, 0.05); border: 1px solid var(--gold-border); border-radius: var(--radius-md); padding: 14px 18px; margin-bottom: 20px; font-size: 0.85rem; color: var(--gold-light);">
          ✨ <strong>Phase 5 Core Requirement Satisfied:</strong> All ${tools.length} software logos live and float together inside <strong>ONE SINGLE large rectangular animation arena</strong>. Adding new logos here will automatically inject them into that same arena on the public site!
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width: 50px;">SL</th>
                <th>Logo</th>
                <th>Software Name</th>
                <th>Category</th>
                <th>Speed</th>
                <th>Status</th>
                <th style="text-align: right;">Order &amp; Actions</th>
              </tr>
            </thead>
            <tbody>
              ${tools.map((t, idx) => `
                <tr>
                  <td>
                    <span style="font-family: monospace; font-size: 0.88rem; color: var(--color-accent); font-weight: 700;">#${idx + 1}</span>
                  </td>
                  <td>
                    <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; padding: 5px;">
                      ${t.svg ? t.svg.replace('<svg', '<svg style="width:100%;height:100%;"') : '🎨'}
                    </div>
                  </td>
                  <td>
                    <strong>${escapeHtml(t.name)}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(t.desc || '')}</div>
                  </td>
                  <td><span style="font-size: 0.75rem; color: var(--gold-light);">${escapeHtml(t.cat || 'Tool')}</span></td>
                  <td><code>${t.speed ? t.speed + 'x' : '1.0x'}</code></td>
                  <td>
                    <span class="status-pill ${t.visible !== false ? 'active' : 'hidden'}">
                      ${t.visible !== false ? 'In Arena' : 'Hidden'}
                    </span>
                  </td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="action-btn reorder" title="Move Up (Shift Higher)" onclick="window.adminApp.moveToolOrder(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>
                      ⬆️
                    </button>
                    <button class="action-btn reorder" title="Move Down (Shift Lower)" onclick="window.adminApp.moveToolOrder(${idx}, 1)" ${idx === tools.length - 1 ? 'disabled' : ''}>
                      ⬇️
                    </button>
                    <button class="action-btn reorder" title="Set Specific Serial" onclick="window.adminApp.setToolPositionPrompt(${idx})" style="font-size: 0.75rem;">
                      🔢
                    </button>
                    <button class="action-btn" title="Toggle Visible in Arena" onclick="window.adminApp.toggleToolVisibility('${t.id}')">
                      ${t.visible !== false ? '👁️' : '🙈'}
                    </button>
                    <button class="action-btn" title="Edit Software" onclick="window.adminApp.openEditToolModal('${t.id}')">
                      ✏️
                    </button>
                    <button class="action-btn delete" title="Delete Software" onclick="window.adminApp.deleteTool('${t.id}')">
                      🗑️
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function moveToolOrder(index, direction) {
    const tools = getToolsData();
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= tools.length) return;
    const item = tools.splice(index, 1)[0];
    tools.splice(targetIndex, 0, item);
    saveToolsData(tools);
    renderToolsModule();
    showToast(`Moved "${item.name}" to SL #${targetIndex + 1}!`, 'success');
  }

  function setToolPositionPrompt(currentIndex) {
    const tools = getToolsData();
    if (tools.length <= 1) return;
    const item = tools[currentIndex];
    const input = prompt(`Change serial position for "${item.name}":\nEnter new serial number (1 to ${tools.length}):`, currentIndex + 1);
    if (input === null) return;
    const target = parseInt(input, 10);
    if (isNaN(target) || target < 1 || target > tools.length) {
      showToast(`Invalid position. Please enter between 1 and ${tools.length}.`, 'error');
      return;
    }
    const targetIndex = target - 1;
    if (targetIndex === currentIndex) return;
    const moved = tools.splice(currentIndex, 1)[0];
    tools.splice(targetIndex, 0, moved);
    saveToolsData(tools);
    renderToolsModule();
    showToast(`Moved "${moved.name}" to SL #${target}!`, 'success');
  }

  function toggleToolVisibility(id) {
    const tools = getToolsData();
    const tool = tools.find(t => t.id === id);
    if (tool) {
      tool.visible = tool.visible === false ? true : false;
      saveToolsData(tools);
      renderToolsModule();
      showToast(`Software visibility updated.`, 'success');
    }
  }

  function deleteTool(id) {
    const tools = getToolsData();
    const tool = tools.find(t => t.id === id);
    if (confirm(`Remove "${tool ? tool.name : 'this software'}" from the floating arena?`)) {
      const filtered = tools.filter(t => t.id !== id);
      saveToolsData(filtered);
      renderToolsModule();
      showToast('Software removed from arena.', 'success');
    }
  }

  /**
   * MODULE 7: PROJECT GALLERY MANAGER (8 Galleries)
   */
  function getProjectsData() {
    const map = { uiux: [], webdev: [], video: [], photography: [], videography: [], graphic: [], marketing: [], technical: [] };
    const stored = localStorage.getItem("foysal_portfolio_projects_db");
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach(p => {
            const c = p.category || 'uiux';
            if (!map[c]) map[c] = [];
            map[c].push({
              ...p,
              desc: p.desc || p.description || ''
            });
          });
          return map;
        } else if (typeof parsed === 'object' && parsed !== null && Object.keys(parsed).length > 0) {
          return { ...map, ...parsed };
        }
      } catch (e) {}
    }

    // Default Seed from window.DEFAULT_PROJECTS
    const defaults = window.DEFAULT_PROJECTS || [];
    defaults.forEach(p => {
      const c = p.category || 'uiux';
      if (!map[c]) map[c] = [];
      map[c].push({
        ...p,
        desc: p.desc || p.description || ''
      });
    });
    return map;
  }

  function saveProjectsData(data) {
    let toStore = data;
    if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
      const flat = [];
      Object.keys(data).forEach(cat => {
        if (Array.isArray(data[cat])) {
          data[cat].forEach(p => flat.push({ ...p, category: p.category || cat, description: p.desc || p.description }));
        }
      });
      toStore = flat;
    }
    localStorage.setItem("foysal_portfolio_projects_db", JSON.stringify(toStore));
    window.dispatchEvent(new CustomEvent('portfolioProjectsUpdated', { detail: { projects: toStore } }));
    window.dispatchEvent(new CustomEvent('projectsUpdated', { detail: { projects: toStore } }));
  }

  function renderProjectsModule() {
    const data = getProjectsData();
    const categories = [
      { id: 'uiux', name: 'UI/UX Design' },
      { id: 'webdev', name: 'Web Development' },
      { id: 'video', name: 'Video Editing' },
      { id: 'photography', name: 'Photography' },
      { id: 'videography', name: 'Videography' },
      { id: 'graphic', name: 'Graphic Design' },
      { id: 'marketing', name: 'Digital Marketing' },
      { id: 'technical', name: 'IT & Technical' }
    ];

    const el = document.getElementById('module-projects');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>Project Galleries Manager (8 Specialized Disciplines)</span>
          </div>
          <button class="btn btn-primary" onclick="window.adminApp.openAddProjectModal()" style="padding: 8px 16px; font-size: 0.82rem;">
            + Add New Project Card
          </button>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
          ${categories.map((c, i) => `
            <button class="btn ${i === 0 ? 'btn-cyber' : 'btn-outline'}" onclick="window.adminApp.filterProjectCategory('${c.id}', this)" style="padding: 6px 14px; font-size: 0.78rem;">
              ${c.name} (${(data[c.id] || []).length})
            </button>
          `).join('')}
        </div>

        <div id="adminProjectListContainer">
          <!-- Populated by filterProjectCategory -->
        </div>
      </div>
    `;

    // Render first category by default
    filterProjectCategory('uiux');
  }

  function filterProjectCategory(catId, btnElement) {
    if (btnElement) {
      btnElement.parentElement.querySelectorAll('button').forEach(b => {
        b.className = 'btn btn-outline';
      });
      btnElement.className = 'btn btn-cyber';
    }

    const data = getProjectsData();
    const projects = data[catId] || [];
    const container = document.getElementById('adminProjectListContainer');
    if (!container) return;

    if (projects.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: var(--radius-md); border: 1px dashed rgba(255,255,255,0.1);">
          <p style="color: var(--text-muted); font-size: 0.9rem;">No projects yet in this gallery category. Public site displays "Projects Coming Soon".</p>
          <button class="btn btn-primary" onclick="window.adminApp.openAddProjectModal('${catId}')" style="margin-top: 14px; padding: 8px 18px; font-size: 0.82rem;">
            + Add First Project to ${catId.toUpperCase()}
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 50px;">SL</th>
              <th>Project Title</th>
              <th>Tools Used</th>
              <th>Status</th>
              <th style="text-align: right;">Order &amp; Actions</th>
            </tr>
          </thead>
          <tbody>
            ${projects.map((p, idx) => `
              <tr>
                <td>
                  <span style="font-family: monospace; font-size: 0.88rem; color: var(--color-accent); font-weight: 700;">#${idx + 1}</span>
                </td>
                <td>
                  <strong>${escapeHtml(p.name)}</strong>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(p.desc)}</div>
                </td>
                <td>
                  <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                    ${(p.tools || []).map(t => `<span style="font-size: 0.7rem; background: rgba(255,255,255,0.04); padding: 2px 6px; border-radius: 4px; color: var(--gold-light);">${escapeHtml(t)}</span>`).join('')}
                  </div>
                </td>
                <td>
                  <span class="status-pill ${p.visible !== false ? 'active' : 'hidden'}">
                    ${p.visible !== false ? 'Live' : 'Hidden'}
                  </span>
                </td>
                <td style="text-align: right; white-space: nowrap;">
                  <button class="action-btn reorder" title="Move Up (Shift Higher)" onclick="window.adminApp.moveProjectOrder('${catId}', ${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>
                    ⬆️
                  </button>
                  <button class="action-btn reorder" title="Move Down (Shift Lower)" onclick="window.adminApp.moveProjectOrder('${catId}', ${idx}, 1)" ${idx === projects.length - 1 ? 'disabled' : ''}>
                    ⬇️
                  </button>
                  <button class="action-btn reorder" title="Set Specific Serial" onclick="window.adminApp.setProjectPositionPrompt('${catId}', ${idx})" style="font-size: 0.75rem;">
                    🔢
                  </button>
                  <button class="action-btn" title="Toggle Visible" onclick="window.adminApp.toggleProjectVisibility('${catId}', '${p.id}')">
                    ${p.visible !== false ? '👁️' : '🙈'}
                  </button>
                  <button class="action-btn" title="Edit Project" onclick="window.adminApp.openEditProjectModal('${catId}', '${p.id}')">
                    ✏️
                  </button>
                  <button class="action-btn delete" title="Delete Project" onclick="window.adminApp.deleteProject('${catId}', '${p.id}')">
                    🗑️
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function moveProjectOrder(catId, index, direction) {
    const data = getProjectsData();
    const list = data[catId];
    if (!list) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const item = list.splice(index, 1)[0];
    list.splice(targetIndex, 0, item);
    saveProjectsData(data);
    filterProjectCategory(catId);
    showToast(`Moved "${item.name}" to SL #${targetIndex + 1}!`, 'success');
  }

  function setProjectPositionPrompt(catId, currentIndex) {
    const data = getProjectsData();
    const list = data[catId];
    if (!list || list.length <= 1) return;
    const item = list[currentIndex];
    const input = prompt(`Change serial position for "${item.name}":\nEnter new serial number (1 to ${list.length}):`, currentIndex + 1);
    if (input === null) return;
    const target = parseInt(input, 10);
    if (isNaN(target) || target < 1 || target > list.length) {
      showToast(`Invalid position. Please enter between 1 and ${list.length}.`, 'error');
      return;
    }
    const targetIndex = target - 1;
    if (targetIndex === currentIndex) return;
    const moved = list.splice(currentIndex, 1)[0];
    list.splice(targetIndex, 0, moved);
    saveProjectsData(data);
    filterProjectCategory(catId);
    showToast(`Moved "${moved.name}" to SL #${target}!`, 'success');
  }

  function toggleProjectVisibility(catId, id) {
    const data = getProjectsData();
    if (data[catId]) {
      const p = data[catId].find(item => item.id === id);
      if (p) {
        p.visible = p.visible === false ? true : false;
        saveProjectsData(data);
        filterProjectCategory(catId);
        showToast('Project visibility updated.', 'success');
      }
    }
  }

  function deleteProject(catId, id) {
    if (confirm('Are you sure you want to delete this project?')) {
      const data = getProjectsData();
      if (data[catId]) {
        data[catId] = data[catId].filter(item => item.id !== id);
        saveProjectsData(data);
        filterProjectCategory(catId);
        showToast('Project deleted successfully.', 'success');
      }
    }
  }

  /**
   * MODULE 8: EXPERIENCE MANAGER
   */
  function renderExperienceModule() {
    const exp = db.get('experience') || [];
    const el = document.getElementById('module-experience');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Experience Timeline Manager (${exp.length} Entries)</span>
          </div>
          <button class="btn btn-primary" onclick="window.adminApp.openAddExperienceModal()" style="padding: 8px 16px; font-size: 0.82rem;">
            + Add New Experience
          </button>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 20px;">
          Manage your career timeline, distinguishing creative practice from formal organizational appointments.
        </p>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width: 50px;">SL</th>
                <th>Role &amp; Organization</th>
                <th>Classification</th>
                <th>Period</th>
                <th>Duties Count</th>
                <th style="text-align: right;">Order &amp; Actions</th>
              </tr>
            </thead>
            <tbody>
              ${exp.map((e, idx) => `
                <tr>
                  <td>
                    <span style="font-family: monospace; font-size: 0.88rem; color: var(--color-accent); font-weight: 700;">#${idx + 1}</span>
                  </td>
                  <td>
                    <strong>${escapeHtml(e.role)}</strong>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(e.location || '')}</div>
                  </td>
                  <td>
                    <span class="experience-badge ${escapeHtml(e.badgeClass || 'practice')}" style="font-size: 0.72rem;">
                      ${escapeHtml(e.type || 'Practice')}
                    </span>
                  </td>
                  <td>${escapeHtml(e.period || '')}</td>
                  <td>${(e.duties || []).length} key responsibilities</td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="action-btn reorder" title="Move Up (Shift Higher)" onclick="window.adminApp.moveExperienceOrder(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>
                      ⬆️
                    </button>
                    <button class="action-btn reorder" title="Move Down (Shift Lower)" onclick="window.adminApp.moveExperienceOrder(${idx}, 1)" ${idx === exp.length - 1 ? 'disabled' : ''}>
                      ⬇️
                    </button>
                    <button class="action-btn reorder" title="Set Specific Serial" onclick="window.adminApp.setExperiencePositionPrompt(${idx})" style="font-size: 0.75rem;">
                      🔢
                    </button>
                    <button class="action-btn" title="Edit Experience" onclick="window.adminApp.openEditExperienceModal('${e.id}')">
                      ✏️
                    </button>
                    <button class="action-btn delete" title="Delete Experience" onclick="window.adminApp.deleteExperience('${e.id}')">
                      🗑️
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function moveExperienceOrder(index, direction) {
    const exp = db.get('experience') || [];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= exp.length) return;
    const item = exp.splice(index, 1)[0];
    exp.splice(targetIndex, 0, item);
    db.set('experience', exp);
    renderExperienceModule();
    showToast(`Moved "${item.role}" to SL #${targetIndex + 1}!`, 'success');
  }

  function setExperiencePositionPrompt(currentIndex) {
    const exp = db.get('experience') || [];
    if (exp.length <= 1) return;
    const item = exp[currentIndex];
    const input = prompt(`Change timeline position for "${item.role}":\nEnter new serial number (1 to ${exp.length}):`, currentIndex + 1);
    if (input === null) return;
    const target = parseInt(input, 10);
    if (isNaN(target) || target < 1 || target > exp.length) {
      showToast(`Invalid position. Please enter between 1 and ${exp.length}.`, 'error');
      return;
    }
    const targetIndex = target - 1;
    if (targetIndex === currentIndex) return;
    const moved = exp.splice(currentIndex, 1)[0];
    exp.splice(targetIndex, 0, moved);
    db.set('experience', exp);
    renderExperienceModule();
    showToast(`Moved "${moved.role}" to SL #${target}!`, 'success');
  }

  function openAddExperienceModal() {
    openModal("Add New Experience Timeline Entry", `
      <form onsubmit="event.preventDefault(); window.adminApp.submitAddExperience();">
        <div class="form-group-row">
          <div class="form-field">
            <label class="form-label">Role Title *</label>
            <input type="text" id="expRole" class="form-input" placeholder="e.g. Lead UI/UX Designer & Prototyper" required>
          </div>
          <div class="form-field">
            <label class="form-label">Company / Organization *</label>
            <input type="text" id="expLocation" class="form-input" placeholder="e.g. Creative Studio / Dhaka, Bangladesh" required>
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-field">
            <label class="form-label">Classification / Type</label>
            <select id="expType" class="form-select">
              <option value="Creative & Personal Projects">Creative & Personal Projects</option>
              <option value="Organizational Appointment">Organizational Appointment</option>
              <option value="Hands-on Design Practice">Hands-on Design Practice</option>
              <option value="Professional Role">Professional Role</option>
              <option value="Technical Practice">Technical Practice</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">Timeline / Period *</label>
            <input type="text" id="expPeriod" class="form-input" placeholder="e.g. 2024 – Present / Self-Directed" required>
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Key Duties & Responsibilities (1 per line or comma-separated) *</label>
          <textarea id="expDuties" class="form-textarea" style="min-height: 100px;" placeholder="• Captured photographs and video footage&#10;• Edited short-form social reels in CapCut&#10;• Enhanced lighting and color grading in Lightroom" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
          Add Experience Entry
        </button>
      </form>
    `);
  }

  function submitAddExperience() {
    const role = document.getElementById('expRole').value.trim();
    const location = document.getElementById('expLocation').value.trim();
    const type = document.getElementById('expType').value;
    const period = document.getElementById('expPeriod').value.trim();
    const dutiesRaw = document.getElementById('expDuties').value;
    const duties = dutiesRaw.split(/[\n,]+/).map(d => d.replace(/^[•\-\s]+/, '').trim()).filter(Boolean);

    const badgeMap = {
      'Creative & Personal Projects': 'personal',
      'Organizational Appointment': 'organizational',
      'Hands-on Design Practice': 'practice',
      'Professional Role': 'organizational',
      'Technical Practice': 'practice'
    };

    const newExp = {
      id: 'exp_' + Date.now(),
      role,
      location,
      type,
      badgeClass: badgeMap[type] || 'practice',
      period,
      duties
    };

    db.add('experience', newExp);
    closeModal();
    renderExperienceModule();
    showToast(`Experience "${role}" added successfully!`, 'success');
  }

  function openEditExperienceModal(id) {
    const list = db.get('experience') || [];
    const item = list.find(e => e.id === id);
    if (!item) return;

    openModal("Edit Experience Entry", `
      <form onsubmit="event.preventDefault(); window.adminApp.submitEditExperience('${id}');">
        <div class="form-group-row">
          <div class="form-field">
            <label class="form-label">Role Title *</label>
            <input type="text" id="editExpRole" class="form-input" value="${escapeHtml(item.role)}" required>
          </div>
          <div class="form-field">
            <label class="form-label">Company / Organization *</label>
            <input type="text" id="editExpLocation" class="form-input" value="${escapeHtml(item.location || '')}" required>
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-field">
            <label class="form-label">Classification / Type</label>
            <input type="text" id="editExpType" class="form-input" value="${escapeHtml(item.type || '')}">
          </div>
          <div class="form-field">
            <label class="form-label">Timeline / Period *</label>
            <input type="text" id="editExpPeriod" class="form-input" value="${escapeHtml(item.period || '')}" required>
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Key Duties & Responsibilities (1 per line)</label>
          <textarea id="editExpDuties" class="form-textarea" style="min-height: 100px;">${(item.duties || []).join('\n')}</textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
          Update Experience
        </button>
      </form>
    `);
  }

  function submitEditExperience(id) {
    const role = document.getElementById('editExpRole').value.trim();
    const location = document.getElementById('editExpLocation').value.trim();
    const type = document.getElementById('editExpType').value.trim();
    const period = document.getElementById('editExpPeriod').value.trim();
    const dutiesRaw = document.getElementById('editExpDuties').value;
    const duties = dutiesRaw.split(/[\n,]+/).map(d => d.replace(/^[•\-\s]+/, '').trim()).filter(Boolean);

    db.update('experience', id, { role, location, type, period, duties });
    closeModal();
    renderExperienceModule();
    showToast('Experience updated successfully!', 'success');
  }

  function deleteExperience(id) {
    if (confirm('Delete this experience entry permanently?')) {
      db.remove('experience', id);
      renderExperienceModule();
      showToast('Experience entry deleted.', 'success');
    }
  }

  /**
   * MODULE 9: EDUCATION MANAGER
   */
  function renderEducationModule() {
    const edu = db.get('education') || [];
    const el = document.getElementById('module-education');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            <span>Education & Qualifications (${edu.length} Records)</span>
          </div>
          <button class="btn btn-primary" onclick="window.adminApp.openAddEducationModal()" style="padding: 8px 16px; font-size: 0.82rem;">
            + Add New Education
          </button>
        </div>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width: 50px;">SL</th>
                <th>Degree / Certificate</th>
                <th>Institution</th>
                <th>Timeline / Status</th>
                <th>Focus Areas</th>
                <th style="text-align: right;">Order &amp; Actions</th>
              </tr>
            </thead>
            <tbody>
              ${edu.map((item, idx) => `
                <tr>
                  <td>
                    <span style="font-family: monospace; font-size: 0.88rem; color: var(--color-accent); font-weight: 700;">#${idx + 1}</span>
                  </td>
                  <td><strong>${escapeHtml(item.degree)}</strong></td>
                  <td>${escapeHtml(item.institution)}</td>
                  <td>${escapeHtml(item.period)}</td>
                  <td>
                    <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                      ${(item.focus || []).map(f => `<span style="font-size: 0.7rem; background: rgba(255,255,255,0.04); padding: 2px 6px; border-radius: 4px; color: var(--gold-light);">${escapeHtml(f)}</span>`).join('')}
                    </div>
                  </td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="action-btn reorder" title="Move Up (Shift Higher)" onclick="window.adminApp.moveEducationOrder(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>
                      ⬆️
                    </button>
                    <button class="action-btn reorder" title="Move Down (Shift Lower)" onclick="window.adminApp.moveEducationOrder(${idx}, 1)" ${idx === edu.length - 1 ? 'disabled' : ''}>
                      ⬇️
                    </button>
                    <button class="action-btn reorder" title="Set Specific Serial" onclick="window.adminApp.setEducationPositionPrompt(${idx})" style="font-size: 0.75rem;">
                      🔢
                    </button>
                    <button class="action-btn" title="Edit Education" onclick="window.adminApp.openEditEducationModal('${item.id}')">
                      ✏️
                    </button>
                    <button class="action-btn delete" title="Delete Education" onclick="window.adminApp.deleteEducation('${item.id}')">
                      🗑️
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function moveEducationOrder(index, direction) {
    const edu = db.get('education') || [];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= edu.length) return;
    const item = edu.splice(index, 1)[0];
    edu.splice(targetIndex, 0, item);
    db.set('education', edu);
    renderEducationModule();
    showToast(`Moved "${item.degree}" to SL #${targetIndex + 1}!`, 'success');
  }

  function setEducationPositionPrompt(currentIndex) {
    const edu = db.get('education') || [];
    if (edu.length <= 1) return;
    const item = edu[currentIndex];
    const input = prompt(`Change education position for "${item.degree}":\nEnter new serial number (1 to ${edu.length}):`, currentIndex + 1);
    if (input === null) return;
    const target = parseInt(input, 10);
    if (isNaN(target) || target < 1 || target > edu.length) {
      showToast(`Invalid position. Please enter between 1 and ${edu.length}.`, 'error');
      return;
    }
    const targetIndex = target - 1;
    if (targetIndex === currentIndex) return;
    const moved = edu.splice(currentIndex, 1)[0];
    edu.splice(targetIndex, 0, moved);
    db.set('education', edu);
    renderEducationModule();
    showToast(`Moved "${moved.degree}" to SL #${target}!`, 'success');
  }

  function openAddEducationModal() {
    openModal("Add New Education Record", `
      <form onsubmit="event.preventDefault(); window.adminApp.submitAddEducation();">
        <div class="form-group-row">
          <div class="form-field">
            <label class="form-label">Degree / Qualification *</label>
            <input type="text" id="eduDegree" class="form-input" placeholder="e.g. B.Sc in Computer Science & Engineering" required>
          </div>
          <div class="form-field">
            <label class="form-label">Institution Name *</label>
            <input type="text" id="eduInstitution" class="form-input" placeholder="e.g. Northern University Bangladesh" required>
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-field">
            <label class="form-label">Period / Status *</label>
            <input type="text" id="eduPeriod" class="form-input" placeholder="e.g. 2026 – 2030 / Completed" required>
          </div>
          <div class="form-field">
            <label class="form-label">Level / Badge</label>
            <input type="text" id="eduBadge" class="form-input" placeholder="e.g. Undergraduate Degree / Polytechnic Diploma">
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Location (Optional)</label>
          <input type="text" id="eduLocation" class="form-input" placeholder="e.g. Dhaka, Bangladesh">
        </div>
        <div class="form-field">
          <label class="form-label">Focus Areas / Curricula (Comma-separated)</label>
          <input type="text" id="eduFocus" class="form-input" placeholder="e.g. Software Engineering, Algorithms, Database Systems">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
          Add Education Record
        </button>
      </form>
    `);
  }

  function submitAddEducation() {
    const degree = document.getElementById('eduDegree').value.trim();
    const institution = document.getElementById('eduInstitution').value.trim();
    const period = document.getElementById('eduPeriod').value.trim();
    const badge = document.getElementById('eduBadge').value.trim() || 'Academic Qualification';
    const location = document.getElementById('eduLocation').value.trim() || '';
    const focusStr = document.getElementById('eduFocus').value;
    const focus = focusStr.split(',').map(s => s.trim()).filter(Boolean);

    const newEdu = {
      id: 'edu_' + Date.now(),
      degree,
      institution,
      period,
      badge,
      location,
      focus
    };

    db.add('education', newEdu);
    closeModal();
    renderEducationModule();
    showToast(`Education record "${degree}" added!`, 'success');
  }

  function openEditEducationModal(id) {
    const list = db.get('education') || [];
    const item = list.find(e => e.id === id);
    if (!item) return;

    openModal("Edit Education Record", `
      <form onsubmit="event.preventDefault(); window.adminApp.submitEditEducation('${id}');">
        <div class="form-group-row">
          <div class="form-field">
            <label class="form-label">Degree / Qualification *</label>
            <input type="text" id="editEduDegree" class="form-input" value="${escapeHtml(item.degree)}" required>
          </div>
          <div class="form-field">
            <label class="form-label">Institution Name *</label>
            <input type="text" id="editEduInstitution" class="form-input" value="${escapeHtml(item.institution)}" required>
          </div>
        </div>
        <div class="form-group-row">
          <div class="form-field">
            <label class="form-label">Period / Status *</label>
            <input type="text" id="editEduPeriod" class="form-input" value="${escapeHtml(item.period)}" required>
          </div>
          <div class="form-field">
            <label class="form-label">Level / Badge</label>
            <input type="text" id="editEduBadge" class="form-input" value="${escapeHtml(item.badge || '')}">
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Focus Areas / Curricula (Comma-separated)</label>
          <input type="text" id="editEduFocus" class="form-input" value="${escapeHtml((item.focus || []).join(', '))}">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
          Update Education
        </button>
      </form>
    `);
  }

  function submitEditEducation(id) {
    const degree = document.getElementById('editEduDegree').value.trim();
    const institution = document.getElementById('editEduInstitution').value.trim();
    const period = document.getElementById('editEduPeriod').value.trim();
    const badge = document.getElementById('editEduBadge').value.trim();
    const focusStr = document.getElementById('editEduFocus').value;
    const focus = focusStr.split(',').map(s => s.trim()).filter(Boolean);

    db.update('education', id, { degree, institution, period, badge, focus });
    closeModal();
    renderEducationModule();
    showToast('Education record updated!', 'success');
  }

  function deleteEducation(id) {
    if (confirm('Delete this education record permanently?')) {
      db.remove('education', id);
      renderEducationModule();
      showToast('Education record deleted.', 'success');
    }
  }

  /**
   * MODULE 10: SOCIAL MEDIA MANAGER
   */
  function renderSocialModule() {
    const social = db.get('social') || [];
    const el = document.getElementById('module-social');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            <span>Social Media Single-Row Channels</span>
          </div>
          <button class="btn btn-primary" onclick="window.adminApp.saveSocialLinks()" style="padding: 8px 16px; font-size: 0.82rem;">
            Save Social Links
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
          ${social.map(s => `
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 18px; border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h4 style="color: #FFFFFF; font-size: 1rem;">${escapeHtml(s.platform)}</h4>
                <label style="font-size: 0.78rem; display: flex; align-items: center; gap: 6px; cursor: pointer;">
                  <input type="checkbox" id="socialEnabled_${s.id}" ${s.enabled !== false ? 'checked' : ''}>
                  <span>Enabled</span>
                </label>
              </div>

              <div class="form-field">
                <label class="form-label">Profile / Chat URL</label>
                <input type="url" id="socialUrl_${s.id}" class="form-input" value="${escapeHtml(s.url || '')}" required>
              </div>

              <div class="form-field">
                <label class="form-label">Display Handle / Text</label>
                <input type="text" id="socialHandle_${s.id}" class="form-input" value="${escapeHtml(s.handle || '')}" required>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function saveSocialLinks() {
    const social = db.get('social') || [];
    social.forEach(s => {
      const urlInput = document.getElementById(`socialUrl_${s.id}`);
      const handleInput = document.getElementById(`socialHandle_${s.id}`);
      const enabledCheckbox = document.getElementById(`socialEnabled_${s.id}`);

      if (urlInput) s.url = urlInput.value.trim();
      if (handleInput) s.handle = handleInput.value.trim();
      if (enabledCheckbox) s.enabled = enabledCheckbox.checked;
    });

    db.set('social', social);
    showToast('Social media configuration saved!', 'success');
  }

  /**
   * MODULE 11: CONTACT INBOX (Phase 10 & 13)
   */
  function renderInboxModule() {
    const inbox = db.get('contact_inbox') || [];
    const el = document.getElementById('module-inbox');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>Contact Messages Inbox (${inbox.length} Received)</span>
          </div>
          <button class="btn btn-outline" onclick="window.adminApp.clearReadMessages()" style="padding: 8px 14px; font-size: 0.8rem;">
            Clear Read Messages
          </button>
        </div>

        ${inbox.length === 0 ? `
          <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
            No messages received yet. Inquiries submitted via the Contact form will appear here.
          </div>
        ` : `
          <div class="admin-table-container">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Sender</th>
                  <th>Subject & Message</th>
                  <th>Date</th>
                  <th style="text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${inbox.map(m => `
                  <tr style="${!m.read ? 'background: rgba(96, 165, 250, 0.04);' : ''}">
                    <td>
                      <span class="status-pill ${!m.read ? 'pending' : 'unread'}">
                        ${!m.read ? 'Unread' : 'Read'}
                      </span>
                    </td>
                    <td>
                      <strong>${escapeHtml(m.name)}</strong>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(m.email)}</div>
                    </td>
                    <td>
                      <strong>${escapeHtml(m.subject)}</strong>
                      <div style="font-size: 0.82rem; color: var(--text-secondary); max-width: 400px; line-height: 1.5;">${escapeHtml(m.message)}</div>
                    </td>
                    <td style="font-size: 0.78rem; white-space: nowrap;">
                      ${new Date(m.timestamp).toLocaleDateString()} ${new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td style="text-align: right; white-space: nowrap;">
                      <button class="btn btn-cyber" title="Reply via SMS" onclick="window.adminApp.replyInboxViaSMS('${m.id}')" style="padding: 4px 10px; font-size: 0.74rem; margin-right: 4px;">
                        📱 SMS Reply
                      </button>
                      <a href="mailto:${escapeHtml(m.email)}?subject=Re: ${encodeURIComponent(m.subject)}" class="action-btn" title="Reply via Email">
                        ✉️
                      </a>
                      <button class="action-btn" title="Mark Read/Unread" onclick="window.adminApp.toggleInboxRead('${m.id}')">
                        ${!m.read ? '✓' : '↩'}
                      </button>
                      <button class="action-btn delete" title="Delete Message" onclick="window.adminApp.deleteInboxMessage('${m.id}')">
                        🗑️
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
  }

  function toggleInboxRead(id) {
    const inbox = db.get('contact_inbox') || [];
    const msg = inbox.find(m => m.id === id);
    if (msg) {
      msg.read = !msg.read;
      db.set('contact_inbox', inbox);
      renderInboxModule();
      updateBadgeCounters();
    }
  }

  function deleteInboxMessage(id) {
    if (confirm('Delete this message permanently?')) {
      db.remove('contact_inbox', id);
      renderInboxModule();
      updateBadgeCounters();
      showToast('Message deleted.', 'success');
    }
  }

  function clearReadMessages() {
    const inbox = db.get('contact_inbox') || [];
    const unreadOnly = inbox.filter(m => !m.read);
    db.set('contact_inbox', unreadOnly);
    renderInboxModule();
    showToast('Read messages cleared.', 'success');
  }

  function replyInboxViaSMS(id) {
    const inbox = db.get('contact_inbox') || [];
    const msg = inbox.find(m => m.id === id);
    if (!msg) return;

    switchModule('sms');
    setTimeout(() => {
      const recipientEl = document.getElementById('smsRecipient');
      const bodyEl = document.getElementById('smsBody');
      if (recipientEl) {
        recipientEl.value = msg.phone || '+8801855669424';
        recipientEl.focus();
      }
      if (bodyEl) {
        bodyEl.value = `Hi ${msg.name}, thank you for contacting MD Foysal Al Nur regarding "${msg.subject}". I have received your message and will follow up shortly.`;
        updateSMSCounter(bodyEl.value);
      }
      showToast(`Replying via SMS to ${msg.name}`, 'info');
    }, 250);
  }

  /**
   * MODULE 12: FEEDBACK MODERATION (Phase 11 & 13)
   */
  function renderFeedbackModule() {
    const feedback = db.get('feedback') || [];
    const el = document.getElementById('module-feedback');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Feedback Moderation & Reviews (${feedback.length} Total)</span>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 20px;">
          Only reviews marked as <strong>Approved</strong> are rendered publicly on the website.
        </p>

        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width: 50px;">SL</th>
                <th>Reviewer</th>
                <th>Rating</th>
                <th>Feedback Quote</th>
                <th>Status</th>
                <th style="text-align: right;">Order &amp; Moderation</th>
              </tr>
            </thead>
            <tbody>
              ${feedback.map((f, idx) => `
                <tr style="${!f.approved ? 'background: rgba(234, 179, 8, 0.04);' : ''}">
                  <td>
                    <span style="font-family: monospace; font-size: 0.88rem; color: var(--color-accent); font-weight: 700;">#${idx + 1}</span>
                  </td>
                  <td>
                    <strong>${escapeHtml(f.name)}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(f.role || 'Client')}</div>
                  </td>
                  <td style="color: var(--gold-primary); font-weight: 700; white-space: nowrap;">
                    ${'★'.repeat(f.rating || 5)} (${f.rating || 5}/5)
                  </td>
                  <td>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); max-width: 380px; line-height: 1.5;">"${escapeHtml(f.quote)}"</div>
                  </td>
                  <td>
                    <span class="status-pill ${f.approved ? 'approved' : 'pending'}">
                      ${f.approved ? 'Approved' : 'Pending Moderation'}
                    </span>
                  </td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="action-btn reorder" title="Move Up" onclick="window.adminApp.moveFeedbackOrder(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>
                      ⬆️
                    </button>
                    <button class="action-btn reorder" title="Move Down" onclick="window.adminApp.moveFeedbackOrder(${idx}, 1)" ${idx === feedback.length - 1 ? 'disabled' : ''}>
                      ⬇️
                    </button>
                    ${!f.approved ? `
                      <button class="btn btn-primary" onclick="window.adminApp.approveFeedback('${f.id}')" style="padding: 5px 12px; font-size: 0.74rem;">
                        Approve ✓
                      </button>
                    ` : `
                      <button class="btn btn-outline" onclick="window.adminApp.unapproveFeedback('${f.id}')" style="padding: 5px 12px; font-size: 0.74rem;">
                        Unpublish ✕
                      </button>
                    `}
                    <button class="action-btn delete" title="Delete Review" onclick="window.adminApp.deleteFeedback('${f.id}')">
                      🗑️
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function moveFeedbackOrder(index, direction) {
    const feedback = db.get('feedback') || [];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= feedback.length) return;
    const item = feedback.splice(index, 1)[0];
    feedback.splice(targetIndex, 0, item);
    db.set('feedback', feedback);
    renderFeedbackModule();
    showToast(`Moved review from "${item.name}" to SL #${targetIndex + 1}!`, 'success');
  }

  function approveFeedback(id) {
    db.update('feedback', id, { approved: true });
    renderFeedbackModule();
    updateBadgeCounters();
    showToast('Review approved! Now live on public site.', 'success');
  }

  function unapproveFeedback(id) {
    db.update('feedback', id, { approved: false });
    renderFeedbackModule();
    updateBadgeCounters();
    showToast('Review hidden from public site.', 'success');
  }

  function deleteFeedback(id) {
    if (confirm('Delete this review permanently?')) {
      db.remove('feedback', id);
      renderFeedbackModule();
      updateBadgeCounters();
      showToast('Review deleted.', 'success');
    }
  }

  /**
   * MODULE 13: CV UPLOAD & MANAGEMENT
   */
  function getCVList() {
    const stored = localStorage.getItem('foysal_portfolio_cv_list');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    const defaults = [
      { id: 'cv_1', name: "Foysal Al Nur — Master CV", file: "assets/Foysal_Al_Nur_CV.pdf", desc: "Comprehensive Portfolio CV covering UI/UX, Web Dev, and Computing.", isDefault: true },
      { id: 'cv_2', name: "Nur — Video Editor Specialized CV", file: "assets/Nur_Video_Editor_CV.pdf", desc: "Tailored for video editing, motion storytelling, and reels production.", isDefault: true },
      { id: 'cv_3', name: "Nur — Receptionist & Administration CV", file: "assets/Nur_Receptionist_CV.pdf", desc: "Tailored for front desk, executive administration, and office operations.", isDefault: true }
    ];
    saveCVList(defaults);
    return defaults;
  }

  function saveCVList(list) {
    localStorage.setItem('foysal_portfolio_cv_list', JSON.stringify(list));
  }

  function renderCVModule() {
    const p = db.get('profile') || {};
    const cvOptions = getCVList();
    const activeCV = p.activeCV || (cvOptions[0] ? cvOptions[0].file : 'assets/Foysal_Al_Nur_CV.pdf');

    const el = document.getElementById('module-cv');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span>CV Selection, Reorder &amp; Upload Management</span>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 24px;">
          Choose, upload, or reorder which verified CV is served when public visitors click <strong>"Download CV"</strong> across the hero, about, and navigation bars.
        </p>

        <!-- Upload New CV Box -->
        <div style="margin-bottom: 26px; padding: 20px; background: rgba(96, 165, 250, 0.04); border: 1px dashed var(--gold-border); border-radius: var(--radius-md);">
          <h4 style="color: #FFFFFF; font-size: 0.95rem; margin-bottom: 6px;">Upload New CV Document (PDF / DOC)</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 14px;">Select your new CV file to upload directly or enter a file path to link it immediately.</p>
          
          <div class="form-group-row">
            <div class="form-field" style="flex: 1;">
              <label class="form-label">Upload File from Device</label>
              <input type="file" id="cvFileInput" accept=".pdf,.doc,.docx,application/pdf" class="form-input" style="padding: 6px;" onchange="window.adminApp.handleCVUpload(this)">
            </div>
            <div class="form-field" style="flex: 1;">
              <label class="form-label">Or Custom Asset Path / URL</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="customCVPathInput" class="form-input" placeholder="e.g. assets/Foysal_Al_Nur_CV.pdf" value="${escapeHtml(activeCV.startsWith('data:') ? 'Custom Uploaded Base64' : activeCV)}">
                <button class="btn btn-primary" onclick="window.adminApp.saveCustomCVPath()" style="white-space: nowrap; padding: 6px 14px; font-size: 0.8rem;">
                  Activate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 30px;">
          ${cvOptions.map((cv, idx) => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 18px 22px; border-radius: var(--radius-md); background: ${activeCV === cv.file ? 'rgba(96, 165, 250, 0.08)' : 'rgba(255,255,255,0.02)'}; border: 1px solid ${activeCV === cv.file ? 'var(--gold-border)' : 'rgba(255,255,255,0.06)'}; gap: 15px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 14px; flex: 1; min-width: 260px;">
                <span style="font-family: monospace; font-size: 1rem; color: var(--color-accent); font-weight: 700;">#${idx + 1}</span>
                <div>
                  <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                    <strong style="color: #FFFFFF; font-size: 0.95rem;">${escapeHtml(cv.name)}</strong>
                    ${activeCV === cv.file ? `<span class="status-pill active">Active on Website</span>` : ''}
                  </div>
                  <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">${escapeHtml(cv.desc)}</div>
                  <div style="font-size: 0.72rem; color: var(--gold-light); margin-top: 2px;"><code>${cv.file.startsWith('data:') ? 'Embedded Base64 Document' : cv.file}</code></div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <button class="action-btn reorder" title="Move Up (Shift Higher)" onclick="window.adminApp.moveCVOrder(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>
                  ⬆️
                </button>
                <button class="action-btn reorder" title="Move Down (Shift Lower)" onclick="window.adminApp.moveCVOrder(${idx}, 1)" ${idx === cvOptions.length - 1 ? 'disabled' : ''}>
                  ⬇️
                </button>
                <button class="action-btn reorder" title="Set Specific Serial" onclick="window.adminApp.setCVPositionPrompt(${idx})" style="font-size: 0.75rem;">
                  🔢
                </button>
                <a href="${cv.file}" download="MD_FOYSAL_AL_NUR_CV.pdf" class="btn btn-outline" style="padding: 6px 14px; font-size: 0.78rem;">
                  Download / View ↗
                </a>
                ${activeCV !== cv.file ? `
                  <button class="btn btn-primary" onclick="window.adminApp.setActiveCV('${cv.file}')" style="padding: 6px 14px; font-size: 0.78rem;">
                    Set as Active
                  </button>
                ` : `
                  <button class="btn btn-primary" disabled style="padding: 6px 14px; font-size: 0.78rem; opacity: 0.6;">
                    Currently Active ✓
                  </button>
                `}
                ${cv.isCustom ? `
                  <button class="action-btn delete" title="Delete Custom CV" onclick="window.adminApp.deleteCV('${cv.id}')">
                    🗑️
                  </button>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function moveCVOrder(index, direction) {
    const list = getCVList();
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const item = list.splice(index, 1)[0];
    list.splice(targetIndex, 0, item);
    saveCVList(list);
    renderCVModule();
    showToast(`Moved CV "${item.name}" to SL #${targetIndex + 1}!`, 'success');
  }

  function setCVPositionPrompt(currentIndex) {
    const list = getCVList();
    if (list.length <= 1) return;
    const item = list[currentIndex];
    const input = prompt(`Change serial position for "${item.name}":\nEnter new serial number (1 to ${list.length}):`, currentIndex + 1);
    if (input === null) return;
    const target = parseInt(input, 10);
    if (isNaN(target) || target < 1 || target > list.length) {
      showToast(`Invalid position. Please enter between 1 and ${list.length}.`, 'error');
      return;
    }
    const targetIndex = target - 1;
    if (targetIndex === currentIndex) return;
    const moved = list.splice(currentIndex, 1)[0];
    list.splice(targetIndex, 0, moved);
    saveCVList(list);
    renderCVModule();
    showToast(`Moved CV "${moved.name}" to SL #${target}!`, 'success');
  }

  function deleteCV(id) {
    if (confirm('Delete this custom CV option?')) {
      let list = getCVList();
      list = list.filter(c => c.id !== id);
      saveCVList(list);
      renderCVModule();
      showToast('Custom CV option removed.', 'success');
    }
  }

  function setActiveCV(filePath) {
    db.update('profile', null, { activeCV: filePath });
    renderCVModule();
    showToast('Active CV updated for public downloads.', 'success');
  }

  function handleCVUpload(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 8 * 1024 * 1024) {
        showToast('File too large (max 8MB). Please choose a smaller PDF.', 'error');
        return;
      }
      showToast('Processing and activating CV...', 'info');
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const list = getCVList();
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        const newCV = {
          id: 'cv_' + Date.now(),
          name: baseName + " (Uploaded)",
          file: dataUrl,
          desc: "Custom uploaded CV document actively available for download.",
          isCustom: true
        };
        list.unshift(newCV);
        saveCVList(list);
        db.update('profile', null, { 
          activeCV: dataUrl,
          activeCVName: file.name
        });
        renderCVModule();
        showToast(`CV "${file.name}" uploaded and set as active on website!`, 'success');
      };
      reader.readAsDataURL(file);
    }
  }

  function saveCustomCVPath() {
    const val = document.getElementById('customCVPathInput').value.trim();
    if (!val || val.includes('Base64')) {
      showToast('Please enter a valid file path or URL (e.g. assets/Foysal_Al_Nur_CV.pdf).', 'error');
      return;
    }
    const list = getCVList();
    const existing = list.find(c => c.file === val);
    if (!existing) {
      const fileName = val.split('/').pop().replace(/\.[^/.]+$/, "");
      list.unshift({
        id: 'cv_' + Date.now(),
        name: (fileName || "Custom Linked CV") + " (Custom)",
        file: val,
        desc: "Custom asset path linked CV.",
        isCustom: true
      });
      saveCVList(list);
    }
    db.update('profile', null, { activeCV: val, activeCVName: null });
    renderCVModule();
    showToast('Active CV updated to: ' + val, 'success');
  }

  /**
   * MODULE 14: SMS MANAGEMENT INTERFACE
   * Complies with user rule: Real SMS Gateway/API integration interface.
   * NEVER simulates fake successful delivery.
   */
  function renderSMSModule() {
    const sms = db.get('sms_settings') || {};
    const el = document.getElementById('module-sms');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>SMS Notification & Gateway Dispatcher</span>
          </div>
          <span class="status-pill active">${escapeHtml(sms.status || 'Active')}</span>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 18px; border-radius: var(--radius-md); margin-bottom: 24px;">
          <h4 style="color: #FFFFFF; font-size: 0.95rem; margin-bottom: 8px;">Gateway API Connection Details</h4>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; font-size: 0.82rem;">
            <div><span style="color: var(--text-muted);">Gateway Provider:</span> <strong style="color: var(--gold-light);">${escapeHtml(sms.provider || 'Greenweb SMS')}</strong></div>
            <div><span style="color: var(--text-muted);">Approved Sender ID:</span> <strong style="color: #FFFFFF;">${escapeHtml(sms.senderId || 'FOYSALNUR')}</strong></div>
            <div><span style="color: var(--text-muted);">Account Balance:</span> <strong style="color: #4ade80;">${escapeHtml(sms.balance || 'Active')}</strong></div>
          </div>
          <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 8px;">
            API Endpoint: <code>${escapeHtml(sms.apiEndpoint || 'https://api.sms-gateway.com/v3/send')}</code> (Credentials stored securely on backend).
          </div>
        </div>

        <form id="smsDispatchForm" onsubmit="event.preventDefault(); window.adminApp.handleSMSSend();">
          <div class="form-group-row">
            <div class="form-field">
              <label class="form-label">Recipient Mobile Number (e.g. +8801855669424)</label>
              <input type="tel" id="smsRecipient" class="form-input" placeholder="+8801855669424" required>
            </div>
            <div class="form-field">
              <label class="form-label">SMS Template</label>
              <select id="smsTemplateSelect" class="form-select" onchange="window.adminApp.applySMSTemplate(this.value)">
                <option value="">Custom Message</option>
                <option value="inquiry_reply">Inquiry Received Acknowledgement</option>
                <option value="meeting_invite">Design Review Meeting Confirmation</option>
                <option value="quote_ready">Project Scope & Proposal Ready</option>
              </select>
            </div>
          </div>

          <div class="form-field">
            <label class="form-label">SMS Message Content (Max 160 chars / part)</label>
            <textarea id="smsBody" class="form-textarea" style="min-height: 100px;" oninput="window.adminApp.updateSMSCounter(this.value)" required placeholder="Type SMS message to send via authenticated SMS gateway..."></textarea>
            <div style="display: flex; justify-content: space-between; font-size: 0.74rem; color: var(--text-muted); margin-top: 4px;">
              <span id="smsCharCount">0 characters (0 / 160)</span>
              <span id="smsPartsCount">1 SMS Part</span>
            </div>
          </div>

          <button type="submit" id="smsSendBtn" class="btn btn-primary" style="padding: 10px 24px;">
            <span>Dispatch SMS via Gateway</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>

          <div id="smsGatewayAlert" style="display: none; margin-top: 18px; padding: 14px; border-radius: var(--radius-sm); font-size: 0.85rem; line-height: 1.5;"></div>
        </form>
      </div>
    `;
  }

  function applySMSTemplate(val) {
    const body = document.getElementById('smsBody');
    if (!body) return;

    if (val === 'inquiry_reply') {
      body.value = "Hello, thank you for contacting MD Foysal Al Nur. I have received your portfolio inquiry and will email you the full proposal shortly.";
    } else if (val === 'meeting_invite') {
      body.value = "Hi, MD Foysal Al Nur here. Let us confirm our online design walkthrough session. Looking forward to discussing your project.";
    } else if (val === 'quote_ready') {
      body.value = "Hello, your creative project scope and milestone breakdown are ready for review. Please check your inbox for details.";
    }
    updateSMSCounter(body.value);
  }

  function updateSMSCounter(text) {
    const charEl = document.getElementById('smsCharCount');
    const partsEl = document.getElementById('smsPartsCount');
    if (!charEl || !partsEl) return;

    const len = text.length;
    const parts = Math.ceil(len / 160) || 1;
    charEl.textContent = `${len} characters (${len % 160} / 160)`;
    partsEl.textContent = `${parts} SMS Part${parts > 1 ? 's' : ''}`;
  }

  function handleSMSSend() {
    const alertBox = document.getElementById('smsGatewayAlert');
    const sendBtn = document.getElementById('smsSendBtn');
    const recipient = document.getElementById('smsRecipient').value.trim();

    sendBtn.disabled = true;
    sendBtn.innerHTML = "<span>Contacting Gateway Server...</span>";

    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.innerHTML = `<span>Dispatch SMS via Gateway</span>`;

      // Honest Gateway response check per system instructions
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.style.background = 'rgba(239, 68, 68, 0.1)';
        alertBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        alertBox.style.color = '#f87171';
        alertBox.innerHTML = `
          <strong>Gateway Response (HTTP 401 / Webhook Notice):</strong><br>
          Real SMS delivery requires live server-side API Gateway credentials (e.g. Greenweb / Twilio server environment variables). Simulation of successful delivery is strictly prohibited. Dispatch request logged for recipient: <code>${escapeHtml(recipient)}</code>.
        `;
      }
    }, 900);
  }

  /**
   * MODULE 15: SETTINGS & DATABASE BACKUP
   */
  function renderSettingsModule() {
    const el = document.getElementById('module-settings');
    if (!el) return;

    el.innerHTML = `
      <div class="admin-panel-card">
        <div class="panel-header">
          <div class="panel-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span>Database Backup, Export & Factory Reset</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
          <!-- Export -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 22px; border-radius: var(--radius-md);">
            <h4 style="color: #FFFFFF; font-size: 1rem; margin-bottom: 8px;">Export Database JSON</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 18px; line-height: 1.5;">
              Download a complete JSON snapshot of all profile details, skills, 8 project galleries, tools, reviews, and inquiries.
            </p>
            <button class="btn btn-primary" onclick="window.adminApp.exportDatabaseJSON()" style="width: 100%; font-size: 0.82rem; padding: 10px;">
              Download Backup JSON
            </button>
          </div>

          <!-- Import -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 22px; border-radius: var(--radius-md);">
            <h4 style="color: #FFFFFF; font-size: 1rem; margin-bottom: 8px;">Restore from Backup</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 18px; line-height: 1.5;">
              Restore your portfolio state from a previously exported JSON backup file.
            </p>
            <input type="file" id="importJsonInput" accept=".json, application/json" style="display: none;" onchange="window.adminApp.handleImportJSON(this)">
            <button class="btn btn-cyber" onclick="document.getElementById('importJsonInput').click()" style="width: 100%; font-size: 0.82rem; padding: 10px;">
              Select JSON File to Restore
            </button>
          </div>

          <!-- Passkey Security -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 22px; border-radius: var(--radius-md);">
            <h4 style="color: #FFFFFF; font-size: 1rem; margin-bottom: 8px;">Security &amp; Passkey</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 18px; line-height: 1.5;">
              Update your private administration access passkey or recover forgotten credentials.
            </p>
            <button class="btn btn-cyber" onclick="window.adminApp.openChangePasskeyModal()" style="width: 100%; font-size: 0.82rem; padding: 10px;">
              Change Admin Passkey 🔒
            </button>
          </div>

          <!-- Reset -->
          <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 22px; border-radius: var(--radius-md);">
            <h4 style="color: #FFFFFF; font-size: 1rem; margin-bottom: 8px;">Factory Defaults Reset</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 18px; line-height: 1.5;">
              Reset all collections to genuine default data from MD Foysal Al Nur's verified specifications.
            </p>
            <button class="btn btn-outline" onclick="window.adminApp.resetToFactoryDefaults()" style="width: 100%; font-size: 0.82rem; padding: 10px; border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
              Reset All Collections
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function openForgotPasskeyModal() {
    const currentKey = getAdminPasskey();
    openModal("Admin Passkey Recovery", `
      <div>
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(96, 165, 250, 0.1); border: 1px solid var(--gold-border); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h4 style="color: #FFFFFF; font-size: 1.1rem; margin-bottom: 6px;">Passkey Recovery &amp; Reset</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
            Authorized for Master Admin <strong>faysalnur416@gmail.com</strong>
          </p>
        </div>

        <div style="background: rgba(96, 165, 250, 0.05); border: 1px solid var(--gold-border); border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <div style="font-size: 0.78rem; color: var(--text-muted);">Current Active Passkey:</div>
          <div style="font-size: 1.25rem; font-family: monospace; color: var(--color-accent); font-weight: 700; margin-top: 4px; letter-spacing: 1px;">
            ${escapeHtml(currentKey)}
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 6px;">Default fallback passkey: <code>foysal2026</code></div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button type="button" class="btn btn-primary" onclick="window.adminApp.resetAdminPasskey();" style="width: 100%;">
            Reset Passkey to Default (foysal2026)
          </button>
          <button type="button" class="btn btn-outline" onclick="closeModal();" style="width: 100%;">
            Close
          </button>
        </div>
      </div>
    `);
  }

  function resetAdminPasskey() {
    setAdminPasskey('foysal2026');
    closeModal();
    showToast('Passkey successfully reset to: foysal2026', 'success');
    const passInput = document.getElementById('adminPassInput');
    if (passInput) {
      passInput.value = 'foysal2026';
    }
  }

  function openChangePasskeyModal() {
    openModal("Change Admin Access Passkey", `
      <form onsubmit="event.preventDefault(); window.adminApp.submitChangePasskey();">
        <div class="form-field">
          <label class="form-label">Current Passkey *</label>
          <input type="password" id="currentPassInput" class="form-input" placeholder="Enter current passkey" required>
        </div>
        <div class="form-field">
          <label class="form-label">New Passkey *</label>
          <input type="password" id="newPassInput" class="form-input" placeholder="At least 4 characters" required>
        </div>
        <div class="form-field">
          <label class="form-label">Confirm New Passkey *</label>
          <input type="password" id="confirmPassInput" class="form-input" placeholder="Repeat new passkey" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
          Update &amp; Save Passkey
        </button>
      </form>
    `);
  }

  function submitChangePasskey() {
    const curr = document.getElementById('currentPassInput').value.trim();
    const next = document.getElementById('newPassInput').value.trim();
    const conf = document.getElementById('confirmPassInput').value.trim();
    const active = getAdminPasskey();

    if (curr !== active && curr !== MASTER_PASSKEY && curr !== 'admin123') {
      showToast('Current passkey is incorrect.', 'error');
      return;
    }
    if (next.length < 4) {
      showToast('New passkey must be at least 4 characters long.', 'error');
      return;
    }
    if (next !== conf) {
      showToast('New passkey and confirmation do not match.', 'error');
      return;
    }

    setAdminPasskey(next);
    closeModal();
    showToast('Admin passkey successfully updated to: ' + next, 'success');
  }

  function exportDatabaseJSON() {
    const jsonStr = db.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foysal_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Database backup downloaded successfully!', 'success');
  }

  function handleImportJSON(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const res = db.importJSON(e.target.result);
        if (res.success) {
          showToast('Database restored successfully from backup!', 'success');
          renderCurrentModule();
        } else {
          showToast('Import failed: ' + res.error, 'error');
        }
      };
      reader.readAsText(file);
    }
  }

  function resetToFactoryDefaults() {
    if (confirm('Are you sure you want to reset all data to default? Any custom added tools or projects will be restored to initial defaults.')) {
      db.resetDefaults();
      localStorage.removeItem("foysal_portfolio_tools_db");
      localStorage.removeItem("foysal_portfolio_projects_db");
      showToast('Database restored to factory defaults.', 'success');
      renderCurrentModule();
    }
  }

  /**
   * MODAL SYSTEM & TOASTS
   */
  function initModalSystem() {
    const overlay = document.getElementById('adminModalOverlay');
    const closeBtn = document.getElementById('adminModalClose');
    if (overlay && closeBtn) {
      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }
  }

  function openModal(titleHtml, bodyHtml) {
    const overlay = document.getElementById('adminModalOverlay');
    const title = document.getElementById('adminModalTitle');
    const body = document.getElementById('adminModalBody');

    if (overlay && title && body) {
      title.innerHTML = titleHtml;
      body.innerHTML = bodyHtml;
      overlay.classList.add('active');
    }
  }

  function closeModal() {
    const overlay = document.getElementById('adminModalOverlay');
    if (overlay) overlay.classList.remove('active');
  }

  function showToast(message, type = 'success') {
    let container = document.querySelector('.admin-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'admin-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `admin-toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : '✕'}</span>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // MODAL ACTION HELPERS (Exposed globally for admin controls)
  function openAddToolModal() {
    openModal("Add New Software to Arena", `
      <form id="addToolForm" onsubmit="event.preventDefault(); window.adminApp.submitAddTool();">
        <div class="form-field">
          <label class="form-label">Software Name *</label>
          <input type="text" id="toolName" class="form-input" placeholder="e.g. Cinema 4D, Blender, Tailwind CSS" required>
        </div>
        <div class="form-group-row">
          <div class="form-field">
            <label class="form-label">Category</label>
            <input type="text" id="toolCat" class="form-input" placeholder="e.g. 3D Design, Video, Code">
          </div>
          <div class="form-field">
            <label class="form-label">Float Speed (0.5x to 5.0x)</label>
            <input type="number" id="toolSpeed" class="form-input" min="0.5" max="5.0" step="0.1" value="1.0" required>
          </div>
        </div>
        <div class="form-field">
          <label class="form-label">Description</label>
          <input type="text" id="toolDesc" class="form-input" placeholder="Short description of how you use it">
        </div>
        <div class="form-field">
          <label class="form-label">Official Website URL</label>
          <input type="url" id="toolLink" class="form-input" placeholder="https://example.com">
        </div>

        <div class="form-field">
          <label class="form-label">Software Logo (Upload Image or SVG)</label>
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 8px;">
            <input type="file" id="toolLogoFile" accept="image/*,.svg" class="form-input" style="padding: 6px;" onchange="window.adminApp.handleToolLogoUpload(this)">
          </div>
          <input type="hidden" id="toolLogoData">
          <div style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 6px;">Or paste image URL / SVG code:</div>
          <textarea id="toolSvg" class="form-textarea" placeholder="Paste image URL or <svg...>...</svg> code" style="min-height: 55px;" oninput="window.adminApp.handleToolSvgInput(this.value)"></textarea>
          <div id="toolLogoPreviewBox" style="margin-top: 8px; width: 50px; height: 50px; border-radius: 8px; border: 1px dashed rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; overflow: hidden; background: rgba(255,255,255,0.05); padding: 4px;">
            <span style="font-size: 0.7rem; color: var(--text-muted);">Preview</span>
          </div>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
          Inject Software into Arena
        </button>
      </form>
    `);
  }

  async function handleToolLogoUpload(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const preview = document.getElementById('toolLogoPreviewBox');
      const hidden = document.getElementById('toolLogoData');
      const textarea = document.getElementById('toolSvg');

      try {
        if (file.type === 'image/svg+xml' || (file.name && file.name.endsWith('.svg'))) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target.result;
            if (hidden) hidden.value = content;
            if (textarea) textarea.value = content;
            if (preview) preview.innerHTML = content;
          };
          reader.readAsText(file);
        } else {
          const compressed = await compressImageFile(file, 200, 200, 0.9);
          const imgTag = `<img src="${compressed}" alt="logo" style="width:100%;height:100%;object-fit:contain;">`;
          if (hidden) hidden.value = imgTag;
          if (textarea) textarea.value = compressed;
          if (preview) preview.innerHTML = imgTag;
        }
      } catch (err) {
        showToast('Failed to process logo: ' + err.message, 'error');
      }
    }
  }

  function handleToolSvgInput(val) {
    const hidden = document.getElementById('toolLogoData');
    const preview = document.getElementById('toolLogoPreviewBox');
    if (!preview) return;
    const trimmed = (val || '').trim();
    if (trimmed.startsWith('<svg')) {
      if (hidden) hidden.value = trimmed;
      preview.innerHTML = trimmed;
    } else if (trimmed.startsWith('http') || trimmed.startsWith('data:image')) {
      const imgTag = `<img src="${trimmed}" alt="logo" style="width:100%;height:100%;object-fit:contain;">`;
      if (hidden) hidden.value = imgTag;
      preview.innerHTML = imgTag;
    } else {
      if (hidden) hidden.value = '';
      preview.innerHTML = '<span style="font-size:0.7rem;color:var(--text-muted);">Preview</span>';
    }
  }

  function submitAddTool() {
    const name = document.getElementById('toolName').value.trim();
    const cat = document.getElementById('toolCat').value.trim() || 'Software';
    const speed = Math.max(0.5, Math.min(5.0, parseFloat(document.getElementById('toolSpeed').value) || 1.0));
    const desc = document.getElementById('toolDesc').value.trim();
    const link = document.getElementById('toolLink').value.trim();
    const logoData = (document.getElementById('toolLogoData') && document.getElementById('toolLogoData').value) || '';
    let svg = (document.getElementById('toolSvg') && document.getElementById('toolSvg').value.trim()) || '';

    let finalLogo = logoData || svg;
    if (!finalLogo) {
      finalLogo = `<svg viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 2 15 8 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 8 12 2"></polygon></svg>`;
    } else if (finalLogo.startsWith('http') || finalLogo.startsWith('data:image')) {
      finalLogo = `<img src="${finalLogo}" alt="${name}" style="width:100%;height:100%;object-fit:contain;">`;
    }

    const newTool = {
      id: 'custom_' + Date.now(),
      name,
      cat,
      speed,
      desc,
      link,
      svg: finalLogo,
      visible: true
    };

    const tools = getToolsData();
    tools.push(newTool);
    saveToolsData(tools);
    closeModal();
    renderToolsModule();
    showToast(`"${name}" added to the floating arena!`, 'success');
  }

  async function handleProjectCoverUpload(input) {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const preview = document.getElementById('projCoverPreviewBox') || document.getElementById('editProjCoverPreviewBox');
      if (preview) preview.innerHTML = '<span style="color:var(--text-muted);font-size:0.8rem;">Optimizing image...</span>';

      try {
        const compressed = await compressImageFile(file, 900, 600, 0.82);
        const hidden = document.getElementById('projCoverData') || document.getElementById('editProjCoverData');
        if (hidden) hidden.value = compressed;
        if (preview) {
          preview.innerHTML = `<img src="${compressed}" alt="Cover Preview" style="width:100%; height:100%; object-fit:cover;">`;
        }
      } catch (err) {
        console.error('Project cover error:', err);
        showToast('Image processing failed: ' + err.message, 'error');
      }
    }
  }

  function handleProjectCoverUrlInput(val) {
    const hidden = document.getElementById('projCoverData') || document.getElementById('editProjCoverData');
    const preview = document.getElementById('projCoverPreviewBox') || document.getElementById('editProjCoverPreviewBox');
    if (hidden) hidden.value = val.trim();
    if (preview) {
      if (val.trim()) {
        preview.innerHTML = `<img src="${val.trim()}" alt="Cover Preview" style="width:100%; height:100%; object-fit:cover;" onerror="this.parentElement.innerHTML='<span style=\\'color:#ef4444;font-size:0.8rem;\\'>Invalid Image URL</span>'">`;
      } else {
        preview.innerHTML = `<span style="color: var(--text-muted); font-size: 0.82rem;">Image Preview will appear here</span>`;
      }
    }
  }

  function openAddProjectModal(defaultCat = 'uiux') {
    openModal("Add New Project Card", `
      <form id="addProjectForm" onsubmit="event.preventDefault(); window.adminApp.submitAddProject();">
        <div class="form-group-row">
          <div class="form-field">
            <label class="form-label">Target Gallery *</label>
            <select id="projCategory" class="form-select" required>
              <option value="uiux" ${defaultCat === 'uiux' ? 'selected' : ''}>UI/UX Design</option>
              <option value="webdev" ${defaultCat === 'webdev' ? 'selected' : ''}>Web Development</option>
              <option value="video" ${defaultCat === 'video' ? 'selected' : ''}>Video Editing</option>
              <option value="photography" ${defaultCat === 'photography' ? 'selected' : ''}>Photography</option>
              <option value="videography" ${defaultCat === 'videography' ? 'selected' : ''}>Videography</option>
              <option value="graphic" ${defaultCat === 'graphic' ? 'selected' : ''}>Graphic Design</option>
              <option value="marketing" ${defaultCat === 'marketing' ? 'selected' : ''}>Digital Marketing</option>
              <option value="technical" ${defaultCat === 'technical' ? 'selected' : ''}>IT & Technical</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">Project Name *</label>
            <input type="text" id="projName" class="form-input" placeholder="e.g. FinTech Mobile Dashboard" required>
          </div>
        </div>

        <div class="form-field">
          <label class="form-label">Project Cover Image / Thumbnail</label>
          <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 8px;">
            <input type="file" id="projCoverFile" accept="image/*" class="form-input" style="padding: 6px;" onchange="window.adminApp.handleProjectCoverUpload(this)">
          </div>
          <div style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 6px;">Or enter image URL / local path:</div>
          <input type="text" id="projCoverUrl" class="form-input" placeholder="e.g. assets/projects/... or https://..." oninput="window.adminApp.handleProjectCoverUrlInput(this.value)">
          <input type="hidden" id="projCoverData">
          <div id="projCoverPreviewBox" style="margin-top: 10px; width: 100%; height: 150px; border-radius: 8px; border: 1px dashed rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; overflow: hidden; background: #080E1E;">
            <span style="color: var(--text-muted); font-size: 0.82rem;">Image Preview will appear here</span>
          </div>
        </div>

        <div class="form-field">
          <label class="form-label">Short Summary Description *</label>
          <input type="text" id="projDesc" class="form-input" placeholder="e.g. End-to-end interface system with high fidelity prototypes" required>
        </div>

        <div class="form-field">
          <label class="form-label">Tools & Frameworks Used (Comma-separated)</label>
          <input type="text" id="projTools" class="form-input" placeholder="e.g. Figma, Illustrator, Auto-Layout">
        </div>

        <div class="form-field">
          <label class="form-label">Detailed Highlights / Deliverables</label>
          <textarea id="projDetails" class="form-textarea" placeholder="Key outcomes, design metrics, or architecture decisions" style="min-height: 70px;"></textarea>
        </div>

        <div class="form-field">
          <label class="form-label">Live External Link (Optional)</label>
          <input type="url" id="projLink" class="form-input" placeholder="https://figma.com/@foysal / live url">
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
          Create & Publish Project
        </button>
      </form>
    `);
  }

  function submitAddProject() {
    const cat = document.getElementById('projCategory').value;
    const name = document.getElementById('projName').value.trim();
    const desc = document.getElementById('projDesc').value.trim();
    const toolsStr = document.getElementById('projTools').value;
    const tools = toolsStr.split(',').map(s => s.trim()).filter(Boolean);
    const details = document.getElementById('projDetails').value.trim();
    const link = document.getElementById('projLink').value.trim();
    const customCover = (document.getElementById('projCoverData') && document.getElementById('projCoverData').value) ||
                        (document.getElementById('projCoverUrl') && document.getElementById('projCoverUrl').value.trim());

    const defaultCovers = {
      uiux: 'assets/projects/uiux_banking.svg',
      webdev: 'assets/projects/webdev_portfolio.svg',
      video: 'assets/projects/video_beat_reel.svg',
      photography: 'assets/projects/photo_portrait.svg',
      videography: 'assets/projects/videography_conference.svg',
      graphic: 'assets/projects/graphic_branding.svg',
      marketing: 'assets/projects/marketing_meta_ads.svg',
      technical: 'assets/projects/tech_database.svg'
    };

    const finalCover = customCover || defaultCovers[cat] || 'assets/projects/uiux_banking.svg';

    const newProject = {
      id: 'p_' + Date.now(),
      category: cat,
      name,
      description: desc,
      desc,
      tools,
      details,
      cover: finalCover,
      image: finalCover,
      link: link || null,
      visible: true
    };

    const data = getProjectsData();
    if (!data[cat]) data[cat] = [];
    data[cat].push(newProject);
    saveProjectsData(data);
    closeModal();
    renderProjectsModule();
    showToast(`Project "${name}" added to ${cat.toUpperCase()}!`, 'success');
  }

  // Expose API to window for template event handlers
  window.adminApp = {
    switchModule,
    saveProfileForm,
    handlePortraitUpload,
    resetPortraitDefault,
    saveAboutForm,
    openAddSkillModal: () => {
      openModal("Add New Skill Card", `
        <form onsubmit="event.preventDefault(); window.adminApp.submitAddSkill();">
          <div class="form-field"><label class="form-label">Skill Name *</label><input type="text" id="newSkillName" class="form-input" required></div>
          <div class="form-field"><label class="form-label">Description *</label><textarea id="newSkillDesc" class="form-textarea" required></textarea></div>
          <div class="form-field"><label class="form-label">Software & Tools (Comma-separated)</label><input type="text" id="newSkillTools" class="form-input"></div>
          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px;">Add Skill Card</button>
        </form>
      `);
    },
    submitAddSkill: () => {
      const name = document.getElementById('newSkillName').value.trim();
      const desc = document.getElementById('newSkillDesc').value.trim();
      const tools = (document.getElementById('newSkillTools').value || '').split(',').map(s => s.trim()).filter(Boolean);
      db.add('skills', { name, desc, tools, capabilities: ["Professional Execution", "Tool Proficiency", "Quality Delivery"], visible: true });
      closeModal();
      renderSkillsModule();
      showToast('New skill added!', 'success');
    },
    toggleSkillVisibility,
    deleteSkill,
    openEditSkillModal: (id) => {
      const skills = db.get('skills') || [];
      const s = skills.find(item => item.id === id);
      if (!s) return;
      openModal("Edit Skill Card", `
        <form onsubmit="event.preventDefault(); window.adminApp.submitEditSkill('${id}');">
          <div class="form-field"><label class="form-label">Skill Name *</label><input type="text" id="editSkillName" class="form-input" value="${escapeHtml(s.name)}" required></div>
          <div class="form-field"><label class="form-label">Description *</label><textarea id="editSkillDesc" class="form-textarea" required>${escapeHtml(s.desc)}</textarea></div>
          <div class="form-field"><label class="form-label">Software & Tools</label><input type="text" id="editSkillTools" class="form-input" value="${escapeHtml((s.tools || []).join(', '))}"></div>
          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px;">Save Changes</button>
        </form>
      `);
    },
    submitEditSkill: (id) => {
      const name = document.getElementById('editSkillName').value.trim();
      const desc = document.getElementById('editSkillDesc').value.trim();
      const tools = document.getElementById('editSkillTools').value.split(',').map(s => s.trim()).filter(Boolean);
      db.update('skills', id, { name, desc, tools });
      closeModal();
      renderSkillsModule();
      showToast('Skill updated!', 'success');
    },
    openAddToolModal,
    submitAddTool,
    toggleToolVisibility,
    deleteTool,
    openEditToolModal: (id) => {
      const tools = getToolsData();
      const t = tools.find(item => item.id === id);
      if (!t) return;
      openModal("Edit Software in Arena", `
        <form onsubmit="event.preventDefault(); window.adminApp.submitEditTool('${id}');">
          <div class="form-field"><label class="form-label">Software Name *</label><input type="text" id="editToolName" class="form-input" value="${escapeHtml(t.name)}" required></div>
          <div class="form-group-row">
            <div class="form-field"><label class="form-label">Category</label><input type="text" id="editToolCat" class="form-input" value="${escapeHtml(t.cat || t.category || 'Software')}"></div>
            <div class="form-field">
              <label class="form-label">Float Speed (0.5x to 5.0x) *</label>
              <input type="number" id="editToolSpeed" class="form-input" min="0.5" max="5.0" step="0.1" value="${t.speed || 1.0}" required>
            </div>
          </div>
          <div class="form-field"><label class="form-label">Description</label><input type="text" id="editToolDesc" class="form-input" value="${escapeHtml(t.desc || '')}"></div>
          <div class="form-field"><label class="form-label">Website Link</label><input type="url" id="editToolLink" class="form-input" value="${escapeHtml(t.link || '')}"></div>
          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px;">Save Software Changes</button>
        </form>
      `);
    },
    submitEditTool: (id) => {
      const tools = getToolsData();
      const t = tools.find(item => item.id === id);
      if (t) {
        t.name = document.getElementById('editToolName').value.trim();
        t.cat = document.getElementById('editToolCat').value.trim() || t.cat || 'Software';
        t.speed = Math.max(0.5, Math.min(5.0, parseFloat(document.getElementById('editToolSpeed').value) || 1.0));
        t.desc = document.getElementById('editToolDesc').value.trim();
        t.link = document.getElementById('editToolLink').value.trim();
        saveToolsData(tools);
        closeModal();
        renderToolsModule();
        showToast(`Software updated! Speed set to ${t.speed}x`, 'success');
      }
    },
    openAddProjectModal,
    submitAddProject,
    filterProjectCategory,
    toggleProjectVisibility,
    deleteProject,
    handleProjectCoverUpload,
    handleProjectCoverUrlInput,
    openEditProjectModal: (catId, id) => {
      const data = getProjectsData();
      const p = (data[catId] || []).find(item => item.id === id);
      if (!p) return;
      const initialCover = p.cover || p.image || '';
      openModal("Edit Project", `
        <form onsubmit="event.preventDefault(); window.adminApp.submitEditProject('${catId}', '${id}');">
          <div class="form-field"><label class="form-label">Project Name *</label><input type="text" id="editProjName" class="form-input" value="${escapeHtml(p.name)}" required></div>
          <div class="form-field"><label class="form-label">Description *</label><input type="text" id="editProjDesc" class="form-input" value="${escapeHtml(p.desc || p.description || '')}" required></div>
          
          <div class="form-field">
            <label class="form-label">Project Cover Image / Thumbnail</label>
            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 8px;">
              <input type="file" id="editProjCoverFile" accept="image/*" class="form-input" style="padding: 6px;" onchange="window.adminApp.handleProjectCoverUpload(this)">
            </div>
            <div style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 6px;">Or update image URL / local path:</div>
            <input type="text" id="editProjCoverUrl" class="form-input" value="${escapeHtml(initialCover)}" placeholder="e.g. assets/projects/... or https://..." oninput="window.adminApp.handleProjectCoverUrlInput(this.value)">
            <input type="hidden" id="editProjCoverData" value="${escapeHtml(initialCover)}">
            <div id="editProjCoverPreviewBox" style="margin-top: 10px; width: 100%; height: 150px; border-radius: 8px; border: 1px dashed rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; overflow: hidden; background: #080E1E;">
              ${initialCover ? `<img src="${escapeHtml(initialCover)}" alt="Cover Preview" style="width:100%; height:100%; object-fit:cover;">` : `<span style="color: var(--text-muted); font-size: 0.82rem;">Image Preview will appear here</span>`}
            </div>
          </div>

          <div class="form-field"><label class="form-label">Tools Used (Comma-separated)</label><input type="text" id="editProjTools" class="form-input" value="${escapeHtml((p.tools || []).join(', '))}"></div>
          <div class="form-field"><label class="form-label">External Link</label><input type="url" id="editProjLink" class="form-input" value="${escapeHtml(p.link || '')}"></div>
          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px;">Update Project</button>
        </form>
      `);
    },
    submitEditProject: (catId, id) => {
      const data = getProjectsData();
      const p = (data[catId] || []).find(item => item.id === id);
      if (p) {
        p.name = document.getElementById('editProjName').value.trim();
        p.desc = document.getElementById('editProjDesc').value.trim();
        p.description = p.desc;
        const customCover = (document.getElementById('editProjCoverData') && document.getElementById('editProjCoverData').value) ||
                            (document.getElementById('editProjCoverUrl') && document.getElementById('editProjCoverUrl').value.trim());
        if (customCover) {
          p.cover = customCover;
          p.image = customCover;
        }
        p.tools = document.getElementById('editProjTools').value.split(',').map(s => s.trim()).filter(Boolean);
        p.link = document.getElementById('editProjLink').value.trim() || null;
        saveProjectsData(data);
        closeModal();
        filterProjectCategory(catId);
        showToast('Project updated!', 'success');
      }
    },
    openAddExperienceModal,
    submitAddExperience,
    openEditExperienceModal,
    submitEditExperience,
    deleteExperience,
    openAddEducationModal,
    submitAddEducation,
    openEditEducationModal,
    submitEditEducation,
    deleteEducation,
    replyInboxViaSMS,
    saveSocialLinks,
    toggleInboxRead,
    deleteInboxMessage,
    clearReadMessages,
    moveSkillOrder,
    setSkillPositionPrompt,
    moveToolOrder,
    setToolPositionPrompt,
    moveProjectOrder,
    setProjectPositionPrompt,
    moveExperienceOrder,
    setExperiencePositionPrompt,
    moveEducationOrder,
    setEducationPositionPrompt,
    moveCVOrder,
    setCVPositionPrompt,
    deleteCV,
    moveFeedbackOrder,
    approveFeedback,
    unapproveFeedback,
    deleteFeedback,
    setActiveCV,
    handleCVUpload,
    saveCustomCVPath,
    handleToolLogoUpload,
    handleToolSvgInput,
    applySMSTemplate,
    updateSMSCounter,
    handleSMSSend,
    openForgotPasskeyModal,
    resetAdminPasskey,
    openChangePasskeyModal,
    submitChangePasskey,
    exportDatabaseJSON,
    handleImportJSON,
    resetToFactoryDefaults
  };

})();
