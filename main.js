/**
 * MD FOYSAL AL NUR - Portfolio Main JavaScript
 * Senior UI/UX & Frontend Architecture Interaction Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  syncAllFromDB();
  initAmbientBackground();
  initNavbar();
  initTypewriter();
  initSkillsToggle();
  initProjectGalleries();
  initContactForm();
  initFeedbackSystem();
  initSmoothScroll();
});

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Dynamic Content Sync from Database (Phase 14 & Multi-Tab Admin Reactive Sync)
 * Keeps public pages fully synced in real-time with private Admin Dashboard updates
 */
function syncProfileFromDB() {
  if (!window.PortfolioDB) return;
  const p = window.PortfolioDB.get('profile');
  if (!p) return;

  if (p.name) {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
      const parts = p.name.trim().split(/\s+/);
      if (parts.length > 1) {
        const last = parts.pop();
        const first = parts.join(' ');
        heroName.innerHTML = `${escapeHtml(first)} <br><span class="gold-highlight text-shimmer">${escapeHtml(last)}</span>`;
      } else {
        heroName.textContent = p.name;
      }
    }
    document.querySelectorAll('.admin-profile-name').forEach(el => {
      el.textContent = p.name;
    });
    const footerName = document.querySelector('.footer-brand-name');
    if (footerName) footerName.textContent = p.name;
  }
  if (p.brandName) {
    document.querySelectorAll('.brand-name').forEach(el => {
      el.textContent = p.brandName;
    });
  }
  if (p.heroIntro) {
    const heroIntroEl = document.querySelector('.hero-description');
    if (heroIntroEl) heroIntroEl.textContent = p.heroIntro;
  }
  if (p.tagline) {
    const taglineEl = document.querySelector('.footer-tagline');
    if (taglineEl) taglineEl.textContent = p.tagline;
  }
  if (p.email) {
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      a.href = `mailto:${p.email}`;
      if (a.textContent.includes('@')) a.textContent = p.email;
    });
    const emailInfo = document.querySelector('#contactEmailValue');
    if (emailInfo) emailInfo.textContent = p.email;
  }
  if (p.phone) {
    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
      a.href = `tel:${p.phone.replace(/\s+/g, '')}`;
      if (a.textContent.match(/\+?\d[\d\s\-]+/)) a.textContent = p.phoneFormatted || p.phone;
    });
    const phoneInfo = document.querySelector('#contactPhoneValue');
    if (phoneInfo) phoneInfo.textContent = p.phoneFormatted || p.phone;
  }
  // Dynamic CV Syncing from Profile and Reordered CV List
  const cvStored = localStorage.getItem('foysal_portfolio_cv_list');
  let cvList = null;
  if (cvStored) {
    try { cvList = JSON.parse(cvStored); } catch(e) {}
  }
  
  const heroCvBtn = document.querySelector('.hero-cta-group a[download]');
  if (heroCvBtn) {
    if (p.activeCV) {
      heroCvBtn.setAttribute('href', p.activeCV);
      if (p.activeCVName) heroCvBtn.setAttribute('download', p.activeCVName);
    } else if (cvList && cvList[0]) {
      heroCvBtn.setAttribute('href', cvList[0].file);
      heroCvBtn.setAttribute('download', cvList[0].name.replace(/\s+/g, '_') + '.pdf');
    }
  }

  const aboutActions = document.querySelector('.about-actions');
  if (aboutActions && Array.isArray(cvList) && cvList.length > 0) {
    const btnStyles = ['btn-primary', 'btn-cyber', 'btn-outline', 'btn-outline'];
    aboutActions.innerHTML = cvList.slice(0, 4).map((cv, idx) => {
      const isPrimary = (p.activeCV && p.activeCV === cv.file) || (!p.activeCV && idx === 0);
      const styleClass = isPrimary ? 'btn-primary' : (btnStyles[idx] || 'btn-outline');
      return `
        <a href="${cv.file}" target="_blank" class="btn ${styleClass}" download="${cv.name.replace(/\s+/g, '_')}.pdf">
          ${idx === 0 ? `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          ` : ''}
          <span>${escapeHtml(cv.name.length > 26 ? cv.name.slice(0, 24) + '...' : cv.name)}</span>
        </a>
      `;
    }).join('');
  } else if (p.activeCV) {
    document.querySelectorAll('a[download]').forEach(a => {
      a.setAttribute('href', p.activeCV);
    });
  }
  if (p.portraitImage) {
    const heroImg = document.querySelector('.hero-portrait-img');
    if (heroImg) {
      heroImg.src = p.portraitImage;
    }
  }
}

