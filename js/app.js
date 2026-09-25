/**
 * ELARA 2.0 - MAIN APPLICATION CONTROLLER
 * Manages screen transitions, role switching, view modes, AI processing animation,
 * queue management, clinical decision overrides, and multilingual reactivity.
 */

class ElaraApp {
  constructor() {
    this.currentScreen = "splash";
    this.currentRole = "patient";
    this.currentLanguage = "en";
    this.currentViewMode = "mobile";
    this.storyboardZoom = 1.0;
    this.selectedWorkerDecision = "priority";
    this.aiPipelineTimer = null;
    
    // Bind global helpers
    window.goToScreen = (id) => this.navigateTo(id);
    window.switchUserRole = (role) => this.setRole(role);
    window.setLanguage = (lang) => this.setLanguage(lang);
    window.setViewMode = (mode) => this.setViewMode(mode);
    window.selectRoleCard = (el, role) => this.selectRoleCard(el, role);
    window.proceedFromRoleSelect = () => this.proceedFromRoleSelect();
    window.quickFillDemoPatient = () => this.quickFillDemoPatient();
    window.grantConsentAndContinue = () => this.grantConsentAndContinue();
    window.startTriageMethod = (method) => this.startTriageMethod(method);
    window.switchInputTab = (tab) => this.switchInputTab(tab);
    window.toggleVoiceRecording = () => this.toggleVoiceRecording();
    window.loadVoicePreset = (key) => this.loadVoicePreset(key);
    window.toggleSymptomChip = (el, name) => this.toggleSymptomChip(el, name);
    window.setDuration = (el, dur) => this.setDuration(el, dur);
    window.triggerReportUpload = () => this.triggerReportUpload();
    window.loadSampleReport = (type) => this.loadSampleReport(type);
    window.resetDemoInputs = () => this.resetDemoInputs();
    window.startAIProcessingPipeline = () => this.startAIProcessingPipeline();
    window.resolveMissingInfo = (type) => this.resolveMissingInfo(type);
    window.sendToHealthcareWorker = () => this.sendToHealthcareWorker();
    window.filterQueue = (urgency) => this.filterQueue(urgency);
    window.openReviewModal = (pid) => this.openReviewModal(pid);
    window.setWorkerDecision = (dec) => this.setWorkerDecision(dec);
    window.appendNote = (text) => this.appendNote(text);
    window.completeRoutineQueue = () => this.completeRoutineQueue();
    window.sendReferralNow = () => this.sendReferralNow();
    window.exportFacilityReport = () => this.exportFacilityReport();
    window.openAuditModal = () => this.openAuditModal();
    window.refreshQueue = () => this.refreshQueue();
    window.zoomStoryboard = (delta) => this.zoomStoryboard(delta);
    window.resetStoryboardZoom = () => this.resetStoryboardZoom();
    window.openScreenFromBoard = (id) => this.openScreenFromBoard(id);
    window.openArchDrawer = () => this.openArchDrawer();
    window.closeArchDrawer = (e) => this.closeArchDrawer(e);
    window.toggleTheme = () => this.toggleTheme();
    window.showToast = (msg, icon) => this.showToast(msg, icon);
  }

  init() {
    this.updateClock();
    setInterval(() => this.updateClock(), 30000);
    this.renderQueueList();
    this.renderWorkstationViews();
    this.setupStoryboardPreviews();
    this.applyLanguage();
  }

  updateClock() {
    const clockEl = document.getElementById("statusClock");
    if (!clockEl) return;
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    clockEl.textContent = `${hrs}:${mins}`;
  }

  /* -------------------------------------------------------------
     SCREEN & NAVIGATION MANAGEMENT
     ------------------------------------------------------------- */
  navigateTo(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll(".screen-view");
    screens.forEach(s => s.classList.remove("active"));

    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
      target.classList.add("active");
      this.currentScreen = screenId;
    }

    // Update top step bar chips
    const chips = document.querySelectorAll(".step-chip");
    chips.forEach(c => {
      const match = c.getAttribute("onclick")?.includes(`'${screenId}'`);
      c.classList.toggle("active", !!match);
    });

    // Auto-scroll phone content to top
    const scrollBodies = document.querySelectorAll(".screen-scrollable-body");
    scrollBodies.forEach(sb => sb.scrollTop = 0);

