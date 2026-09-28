/**
 * ELARA 2.0 - PERSISTENT STORAGE ENGINE
 * Manages localStorage persistence and cross-session data integrity for:
 * - User Sessions & Authentication
 * - ABHA Profile & Demographics
 * - 23 Languages Preference
 * - Jan Aushadhi Cart & Order Tracking
 * - Accessibility & Notification Settings
 */

class ElaraStorageManager {
  constructor() {
    this.memoryStore = {};
    this.PREFIX = "elara_v2_";
  }

  _isAvailable() {
    try {
      const test = "__test__";
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  getItem(key, defaultValue = null) {
    const fullKey = this.PREFIX + key;
    if (this._isAvailable()) {
      try {
        const val = window.localStorage.getItem(fullKey);
        return val ? JSON.parse(val) : defaultValue;
      } catch (e) {
        console.warn(`[ElaraStorage] Parse error for key: ${key}`, e);
        return defaultValue;
      }
    }
    return this.memoryStore[fullKey] !== undefined ? this.memoryStore[fullKey] : defaultValue;
  }

  setItem(key, value) {
    const fullKey = this.PREFIX + key;
    if (this._isAvailable()) {
      try {
        window.localStorage.setItem(fullKey, JSON.stringify(value));
      } catch (e) {
        console.warn(`[ElaraStorage] Save error for key: ${key}`, e);
      }
    }
    this.memoryStore[fullKey] = value;
  }

  removeItem(key) {
    const fullKey = this.PREFIX + key;
    if (this._isAvailable()) {
      window.localStorage.removeItem(fullKey);
    }
    delete this.memoryStore[fullKey];
  }

  // --- 1. LANGUAGE & LOCALIZATION ---
  getLanguage() {
    return this.getItem("language", "en");
  }

  setLanguage(code) {
    this.setItem("language", code);
  }

  // --- 2. USER AUTHENTICATION & SESSION ---
  getSession() {
    return this.getItem("session", {
      isAuthenticated: true,
      role: "patient",
      token: "demo-jwt-session-token",
      user: {
        id: "USR-1042",
        name: "Sunita Devi",
        phone: "9876543210",
        role: "patient"
      }
    });
  }

  saveSession(sessionData) {
    const current = this.getSession() || {};
    const updated = {
      ...current,
      ...sessionData,
      isAuthenticated: true,
      lastLogin: new Date().toISOString()
    };
    this.setItem("session", updated);
  }

  clearSession() {
    this.setItem("session", {
      isAuthenticated: false,
      role: "patient",
      token: null,
      user: null
    });
  }

  // --- 3. PATIENT PROFILE & ABHA HEALTH RECORD ---
  getProfile() {
    return this.getItem("profile", {
      id: "P-1042",
      abhaId: "91-4820-1928-3341",
      abhaAddress: "sunitadevi@abdm",
      name: "Sunita Devi",
      age: 42,
      dob: "14/08/1982",
      gender: "Female",
      bloodGroup: "B+",
      phone: "9876543210",
      email: "sunita.devi@ayushman.in",
      address: "Sharda Enclave, Ward 4, Navrangpura, Kendrapara",
      pincode: "754211",
      state: "Odisha",
      emergencyContact: {
        name: "Ramesh Devi (Brother)",
        phone: "9810024156"
      },
      allergies: ["Penicillin", "Sulfa Drugs"],
      chronicConditions: ["Hypertension (Controlled)"]
    });
  }

  saveProfile(profileData) {
    const current = this.getProfile();
    const updated = { ...current, ...profileData, lastUpdated: new Date().toISOString() };
    this.setItem("profile", updated);
    return updated;
  }

  // --- 4. JAN AUSHADHI PHARMACY CART ---
  getCart() {
    return this.getItem("cart", [
      { id: "MED-01", name: "Jan Aushadhi Paracetamol 650mg", price: 12, commercialMrp: 35, quantity: 2, category: "Analgesic" },
      { id: "MED-05", name: "Jan Aushadhi ORS Electrolyte (WHO)", price: 8, commercialMrp: 28, quantity: 3, category: "Emergency" }
    ]);
  }

  saveCart(cartItems) {
    this.setItem("cart", cartItems);
  }

  clearCart() {
    this.setItem("cart", []);
  }

  // --- 5. JAN AUSHADHI ORDERS & LIVE TRACKING ---
  getOrders() {
    const defaultOrders = [
      {
        id: "ORD-7821",
        date: new Date(Date.now() - 3600000).toLocaleString(),
        status: "Out for Delivery",
        statusStep: 3, // 1: Confirmed, 2: Packed, 3: Out for Delivery, 4: Delivered
        items: [
          { name: "Jan Aushadhi Paracetamol 650mg", quantity: 2, price: 12 },
          { name: "Jan Aushadhi ORS Electrolyte (WHO)", quantity: 3, price: 8 }
        ],
        subtotal: 48,
        deliveryFee: 0,
        total: 48,
        eta: "18 mins (Rider nearby)",
        customer: {
          name: "Sunita Devi",
          phone: "9876543210",
          address: "Sharda Enclave, Ward 4, Navrangpura, Kendrapara"
        },
        rider: {
          name: "Bikram Mohanty",
          phone: "+91 94370-11223",
          vehicle: "Jan Aushadhi Express #OD-05-9921",
          currentLoc: "Navrangpura PHC Gate 2"
        }
      }
    ];
    return this.getItem("orders", defaultOrders);
  }

  saveOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.setItem("orders", orders);
    return order;
  }

  // --- 6. ACCESSIBILITY & THEME PREFERENCES ---
  getTheme() {
    return this.getItem("theme", "light");
  }

  setTheme(theme) {
    this.setItem("theme", theme);
  }

  getFontScale() {
    return this.getItem("fontScale", "normal"); // 'normal' | 'large' | 'xlarge'
  }

  setFontScale(scale) {
    this.setItem("fontScale", scale);
  }

  getTtsSpeed() {
    return this.getItem("ttsSpeed", 1.0);
  }

  setTtsSpeed(speed) {
    this.setItem("ttsSpeed", speed);
  }

  getNotificationPrefs() {
    return this.getItem("notifications", {
      smsAlerts: true,
      whatsappUpdates: true,
      abdmSync: true,
      soundAlerts: true
    });
  }

  saveNotificationPrefs(prefs) {
    this.setItem("notifications", prefs);
  }
}

// Global Singleton Instance
window.ElaraStorage = new ElaraStorageManager();