function syncAboutFromDB() {
  if (!window.PortfolioDB) return;
  const a = window.PortfolioDB.get('about');
  if (!a) return;

  if (a.heading) {
    const headingEl = document.querySelector('#about .section-title');
    if (headingEl) {
      const parts = a.heading.split('.');
      if (parts.length > 1) {
        headingEl.innerHTML = `${escapeHtml(parts[0].trim())}. <span class="text-gold">${escapeHtml(parts.slice(1).join('.').trim())}</span>`;
      } else {
        headingEl.textContent = a.heading;
      }
    }
  }
  if (a.intro) {
    const introEl = document.querySelector('.about-lead');
    if (introEl) {
      introEl.textContent = a.intro;
    }
  }
  if (a.journey && Array.isArray(a.journey)) {
    const journeyContainer = document.querySelector('.journey-pills');
    if (journeyContainer) {
      journeyContainer.innerHTML = a.journey.map((item, idx) => `
        <span class="journey-pill">${escapeHtml(item)}</span>
        ${idx < a.journey.length - 1 ? '<span class="journey-sep">•</span>' : ''}
      `).join('');
    }
  }
  if (a.strengths && Array.isArray(a.strengths)) {
    const strengthsContainer = document.querySelector('.strengths-grid');
    if (strengthsContainer) {
      strengthsContainer.innerHTML = a.strengths.map((str, idx) => `
        <div class="strength-card">
          <div class="strength-number">0${idx + 1}</div>
          <h4 class="strength-title">${escapeHtml(str.title)}</h4>
          <p class="strength-desc">${escapeHtml(str.desc)}</p>
        </div>
      `).join('');
    }
  }
}

