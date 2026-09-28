/**
 * Automated Test Suite for ELARA 2.0 Full Functionality
 */

const http = require("http");

async function runTests() {
  console.log("=== STARTING ELARA 2.0 FUNCTIONALITY TEST SUITE ===");

  function makeRequest(path, method = "GET", body = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "localhost",
        port: 3000,
        path,
        method,
        headers: { "Content-Type": "application/json" }
      };

      const req = http.request(options, (res) => {
        let data = "";
        res.on("data", chunk => data += chunk);
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      });

      req.on("error", (e) => reject(e));
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  // TEST 1: Static serving
  try {
    const staticRes = await makeRequest("/");
    console.log("TEST 1: Static index.html served:", staticRes.status === 200 ? "PASS" : "FAIL");
  } catch (e) {
    console.error("TEST 1 FAILED:", e.message);
  }

  // TEST 2: GET /api/profile
  try {
    const profileRes = await makeRequest("/api/profile");
    console.log("TEST 2: GET /api/profile status:", profileRes.status === 200 && profileRes.body && profileRes.body.phone ? "PASS" : "FAIL");
  } catch (e) {
    console.error("TEST 2 FAILED:", e.message);
  }

  // TEST 3: PUT /api/profile
  try {
    const updateRes = await makeRequest("/api/profile", "PUT", {
      name: "Sunita Devi (Verified)",
      phone: "9876543210",
      pincode: "754211"
    });
    console.log("TEST 3: PUT /api/profile status:", updateRes.status === 200 && updateRes.body.name === "Sunita Devi (Verified)" ? "PASS" : "FAIL");
  } catch (e) {
    console.error("TEST 3 FAILED:", e.message);
  }

  // TEST 4: POST /api/auth/login
  try {
    const loginRes = await makeRequest("/api/auth/login", "POST", {
      identifier: "9876543210",
      password: "password123"
    });
    console.log("TEST 4: POST /api/auth/login status:", loginRes.status === 200 && loginRes.body.token ? "PASS" : "FAIL");
  } catch (e) {
    console.error("TEST 4 FAILED:", e.message);
  }

  // TEST 5: POST /api/auth/signup
  try {
    const signupRes = await makeRequest("/api/auth/signup", "POST", {
      name: "Ramesh Kumar",
      phone: "9812345678",
      abhaId: "91-8899-2233-1122"
    });
    console.log("TEST 5: POST /api/auth/signup status:", signupRes.status === 201 && signupRes.body.user.name === "Ramesh Kumar" ? "PASS" : "FAIL");
  } catch (e) {
    console.error("TEST 5 FAILED:", e.message);
  }

  // TEST 6: POST /api/auth/forgot-password with demo OTP 1234
  try {
    const fpRes = await makeRequest("/api/auth/forgot-password", "POST", {
      phone: "9876543210",
      otp: "1234",
      newPassword: "newPassWord456"
    });
    console.log("TEST 6: POST /api/auth/forgot-password (OTP 1234):", fpRes.status === 200 && fpRes.body.success ? "PASS" : "FAIL");

    const fpInvalid = await makeRequest("/api/auth/forgot-password", "POST", {
      phone: "9876543210",
      otp: "9999",
      newPassword: "newPassWord456"
    });
    console.log("TEST 6b: Invalid OTP rejected:", fpInvalid.status === 400 ? "PASS" : "FAIL");
  } catch (e) {
    console.error("TEST 6 FAILED:", e.message);
  }

  // TEST 7: POST /api/orders & GET /api/orders
  try {
    const orderRes = await makeRequest("/api/orders", "POST", {
      items: [
        { name: "Jan Aushadhi Paracetamol 650mg", quantity: 2, price: 12 },
        { name: "Jan Aushadhi ORS Electrolyte", quantity: 3, price: 8 }
      ],
      subtotal: 48,
      total: 48,
      customer: {
        name: "Sunita Devi",
        phone: "9876543210",
        address: "Sharda Enclave, Ward 4, Navrangpura"
      }
    });
    console.log("TEST 7: POST /api/orders (Creation):", orderRes.status === 201 && orderRes.body.id.startsWith("ORD-") ? "PASS" : "FAIL");

    const getOrdersRes = await makeRequest("/api/orders");
    console.log("TEST 7b: GET /api/orders (History):", getOrdersRes.status === 200 && getOrdersRes.body.length >= 2 ? "PASS" : "FAIL");
  } catch (e) {
    console.error("TEST 7 FAILED:", e.message);
  }

  // TEST 8: POST /api/emergency/sos
  try {
    const sosRes = await makeRequest("/api/emergency/sos", "POST", {
      locationName: "Kendrapara Sub-District PHC Ward 4",
      lat: 20.4996,
      lng: 86.4222
    });
    console.log("TEST 8: POST /api/emergency/sos:", sosRes.status === 200 && sosRes.body.dispatchId.startsWith("SOS-") ? "PASS" : "FAIL");
  } catch (e) {
    console.error("TEST 8 FAILED:", e.message);
  }

  // TEST 9: Verify 23 Languages in js/i18n.js
  const fs = require("fs");
  const i18nContent = fs.readFileSync("./js/i18n.js", "utf8");
  const requiredLanguages = [
    "en", "hi", "od", "bn", "as", "gu", "kn", "ml", "mr", "pa", "ta", "te", "ur",
    "sa", "kok", "mai", "mni", "ne", "sd", "ks", "doi", "brx", "sat"
  ];
  let langMissing = false;
  for (const lang of requiredLanguages) {
    if (!i18nContent.includes(`${lang}:`)) {
      console.error(`Language code missing in i18n.js: ${lang}`);
      langMissing = true;
    }
  }
  console.log("TEST 9: All 23 Indian Languages Defined in i18n:", !langMissing ? "PASS (All 23 Present)" : "FAIL");

  console.log("=== ALL TEST SUITE RUNS COMPLETED SUCCESSFULLY ===");
}

runTests();
