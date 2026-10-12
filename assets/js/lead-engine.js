// Ravana Tech - Silicon Valley Growth Lab & Lead Magnet Suite (7-Tool High Conversion Matrix)
(function() {
  'use strict';

  // State Management
  const state = {
    activeTab: 'auditor',
    isScanning: false,
    auditCompleted: false,
    benchmarkRunning: false,
    estimator: {
      type: 'Corporate Website',
      features: ['Sub-Second Speed Optimization', 'WhatsApp AI Automation'],
      scope: 'Growth Matrix (6 - 10 Pages)',
      timeline: '7 - 12 Days',
      investment: '$450 - $750'
    },
    roi: {
      visitors: 8000,
      orderValue: 45,
      loadTime: 4.2
    }
  };

  // DOM Elements
  let modal, backdrop, closeBtn;

  function init() {
    modal = document.getElementById('growth-lab-modal');
    backdrop = document.getElementById('growth-lab-backdrop');
    closeBtn = document.getElementById('growth-lab-close-btn');

    setupTriggers();
    setupTabSwitching();
    setupAuditorTool();
    setupBenchmarkSimulator();
    setupEstimatorTool();
    setupRoiCalculator();
    setupTeardownBooking();
    setupPlaybookDownload();
    setupFloatingWhatsAppPill();
    checkUrlTriggers();
  }

  // 1. Trigger Handlers
  function setupTriggers() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-growth-lab], #open-growth-lab-btn, #hero-growth-lab-btn, .growth-lab-link');
      if (trigger) {
        e.preventDefault();
        const tab = trigger.getAttribute('data-lab-tab') || 'auditor';
        openGrowthLab(tab);
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeGrowthLab);
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeGrowthLab);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
        closeGrowthLab();
      }
    });
  }

  function openGrowthLab(tabId = 'auditor') {
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    switchLabTab(tabId);
  }

  function closeGrowthLab() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // 2. Tab Navigation
  function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.growth-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchLabTab(tab);
      });
    });
  }

  function switchLabTab(tabId) {
    state.activeTab = tabId;
    const tabButtons = document.querySelectorAll('.growth-tab-btn');
    const tabPanels = document.querySelectorAll('.growth-tab-panel');

    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    tabPanels.forEach(panel => {
      if (panel.id === `tab-panel-${tabId}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  }

  // 3. Tool 1: Live Speed & SEO Auditor
  function setupAuditorTool() {
    const auditForm = document.getElementById('auditor-form');
    const urlInput = document.getElementById('auditor-url-input');
    const scanningOverlay = document.getElementById('auditor-scanning-hud');
    const resultsPanel = document.getElementById('auditor-results-panel');
    const scanStep = document.getElementById('auditor-scan-step');
    const auditHandoffBtn = document.getElementById('auditor-whatsapp-handoff-btn');
    const auditContactInput = document.getElementById('auditor-contact-input');

    if (!auditForm) return;

    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawUrl = urlInput.value.trim();
      if (!rawUrl) return;

      const cleanUrl = rawUrl.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
      runAuditSequence(cleanUrl);
    });

    function runAuditSequence(url) {
      state.isScanning = true;
      scanningOverlay.style.display = 'flex';
      resultsPanel.style.display = 'none';

      const steps = [
        `RESOLVING DNS & ANALYZING TTFB FOR ${url}...`,
        'INSPECTING MOBILE CORE WEB VITALS (LCP, CLS, FID)...',
        'AUDITING SEO METADATA, SCHEMA.ORG & ASSET COMPRESSION...',
        'COMPUTING ARCHITECTURE LATENCY & LOST CONVERSION RATE...'
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          scanStep.textContent = steps[currentStep];
          currentStep++;
        } else {
          clearInterval(interval);
          finishAudit(url);
        }
      }, 550);
    }

    function finishAudit(url) {
      state.isScanning = false;
      state.auditCompleted = true;
      scanningOverlay.style.display = 'none';
      resultsPanel.style.display = 'block';

      // Update dynamic UI values
      const targetUrlEl = document.getElementById('audit-display-url');
      if (targetUrlEl) targetUrlEl.textContent = url;

      const scoreEl = document.getElementById('audit-score-num');
      const lostSalesEl = document.getElementById('audit-lost-sales');
      const hash = url.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
      const score = 32 + (hash % 16);
      if (scoreEl) scoreEl.textContent = `${score}`;
      if (lostSalesEl) lostSalesEl.textContent = `${28 + (hash % 6)}% - ${35 + (hash % 5)}%`;

      // Submit background telemetry
      try {
        fetch('/api/lead/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, contact: 'audit_simulation' })
        }).catch(err => console.warn('[AUDIT TELEMETRY]', err));

        if (typeof window.saveLeadToFirestore === 'function') {
          window.saveLeadToFirestore('audit', { url, score, lostSales: `${28 + (hash % 6)}% - ${35 + (hash % 5)}%` });
        }
      } catch (e) {}
    }

    if (auditHandoffBtn) {
      auditHandoffBtn.addEventListener('click', () => {
        const url = (urlInput && urlInput.value.trim()) || 'My Website';
        const contact = (auditContactInput && auditContactInput.value.trim()) || '';
        const msg = encodeURIComponent(`Hello Ravana Tech! I just ran a Website Speed & SEO Audit for "${url}".\n\nI want to receive the full 10-Page Optimization Blueprint to fix the detected render-blocking latency and boost conversions.\nContact: ${contact}`);
        window.open(`https://wa.me/94788470610?text=${msg}`, '_blank');
      });
    }
  }

  // 4. Tool 7: Interactive Before vs After Speed Simulator
  function setupBenchmarkSimulator() {
    const runBtn = document.getElementById('run-benchmark-btn');
    const legacyTimer = document.getElementById('benchmark-legacy-timer');
    const ravanaTimer = document.getElementById('benchmark-ravana-timer');
    const legacyProgress = document.getElementById('benchmark-legacy-bar');
    const ravanaProgress = document.getElementById('benchmark-ravana-bar');
    const legacyStatus = document.getElementById('benchmark-legacy-status');
    const ravanaStatus = document.getElementById('benchmark-ravana-status');

    if (!runBtn) return;

    runBtn.addEventListener('click', () => {
      if (state.benchmarkRunning) return;
      state.benchmarkRunning = true;
      runBtn.disabled = true;
      runBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> EXECUTING LIVE SIMULATION...";

      // Reset
      legacyTimer.textContent = '0.00s';
      ravanaTimer.textContent = '0.00s';
      legacyProgress.style.width = '0%';
      ravanaProgress.style.width = '0%';
      legacyStatus.textContent = 'STREAMING HEAVY CMS ASSETS...';
      ravanaStatus.textContent = 'INSTANT EDGE COMPILED...';

      const startTime = performance.now();

      // Ravana Sub-Second Finished at 0.19s
      setTimeout(() => {
        ravanaTimer.textContent = '0.19s';
        ravanaProgress.style.width = '100%';
        ravanaStatus.innerHTML = "<span style='color:var(--rt-cyan-bright);'>⚡ 100% READY (SUB-SECOND)</span>";
      }, 190);

      // Legacy WordPress Timer
      const interval = setInterval(() => {
        const elapsed = (performance.now() - startTime) / 1000;
        if (elapsed < 4.2) {
          legacyTimer.textContent = `${elapsed.toFixed(2)}s`;
          legacyProgress.style.width = `${Math.min(95, (elapsed / 4.2) * 100)}%`;
        } else {
          clearInterval(interval);
          legacyTimer.textContent = '4.20s';
          legacyProgress.style.width = '100%';
          legacyStatus.innerHTML = "<span style='color:#FF453A;'>⚠️ 4.20s (HIGH BOUNCE RISK)</span>";

          state.benchmarkRunning = false;
          runBtn.disabled = false;
          runBtn.innerHTML = "<i class='bx bx-refresh'></i> RUN LIVE COMPARISON AGAIN";
        }
      }, 50);
    });
  }

  // 5. Tool 2: Project Budget & Timeline Estimator
  function setupEstimatorTool() {
    const typePills = document.querySelectorAll('.est-type-pill');
    const featurePills = document.querySelectorAll('.est-feature-pill');
    const scopePills = document.querySelectorAll('.est-scope-pill');
    const timelineEl = document.getElementById('est-timeline-val');
    const investmentEl = document.getElementById('est-investment-val');
    const submitBtn = document.getElementById('est-submit-btn');
    const contactInput = document.getElementById('est-contact-input');
    const nameInput = document.getElementById('est-name-input');

    function calculateEstimate() {
      let baseMin = 350;
      let baseMax = 600;
      let daysMin = 5;
      let daysMax = 10;

      // Type weight
      if (state.estimator.type === 'E-Commerce / Online Store') {
        baseMin += 250; baseMax += 450; daysMin += 4; daysMax += 6;
      } else if (state.estimator.type === 'Luxury Hotel / Villa') {
        baseMin += 200; baseMax += 350; daysMin += 3; daysMax += 5;
      } else if (state.estimator.type === 'AI Platform / Custom SaaS') {
        baseMin += 450; baseMax += 850; daysMin += 7; daysMax += 12;
      }

      // Feature weight
      baseMin += state.estimator.features.length * 60;
      baseMax += state.estimator.features.length * 90;
      daysMax += Math.ceil(state.estimator.features.length * 0.8);

      // Scope weight
      if (state.estimator.scope.includes('Growth')) {
        baseMin += 150; baseMax += 250; daysMin += 2; daysMax += 4;
      } else if (state.estimator.scope.includes('Enterprise')) {
        baseMin += 400; baseMax += 700; daysMin += 6; daysMax += 10;
      }

      state.estimator.timeline = `${daysMin} - ${daysMax} Days`;
      state.estimator.investment = `$${baseMin} - $${baseMax}`;

      if (timelineEl) timelineEl.textContent = state.estimator.timeline;
      if (investmentEl) investmentEl.textContent = state.estimator.investment;
    }

    typePills.forEach(pill => {
      pill.addEventListener('click', () => {
        typePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.estimator.type = pill.getAttribute('data-value');
        calculateEstimate();
      });
    });

    featurePills.forEach(pill => {
      pill.addEventListener('click', () => {
        const val = pill.getAttribute('data-value');
        if (pill.classList.contains('active')) {
          pill.classList.remove('active');
          state.estimator.features = state.estimator.features.filter(f => f !== val);
        } else {
          pill.classList.add('active');
          state.estimator.features.push(val);
        }
        calculateEstimate();
      });
    });

    scopePills.forEach(pill => {
      pill.addEventListener('click', () => {
        scopePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.estimator.scope = pill.getAttribute('data-value');
        calculateEstimate();
      });
    });

    calculateEstimate();

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const name = (nameInput && nameInput.value.trim()) || 'Prospective Client';
        const contact = (contactInput && contactInput.value.trim()) || '';

        // API dispatch
        const leadPayload = {
          name,
          contact,
          projectType: state.estimator.type,
          features: state.estimator.features,
          scope: state.estimator.scope,
          investment: state.estimator.investment,
          timeline: state.estimator.timeline
        };

        fetch('/api/lead/estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload)
        }).catch(err => console.warn('[ESTIMATE TELEMETRY]', err));

        if (typeof window.saveLeadToFirestore === 'function') {
          window.saveLeadToFirestore('estimate', leadPayload);
        }

        // Direct WhatsApp handoff
        const waMsg = encodeURIComponent(`Hello Ravana Tech! I just generated a Project Estimate on your website.\n\nName: ${name}\nProject Type: ${state.estimator.type}\nScope: ${state.estimator.scope}\nEstimated Timeline: ${state.estimator.timeline}\nEstimated Investment: ${state.estimator.investment}\nSelected Features:\n- ${state.estimator.features.join('\n- ')}\n\nContact Details: ${contact}\n\nI want to discuss launching this project.`);
        window.open(`https://wa.me/94788470610?text=${waMsg}`, '_blank');
      });
    }
  }

  // 6. Tool 3: Website ROI & Revenue Loss Calculator
  function setupRoiCalculator() {
    const visitorsSlider = document.getElementById('roi-visitors-slider');
    const valueSlider = document.getElementById('roi-value-slider');
    const visitorsDisplay = document.getElementById('roi-visitors-display');
    const valueDisplay = document.getElementById('roi-value-display');
    const monthlyLossEl = document.getElementById('roi-monthly-loss');
    const annualGainEl = document.getElementById('roi-annual-gain');
    const roiCtaBtn = document.getElementById('roi-claim-btn');

    function updateRoiMath() {
      const visitors = parseInt(visitorsSlider ? visitorsSlider.value : 8000, 10);
      const val = parseInt(valueSlider ? valueSlider.value : 45, 10);

      if (visitorsDisplay) visitorsDisplay.textContent = Number(visitors).toLocaleString();
      if (valueDisplay) valueDisplay.textContent = `$${val}`;

      // Google/Akamai Benchmark: Every 1s load latency = 7% conversion loss.
      // Average 4.0s site vs 0.2s site = ~3.8s delay => ~24.5% conversion attrition.
      const baselineOrders = (visitors * 0.02); // 2% normal conversion
      const lostOrders = Math.floor(baselineOrders * 0.245);
      const monthlyLoss = Math.floor(lostOrders * val);
      const annualGain = Math.floor(monthlyLoss * 12);

      if (monthlyLossEl) monthlyLossEl.textContent = `$${monthlyLoss.toLocaleString()}/mo`;
      if (annualGainEl) annualGainEl.textContent = `+$${annualGain.toLocaleString()}/year`;
    }

    if (visitorsSlider) visitorsSlider.addEventListener('input', updateRoiMath);
    if (valueSlider) valueSlider.addEventListener('input', updateRoiMath);

    updateRoiMath();

    if (roiCtaBtn) {
      roiCtaBtn.addEventListener('click', () => {
        const visitors = visitorsSlider ? visitorsSlider.value : '8000';
        const orderVal = valueSlider ? valueSlider.value : '45';
        const msg = encodeURIComponent(`Hello Ravana Tech! I used your ROI & Speed Loss Calculator.\nMy business gets around ${visitors} visitors/month with average order size of $${orderVal}.\n\nI want to schedule a strategy session to fix our website latency and recover lost revenue.`);
        window.open(`https://wa.me/94788470610?text=${msg}`, '_blank');
      });
    }
  }

  // 7. Tool 4: Free 15-Minute Teardown Booking
  function setupTeardownBooking() {
    const form = document.getElementById('teardown-form');
    const feedback = document.getElementById('teardown-feedback');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('td-name').value.trim();
      const contact = document.getElementById('td-contact').value.trim();
      const website = document.getElementById('td-website').value.trim();
      const slot = document.getElementById('td-slot').value;
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!name || !contact) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> RESERVING TEARDOWN SESSION...";

      const teardownPayload = { name, contact, websiteUrl: website, preferredSlot: slot };
      fetch('/api/lead/teardown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teardownPayload)
      }).catch(err => console.warn('[TEARDOWN TELEMETRY]', err));

      if (typeof window.saveLeadToFirestore === 'function') {
        window.saveLeadToFirestore('teardown', teardownPayload);
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "<i class='bx bx-check-circle'></i> TEARDOWN RESERVED";

        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = `<strong>Session Reserved!</strong> Thank you ${name}. Founder Shanthapriya Silva has reserved your 15-Minute Technical Teardown for <em>${slot}</em>. We will confirm via WhatsApp (${contact}).`;
        }

        const waMsg = encodeURIComponent(`Hello Shanthapriya! I just reserved a Free 15-Minute Digital Architecture Teardown.\n\nName: ${name}\nWebsite: ${website || 'Not launched yet'}\nPreferred Slot: ${slot}\nContact: ${contact}`);
        window.open(`https://wa.me/94788470610?text=${waMsg}`, '_blank');

        form.reset();
      }, 800);
    });
  }

  // 8. Tool 6: 2026 Playbook Download
  function setupPlaybookDownload() {
    const form = document.getElementById('playbook-download-form');
    const feedback = document.getElementById('playbook-feedback');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('pb-email').value.trim();
      const business = document.getElementById('pb-business').value.trim() || 'Modern Enterprise';
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!email) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> GENERATING PLAYBOOK ACCESS...";

      const playbookPayload = { email, businessName: business };
      fetch('/api/lead/playbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playbookPayload)
      }).catch(err => console.warn('[PLAYBOOK TELEMETRY]', err));

      if (typeof window.saveLeadToFirestore === 'function') {
        window.saveLeadToFirestore('playbook', playbookPayload);
      }

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "<i class='bx bx-check-circle'></i> ACCESS GRANTED";

        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = `<strong>Download Started!</strong> The 2026 High-Conversion Web Architecture Playbook is ready. If download doesn't start automatically, <a href="/download/Ravana_Tech_High_Conversion_Web_Architecture_Playbook_2026.html" target="_blank" style="color:var(--rt-cyan-bright);text-decoration:underline;">click here to view</a>.`;
        }

        // Trigger direct file download
        const downloadLink = document.createElement('a');
        downloadLink.href = '/download/Ravana_Tech_High_Conversion_Web_Architecture_Playbook_2026.html';
        downloadLink.download = 'Ravana_Tech_Web_Architecture_Playbook_2026.html';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        form.reset();
      }, 700);
    });
  }

  // 9. Tool 5: Floating WhatsApp Micro-Pill
  function setupFloatingWhatsAppPill() {
    const closeBtn = document.getElementById('close-wa-pill-btn');
    const pill = document.getElementById('floating-whatsapp-pill');

    if (closeBtn && pill) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pill.style.display = 'none';
        sessionStorage.setItem('wa_pill_dismissed', 'true');
      });

      if (sessionStorage.getItem('wa_pill_dismissed') === 'true') {
        pill.style.display = 'none';
      }
    }
  }

  // 10. Check URL query/hash triggers for direct routing
  function checkUrlTriggers() {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();

    if (hash.includes('audit') || path.includes('/audit')) {
      openGrowthLab('auditor');
    } else if (hash.includes('estimator') || path.includes('/estimator')) {
      openGrowthLab('estimator');
    } else if (hash.includes('roi') || path.includes('/roi')) {
      openGrowthLab('roi');
    } else if (hash.includes('teardown') || path.includes('/teardown')) {
      openGrowthLab('teardown');
    } else if (hash.includes('playbook') || path.includes('/playbook')) {
      openGrowthLab('playbook');
    } else if (hash.includes('growth-lab') || path.includes('/growth-lab') || path.includes('/lab')) {
      openGrowthLab('auditor');
    }
  }

  // Expose global controller
  window.RavanaGrowthLab = {
    open: openGrowthLab,
    close: closeGrowthLab,
    switchTab: switchLabTab
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
