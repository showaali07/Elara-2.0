/**
 * ELARA 2.0 - PM JAN AUSHADHI PHARMACY & ORDER ENGINE
 * Provides:
 * - Real PMBJP Generic Drug Database with MRP savings comparison
 * - Instant search and category filtering
 * - Cart state management & persistence
 * - Checkout form with validation
 * - Live Order Tracker stepper and rider contact simulation
 */

(function () {
  const MEDICINES_DATA = [
    {
      id: "MED-01",
      name: "Jan Aushadhi Paracetamol 650mg",
      genericName: "Paracetamol IP 650mg",
      category: "feverPain",
      price: 12,
      commercialMrp: 35,
      savingsPct: 66,
      form: "Strip of 10 Tablets",
      manufacturer: "IDPL (PMBJP Certified PSU)",
      indication: "Fever, Headache, Mild-to-moderate Body Pain",
      dosage: "1 tablet every 6-8 hours after food as directed by physician",
      inStock: true
    },
    {
      id: "MED-02",
      name: "Jan Aushadhi Amoxicillin 500mg",
      genericName: "Amoxicillin Trihydrate IP 500mg",
      category: "antibiotics",
      price: 42,
      commercialMrp: 125,
      savingsPct: 66,
      form: "Strip of 10 Capsules",
      manufacturer: "HAL (PMBJP Certified PSU)",
      indication: "Bacterial respiratory, ear, throat & dental infections",
      dosage: "Take complete course strictly as advised by medical officer",
      inStock: true
    },
    {
      id: "MED-03",
      name: "Jan Aushadhi Metformin 500mg",
      genericName: "Metformin Hydrochloride IP 500mg",
      category: "diabetesBp",
      price: 14,
      commercialMrp: 48,
      savingsPct: 71,
      form: "Strip of 10 Tablets",
      manufacturer: "Karnataka Antibiotics (KAPL)",
      indication: "Type 2 Diabetes Mellitus glycemic control",
      dosage: "1 tablet twice daily with meals",
      inStock: true
    },
    {
      id: "MED-04",
      name: "Jan Aushadhi Azithromycin 500mg",
      genericName: "Azithromycin IP 500mg",
      category: "antibiotics",
      price: 52,
      commercialMrp: 145,
      savingsPct: 64,
      form: "Strip of 3 Tablets",
      manufacturer: "Bengal Chemicals & Pharmaceuticals",
      indication: "Upper & lower respiratory tract infections",
      dosage: "1 tablet once daily 1 hr before or 2 hrs after meal for 3 days",
      inStock: true
    },
    {
      id: "MED-05",
      name: "Jan Aushadhi ORS Electrolyte (WHO Formula)",
      genericName: "Oral Rehydration Salts IP (WHO Standard)",
      category: "emergencyKits",
      price: 8,
      commercialMrp: 28,
      savingsPct: 71,
      form: "21.8g Sachet for 1 Litre Water",
      manufacturer: "BPPI PMBJP Approved Unit",
      indication: "Acute dehydration, diarrhea, heat stroke & gastroenteritis",
      dosage: "Dissolve entire sachet in 1 Litre boiled & cooled drinking water",
      inStock: true
    },
    {
      id: "MED-06",
      name: "Jan Aushadhi Cetirizine 10mg",
      genericName: "Cetirizine Hydrochloride IP 10mg",
      category: "feverPain",
      price: 7,
      commercialMrp: 25,
      savingsPct: 72,
      form: "Strip of 10 Tablets",
      manufacturer: "HAL Healthcare Unit",
      indication: "Allergic rhinitis, cold sneezing, skin urticaria & itching",
      dosage: "1 tablet at bedtime",
      inStock: true
    },
    {
      id: "MED-07",
      name: "Jan Aushadhi Amlodipine 5mg",
      genericName: "Amlodipine Besylate IP 5mg",
      category: "diabetesBp",
      price: 8,
      commercialMrp: 38,
      savingsPct: 79,
      form: "Strip of 10 Tablets",
      manufacturer: "IDPL Healthcare",
      indication: "Essential hypertension & coronary artery disease prophylaxis",
      dosage: "1 tablet daily at fixed time in morning",
      inStock: true
    },
    {
      id: "MED-08",
      name: "Jan Aushadhi Pantoprazole 40mg",
      genericName: "Pantoprazole Sodium Gastro-resistant IP 40mg",
      category: "feverPain",
      price: 18,
      commercialMrp: 85,
      savingsPct: 79,
      form: "Strip of 10 Tablets",
      manufacturer: "KAPL Pharma",
      indication: "GERD, gastric acidity, peptic ulcer & NSAID-induced dyspepsia",
      dosage: "1 tablet daily empty stomach 30 mins before breakfast",
      inStock: true
    },
    {
      id: "MED-09",
      name: "Jan Aushadhi Chewable Vitamin C & Zinc",
      genericName: "Ascorbic Acid 500mg + Zinc Sulphate 5mg",
      category: "emergencyKits",
      price: 15,
      commercialMrp: 55,
      savingsPct: 73,
      form: "Strip of 15 Chewable Tablets (Orange Flavor)",
      manufacturer: "Bengal Chemicals & Pharmaceuticals",
      indication: "Immunity support, post-viral convalescence & tissue recovery",
      dosage: "1 tablet chewed daily after breakfast",
      inStock: true
    },
    {
      id: "MED-10",
      name: "Jan Aushadhi First-Aid & Trauma Kit",
      genericName: "Povidone Iodine 5% + Cotton + Gauze Bandage + Micropore Tape",
      category: "emergencyKits",
      price: 65,
      commercialMrp: 180,
      savingsPct: 64,
      form: "Emergency Field Dressing Pack",
      manufacturer: "PMBJP Surgical Supply Kendra",
      indication: "Wound disinfection, laceration care, minor trauma & emergency bleeding",
      dosage: "Clean with antiseptic and apply sterile bandage with gentle pressure",
      inStock: true
    }
  ];

  class PharmacyManager {
    constructor() {
      this.catalog = MEDICINES_DATA;
      this.activeCategory = "all";
      this.searchQuery = "";
    }

    getAll() {
      return this.catalog;
    }

    getById(id) {
      return this.catalog.find(m => m.id === id) || null;
    }

    filter(category = "all", query = "") {
      let filtered = this.catalog;
      if (category && category !== "all") {
        filtered = filtered.filter(m => m.category === category);
      }
      if (query && query.trim() !== "") {
        const q = query.toLowerCase().trim();
        filtered = filtered.filter(m =>
          m.name.toLowerCase().includes(q) ||
          m.genericName.toLowerCase().includes(q) ||
          m.indication.toLowerCase().includes(q)
        );
      }
      return filtered;
    }

    // --- Cart Actions ---
    getCart() {
      return window.ElaraStorage ? window.ElaraStorage.getCart() : [];
    }

    addToCart(medicineId, quantity = 1) {
      const med = this.getById(medicineId);
      if (!med) return;

      const cart = this.getCart();
      const existing = cart.find(item => item.id === medicineId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          id: med.id,
          name: med.name,
          price: med.price,
          commercialMrp: med.commercialMrp,
          quantity: quantity,
          category: med.category
        });
      }

      if (window.ElaraStorage) {
        window.ElaraStorage.saveCart(cart);
      }

      this.updateCartBadges();

      if (window.showToast) {
        window.showToast(`${med.name} added to cart!`, "🛒");
      }
    }

    removeFromCart(medicineId) {
      let cart = this.getCart();
      cart = cart.filter(item => item.id !== medicineId);

      if (window.ElaraStorage) {
        window.ElaraStorage.saveCart(cart);
      }

      this.updateCartBadges();
      this.renderCartModal();
    }

    updateQuantity(medicineId, newQty) {
      if (newQty <= 0) {
        this.removeFromCart(medicineId);
        return;
      }

      const cart = this.getCart();
      const item = cart.find(i => i.id === medicineId);
      if (item) {
        item.quantity = newQty;
        if (window.ElaraStorage) {
          window.ElaraStorage.saveCart(cart);
        }
      }

      this.updateCartBadges();
      this.renderCartModal();
    }

    getCartTotals() {
      const cart = this.getCart();
      let subtotal = 0;
      let commercialTotal = 0;
      let itemCount = 0;

      cart.forEach(item => {
        subtotal += item.price * item.quantity;
        commercialTotal += (item.commercialMrp || item.price * 2.5) * item.quantity;
        itemCount += item.quantity;
      });

      const totalSavings = Math.max(0, commercialTotal - subtotal);
      const savingsPct = commercialTotal > 0 ? Math.round((totalSavings / commercialTotal) * 100) : 0;

      return {
        itemCount,
        subtotal,
        commercialTotal,
        totalSavings,
        savingsPct,
        deliveryFee: 0,
        finalTotal: subtotal
      };
    }

    updateCartBadges() {
      const totals = this.getCartTotals();
      const badgeElements = document.querySelectorAll(".cart-count-badge");
      badgeElements.forEach(el => {
        el.textContent = totals.itemCount;
        el.style.display = totals.itemCount > 0 ? "inline-flex" : "none";
      });
    }

    // --- UI Renderers ---
    renderCatalogGrid(containerId = "medicinesGrid") {
      const container = document.getElementById(containerId);
      if (!container) return;

      const items = this.filter(this.activeCategory, this.searchQuery);

      if (items.length === 0) {
        container.innerHTML = `
          <div class="col-span-full py-12 text-center text-slate-500">
            <span class="material-symbols-outlined text-4xl text-slate-300">search_off</span>
            <p class="mt-2 text-sm font-semibold">No medicines found matching "${this.searchQuery}"</p>
            <button class="mt-3 px-4 py-1.5 bg-teal-50 text-teal-800 rounded-lg text-xs font-bold hover:bg-teal-100" onclick="window.ElaraPharmacy.resetFilters()">
              Clear Search Filters
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = items.map(med => `
        <div class="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:border-teal-300 transition-all group">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-100 uppercase tracking-wider">
                PMBJP Generic
              </span>
              <span class="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                ${med.savingsPct}% OFF
              </span>
            </div>

            <h3 class="font-display font-bold text-sm text-slate-900 group-hover:text-teal-900 leading-snug cursor-pointer" onclick="window.ElaraPharmacy.openDetail('${med.id}')">
              ${med.name}
            </h3>
            
            <p class="text-xs text-slate-500 mt-1 line-clamp-1 italic">
              ${med.genericName}
            </p>

            <div class="text-[11px] text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg line-clamp-2">
              <b>Uses:</b> ${med.indication}
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div class="flex items-baseline gap-1.5">
                <span class="font-black text-lg text-teal-900">₹${med.price}</span>
                <span class="text-xs text-slate-400 line-through">₹${med.commercialMrp}</span>
              </div>
              <span class="text-[10px] text-slate-500">${med.form}</span>
            </div>

            <div class="flex items-center gap-1.5">
              <button onclick="window.ElaraPharmacy.openDetail('${med.id}')" class="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors" title="View Medicine Details">
                <span class="material-symbols-outlined text-[18px]">info</span>
              </button>
              <button onclick="window.ElaraPharmacy.addToCart('${med.id}', 1)" class="px-3 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      `).join("");

      if (window.ElaraI18n) {
        window.ElaraI18n.applyToDOM(container);
      }
    }

    openDetail(id) {
      const med = this.getById(id);
      if (!med) return;

      const modal = document.getElementById("medicineDetailModal");
      const titleEl = document.getElementById("medDetailTitle");
      const genericEl = document.getElementById("medDetailGeneric");
      const priceEl = document.getElementById("medDetailPrice");
      const mrpEl = document.getElementById("medDetailMrp");
      const savingsEl = document.getElementById("medDetailSavings");
      const usesEl = document.getElementById("medDetailUses");
      const dosageEl = document.getElementById("medDetailDosage");
      const mfgEl = document.getElementById("medDetailMfg");
      const addBtn = document.getElementById("medDetailAddBtn");

      if (titleEl) titleEl.textContent = med.name;
      if (genericEl) genericEl.textContent = med.genericName;
      if (priceEl) priceEl.textContent = `₹${med.price}`;
      if (mrpEl) mrpEl.textContent = `₹${med.commercialMrp}`;
      if (savingsEl) savingsEl.textContent = `You save ${med.savingsPct}% compared to commercial branded equivalent`;
      if (usesEl) usesEl.textContent = med.indication;
      if (dosageEl) dosageEl.textContent = med.dosage;
      if (mfgEl) mfgEl.textContent = `${med.manufacturer} (${med.form})`;
      
      if (addBtn) {
        addBtn.onclick = () => {
          this.addToCart(med.id, 1);
          this.closeDetailModal();
        };
      }

      if (modal) {
        modal.classList.remove("hidden");
        if (window.ElaraI18n) window.ElaraI18n.applyToDOM(modal);
      }
    }

    closeDetailModal() {
      const modal = document.getElementById("medicineDetailModal");
      if (modal) modal.classList.add("hidden");
    }

    renderCartModal() {
      const modal = document.getElementById("cartModal");
      const container = document.getElementById("cartItemsContainer");
      const subtotalEl = document.getElementById("cartSubtotal");
      const commercialEl = document.getElementById("cartCommercialTotal");
      const savingsEl = document.getElementById("cartSavingsBadge");

      const cart = this.getCart();
      const totals = this.getCartTotals();

      if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal}`;
      if (commercialEl) commercialEl.textContent = `₹${totals.commercialTotal}`;
      if (savingsEl) savingsEl.textContent = `Total Saved: ₹${totals.totalSavings} (${totals.savingsPct}%)`;

      if (container) {
        if (cart.length === 0) {
          container.innerHTML = `
            <div class="py-10 text-center text-slate-500">
              <span class="material-symbols-outlined text-4xl text-slate-300">remove_shopping_cart</span>
              <p class="mt-2 text-sm font-semibold">Your cart is currently empty</p>
              <button class="mt-3 px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold" onclick="window.ElaraPharmacy.closeCartModal(); window.goToScreen('medicines');">
                Browse Jan Aushadhi Medicines
              </button>
            </div>
          `;
        } else {
          container.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between py-3 border-b border-slate-100 gap-3">
              <div class="flex-1">
                <h4 class="font-bold text-xs text-slate-900">${item.name}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="font-bold text-teal-800 text-xs">₹${item.price} each</span>
                  <span class="text-[10px] text-slate-400 line-through">₹${item.commercialMrp}</span>
                </div>
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-xl">
                <button onclick="window.ElaraPharmacy.updateQuantity('${item.id}', ${item.quantity - 1})" class="w-6 h-6 rounded-lg bg-white shadow-xs flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200">
                  -
                </button>
                <span class="text-xs font-bold text-slate-800 px-1">${item.quantity}</span>
                <button onclick="window.ElaraPharmacy.updateQuantity('${item.id}', ${item.quantity + 1})" class="w-6 h-6 rounded-lg bg-white shadow-xs flex items-center justify-center font-bold text-slate-700 hover:bg-slate-200">
                  +
                </button>
              </div>

              <div class="text-right">
                <div class="font-extrabold text-sm text-slate-900">₹${item.price * item.quantity}</div>
                <button onclick="window.ElaraPharmacy.removeFromCart('${item.id}')" class="text-[10px] text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            </div>
          `).join("");
        }
      }

      if (modal) {
        modal.classList.remove("hidden");
        if (window.ElaraI18n) window.ElaraI18n.applyToDOM(modal);
      }
    }

    closeCartModal() {
      const modal = document.getElementById("cartModal");
      if (modal) modal.classList.add("hidden");
    }

    openCheckoutModal() {
      const cart = this.getCart();
      if (cart.length === 0) {
        if (window.showToast) window.showToast("Your cart is empty. Add medicines first.", "⚠️");
        return;
      }
      this.closeCartModal();
      const modal = document.getElementById("checkoutModal");
      if (modal) {
        const totals = this.getCartTotals();
        const totalEl = document.getElementById("checkoutTotalPayable");
        if (totalEl) totalEl.textContent = `₹${totals.finalTotal}`;

        // Pre-fill profile info
        if (window.ElaraStorage) {
          const profile = window.ElaraStorage.getProfile();
          const nameInput = document.getElementById("checkoutName");
          const phoneInput = document.getElementById("checkoutPhone");
          const addressInput = document.getElementById("checkoutAddress");
          if (nameInput) nameInput.value = profile.name || "";
          if (phoneInput) phoneInput.value = profile.phone || "";
          if (addressInput) addressInput.value = profile.address || "";
        }
        modal.classList.remove("hidden");
      }
    }

    closeCheckoutModal() {
      const modal = document.getElementById("checkoutModal");
      if (modal) modal.classList.add("hidden");
    }

    async processOrderSubmission(event) {
      if (event) event.preventDefault();

      const name = document.getElementById("checkoutName")?.value.trim();
      const phone = document.getElementById("checkoutPhone")?.value.trim();
      const address = document.getElementById("checkoutAddress")?.value.trim();
      const paymentMode = document.querySelector('input[name="paymentMode"]:checked')?.value || "cod";

      // Validation
      if (!name) {
        alert("Please enter patient recipient name.");
        return;
      }
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phone || !phoneRegex.test(phone.replace(/\D/g, "").slice(-10))) {
        alert("Please enter a valid 10-digit Indian mobile number.");
        return;
      }
      if (!address || address.length < 5) {
        alert("Please provide a valid delivery address with ward/village details.");
        return;
      }

      const totals = this.getCartTotals();
      const cart = this.getCart();

      const orderPayload = {
        items: cart,
        subtotal: totals.subtotal,
        total: totals.finalTotal,
        paymentMode,
        customer: { name, phone, address }
      };

      const btn = document.getElementById("submitOrderBtn");
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span class="animate-spin mr-2">⏳</span> Placing Order...`;
      }

      try {
        const result = await window.ElaraAPI.createOrder(orderPayload);
        this.closeCheckoutModal();

        if (window.showToast) {
          window.showToast("Order Placed Successfully via Jan Aushadhi Express!", "✅");
        }

        // Navigate to Order Tracking
        if (window.goToScreen) {
          window.goToScreen("order-tracking");
          this.renderOrderTracking(result.order ? result.order.id : null);
        }
      } catch (err) {
        alert("Failed to submit order: " + err.message);
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `Confirm & Place Order`;
        }
      }
    }

    renderOrderTracking(orderId = null) {
      const orders = window.ElaraStorage ? window.ElaraStorage.getOrders() : [];
      const order = orderId ? orders.find(o => o.id === orderId) || orders[0] : orders[0];

      if (!order) return;

      const orderIdEl = document.getElementById("trackingOrderId");
      const orderStatusEl = document.getElementById("trackingOrderStatus");
      const orderDateEl = document.getElementById("trackingOrderDate");
      const orderTotalEl = document.getElementById("trackingOrderTotal");
      const etaEl = document.getElementById("trackingEta");
      const riderNameEl = document.getElementById("trackingRiderName");
      const riderPhoneEl = document.getElementById("trackingRiderPhone");
      const riderLocEl = document.getElementById("trackingRiderLoc");
      const itemsListEl = document.getElementById("trackingItemsList");

      if (orderIdEl) orderIdEl.textContent = order.id;
      if (orderStatusEl) orderStatusEl.textContent = order.status;
      if (orderDateEl) orderDateEl.textContent = order.date;
      if (orderTotalEl) orderTotalEl.textContent = `₹${order.total}`;
      if (etaEl) etaEl.textContent = order.eta || "15-20 mins";

      if (riderNameEl && order.rider) riderNameEl.textContent = order.rider.name;
      if (riderPhoneEl && order.rider) riderPhoneEl.textContent = order.rider.phone;
      if (riderLocEl && order.rider) riderLocEl.textContent = order.rider.currentLoc;

      if (itemsListEl && order.items) {
        itemsListEl.innerHTML = order.items.map(i => `
          <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
            <span class="text-slate-700">${i.name} × ${i.quantity}</span>
            <span class="font-bold text-slate-900">₹${i.price * i.quantity}</span>
          </div>
        `).join("");
      }

      // Update stepper milestones
      const step = order.statusStep || 3;
      for (let s = 1; s <= 4; s++) {
        const stepDot = document.getElementById(`trackStepDot_${s}`);
        const stepText = document.getElementById(`trackStepText_${s}`);
        if (stepDot && stepText) {
          if (s <= step) {
            stepDot.classList.add("bg-teal-700", "text-white", "border-teal-700");
            stepDot.classList.remove("bg-slate-200", "text-slate-600");
            stepText.classList.add("font-bold", "text-teal-900");
          } else {
            stepDot.classList.remove("bg-teal-700", "text-white", "border-teal-700");
            stepDot.classList.add("bg-slate-200", "text-slate-600");
            stepText.classList.remove("font-bold", "text-teal-900");
          }
        }
      }

      if (window.ElaraI18n) {
        const trackSec = document.getElementById("screen-order-tracking");
        if (trackSec) window.ElaraI18n.applyToDOM(trackSec);
      }
    }

    setCategory(category) {
      this.activeCategory = category;
      const buttons = document.querySelectorAll(".category-filter-btn");
      buttons.forEach(btn => {
        if (btn.getAttribute("data-cat") === category) {
          btn.classList.add("active", "bg-teal-700", "text-white");
          btn.classList.remove("bg-white", "text-slate-700");
        } else {
          btn.classList.remove("active", "bg-teal-700", "text-white");
          btn.classList.add("bg-white", "text-slate-700");
        }
      });
      this.renderCatalogGrid();
    }

    setSearch(query) {
      this.searchQuery = query;
      this.renderCatalogGrid();
    }

    resetFilters() {
      this.activeCategory = "all";
      this.searchQuery = "";
      const searchInput = document.getElementById("pharmacySearchInput");
      if (searchInput) searchInput.value = "";
      this.setCategory("all");
    }
  }

  // Global Singleton Instance
  window.ElaraPharmacy = new PharmacyManager();
  window.ElaraPharmacyCatalog = window.ElaraPharmacy;
})();