function syncSkillsFromDB() {
  if (!window.PortfolioDB) return;
  const skills = window.PortfolioDB.get('skills');
  if (!Array.isArray(skills) || skills.length === 0) return;

  const primaryGrid = document.getElementById('primarySkillsGrid');
  const extendedGrid = document.getElementById('extendedSkills');
  if (!primaryGrid || !extendedGrid) return;

  const visibleSkills = skills.filter(s => s.visible !== false);
  const first6 = visibleSkills.slice(0, 6);
  const rest = visibleSkills.slice(6);

  const renderSkillCard = (s, idx) => `
    <div class="skill-card" id="skill_${s.id || idx}">
      <div class="skill-header">
        <div class="skill-icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
        </div>
        <span class="skill-index">${String(idx + 1).padStart(2, '0')}</span>
      </div>
      <h3 class="skill-title">${escapeHtml(s.name)}</h3>
      <p class="skill-desc">${escapeHtml(s.desc)}</p>
      ${(s.tools && s.tools.length) ? `
        <div class="skill-tools-used" style="margin-top: 14px;">
          <span style="font-size: 0.72rem; color: var(--gold-light); font-weight: 600; text-transform: uppercase;">Software &amp; Tools:</span>
          <div style="display: flex; gap: 5px; flex-wrap: wrap; margin-top: 6px;">
            ${s.tools.map(t => `<span class="edu-tag" style="font-size: 0.7rem;">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  primaryGrid.innerHTML = first6.map((s, i) => renderSkillCard(s, i)).join('');
  extendedGrid.innerHTML = rest.map((s, i) => renderSkillCard(s, i + 6)).join('');

  const toggleBtn = document.getElementById('toggleSkillsBtn');
  if (toggleBtn) {
    if (rest.length === 0) {
      toggleBtn.parentElement.style.display = 'none';
    } else {
      toggleBtn.parentElement.style.display = 'block';
      const toggleText = document.getElementById('skillsToggleText');
      if (toggleText && !extendedGrid.classList.contains('active')) {
        toggleText.textContent = `View All Skills (${rest.length} More)`;
      }
    }
  }
}

function syncSocialFromDB() {
  if (!window.PortfolioDB) return;
  const socials = window.PortfolioDB.get('social');
  if (!Array.isArray(socials) || socials.length === 0) return;

  socials.forEach(s => {
    const idKey = s.id ? (s.id.charAt(0).toUpperCase() + s.id.slice(1).toLowerCase()) : '';
    const platformKey = s.platform ? (s.platform.charAt(0).toUpperCase() + s.platform.slice(1).toLowerCase()) : '';
    
    const card = document.getElementById(`socialLink${idKey}`) ||
                 document.getElementById(`socialLink${platformKey}`) ||
                 document.querySelector(`a.social-card[href*="${s.id}"]`);

    if (card) {
      if (s.enabled === false) {
        card.style.display = 'none';
      } else {
        card.style.display = '';
        if (s.url) card.href = s.url;
        const nameEl = card.querySelector('.social-platform-name');
        if (nameEl && s.platform) nameEl.textContent = s.platform;
        const handleEl = card.querySelector('.social-handle');
        if (handleEl && s.handle) handleEl.textContent = s.handle;
        const actionEl = card.querySelector('.social-action-label span');
        if (actionEl && s.actionLabel) actionEl.textContent = s.actionLabel;
      }
    }

    // Also update footer social links
    const footerLinks = document.querySelectorAll(`.footer-social-link[title*="${s.platform}" i], .footer-social-link[data-platform="${s.id}"]`);
    footerLinks.forEach(fl => {
      if (s.enabled === false) {
        fl.style.display = 'none';
      } else {
        fl.style.display = '';
        if (s.url) fl.href = s.url;
      }
    });
  });
}

function syncExperienceFromDB() {
  if (!window.PortfolioDB) return;
  const expList = window.PortfolioDB.get('experience');
  if (!Array.isArray(expList) || expList.length === 0) return;

  const container = document.getElementById('experienceTimeline');
  if (!container) return;

  container.innerHTML = expList.map(item => {
    const badgeClass = item.badgeClass || 'practice';
    const dutiesHtml = (item.duties || []).map(d => `<li>${escapeHtml(d)}</li>`).join('');
    return `
      <div class="timeline-item" id="${escapeHtml(item.id || '')}">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-meta">
            <div>
              <h3 class="timeline-role">${escapeHtml(item.role || '')}</h3>
              <div class="timeline-company">${escapeHtml(item.location || item.company || '')}</div>
            </div>
            <div class="timeline-period-badge">
              <span class="timeline-type ${escapeHtml(badgeClass)}">${escapeHtml(item.type || 'Practice')}</span>
              <span class="timeline-period">${escapeHtml(item.period || '')}</span>
            </div>
          </div>
          <ul class="timeline-duties">
            ${dutiesHtml}
          </ul>
        </div>
      </div>
    `;
  }).join('');
}

function syncEducationFromDB() {
  if (!window.PortfolioDB) return;
  const eduList = window.PortfolioDB.get('education');
  if (!Array.isArray(eduList) || eduList.length === 0) return;

  const container = document.getElementById('educationGrid') || document.querySelector('.education-grid');
  if (!container) return;

  container.innerHTML = eduList.map(item => {
    const focusHtml = (item.focus || []).map(f => `<span class="edu-tag">${escapeHtml(f)}</span>`).join('');
    return `
      <div class="edu-card" id="${escapeHtml(item.id || '')}">
        <span class="edu-card-badge">${escapeHtml(item.badge || 'Degree')}</span>
        <h3 class="edu-degree">${escapeHtml(item.degree || '')}</h3>
        <div class="edu-institution">${escapeHtml(item.institution || '')}</div>
        <div class="edu-location">${escapeHtml(item.location || '')}${item.period ? ' • ' + escapeHtml(item.period) : ''}</div>
        ${(item.focus && item.focus.length > 0) ? `
          <div class="edu-curriculum">
            <div class="edu-curriculum-title">Areas of Focus:</div>
            <div class="edu-curriculum-tags">
              ${focusHtml}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function syncAllFromDB() {
  syncProfileFromDB();
  syncAboutFromDB();
  syncSkillsFromDB();
  syncSocialFromDB();
  syncExperienceFromDB();
  syncEducationFromDB();
  if (typeof window.refreshPublicReviews === 'function') {
    window.refreshPublicReviews();
  }
}

// Global cross-window and in-page reactive listeners
window.addEventListener('portfolioDBChange', () => {
  syncAllFromDB();
});

window.addEventListener('storage', () => {
  syncAllFromDB();
});

/**
 * 1. Navbar scroll effect and mobile toggle
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar style on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // More dropdown toggle
  const navMoreBtn = document.getElementById('navMoreBtn');
  const navDropdownItem = document.getElementById('navDropdownItem');

  if (navMoreBtn && navDropdownItem) {
    navMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navDropdownItem.classList.toggle('open');
      const isOpen = navDropdownItem.classList.contains('open');
      navMoreBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close dropdown and mobile menu when clicking any dropdown link
    document.querySelectorAll('.dropdown-link').forEach(link => {
      link.addEventListener('click', () => {
        navDropdownItem.classList.remove('open');
        navMoreBtn.setAttribute('aria-expanded', 'false');
        if (navMenu) {
          navMenu.classList.remove('open');
          if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!navDropdownItem.contains(e.target)) {
        navDropdownItem.classList.remove('open');
        navMoreBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active section spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  });
}

/**
 * 2. Animated Role Typewriter (Phase 2 Hero Requirement)
 * Rotates smoothly across all 8 specialized disciplines
 */
function initTypewriter() {
  const el = document.getElementById('heroTypewriter');
  if (!el) return;

  let roles = [
    'UI/UX Designer',
    'Web Developer',
    'Video Editor',
    'Photographer',
    'Videographer',
    'Graphic Designer',
    'Digital Marketer',
    'IT Support'
  ];

  if (window.PortfolioDB) {
    const prof = window.PortfolioDB.get('profile');
    if (prof && prof.roles && prof.roles.length) {
      roles = prof.roles;
    }
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/**
 * 3. Skills Section - "View All Skills" Toggle
 * Initial state shows 6 cards; View All reveals the remaining cards.
 */
function initSkillsToggle() {
  const toggleBtn = document.getElementById('toggleSkillsBtn');
  const extendedSkills = document.getElementById('extendedSkills');
  const toggleIcon = document.getElementById('skillsToggleIcon');
  const toggleText = document.getElementById('skillsToggleText');

  if (!toggleBtn || !extendedSkills) return;

  toggleBtn.addEventListener('click', () => {
    const isActive = extendedSkills.classList.toggle('active');
    if (isActive) {
      toggleText.textContent = 'Show Less';
      if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
      extendedSkills.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      toggleText.textContent = 'View All Skills (7 More)';
      if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
    }
  });
}

/**
 * 3. My Projects Section - 8 Independent Gallery Layout Switcher
 * Controls the 8 independent galleries for:
 * 1. UI/UX Design
 * 2. Graphic Design
 * 3. Video Editing
 * 4. Photography
 * 5. Videography
 * 6. Front-End Web Development
 * 7. Meta Ads Campaigns
 * 8. Technical & Academic Projects
 */
function initProjectGalleries() {
  // Handled dynamically by window.projectsManagerInstance in js/projects-manager.js
}

/**
 * 4. Contact Form Controller (Phase 10)
 * Validates inputs, saves inquiries to Admin Contact Inbox, and provides live feedback
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const serviceInput = document.getElementById('contactService');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const successAlert = document.getElementById('contactSuccessAlert');
  const errorAlert = document.getElementById('contactErrorAlert');

  // Input Error Message Spans
  const nameError = document.getElementById('contactNameError');
  const emailError = document.getElementById('contactEmailError');
  const subjectError = document.getElementById('contactSubjectError');
  const messageError = document.getElementById('contactMessageError');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Reset error visuals
    if (nameError) nameError.style.display = 'none';
    if (emailError) emailError.style.display = 'none';
    if (subjectError) subjectError.style.display = 'none';
    if (messageError) messageError.style.display = 'none';
    if (errorAlert) errorAlert.style.display = 'none';
    if (successAlert) successAlert.style.display = 'none';

    // Validate Name
    if (!nameInput.value.trim()) {
      if (nameError) nameError.style.display = 'block';
      isValid = false;
    }

    // Validate Email
    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      if (emailError) emailError.style.display = 'block';
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      if (subjectError) subjectError.style.display = 'block';
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      if (messageError) messageError.style.display = 'block';
      isValid = false;
    }

    if (!isValid) {
      if (errorAlert) errorAlert.style.display = 'block';
      return;
    }

    // Process Valid Submission
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending Message...</span>`;
    submitBtn.style.opacity = '0.75';

    const newInquiry = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      service: serviceInput ? serviceInput.value : 'general',
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    setTimeout(() => {
      // Save message to Admin Contact Inbox in PortfolioDB
      if (window.PortfolioDB) {
        window.PortfolioDB.add('contact_inbox', newInquiry);
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.style.opacity = '1';

      if (successAlert) {
        successAlert.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
          successAlert.style.display = 'none';
        }, 6000);
      }
    }, 600);
  });
}

