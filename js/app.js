/**
 * ELARA 2.0 - MAIN APPLICATION CONTROLLER
 * Fully functional clinical web application controller managing:
 * - Screen transitions with universal history stack & goBack()
 * - Role portals (Patient, Healthcare Worker, Admin)
 * - Multilingual reactivity across all 23 Indian languages
 * - Authentication (Sign Up, Login, Forgot Password, Logout, Session Persistence)
 * - Universal Search & Voice Search (STT)
 * - Jan Aushadhi Generic Pharmacy catalog, cart & live order tracking
 * - Emergency 108 SOS dispatch & Web Audio siren
 * - Patient Profile & ABHA Card persistence
 * - Clinical Triage Engine & Nurse decision review
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
    this.navHistory = [];
    this.searchActiveFilter = "all";

    // Bind all global helper functions for DOM onclick handlers
    window.goToScreen = (id) => this.navigateTo(id);
    window.goBack = () => this.goBack();
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
    window.toggleLeftMenu = () => this.toggleLeftMenu();
    window.closeLeftMenu = () => this.closeLeftMenu();
    window.setLoginRole = (role, btn) => this.setLoginRole(role, btn);
    window.loginAsPatient = () => this.loginAsPatient();
    window.loginAsNurse = () => this.loginAsNurse();
    window.loginAsAdmin = () => this.loginAsAdmin();
    window.logoutUser = () => this.logoutUser();
    window.toggleTheme = () => this.toggleTheme();
    window.showToast = (msg, icon) => this.showToast(msg, icon);

    // Search helpers
    window.performSearch = (q) => this.performSearch(q);
    window.filterSearch = (cat) => this.filterSearch(cat);
    window.setSearchQuery = (q) => this.setSearchQuery(q);

    // Profile & Settings helpers
    window.savePatientProfile = () => this.savePatientProfile();
    window.loadProfileIntoForm = () => this.loadProfileIntoForm();
    window.setNurseWorkstation = (st) => this.setNurseWorkstation(st);
    window.requestTollFreeCallback = () => this.requestTollFreeCallback();
    window.toggleAuthInputMode = () => this.toggleAuthInputMode();
    window.saveNotificationPref = (k, v) => this.saveNotificationPref(k, v);
    window.showAbdmStatus = () => this.showAbdmStatus();
    window.callRider = (phone) => this.callRider(phone);
    window.advanceDeliveryStep = () => this.advanceDeliveryStep();
    window.copyAbhaId = () => this.copyAbhaId();
    window.downloadAbhaCard = () => this.downloadAbhaCard();

    // Modals
    window.openSignUpModal = () => this.openSignUpModal();
    window.closeSignUpModal = () => this.closeSignUpModal();
    window.handleSignUpSubmit = (e) => this.handleSignUpSubmit(e);
    window.openForgotPasswordModal = () => this.openForgotPasswordModal();
    window.closeForgotPasswordModal = () => this.closeForgotPasswordModal();
    window.handleForgotPasswordSubmit = (e) => this.handleForgotPasswordSubmit(e);
  }

  init() {
    this.updateClock();
    setInterval(() => this.updateClock(), 30000);
    this.renderQueueList();
    this.renderWorkstationViews();
    this.setupStoryboardPreviews();

    // Initialize Theme
    const savedTheme = (window.ElaraStorage && window.ElaraStorage.getTheme()) || "light";
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(savedTheme === "dark" ? "theme-dark" : "theme-light");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Initialize Font Scale
    if (window.ElaraVoice && window.ElaraStorage) {
      window.ElaraVoice.setFontScale(window.ElaraStorage.getFontScale() || "normal");
    }

    // Initialize Language from Persistent Storage
    if (window.ElaraI18n) {
      this.currentLanguage = window.ElaraI18n.getCurrentLanguage();
      window.ElaraI18n.applyToDOM();
    }

    // Initialize Pharmacy Catalog & Cart
    if (window.ElaraPharmacy) {
      window.ElaraPharmacy.updateCartBadges();
      window.ElaraPharmacy.renderCatalogGrid();
    }

    // Initialize Session Status
    if (window.ElaraStorage) {
      const session = window.ElaraStorage.getSession();
      if (session && session.isAuthenticated && session.role) {
        this.currentRole = session.role;
        const roleSel = document.getElementById("topRoleSelector");
        if (roleSel) roleSel.value = session.role;
      }
    }

    // Close drawers on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeLeftMenu();
        this.closeArchDrawer();
        if (window.ElaraPharmacy) {
          window.ElaraPharmacy.closeDetailModal();
          window.ElaraPharmacy.closeCartModal();
          window.ElaraPharmacy.closeCheckoutModal();
        }
        this.closeSignUpModal();
        this.closeForgotPasswordModal();
      }
    });

    // Populate search with default view
    this.performSearch("");
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
     SCREEN & NAVIGATION MANAGEMENT (WITH HISTORY STACK)
     ------------------------------------------------------------- */
  navigateTo(screenId, pushHistory = true) {
    if (pushHistory && this.currentScreen && this.currentScreen !== screenId) {
      this.navHistory.push(this.currentScreen);
    }

    // Hide all screens
    const screens = document.querySelectorAll(".screen-view");
    screens.forEach(s => s.classList.remove("active"));

    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
      target.classList.add("active");
      this.currentScreen = screenId;
    }

    // Update global back button visibility: hidden on splash, visible on all other screens
    const backBtn = document.getElementById("globalBackBtn");
    if (backBtn) {
      if (screenId === "splash") {
        backBtn.classList.add("hidden");
        backBtn.classList.remove("inline-flex");
      } else {
        backBtn.classList.remove("hidden");
        backBtn.classList.add("inline-flex");
      }
    }

    // Update menu step nav buttons
    const navBtns = document.querySelectorAll(".step-nav-btn");
    navBtns.forEach(b => {
      const match = b.getAttribute("onclick")?.includes(`'${screenId}'`);
      b.classList.toggle("bg-teal-100", !!match);
      b.classList.toggle("dark:bg-teal-900/60", !!match);
      b.classList.toggle("border-teal-400", !!match);
      b.classList.toggle("text-teal-950", !!match);
      b.classList.toggle("font-bold", !!match);
    });

    // Screen specific dynamic data loaders
    if (screenId === "medicines" && window.ElaraPharmacy) {
      window.ElaraPharmacy.renderCatalogGrid();
    } else if (screenId === "order-tracking" && window.ElaraPharmacy) {
      window.ElaraPharmacy.renderOrderTracking();
    } else if (screenId === "profile") {
      this.loadProfileIntoForm();
    } else if (screenId === "search") {
      const searchInput = document.getElementById("searchQueryInput");
      this.performSearch(searchInput ? searchInput.value : "");
    } else if (screenId === "settings") {
      this.loadSettingsIntoUI();
    }

    if (window.ElaraI18n && target) {
      window.ElaraI18n.applyToDOM(target);
    }

    // Auto-scroll phone content to top
    const scrollBodies = document.querySelectorAll(".screen-scrollable-body");
    scrollBodies.forEach(sb => sb.scrollTop = 0);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Sync workstation active title if viewing P-1042
    if (screenId === "hw-review" || screenId === "referral-prep") {
      const wsTitle = document.getElementById("wsActiveCaseTitle");
      if (wsTitle) wsTitle.textContent = "Patient P-1042: Sunita Devi (42 F) - Review Active";
    }
  }

  goBack() {
    const prev = this.navHistory.pop() || (this.currentRole === "patient" ? "patient-home" : "splash");
    this.navigateTo(prev, false);
  }

  setRole(role) {
    this.currentRole = role;
    const topSelector = document.getElementById("topRoleSelector");
    if (topSelector) topSelector.value = role;

    if (window.ElaraStorage) {
      window.ElaraStorage.saveSession({ role });
    }

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
      grid.style.transform = `scale(1)`;
    }
  }

  openScreenFromBoard(screenId) {
    this.setViewMode("mobile");
    this.navigateTo(screenId);
  }

  /* -------------------------------------------------------------
     AUTHENTICATION & LOGIN PORTAL HANDLERS
     ------------------------------------------------------------- */
  setLoginRole(role, btn) {
    // Switch tabs
    document.querySelectorAll(".login-tab-btn").forEach(b => {
      b.classList.remove("active", "bg-white", "text-teal-900", "shadow-sm");
      b.classList.add("text-slate-600");
    });
    if (btn) {
      btn.classList.add("active", "bg-white", "text-teal-900", "shadow-sm");
      btn.classList.remove("text-slate-600");
    }

    const patientForm = document.getElementById("patientLoginForm");
    const nurseForm = document.getElementById("nurseLoginForm");
    const adminForm = document.getElementById("adminLoginForm");

    if (patientForm) patientForm.classList.toggle("hidden", role !== "patient");
    if (nurseForm) nurseForm.classList.toggle("hidden", role !== "nurse");
    if (adminForm) adminForm.classList.toggle("hidden", role !== "admin");
  }

  async loginAsPatient() {
    const authInput = document.getElementById("authInput");
    const passwordInput = document.getElementById("patientLoginPassword");
    const errBox = document.getElementById("patientLoginError");
    const errText = document.getElementById("patientLoginErrorText");
    const submitBtn = document.getElementById("patientLoginSubmitBtn");

    const identifier = authInput ? authInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value.trim() : "";

    // Input Validation
    if (!identifier) {
      if (errBox) errBox.classList.remove("hidden");
      if (errText) errText.textContent = "Please enter your ABHA ID or 10-digit mobile number";
      if (authInput) authInput.focus();
      return;
    }

    if (errBox) errBox.classList.add("hidden");

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="animate-spin mr-2">⏳</span> Verifying Credentials...`;
    }

    try {
      const res = await window.ElaraAPI.login(identifier, password);
      if (res.success) {
        this.currentRole = "patient";
        const topSelector = document.getElementById("topRoleSelector");
        if (topSelector) topSelector.value = "patient";

        this.showToast(`Welcome, ${res.user ? res.user.name : "Sunita Devi"}! Triage Portal ready.`, "✓");
        this.navigateTo("patient-home");
      } else {
        if (errBox) errBox.classList.remove("hidden");
        if (errText) errText.textContent = res.error || "Login verification failed. Please retry.";
      }
    } catch (e) {
      this.navigateTo("patient-home");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Sign In as Patient & Continue to Triage</span><span class="material-symbols-outlined text-[18px]">arrow_forward</span>`;
      }
    }
  }

  loginAsNurse() {
    this.currentRole = "nurse";
    const topSelector = document.getElementById("topRoleSelector");
    if (topSelector) topSelector.value = "nurse";
    if (window.ElaraStorage) {
      window.ElaraStorage.saveSession({
        isAuthenticated: true,
        role: "nurse",
        user: { name: "Sister Priya Sharma", role: "nurse" }
      });
    }
    this.showToast("Signed in as Healthcare Worker (Sister Priya)", "👩⚕️");
    this.navigateTo("hw-dashboard");
  }

  loginAsAdmin() {
    this.currentRole = "admin";
    const topSelector = document.getElementById("topRoleSelector");
    if (topSelector) topSelector.value = "admin";
    if (window.ElaraStorage) {
      window.ElaraStorage.saveSession({
        isAuthenticated: true,
        role: "admin",
        user: { name: "Dr. Ananya Roy", role: "admin" }
      });
    }
    this.showToast("Signed in as Medical Superintendent (Dr. Roy)", "🏥");
    this.navigateTo("facility-admin");
  }

  logoutUser() {
    if (window.ElaraStorage) {
      window.ElaraStorage.clearSession();
    }
    this.currentRole = "patient";
    this.navHistory = [];
    this.navigateTo("splash", false);
    this.showToast("Logged out of ELARA session successfully", "ℹ️");
  }

  // --- Registration / Sign Up Modal ---
  openSignUpModal() {
    const modal = document.getElementById("signUpModal");
    if (modal) modal.classList.remove("hidden");
  }

  closeSignUpModal() {
    const modal = document.getElementById("signUpModal");
    if (modal) modal.classList.add("hidden");
  }

  async handleSignUpSubmit(event) {
    if (event) event.preventDefault();
    const name = document.getElementById("signUpName")?.value.trim();
    const phone = document.getElementById("signUpPhone")?.value.trim();
    const abha = document.getElementById("signUpAbha")?.value.trim();
    const password = document.getElementById("signUpPassword")?.value;
    const confirmPassword = document.getElementById("signUpConfirmPassword")?.value;
    const errBox = document.getElementById("signUpError");

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone || !phoneRegex.test(phone)) {
      if (errBox) {
        errBox.textContent = "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)";
        errBox.classList.remove("hidden");
      }
      return;
    }

    if (password !== confirmPassword) {
      if (errBox) {
        errBox.textContent = "Passwords do not match. Please re-enter.";
        errBox.classList.remove("hidden");
      }
      return;
    }

    if (errBox) errBox.classList.add("hidden");

    const res = await window.ElaraAPI.signup({ name, phone, abhaId: abha, password });
    if (res.success) {
      this.closeSignUpModal();
      this.showToast(`Account created for ${name}! Logged in.`, "✅");
      this.navigateTo("patient-home");
    } else {
      if (errBox) {
        errBox.textContent = res.error || "Signup failed. Please retry.";
        errBox.classList.remove("hidden");
      }
    }
  }

  // --- Forgot Password Modal ---
  openForgotPasswordModal() {
    const modal = document.getElementById("forgotPasswordModal");
    if (modal) modal.classList.remove("hidden");
  }

  closeForgotPasswordModal() {
    const modal = document.getElementById("forgotPasswordModal");
    if (modal) modal.classList.add("hidden");
  }

  async handleForgotPasswordSubmit(event) {
    if (event) event.preventDefault();
    const phone = document.getElementById("forgotPhone")?.value.trim();
    const otp = document.getElementById("forgotOtp")?.value.trim();
    const newPassword = document.getElementById("forgotNewPassword")?.value;
    const errBox = document.getElementById("forgotError");

    if (otp !== "1234") {
      if (errBox) {
        errBox.textContent = "Invalid OTP code. Please enter demo OTP: 1234";
        errBox.classList.remove("hidden");
      }
      return;
    }

    if (errBox) errBox.classList.add("hidden");
    const res = await window.ElaraAPI.forgotPassword(phone, otp, newPassword);
    if (res.success) {
      this.closeForgotPasswordModal();
      this.showToast("Password reset successful. Please sign in.", "🔑");
    } else {
      if (errBox) {
        errBox.textContent = res.error || "Password reset failed";
        errBox.classList.remove("hidden");
      }
    }
  }

  /* -------------------------------------------------------------
     UNIVERSAL SEARCH & FILTER ENGINE
     ------------------------------------------------------------- */
  setSearchQuery(query) {
    const searchInput = document.getElementById("searchQueryInput");
    if (searchInput) searchInput.value = query;
    this.performSearch(query);
  }

  filterSearch(category) {
    this.searchActiveFilter = category;
    const pills = document.querySelectorAll(".search-filter-pill");
    pills.forEach(p => {
      if (p.getAttribute("data-filter") === category) {
        p.classList.add("active", "bg-teal-700", "text-white");
        p.classList.remove("bg-slate-100", "text-slate-700");
      } else {
        p.classList.remove("active", "bg-teal-700", "text-white");
        p.classList.add("bg-slate-100", "text-slate-700");
      }
    });
    const searchInput = document.getElementById("searchQueryInput");
    this.performSearch(searchInput ? searchInput.value : "");
  }

  performSearch(query = "") {
    const container = document.getElementById("searchResultsContainer");
    if (!container) return;

    const q = query.toLowerCase().trim();
    const filter = this.searchActiveFilter;
    const results = [];

    // 1. Search Medicines
    if (filter === "all" || filter === "medicines") {
      const medicines = window.ElaraPharmacy ? window.ElaraPharmacy.getAll() : [];
      medicines.forEach(med => {
        if (!q || med.name.toLowerCase().includes(q) || med.genericName.toLowerCase().includes(q) || med.indication.toLowerCase().includes(q)) {
          results.push({
            type: "medicine",
            id: med.id,
            title: med.name,
            subtitle: med.genericName,
            meta: `Price: ₹${med.price} (MRP: ₹${med.commercialMrp} • ${med.savingsPct}% OFF)`,
            actionText: "Add to Cart",
            action: `window.ElaraPharmacy.addToCart('${med.id}', 1)`,
            icon: "medication"
          });
        }
      });
    }

    // 2. Search Symptoms & Triage Presets
    if (filter === "all" || filter === "symptoms") {
      const symptomList = [
        { name: "Fever & Chills", desc: "Acute febrile illness, shivering, body heat", urgency: "Priority" },
        { name: "Severe Throbbing Headache", desc: "Frontal/temporal cephalea, light sensitivity", urgency: "Priority" },
        { name: "Acute Abdominal Pain", desc: "Lower quadrant guarding, nausea, colic", urgency: "Urgent" },
        { name: "Chest Tightness / Shortness of Breath", desc: "Exertional dyspnea, pressure on sternum", urgency: "Urgent" },
        { name: "Persistent Dry Cough", desc: "Pharyngeal tickle, post-viral convalescence", urgency: "Routine" }
      ];

      symptomList.forEach(s => {
        if (!q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)) {
          results.push({
            type: "symptom",
            title: s.name,
            subtitle: s.desc,
            meta: `Urgency Classification: ${s.urgency}`,
            actionText: "Start Triage",
            action: `window.startTriageMethod('voice')`,
            icon: "psychology"
          });
        }
      });
    }

    // 3. Search Orders
    if (filter === "all" || filter === "orders") {
      const orders = window.ElaraStorage ? window.ElaraStorage.getOrders() : [];
      orders.forEach(ord => {
        if (!q || ord.id.toLowerCase().includes(q) || ord.status.toLowerCase().includes(q)) {
          results.push({
            type: "order",
            id: ord.id,
            title: `Order #${ord.id}`,
            subtitle: `Status: ${ord.status} • Total: ₹${ord.total}`,
            meta: `Placed: ${ord.date} • Delivery ETA: ${ord.eta}`,
            actionText: "Track Live",
            action: `goToScreen('order-tracking'); window.ElaraPharmacy.renderOrderTracking('${ord.id}')`,
            icon: "local_shipping"
          });
        }
      });
    }

    // Render results
    if (results.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
          <span class="material-symbols-outlined text-4xl text-slate-300">search_off</span>
          <p class="text-sm font-semibold mt-2">No matching results found for "${query}"</p>
          <span class="text-xs text-slate-400">Try searching for Paracetamol, Fever, ORS, or Order ID</span>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="text-xs font-bold text-slate-500 uppercase px-1">Found ${results.length} Results:</div>
      ${results.map(r => `
        <div class="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-teal-300 hover:shadow-xs transition-all">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[22px]">${r.icon}</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-sm text-slate-900">${r.title}</h4>
                <span class="text-[10px] font-bold uppercase px-2 py-0.2 rounded-full ${r.type==='medicine' ? 'bg-emerald-50 text-emerald-800' : (r.type==='symptom' ? 'bg-amber-50 text-amber-800' : 'bg-sky-50 text-sky-800')}">
                  ${r.type}
                </span>
              </div>
              <p class="text-xs text-slate-600 mt-0.5">${r.subtitle}</p>
              <span class="text-[11px] text-teal-800 font-semibold block mt-1">${r.meta}</span>
            </div>
          </div>
          <button onclick="${r.action}" class="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs">
            ${r.actionText}
          </button>
        </div>
      `).join("")}
    `;

    if (window.ElaraI18n) {
      window.ElaraI18n.applyToDOM(container);
    }
  }

  /* -------------------------------------------------------------
     PATIENT PROFILE & ABHA HEALTH RECORD
     ------------------------------------------------------------- */
  loadProfileIntoForm() {
    if (!window.ElaraStorage) return;
    const profile = window.ElaraStorage.getProfile();

    const nameInput = document.getElementById("profileName");
    const phoneInput = document.getElementById("profilePhone");
    const abhaInput = document.getElementById("profileAbha");
    const ageInput = document.getElementById("profileAge");
    const bloodSelect = document.getElementById("profileBloodGroup");
    const addressInput = document.getElementById("profileAddress");
    const pincodeInput = document.getElementById("profilePincode");
    const stateInput = document.getElementById("profileState");
    const emgNameInput = document.getElementById("profileEmgName");
    const emgPhoneInput = document.getElementById("profileEmgPhone");
    const allergiesInput = document.getElementById("profileAllergies");

    if (nameInput) nameInput.value = profile.name || "";
    if (phoneInput) phoneInput.value = profile.phone || "";
    if (abhaInput) abhaInput.value = profile.abhaId || "";
    if (ageInput) ageInput.value = profile.age || 42;
    if (bloodSelect) bloodSelect.value = profile.bloodGroup || "B+";
    if (addressInput) addressInput.value = profile.address || "";
    if (pincodeInput) pincodeInput.value = profile.pincode || "";
    if (stateInput) stateInput.value = profile.state || "Odisha";
    if (emgNameInput) emgNameInput.value = (profile.emergencyContact && profile.emergencyContact.name) || "";
    if (emgPhoneInput) emgPhoneInput.value = (profile.emergencyContact && profile.emergencyContact.phone) || "";
    if (allergiesInput) allergiesInput.value = (profile.allergies && profile.allergies.join(", ")) || "";

    // Update ABHA card preview
    const abhaCardName = document.getElementById("abhaCardName");
    const abhaCardId = document.getElementById("abhaCardId");
    const abhaCardAddress = document.getElementById("abhaCardAddress");
    const abhaCardBlood = document.getElementById("abhaCardBlood");
    const abhaCardYob = document.getElementById("abhaCardYob");

    if (abhaCardName) abhaCardName.textContent = profile.name || "Sunita Devi";
    if (abhaCardId) abhaCardId.textContent = profile.abhaId || "91-4820-1928-3341";
    if (abhaCardAddress) abhaCardAddress.textContent = profile.abhaAddress || "sunitadevi@abdm";
    if (abhaCardBlood) abhaCardBlood.textContent = profile.bloodGroup || "B+";
    if (abhaCardYob) abhaCardYob.textContent = profile.dob ? profile.dob.split("/")[2] : "1982";
  }

  async savePatientProfile() {
    const name = document.getElementById("profileName")?.value.trim();
    const phone = document.getElementById("profilePhone")?.value.trim();
    const abhaId = document.getElementById("profileAbha")?.value.trim();
    const age = parseInt(document.getElementById("profileAge")?.value || "42", 10);
    const bloodGroup = document.getElementById("profileBloodGroup")?.value;
    const address = document.getElementById("profileAddress")?.value.trim();
    const pincode = document.getElementById("profilePincode")?.value.trim();
    const state = document.getElementById("profileState")?.value.trim();
    const emgName = document.getElementById("profileEmgName")?.value.trim();
    const emgPhone = document.getElementById("profileEmgPhone")?.value.trim();
    const allergiesStr = document.getElementById("profileAllergies")?.value.trim();

    // Validation
    if (!name) {
      alert("Please enter patient name");
      return;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone || !phoneRegex.test(phone.replace(/\D/g, "").slice(-10))) {
      alert("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    const payload = {
      name,
      phone,
      abhaId,
      age,
      bloodGroup,
      address,
      pincode,
      state,
      emergencyContact: { name: emgName, phone: emgPhone },
      allergies: allergiesStr ? allergiesStr.split(",").map(s => s.trim()) : []
    };

    const saveBtn = document.getElementById("saveProfileBtn");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `<span class="animate-spin mr-1">⏳</span> Syncing ABDM...`;
    }

    try {
      await window.ElaraAPI.updateProfile(payload);
      this.loadProfileIntoForm();
      this.showToast("ABHA Profile saved & synced with ABDM Registry", "✓");
    } catch (e) {
      this.showToast("Profile saved locally", "ℹ️");
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `Save & Sync Profile`;
      }
    }
  }

  loadSettingsIntoUI() {
    if (window.ElaraI18n) {
      const badge = document.getElementById("settingsCurrentLangBadge");
      const meta = window.ElaraI18n.getCurrentLanguageMeta();
      if (badge) badge.textContent = `Active: ${meta.nativeName} (${meta.name})`;

      const activeLang = window.ElaraI18n.getCurrentLanguage();
      document.querySelectorAll("#screen-settings .lang-btn").forEach(btn => {
        const isCurrent = btn.dataset.lang === activeLang;
        btn.classList.toggle("border-teal-600", isCurrent);
        btn.classList.toggle("bg-teal-50", isCurrent);
        btn.classList.toggle("dark:bg-teal-900/50", isCurrent);
      });
    }

    if (window.ElaraStorage) {
      const speed = window.ElaraStorage.getTtsSpeed() || 1.0;
      const speedRange = document.getElementById("ttsSpeedRange");
      const speedVal = document.getElementById("ttsSpeedVal");
      if (speedRange) speedRange.value = speed;
      if (speedVal) speedVal.textContent = speed + "x";

      const scale = window.ElaraStorage.getFontScale() || "normal";
      document.querySelectorAll(".font-scale-btn").forEach(btn => {
        const match = btn.getAttribute("onclick")?.includes(`'${scale}'`);
        btn.classList.toggle("border-teal-600", !!match);
        btn.classList.toggle("bg-teal-100", !!match);
      });

      const prefs = window.ElaraStorage.getNotificationPrefs();
      const sms = document.getElementById("prefSms");
      const wa = document.getElementById("prefWhatsapp");
      const abdm = document.getElementById("prefAbdm");
      const sound = document.getElementById("prefSound");
      if (sms) sms.checked = !!prefs.smsAlerts;
      if (wa) wa.checked = !!prefs.whatsappUpdates;
      if (abdm) abdm.checked = !!prefs.abdmSync;
      if (sound) sound.checked = !!prefs.soundAlerts;
    }
  }

  saveNotificationPref(key, checked) {
    if (!window.ElaraStorage) return;
    const prefs = window.ElaraStorage.getNotificationPrefs();
    prefs[key] = checked;
    window.ElaraStorage.saveNotificationPrefs(prefs);
    if (window.ElaraAPI) {
      window.ElaraAPI.put("/api/settings", { notifications: prefs }).catch(() => {});
    }
    const names = {
      smsAlerts: "SMS OPD Tokens",
      whatsappUpdates: "WhatsApp Updates",
      abdmSync: "ABDM Health Locker Sync",
      soundAlerts: "Critical Siren & Sound"
    };
    this.showToast(`${names[key] || key} turned ${checked ? "ON" : "OFF"}`, checked ? "🔔" : "🔕");
  }

  /* -------------------------------------------------------------
     MULTILINGUAL LOCALIZATION (23 LANGUAGES)
     ------------------------------------------------------------- */
  setLanguage(lang) {
    this.currentLanguage = lang;
    if (window.ElaraI18n) {
      window.ElaraI18n.setLanguage(lang);
    }
    this.loadSettingsIntoUI();
  }

  applyLanguage() {
    if (window.ElaraI18n) {
      window.ElaraI18n.applyToDOM();
    }
  }

  /* -------------------------------------------------------------
     CLINICAL TRIAGE FLOW (PRESETS, AUDIO & OCR)
     ------------------------------------------------------------- */
  selectRoleCard(el, role) {
    document.querySelectorAll(".role-select-card").forEach(c => c.classList.remove("active", "border-teal-600"));
    el.classList.add("active", "border-teal-600");
    this.selectedRole = role;
  }

  proceedFromRoleSelect() {
    if (this.selectedRole === "patient") {
      this.navigateTo("consent");
    } else if (this.selectedRole === "nurse") {
      this.setRole("nurse");
    } else if (this.selectedRole === "admin") {
      this.setRole("admin");
    }
  }

  grantConsentAndContinue() {
    this.navigateTo("patient-home");
    this.showToast("ABDM Consent Granted: Active for 24h", "🔒");
  }

  quickFillDemoPatient() {
    this.showToast("Loading Patient Sunita Devi (Odia/Hindi)...", "⚡");
    setTimeout(() => {
      this.navigateTo("multimodal-input");
      this.loadVoicePreset("fever_headache");
    }, 400);
  }

  startTriageMethod(method) {
    this.navigateTo("multimodal-input");
    this.switchInputTab(method);
  }

  switchInputTab(tab) {
    document.querySelectorAll(".input-mode-tab").forEach(t => {
      t.classList.toggle("active", t.dataset.tab === tab);
    });
    const voicePane = document.getElementById("pane-voice");
    const textPane = document.getElementById("pane-text");
    const reportPane = document.getElementById("pane-report");

    if (voicePane) voicePane.classList.toggle("hidden", tab !== "voice");
    if (textPane) textPane.classList.toggle("hidden", tab !== "text");
    if (reportPane) reportPane.classList.toggle("hidden", tab !== "report");
  }

  toggleVoiceRecording() {
    const isRecording = window.AudioSimulator && window.AudioSimulator.isRecording;
    if (isRecording) {
      window.AudioSimulator.stop();
      this.showToast("Audio recording stopped", "⏹️");
    } else {
      if (window.AudioSimulator) {
        window.AudioSimulator.start();
        this.showToast("Listening to patient voice in active dialect...", "🎙️");
      }
    }
  }

  loadVoicePreset(key) {
    const preset = ELARA_DATA.voicePresets[key];
    if (!preset) return;

    const transcriptEl = document.getElementById("voiceTranscript");
    if (transcriptEl) transcriptEl.textContent = `"${preset.transcript}"`;

    const langBadge = document.getElementById("detectedLangBadge");
    if (langBadge) langBadge.textContent = preset.lang;

    this.showToast(`Loaded preset audio: ${preset.title}`, "🎵");
  }

  toggleSymptomChip(el, symptomName) {
    el.classList.toggle("selected");
    this.showToast(`Toggled symptom: ${symptomName}`, "🩺");
  }

  setDuration(el, dur) {
    document.querySelectorAll(".duration-chip").forEach(c => c.classList.remove("selected"));
    el.classList.add("selected");
  }

  triggerReportUpload() {
    const fileInput = document.getElementById("reportFileInput");
    if (fileInput) fileInput.click();
  }

  loadSampleReport(type) {
    const rep = ELARA_DATA.sampleReports[type];
    if (!rep) return;

    const displayBox = document.getElementById("reportPreviewBox");
    if (displayBox) {
      displayBox.innerHTML = `
        <div class="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <strong class="font-bold text-teal-950 text-xs">${rep.fileName}</strong>
            <span class="text-[10px] bg-teal-200 text-teal-900 font-bold px-2 py-0.5 rounded">OCR Processed</span>
          </div>
          <div class="text-xs text-slate-700 font-mono">${rep.extractedValues}</div>
        </div>
      `;
    }
    this.showToast(`Loaded sample report: ${rep.fileName}`, "📄");
  }

  resetDemoInputs() {
    const transcriptEl = document.getElementById("voiceTranscript");
    if (transcriptEl) transcriptEl.textContent = "Press mic to speak in Odia, Hindi, or English";
    this.showToast("Inputs reset to blank state", "🔄");
  }

  startAIProcessingPipeline() {
    this.navigateTo("ai-processing");
    const steps = [
      { id: "step-whisper", text: "IndicConformer: Speech-to-Text Transcribed" },
      { id: "step-indictrans", text: "IndicTrans2: Clinical Entities Translated" },
      { id: "step-clinicalbert", text: "BioClinicalBERT: Extraction & Red-Flag Scanning" },
      { id: "step-urgency", text: "Protocol Logic: Prioritization Matrix Finalized" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const el = document.getElementById(steps[currentStep].id);
        if (el) {
          el.classList.add("completed");
          el.querySelector(".step-status").textContent = "✓ Completed";
        }
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.navigateTo("symptom-summary");
        }, 800);
      }
    }, 900);
  }

  resolveMissingInfo(type) {
    this.showToast(`Resolved missing clinical info: ${type}`, "✓");
    this.navigateTo("triage-summary");
  }

  sendToHealthcareWorker() {
    this.showToast("Triage note routed to Sister Priya (Desk 2)", "📤");
    this.navigateTo("hw-dashboard");
  }

  /* -------------------------------------------------------------
     NURSE WORKSTATION QUEUE & CLINICAL DECISION OVERRIDE
     ------------------------------------------------------------- */
  renderQueueList(urgency = "all") {
    const container = document.getElementById("patientQueueContainer");
    if (!container) return;

    let queue = ELARA_DATA.queue;
    if (urgency !== "all") {
      queue = queue.filter(p => p.priority === urgency);
    }

    container.innerHTML = queue.map(p => `
      <div class="patient-card border border-slate-200 bg-white rounded-3xl p-5 shadow-xs hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between" onclick="openReviewModal('${p.id}')">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${p.priority === 'urgent' ? 'bg-red-50 text-red-700 border border-red-200' : (p.priority === 'priority' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200')}">
              ${p.priorityLabel}
            </span>
            <span class="text-xs text-slate-400 font-medium">⏱️ Wait: ${p.waitingTime}</span>
          </div>
          <h4 class="font-display font-extrabold text-base text-slate-900">${p.name}</h4>
          <span class="text-xs text-slate-500 font-medium">${p.id} • ${p.age} Yrs / ${p.gender}</span>
          <p class="text-xs text-slate-700 mt-2 line-clamp-2">${p.symptoms}</p>
        </div>
        <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[11px] text-teal-800 font-bold">Sister Priya Review</span>
          <button class="px-3 py-1.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800">
            Examine →
          </button>
        </div>
      </div>
    `).join("");

    if (window.ElaraI18n) {
      window.ElaraI18n.applyToDOM(container);
    }
  }

  filterQueue(urgency) {
    document.querySelectorAll(".q-filter").forEach(b => {
      const match = b.getAttribute("onclick")?.includes(`'${urgency}'`);
      b.classList.toggle("active", !!match);
      b.classList.toggle("bg-teal-700", !!match);
      b.classList.toggle("text-white", !!match);
    });
    this.renderQueueList(urgency);
  }

  openReviewModal(pid) {
    this.navigateTo("hw-review");
  }

  setWorkerDecision(dec) {
    this.selectedWorkerDecision = dec;
    document.querySelectorAll(".radio-label-tile").forEach(t => t.classList.remove("active", "border-teal-600", "bg-teal-50/50"));
    const tile = document.querySelector(`.radio-label-tile[onclick*="'${dec}'"]`) || (event ? event.currentTarget : null);
    if (tile) {
      tile.classList.add("active", "border-teal-600", "bg-teal-50/50");
      const radio = tile.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    }
    this.showToast(`Clinical triage set to: ${dec.toUpperCase()}`, dec === 'urgent' ? '🔴' : dec === 'priority' ? '🟡' : '🟢');
  }

  appendNote(text) {
    const notesEl = document.getElementById("nurseNotes");
    if (notesEl) {
      notesEl.value += " " + text;
      this.showToast("Appended clinical remark", "📝");
    }
  }

  completeRoutineQueue() {
    this.showToast("Case cleared to General OPD waiting room", "✓");
    this.navigateTo("hw-dashboard");
  }

  sendReferralNow() {
    const deptSelect = document.getElementById("referralDept");
    const deptName = deptSelect ? deptSelect.options[deptSelect.selectedIndex].text : "Duty Medical Officer (Room 104)";
    const reason = document.getElementById("referralReason")?.value || "Acute febrile illness requiring physician evaluation";
    const refToken = "#REF-" + Math.floor(1000 + Math.random() * 9000);

    alert(
      `✅ ABDM Referral Token Generated: ${refToken}\n\n` +
      `Patient: Sunita Devi (P-1042)\n` +
      `Department: ${deptName}\n` +
      `Clinical Indication: ${reason}\n\n` +
      `Status: Immediate Priority Handover Recorded in ABDM EMR.`
    );
    this.showToast(`Referral token ${refToken} dispatched to Doctor!`, "📨");
    this.navigateTo("facility-admin");
  }

  exportFacilityReport() {
    this.showToast("Generating ABDM Triage & Surveillance CSV...", "📊");
    const csvRows = [
      ["Patient_ID", "Name", "Age", "Gender", "Primary_Symptom", "Triage_Urgency", "AI_Concordance", "Duty_Officer", "Time_Logged", "ABDM_Status"],
      ["P-1042", "Sunita Devi", "42", "Female", "High Fever & Headache", "Priority", "Matched (100%)", "Dr. Ananya Roy", "09:42 AM", "Synced (FHIR R4)"],
      ["P-1043", "Bikas Mohapatra", "58", "Male", "Chest Tightness & Dyspnea", "Urgent", "Matched (100%)", "Dr. Ananya Roy", "10:15 AM", "Synced (FHIR R4)"],
      ["P-1044", "Meena Pradhan", "29", "Female", "Mild Sore Throat & Rhinitis", "Routine", "Matched (100%)", "Sister Priya", "10:30 AM", "Synced (FHIR R4)"],
      ["P-1045", "Ramesh Senapati", "64", "Male", "Diabetic Foot Ulcer", "Priority", "Matched (100%)", "Dr. Ananya Roy", "10:48 AM", "Synced (FHIR R4)"]
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ABDM_Sharda_PHC_Triage_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast("Facility Report CSV Downloaded!", "✓");
  }

  setNurseWorkstation(station) {
    this.assignedWorkstation = station;
    const wsTitle = document.getElementById("wsActiveCaseTitle");
    if (wsTitle) {
      wsTitle.textContent = `Patient P-1042: Sunita Devi (42 F) - ${station}`;
    }
    this.showToast(`Assigned Workstation: ${station}`, "🏥");
  }

  requestTollFreeCallback() {
    const phone = (window.ElaraStorage && window.ElaraStorage.getProfile().phone) || "9876543210";
    this.showToast(`Tele-triage callback scheduled for +91 ${phone}`, "📞");
    setTimeout(() => {
      alert(`📞 Toll-Free Tele-Triage Callback Initiated!\n\nRegistered Phone: +91 ${phone}\nEstimated Wait Time: < 3 minutes\nAssigned Counselor: Kendrapara PHC Tele-Helpdesk (1075/104)\n\nPlease keep your line available.`);
    }, 400);
  }

  toggleAuthInputMode() {
    const input = document.getElementById("authInput");
    const label = document.getElementById("authInputLabel");
    const toggleBtn = document.getElementById("authToggleModeBtn");
    if (!input) return;
    if (this.authMode === "abha_address") {
      this.authMode = "mobile_or_id";
      if (label) label.textContent = "Mobile Number / ABHA ID";
      if (toggleBtn) toggleBtn.textContent = "Use ABHA Address (@abdm)";
      input.value = "91-4820-1928-3341";
      this.showToast("Switched to ABHA ID / Mobile Number", "🆔");
    } else {
      this.authMode = "abha_address";
      if (label) label.textContent = "ABHA Address (PHR Handle)";
      if (toggleBtn) toggleBtn.textContent = "Use Mobile / ABHA ID";
      input.value = "sunitadevi@abdm";
      this.showToast("Switched to ABHA Address (@abdm)", "🏷️");
    }
  }

  showAbdmStatus() {
    alert(
      `🏥 Ayushman Bharat Digital Mission (ABDM) Gateway Status\n\n` +
      `• Facility: Sharda PHC (Kendrapara, Odisha)\n` +
      `• Facility Code: PHC-OD-KND-04\n` +
      `• ABDM Milestone: M3 (Health Locker / FHIR Clinical Records Active)\n` +
      `• Health Information Provider (HIP): Connected (99.98% uptime)\n` +
      `• Health Information User (HIU): Connected\n` +
      `• Active Registry Patients: 128 registered today\n` +
      `• Encryption: AES-256 GCM end-to-end`
    );
  }

  callRider(phone) {
    this.showToast(`Dialing delivery rider at ${phone}...`, "📞");
    window.location.href = `tel:${phone}`;
  }

  advanceDeliveryStep() {
    const dot4 = document.getElementById("trackStepDot_4");
    const text4 = document.getElementById("trackStepText_4");
    const eta = document.getElementById("trackingEta");
    const status = document.getElementById("trackingOrderStatus");
    if (dot4) {
      dot4.classList.remove("bg-slate-200", "text-slate-600", "border-slate-300");
      dot4.classList.add("bg-emerald-600", "text-white", "border-emerald-600", "shadow-sm");
      dot4.textContent = "✓";
    }
    if (text4) {
      text4.classList.remove("text-slate-500", "font-medium");
      text4.classList.add("text-emerald-900", "font-bold");
      text4.innerHTML = `4. Delivered <span class="text-emerald-600 font-bold">✓ Just Now</span>`;
    }
    if (eta) eta.textContent = "Delivered ✓";
    if (status) status.textContent = "Handed over to Sunita Devi at Navrangpura PHC Ward 4";
    this.showToast("Order #ORD-7821 marked as Delivered!", "🎉");
  }

  copyAbhaId() {
    const idEl = document.getElementById("abhaCardId");
    const text = idEl ? idEl.textContent.trim() : "91-4820-1928-3341";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(`ABHA ID ${text} copied to clipboard!`, "📋");
      }).catch(() => {
        this.showToast(`ABHA ID: ${text}`, "📋");
      });
    } else {
      this.showToast(`ABHA ID: ${text}`, "📋");
    }
  }

  downloadAbhaCard() {
    this.showToast("Exporting Digital ABHA Health Card...", "🪪");
    window.print();
  }

  openAuditModal() {
    this.showToast("Facility audit log exported to ABDM registry.", "📋");
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
        <div class="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
          <div class="bg-red-50 p-2.5 rounded-xl border border-red-200"><b class="text-red-700 text-lg block">03</b>Urgent</div>
          <div class="bg-amber-50 p-2.5 rounded-xl border border-amber-200"><b class="text-amber-800 text-lg block">08</b>Priority</div>
          <div class="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200"><b class="text-emerald-800 text-lg block">17</b>Routine</div>
        </div>
        <div class="flex flex-col gap-2">
          ${ELARA_DATA.queue.map(p => `
            <div class="p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-teal-400" onclick="window.goToScreen('hw-review')">
              <div class="flex justify-between items-center text-xs">
                <span class="font-bold text-slate-900">${p.id}: ${p.name}</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full ${p.priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}">${p.priorityLabel}</span>
              </div>
              <div class="text-[11px] text-slate-500 mt-1 line-clamp-1">${p.symptoms}</div>
            </div>
          `).join("")}
        </div>
      `;
    }

    if (rightSlot && hwReviewContent) {
      rightSlot.innerHTML = hwReviewContent;
    }

    if (window.ElaraI18n) {
      if (leftSlot) window.ElaraI18n.applyToDOM(leftSlot);
      if (rightSlot) window.ElaraI18n.applyToDOM(rightSlot);
    }
  }

  setupStoryboardPreviews() {
    const screens = [
      "splash", "role-select", "consent", "patient-home", "multimodal-input",
      "ai-processing", "symptom-summary", "triage-summary", "hw-dashboard",
      "hw-review", "referral-prep", "facility-admin"
    ];

    screens.forEach(s => {
      const slot = document.getElementById(`sb-preview-${s}`);
      const source = document.getElementById(`screen-${s}`);
      if (slot && source) {
        slot.innerHTML = source.innerHTML;
      }
    });
  }

  /* -------------------------------------------------------------
     ARCHITECTURE DRAWER MODAL & THEME
     ------------------------------------------------------------- */
  openArchDrawer() {
    // Pipeline section removed
  }

  closeArchDrawer(e) {
    // Pipeline section removed
  }

  /* -------------------------------------------------------------
     LEFT UPPER CORNER MENU DRAWER
     ------------------------------------------------------------- */
  toggleLeftMenu() {
    const drawer = document.getElementById("leftSideMenuDrawer");
    const backdrop = document.getElementById("leftMenuBackdrop");
    if (drawer) drawer.classList.toggle("open");
    if (backdrop) backdrop.classList.toggle("active");
  }

  closeLeftMenu() {
    const drawer = document.getElementById("leftSideMenuDrawer");
    const backdrop = document.getElementById("leftMenuBackdrop");
    if (drawer) drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("active");
  }

  toggleTheme() {
    document.body.classList.toggle("theme-dark");
    const isDark = document.body.classList.contains("theme-dark");
    if (window.ElaraStorage) {
      window.ElaraStorage.setTheme(isDark ? "dark" : "light");
    }
    this.showToast(isDark ? "Dark High-Contrast Mode Activated" : "Light Mode Activated", "🌓");
  }

  showToast(message, icon = "✨") {
    const toast = document.getElementById("toastNotification");
    const iconEl = document.getElementById("toastIcon");
    const msgEl = document.getElementById("toastMsg");

    if (!toast || !msgEl) return;
    if (iconEl) iconEl.textContent = icon;
    const localized = window.ElaraI18n ? window.ElaraI18n.translateRawText(String(message)) : message;
    msgEl.textContent = localized;

    toast.classList.add("show");
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
}

// Global Instantiate on load
window.elaraApp = new ElaraApp();
window.addEventListener("DOMContentLoaded", () => {
  window.elaraApp.init();
});