    // Sync workstation active title if viewing P-1042
    if (screenId === "hw-review" || screenId === "referral-prep") {
      const wsTitle = document.getElementById("wsActiveCaseTitle");
      if (wsTitle) wsTitle.textContent = "Patient P-1042: Sunita Devi (42 F) - Review Active";
    }
  }

  setRole(role) {
    this.currentRole = role;
    const topSelector = document.getElementById("topRoleSelector");
    if (topSelector) topSelector.value = role;

    if (role === "patient") {
      this.navigateTo("patient-home");
      this.showToast("Switched to Patient View (Sunita Devi)", "👤");
    } else if (role === "nurse") {
      this.navigateTo("hw-dashboard");
      this.showToast("Switched to Healthcare Worker Console (Sister Priya)", "👩⚕️");
    } else if (role === "admin") {
      this.navigateTo("facility-admin");
      this.showToast("Switched to Facility Admin (Dr. Ananya Roy)", "🏥");
    }
  }

  /* -------------------------------------------------------------
     VIEW MODE TOGGLE: MOBILE | FIGMA STORYBOARD | WORKSTATION
     ------------------------------------------------------------- */
  setViewMode(mode) {
    this.currentViewMode = mode;
    const tabs = document.querySelectorAll(".view-tab");
    tabs.forEach(t => t.classList.toggle("active", t.dataset.mode === mode));

    const mobileWrap = document.getElementById("mobileDeviceWrapper");
    const sbWrap = document.getElementById("storyboardCanvasWrapper");
    const wsWrap = document.getElementById("workstationDualWrapper");

    if (mode === "mobile") {
      mobileWrap.style.display = "flex";
      sbWrap.style.display = "none";
      wsWrap.style.display = "none";
    } else if (mode === "storyboard") {
      mobileWrap.style.display = "none";
      sbWrap.style.display = "flex";
      wsWrap.style.display = "none";
      this.setupStoryboardPreviews();
    } else if (mode === "workstation") {
      mobileWrap.style.display = "none";
      sbWrap.style.display = "none";
      wsWrap.style.display = "flex";
      this.renderWorkstationViews();
    }
  }

  zoomStoryboard(delta) {
    this.storyboardZoom = Math.max(0.6, Math.min(1.4, this.storyboardZoom + delta));
    const grid = document.getElementById("storyboardGrid");
    if (grid) {
      grid.style.transform = `scale(${this.storyboardZoom})`;
    }
  }

  resetStoryboardZoom() {
    this.storyboardZoom = 1.0;
    const grid = document.getElementById("storyboardGrid");
    if (grid) {
      grid.style.transform = "scale(1.0)";
    }
  }

  openScreenFromBoard(screenId) {
    this.setViewMode("mobile");
    this.navigateTo(screenId);
    this.showToast(`Opened screen: ${screenId}`, "📱");
  }

  setupStoryboardPreviews() {
    // Clone screen inner HTML into storyboard preview containers for true visual fidelity
    const screens = [
      "splash", "role-select", "patient-home", "multimodal-input",
      "ai-processing", "symptom-summary", "triage-summary", "hw-dashboard",
      "hw-review", "referral-prep", "facility-admin"
    ];

    screens.forEach(sid => {
      const src = document.getElementById(`screen-${sid}`);
      const dest = document.getElementById(`sb-preview-${sid}`);
      if (src && dest && dest.children.length === 0) {
        dest.innerHTML = src.innerHTML;
        // Make sure all links/inputs inside preview are non-interfering
        dest.querySelectorAll("input, button, select, textarea").forEach(el => {
          el.setAttribute("tabindex", "-1");
        });
      }
    });
  }

  /* -------------------------------------------------------------
     ROLE SELECTION & ONBOARDING
     ------------------------------------------------------------- */
  selectRoleCard(cardEl, role) {
    document.querySelectorAll(".role-select-card").forEach(c => c.classList.remove("active"));
    cardEl.classList.add("active");
    this.tempRole = role;

    const cta = document.getElementById("roleCtaText");
    if (cta) {
      if (role === "patient") cta.textContent = "Send OTP & Continue →";
      else if (role === "nurse") cta.textContent = "Sister Priya Login (PHC Desk 2) →";
      else if (role === "admin") cta.textContent = "MO Incharge Portal Access →";
    }
  }

  proceedFromRoleSelect() {
    const activeCard = document.querySelector(".role-select-card.active");
    const role = this.tempRole || "patient";

    if (role === "patient") {
      this.navigateTo("consent");
    } else if (role === "nurse") {
      this.setRole("nurse");
    } else if (role === "admin") {
      this.setRole("admin");
    }
  }

  quickFillDemoPatient() {
    const input = document.getElementById("authInput");
    if (input) input.value = "91-4820-1928-3341 (Sunita Devi)";
    this.showToast("Loaded ABHA ID for Sunita Devi", "✨");
    setTimeout(() => this.navigateTo("consent"), 400);
  }

  grantConsentAndContinue() {
    const chk = document.getElementById("consentCheckbox");
    if (chk && !chk.checked) {
      alert("Please accept the data processing consent to proceed with clinical triage.");
      return;
    }
    this.showToast("Consent recorded securely under ABDM policy", "🔐");
    this.navigateTo("patient-home");
  }

  /* -------------------------------------------------------------
     PATIENT INTAKE & MULTIMODAL INPUTS
     ------------------------------------------------------------- */
  startTriageMethod(method) {
    this.navigateTo("multimodal-input");
    this.switchInputTab(method);
  }

  switchInputTab(tab) {
    document.querySelectorAll(".input-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

    const btnMap = { voice: "tabBtnVoice", text: "tabBtnText", report: "tabBtnReport" };
    const paneMap = { voice: "pane-voice", text: "pane-text", report: "pane-report" };

    const btn = document.getElementById(btnMap[tab]);
    const pane = document.getElementById(paneMap[tab]);

    if (btn) btn.classList.add("active");
    if (pane) pane.classList.add("active");

    if (tab === "voice" && window.elaraAudio) {
      window.elaraAudio.initCanvas();
    }
  }

  toggleVoiceRecording() {
    if (window.elaraAudio) {
      window.elaraAudio.toggleRecording();
    }
  }

  loadVoicePreset(presetKey) {
    const p = ELARA_DATA.presets[presetKey];
    if (!p) return;

    document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
    event?.target?.classList?.add("active");

    const hindiEl = document.getElementById("hindiTranscription");
    const engEl = document.getElementById("englishTranslation");

    if (hindiEl) hindiEl.textContent = `"${p.transcriptHindi}"`;
    if (engEl) engEl.textContent = `"${p.transcriptEnglish}"`;

    this.showToast(`Loaded voice sample: ${p.name}`, "🎧");
  }

  toggleSymptomChip(el, symptomName) {
    el.classList.toggle("active");
  }

  setDuration(el, dur) {
    document.querySelectorAll(".dur-btn").forEach(b => b.classList.remove("active"));
    el.classList.add("active");
  }

  triggerReportUpload() {
    this.showToast("Opening medical report scanner...", "📷");
    setTimeout(() => {
      this.loadSampleReport("cbc");
    }, 600);
  }

  loadSampleReport(type) {
    document.querySelectorAll(".report-pill").forEach(p => p.classList.remove("active"));
    if (event?.target) event.target.classList.add("active");

    const r = ELARA_DATA.reports[type];
    if (!r) return;

    const hbEl = document.getElementById("ocrHb");
    const wbcEl = document.getElementById("ocrWbc");
    const pltEl = document.getElementById("ocrPlatelets");

    if (hbEl) hbEl.textContent = r.hb;
    if (wbcEl) wbcEl.textContent = r.wbc;
    if (pltEl) pltEl.textContent = r.platelets;

    this.showToast(`Extracted verified OCR values from ${r.name}`, "🩸");
  }

  resetDemoInputs() {
    const hindiEl = document.getElementById("hindiTranscription");
    const engEl = document.getElementById("englishTranslation");
    if (hindiEl) hindiEl.textContent = `"${ELARA_DATA.activePatient.voiceNote.hindi}"`;
    if (engEl) engEl.textContent = `"${ELARA_DATA.activePatient.voiceNote.english}"`;
    this.loadSampleReport("cbc");
    this.showToast("Reset all triage inputs to Sunita Devi baseline", "🔄");
  }

  /* -------------------------------------------------------------
     AI PROCESSING PIPELINE ANIMATION (SCREEN 6 -> 7)
     ------------------------------------------------------------- */
  startAIProcessingPipeline() {
    this.navigateTo("ai-processing");

    const bar = document.getElementById("synthesisProgressBar");
    const pct = document.getElementById("synthesisPercent");

    const step1 = document.getElementById("pipeStep1");
    const step2 = document.getElementById("pipeStep2");
    const step3 = document.getElementById("pipeStep3");
    const step4 = document.getElementById("pipeStep4");
    const step5 = document.getElementById("pipeStep5");

    // Reset steps
    step1.className = "p-step-item done";
    step2.className = "p-step-item done";
    step3.className = "p-step-item in-progress";
    step3.querySelector(".step-check").innerHTML = '<div class="mini-spinner"></div>';
    step4.className = "p-step-item pending";
    step4.querySelector(".step-check").textContent = "○";
    step5.className = "p-step-item pending";
    step5.querySelector(".step-check").textContent = "○";

    if (bar) bar.style.width = "40%";
    if (pct) pct.textContent = "40% Complete";

    // Step 3 finishes -> Step 4 starts
    setTimeout(() => {
      step3.className = "p-step-item done";
      step3.querySelector(".step-check").textContent = "✓";
      step4.className = "p-step-item in-progress";
      step4.querySelector(".step-check").innerHTML = '<div class="mini-spinner"></div>';
      if (bar) bar.style.width = "72%";
      if (pct) pct.textContent = "72% Complete";
    }, 1000);

    // Step 4 finishes -> Step 5 starts
    setTimeout(() => {
      step4.className = "p-step-item done";
      step4.querySelector(".step-check").textContent = "✓";
      step5.className = "p-step-item in-progress";
      step5.querySelector(".step-check").innerHTML = '<div class="mini-spinner"></div>';
      if (bar) bar.style.width = "90%";
      if (pct) pct.textContent = "90% Complete";
    }, 2000);

    // Step 5 finishes -> Complete
    setTimeout(() => {
      step5.className = "p-step-item done";
      step5.querySelector(".step-check").textContent = "✓";
      if (bar) bar.style.width = "100%";
      if (pct) pct.textContent = "100% Complete";

      if (window.elaraAudio) {
        window.elaraAudio.playSuccessTriageTone();
      }

      setTimeout(() => {
        this.navigateTo("symptom-summary");
      }, 700);
    }, 2800);
  }

  /* -------------------------------------------------------------
     RESOLVING MISSING CLINICAL INFORMATION (CRITICAL REQUIREMENT)
     ------------------------------------------------------------- */
  resolveMissingInfo(type) {
    if (type === "temp") {
      const btn = document.getElementById("btnAddTemp");
      const stat = document.getElementById("tempValueStatus");
      const display = document.getElementById("summaryTempDisplay");
      if (btn) {
        btn.textContent = "✓ Added: 102.4 °F";
        btn.classList.add("resolved");
      }
      if (stat) stat.innerHTML = "<b>Verified:</b> 102.4 °F recorded via digital thermometry.";
      if (display) display.textContent = "102.4 °F (Febrile, recorded)";
      ELARA_DATA.activePatient.missingInfo.temperature.resolved = true;
      this.showToast("Added body temperature reading (102.4°F)", "🌡️");
    } else if (type === "med") {
      const btn = document.getElementById("btnAddMed");
      const stat = document.getElementById("medValueStatus");
      const display = document.getElementById("summaryMedDisplay");
      if (btn) {
        btn.textContent = "✓ Logged: Paracetamol";
        btn.classList.add("resolved");
      }
      if (stat) stat.innerHTML = "<b>Verified:</b> Paracetamol 650mg taken 4 hours ago. NKDA.";
      if (display) display.textContent = "Paracetamol 650mg taken (4h ago)";
      ELARA_DATA.activePatient.missingInfo.medications.resolved = true;
      this.showToast("Logged antipyretic medication history", "💊");
    } else if (type === "flags") {
      const btn = document.getElementById("btnAddFlags");
      const stat = document.getElementById("flagValueStatus");
      if (btn) {
        btn.textContent = "✓ Verified None";
        btn.classList.add("resolved");
      }
      if (stat) stat.innerHTML = "<b>Verified:</b> No neck stiffness, no petechial rash.";
      ELARA_DATA.activePatient.missingInfo.redFlags.resolved = true;
      this.showToast("Cleared red flag danger signs", "🛡️");
    }

    // Re-evaluate in engine
    const res = window.elaraEngine.evaluateTriage(ELARA_DATA.activePatient);
    const synthEl = document.getElementById("aiSynthesisText");
    if (synthEl) synthEl.textContent = res.synthesisParagraph;
  }

  /* -------------------------------------------------------------
     TRIAGE SUMMARY -> SEND TO HEALTHCARE WORKER
     ------------------------------------------------------------- */
  sendToHealthcareWorker() {
    this.showToast("Triage Note dispatched to Sister Priya's queue!", "🚀");
    if (window.elaraAudio) window.elaraAudio.playSuccessTriageTone();

    setTimeout(() => {
      this.setRole("nurse");
    }, 700);
  }

  /* -------------------------------------------------------------
     HEALTHCARE WORKER QUEUE & CLINICAL REVIEW
     ------------------------------------------------------------- */
  renderQueueList(filter = "all") {
    const container = document.getElementById("patientQueueContainer");
    if (!container) return;

    const list = ELARA_DATA.queue.filter(p => filter === "all" || p.priority === filter);

    container.innerHTML = list.map(p => `
      <div class="patient-queue-card ${p.priority}-border" onclick="openReviewModal('${p.id}')">
        <div class="q-card-top">
          <div class="q-patient-info">
            <span class="q-badge ${p.priority}">${p.priorityLabel}</span>
            <strong class="q-name">Patient ${p.id}: ${p.name} (${p.age} ${p.gender})</strong>
          </div>
          <span class="q-wait-time">⏱️ Waiting: ${p.waitingTime}</span>
        </div>
        <div class="q-symptoms-snippet">
          <strong>Symptoms:</strong> ${p.symptoms}
        </div>
        <div class="q-meta-badges">
          ${p.tags.map(t => `<span class="q-badge-mini">${t}</span>`).join("")}
        </div>
        <div class="q-card-footer">
          <span class="q-assigned">Desk: ${p.desk}</span>
          <button class="btn-review-mini" onclick="event.stopPropagation(); openReviewModal('${p.id}')">Review Case →</button>
        </div>
      </div>
    `).join("");
  }

  filterQueue(urgency) {
    document.querySelectorAll(".q-filter").forEach(f => f.classList.remove("active"));
    if (event?.target) event.target.classList.add("active");
    this.renderQueueList(urgency);
  }

  openReviewModal(patientId) {
    this.navigateTo("hw-review");
    this.showToast(`Loaded clinical chart for Patient ${patientId}`, "📋");
  }

  setWorkerDecision(decision) {
    this.selectedWorkerDecision = decision;
    document.querySelectorAll(".radio-label-tile").forEach(t => t.classList.remove("active"));
    if (event?.currentTarget) event.currentTarget.classList.add("active");
    this.showToast(`Worker triage priority set to: ${decision.toUpperCase()}`, "👩⚕️");
  }

  appendNote(text) {
    const area = document.getElementById("nurseNotes");
    if (area) {
      area.value += " " + text;
      this.showToast("Appended clinical template note", "✏️");
    }
  }

  completeRoutineQueue() {
    this.showToast("Case marked routine & sent to General OPD Consultation", "✅");
    this.navigateTo("hw-dashboard");
  }

  /* -------------------------------------------------------------
     REFERRAL PREPARATION & HANDOVER
     ------------------------------------------------------------- */
  sendReferralNow() {
    const dept = document.getElementById("referralDept")?.value || "gp";
    const refToken = "REF-" + Math.floor(1000 + Math.random() * 9000);

    if (window.elaraAudio) window.elaraAudio.playSuccessTriageTone();

    alert(
      `🎉 Digital Referral Handover Successful!\n\n` +
      `Token ID: ${refToken}\n` +
      `Patient: Sunita Devi (P-1042)\n` +
      `Referred to: Duty MO (Dr. Ananya Roy - Room 104)\n` +
      `Status: Immediate Priority Handover Recorded in ABDM EMR.`
    );

    this.showToast(`Referral token ${refToken} sent to Doctor console!`, "📨");
    this.navigateTo("facility-admin");
  }

  /* -------------------------------------------------------------
     FACILITY ADMIN & AUDIT
     ------------------------------------------------------------- */
  exportFacilityReport() {
    this.showToast("Exporting ABDM FHIR Triage Audit Report (PDF/JSON)...", "📊");
    setTimeout(() => {
      alert("📄 ABDM Triage Report Generated for Sharda PHC (128 cases, 91.8% AI concordance). Ready for download.");
    }, 500);
  }

  openAuditModal() {
    this.openArchDrawer();
  }

  refreshQueue() {
    this.renderQueueList();
    this.showToast("Live Queue synced with ABDM registry", "🔄");
  }

  /* -------------------------------------------------------------
     DUAL WORKSTATION VIEW (DESKTOP MODE)
     ------------------------------------------------------------- */
  renderWorkstationViews() {
    const leftSlot = document.getElementById("wsQueueSlot");
    const rightSlot = document.getElementById("wsDetailSlot");
    const hwReviewContent = document.getElementById("screen-hw-review")?.innerHTML;

    if (leftSlot) {
      leftSlot.innerHTML = `
        <div class="queue-stat-cards" style="margin-bottom:12px;">
          <div class="stat-card urgent"><div class="stat-num">03</div><div class="stat-lbl">🔴 Urgent</div></div>
          <div class="stat-card priority"><div class="stat-num">08</div><div class="stat-lbl">🟡 Priority</div></div>
          <div class="stat-card routine"><div class="stat-num">17</div><div class="stat-lbl">🟢 Routine</div></div>
        </div>
        <div class="patient-queue-list">
          ${ELARA_DATA.queue.map(p => `
            <div class="patient-queue-card ${p.priority}-border" onclick="openReviewModal('${p.id}')">
              <div class="q-card-top">
                <span class="q-badge ${p.priority}">${p.priorityLabel}</span>
                <strong class="q-name">${p.id}: ${p.name} (${p.age} ${p.gender})</strong>
                <span class="q-wait-time">⏱️ ${p.waitingTime}</span>
              </div>
              <div class="q-symptoms-snippet">${p.symptoms}</div>
            </div>
          `).join("")}
        </div>
      `;
    }

    if (rightSlot && hwReviewContent) {
      rightSlot.innerHTML = hwReviewContent;
    }
  }

  /* -------------------------------------------------------------
     MULTILINGUAL LOCALIZATION
     ------------------------------------------------------------- */
  setLanguage(lang) {
    this.currentLanguage = lang;
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
    this.applyLanguage();
    this.showToast(`Switched language to: ${lang === 'hi' ? 'हिंदी (Hindi)' : (lang === 'od' ? 'ଓଡ଼ିଆ (Odia)' : 'English')}`, "🌐");
  }

  applyLanguage() {
    const dict = ELARA_DATA.i18n[this.currentLanguage] || ELARA_DATA.i18n.en;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
  }

  /* -------------------------------------------------------------
     ARCHITECTURE DRAWER MODAL & THEME
     ------------------------------------------------------------- */
  openArchDrawer() {
    const modal = document.getElementById("archModal");
    if (modal) modal.classList.add("active");
  }

  closeArchDrawer(e) {
    if (e && e.target !== e.currentTarget && !e.target.classList.contains("drawer-close-btn")) return;
    const modal = document.getElementById("archModal");
    if (modal) modal.classList.remove("active");
  }

  toggleTheme() {
    document.body.classList.toggle("theme-dark");
    const isDark = document.body.classList.contains("theme-dark");
    this.showToast(isDark ? "Dark High-Contrast Mode Activated" : "Light Mode Activated", "🌓");
  }

  showToast(message, icon = "✨") {
    const toast = document.getElementById("toastNotification");
    const iconEl = document.getElementById("toastIcon");
    const msgEl = document.getElementById("toastMsg");

    if (!toast || !msgEl) return;
    if (iconEl) iconEl.textContent = icon;
    msgEl.textContent = message;

    toast.classList.add("show");
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
}

// Instantiate on load
window.elaraApp = new ElaraApp();
window.addEventListener("DOMContentLoaded", () => {
  window.elaraApp.init();
});
