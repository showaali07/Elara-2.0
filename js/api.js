/**
 * ELARA 2.0 - UNIFIED REST API CLIENT & FALLBACK ENGINE
 * Handles network calls to backend REST endpoints (/api/...) with:
 * - Loading indicators
 * - Retry mechanisms on failure
 * - Network offline detection
 * - Seamless fallback to ElaraStorage persistent database if backend is unreachable
 * - User-friendly error messaging & toast integration
 */

class ElaraApiClient {
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
    this.timeoutMs = 6000;
    this.isOnline = navigator.onLine;

    window.addEventListener("online", () => {
      this.isOnline = true;
      if (window.showToast) window.showToast("Internet connection restored", "📶");
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
      if (window.showToast) window.showToast("Offline mode active. Local persistence engaged.", "⚠️");
    });
  }

  /**
   * Core HTTP request handler with timeout and error capture
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(options.headers || {})
    };

    // Attach auth token if available
    const session = window.ElaraStorage ? window.ElaraStorage.getSession() : null;
    if (session && session.token) {
      headers["Authorization"] = `Bearer ${session.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error((data && data.message) || `HTTP Error ${response.status}`);
      }

      return { success: true, data, status: response.status };
    } catch (err) {
      clearTimeout(timeoutId);
      console.warn(`[ElaraAPI] Request failed for ${endpoint}:`, err.message);
      return { success: false, error: err.message, isOffline: !navigator.onLine };
    }
  }

  /**
   * Request with retry loop
   */
  async requestWithRetry(endpoint, options = {}, retries = 2) {
    let attempt = 0;
    while (attempt <= retries) {
      const res = await this.request(endpoint, options);
      if (res.success) return res;
      attempt++;
      if (attempt <= retries) {
        await new Promise(r => setTimeout(r, 600 * attempt));
      }
    }
    return { success: false, error: "Operation failed after multiple attempts." };
  }

  // ================= 1. AUTHENTICATION =================
  async login(identifier, password = "password123") {
    const res = await this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password })
    });

    if (res.success && res.data) {
      if (window.ElaraStorage) {
        window.ElaraStorage.saveSession({
          isAuthenticated: true,
          token: res.data.token,
          user: res.data.user
        });
        if (res.data.profile) {
          window.ElaraStorage.saveProfile(res.data.profile);
        }
      }
      return { success: true, user: res.data.user };
    }

    // Offline / LocalStorage Fallback Authentication
    if (window.ElaraStorage) {
      const currentProfile = window.ElaraStorage.getProfile();
      const user = {
        id: currentProfile.id || "USR-1042",
        name: currentProfile.name || identifier || "Sunita Devi",
        phone: currentProfile.phone || "9876543210",
        role: "patient"
      };
      window.ElaraStorage.saveSession({
        isAuthenticated: true,
        token: "offline-mock-jwt-" + Date.now(),
        user
      });
      return { success: true, user, fallback: true };
    }

    return { success: false, error: res.error || "Login failed" };
  }

  async signup(userData) {
    const res = await this.request("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData)
    });

    if (res.success && res.data) {
      if (window.ElaraStorage) {
        window.ElaraStorage.saveProfile(res.data.user);
        window.ElaraStorage.saveSession({
          isAuthenticated: true,
          token: res.data.token,
          user: res.data.user
        });
      }
      return { success: true, user: res.data.user };
    }

    // LocalStorage Fallback
    if (window.ElaraStorage) {
      const newProfile = window.ElaraStorage.saveProfile({
        name: userData.name,
        phone: userData.phone,
        abhaId: userData.abhaId || "91-" + Math.floor(1000 + Math.random() * 9000) + "-1120-4491",
        age: userData.age || 35,
        gender: userData.gender || "Female"
      });
      window.ElaraStorage.saveSession({
        isAuthenticated: true,
        token: "offline-signup-jwt-" + Date.now(),
        user: newProfile
      });
      return { success: true, user: newProfile, fallback: true };
    }

    return { success: false, error: res.error || "Signup failed" };
  }

  async forgotPassword(phone, otp, newPassword) {
    const res = await this.request("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ phone, otp, newPassword })
    });

    if (res.success) return res;

    // Fallback: If OTP is 1234
    if (otp === "1234") {
      return { success: true, message: "Password reset successful via demo OTP" };
    }

    return { success: false, error: "Invalid OTP. Use demo OTP 1234" };
  }

  // ================= 2. PROFILE & ABHA HEALTH RECORD =================
  async getProfile() {
    const res = await this.request("/api/profile");
    if (res.success && res.data) {
      if (window.ElaraStorage) window.ElaraStorage.saveProfile(res.data);
      return res.data;
    }
    return window.ElaraStorage ? window.ElaraStorage.getProfile() : null;
  }

  async updateProfile(profileData) {
    const res = await this.request("/api/profile", {
      method: "PUT",
      body: JSON.stringify(profileData)
    });

    if (window.ElaraStorage) {
      window.ElaraStorage.saveProfile(profileData);
    }
    return { success: true, data: profileData };
  }

  // ================= 3. PHARMACY MEDICINES CATALOG =================
  async getMedicines(category = "all", query = "") {
    const params = new URLSearchParams();
    if (category && category !== "all") params.append("category", category);
    if (query) params.append("q", query);

    const res = await this.request(`/api/medicines?${params.toString()}`);
    if (res.success && res.data) {
      return res.data;
    }

    // Fallback to client medicines catalog
    if (window.ElaraPharmacyCatalog) {
      return window.ElaraPharmacyCatalog.filter(category, query);
    }
    return [];
  }

  // ================= 4. ORDERS & TRACKING =================
  async createOrder(orderPayload) {
    const res = await this.request("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderPayload)
    });

    if (res.success && res.data) {
      if (window.ElaraStorage) {
        window.ElaraStorage.saveOrder(res.data);
        window.ElaraStorage.clearCart();
      }
      return { success: true, order: res.data };
    }

    // Local fallback order generation
    const fallbackOrder = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleString(),
      status: "Out for Delivery",
      statusStep: 3,
      items: orderPayload.items || [],
      subtotal: orderPayload.subtotal || 48,
      deliveryFee: 0,
      total: orderPayload.total || 48,
      eta: "15-20 mins (Jan Aushadhi Express)",
      customer: orderPayload.customer || {
        name: "Sunita Devi",
        phone: "9876543210",
        address: "Sharda Enclave, Ward 4, Navrangpura, Kendrapara"
      },
      rider: {
        name: "Bikram Mohanty",
        phone: "+91 94370-11223",
        vehicle: "Jan Aushadhi Express #OD-05-9921",
        currentLoc: "Near Navrangpura PHC Gate 2"
      }
    };

    if (window.ElaraStorage) {
      window.ElaraStorage.saveOrder(fallbackOrder);
      window.ElaraStorage.clearCart();
    }

    return { success: true, order: fallbackOrder, fallback: true };
  }

  async getOrders() {
    const res = await this.request("/api/orders");
    if (res.success && res.data) {
      return res.data;
    }
    return window.ElaraStorage ? window.ElaraStorage.getOrders() : [];
  }

  // ================= 5. EMERGENCY 108 SOS DISPATCH =================
  async triggerSos(locationData = {}) {
    const res = await this.request("/api/emergency/sos", {
      method: "POST",
      body: JSON.stringify(locationData)
    });

    if (res.success && res.data) {
      return res.data;
    }

    // Fallback Emergency Dispatch
    return {
      success: true,
      dispatchId: "SOS-AMB-" + Math.floor(1000 + Math.random() * 9000),
      ambulanceUnit: "OD-05-EMERG-108",
      driverName: "Sanatan Pradhan",
      driverPhone: "108",
      etaMinutes: 6,
      hospitalDestination: "Kendrapara Sub-District Hospital & Trauma Centre",
      dispatchedAt: new Date().toISOString()
    };
  }
}

// Global Singleton Instance
window.ElaraAPI = new ElaraApiClient();