/**
 * 5. Feedback & Reviews Controller (Phase 11)
 * Dynamically displays approved reviews and provides an interactive submission form
 */
function initFeedbackSystem() {
  const reviewsGrid = document.getElementById('approvedReviewsGrid');
  const toggleBtn = document.getElementById('toggleFeedbackFormBtn');
  const formCard = document.getElementById('feedbackFormCard');
  const closeBtn = document.getElementById('closeFeedbackFormBtn');
  const feedbackForm = document.getElementById('feedbackForm');

  // Interactive Star Rating Picker
  const starBtns = document.querySelectorAll('#starRatingContainer .star-btn');
  const ratingInput = document.getElementById('feedbackRatingInput');
  const ratingValueLabel = document.getElementById('starRatingValue');

  function updateStars(rating) {
    starBtns.forEach(btn => {
      const btnRating = parseInt(btn.getAttribute('data-rating'), 10);
      if (btnRating <= rating) {
        btn.style.color = '#60A5FA';
        btn.classList.add('active');
      } else {
        btn.style.color = 'rgba(255, 255, 255, 0.2)';
        btn.classList.remove('active');
      }
    });
    if (ratingInput) ratingInput.value = rating;
    if (ratingValueLabel) ratingValueLabel.textContent = `${rating}.0 / 5.0`;
  }

  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const rating = parseInt(btn.getAttribute('data-rating'), 10);
      updateStars(rating);
    });
  });

  // Toggle Feedback Form
  if (toggleBtn && formCard) {
    toggleBtn.addEventListener('click', () => {
      formCard.style.display = 'block';
      formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      toggleBtn.parentElement.style.display = 'none';
    });
  }

  if (closeBtn && formCard) {
    closeBtn.addEventListener('click', () => {
      formCard.style.display = 'none';
      if (toggleBtn) toggleBtn.parentElement.style.display = 'block';
    });
  }

  // Render Approved Reviews on Public Page
  function renderApprovedReviews() {
    if (!reviewsGrid) return;
    let reviews = [];
    if (window.PortfolioDB) {
      reviews = window.PortfolioDB.get('feedback') || [];
    }

    // Filter only admin-approved reviews
    const approved = reviews.filter(r => r.approved === true);

    if (approved.length === 0) {
      reviewsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
          <p style="color: var(--text-muted); font-size: 0.95rem;">No public reviews currently published. Be the first collaborator to share your feedback below!</p>
        </div>
      `;
      return;
    }

    reviewsGrid.innerHTML = approved.map(r => {
      const starsHtml = Array.from({ length: 5 }, (_, i) => {
        const fill = i < (r.rating || 5) ? '#60A5FA' : 'rgba(255, 255, 255, 0.15)';
        return `<svg viewBox="0 0 24 24" style="width: 17px; height: 17px; fill: ${fill}; margin-right: 3px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      }).join('');

      // Generate Initials
      const initials = (r.name || 'Anonymous')
        .split(' ')
        .map(w => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      return `
        <div class="review-card" id="rev_${r.id}">
          <div class="review-stars" style="display: flex; align-items: center; margin-bottom: 14px;">
            ${starsHtml}
          </div>
          <p class="review-quote">"${escapeHtml(r.quote || '')}"</p>
          <div class="reviewer-profile">
            <div class="reviewer-avatar-placeholder">${initials}</div>
            <div>
              <h4 class="reviewer-name">${escapeHtml(r.name || 'Verified Client')}</h4>
              <span class="reviewer-role">${escapeHtml(r.role || 'Collaborator')}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initial render & window hook for external sync
  window.refreshPublicReviews = renderApprovedReviews;
  renderApprovedReviews();

  // Listen for database changes (e.g. from Admin approval or auto additions in another tab)
  window.addEventListener('portfolioDBChange', (e) => {
    if (e.detail && e.detail.collection === 'feedback') {
      renderApprovedReviews();
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'foysal_portfolio_feedback' || !e.key) {
      renderApprovedReviews();
    }
  });

  // Handle Feedback Submission
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('feedbackName').value.trim();
      const role = document.getElementById('feedbackRole').value.trim();
      const email = document.getElementById('feedbackEmail').value.trim();
      const rating = parseInt(document.getElementById('feedbackRatingInput').value, 10) || 5;
      const message = document.getElementById('feedbackMessage').value.trim();

      const nameError = document.getElementById('feedbackNameError');
      const messageError = document.getElementById('feedbackMessageError');
      const successAlert = document.getElementById('feedbackSuccessAlert');
      const errorAlert = document.getElementById('feedbackErrorAlert');

      if (nameError) nameError.style.display = 'none';
      if (messageError) messageError.style.display = 'none';
      if (errorAlert) errorAlert.style.display = 'none';
      if (successAlert) successAlert.style.display = 'none';

      let valid = true;
      if (!name) {
        if (nameError) nameError.style.display = 'block';
        valid = false;
      }
      if (!message) {
        if (messageError) messageError.style.display = 'block';
        valid = false;
      }

      if (!valid) {
        if (errorAlert) errorAlert.style.display = 'block';
        return;
      }

      const submitBtn = document.getElementById('feedbackSubmitBtn');
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Submitting Review...</span>';

      setTimeout(() => {
        const newReview = {
          name,
          role: role || 'Client / Collaborator',
          email,
          rating,
          quote: message,
          approved: true, // Automatically approved and live per user specification
          createdAt: new Date().toISOString()
        };

        if (window.PortfolioDB) {
          window.PortfolioDB.add('feedback', newReview);
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        if (successAlert) {
          successAlert.textContent = 'Thank you! Your review has been added and is now live on the portfolio.';
          successAlert.style.display = 'block';
        }
        feedbackForm.reset();
        updateStars(5);
        renderApprovedReviews();

        setTimeout(() => {
          if (successAlert) successAlert.style.display = 'none';
          if (formCard) formCard.style.display = 'none';
          if (toggleBtn) toggleBtn.parentElement.style.display = 'block';
        }, 5000);
      }, 500);
    });
  }
}

/**
 * 5. Smooth Scroll for back to top and anchors
 */
function initSmoothScroll() {
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * 6. Interactive Ambient Constellation Background Animation
 * Palette: #162E93 (Royal Blue), #0F1F6D (Navy), #D6B35A (Gold), #FFFFFF (White)
 * Smooth 60fps canvas particle system with mouse interaction and connection mesh.
 */
function initAmbientBackground() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const colors = ['#162E93', '#0F1F6D', '#60A5FA', '#FFFFFF'];
  const particleCount = window.innerWidth < 768 ? 32 : 65;
  const particles = [];

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.65;
      this.vy = (Math.random() - 0.5) * 0.65;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = this.color === '#60A5FA' ? 12 : 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interactive repelling wave
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);
        if (distance < mouse.radius) {
          const force = (1 - distance / mouse.radius) * 1.8;
          this.x -= (dx / distance) * force;
          this.y -= (dy / distance) * force;
        }
      }

      this.draw();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connect() {
    const maxDist = 115;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDist) {
          const opacity = (1 - distance / maxDist) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = particles[a].color === '#60A5FA' 
            ? 'rgba(96, 165, 250, ' + opacity + ')' 
            : 'rgba(22, 46, 147, ' + opacity + ')';
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
    connect();
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });
}
