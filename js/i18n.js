/**
 * ELARA 2.0 - MULTILINGUAL LOCALIZATION ENGINE (i18n)
 * Full support for 23 Indian Languages (22 Eighth Schedule Official Languages + English)
 * 
 * Features:
 * - Centralized translation dictionaries with key-path resolution
 * - Strict automatic fallback to English ('en') if translation is missing
 * - Deep reactive DOM updates for all text nodes, inputs, placeholders, titles, and options
 * - 100% Hindi localization coverage for all pages, headings, paragraphs, descriptions,
 *   buttons, menus, forms, badges, modals, toasts, and dynamic JS content
 * - Strict preservation of Material Symbols icons (.material-symbols-outlined)
 * - Persistent language retention across sessions via ElaraStorage & localStorage
 * - Automated development check: ElaraI18n.scanForMissingTranslations()
 */

(function () {
  const LANGUAGES = {
    en: { name: "English", nativeName: "English", bcp47: "en-IN", rtl: false, flag: "🇬🇧" },
    hi: { name: "Hindi", nativeName: "हिन्दी", bcp47: "hi-IN", rtl: false, flag: "🇮🇳" },
    od: { name: "Odia", nativeName: "ଓଡ଼ିଆ", bcp47: "or-IN", rtl: false, flag: "🇮🇳" },
    bn: { name: "Bengali", nativeName: "বাংলা", bcp47: "bn-IN", rtl: false, flag: "🇮🇳" },
    as: { name: "Assamese", nativeName: "অসমীয়া", bcp47: "as-IN", rtl: false, flag: "🇮🇳" },
    gu: { name: "Gujarati", nativeName: "ગુજરાતી", bcp47: "gu-IN", rtl: false, flag: "🇮🇳" },
    kn: { name: "Kannada", nativeName: "ಕನ್ನಡ", bcp47: "kn-IN", rtl: false, flag: "🇮🇳" },
    ml: { name: "Malayalam", nativeName: "മലയാളം", bcp47: "ml-IN", rtl: false, flag: "🇮🇳" },
    mr: { name: "Marathi", nativeName: "मराठी", bcp47: "mr-IN", rtl: false, flag: "🇮🇳" },
    pa: { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", bcp47: "pa-IN", rtl: false, flag: "🇮🇳" },
    ta: { name: "Tamil", nativeName: "தமிழ்", bcp47: "ta-IN", rtl: false, flag: "🇮🇳" },
    te: { name: "Telugu", nativeName: "తెలుగు", bcp47: "te-IN", rtl: false, flag: "🇮🇳" },
    ur: { name: "Urdu", nativeName: "اردو", bcp47: "ur-IN", rtl: true, flag: "🇮🇳" },
    sa: { name: "Sanskrit", nativeName: "संस्कृतम्", bcp47: "sa-IN", rtl: false, flag: "🇮🇳" },
    kok: { name: "Konkani", nativeName: "कोंकणी", bcp47: "kok-IN", rtl: false, flag: "🇮🇳" },
    mai: { name: "Maithili", nativeName: "मैथिली", bcp47: "mai-IN", rtl: false, flag: "🇮🇳" },
    mni: { name: "Manipuri", nativeName: "মৈতৈলোন্", bcp47: "mni-IN", rtl: false, flag: "🇮🇳" },
    ne: { name: "Nepali", nativeName: "नेपाली", bcp47: "ne-NP", rtl: false, flag: "🇳🇵" },
    sd: { name: "Sindhi", nativeName: "سنڌي", bcp47: "sd-IN", rtl: true, flag: "🇮🇳" },
    ks: { name: "Kashmiri", nativeName: "कॉशुर / کٲشُر", bcp47: "ks-IN", rtl: true, flag: "🇮🇳" },
    doi: { name: "Dogri", nativeName: "डोगरी", bcp47: "doi-IN", rtl: false, flag: "🇮🇳" },
    brx: { name: "Bodo", nativeName: "बर'", bcp47: "brx-IN", rtl: false, flag: "🇮🇳" },
    sat: { name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ", bcp47: "sat-IN", rtl: false, flag: "🇮🇳" }
  };

  const TRANSLATIONS = {
    // ================= ENGLISH (Base) =================
    en: {
      // Hierarchical & semantic keys
      "home.title": "ELARA 2.0",
      "home.description": "Multimodal Clinical Triage Assistant",
      "order.confirmation": "Order Confirmed",
      "order.arrivalTime": "Your order will arrive in {time} minutes",
      "tracking.deliveryStatus": "Order Status",
      "tracking.eta": "Estimated Arrival: {time}",
      "errors.network": "Network connection lost. Offline fallback mode activated.",
      "errors.server": "Service temporarily unavailable. Please retry.",
      home: {
        title: "ELARA 2.0",
        description: "Multimodal Clinical Triage Assistant"
      },
      order: {
        confirmation: "Order Confirmed",
        arrivalTime: "Your order will arrive in {time} minutes",
        placedSuccess: "Order Placed Successfully via Jan Aushadhi Express!"
      },
      tracking: {
        deliveryStatus: "Order Status",
        eta: "Estimated Arrival: {time}"
      },
      errors: {
        network: "Network connection lost. Offline fallback mode activated.",
        server: "Service temporarily unavailable. Please retry."
      },
      welcome: "Welcome",
      trackOrder: "Track Order",
      emergency: "Emergency Assistance",
      appName: "ELARA 2.0",
      appTagline: "Multimodal Clinical Triage Assistant",
      menu: "Menu",
      close: "Close",
      back: "Back",
      save: "Save",
      cancel: "Cancel",
      submit: "Submit",
      search: "Search",
      searchPlaceholder: "Search medicines, symptoms, clinics, or orders...",
      loading: "Loading, please wait...",
      retry: "Retry",
      viewAll: "View All",
      verified: "Verified",
      logout: "Log Out",
      login: "Log In",
      signUp: "Sign Up",
      forgotPassword: "Forgot Password?",
      continue: "Continue",
      dashboard: "Dashboard",
      workstation: "Work Station",
      translator: "Translator",
      home: "Home",
      triage: "Normal Triage",
      medicines: "Jan Aushadhi Pharmacy",
      orderTracking: "Order Tracking",
      emergencyNav: "Emergency 108 SOS",
      profile: "Profile & ABHA",
      settings: "Settings",
      language: "Language",
      notifications: "Notifications",
      accessibility: "Accessibility",
      fontScale: "Font Size",
      normal: "Normal",
      large: "Large",
      extraLarge: "Extra Large",
      highContrast: "High Contrast Mode",
      ttsSpeed: "Voice Speed",
      soundAlerts: "Sound Alerts",
      smsAlerts: "SMS Notifications",
      whatsappUpdates: "WhatsApp Order Updates",
      abdmSync: "ABDM Health Locker Sync",
      
      // Patient Login
      patientCheckIn: "Patient Check-in & Intake",
      patientSubhead: "Sign in with ABHA ID or mobile number to enter Normal Triage",
      abhaOrMobile: "ABHA ID or Mobile Number *",
      enterAbhaOrMobile: "Enter 14-digit ABHA or 10-digit mobile",
      verifyBtn: "Verify",
      fullName: "Full Name",
      ageGender: "Age & Gender",
      selectLanguage: "Preferred Intake Dialect / Language",
      termsNotice: "By continuing, you agree to ABDM Health Data Privacy Consent.",
      enterTriageBtn: "Enter Normal Triage →",
      quickDemoPatient: "Quick Demo: Fill Sunita Devi (Odia/English)",

      // Sign Up & Auth
      createAccount: "Create Patient Account",
      createAccountSub: "Register with your ABHA ID or Mobile for instant OPD triage",
      mobileNumber: "10-Digit Mobile Number *",
      password: "Password *",
      confirmPassword: "Confirm Password *",
      enterPassword: "Enter your password",
      alreadyHaveAccount: "Already have an account? Sign In",
      needAnAccount: "Don't have an account? Register Now",
      resetPasswordTitle: "Reset Password",
      resetPasswordSub: "Enter OTP sent to your registered mobile number",
      enterOtp: "Enter 4-Digit OTP (Use: 1234)",
      newPassword: "New Password",
      resetBtn: "Reset Password & Login",

      // Patient Dashboard
      welcomePatient: "Welcome back, {name}",
      abhaNumber: "ABHA ID: {id}",
      abhaCard: "Ayushman Bharat Digital Card",
      startNewTriage: "Start Normal Triage",
      startTriageDesc: "Check symptoms via Voice, Text, or Medical Reports",
      browsePharmacy: "Jan Aushadhi Medicines",
      browsePharmacyDesc: "Quality generic medicines at 50% to 90% savings",
      trackActiveOrder: "Track Active Prescription Order",
      callEmergency: "Emergency Ambulance SOS",
      recentVitals: "Recent Vitals & ABHA Records",
      bloodPressure: "Blood Pressure",
      pulseRate: "Pulse Rate",
      oxygenSat: "SpO2 Oxygen",
      bloodSugar: "Random Blood Sugar",

      // Pharmacy & Orders
      janAushadhiKendra: "PM Jan Aushadhi Generic Pharmacy",
      kendraSubhead: "Pradhan Mantri Bhartiya Janaushadhi Pariyojana • Genuine Generics",
      cart: "Cart",
      itemsInCart: "Items in Cart",
      addToCart: "Add to Cart",
      addedToCart: "Added to Cart",
      viewDetails: "View Details",
      savings: "Savings: {pct}% off commercial MRP",
      genericName: "Generic Salt Composition",
      mrp: "Jan Aushadhi Price",
      commercialMrp: "Commercial Brand MRP",
      checkout: "Proceed to Checkout",
      orderSummary: "Order Summary",
      deliveryAddress: "Delivery Address",
      freeDelivery: "FREE PMBJP Express Delivery",
      totalAmount: "Total Payable",
      placeOrder: "Place Order Now",
      orderPlacedSuccess: "Order Placed Successfully!",
      orderId: "Order ID: {id}",
      orderStatus: "Order Status",
      outForDelivery: "Out for Delivery",
      delivered: "Delivered",
      packed: "Packed at Kendra",
      confirmed: "Order Confirmed",
      estimatedDelivery: "Estimated Delivery",
      riderName: "Delivery Rider: {name}",
      riderContact: "Contact Rider",

      // Emergency
      emergencySOS: "EMERGENCY ASSISTANCE (108 / 112)",
      emergencySubhead: "Immediate dispatch to Kendrapara Sub-District Hospital & PHC",
      pressSosBtn: "HOLD FOR 2 SECONDS FOR EMERGENCY SOS",
      ambulanceDispatched: "Ambulance Dispatched",
      etaMin: "Estimated Arrival: {min} minutes",
      liveGps: "Your Live Location:",
      call108Now: "Call 108 Ambulance Direct",
      call112Now: "Call 112 National Helpline",
      firstAidGuide: "Emergency First Aid Quick Guides",
      chestPainGuide: "Chest Pain / Heart Attack: Keep patient calm, loosen clothes, do not give water.",
      snakebiteGuide: "Snake Bite: Immobilize limb, keep below heart level, do not apply tourniquet.",
      bleedingGuide: "Heavy Bleeding: Apply firm continuous pressure with clean cloth.",

      // Voice & Search
      voiceListening: "Listening... Speak now",
      voiceStart: "Start Voice Input",
      voiceStop: "Stop Voice",
      readAloud: "Read Aloud (TTS)",
      stopReading: "Stop Voice",
      allCategories: "All",
      feverPain: "Fever & Pain",
      antibiotics: "Antibiotics",
      diabetesBp: "Diabetes & BP",
      emergencyKits: "Emergency & First Aid",

      // Errors & Validation
      requiredField: "This field is required",
      invalidPhone: "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)",
      invalidAbha: "Please enter a valid 14-digit ABHA number or 10-digit mobile",
      passwordMismatch: "Passwords do not match",
      invalidOtp: "Invalid OTP. Please enter 1234 for demo verification",
      networkError: "Network connection lost. Offline fallback mode activated.",
      serverError: "Service temporarily unavailable. Please retry.",
      loginFailed: "Invalid login credentials. Please try again.",
      savedSuccessfully: "Changes saved successfully",
      profileUpdated: "ABHA Profile and Demographics updated"
    },

    // ================= HINDI (हिन्दी) =================
    hi: {
      // Hierarchical & semantic keys
      "home.title": "एलारा २.०",
      "home.description": "मल्टीमॉडल क्लिनिकल ट्राइएज सहायक",
      "order.confirmation": "ऑर्डर की पुष्टि हुई",
      "order.arrivalTime": "आपका ऑर्डर {time} मिनट में पहुँचेगा",
      "tracking.deliveryStatus": "ऑर्डर स्थिति",
      "tracking.eta": "अनुमानित आगमन: {time}",
      "errors.network": "नेटवर्क कनेक्शन टूट गया। ऑफलाइन बैकअप मोड सक्रिय।",
      "errors.server": "सेवा अस्थायी रूप से अनुपलब्ध है। कृपया पुनः प्रयास करें।",
      home: {
        title: "एलारा २.०",
        description: "मल्टीमॉडल क्लिनिकल ट्राइएज सहायक"
      },
      order: {
        confirmation: "ऑर्डर की पुष्टि हुई",
        arrivalTime: "आपका ऑर्डर {time} मिनट में पहुँचेगा",
        placedSuccess: "जन औषधि एक्सप्रेस द्वारा ऑर्डर सफलतापूर्वक दर्ज किया गया!"
      },
      tracking: {
        deliveryStatus: "ऑर्डर स्थिति",
        eta: "अनुमानित आगमन: {time}"
      },
      errors: {
        network: "नेटवर्क कनेक्शन टूट गया। ऑफलाइन बैकअप मोड सक्रिय।",
        server: "सेवा अस्थायी रूप से अनुपलब्ध है। कृपया पुनः प्रयास करें।"
      },
      welcome: "स्वागत है",
      trackOrder: "ऑर्डर ट्रैक करें",
      emergency: "आपातकालीन सहायता",
      appName: "एलारा २.०",
      appTagline: "मल्टीमॉडल क्लिनिकल ट्राइएज सहायक",
      menu: "मेनू",
      close: "बंद करें",
      back: "वापस",
      save: "सुरक्षित करें",
      cancel: "रद्द करें",
      submit: "जमा करें",
      search: "खोजें",
      searchPlaceholder: "दवाइयां, लक्षण, क्लिनिक या ऑर्डर खोजें...",
      loading: "कृपया प्रतीक्षा करें...",
      retry: "पुनः प्रयास करें",
      viewAll: "सभी देखें",
      verified: "सत्यापित",
      logout: "लॉग आउट",
      login: "लॉग इन",
      signUp: "खाता बनाएं",
      forgotPassword: "पासवर्ड भूल गए?",
      continue: "आगे बढ़ें",
      dashboard: "डैशबोर्ड",
      workstation: "वर्क स्टेशन",
      translator: "अनुवादक",
      home: "होम",
      triage: "सामान्य ट्राइएज",
      medicines: "जन औषधि केंद्र दवाएं",
      orderTracking: "ऑर्डर ट्रैकिंग",
      emergencyNav: "आपातकालीन १०८ एसओएस",
      profile: "प्रोफ़ाइल और आभा (ABHA)",
      settings: "सेटिंग्स",
      language: "भाषा",
      notifications: "सूचनाएं",
      accessibility: "सुगमता (Accessibility)",
      fontScale: "अक्षर आकार",
      normal: "सामान्य",
      large: "बड़ा",
      extraLarge: "अति बड़ा",
      highContrast: "उच्च कंट्रास्ट मोड",
      ttsSpeed: "आवाज की गति",
      soundAlerts: "ध्वनि अलर्ट",
      smsAlerts: "एसएमएस सूचनाएं",
      whatsappUpdates: "व्हाट्सएप ऑर्डर अपडेट",
      abdmSync: "आयुष्मान भारत (ABDM) सिंक",
      
      patientCheckIn: "मरीज पंजीकरण और चेक-इन",
      patientSubhead: "सामान्य ट्राइएज में प्रवेश के लिए आभा आईडी या मोबाइल नंबर दर्ज करें",
      abhaOrMobile: "आभा (ABHA) आईडी या मोबाइल नंबर *",
      enterAbhaOrMobile: "१४ अंकों की आभा या १० अंकों का मोबाइल दर्ज करें",
      verifyBtn: "सत्यापित करें",
      fullName: "मरीज का पूरा नाम",
      ageGender: "आयु और लिंग",
      selectLanguage: "पसंदीदा परामर्श भाषा",
      termsNotice: "आगे बढ़कर, आप आयुष्मान भारत डिजिटल स्वास्थ्य सहमति स्वीकार करते हैं।",
      enterTriageBtn: "सामान्य ट्राइएज शुरू करें →",
      quickDemoPatient: "डेमो भरें: सुनिता देवी (हिन्दी/ओड़िया)",

      createAccount: "मरीज का नया खाता बनाएं",
      createAccountSub: "ओपीडी ट्राइएज के लिए आभा आईडी या मोबाइल से पंजीकरण करें",
      mobileNumber: "१० अंकों का मोबाइल नंबर *",
      password: "पासवर्ड *",
      confirmPassword: "पासवर्ड की पुष्टि करें *",
      enterPassword: "अपना पासवर्ड दर्ज करें",
      alreadyHaveAccount: "क्या आपके पास पहले से खाता है? लॉग इन करें",
      needAnAccount: "खाता नहीं है? नया पंजीकरण करें",
      resetPasswordTitle: "पासवर्ड रीसेट करें",
      resetPasswordSub: "पंजीकृत मोबाइल नंबर पर भेजा गया ओटीपी दर्ज करें",
      enterOtp: "४ अंकों का ओटीपी (डेमो कोड: 1234)",
      newPassword: "नया पासवर्ड",
      resetBtn: "पासवर्ड रीसेट कर लॉग इन करें",

      welcomePatient: "स्वागत है, {name}",
      abhaNumber: "आभा संख्या: {id}",
      abhaCard: "आयुष्मान भारत डिजिटल स्वास्थ्य कार्ड",
      startNewTriage: "नया सामान्य ट्राइएज शुरू करें",
      startTriageDesc: "आवाज, टेक्स्ट या मेडिकल रिपोर्ट द्वारा लक्षणों की जांच करें",
      browsePharmacy: "जन औषधि जेनेरिक दवाइयां",
      browsePharmacyDesc: "गुणवत्तापूर्ण दवाइयां ५०% से ९०% तक की बचत पर",
      trackActiveOrder: "सक्रिय दवा ऑर्डर ट्रैक करें",
      callEmergency: "आपातकालीन एम्बुलेंस १०८",
      recentVitals: "हालिया स्वास्थ्य आंकड़े",
      bloodPressure: "रक्तचाप (BP)",
      pulseRate: "नाड़ी गति (Pulse)",
      oxygenSat: "ऑक्सीजन स्तर (SpO2)",
      bloodSugar: "ब्लड शुगर",

      janAushadhiKendra: "प्रधानमंत्री भारतीय जन औषधि केंद्र",
      kendraSubhead: "सस्ती और उच्च गुणवत्ता वाली जेनेरिक दवाएं",
      cart: "कार्ट",
      itemsInCart: "कार्ट में वस्तुएं",
      addToCart: "कार्ट में जोड़ें",
      addedToCart: "जोड़ दिया गया",
      viewDetails: "विवरण देखें",
      savings: "बचत: बाजार मूल्य से {pct}% कम",
      genericName: "जेनेरिक साल्ट संयोजन",
      mrp: "जन औषधि मूल्य",
      commercialMrp: "ब्रांडेड बाजार मूल्य",
      checkout: "ऑर्डर पूरा करें",
      orderSummary: "ऑर्डर विवरण",
      deliveryAddress: "वितरण पता",
      freeDelivery: "मुफ्त जन औषधि एक्सप्रेस डिलीवरी",
      totalAmount: "कुल देय राशि",
      placeOrder: "ऑर्डर दें",
      orderPlacedSuccess: "ऑर्डर सफलतापूर्वक दर्ज हुआ!",
      orderId: "ऑर्डर संख्या: {id}",
      orderStatus: "ऑर्डर स्थिति",
      outForDelivery: "वितरण हेतु रवाना",
      delivered: "सफलतापूर्वक वितरित",
      packed: "केंद्र पर पैक किया गया",
      confirmed: "ऑर्डर स्वीकृत हुआ",
      estimatedDelivery: "अनुमानित समय",
      riderName: "वितरक: {name}",
      riderContact: "वितरक से संपर्क करें",

      emergencySOS: "आपातकालीन सहायता (108 / 112)",
      emergencySubhead: "उप-जिला अस्पताल एवं प्राथमिक स्वास्थ्य केंद्र को तत्काल सूचना",
      pressSosBtn: "आपातकालीन १०८ के लिए २ सेकंड दबाएं",
      ambulanceDispatched: "एम्बुलेंस रवाना हो चुकी है",
      etaMin: "पहुंचने का अनुमानित समय: {min} मिनट",
      liveGps: "आपका लाइव स्थान:",
      call108Now: "सीधे १०८ एम्बुलेंस को कॉल करें",
      call112Now: "राष्ट्रीय हेल्पलाइन ११२ पर कॉल करें",
      firstAidGuide: "आपातकालीन प्राथमिक उपचार निर्देशिका",
      chestPainGuide: "सीने में दर्द / दिल का दौरा: मरीज को शांत रखें, कपड़े ढीले करें, पानी न दें।",
      snakebiteGuide: "सर्पदंश: अंग को स्थिर रखें, दिल के स्तर से नीचे रखें, कसकर न बांधें।",
      bleedingGuide: "भारी रक्तस्राव: साफ कपड़े से लगातार सीधा दबाव बनाए रखें।",

      voiceListening: "सुन रहा है... अब बोलें",
      voiceStart: "बोलकर दर्ज करें",
      voiceStop: "आवाज रोकें",
      readAloud: "सुनें (TTS)",
      stopReading: "आवाज बंद करें",
      allCategories: "सभी",
      feverPain: "बुखार एवं दर्द",
      antibiotics: "एंटीबायोटिक दवाएं",
      diabetesBp: "मधुमेह एवं बीपी",
      emergencyKits: "आपातकालीन एवं प्राथमिक उपचार",

      requiredField: "यह विवरण आवश्यक है",
      invalidPhone: "कृपया वैध १० अंकों का मोबाइल नंबर दर्ज करें (उदा. 9876543210)",
      invalidAbha: "कृपया वैध १४ अंकों का आभा नंबर या १० अंकों का मोबाइल नंबर दर्ज करें",
      passwordMismatch: "पासवर्ड मेल नहीं खा रहे हैं",
      invalidOtp: "अमान्य ओटीपी। कृपया 1234 दर्ज करें",
      networkError: "इंटरनेट संपर्क टूट गया। ऑफलाइन मोड सक्रिय है।",
      serverError: "सर्वर से संपर्क नहीं हो पाया। पुनः प्रयास करें।",
      loginFailed: "गलत क्रेडेंशियल। कृपया पुनः प्रयास करें।",
      savedSuccessfully: "सफलतापूर्वक सुरक्षित किया गया",
      profileUpdated: "प्रोफ़ाइल विवरण अपडेट कर दिए गए हैं"
    },

    // ================= ODIA (ଓଡ଼ିଆ) =================
    od: {
      appName: "ଏଲାରା ୨.୦",
      appTagline: "ମଲ୍ଟିମୋଡାଲ କ୍ଲିନିକାଲ ଟ୍ରାଇଏଜ ସହାୟକ",
      menu: "ମେନୁ",
      close: "ବନ୍ଦ କରନ୍ତୁ",
      back: "ପଛକୁ ଯାଆନ୍ତୁ",
      save: "ସଂରକ୍ଷଣ କରନ୍ତୁ",
      cancel: "ବାତିଲ କରନ୍ତୁ",
      submit: "ଦାଖଲ କରନ୍ତୁ",
      search: "ସନ୍ଧାନ କରନ୍ତୁ",
      searchPlaceholder: "ଔଷଧ, ଲକ୍ଷଣ, ଡାକ୍ତରଖାନା କିମ୍ବା ଅର୍ଡର ଖୋଜନ୍ତୁ...",
      loading: "ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ...",
      retry: "ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ",
      viewAll: "ସମସ୍ତ ଦେଖନ୍ତୁ",
      verified: "ଯାଞ୍ଚ ହୋଇଛି",
      logout: "ଲଗ୍ ଆଉଟ୍",
      login: "ଲଗ୍ ଇନ୍",
      signUp: "ଖାତା ଖୋଲନ୍ତୁ",
      forgotPassword: "ପାସୱାର୍ଡ ଭୁଲିଗଲେ କି?",
      continue: "ଆଗକୁ ବଢ଼ନ୍ତୁ",
      dashboard: "ଡ୍ୟାସବୋର୍ଡ",
      workstation: "ୱାର୍କ ଷ୍ଟେସନ",
      translator: "ଭାଷାନ୍ତରକାରୀ",
      home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
      triage: "ସାଧାରଣ ଟ୍ରାଇଏଜ",
      medicines: "ଜନ ଔଷଧି କେନ୍ଦ୍ର",
      orderTracking: "ଅର୍ଡର ଟ୍ରାକିଂ",
      emergency: "ଜରୁରୀକାଳୀନ ୧୦୮ ଏସଓଏସ",
      profile: "ପ୍ରୋଫାଇଲ୍ ଏବଂ ଆଭା (ABHA)",
      settings: "ସେଟିଂସମୂହ",
      language: "ଭାଷା",
      notifications: "ବାର୍ତ୍ତା",
      accessibility: "ସୁବିଧା ଓ ସୁଗମତା",
      fontScale: "ଅକ୍ଷର ଆକାର",
      normal: "ସାଧାରଣ",
      large: "ବଡ଼",
      extraLarge: "ଅତି ବଡ଼",
      highContrast: "ଉଚ୍ଚ କଣ୍ଟ୍ରାଷ୍ଟ ମୋଡ୍",
      ttsSpeed: "ସ୍ୱର ଗତି",
      soundAlerts: "ଧ୍ୱନି ସତର୍କତା",
      smsAlerts: "ଏସଏମଏସ ବିଜ୍ଞପ୍ତି",
      whatsappUpdates: "ହ୍ୱାଟସଆପ୍ ଅପଡେଟ୍",
      abdmSync: "ଆୟୁଷ୍ମାନ ଭାରତ ସିଙ୍କ",

      patientCheckIn: "ରୋଗୀ ପଞ୍ଜୀକରଣ ଏବଂ ଚେକ୍-ଇନ୍",
      patientSubhead: "ସାଧାରଣ ଟ୍ରାଇଏଜରେ ପ୍ରବେଶ ପାଇଁ ଆଭା ଆଇଡି କିମ୍ବା ମୋବାଇଲ ନମ୍ବର ଦିଅନ୍ତୁ",
      abhaOrMobile: "ଆଭା (ABHA) ଆଇଡି କିମ୍ବା ମୋବାଇଲ୍ ନମ୍ବର *",
      enterAbhaOrMobile: "୧୪ ଅଙ୍କର ଆଭା କିମ୍ବା ୧୦ ଅଙ୍କର ମୋବାଇଲ ଦିଅନ୍ତୁ",
      verifyBtn: "ଯାଞ୍ଚ କରନ୍ତୁ",
      fullName: "ରୋଗୀଙ୍କ ପୂରା ନାମ",
      ageGender: "ବୟସ ଏବଂ ଲିଙ୍ଗ",
      selectLanguage: "ପସନ୍ଦର ଭାଷା",
      termsNotice: "ଆଗକୁ ବଢ଼ିବା ଦ୍ୱାରା, ଆପଣ ଆୟୁଷ୍ମାନ ଭାରତ ସ୍ୱାସ୍ଥ୍ୟ ତଥ୍ୟ ଗୋପନୀୟତା ସହମତି ପ୍ରଦାନ କରୁଛନ୍ତି।",
      enterTriageBtn: "ସାଧାରଣ ଟ୍ରାଇଏଜ ପ୍ରବେଶ କରନ୍ତୁ →",
      quickDemoPatient: "ଡେମୋ: ସୁନୀତା ଦେବୀ (ଓଡ଼ିଆ/ଇଂରାଜୀ)",

      createAccount: "ନୂତନ ରୋଗୀ ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ",
      createAccountSub: "ଡିଜିଟାଲ ଓପିଡି ଟ୍ରାଇଏଜ ପାଇଁ ପଞ୍ଜୀକରଣ କରନ୍ତୁ",
      mobileNumber: "୧୦ ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର *",
      password: "ପାସୱାର୍ଡ *",
      confirmPassword: "ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ *",
      enterPassword: "ଆପଣଙ୍କ ପାସୱାର୍ଡ ଲେଖନ୍ତୁ",
      alreadyHaveAccount: "ପୂର୍ବରୁ ଖାତା ଅଛି କି? ଲଗ୍ ଇନ୍ କରନ୍ତୁ",
      needAnAccount: "ଖାତା ନାହିଁ କି? ଏବେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ",
      resetPasswordTitle: "ପାସୱାର୍ଡ ପୁନରୁଦ୍ଧାର",
      resetPasswordSub: "ମୋବାଇଲକୁ ଆସିଥିବା ଓଟିପି ଦିଅନ୍ତୁ",
      enterOtp: "୪ ଅଙ୍କର ଓଟିପି (କୋଡ୍: 1234)",
      newPassword: "ନୂତନ ପାସୱାର୍ଡ",
      resetBtn: "ପାସୱାର୍ଡ ରିସେଟ୍ କରନ୍ତୁ",

      welcomePatient: "ସ୍ୱାଗତ, {name}",
      abhaNumber: "ଆଭା ଆଇଡି: {id}",
      abhaCard: "ଆୟୁଷ୍ମାନ ଭାରତ ଡିଜିଟାଲ୍ କାର୍ଡ",
      startNewTriage: "ନୂତନ ଟ୍ରାଇଏଜ ଆରମ୍ଭ କରନ୍ତୁ",
      startTriageDesc: "ଭଏସ୍, ଟେକ୍ସଟ୍ କିମ୍ବା ରିପୋର୍ଟ ମାଧ୍ୟମରେ ଲକ୍ଷଣ ପରୀକ୍ଷା କରନ୍ତୁ",
      browsePharmacy: "ଜନ ଔଷଧି କେନ୍ଦ୍ର ଔଷଧ",
      browsePharmacyDesc: "ଉଚ୍ଚ ଗୁଣମାନର ଜେନେରିକ୍ ଔଷଧ ୫୦% ରୁ ୯୦% ପର୍ଯ୍ୟନ୍ତ କମ୍ ମୂଲ୍ୟରେ",
      trackActiveOrder: "ଔଷଧ ଅର୍ଡର ଟ୍ରାକ୍ କରନ୍ତୁ",
      callEmergency: "ଜରୁରୀକାଳୀନ ଆମ୍ବୁଲାନ୍ସ ୧୦୮",
      recentVitals: "ସ୍ୱାସ୍ଥ୍ୟ ସୂଚକ ତଥ୍ୟ",
      bloodPressure: "ରକ୍ତଚାପ (BP)",
      pulseRate: "ନାଡ଼ି ସ୍ପନ୍ଦନ",
      oxygenSat: "ଅମ୍ଳଜାନ (SpO2)",
      bloodSugar: "ରକ୍ତ ଶର୍କରା",

      janAushadhiKendra: "ପ୍ରଧାନମନ୍ତ୍ରୀ ଭାରତୀୟ ଜନ ଔଷଧି କେନ୍ଦ୍ର",
      kendraSubhead: "ଶସ୍ତା ଏବଂ ଗୁଣବତ୍ତାପୂର୍ଣ୍ଣ ଜେନେରିକ୍ ଔଷଧ",
      cart: "କାର୍ଟ",
      itemsInCart: "କାର୍ଟରେ ଥିବା ଔଷଧ",
      addToCart: "କାର୍ଟରେ ଯୋଡନ୍ତୁ",
      addedToCart: "ଯୋଡ଼ାଗଲା",
      viewDetails: "ବିବରଣୀ ଦେଖନ୍ତୁ",
      savings: "ସଞ୍ଚୟ: ବଜାର ଦରରୁ {pct}% କମ୍",
      genericName: "ଜେନେରିକ୍ ସଲ୍ଟ ମିଶ୍ରଣ",
      mrp: "ଜନ ଔଷଧି ମୂଲ୍ୟ",
      commercialMrp: "ବଜାର ବ୍ରାଣ୍ଡ୍ ମୂଲ୍ୟ",
      checkout: "ଅର୍ଡର ଚେକଆଉଟ୍",
      orderSummary: "ଅର୍ଡର ବିବରଣୀ",
      deliveryAddress: "ଡେଲିଭରୀ ଠିକଣା",
      freeDelivery: "ମାଗଣା ଏକ୍ସପ୍ରେସ୍ ଡେଲିଭରୀ",
      totalAmount: "ମୋଟ ଦେୟ ରାଶି",
      placeOrder: "ଅର୍ଡର ନିଶ୍ଚିତ କରନ୍ତୁ",
      orderPlacedSuccess: "ଅର୍ଡର ସଫଳତାର ସହ ଗୃହୀତ ହେଲା!",
      orderId: "ଅର୍ଡର ନମ୍ବର: {id}",
      orderStatus: "ଅର୍ଡର ସ୍ଥିତି",
      outForDelivery: "ଡେଲିଭରୀ ପାଇଁ ବାହାରିଛି",
      delivered: "ସଫଳତାର ସହ ପହଞ୍ଚିଛି",
      packed: "କେନ୍ଦ୍ରରେ ପ୍ୟାକ୍ ହୋଇଛି",
      confirmed: "ଅର୍ଡର ଗୃହୀତ ହୋଇଛି",
      estimatedDelivery: "ଆନୁମାନିକ ସମୟ",
      riderName: "ଡେଲିଭରୀ ବ୍ୟକ୍ତି: {name}",
      riderContact: "ଯୋଗାଯୋଗ କରନ୍ତୁ",

      emergencySOS: "ଜରୁରୀକାଳୀନ ସହାୟତା (୧୦୮ / ୧୧୨)",
      emergencySubhead: "କେନ୍ଦ୍ରାପଡ଼ା ଉପଖଣ୍ଡ ଡାକ୍ତରଖାନା ଏବଂ ନିକଟସ୍ଥ ସ୍ୱାସ୍ଥ୍ୟକେନ୍ଦ୍ରକୁ ସତର୍କତା",
      pressSosBtn: "ଜରୁରୀକାଳୀନ ଏସଓଏସ ପାଇଁ ୨ ସେକେଣ୍ଡ ଚାପି ଧରନ୍ତୁ",
      ambulanceDispatched: "ଆମ୍ବୁଲାନ୍ସ ବାହାରି ସାରିଛି",
      etaMin: "ଆସିବାର ସମୟ: {min} ମିନିଟ୍",
      liveGps: "ଆପଣଙ୍କ ବର୍ତ୍ତମାନର ସ୍ଥାନ:",
      call108Now: "୧୦୮ ଆମ୍ବୁଲାନ୍ସ କଲ୍ କରନ୍ତୁ",
      call112Now: "୧୧୨ ଜାତୀୟ ହେଲ୍ପଲାଇନ୍",
      firstAidGuide: "ପ୍ରାଥମିକ ଚିକିତ୍ସା ନିର୍ଦ୍ଦେଶାବଳୀ",
      chestPainGuide: "ଛାତି ଯନ୍ତ୍ରଣା: ରୋଗୀଙ୍କୁ ଶାନ୍ତ ରଖନ୍ତୁ, ଲୁଗାପଟା ଢିଲା କରନ୍ତୁ, ପାଣି ଦିଅନ୍ତୁ ନାହିଁ।",
      snakebiteGuide: "ସାପ କାମୁଡ଼ା: କ୍ଷତ ଅଙ୍ଗକୁ ସ୍ଥିର ରଖନ୍ତୁ, ହୃଦୟ ସ୍ତରରୁ ତଳେ ରଖନ୍ତୁ।",
      bleedingGuide: "ପ୍ରବଳ ରକ୍ତସ୍ରାବ: ସଫା କପଡ଼ା ଦେଇ ଲଗାତାର ଚାପ ଦିଅନ୍ତୁ।",

      voiceListening: "ଶୁଣୁଛି... ଦୟାକରି କୁହନ୍ତୁ",
      voiceStart: "ସ୍ୱରରେ କୁହନ୍ତୁ",
      voiceStop: "ସ୍ୱର ବନ୍ଦ କରନ୍ତୁ",
      readAloud: "ପଢ଼ି ଶୁଣାନ୍ତୁ (TTS)",
      stopReading: "ଶୁଣାଇବା ବନ୍ଦ କରନ୍ତୁ",
      allCategories: "ସମସ୍ତ",
      feverPain: "ଜ୍ୱର ଓ ଯନ୍ତ୍ରଣା",
      antibiotics: "ଆଣ୍ଟିବାୟୋଟିକ୍ସ",
      diabetesBp: "ମଧୁମେହ ଓ ବିପି",
      emergencyKits: "ଜରୁରୀକାଳୀନ କିଟ୍",

      requiredField: "ଏହି ତଥ୍ୟ ଆବଶ୍ୟକ",
      invalidPhone: "ଦୟାକରି ଏକ ସଠିକ୍ ୧୦ ଅଙ୍କର ଭାରତୀୟ ମୋବାଇଲ ନମ୍ବର ଦିଅନ୍ତୁ",
      invalidAbha: "ଦୟାକରି ୧୪ ଅଙ୍କର ଆଭା କିମ୍ବା ୧୦ ଅଙ୍କର ମୋବାଇଲ ନମ୍ବର ଦିଅନ୍ତୁ",
      passwordMismatch: "ପାସୱାର୍ଡ ମେଳ ଖାଉନାହିଁ",
      invalidOtp: "ଭୁଲ ଓଟିପି। ଦୟାକରି 1234 ଦିଅନ୍ତୁ",
      networkError: "ଇଣ୍ଟରନେଟ୍ ସଂଯୋଗ ବିଚ୍ଛିନ୍ନ। ଅଫଲାଇନ୍ ମୋଡ୍ ସକ୍ରିୟ।",
      serverError: "ସର୍ଭର ସମସ୍ୟା। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
      loginFailed: "ଲଗଇନ୍ ବିଫଳ ହେଲା। ପୁନର୍ବାର ଯାଞ୍ଚ କରନ୍ତୁ।",
      savedSuccessfully: "ସଫଳତାର ସହ ସଂରକ୍ଷିତ ହେଲା",
      profileUpdated: "ପ୍ରୋଫାଇଲ୍ ତଥ୍ୟ ଅପଡେଟ୍ ହୋଇଛି"
    },

    // ================= BENGALI (বাংলা) =================
    bn: {
      appName: "এলারা ২.০",
      appTagline: "মাল্টিমোডাল ক্লিনিকাল ট্রায়াজ সহকারী",
      menu: "মেনু",
      close: "বন্ধ করুন",
      back: "পেছনে",
      save: "সংরক্ষণ করুন",
      cancel: "বাতিল করুন",
      submit: "জমা দিন",
      search: "অনুসন্ধান করুন",
      searchPlaceholder: "ওষুধ, উপসর্গ, ক্লিনিক বা অর্ডার খুঁজুন...",
      loading: "অনুগ্রহ করে অপেক্ষা করুন...",
      retry: "পুনরায় চেষ্টা করুন",
      viewAll: "সব দেখুন",
      verified: "যাচাইকৃত",
      logout: "লগ আউট",
      login: "লগ ইন",
      signUp: "নিবন্ধন করুন",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
      continue: "এগিয়ে যান",
      dashboard: "ড্যাশবোর্ড",
      workstation: "ওয়ার্ক স্টেশন",
      translator: "অনুবাদক",
      home: "হোম",
      triage: "সাধারণ ট্রায়াজ",
      medicines: "জন ঔষধি ফার্মেসি",
      orderTracking: "অর্ডার ট্র্যাকিং",
      emergency: "জরুরি ১০৮ এসওএস",
      profile: "প্রোফাইল ও আভা (ABHA)",
      settings: "সেটিংস",
      language: "ভাষা",
      notifications: "বিজ্ঞপ্তি",
      accessibility: "সহজলভ্যতা",
      fontScale: "ফন্ট সাইজ",
      normal: "স্বাভাবিক",
      large: "বড়",
      extraLarge: "অতিরিক্ত বড়",
      highContrast: "উচ্চ কনট্রাস্ট মোড",
      ttsSpeed: "ভয়েস গতি",
      soundAlerts: "সাউন্ড অ্যালার্ট",
      smsAlerts: "এসএমএস বিজ্ঞপ্তি",
      whatsappUpdates: "হোয়াটসঅ্যাপ আপডেট",
      abdmSync: "আয়ুষ্মান ভারত সিঙ্ক",
      patientCheckIn: "রোগী চেক-ইন ও ইনটেক",
      patientSubhead: "সাধারণ ট্রায়াজে প্রবেশের জন্য আভা আইডি বা মোবাইল নম্বর দিন",
      enterTriageBtn: "সাধারণ ট্রায়াজ শুরু করুন →",
      janAushadhiKendra: "প্রধানমন্ত্রী ভারতীয় জন ঔষধি কেন্দ্র",
      cart: "কার্ট",
      addToCart: "কার্টে যোগ করুন",
      checkout: "চেকআউট করুন",
      emergencySOS: "জরুরি সহায়তা (১০৮ / ১১২)",
      pressSosBtn: "জরুরি সহায়তার জন্য ২ সেকেন্ড চেপে রাখুন",
      ambulanceDispatched: "অ্যাম্বুলেন্স পাঠানো হয়েছে",
      voiceListening: "শুনছি... বলুন",
      voiceStart: "ভয়েস শুরু করুন",
      requiredField: "এই তথ্যটি আবশ্যক",
      invalidPhone: "সঠিক ১০ ডিজিটের ভারতীয় মোবাইল নম্বর দিন"
    },

    // ================= ASSAMESE (অসমীয়া) =================
    as: {
      appName: "এলৰা ২.০",
      appTagline: "মাল্টিমডেল ক্লিনিকেল ট্ৰায়াজ সহায়ক",
      menu: "মেনু",
      close: "বন্ধ কৰক",
      back: "উভতি যাওক",
      save: "সংৰক্ষণ কৰক",
      cancel: "বাতিল কৰক",
      submit: "দাখিল কৰক",
      search: "সন্ধান কৰক",
      searchPlaceholder: "ঔষধ, লক্ষণ বা অৰ্ডাৰ সন্ধান কৰক...",
      loading: "অনুগ্ৰহ কৰি অপেক্ষা কৰক...",
      retry: "পুনৰ চেষ্টা কৰক",
      logout: "লগ আউট",
      login: "লগ ইন",
      signUp: "পঞ্জীয়ন কৰক",
      dashboard: "ডেশ্ববৰ্ড",
      workstation: "ৱৰ্ক ষ্টেচন",
      translator: "অনুবাদক",
      home: "ঘৰ",
      triage: "সাধাৰণ ট্ৰায়াজ",
      medicines: "জন ঔষধি ফাৰ্মাচী",
      orderTracking: "অৰ্ডাৰ ট্ৰেকিং",
      emergency: "জৰুৰীকালীন ১০৮",
      profile: "প্ৰফাইল আৰু আভা",
      settings: "ছেটিংছ",
      language: "ভাষা",
      cart: "কাৰ্ট",
      addToCart: "কাৰ্টত যোগ কৰক",
      emergencySOS: "জৰুৰীকালীন সাহায্য (১০৮ / ১১২)"
    },

    // ================= GUJARATI (ગુજરાતી) =================
    gu: {
      appName: "એલારા ૨.૦",
      appTagline: "મલ્ટીમોડલ ક્લિનિકલ ટ્રાયજ સહાયક",
      menu: "મેનુ",
      close: "બંધ કરો",
      back: "પાછળ",
      save: "સાચવો",
      cancel: "રદ કરો",
      submit: "સબમિટ કરો",
      search: "શોધો",
      searchPlaceholder: "દવાઓ, લક્ષણો અથવા ઓર્ડર શોધો...",
      loading: "કૃપા કરીને રાહ જુઓ...",
      retry: "ફરી પ્રયાસ કરો",
      logout: "લૉગ આઉટ",
      login: "લૉગ ઇન",
      signUp: "સાઇન અપ",
      dashboard: "ડેશબોર્ડ",
      workstation: "વર્ક સ્ટેશન",
      translator: "અનુવાદક",
      home: "હોમ",
      triage: "સામાન્ય ટ્રાયજ",
      medicines: "જન ઔષધિ કેન્દ્ર",
      orderTracking: "ઓર્ડર ટ્રેકિંગ",
      emergency: "ઇમરજન્સી ૧૦૮",
      profile: "પ્રોફાઇલ અને આભા (ABHA)",
      settings: "સેટિંગ્સ",
      language: "ભાષા",
      cart: "કાર્ટ",
      addToCart: "કાર્ટમાં ઉમેરો",
      emergencySOS: "કટોકટી સહાય (૧૦૮ / ૧૧૨)"
    },

    // ================= KANNADA (ಕನ್ನಡ) =================
    kn: {
      appName: "ಎಲಾರಾ ೨.೦",
      appTagline: "ಮಲ್ಟಿಮೋಡಲ್ ಕ್ಲಿನಿಕಲ್ ಟ್ರಯಾಜ್ ಸಹಾಯಕ",
      menu: "ಮೆನು",
      close: "ಮುಚ್ಚಿ",
      back: "ಹಿಂದೆ",
      save: "ಉಳಿಸಿ",
      cancel: "ರದ್ದುಮಾಡಿ",
      submit: "ಸಲ್ಲಿಸಿ",
      search: "ಹುಡುಕಿ",
      searchPlaceholder: "ಔಷಧಿಗಳು, ರೋಗಲಕ್ಷಣಗಳು ಅಥವಾ ಆರ್ಡರ್‌ಗಳನ್ನು ಹುಡುಕಿ...",
      loading: "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ...",
      retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
      logout: "ಲಾಗ್ ಔಟ್",
      login: "ಲಾಗ್ ಇನ್",
      signUp: "ನೋಂದಣಿ",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      workstation: "ವರ್ಕ್ ಸ್ಟೇಷನ್",
      translator: "ಅನುವಾದಕ",
      home: "ಮುಖಪುಟ",
      triage: "ಸಾಮಾನ್ಯ ಟ್ರಯಾಜ್",
      medicines: "ಜನ ಔಷಧಿ ಕೇಂದ್ರ",
      orderTracking: "ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್",
      emergency: "ತುರ್ತು ೧೦೮ ಎಸ್‌ಒಎಸ್",
      profile: "ಪ್ರೊಫೈಲ್ ಮತ್ತು ಆಭಾ (ABHA)",
      settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      language: "ಭಾಷೆ",
      cart: "ಕಾರ್ಟ್",
      addToCart: "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
      emergencySOS: "ತುರ್ತು ನೆರವು (೧೦೮ / ೧೧೨)"
    },

    // ================= MALAYALAM (മലയാളം) =================
    ml: {
      appName: "എലാറ 2.0",
      appTagline: "മൾട്ടിമോഡൽ ക്ലിനിക്കൽ ട്രയേജ് അസിസ്റ്റന്റ്",
      menu: "മെനു",
      close: "അടയ്ക്കുക",
      back: "പിന്നോട്ട്",
      save: "സംരക്ഷിക്കുക",
      cancel: "റദ്ദാക്കുക",
      submit: "സമർപ്പിക്കുക",
      search: "തിരയുക",
      searchPlaceholder: "മരുന്നുകൾ, ലക്ഷണങ്ങൾ അല്ലെങ്കിൽ ഓർഡറുകൾ തിരയുക...",
      loading: "ദയവായി കാത്തിരിക്കുക...",
      retry: "വീണ്ടും ശ്രമിക്കുക",
      logout: "ലോഗ് ഔട്ട്",
      login: "ലോഗ് ഇൻ",
      signUp: "രജിസ്റ്റർ ചെയ്യുക",
      dashboard: "ഡാഷ്‌ബോർഡ്",
      workstation: "വർക്ക് സ്റ്റേഷൻ",
      translator: "വിവർത്തകൻ",
      home: "ഹോം",
      triage: "സാധാരണ ട്രയേജ്",
      medicines: "ജന ഔഷധി ഫാർമസി",
      orderTracking: "ഓർഡർ ട്രാക്കിംഗ്",
      emergency: "അടിയന്തിര 108 SOS",
      profile: "പ്രൊഫൈൽ & ആഭാ (ABHA)",
      settings: "ക്രമീകരണങ്ങൾ",
      language: "ഭാഷ",
      cart: "കാർട്ട്",
      addToCart: "കാർട്ടിലേക്ക് ചേർക്കുക",
      emergencySOS: "അടിയന്തിര സഹായം (108 / 112)"
    },

    // ================= MARATHI (मराठी) =================
    mr: {
      appName: "एलारा २.०",
      appTagline: "मल्टिमॉडेल क्लिनिकल ट्रायज सहाय्यक",
      menu: "मेनू",
      close: "बंद करा",
      back: "मागे",
      save: "जतन करा",
      cancel: "रद्द करा",
      submit: "सादर करा",
      search: "शोधा",
      searchPlaceholder: "औषधे, लक्षणे किंवा ऑर्डर्स शोधा...",
      loading: "कृपया प्रतीक्षा करा...",
      retry: "पुन्हा प्रयत्न करा",
      logout: "लॉग आउट",
      login: "लॉग इन",
      signUp: "नोंदणी करा",
      dashboard: "डॅशबोर्ड",
      workstation: "वर्क स्टेशन",
      translator: "अनुवादक",
      home: "मुख्यपृष्ठ",
      triage: "सामान्य ट्रायज",
      medicines: "जन औषधी केंद्र",
      orderTracking: "ऑर्डर ट्रॅकिंग",
      emergency: "आपत्कालीन १०८",
      profile: "प्रोफाइल आणि आभा (ABHA)",
      settings: "सेटिंग्ज",
      language: "भाषा",
      cart: "कार्ट",
      addToCart: "कार्टमध्ये जोडा",
      emergencySOS: "आपत्कालीन मदत (१०८ / ११२)"
    },

    // ================= PUNJABI (ਪੰਜਾਬੀ) =================
    pa: {
      appName: "ਏਲਾਰਾ ੨.੦",
      appTagline: "ਮਲਟੀਮੋਡਲ ਕਲੀਨਿਕਲ ਟ੍ਰਾਈਏਜ ਸਹਾਇਕ",
      menu: "ਮੇਨੂ",
      close: "ਬੰਦ ਕਰੋ",
      back: "ਪਿੱਛੇ",
      save: "ਸੰਭਾਲੋ",
      cancel: "ਰੱਦ ਕਰੋ",
      submit: "ਜਮ੍ਹਾਂ ਕਰੋ",
      search: "ਖੋਜੋ",
      searchPlaceholder: "ਦਵਾਈਆਂ, ਲੱਛਣ ਜਾਂ ਆਰਡਰ ਖੋਜੋ...",
      loading: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ...",
      retry: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
      logout: "ਲਾਗ ਆਉਟ",
      login: "ਲਾਗ ਇਨ",
      signUp: "ਸਾਈਨ ਅੱਪ",
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      workstation: "ਵਰਕ ਸਟੇਸ਼ਨ",
      translator: "ਅਨੁਵਾਦਕ",
      home: "ਮੁੱਖ ਪੰਨਾ",
      triage: "ਆਮ ਟ੍ਰਾਈਏਜ",
      medicines: "ਜਨ ਔਸ਼ਧੀ ਕੇਂਦਰ",
      orderTracking: "ਆਰਡਰ ਟ੍ਰੈਕਿੰਗ",
      emergency: "ਐਮਰਜੈਂਸੀ ੧੦੮",
      profile: "ਪ੍ਰੋਫਾਈਲ ਅਤੇ ਆਭਾ (ABHA)",
      settings: "ਸੈਟਿੰਗਾਂ",
      language: "ਭਾਸ਼ਾ",
      cart: "ਕਾਰਟ",
      addToCart: "ਕਾਰਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ",
      emergencySOS: "ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ (੧੦੮ / ੧੧੨)"
    },

    // ================= TAMIL (தமிழ்) =================
    ta: {
      appName: "எலாரா 2.0",
      appTagline: "பன்முக மருத்துவ ட்ரையേജ് உதவியாளர்",
      menu: "மெனு",
      close: "மூடு",
      back: "பின்செல்",
      save: "சேமி",
      cancel: "ரத்துசெய்",
      submit: "சமர்ப்பி",
      search: "தேடு",
      searchPlaceholder: "மருந்துகள், அறிகுறிகள் அல்லது ஆர்டர்களைத் தேடுங்கள்...",
      loading: "தயவுசெய்து காத்திருக்கவும்...",
      retry: "மீண்டும் முயற்சிக்கவும்",
      logout: "வெளியேறு",
      login: "உள்நுழை",
      signUp: "பதிவு செய்க",
      dashboard: "டாஷ்போர்டு",
      workstation: "பணி நிலையம்",
      translator: "மொழிபெயர்ப்பாளர்",
      home: "முகப்பு",
      triage: "சாதாரண ட்ரையേജ്",
      medicines: "ஜன் ஔஷதி மருந்தகம்",
      orderTracking: "ஆர்டர் கண்காணிப்பு",
      emergency: "அவசர 108 SOS",
      profile: "சுயவிவரம் & ஆபா (ABHA)",
      settings: "அமைப்புகள்",
      language: "மொழி",
      cart: "கார்ட்",
      addToCart: "கார்ட்டில் சேர்",
      emergencySOS: "அவசர உதவி (108 / 112)"
    },

    // ================= TELUGU (తెలుగు) =================
    te: {
      appName: "ఎలారా 2.0",
      appTagline: "మల్టీమోడల్ క్లినికల్ ట్రయాజ్ సహాయకుడు",
      menu: "మెనూ",
      close: "మూసివేయి",
      back: "వెనుకకు",
      save: "భద్రపరచు",
      cancel: "రద్దుచేయి",
      submit: "సమర్పించు",
      search: "శోధించండి",
      searchPlaceholder: "మందులు, లక్షణాలు లేదా ఆర్డర్‌లను శోధించండి...",
      loading: "దయచేసి వేచి ఉండండి...",
      retry: "మళ్ళీ ప్రయత్నించండి",
      logout: "లాగ్ అవుట్",
      login: "లాగిన్",
      signUp: "నమోదు చేసుకోండి",
      dashboard: "డ్యాష్‌బోర్డ్",
      workstation: "వర్క్ స్టేషన్",
      translator: "అనువాదకుడు",
      home: "హోమ్",
      triage: "సాధారణ ట్రయాజ్",
      medicines: "జన్ ఔషధి కేంద్రం",
      orderTracking: "ఆర్డర్ ట్రాకింగ్",
      emergency: "అత్యవసర 108 SOS",
      profile: "ప్రొఫైల్ & ఆభా (ABHA)",
      settings: "సెట్టింగులు",
      language: "భాష",
      cart: "కార్ట్",
      addToCart: "కార్ట్‌కు జోడించు",
      emergencySOS: "అత్యవసర సహాయం (108 / 112)"
    },

    // ================= URDU (اردو - RTL) =================
    ur: {
      appName: "ایلارا 2.0",
      appTagline: "ملٹی موڈل کلینیکل ٹرائیج اسسٹنٹ",
      menu: "مینو",
      close: "بند کریں",
      back: "واپس",
      save: "محفوظ کریں",
      cancel: "منسوخ کریں",
      submit: "جمع کریں",
      search: "تلاش کریں",
      searchPlaceholder: "دوائیں، علامات یا آرڈر تلاش کریں...",
      loading: "براہ کرم انتظار فرمائیں...",
      retry: "دوبارہ کوشش کریں",
      logout: "لاگ آؤٹ",
      login: "لاگ ان",
      signUp: "رجسٹر کریں",
      dashboard: "ڈیش بورڈ",
      workstation: "ورک اسٹیشن",
      translator: "مترجم",
      home: "ہوم",
      triage: "نارمل ٹرائیج",
      medicines: "جن اوشدھی فارمیسی",
      orderTracking: "آرڈر ٹریکنگ",
      emergency: "ہنگامی 108 SOS",
      profile: "پروفائل اور آبھا",
      settings: "ترتیبات",
      language: "زبان",
      cart: "کارٹ",
      addToCart: "کارٹ میں شامل کریں",
      emergencySOS: "ہنگامی امداد (108 / 112)"
    },

    // ================= SANSKRIT (संस्कृतम्) =================
    sa: {
      appName: "एलारा २.०",
      appTagline: "बहुप्रणालीय क्लिनिकल ट्राइएज सहायकम्",
      menu: "सूची",
      close: "पिदधातु",
      back: "प्रतिगच्छतु",
      save: "संरक्षतु",
      cancel: "निरस्यतु",
      submit: "उपस्थापयतु",
      search: "अन्विष्यतु",
      searchPlaceholder: "औषधानि, लक्षणानि अन्विष्यतु...",
      loading: "कृपया प्रतीक्षताम्...",
      retry: "पुनः प्रयतताम्",
      logout: "निर्गमनम्",
      login: "प्रवेशः",
      signUp: "पञ्जीकरणम्",
      dashboard: "नियन्त्रणपट्टिका",
      workstation: "कार्यस्थानम्",
      translator: "अनुवादकः",
      home: "गृहम्",
      triage: "सामान्य ट्राइएज",
      medicines: "जनौषधि केन्द्रम्",
      orderTracking: "आदेशानुवर्तनम्",
      emergency: "आपत्कालीनम् १०८",
      profile: "विवरणम् तथा आभा",
      settings: "समायोजनानि",
      language: "भाषा",
      cart: "पेटिका",
      addToCart: "पेटिकायां योजयतु",
      emergencySOS: "आपत्कालीन साहाय्यम् (१०८ / ११२)"
    },

    // ================= KONKANI (कोंकणी) =================
    kok: {
      appName: "एलारा २.०",
      appTagline: "मल्टिमोडल क्लिनिकल ट्रायज सांगाती",
      menu: "मेनू",
      close: "बंद करात",
      back: "फाटीं",
      save: "सांभाळात",
      cancel: "रद्द करात",
      submit: "सादर करात",
      search: "सोदात",
      searchPlaceholder: "वखदां, लक्षणां सोदात...",
      loading: "उपकार करून रावयात...",
      retry: "परतून यत्न करात",
      logout: "भायर सरात",
      login: "भितर सरात",
      signUp: "नोंदणी करात",
      dashboard: "डॅशबोर्ड",
      workstation: "काम स्टेशन",
      translator: "भाशांतरकार",
      home: "घर",
      triage: "सामान्य ट्रायज",
      medicines: "जन औषधी केंद्र",
      orderTracking: "ऑर्डर ट्रॅकिंग",
      emergency: "आपत्कालीन १०८",
      profile: "प्रोफाइल आनी आभा",
      settings: "मांडणी",
      language: "भास",
      cart: "कार्ट",
      addToCart: "कार्टांत घालात",
      emergencySOS: "आपत्कालीन मजत (१०८ / ११२)"
    },

    // ================= MAITHILI (मैथिली) =================
    mai: {
      appName: "एलारा २.०",
      appTagline: "मल्टीमॉडल क्लिनिकल ट्राइएज सहायक",
      menu: "मेनू",
      close: "बन्द करू",
      back: "पाछाँ",
      save: "सुरक्षित करू",
      cancel: "रद्द करू",
      submit: "जमा करू",
      search: "खोजू",
      searchPlaceholder: "दवा, लक्षण खोजू...",
      loading: "कृपा कय प्रतीक्षा करू...",
      retry: "पुनः प्रयास करू",
      logout: "लॉग आउट",
      login: "लॉग इन",
      signUp: "नया खाता बनाउ",
      dashboard: "डैशबोर्ड",
      workstation: "कार्य स्थल",
      translator: "अनुवादक",
      home: "घर",
      triage: "सामान्य ट्राइएज",
      medicines: "जन औषधि केंद्र",
      orderTracking: "ऑर्डर ट्रॅकिंग",
      emergency: "आपत्कालीन १०८",
      profile: "प्रोफ़ाइल आ आभा",
      settings: "सेटिंग्स",
      language: "भाषा",
      cart: "कार्ट",
      addToCart: "कार्टमे जोडू",
      emergencySOS: "आपत्कालीन सहायता (१०८ / ११२)"
    },

    // ================= MANIPURI (মৈতৈলোন্) =================
    mni: {
      appName: "এলারা ২.০",
      appTagline: "মল্টিমোদল ক্লিনিকেল ত্রায়াজ সহাই",
      menu: "মেনু",
      close: "থিংজিনবা",
      back: "হন্দোকপা",
      save: "কনবা",
      cancel: "তোকপা",
      submit: "পীসিনবা",
      search: "থিবী",
      searchPlaceholder: "হিদাক-লাংথক, অনাবা থিবী...",
      loading: "ঙাইবিখ্রবা...",
      retry: "অমুক হন্না হোৎনবা",
      logout: "লোগ আউত",
      login: "লোগ ইন",
      signUp: "মিং চনবা",
      dashboard: "দেশবোর্দ",
      workstation: "ৱার্ক স্তেসন",
      translator: "হন্দোকপা",
      home: "য়ুম",
      triage: "নোর্মে অমসুং ত্রায়াজ",
      medicines: "জন ওষধী কেন্দ্র",
      orderTracking: "ওর্দর ত্রেক তৌবা",
      emergency: "ইমর্জেন্সী ১০৮",
      profile: "প্রোফাইল অমসুং আভা",
      settings: "সেতিংস",
      language: "লোন",
      cart: "কার্ত",
      addToCart: "কার্ততা হাপচিনবা",
      emergencySOS: "ইমর্জেন্সী মতেং (১০৮ / ১১২)"
    },

    // ================= NEPALI (नेपाली) =================
    ne: {
      appName: "एलारा २.०",
      appTagline: "मल्टिमोडल क्लिनिकल ट्राइएज सहायक",
      menu: "मेनु",
      close: "बन्द गर्नुहोस्",
      back: "पछाडि",
      save: "सुरक्षित गर्नुहोस्",
      cancel: "रद्द गर्नुहोस्",
      submit: "बुझाउनुहोस्",
      search: "खोज्नुहोस्",
      searchPlaceholder: "औषधि, लक्षणहरू खोज्नुहोस्...",
      loading: "कृपया पर्खनुहोस्...",
      retry: "पुनः प्रयास गर्नुहोस्",
      logout: "लग आउट",
      login: "लग इन",
      signUp: "दर्ता गर्नुहोस्",
      dashboard: "ड्यासबோர्ड",
      workstation: "कार्य केन्द्र",
      translator: "अनुवादक",
      home: "गृहपृष्ठ",
      triage: "सामान्य ट्राइएज",
      medicines: "जन औषधि केन्द्र",
      orderTracking: "अर्डर ट्र्याकिङ",
      emergency: "आपतकालीन १०८",
      profile: "प्रोफाइल र आभा",
      settings: "सेटिङहरू",
      language: "भाषा",
      cart: "कार्ट",
      addToCart: "कार्टमा थप्नुहोस्",
      emergencySOS: "आपतकालीन सहायता (१०८ / ११२)"
    },

    // ================= SINDHI (سنڌي - RTL) =================
    sd: {
      appName: "ايـلارا 2.0",
      appTagline: "ملٽي موڊل ڪلينڪل ٽرائج مددگار",
      menu: "مينيو",
      close: "بند ڪريو",
      back: "واپس",
      save: "محفوظ ڪريو",
      cancel: "رد ڪريو",
      submit: "موڪليو",
      search: "ڳوليو",
      searchPlaceholder: "دوائون، علامتون ڳوليو...",
      loading: "مهرباني ڪري انتظار ڪريو...",
      retry: "ٻيهر ڪوشش ڪريو",
      logout: "لاگ آئوٽ",
      login: "لاگ ان",
      signUp: "رجسٽر ڪريو",
      dashboard: "ڊيش بورڊ",
      workstation: "ڪم اسٽيشن",
      translator: "ترجمو ڪندڙ",
      home: "مک صفحو",
      triage: "عام ٽرائج",
      medicines: "جن اوشڌي فارميسي",
      orderTracking: "آرڊر ٽريڪنگ",
      emergency: "ايمرجنسي 108",
      profile: "پروفائل ۽ آبھا",
      settings: "سيٽنگس",
      language: "ٻولي",
      cart: "ڪارٽ",
      addToCart: "ڪارٽ ۾ شامل ڪريو",
      emergencySOS: "ايمرجنسي مدد (108 / 112)"
    },

    // ================= KASHMIRI (کٲشُر / कॉशुर) =================
    ks: {
      appName: "ایلارا 2.0",
      appTagline: "ملٹی موڈل کلینیکل ٹرائیج مددگار",
      menu: "مینوٗ",
      close: "بند کٔریو",
      back: "واپس",
      save: "محفوظ کٔریو",
      cancel: "منسوخ",
      submit: "پیش کٔریو",
      search: "تلاش کٔریو",
      searchPlaceholder: "دوا، علامت تلاش کٔریو...",
      loading: "مہرپأنی کٔرتھ رۆکو...",
      retry: "دوبارٕ کٔریو کوشش",
      logout: "لاگ آؤٹ",
      login: "لاگ اِن",
      signUp: "کھاتہٕ بناویو",
      dashboard: "ڈیش بورڈ",
      workstation: "ورک سٹیشن",
      translator: "ترجمہٕ کار",
      home: "گھر",
      triage: "عام ٹرائیج",
      medicines: "جن اوشدھی فارمیسی",
      orderTracking: "آرڈر ٹریکنگ",
      emergency: "ہنگامی 108",
      profile: "پروفائل تہٕ آبھا",
      settings: "ترتیبات",
      language: "زبان",
      cart: "ٹوکری",
      addToCart: "ٹوکری منٛز ترٲویو",
      emergencySOS: "ہنگامی مدد (108 / 112)"
    },

    // ================= DOGRI (डोगरी) =================
    doi: {
      appName: "एलारा २.०",
      appTagline: "मल्टीमॉडल क्लिनिकल ट्राइएज सहायक",
      menu: "मेनू",
      close: "बंद करो",
      back: "पिच्छे",
      save: "सांभो",
      cancel: "रद्द करो",
      submit: "जमा करो",
      search: "खोजो",
      searchPlaceholder: "दवाइयां, लक्षण खोजो...",
      loading: "कृपया उडीको...",
      retry: "परतियै यत्न करो",
      logout: "लाग आउट",
      login: "लाग इन",
      signUp: "खाता बनाओ",
      dashboard: "डैशबोर्ड",
      workstation: "कम्म स्टेशन",
      translator: "अनुवादक",
      home: "घर",
      triage: "सामान्य ट्राइएज",
      medicines: "जन औषधि केंद्र",
      orderTracking: "आर्डर ट्रैकिंग",
      emergency: "एमरजेंसी १०८",
      profile: "प्रोफाइल ते आभा",
      settings: "सैटिंग्स",
      language: "बोली",
      cart: "कार्ट",
      addToCart: "कार्ट च पाओ",
      emergencySOS: "एमरजेंसी मदद (१०८ / ११२)"
    },

    // ================= BODO (बर') =================
    brx: {
      appName: "एलारा २.०",
      appTagline: "मल्टिमदेल क्लिनिकेल ट्राइएज हेफाजाबग्रा",
      menu: "मेनु",
      close: "बन्द खालाम",
      back: "उनाव",
      save: "थिन",
      cancel: "दानखार",
      submit: "दाखिल खालाम",
      search: "नायगिर",
      searchPlaceholder: "मुली, लक्षण नायगिर...",
      loading: "नेथ'...",
      retry: "फिन नाजा",
      logout: "लग आउट",
      login: "लग इन",
      signUp: "साइन आप",
      dashboard: "डेशबर्ड",
      workstation: "हाबा जायगा",
      translator: "राव सोलायग्रा",
      home: "न'",
      triage: "सरासनस्रा ट्राइएज",
      medicines: "जन ओषधी केंद्र",
      orderTracking: "अर्डर ट्रेकिं",
      emergency: "इमार्जेन्सी १०८",
      profile: "प्रफाइल आरो आभा",
      settings: "सेटिंफोर",
      language: "राव",
      cart: "कार्ट",
      addToCart: "कार्ट आव सो",
      emergencySOS: "इमार्जेन्सी हेफाजाब (१०८ / ११२)"
    },

    // ================= SANTALI (ᱥᱟᱱᱛᱟᱲᱤ) =================
    sat: {
      appName: "ᱮᱞᱟᱨᱟ ᱒.᱐",
      appTagline: "ᱢᱚᱞᱴᱤᱢᱚᱰᱟᱞ ᱠᱞᱤᱱᱤᱠᱮᱞ ᱴᱨᱟᱭᱮᱡᱽ ᱜᱚᱲᱚᱭᱤᱡ",
      menu: "ᱢᱮᱱᱩ",
      close: "ᱵᱚᱸᱫᱚᱭ ᱢᱮ",
      back: "ᱛᱟᱭᱚᱢ",
      save: "ᱫᱚᱦᱚᱭ ᱢᱮ",
      cancel: "ᱵᱟᱹᱛᱤᱞ ᱢᱮ",
      submit: "ᱮᱢ ᱢᱮ",
      search: "ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ",
      searchPlaceholder: "ᱨᱟᱱ, ᱞᱚᱠᱷᱚᱱ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ...",
      loading: "ᱫᱟᱭᱟᱠᱟᱛᱮ ᱛᱟᱺᱜᱤ ᱢᱮ...",
      retry: "ᱟᱨᱦᱚᱸ ᱠᱩᱨᱩᱢᱩᱴᱩ ᱢᱮ",
      logout: "ᱞᱚᱜᱽ ᱟᱣᱩᱴ",
      login: "ᱞᱚᱜᱽ ᱤᱱ",
      signUp: "ᱠᱷᱟᱛᱟ ᱵᱮᱱᱟᱣ ᱢᱮ",
      dashboard: "ᱰᱮᱥᱵᱳᱨᱰ",
      workstation: "ᱠᱟᱹᱢᱤ ᱴᱷᱟᱶ",
      translator: "ᱛᱚᱨᱡᱚᱢᱟᱭᱤᱡ",
      home: "ᱚᱲᱟᱜ",
      triage: "ᱥᱟᱫᱷᱟᱨᱚᱱ ᱴᱨᱟᱭᱮᱡᱽ",
      medicines: "ᱡᱚᱱ ᱚᱣᱥᱚᱫᱷᱤ ᱠᱮᱱᱫᱽᱨᱚ",
      orderTracking: "ᱚᱨᱰᱚᱨ ᱴᱨᱮᱠᱤᱝ",
      emergency: "ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱑᱐᱘",
      profile: "ᱯᱨᱳᱯᱷᱟᱭᱤᱞ ᱟᱨ ᱟᱵᱷᱟ",
      settings: "ᱥᱟᱡᱟᱣᱠᱚ",
      language: "ᱯᱟᱹᱨᱥᱤ",
      cart: "ᱠᱟᱨᱴ",
      addToCart: "ᱠᱟᱨᱴ ᱨᱮ ᱥᱮᱞᱮᱫᱽ ᱢᱮ",
      emergencySOS: "ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱜᱚᱲᱚ (᱑᱐᱘ / ᱑᱑᱒)"
    }
  };

  // Master Direct English -> Hindi Translation Dictionary (Audit Verified)
    const HINDI_TEXT_MAP = {
      "13. Search": "१३. खोजें",
      "14. Pharmacy": "१४. जन औषधि फार्मेसी",
      "15. Order Tracking": "१५. ऑर्डर ट्रैकिंग",
      "16. Emergency SOS": "१६. आपातकालीन एसओएस",
      "17. Profile & ABHA": "१७. प्रोफाइल और आभा कार्ड",
      "18. Settings": "१८. सेटिंग्स और सुगमता",
      "Simulate Delivery Completion": "डिलीवरी पूर्णता का अनुकरण करें",
      "Copy ID": "आईडी कॉपी करें",
      "Print Card": "कार्ड प्रिंट करें",
      "17": "१७",
    "ELARA 2.0 | Multimodal AI Healthcare Triage Assistant": "एलारा २.० | मल्टीमॉडल एआई स्वास्थ्य सेवा ट्राइएज सहायक",
    "ELARA 2.0": "एलारा २.०",
    "ELARA": "एलारा",
    "v2.4 Web": "संस्करण २.४ वेब",
    "Multimodal Clinical Triage": "मल्टीमॉडल क्लिनिकल ट्राइएज",
    "Multimodal Clinical Triage Assistant": "मल्टीमॉडल क्लिनिकल ट्राइएज सहायक",
    "Back": "वापस",
    "Menu": "मेनू",
    "Search": "खोजें",
    "SOS 108": "एसओएस १०८",
    "ABDM Integrated": "आयुष्मान भारत (ABDM) एकीकृत",
    "👤 Patient (Sunita Devi)": "👤 मरीज (सुनीता देवी)",
    "👩⚕️ Staff Nurse (Sister Priya)": "👩⚕️ स्टाफ नर्स (सिस्टर प्रिया)",
    "🏥 Facility Admin (Dr. Roy)": "🏥 सुविधा व्यवस्थापक (डॉ. रॉय)",
    "ELARA 2.0 Menu": "एलारा २.० मेनू",
    "Clinical Triage Navigation": "क्लिनिकल ट्राइएज नेविगेशन",
    "LIVE CLINICAL STATION": "लाइव क्लिनिकल स्टेशन",
    "PHC-04": "पीएचसी-०४",
    "Dhenkanal Sub-District Health Centre": "ढेंकानाल उप-जिला स्वास्थ्य केंद्र",
    "Primary Health Unit • MO on Duty: Dr. Ananya Roy": "प्राथमिक स्वास्थ्य इकाई • ड्यूटी पर चिकित्सा अधिकारी: डॉ. अनन्या रॉय",
    "Urgent 🔴": "अति आवश्यक 🔴",
    "03 Cases": "०३ मामले",
    "Priority 🟡": "प्राथमिकता 🟡",
    "08 Cases": "०८ मामले",
    "Routine 🟢": "सामान्य 🟢",
    "17 Cases": "१७ मामले",
    "03": "०३",
    "08": "०८",
    "Urgent": "अति आवश्यक (Urgent)",
    "Priority": "प्राथमिकता (Priority)",
    "Routine": "सामान्य (Routine)",
    "Avg Turnaround:": "औसत प्रसंस्करण समय:",
    "2.8 mins": "२.८ मिनट",
    "Total:": "कुल:",
    "28 Patients": "२८ मरीज",
    "Emergency 108 SOS": "आपातकालीन १०८ एसओएस",
    "Jan Aushadhi Pharmacy": "जन औषधि केंद्र फार्मेसी",
    "Order Tracking": "ऑर्डर ट्रैकिंग",
    "Profile & ABHA": "प्रोफ़ाइल और आभा (ABHA)",
    "Settings & Language": "सेटिंग्स और भाषा",
    "Active Patient Session": "सक्रिय मरीज सत्र",
    "Sunita Devi (42 F)": "सुनीता देवी (४२ महिला)",
    "ABHA: 91-4820-1928-3341 • Ward 4 Kendrapara": "आभा: 91-4820-1928-3341 • वार्ड ४ केन्द्रपड़ा",
    "Switch Account": "खाता बदलें",
    "Log Out": "लॉग आउट",
    "Main Menu Shortcuts": "मुख्य मेनू शॉर्टकट",
    "Dashboard": "डैशबोर्ड",
    "Work Station": "वर्क स्टेशन",
    "Translator": "अनुवादक",
    "Translator (23 Languages)": "अनुवादक (२३ भाषाएं)",
    "Core Healthcare Services": "मुख्य स्वास्थ्य सेवाएं",
    "Find medicines, symptoms & clinics": "दवाइयां, लक्षण और क्लिनिक खोजें",
    "Genuine generic medicines at 50-90% savings": "५०-९०% बचत पर प्रामाणिक जेनेरिक दवाएं",
    "Live delivery status & rider ETA": "लाइव डिलीवरी स्थिति और राइडर आगमन समय",
    "Immediate ambulance dispatch & siren": "तत्काल एम्बुलेंस प्रेषण और सायरन",
    "Profile & ABHA Card": "प्रोफ़ाइल और आभा कार्ड",
    "Digital health card & medical records": "डिजिटल स्वास्थ्य कार्ड और मेडिकल रिकॉर्ड",
    "Settings & Accessibility": "सेटिंग्स और सुगमता",
    "23 Languages, font scale & alerts": "२३ भाषाएं, फ़ॉन्ट आकार और अलर्ट",
    "Clear session and return to login": "सत्र समाप्त करें और लॉगिन पर लौटें",
    "Work Station & View Modes": "वर्क स्टेशन और दृश्य मोड",
    "Dual Workstation": "दोहरा वर्कस्टेशन",
    "Split-screen queue & clinical review desk": "स्प्लिट-स्क्रीन कतार और क्लिनिकल समीक्षा डेस्क",
    "Web App Portal": "वेब ऐप पोर्टल",
    "Interactive patient flow portal": "इंटरएक्टिव मरीज प्रवाह पोर्टल",
    "Figma Flow Board": "फ़िग्मा फ्लो बोर्ड",
    "Panoramic view of all 11 screens": "सभी ११ स्क्रीनों का मनोरम दृश्य",
    "Dashboards": "डैशबोर्ड",
    "Facility Admin Dashboard": "सुविधा व्यवस्थापक डैशबोर्ड",
    "Dr. Ananya Roy • 128 Caseload & Concordance": "डॉ. अनन्या रॉय • १२८ मामले और संगति",
    "Nurse Queue Console": "नर्स कतार कंसोल",
    "Sister Priya • 28 Patients Live": "सिस्टर प्रिया • २८ मरीज लाइव",
    "Patient Dashboard": "मरीज डैशबोर्ड",
    "Sunita Devi (42F) • Active Case": "सुनीता देवी (४२ महिला) • सक्रिय मामला",
    "Triage Modules & Steps": "ट्राइएज मॉड्यूल और चरण",
    "1. Login Portal": "१. लॉगिन पोर्टल",
    "2. Role Portal": "२. भूमिका पोर्टल",
    "3. Privacy Consent": "३. गोपनीयता सहमति",
    "1. Login Role Selector": "१. लॉगिन भूमिका चयनकर्ता",
    "2. Patient Check-In": "२. मरीज चेक-इन",
    "3. Nurse / Admin Login": "३. नर्स / व्यवस्थापक लॉगिन",
    "4. Patient Dashboard": "४. मरीज डैशबोर्ड",
    "5. Multimodal Studio": "५. मल्टीमॉडल स्टूडियो",
    "6. AI Processing": "६. एआई प्रसंस्करण",
    "7. Missing Info": "७. छूटी हुई जानकारी",
    "8. Triage Note": "८. ट्राइएज नोट",
    "9. Nurse Queue": "९. नर्स कतार",
    "10. Clinical Review": "१०. क्लिनिकल समीक्षा",
    "11. Doctor Referral": "११. डॉक्टर रेफरल",
    "11. Referral Handover": "११. रेफरल सुपुर्दगी",
    "12. Facility Admin": "१२. सुविधा व्यवस्थापक",
    "Dark / Light Mode": "डार्क / लाइट मोड",
    "Toggle Dark / Light Theme": "डार्क / लाइट थीम बदलें",
    "Dark / Light": "डार्क / लाइट",
    "Close": "बंद करें",
    "ABDM COMPLIANT CLINICAL GATEWAY • VERSION 2.4": "एबीडीएम अनुरूप क्लिनिकल गेटवे • संस्करण २.४",
    "Triage Live": "ट्राइएज लाइव",
    "🇬🇧 English": "🇬🇧 English (अंग्रेज़ी)",
    "🇮🇳 हिन्दी (Hindi)": "🇮🇳 हिन्दी (Hindi)",
    "🇮🇳 ଓଡ଼ିଆ (Odia)": "🇮🇳 ଓଡ଼ିଆ (Odia)",
    "🇮🇳 বাংলা (Bengali)": "🇮🇳 বাংলা (Bengali)",
    "🇮🇳 অসমীয়া (Assamese)": "🇮🇳 অসমীয়া (Assamese)",
    "🇮🇳 ગુજરાતી (Gujarati)": "🇮🇳 ગુજરાતી (Gujarati)",
    "🇮🇳 ಕನ್ನಡ (Kannada)": "🇮🇳 ಕನ್ನಡ (Kannada)",
    "🇮🇳 മലയാളം (Malayalam)": "🇮🇳 മലയാളം (Malayalam)",
    "🇮🇳 मराठी (Marathi)": "🇮🇳 मराठी (Marathi)",
    "🇮🇳 ਪੰਜਾਬੀ (Punjabi)": "🇮🇳 ਪੰਜਾਬੀ (Punjabi)",
    "🇮🇳 தமிழ் (Tamil)": "🇮🇳 தமிழ் (Tamil)",
    "🇮🇳 తెలుగు (Telugu)": "🇮🇳 తెలుగు (Telugu)",
    "🇮🇳 اردو (Urdu)": "🇮🇳 اردو (Urdu)",
    "🇮🇳 संस्कृतम् (Sanskrit)": "🇮🇳 संस्कृतम् (Sanskrit)",
    "🇮🇳 कोंकणी (Konkani)": "🇮🇳 कोंकणी (Konkani)",
    "🇮🇳 मैथिली (Maithili)": "🇮🇳 मैथिली (Maithili)",
    "🇮🇳 মৈতৈলোন্ (Manipuri)": "🇮🇳 মৈতৈলোন্ (Manipuri)",
    "🇳🇵 नेपाली (Nepali)": "🇳🇵 नेपाली (Nepali)",
    "🇮🇳 سنڌي (Sindhi)": "🇮🇳 سنڌي (Sindhi)",
    "🇮🇳 کٲشُر (Kashmiri)": "🇮🇳 کٲشُر (Kashmiri)",
    "🇮🇳 डोगरी (Dogri)": "🇮🇳 डोगरी (Dogri)",
    "🇮🇳 बर' (Bodo)": "🇮🇳 बर' (Bodo)",
    "🇮🇳 ᱥᱟᱱᱛᱟᱲᱤ (Santali)": "🇮🇳 ᱥᱟᱱᱛᱟᱲᱤ (Santali)",
    "English": "अंग्रेजी",
    "Hindi": "हिन्दी",
    "Odia": "ओडिया",
    "Bengali": "बांग्ला",
    "Assamese": "असमिया",
    "Gujarati": "गुजराती",
    "Kannada": "कन्नड़",
    "Malayalam": "मलयालम",
    "Marathi": "मराठी",
    "Punjabi": "पंजाबी",
    "Tamil": "तमिल",
    "Telugu": "तेलुगु",
    "Urdu": "उर्दू",
    "Sanskrit": "संस्कृत",
    "Konkani": "कोंकणी",
    "Maithili": "मैथिली",
    "Manipuri": "मणिपुरी",
    "Nepali": "नेपाली",
    "Sindhi": "सिंधी",
    "Kashmiri": "कश्मीरी",
    "Dogri": "डोगरी",
    "Bodo": "बोडो",
    "Santali": "संथाली",
    "Welcome to ELARA 2.0": "एलारा २.० में आपका स्वागत है",
    "ELARA 2.0 Clinical Portal Login": "एलारा २.० क्लिनिकल पोर्टल लॉगिन",
    "Secure digital access for": "के लिए सुरक्षित डिजिटल पहुंच",
    "Patients": "मरीज",
    "(Self-Check In & Normal Triage) and": "(स्वयं चेक-इन और सामान्य ट्राइएज) एवं",
    "Healthcare Givers": "स्वास्थ्य कार्यकर्ता",
    "(Staff Nurses & Clinical Work Station).": "(स्टाफ नर्स और क्लिनिकल वर्क स्टेशन)।",
    "Select Your Portal Role": "अपनी पोर्टल भूमिका चुनें",
    "Patient / Citizen": "मरीज / नागरिक",
    "Healthcare Giver": "स्वास्थ्य कार्यकर्ता",
    "Facility Admin": "सुविधा व्यवस्थापक",
    "Next-Generation Multimodal AI Clinical Triage System for Rural Healthcare": "ग्रामीण स्वास्थ्य सेवा के लिए अगली पीढ़ी की मल्टीमॉडल एआई क्लिनिकल ट्राइएज प्रणाली",
    "Select your role to access the healthcare portal:": "स्वास्थ्य सेवा पोर्टल में प्रवेश के लिए अपनी भूमिका चुनें:",
    "Patient Check-in": "मरीज चेक-इन",
    "Sign in with ABHA ID or mobile number to enter Normal Triage": "सामान्य ट्राइएज में प्रवेश के लिए आभा आईडी या मोबाइल नंबर से साइन इन करें",
    "Access nurse triage queue, review clinical cases & supervise AI": "नर्स ट्राइएज कतार देखें, क्लिनिकल मामलों की समीक्षा करें और एआई की निगरानी करें",
    "Epidemiological surveillance, triage concordance & resource analytics": "महामारी विज्ञान निगरानी, ट्राइएज संगति और संसाधन विश्लेषण",
    "Continue as Patient →": "मरीज के रूप में जारी रखें →",
    "Access Nurse Station →": "नर्स स्टेशन में प्रवेश करें →",
    "Admin Surveillance →": "व्यवस्थापक निगरानी →",
    "ABDM Milestone 3 Compliant": "एबीडीएम माइलस्टोन ३ अनुरूप",
    "23 Indian Languages Supported": "२३ भारतीय भाषाओं का समर्थन",
    "Offline-First Edge Architecture": "ऑफ़लाइन-प्रथम एज आर्किटेक्चर",
    "Select Role": "भूमिका चुनें",
    "Ayushman Bharat Digital Mission": "आयुष्मान भारत डिजिटल मिशन",
    "CDSCO SaMD Protocol Aligned": "सीडीएससीओ एसएएमडी प्रोटोकॉल अनुरूप",
    "Fast Portal Shortcuts": "त्वरित पोर्टल शॉर्टकट",
    "1-Click Launch": "१-क्लिक लॉन्च",
    "Patient Triage Portal": "मरीज ट्राइएज पोर्टल",
    "Normal Triage, speech intake, and symptom review": "सामान्य ट्राइएज, वाणी इनटेक और लक्षण समीक्षा",
    "Nurse Work Station": "नर्स वर्क स्टेशन",
    "Live triage queue, vitals entry, and doctor handover": "लाइव ट्राइएज कतार, महत्वपूर्ण संकेत प्रविष्टि और डॉक्टर सुपुर्दगी",
    "Translator & Speech Intake": "अनुवादक और वाणी इनटेक",
    "Hindi, Odia, Bengali dialect translation & Normal Triage": "हिन्दी, ओडिया, बांग्ला बोली अनुवाद और सामान्य ट्राइएज",
    "Protocol Guided Clinical Safety:": "प्रोटोकॉल निर्देशित क्लिनिकल सुरक्षा:",
    "Validated against AIIMS & WHO district hospital triage standards with Medical Officer oversight.": "चिकित्सा अधिकारी की देखरेख में एम्स और डब्ल्यूएचओ जिला अस्पताल ट्राइएज मानकों के अनुसार सत्यापित।",
    "ABDM Compliant": "एबीडीएम अनुरूप",
    "HIPAA Principles Aligned": "एचआईपीएए सिद्धांतों के अनुरूप",
    "100% Privacy Protected": "१००% गोपनीयता संरक्षित",
    "ELARA 2.0 is a clinical decision support system designed exclusively for registered healthcare workers and supervised triage. Not a replacement for formal medical diagnosis.": "एलारा २.० केवल पंजीकृत स्वास्थ्य कार्यकर्ताओं और पर्यवेक्षित ट्राइएज के लिए डिज़ाइन की गई क्लिनिकल निर्णय सहायता प्रणाली है। औपचारिक चिकित्सा निदान का विकल्प नहीं।",
    "Ayushman Bharat Digital Mission (ABDM) Compatible": "आयुष्मान भारत डिजिटल मिशन (ABDM) अनुकूल",
    "Welcome to ELARA Portal Access": "एलारा पोर्टल एक्सेस में आपका स्वागत है",
    "Choose your clinical portal access mode to proceed with smart healthcare triage.": "स्मार्ट स्वास्थ्य सेवा ट्राइएज के लिए अपना क्लिनिकल पोर्टल एक्सेस मोड चुनें।",
    "← Return Home": "← होम पर लौटें",
    "Select your entry role (Step 1 of 2)": "अपनी प्रवेश भूमिका चुनें (चरण १ का २)",
    "Active in 420+ Primary Health Centres": "४२०+ प्राथमिक स्वास्थ्य केंद्रों में सक्रिय",
    "Default": "डिफ़ॉल्ट",
    "Describe symptoms in voice or text, upload lab reports, and receive an instant AI-assisted clinical triage summary verified by medical desk staff.": "आवाज या पाठ में लक्षणों का वर्णन करें, लैब रिपोर्ट अपलोड करें और मेडिकल डेस्क स्टाफ द्वारा सत्यापित त्वरित एआई-सहायता प्राप्त ट्राइएज सारांश प्राप्त करें।",
    "🎤 Audio & Text": "🎤 ऑडियो और टेक्स्ट",
    "📄 Lab Scan OCR": "📄 लैब स्कैन ओसीआर",
    "24/7 AI Triage": "२४/७ एआई ट्राइएज",
    "Healthcare Worker / Nurse": "स्वास्थ्य कार्यकर्ता / नर्स",
    "Review incoming patient triage queues, verify pre-clinical notes, adjust red-flag urgency, and dispatch escalated cases to duty doctors.": "आने वाले मरीज ट्राइएज कतारों की समीक्षा करें, प्री-क्लिनिकल नोट्स सत्यापित करें, रेड-फ्लैग तात्कालिकता समायोजित करें और गंभीर मामलों को ड्यूटी डॉक्टरों को भेजें।",
    "Sister Priya Desk 2": "सिस्टर प्रिया डेस्क २",
    "Live Priority Queue": "लाइव प्राथमिकता कतार",
    "Facility Admin / PHC Incharge": "सुविधा व्यवस्थापक / पीएचसी प्रभारी",
    "Monitor clinic caseload distribution, critical triage bottlenecks, turnaround SLAs, and epidemiological alerts across block medical units.": "ब्लॉक चिकित्सा इकाइयों में क्लिनिक केसलोअड वितरण, महत्वपूर्ण ट्राइएज बाधाओं, टर्नअराउंड एसएलए और महामारी अलर्ट की निगरानी करें।",
    "Caseload Analytics (128 Cases)": "केसलोअड विश्लेषण (१२८ मामले)",
    "Language Breakdown": "भाषा विवरण",
    "Need help navigating the portal?": "पोर्टल चलाने में सहायता चाहिए?",
    "Toll-free tele-triage assistance is reachable at 1075 / 104": "टोल-फ्री टेली-ट्राइएज सहायता 1075 / 104 पर उपलब्ध है",
    "Request Callback": "कॉल बैक का अनुरोध करें",
    "Patient Portal Check-In": "मरीज पोर्टल चेक-इन",
    "Patient Check-in & Intake": "मरीज चेक-इन और पंजीकरण",
    "OPD Self-Service": "ओपीडी स्वयं-सेवा",
    "Linked with Ayushman Bharat Digital Mission (ABDM)": "आयुष्मान भारत डिजिटल मिशन (ABDM) से जुड़ा हुआ",
    "Sign in with your ABHA ID or mobile number to begin triage": "ट्राइएज शुरू करने के लिए अपनी आभा (ABHA) आईडी या मोबाइल नंबर से साइन इन करें",
    "ABHA ID or Mobile Number *": "आभा आईडी या मोबाइल नंबर *",
    "Mobile Number / ABHA ID": "मोबाइल नंबर / आभा आईडी",
    "Enter 14-digit ABHA or 10-digit mobile": "१४ अंकों की आभा या १० अंकों का मोबाइल दर्ज करें",
    "Use ABHA Address (@abdm)": "आभा (ABHA) पता का उपयोग करें (@abdm)",
    "Send OTP & Continue →": "ओटीपी भेजें और जारी रखें →",
    "✨ Quick Demo: Auto-load Patient": "✨ त्वरित डेमो: मरीज स्वतः लोड करें",
    "Sunita Devi (P-1042)": "सुनीता देवी (P-1042)",
    "Privacy & Clinical Safety Guarantee": "गोपनीयता और क्लिनिकल सुरक्षा गारंटी",
    "Your health data is encrypted under ABDM standards. At no point will this AI prescribe medicines without physician verification.": "आपका स्वास्थ्य डेटा एबीडीएम मानकों के तहत एन्क्रिप्टेड है। किसी भी स्थिति में यह एआई चिकित्सक के सत्यापन के बिना दवाएं नहीं लिखेगा।",
    "Your Health Data Privacy & Clinical Consent": "आपकी स्वास्थ्य डेटा गोपनीयता और क्लिनिकल सहमति",
    "Compliant with the Digital Personal Data Protection (DPDP) Act and ABDM Health Data Management Policy.": "डिजिटल व्यक्तिगत डेटा संरक्षण (डीपीडीपी) अधिनियम और एबीडीएम स्वास्थ्य डेटा प्रबंधन नीति के अनुरूप।",
    "Minimal Data Collection": "न्यूनतम डेटा संग्रह",
    "Only symptoms, audio recordings, and attached lab values are processed.": "केवल लक्षण, ऑडियो रिकॉर्डिंग और संलग्न लैब मान संसाधित किए जाते हैं।",
    "Role-Based Access": "भूमिका-आधारित पहुंच",
    "Restricted strictly to the attending triage nurse and duty medical officer.": "उपस्थित ट्राइएज नर्स और ड्यूटी चिकित्सा अधिकारी तक कड़ाई से सीमित।",
    "Immutable Audit Logs": "अपरिवर्तनीय ऑडिट लॉग",
    "All AI evaluations and clinical nurse overrides are timestamped and logged.": "सभी एआई मूल्यांकन और क्लिनिकल नर्स ओवरराइड समय-मुद्रित और दर्ज हैं।",
    "Zero Diagnostic Claim": "शून्य नैदानिक दावा",
    "ELARA assists human triage prioritization and does not produce a medical diagnosis.": "एलारा मानवीय ट्राइएज प्राथमिकता में सहायता करता है और चिकित्सा निदान उत्पन्न नहीं करता है।",
    "I consent to processing my symptoms, voice recordings, and lab reports strictly for clinical triage support at Sharda PHC Navrangpura.": "मैं शारदा पीएचसी नवरंगपुरा में क्लिनिकल ट्राइएज सहायता के लिए अपने लक्षणों, आवाज रिकॉर्डिंग और लैब रिपोर्ट के प्रसंस्करण के लिए सहमति देता/देती हूँ।",
    "Give Consent & Continue to Triage": "सहमति दें और ट्राइएज जारी रखें",
    "Cancel & Return": "रद्द करें और लौटें",
    "Verify": "सत्यापित करें",
    "Verified ✓": "सत्यापित ✓",
    "Verified": "सत्यापित",
    "Full Name": "पूरा नाम",
    "Full Name *": "पूरा नाम *",
    "Patient Full Name": "मरीज का पूरा नाम",
    "Age & Gender": "आयु और लिंग",
    "Preferred Intake Dialect / Language": "पसंदीदा भाषा / बोली",
    "Hindi (हिंदी - Regional Dialects Supported)": "हिन्दी (हिंदी - क्षेत्रीय बोलियां समर्थित)",
    "Odia (ଓଡ଼ିଆ - Sambalpuri / Coastal)": "ओडिया (ଓଡ଼ିଆ - संबलपुरी / तटीय)",
    "Bengali (বাংলা)": "बांग्ला (বাংলা)",
    "Telugu (తెలుగు)": "तेलुगु (తెలుగు)",
    "English (Standard Medical)": "अंग्रेजी (मानक चिकित्सा)",
    "By continuing, you agree to ABDM Health Data Privacy Consent.": "आगे बढ़कर, आप एबीडीएम स्वास्थ्य डेटा गोपनीयता सहमति से सहमत होते हैं।",
    "Enter Normal Triage →": "सामान्य ट्राइएज में प्रवेश करें →",
    "Quick Demo: Fill Sunita Devi (Odia/English)": "त्वरित डेमो: सुनीता देवी (ओडिया/अंग्रेजी) भरें",
    "Password *": "पासवर्ड *",
    "Password / Security PIN *": "पासवर्ड / सुरक्षा पिन *",
    "Enter your password": "अपना पासवर्ड दर्ज करें",
    "Enter your 6-digit PIN or password": "अपना ६ अंकों का पिन या पासवर्ड दर्ज करें",
    "Please provide valid credentials": "कृपया वैध क्रेडेंशियल प्रदान करें",
    "Remember this device": "इस डिवाइस को याद रखें",
    "Forgot Password?": "पासवर्ड भूल गए?",
    "Sign In as Patient & Continue to Triage": "मरीज के रूप में साइन इन करें और ट्राइएज जारी रखें",
    "Don't have an ABHA ID or account?": "क्या आपके पास आभा आईडी या खाता नहीं है?",
    "Don't have an account?": "क्या आपका खाता नहीं है?",
    "Register / Sign Up": "पंजीकरण / खाता बनाएं",
    "Register Now (ABHA / Mobile)": "अभी पंजीकरण करें (आभा / मोबाइल)",
    "1-Click Interactive Demo (Sunita Devi • Severe Abdominal Pain)": "१-क्लिक इंटरएक्टिव डेमो (सुनीता देवी • तीव्र पेट दर्द)",
    "Sign In": "साइन इन करें",
    "Sign Up": "खाता बनाएं",
    "Create Patient Account": "मरीज का खाता बनाएं",
    "Register for digital OPD triage & prescription records": "डिजिटल ओपीडी ट्राइएज और पर्ची रिकॉर्ड के लिए पंजीकरण करें",
    "ABHA ID Number (Optional)": "आभा आईडी नंबर (वैकल्पिक)",
    "Create Password / PIN *": "पासवर्ड / पिन बनाएं *",
    "Register & Continue to Triage": "पंजीकरण करें और ट्राइएज जारी रखें",
    "Registered Mobile Number *": "पंजीकृत मोबाइल नंबर *",
    "4-Digit Demo OTP (Enter: 1234) *": "४ अंकों का डेमो ओटीपी (दर्ज करें: 1234) *",
    "Create Account": "खाता बनाएं",
    "Register Now": "अभी पंजीकरण करें",
    "Already have an account? Sign In": "क्या आपके पास पहले से खाता है? साइन इन करें",
    "Reset Password": "पासवर्ड रीसेट करें",
    "Reset Forgotten Password": "भूला हुआ पासवर्ड रीसेट करें",
    "Enter OTP sent to your registered mobile number": "अपने पंजीकृत मोबाइल नंबर पर भेजा गया ओटीपी दर्ज करें",
    "Enter 4-Digit OTP (Use: 1234)": "४ अंकों का ओटीपी दर्ज करें (उपयोग करें: 1234)",
    "New Password *": "नया पासवर्ड *",
    "Confirm Password *": "पासवर्ड की पुष्टि करें *",
    "Reset Password & Sign In": "पासवर्ड रीसेट करें और साइन इन करें",
    "Reset Password & Login": "पासवर्ड रीसेट करें और लॉगिन करें",
    "Verifying Credentials...": "क्रेडेंशियल सत्यापित किए जा रहे हैं...",
    "Syncing ABDM...": "एबीडीएम सिंक हो रहा है...",
    "Save & Sync Profile": "प्रोफ़ाइल सुरक्षित करें और सिंक करें",
    "I consent to sharing triage symptom records with the on-duty Medical Officer under ABDM Data Privacy guidelines.": "मैं एबीडीएम डेटा गोपनीयता दिशानिर्देशों के तहत ड्यूटी पर तैनात चिकित्सा अधिकारी के साथ ट्राइएज लक्षण रिकॉर्ड साझा करने की सहमति देता/देती हूँ।",
    "Healthcare Provider & Work Station Login": "स्वास्थ्य सेवा प्रदाता और वर्क स्टेशन लॉगिन",
    "Clinical Staff Authentication": "क्लिनिकल स्टाफ प्रमाणीकरण",
    "Authorized access for Auxiliary Nurse Midwives (ANM), Staff Nurses & Medical Officers": "एएनएम, स्टाफ नर्सों और चिकित्सा अधिकारियों के लिए अधिकृत पहुंच",
    "Access acute OPD triage queue, SOAP notes, and vitals review": "गंभीर ओपीडी ट्राइएज कतार, एसओएपी नोट्स और महत्वपूर्ण संकेतों की समीक्षा देखें",
    "Clinical Staff": "क्लिनिकल स्टाफ",
    "Staff / Employee ID *": "स्टाफ / कर्मचारी आईडी *",
    "Staff NUID / Nursing Council Registration No. *": "स्टाफ एनयूआईडी / नर्सिंग काउंसिल पंजीकरण संख्या *",
    "Enter your 8-digit Health Facility Staff ID": "अपना ८ अंकों का स्वास्थ्य सुविधा स्टाफ आईडी दर्ज करें",
    "Staff Nurse Name": "स्टाफ नर्स का नाम",
    "Assigned Work Station": "आवंटित वर्क स्टेशन",
    "OPD Triage Station 1": "ओपीडी ट्राइएज स्टेशन १",
    "Emergency Screening Room": "आपातकालीन स्क्रीनिंग कक्ष",
    "Inpatient Ward Bed 1-12": "इनपेशेंट वार्ड बेड १-१२",
    "Health Facility / PHC Code": "स्वास्थ्य सुविधा / पीएचसी कोड",
    "Biometric PIN / Access Passcode": "बायोमेट्रिक पिन / एक्सेस पासकोड",
    "PIN Saved": "पिन सुरक्षित हुआ",
    "Sign In to Nurse Work Station (Queue: 28 Cases)": "नर्स वर्क स्टेशन में साइन इन करें (कतार: २८ मामले)",
    "1-Click Fast Nurse Login (Sister Priya Sharma)": "१-क्लिक त्वरित नर्स लॉगिन (सिस्टर प्रिया शर्मा)",
    "Security Passcode *": "सुरक्षा पासकोड *",
    "Enter your secure clinical PIN": "अपना सुरक्षित क्लिनिकल पिन दर्ज करें",
    "Clinical Role / Unit": "क्लिनिकल भूमिका / इकाई",
    "Sister Priya (ANM / Staff Nurse - Triage Desk 2)": "सिस्टर प्रिया (एएनएम / स्टाफ नर्स - ट्राइएज डेस्क २)",
    "Dr. Ananya Roy (Medical Superintendent / CMO)": "डॉ. अनन्या रॉय (चिकित्सा अधीक्षक / सीएमओ)",
    "Quick Demo: Fill Sister Priya (Nurse)": "त्वरित डेमो: सिस्टर प्रिया (नर्स) भरें",
    "Quick Demo: Fill Dr. Roy (Admin)": "त्वरित डेमो: डॉ. रॉय (व्यवस्थापक) भरें",
    "Authenticate & Enter Workstation": "प्रमाणित करें और वर्कस्टेशन में प्रवेश करें",
    "Clinical Audit Trail Active • All actions logged in compliance with CDSCO regulations": "क्लिनिकल ऑडिट ट्रेल सक्रिय • सभी कार्य सीडीएससीओ नियमों के अनुपालन में दर्ज हैं",
    "Medical Officer & Facility Administration": "चिकित्सा अधिकारी और सुविधा प्रशासन",
    "Supervisory dashboard, protocol overrides, and referral routing": "पर्यवेक्षी डैशबोर्ड, प्रोटोकॉल ओवरराइड और रेफरल रूटिंग",
    "Medical Council (MCI / NMC) Registration No. *": "मेडिकल काउंसिल (एमसीआई / एनएमसी) पंजीकरण संख्या *",
    "Officer Name": "अधिकारी का नाम",
    "Facility Role": "सुविधा भूमिका",
    "Digital Signature PIN / Admin Token": "डिजिटल हस्ताक्षर पिन / व्यवस्थापक टोकन",
    "Sign In as Facility Admin (Dr. Roy)": "सुविधा व्यवस्थापक (डॉ. रॉय) के रूप में साइन इन करें",
    "Good morning, Sunita": "शुभ प्रभात, सुनीता",
    "ID: P-1042 • 42Y / Female • Sharda PHC": "आईडी: P-1042 • ४२ वर्ष / महिला • शारदा पीएचसी",
    "Let’s understand how you’re feeling today. Kendrapara PHC Clinical Network is active.": "आइए समझें कि आज आप कैसा महसूस कर रहे हैं। केन्द्रपड़ा पीएचसी क्लिनिकल नेटवर्क सक्रिय है।",
    "Sharda PHC Navrangpura": "शारदा पीएचसी नवरंगपुरा",
    "Queue: Normal (&lt; 15 mins)": "कतार: सामान्य (< १५ मिनट)",
    "Multimodal AI Assistant • Odia, Hindi & English": "मल्टीमॉडल एआई सहायक • ओडिया, हिन्दी और अंग्रेजी",
    "Need help describing your symptoms?": "अपने लक्षणों का वर्णन करने में सहायता चाहिए?",
    "Speak naturally in your mother tongue.": "अपनी मातृभाषा में सहजता से बोलें।",
    "Talk to Elara like you would to a trusted community sister or ASHA worker. Mention fevers, body aches, prescription history, or worries.": "एलारा से उसी तरह बात करें जैसे आप किसी विश्वसनीय आशा कार्यकर्ता या दीदी से करते हैं। बुखार, बदन दर्द, पुरानी दवाओं या चिंताओं का उल्लेख करें।",
    "Standard intake & dialect recognition ready": "मानक इनटेक और बोली पहचान तैयार",
    "Active Acoustic Channel": "सक्रिय ध्वनिक चैनल",
    "Online": "ऑनलाइन",
    "“ମୋତେ ଦୁଇ ଦିନ ଧରି ପ୍ରବଳ ଜ୍ୱର ଓ ମୁଣ୍ଡବିନ୍ଧା ହେଉଛି...”": "“मुझे दो दिनों से तेज बुखार और सिरदर्द हो रहा है...”",
    "Normal Triage": "सामान्य ट्राइएज",
    "Standard": "मानक",
    "Describe symptoms naturally in Hindi, Odia, or English. Automated structured triage extraction.": "हिन्दी, ओडिया या अंग्रेजी में स्वाभाविक रूप से लक्षणों का वर्णन करें। स्वचालित संरचित ट्राइएज निष्कर्षण।",
    "Start normal triage": "सामान्य ट्राइएज शुरू करें",
    "Guided Form": "मार्गदर्शित प्रपत्र",
    "Step-by-step": "चरण-दर-चरण",
    "Answer structured clinical prompts about duration, severity, and existing medication.": "अवधि, गंभीरता और मौजूदा दवाओं के बारे में संरचित क्लिनिकल प्रश्नों के उत्तर दें।",
    "Answer 4 quick prompts": "४ त्वरित प्रश्नों के उत्तर दें",
    "Document Scan": "दस्तावेज़ स्कैन",
    "OCR AI": "ओसीआर एआई",
    "Upload an image of an old prescription slip, CBC blood report, or OPD registration card.": "पुरानी पर्ची, सीबीसी रक्त रिपोर्ट या ओपीडी पंजीकरण कार्ड की तस्वीर अपलोड करें।",
    "Upload photo or PDF": "फोटो या पीडीएफ अपलोड करें",
    "Active PHC Triage Cases": "सक्रिय पीएचसी ट्राइएज मामले",
    "View Full Queue (28) →": "पूरी कतार देखें (२८) →",
    "Case #P-1042: Sunita Devi (42 F)": "मामला #P-1042: सुनीता देवी (४२ महिला)",
    "High Fever & Cephalea": "तेज बुखार और सिरदर्द",
    "Assigned: Sister Priya • Waiting time: 12 min": "आवंटित: सिस्टर प्रिया • प्रतीक्षा समय: १२ मिनट",
    "Continue Triage →": "ट्राइएज जारी रखें →",
    "Case #P-1043: Rajesh Kumar (35 M)": "मामला #P-1043: राजेश कुमार (३५ पुरुष)",
    "Persistent Cough & Low Fever": "लगातार खांसी और हल्का बुखार",
    "Assigned: General OPD Queue • Waiting time: 24 min": "आवंटित: सामान्य ओपीडी कतार • प्रतीक्षा समय: २४ मिनट",
    "View": "देखें",
    "Navrangpura Health Advisory": "नवरंगपुरा स्वास्थ्य सलाह",
    "Seasonal viral fever spike reported. Patients presenting with chills, cephalalgia, or joint pains should receive rapid Dengue/Malaria screening.": "मौसमी वायरल बुखार में वृद्धि दर्ज की गई। ठंड, सिरदर्द या जोड़ों के दर्द वाले मरीजों की तत्काल डेंगू/मलेरिया जांच होनी चाहिए।",
    "Emergency Direct SOS": "आपातकालीन सीधा एसओएस",
    "Dial 108": "१०८ डायल करें",
    "Dial 104": "१०४ डायल करें",
    "Welcome back,": "वापसी पर स्वागत है,",
    "Welcome back, {name}": "वापसी पर स्वागत है, {name}",
    "Sunita Devi": "सुनीता देवी",
    "Ayushman Bharat Digital Card": "आयुष्मान भारत डिजिटल कार्ड",
    "ABHA ID:": "आभा (ABHA) आईडी:",
    "ABHA Address:": "आभा पता:",
    "DOB:": "जन्म तिथि:",
    "Gender:": "लिंग:",
    "Blood Group:": "रक्त समूह:",
    "Primary Health Centre:": "प्राथमिक स्वास्थ्य केंद्र:",
    "Kendrapara Sub-District Hospital": "केन्द्रपड़ा उप-जिला अस्पताल",
    "Active Health Status": "सक्रिय स्वास्थ्य स्थिति",
    "Good • Last checked 2 days ago": "अच्छा • २ दिन पहले जांचा गया",
    "Start Normal Triage": "सामान्य ट्राइएज शुरू करें",
    "Check symptoms via Voice, Text, or Medical Reports": "आवाज, पाठ या मेडिकल रिपोर्ट के माध्यम से लक्षणों की जांच करें",
    "Jan Aushadhi Medicines": "जन औषधि केंद्र दवाएं",
    "Quality generic medicines at 50% to 90% savings": "५०% से ९०% तक बचत पर गुणवत्तापूर्ण जेनेरिक दवाएं",
    "Track Orders": "ऑर्डर ट्रैक करें",
    "Track active medicine prescription deliveries": "सक्रिय दवा पर्ची डिलीवरी ट्रैक करें",
    "Instant ambulance dispatch with live GPS tracking": "लाइव जीपीएस ट्रैकिंग के साथ त्वरित एम्बुलेंस प्रेषण",
    "Recent Vitals & ABHA Records": "हाल के महत्वपूर्ण संकेत और आभा रिकॉर्ड",
    "Blood Pressure": "रक्तचाप (BP)",
    "Pulse Rate": "नाड़ी दर (Pulse)",
    "SpO2 Oxygen": "ऑक्सीजन स्तर (SpO2)",
    "Random Blood Sugar": "रक्त शर्करा (Sugar)",
    "Upcoming Care & Follow-ups": "आगामी देखभाल और अनुवर्ती परामर्श",
    "Antenatal Check-up (ANC-3)": "प्रसवपूर्व जांच (ANC-3)",
    "Dr. Ananya Roy • Room 4, Sharda PHC": "डॉ. अनन्या रॉय • कमरा ४, शारदा पीएचसी",
    "Hypertension Review": "उच्च रक्तचाप समीक्षा",
    "Sister Priya • Triage Desk 2": "सिस्टर प्रिया • ट्राइएज डेस्क २",
    "Health Tips for Today": "आज के लिए स्वास्थ्य सुझाव",
    "Stay hydrated with clean boiled water during hot weather.": "गर्म मौसम में साफ उबला हुआ पानी पीकर शरीर में पानी की कमी न होने दें।",
    "Take BP medication daily at the same time after breakfast.": "नाश्ते के बाद रोजाना एक ही समय पर बीपी की दवा लें।",
    "View Health Records": "स्वास्थ्य रिकॉर्ड देखें",
    "Download ABHA QR Card": "आभा क्यूआर कार्ड डाउनलोड करें",
    "Active Cases": "सक्रिय मामले",
    "Quick Actions": "त्वरित कार्य",
    "Active Multimodal Intake Studio • Step 1 of 2": "सक्रिय मल्टीमॉडल इनटेक स्टूडियो • चरण १ का २",
    "Multimodal Clinical Intake Studio": "मल्टीमॉडल क्लिनिकल इनटेक स्टूडियो",
    "Describe symptoms via Voice in your dialect, Text, or upload Lab Reports": "अपनी बोली में आवाज, पाठ या लैब रिपोर्ट अपलोड करके लक्षणों का वर्णन करें",
    "Mode 1: Patient Voice (Microphone)": "मोड १: मरीज की आवाज (माइक्रोफोन)",
    "Mode 2: Text Description": "मोड २: लिखित विवरण (टेक्स्ट)",
    "Mode 3: Medical Report / Prescription": "मोड ३: मेडिकल रिपोर्ट / पर्ची",
    "Text Narrative": "लिखित विवरण",
    "Lab Report OCR": "लैब रिपोर्ट ओसीआर",
    "Reset": "रीसेट",
    "Neural Acoustic Sensor": "न्यूरल ध्वनिक सेंसर",
    "48 kHz • Noise Suppressed": "४८ kHz • शोर रहित",
    "Tap to Record": "रिकॉर्ड करने के लिए टैप करें",
    "Simulate realistic patient vernacular samples:": "वास्तविक मरीज बोलियों का अनुकरण करें:",
    "🔴 Sunita: High Fever & Headache (Hindi)": "🔴 सुनीता: तेज बुखार और सिरदर्द (हिन्दी)",
    "🔴 Amit: Chest Tightness (English)": "🔴 अमित: सीने में जकड़न (अंग्रेजी)",
    "🟡 Anita: Knee joint swelling (Odia)": "🟡 अनिता: घुटने में सूजन (ओडिया)",
    "Type Your Symptoms & Duration": "अपने लक्षण और अवधि लिखें",
    "High fever since yesterday night, throbbing headache, feeling cold and shivering.": "कल रात से तेज बुखार, धड़कता सिरदर्द, ठंड लगना और कंपकंपी।",
    "Quick Clinical Tags:": "त्वरित क्लिनिकल टैग:",
    "🌡️ Fever with Chills": "🌡️ ठंड के साथ बुखार",
    "🤕 Throbbing Headache": "🤕 तेज धड़कता सिरदर्द",
    "💪 Body Ache": "💪 बदन दर्द",
    "😷 Cough": "😷 खांसी",
    "🤢 Nausea": "🤢 मतली",
    "Upload / Capture Medical Report": "मेडिकल रिपोर्ट अपलोड / कैप्चर करें",
    "Tap to upload CBC, Dengue test, or OPD prescription": "सीबीसी, डेंगू परीक्षण या ओपीडी पर्ची अपलोड करने के लिए टैप करें",
    "🎙️ Live Speech-to-Text (Whisper / Vani)": "🎙️ लाइव वाणी-से-पाठ (व्हिस्पर / वाणी)",
    "98% Confidence": "९८% सटीकता",
    "\"मुझे कल रात से तेज़ बुखार और सिरदर्द है... नींद नहीं आ रही है और बदन दर्द भी है।\"": "\"मुझे कल रात से तेज़ बुखार और सिरदर्द है... नींद नहीं आ रही है और बदन दर्द भी है।\"",
    "🌐 Clinical Translation (English)": "🌐 क्लिनिकल अनुवाद (अंग्रेजी)",
    "\"I have high fever and severe headache since last night with chills, cannot sleep, and generalized body ache.\"": "\"मुझे कल रात से तेज बुखार और कंपकंपी के साथ तेज सिरदर्द है, नींद नहीं आ रही है और पूरे शरीर में दर्द है।\"",
    "📋 Extracted Lab Values (CBC)": "📋 निकाली गई लैब रिपोर्ट (सीबीसी)",
    "Verified Match": "सत्यापित मिलान",
    "Hemoglobin": "हीमोग्लोबिन",
    "11.2 g/dL": "११.२ g/dL",
    "Slightly Low": "हल्का कम",
    "WBC Count": "डब्ल्यूबीसी काउंट",
    "8,200 /µL": "८,२०० /µL",
    "Platelets": "प्लेटलेट्स",
    "2.1 L/µL": "२.१ लाख/µL",
    "Adequate": "पर्याप्त",
    "Verification rule:": "सत्यापन नियम:",
    "Cross-check values with physical laboratory printout before doctor handover.": "डॉक्टर को सौंपने से पहले भौतिक लैब प्रिंटआउट के साथ मानों की पुनः जांच करें।",
    "Process Symptoms with AI ✨": "एआई के साथ लक्षणों का विश्लेषण करें ✨",
    "Press and speak freely in your language:": "दबाएं और अपनी भाषा में खुलकर बोलें:",
    "Start Voice Input": "आवाज रिकॉर्डिंग शुरू करें",
    "Listening... Speak now": "सुन रहा है... अब बोलें",
    "Stop Voice": "आवाज रोकें",
    "Read Aloud (TTS)": "बोलकर सुनाएं (TTS)",
    "Preset Audio Samples (Try One):": "पूर्व-रिकॉर्ड किए गए नमूने (एक आज़माएं):",
    "Odia (Fever & Headache)": "ओडिया (बुखार और सिरदर्द)",
    "Hindi (Chest Discomfort)": "हिन्दी (सीने में बेचैनी)",
    "English (Stomach Pain)": "अंग्रेजी (पेट दर्द)",
    "Describe your symptoms in detail:": "अपने लक्षणों का विस्तार से वर्णन करें:",
    "e.g., Fever for 3 days with chills, severe headache, and vomiting...": "उदा. ३ दिनों से ठंड के साथ बुखार, तेज सिरदर्द और उल्टी...",
    "Upload Medical Report or Prescription Image:": "मेडिकल रिपोर्ट या पर्ची की तस्वीर अपलोड करें:",
    "Drag & drop file or browse": "फ़ाइल खींचकर छोड़ें या ब्राउज़ करें",
    "Supports JPG, PNG, PDF up to 10MB": "१० एमबी तक जेपीजी, पीएनजी, पीडीएफ समर्थित",
    "Sample CBC Lab Report": "नमूना सीबीसी लैब रिपोर्ट",
    "Sample ECG Report": "नमूना ईसीजी रिपोर्ट",
    "Patient Vitals (Optional / Known):": "मरीज के महत्वपूर्ण संकेत (वैकल्पिक / ज्ञात):",
    "Systolic / Diastolic (e.g. 120/80)": "सिस्टोलिक / डायस्टोलिक (उदा. 120/80)",
    "Beats per minute (e.g. 78)": "धड़कन प्रति मिनट (उदा. 78)",
    "Percentage (e.g. 98)": "प्रतिशत (उदा. 98)",
    "Body Temp (°F) (e.g. 98.6)": "शरीर का तापमान (°F) (उदा. 98.6)",
    "mg/dL (e.g. 110)": "मिलीग्राम/डीएल (उदा. 110)",
    "Reset All Inputs": "सभी इनपुट रीसेट करें",
    "Analyze Symptoms & Generate Clinical Triage →": "लक्षणों का विश्लेषण करें और ट्राइएज तैयार करें →",
    "Press mic to speak in Odia, Hindi, or English": "ओडिया, हिन्दी या अंग्रेजी में बोलने के लिए माइक दबाएं",
    "Active AI Triage Engine v2.4": "सक्रिय एआई ट्राइएज इंजन संस्करण २.४",
    "Edge Node #04": "एज नोड #०४",
    "Analyzing & Structuring Triage Note...": "ट्राइएज नोट का विश्लेषण और संरचना की जा रही है...",
    "Converting multimodal voice and lab inputs into structured clinical context.": "मल्टीमॉडल आवाज और लैब इनपुट को संरचित क्लिनिकल संदर्भ में बदला जा रहा है।",
    "Clinical Synthesis": "क्लिनिकल संश्लेषण",
    "CBC hematology verified: Hb 11.2, Platelets 2.1L": "सीबीसी हेमेटोलॉजी सत्यापित: हीमोग्लोबिन ११.२, प्लेटलेट्स २.१ लाख",
    "Preparing triage summary & urgency": "ट्राइएज सारांश और तात्कालिकता तैयार की जा रही है",
    "Applying emergency triage protocol matrix": "आपातकालीन ट्राइएज प्रोटोकॉल मैट्रिक्स लागू किया जा रहा है",
    "Clinical Transparency & Safety": "क्लिनिकल पारदर्शिता और सुरक्षा",
    "This system identifies clinical risk indicators for human healthcare decision-makers. It does": "यह प्रणाली मानव स्वास्थ्य निर्णयकर्ताओं के लिए क्लिनिकल जोखिम संकेतकों की पहचान करती है। यह",
    "NOT": "कदापि नहीं",
    "generate a final medical diagnosis or prescribe medications.": "अंतिम चिकित्सा निदान उत्पन्न नहीं करती और न ही दवाएं लिखती है।",
    "Protocol: MOHFW-SaMD Clinical Tier 2": "प्रोटोकॉल: स्वास्थ्य मंत्रालय-एसएएमडी क्लिनिकल टीयर २",
    "Cancel & Edit Inputs": "रद्द करें और इनपुट संपादित करें",
    "Clinical AI Multimodal Processing": "क्लिनिकल एआई मल्टीमॉडल प्रसंस्करण",
    "Analyzing patient voice, medical report, and physiological vitals...": "मरीज की आवाज, मेडिकल रिपोर्ट और शारीरिक संकेतों का विश्लेषण किया जा रहा है...",
    "Synthesis Progress:": "संश्लेषण प्रगति:",
    "Model: BioMistral-Clinical-Indic • Latency: 320ms": "मॉडल: बायोमिस्ट्रल-क्लिनिकल-इंडिक • विलंबता: ३२० एमएस",
    "Step 5 of 6 Processing": "चरण ५ का ६ प्रसंस्कृत हो रहा है",
    "Live Processing Pipeline": "लाइव प्रसंस्करण पाइपलाइन",
    "5 tasks active": "५ कार्य सक्रिय",
    "Voice converted to text": "आवाज को पाठ (टेक्स्ट) में बदला गया",
    "Real-time STT recorded • 98% confidence score": "रीयल-टाइम एसटीटी दर्ज • ९८% सटीकता स्कोर",
    "Language understood & translated": "भाषा समझी गई और अनुवादित की गई",
    "Standardized to SNOMED CT clinical terms": "स्नोमेड सीटी क्लिनिकल शब्दों में मानकीकृत",
    "Core symptoms identified": "मुख्य लक्षणों की पहचान की गई",
    "Pyrexia 102°F, Severe Cephalea, Rigors noted": "बुखार १०२°F, तीव्र सिरदर्द, कंपकंपी दर्ज",
    "Report information extracted": "रिपोर्ट से जानकारी निकाली गई",
    "Platelets 92,000/μL (Thrombocytopenia alert)": "प्लेटलेट्स ९२,०००/μL (थ्रोम्बोसाइटोपेनिया अलर्ट)",
    "Safety protocols checked": "सुरक्षा प्रोटोकॉल की जांच की गई",
    "CDSCO Protocol 24A-Triage: No contraindications": "सीडीएससीओ प्रोटोकॉल २४ए-ट्राइएज: कोई प्रतिकूल संकेत नहीं",
    "Urgency score calculated": "तात्कालिकता स्कोर की गणना की गई",
    "ESI Level 2 (Priority) computed based on vitals": "महत्वपूर्ण संकेतों के आधार पर ईएसआई स्तर २ (प्राथमिकता) निर्धारित",
    "AI Safety & Hallucination Guardrails": "एआई सुरक्षा और मिथ्या-कथन नियंत्रण",
    "Verified Grounding: SNOMED CT & ICD-11": "सत्यापित आधार: स्नोमेड सीटी और आईसीडी-११",
    "Confidence Threshold: 94.6% (> 85% requirement)": "आत्मविश्वास सीमा: ९४.६% (> ८५% आवश्यकता)",
    "Clinical Decision Support Status: Non-Diagnostic Adjuvant": "क्लिनिकल निर्णय सहायता स्थिति: गैर-निदानात्मक सहायक",
    "Proceed to Missing Info Check →": "छूटी हुई जानकारी की जांच के लिए आगे बढ़ें →",
    "IndicConformer: Speech-to-Text Transcribed": "इंडिककन्फ़ॉर्मर: वाणी से पाठ रूपांतरित हुआ",
    "IndicTrans2: Clinical Entities Translated": "इंडिकट्रांस२: क्लिनिकल शब्दों का अनुवाद हुआ",
    "BioClinicalBERT: Extraction & Red-Flag Scanning": "बायोक्लिनिकलबर्ट: निष्कर्ष और रेड-फ्लैग जांच पूर्ण",
    "Protocol Logic: Prioritization Matrix Finalized": "प्रोटोकॉल तर्क: प्राथमिकता मैट्रिक्स को अंतिम रूप दिया गया",
    "78% Complete": "७८% पूर्ण",
    "Symptom Summary & Clinical Validation": "लक्षण सारांश और क्लिनिकल सत्यापन",
    "Review reported evidence and resolve missing clinical parameters before physician review.": "चिकित्सक समीक्षा से पहले रिपोर्ट किए गए साक्ष्यों की समीक्षा करें और छूटे हुए क्लिनिकल मापदंडों का समाधान करें।",
    "← Add More Inputs": "← और इनपुट जोड़ें",
    "📝 Reported Evidence": "📝 रिपोर्ट किए गए साक्ष्य",
    "Fever with Chills": "ठंड के साथ बुखार",
    "Onset: Yesterday evening (~24h) • Severe shivering spells": "शुरुआत: कल शाम (~२४ घंटे) • तेज कंपकंपी के दौरे",
    "Throbbing Frontal Headache": "तेज धड़कता हुआ माथे का सिरदर्द",
    "Persistent bilateral brow ache, heightened by ambient daylight": "भौंहों के दोनों ओर लगातार दर्द, दिन की रोशनी में बढ़ जाता है",
    "Generalized Fatigue & Body Ache": "सामान्य थकान और बदन दर्द",
    "Able to ambulate unassisted to triage room; no dyspnea": "बिना सहायता के ट्राइएज कक्ष तक चलने में सक्षम; सांस फूलने की समस्या नहीं",
    "Total Duration:": "कुल अवधि:",
    "~1 day (acute onset)": "~१ दिन (तीव्र शुरुआत)",
    "Identified Missing Information": "पहचानी गई छूटी हुई जानकारी",
    "ELARA identified key clinical parameters required before doctor review. Tap to resolve:": "एलारा ने डॉक्टर की समीक्षा से पहले आवश्यक प्रमुख क्लिनिकल मापदंडों की पहचान की। समाधान के लिए टैप करें:",
    "Exact Body Temperature": "शरीर का सटीक तापमान",
    "Unrecorded by patient.": "मरीज द्वारा दर्ज नहीं किया गया।",
    "+ Add (102.4°F)": "+ जोड़ें (१०२.४°F)",
    "Medication & Allergy History": "दवा और एलर्जी इतिहास",
    "Antipyretics not logged.": "बुखार की दवा दर्ज नहीं है।",
    "+ Add (Paracetamol)": "+ जोड़ें (पैरासिटामोल)",
    "Danger Signs / Stiff Neck": "खतरे के संकेत / गर्दन में अकड़न",
    "Any stiff neck or petechial rash?": "क्या गर्दन में अकड़न या लाल चकत्ते हैं?",
    "+ Confirm None": "+ पुष्टि करें: कोई नहीं",
    "Generate Triage Note 📋": "ट्राइएज नोट तैयार करें 📋",
    "42 yrs • Female": "४२ वर्ष • महिला",
    "Sharda PHC Navrangpura • Normal Triage Session: Hindi Voice + Laboratory PDF": "शारदा पीएचसी नवरंगपुरा • सामान्य ट्राइएज सत्र: हिन्दी वाणी + लैब पीडीएफ",
    "Clinical Missing Information Resolution": "क्लिनिकल छूटी हुई जानकारी का समाधान",
    "AI identified 2 clinical variables requiring clarification before final note generation": "अंतिम नोट तैयार करने से पहले एआई ने २ क्लिनिकल चरों के स्पष्टीकरण की पहचान की",
    "Clarification 1: Duration of High-Grade Fever": "स्पष्टीकरण १: तेज बुखार की अवधि",
    "How many continuous days has the patient had body temperature above 101°F?": "मरीज को १०१°F से अधिक शरीर का तापमान लगातार कितने दिनों से है?",
    "1 - 2 Days": "१ - २ दिन",
    "3 - 5 Days (Current Selection)": "३ - ५ दिन (वर्तमान चयन)",
    "More than 7 Days": "७ दिन से अधिक",
    "Clarification 2: Petechial Rash or Bleeding Manifestations": "स्पष्टीकरण २: त्वचा पर लाल चकत्ते या रक्तस्राव के लक्षण",
    "Has there been any spontaneous bleeding from gums, nose, or reddish spots under skin?": "क्या मसूड़ों, नाक से कोई रक्तस्राव या त्वचा के नीचे लाल धब्बे दिखाई दिए हैं?",
    "None Observed": "कोई नहीं देखा गया",
    "Mild Gum Bleeding Noted": "हल्का मसूड़ों का रक्तस्राव देखा गया",
    "Skin Petechiae Present": "त्वचा पर लाल चकत्ते उपस्थित",
    "Symptom Severity Rating (Visual Analog Scale)": "लक्षण गंभीरता रेटिंग (दृश्य अनुरूप पैमाना)",
    "Mild (1-3)": "हल्का (१-३)",
    "Moderate (4-6)": "मध्यम (४-६)",
    "Severe (7-10)": "गंभीर (७-१०)",
    "Current Rating: 7/10 (Severe Pain)": "वर्तमान रेटिंग: ७/१० (तीव्र दर्द)",
    "Red-Flag Clinical Warning:": "रेड-फ्लैग क्लिनिकल चेतावनी:",
    "Low platelet count (92,000) combined with 4-day fever indicates Dengue Warning Signs.": "कम प्लेटलेट काउंट (९२,०००) और ४ दिन के बुखार के साथ डेंगू चेतावनी संकेत प्रदर्शित होते हैं।",
    "Confirm Clarifications & Finalize Triage Note →": "स्पष्टीकरण की पुष्टि करें और ट्राइएज नोट को अंतिम रूप दें →",
    "CLINICAL PRIORITY STATUS": "क्लिनिकल प्राथमिकता स्थिति",
    "PRIORITY REVIEW SUGGESTED": "त्वरित समीक्षा अनुशंसित",
    "Prompt clinical assessment recommended within 30 minutes.": "३० मिनट के भीतर त्वरित क्लिनिकल मूल्यांकन की सिफारिश की गई है।",
    "Extracted Symptoms": "निकाले गए लक्षण",
    "3 Verified": "३ सत्यापित",
    "Onset ~24h ago; acute shivering reported": "शुरुआत ~२४ घंटे पहले; तेज कंपकंपी दर्ज",
    "Persistent bilateral ache, light sensitive": "दोनों तरफ लगातार दर्द, प्रकाश के प्रति संवेदनशीलता",
    "Mild Fatigue & Body Ache": "हल्की थकान और बदन दर्द",
    "Able to ambulate unassisted to triage room": "बिना सहायता के ट्राइएज रूम तक चलने में सक्षम",
    "Extracted from CBC Report": "सीबीसी रिपोर्ट से निकाला गया",
    "Low": "कम",
    "2.1 L": "२.१ लाख",
    "Vitals & Clinical Context": "महत्वपूर्ण संकेत और क्लिनिकल संदर्भ",
    "Recorded Temperature:": "दर्ज किया गया तापमान:",
    "102.4 °F (Febrile, recorded)": "१०२.४ °F (बुखार, दर्ज)",
    "Current Medication:": "वर्तमान दवा:",
    "Paracetamol 650mg taken 4h ago": "४ घंटे पहले पैरासिटामोल ६५० मिलीग्राम ली गई",
    "Known Allergies:": "ज्ञात एलर्जी:",
    "No known drug allergies (NKDA)": "कोई ज्ञात दवा एलर्जी नहीं (एनकेडीए)",
    "Duty Medical Officer:": "ड्यूटी चिकित्सा अधिकारी:",
    "Dr. Ananya Roy, MBBS (Room 104)": "डॉ. अनन्या रॉय, एमबीबीएस (कमरा १०४)",
    "🤖 AI Clinical Triage Synthesis": "🤖 एआई क्लिनिकल ट्राइएज संश्लेषण",
    "\"Acute febrile illness presentation with severe cephalea. Stable hematological profile on attached CBC. Recommended for targeted vitals measurement (Temp 102.4°F recorded) and urgent malaria/dengue screening by duty doctor.\"": "\"तेज सिरदर्द के साथ तीव्र बुखार की बीमारी। संलग्न सीबीसी पर स्थिर हेमेटोलॉजिकल प्रोफाइल। लक्षित महत्वपूर्ण संकेतों के मापन (तापमान १०२.४°F दर्ज) और ड्यूटी डॉक्टर द्वारा तत्काल मलेरिया/डेंगू जांच की सिफारिश की गई।\"",
    "Synthesized with ELARA Clinical Logic Engine v2.4": "एलारा क्लिनिकल लॉजिक इंजन संस्करण २.४ द्वारा संश्लेषित",
    "Send for Healthcare Worker Review 🚀": "स्वास्थ्य कार्यकर्ता समीक्षा के लिए भेजें 🚀",
    "Dispatches encrypted clinical token to Sister Priya (Desk 2)": "सिस्टर प्रिया (डेस्क २) को एन्क्रिप्टेड क्लिनिकल टोकन भेजता है",
    "Structured Clinical Triage Assessment Note": "संरचित क्लिनिकल ट्राइएज मूल्यांकन नोट",
    "Case ID: P-1042 • Protocol: Emergency Severity Index (ESI-2)": "मामला आईडी: P-1042 • प्रोटोकॉल: इमरजेंसी सीवियरिटी इंडेक्स (ESI-2)",
    "URGENCY CLASSIFICATION": "तात्कालिकता वर्गीकरण",
    "PRIORITY (YELLOW) - ESI Level 2": "प्राथमिकता (पीला) - ईएसआई स्तर २",
    "Requires prompt healthcare worker clinical review within 30 minutes": "३० मिनट के भीतर स्वास्थ्य कार्यकर्ता द्वारा त्वरित क्लिनिकल समीक्षा आवश्यक",
    "Patient Demographics & Identifiers": "मरीज की जनसांख्यिकी और पहचानकर्ता",
    "Name: Sunita Devi | Age: 42 F | ABHA: 91-4820-1928-3341": "नाम: सुनीता देवी | आयु: ४२ महिला | आभा: 91-4820-1928-3341",
    "Chief Complaints (History of Presenting Illness)": "मुख्य शिकायतें (वर्तमान बीमारी का इतिहास)",
    "High-grade pyrexia (102.4°F) for 4 days with rigors and retro-orbital headache.": "४ दिनों से कंपकंपी और आंखों के पीछे दर्द के साथ तेज बुखार (१०२.४°F)।",
    "Associated nausea, arthralgia (severe joint ache), and generalized malaise.": "साथ में मतली, जोड़ों में तेज दर्द और सामान्य अस्वस्थता।",
    "Objective Findings & Vitals Summary": "उद्देश्यपूर्ण निष्कर्ष और महत्वपूर्ण संकेतों का सारांश",
    "BP: 118/76 mmHg • HR: 104 bpm (Tachycardia) • SpO2: 97% • Temp: 102.4°F": "बीपी: 118/76 mmHg • हृदय गति: 104 bpm • SpO2: 97% • तापमान: 102.4°F",
    "Platelets: 92,000/μL (Moderate Thrombocytopenia) • Tourniquet Test: Positive": "प्लेटलेट्स: ९२,०००/μL (मध्यम थ्रोम्बोसाइटोपेनिया) • टॉर्निकेट टेस्ट: पॉजिटिव",
    "Clinical Differential & Reasoning": "क्लिनिकल विभेदक और तर्क",
    "1. Suspected Dengue Fever with warning signs (Thrombocytopenia + Retro-orbital pain)": "१. चेतावनी संकेतों के साथ संदिग्ध डेंगू बुखार (थ्रोम्बोसाइटोपेनिया + आंखों के पीछे दर्द)",
    "2. Viral Pyrexia with reactive thrombocytopenia": "२. रिएक्टिव थ्रोम्बोसाइटोपेनिया के साथ वायरल बुखार",
    "3. Malaria (Falciparum/Vivax) rule-out pending peripheral smear": "३. मलेरिया (फाल्सीपेरम/विवैक्स) परिधीय स्मीयर जांच लंबित",
    "Recommended Clinical Actions": "अनुशंसित क्लिनिकल कदम",
    "• Urgent IV NS 0.9% fluid resuscitation 500ml over 1 hour.": "• १ घंटे में तत्काल ५०० मिलीलीटर आईवी एनएस ०.९% फ्लुइड रीससिटेशन।",
    "• Stat Dengue NS1 Antigen & IgM/IgG rapid antibody card test.": "• तत्काल डेंगू एनएस१ एंटीजन और आईजीएम/आईजीजी रैपिड एंटीबॉडी कार्ड टेस्ट।",
    "• Strict contraindication: Avoid NSAIDs (Aspirin/Ibuprofen/Diclofenac) due to bleeding risk.": "• सख्त निषेध: रक्तस्राव के खतरे के कारण दर्द निवारक (एस्पिरिन/इबुप्रोफेन/डाइक्लोफेनाक) से बचें।",
    "• Paracetamol 650mg PO for fever control as required.": "• बुखार नियंत्रण के लिए आवश्यकतानुसार पैरासिटामोल ६५० मिलीग्राम मौखिक।",
    "Forward to Healthcare Worker Console": "स्वास्थ्य कार्यकर्ता कंसोल पर भेजें",
    "Download ABDM FHIR Clinical Note (PDF)": "एबीडीएम एफएचआईआर क्लिनिकल नोट (PDF) डाउनलोड करें",
    "Order Prescribed Medicines (Jan Aushadhi)": "निर्धारित दवाएं ऑर्डर करें (जन औषधि)",
    "👩⚕️ HEALTHCARE WORKER CONSOLE": "👩⚕️ स्वास्थ्य कार्यकर्ता कंसोल",
    "Today's Clinical Triage Queue": "आज की क्लिनिकल ट्राइएज कतार",
    "Sister Priya • Desk 2 (Sharda PHC Navrangpura)": "सिस्टर प्रिया • डेस्क २ (शारदा पीएचसी नवरंगपुरा)",
    "Sync ABDM Queue": "एबीडीएम कतार सिंक करें",
    "🔴 Urgent Review Cases": "🔴 अति आवश्यक समीक्षा मामले",
    "Target review &lt; 15 mins": "समीक्षा लक्ष्य < १५ मिनट",
    "🟡 Priority Triage": "🟡 प्राथमिकता ट्राइएज",
    "Review within 30-60 mins": "३०-६० मिनट के भीतर समीक्षा",
    "🟢 Routine OPD Cases": "🟢 सामान्य ओपीडी मामले",
    "Standard consultation queue": "मानक परामर्श कतार",
    "All Patients (28)": "सभी मरीज (२८)",
    "🔴 Urgent (3)": "🔴 अति आवश्यक (३)",
    "🟡 Priority (8)": "🟡 प्राथमिकता (८)",
    "🟢 Routine (17)": "🟢 सामान्य (१७)",
    "Primary Health Centre Triage Console": "प्राथमिक स्वास्थ्य केंद्र ट्राइएज कंसोल",
    "Sharda PHC Ward 4 • Station: Sister Priya (ANM)": "शारदा पीएचसी वार्ड ४ • स्टेशन: सिस्टर प्रिया (एएनएम)",
    "All Patients": "सभी मरीज",
    "Urgent (Red)": "अति आवश्यक (लाल)",
    "Priority (Yellow)": "प्राथमिकता (पीला)",
    "Routine (Green)": "सामान्य (हरा)",
    "Sync Queue with ABDM Registry": "एबीडीएम रजिस्ट्री के साथ कतार सिंक करें",
    "Active Triage Waiting Queue (32 In Facility)": "सक्रिय ट्राइएज प्रतीक्षा कतार (सुविधा में ३२)",
    "Wait Time:": "प्रतीक्षा समय:",
    "mins": "मिनट",
    "Open Case Review": "मामला समीक्षा खोलें",
    "Quick Clear Routine Case": "सामान्य मामला तुरंत क्लियर करें",
    "CLINICAL EVALUATION & DECISION": "क्लिनिकल मूल्यांकन और निर्णय",
    "Case Review: Sunita Devi (P-1042)": "मामला समीक्षा: सुनीता देवी (P-1042)",
    "Sister Priya • Human-in-the-Loop Clinical Verification": "सिस्टर प्रिया • मानव-पर्यवेक्षित क्लिनिकल सत्यापन",
    "← Return to Queue": "← कतार पर लौटें",
    "🤖 AI-GENERATED TRIAGE SUMMARY": "🤖 एआई-जनरेटेड ट्राइएज सारांश",
    "Calculated Urgency: HIGH 🔴": "परिकलित तात्कालिकता: उच्च 🔴",
    "Reported Symptoms:": "रिपोर्ट किए गए लक्षण:",
    "• Fever with chills (acute onset, 24 hours)": "• ठंड के साथ बुखार (तीव्र शुरुआत, २४ घंटे)",
    "• Severe throbbing headache, light sensitive": "• तेज धड़कता हुआ सिरदर्द, प्रकाश संवेदनशीलता",
    "• Generalized fatigue & body ache": "• सामान्य थकान और बदन दर्द",
    "📄 Blood Report (CBC)": "📄 रक्त रिपोर्ट (सीबीसी)",
    "Hb 11.2 | TLC 8.2k | Plt 2.1L": "हीमोग्लोबिन ११.२ | टीएलसी ८.२k | प्लेटलेट्स २.१ लाख",
    "✓ Temp: 102.4°F verified": "✓ तापमान: १०२.४°F सत्यापित",
    "✓ Paracetamol 650mg logged": "✓ पैरासिटामोल ६५० मिलीग्राम दर्ज",
    "👩⚕️ Healthcare Worker Final Decision": "👩⚕️ स्वास्थ्य कार्यकर्ता का अंतिम निर्णय",
    "Human clinical judgment overrides or confirms the AI suggestion:": "मानव क्लिनिकल निर्णय एआई सुझाव की पुष्टि या संशोधन करता है:",
    "🟢 Routine": "🟢 सामान्य",
    "Stable vitals, can wait in general OPD queue": "स्थिर महत्वपूर्ण संकेत, सामान्य ओपीडी कतार में प्रतीक्षा कर सकते हैं",
    "🟡 Priority": "🟡 प्राथमिकता",
    "Prompt assessment within 30 min; symptomatic relief": "३० मिनट के भीतर त्वरित मूल्यांकन; लक्षणात्मक राहत",
    "🔴 Urgent": "🔴 अति आवश्यक",
    "Immediate duty medical officer attention": "ड्यूटी चिकित्सा अधिकारी का तत्काल ध्यान आवश्यक",
    "Sister Priya's Clinical Notes:": "सिस्टर प्रिया के क्लिनिकल नोट्स:",
    "Patient visibly flushed and shivering. SpO2 98%, referred to Dr. Ananya Roy for acute febrile workup.": "मरीज स्पष्ट रूप से लाल और कंपकंपी से ग्रस्त है। SpO2 98%, तीव्र बुखार की जांच के लिए डॉ. अनन्या रॉय को संदर्भित किया गया।",
    "+ Vitals Normal": "+ महत्वपूर्ण संकेत सामान्य",
    "+ Order Rapid Kit": "+ रैपिड किट ऑर्डर करें",
    "Refer to Doctor / Specialist →": "डॉक्टर / विशेषज्ञ को रेफर करें →",
    "Send to General OPD": "सामान्य ओपीडी में भेजें",
    "Clinical Decision Review & Supervision": "क्लिनिकल निर्णय समीक्षा और पर्यवेक्षण",
    "Human-in-the-Loop Supervision for Patient P-1042": "मरीज P-1042 के लिए मानव-पर्यवेक्षित समीक्षा",
    "Patient Audio Playback & Original Transcript": "मरीज का ऑडियो प्लेबैक और मूल प्रतिलिपि",
    "Play Audio (Odia Voice Memo)": "ऑडियो चलाएं (ओडिया वॉयस मेमो)",
    "Pause": "रोकें",
    "Replay": "पुनः चलाएं",
    "AI Suggested Protocol & Triage Level": "एआई द्वारा सुझाया गया प्रोटोकॉल और ट्राइएज स्तर",
    "Urgency: PRIORITY (YELLOW)": "तात्कालिकता: प्राथमिकता (पीला)",
    "Confidence: 94.6%": "विश्वसनीयता: ९४.६%",
    "Human Healthcare Worker Override Decision": "स्वास्थ्य कार्यकर्ता का अधिभावी (ओवरराइड) निर्णय",
    "Agree with AI Protocol": "एआई प्रोटोकॉल से सहमत",
    "Modify Triage Category": "ट्राइएज श्रेणी संशोधित करें",
    "Escalate / Upgrade to Medical Officer (Red)": "चिकित्सा अधिकारी को अग्रेषित करें (लाल)",
    "Staff Nurse Clinical Remarks & Prescription Notes": "स्टाफ नर्स क्लिनिकल टिप्पणियां और पर्ची नोट",
    "Add clinical note or prescription instructions...": "क्लिनिकल नोट या दवा निर्देश जोड़ें...",
    "Save Clinical Sign-Off & Dispatch Referral": "क्लिनिकल साइन-ऑफ सुरक्षित करें और रेफरल भेजें",
    "Route to General OPD Queue": "सामान्य ओपीडी कतार में भेजें",
    "REFERRAL HANDOVER": "रेफरल सुपुर्दगी",
    "Patient: Sunita Devi (P-1042)": "मरीज: सुनीता देवी (P-1042)",
    "42 Y • Female • Sharda PHC Navrangpura": "४२ वर्ष • महिला • शारदा पीएचसी नवरंगपुरा",
    "SLA: Immediate": "एसएलए: तत्काल",
    "Reason for Referral:": "रेफरल का कारण:",
    "Acute febrile illness with persistent throbbing cephalea and fever (102.4°F). CBC platelets normal (2.1L) but requires duty doctor evaluation for vector-borne screening (Dengue/Malaria).": "लगातार धड़कते सिरदर्द और बुखार (१०२.४°F) के साथ तीव्र बुखार की बीमारी। सीबीसी प्लेटलेट्स सामान्य (२.१ लाख) हैं लेकिन वेक्टर जनित जांच (डेंगू/मलेरिया) के लिए ड्यूटी डॉक्टर के मूल्यांकन की आवश्यकता है।",
    "Attached Artifacts:": "संलग्न दस्तावेज:",
    "✓ Complete Blood Count (CBC_1042_0925.pdf)": "✓ कम्प्लीट ब्लड काउंट (CBC_1042_0925.pdf)",
    "✓ ELARA AI Triage Summary & Urgency Score": "✓ एलारा एआई ट्राइएज सारांश और तात्कालिकता स्कोर",
    "✓ Patient Audio Transcript (Hindi Speech-to-Text)": "✓ मरीज का ऑडियो प्रतिलेख (हिन्दी वाणी-से-पाठ)",
    "✓ Vitals Sheet (Temp: 102.4°F, SpO2: 98%)": "✓ महत्वपूर्ण संकेत पत्र (तापमान: 102.4°F, SpO2: 98%)",
    "Refer to Department / Specialist:": "विभाग / विशेषज्ञ को रेफर करें:",
    "👨⚕️ Duty Medical Officer: Dr. Ananya Roy (Room 104)": "👨⚕️ ड्यूटी चिकित्सा अधिकारी: डॉ. अनन्या रॉय (कमरा १०४)",
    "🩺 Internal Medicine Specialist (District Hospital)": "🩺 इंटरनल मेडिसिन विशेषज्ञ (जिला अस्पताल)",
    "🦟 Infectious Disease / Fever Clinic": "🦟 संक्रामक रोग / बुखार क्लिनिक",
    "Send Referral 📨": "रेफरल भेजें 📨",
    "Generates ABDM compliant digital token #REF-8821 with SMS alert": "एसएमएस अलर्ट के साथ आयुष्मान भारत (ABDM) डिजिटल टोकन #REF-8821 तैयार करता है",
    "Specialist Referral & Transport Dispatch": "विशेषज्ञ रेफरल और एम्बुलेंस प्रेषण",
    "Emergency Handoff to Secondary/Tertiary Centre": "द्वितीयक/तृतीयक स्वास्थ्य केंद्र को आपातकालीन सुपुर्दगी",
    "Receiving Facility:": "प्राप्तकर्ता स्वास्थ्य सुविधा:",
    "Kendrapara District Headquarters Hospital (DHH)": "केन्द्रपड़ा जिला मुख्यालय अस्पताल (DHH)",
    "Transport Mode:": "परिवहन साधन:",
    "108 Advanced Life Support (ALS) Ambulance": "१०८ एडवांस लाइफ सपोर्ट (ALS) एम्बुलेंस",
    "Assigned Medical Officer:": "नियुक्त चिकित्सा अधिकारी:",
    "Dr. Sanjeev Mohapatra, MD (Internal Medicine)": "डॉ. संजीव महापात्रा, एमडी (इंटरनल मेडिसिन)",
    "Referral Slip & Token:": "रेफरल पर्ची और टोकन:",
    "Dispatch Referral Slip": "रेफरल पर्ची जारी करें",
    "Book 108 Transport Ambulance": "१०८ परिवहन एम्बुलेंस बुक करें",
    "Print Emergency Referral Record": "आपातकालीन रेफरल रिकॉर्ड प्रिंट करें",
    "🏥 FACILITY INCHARGE CONSOLE": "🏥 सुविधा प्रभारी कंसोल",
    "Sharda PHC Triage Analytics & Surveillance": "शारदा पीएचसी ट्राइएज विश्लेषण और निगरानी",
    "Dr. Ananya Roy • Medical Officer Incharge": "डॉ. अनन्या रॉय • चिकित्सा अधिकारी प्रभारी",
    "Export ABDM Report": "एबीडीएम रिपोर्ट निर्यात करें",
    "Today's Total Cases": "आज के कुल मामले",
    "+18% vs yesterday": "कल की तुलना में +१८%",
    "Average Review Time": "औसत समीक्षा समय",
    "8 min": "८ मिनट",
    "Target &lt; 10 min ⚡": "लक्ष्य < १० मिनट ⚡",
    "AI-Clinician Concordance": "एआई-चिकित्सक संगति",
    "117 / 128 matched": "११७ / १२८ मेल खाए",
    "Active Triage Desks": "सक्रिय ट्राइएज डेस्क",
    "4 Desks": "४ डेस्क",
    "Sister Priya & Duty MO": "सिस्टर प्रिया और ड्यूटी चिकित्सा अधिकारी",
    "Triage Urgency Breakdown (128 Cases)": "ट्राइएज तात्कालिकता विवरण (१२८ मामले)",
    "Today": "आज",
    "🔴 Urgent Review": "🔴 अति आवश्यक समीक्षा",
    "12 cases (9.4%)": "१२ मामले (९.४%)",
    "36 cases (28.1%)": "३६ मामले (२८.१%)",
    "🟢 Routine Consultation": "🟢 सामान्य परामर्श",
    "80 cases (62.5%)": "८० मामले (६२.५%)",
    "Languages Used in Triage Intake": "ट्राइएज इनटेक में प्रयुक्त भाषाएं",
    "Hindi (हिन्दी)": "हिन्दी (हिन्दी)",
    "Odia (ଓଡ଼ିଆ)": "ओडिया (ଓଡ଼ିଆ)",
    "Facility Epidemiological Surveillance Dashboard": "सुविधा महामारी विज्ञान निगरानी डैशबोर्ड",
    "Sharda Block PHC & District Health Registry Telemetry": "शारदा ब्लॉक पीएचसी और जिला स्वास्थ्य रजिस्ट्री टेलीमेट्री",
    "Concordance Rate": "ट्राइएज संगति दर",
    "AI vs Doctor Concordance: 91.8%": "एआई बनाम डॉक्टर संगति: ९१.८%",
    "Total Patients Screened Today: 128": "आज जांचे गए कुल मरीज: १२८",
    "Emergency Referrals Dispatched: 14": "भेजे गए आपातकालीन रेफरल: १४",
    "Disease Incidence Heatmap (Block-Level)": "रोग प्रकोप हीटमैप (ब्लॉक स्तर)",
    "Suspected Dengue / Viral Hemorrhagic: 34% (Rising)": "संदिग्ध डेंगू / वायरल रक्तस्राव: ३४% (बढ़ रहा है)",
    "Acute Upper Respiratory Infection: 42% (Normal)": "तीव्र ऊपरी श्वसन संक्रमण: ४२% (सामान्य)",
    "Acute Gastroenteritis: 18% (Stable)": "तीव्र गैस्ट्रोएंटेराइटिस: १८% (स्थिर)",
    "Essential Drug Stock & Shortage Forecast": "आवश्यक दवा भंडार और कमी का पूर्वानुमान",
    "Paracetamol 650mg: 4,200 tablets (Sufficient for 14 days)": "पैरासिटामोल ६५० मिलीग्राम: ४,२०० गोलियां (१४ दिनों के लिए पर्याप्त)",
    "IV Normal Saline 0.9%: 140 bottles (CRITICAL: 2 days left)": "आईवी नॉर्मल सलाइन ०.९%: १४० बोतलें (गंभीर: २ दिन शेष)",
    "ORS Sachets: 850 packets (Sufficient for 21 days)": "ओआरएस पैकेट: ८५० पैकेट (२१ दिनों के लिए पर्याप्त)",
    "Amoxicillin 500mg: 620 capsules (Sufficient for 9 days)": "एमोक्सिसिलिन ५०० मिलीग्राम: ६२० कैप्सूल (९ दिनों के लिए पर्याप्त)",
    "Export ABDM FHIR Triage Audit Report": "एबीडीएम एफएचआईआर ट्राइएज ऑडिट रिपोर्ट निर्यात करें",
    "Sync Telemetry with State Health Directorate": "राज्य स्वास्थ्य निदेशालय के साथ टेलीमेट्री सिंक करें",
    "UNIVERSAL SEARCH": "सार्वभौमिक खोज",
    "Health Portal & Clinical Lookup": "स्वास्थ्य पोर्टल और क्लिनिकल खोज",
    "Search Jan Aushadhi medicines, symptoms, clinics, or active prescription orders": "जन औषधि दवाएं, लक्षण, क्लिनिक या सक्रिय पर्ची ऑर्डर खोजें",
    "Search medicines, symptoms, clinics, or orders...": "दवाइयां, लक्षण, क्लिनिक या ऑर्डर खोजें...",
    "Search medicines (e.g. Paracetamol), symptoms, clinics, or orders...": "दवाइयां (उदा. पैरासिटामोल), लक्षण, क्लिनिक या ऑर्डर खोजें...",
    "Search medicines or salts...": "दवाइयां या घटक खोजें...",
    "Filter:": "फ़िल्टर:",
    "All": "सभी",
    "Medicines": "दवाएं",
    "Symptoms": "लक्षण",
    "Orders": "ऑर्डर",
    "Suggested:": "सुझाए गए:",
    "💊 Paracetamol 650mg": "💊 पैरासिटामोल ६५० मिलीग्राम",
    "💧 ORS Electrolyte": "💧 ओआरएस इलेक्ट्रोलाइट",
    "🌡️ High Fever": "🌡️ तेज बुखार",
    "💊 Amoxicillin": "💊 एमोक्सिसिलिन",
    "📦 Order #ORD-7821": "📦 ऑर्डर #ORD-7821",
    "PRADHAN MANTRI BHARTIYA JANAUSHADHI PARIYOJANA (PMBJP)": "प्रधानमंत्री भारतीय जनऔषधि परियोजना (पीएमबीजेपी)",
    "PM Jan Aushadhi Generic Pharmacy": "प्रधानमंत्री जन औषधि जेनेरिक फार्मेसी",
    "Jan Aushadhi Generic Pharmacy": "जन औषधि जेनेरिक फार्मेसी",
    "High-quality generic medicines at 50% to 90% savings compared to branded commercial formulations.": "ब्रांडेड व्यावसायिक दवाओं की तुलना में ५०% से ९०% बचत पर उच्च गुणवत्ता वाली जेनेरिक दवाएं।",
    "Pradhan Mantri Bhartiya Janaushadhi Pariyojana • Genuine Generics": "प्रधानमंत्री भारतीय जनऔषधि परियोजना • प्रामाणिक जेनेरिक दवाएं",
    "View Cart": "कार्ट देखें",
    "Track Order": "ऑर्डर ट्रैक करें",
    "Emergency Kits": "आपातकालीन किट",
    "All Categories": "सभी श्रेणियां",
    "Fever & Pain": "बुखार और दर्द",
    "Antibiotics": "एंटीबायोटिक्स",
    "Diabetes & BP": "मधुमेह और रक्तचाप",
    "Emergency & First Aid": "आपातकालीन और प्राथमिक उपचार",
    "PMBJP Generic": "पीएमबीजेपी जेनरिक",
    "PMBJP Verified Generic": "पीएमबीजेपी सत्यापित जेनेरिक",
    "Jan Aushadhi Medicine": "जन औषधि दवा",
    "Generic Composition": "जेनेरिक संयोजन",
    "Jan Aushadhi Price": "जन औषधि मूल्य",
    "68% Savings": "६८% बचत",
    "Therapeutic Uses:": "उपचारात्मक उपयोग:",
    "Standard Adult Dosage:": "मानक वयस्क खुराक:",
    "Manufacturer & Supply Kendra:": "निर्माता और आपूर्ति केंद्र:",
    "Add to Jan Aushadhi Cart": "जन औषधि कार्ट में जोड़ें",
    "Jan Aushadhi Prescription Cart": "जन औषधि पर्ची कार्ट",
    "Subtotal (Jan Aushadhi MRP):": "उप-योग (जन औषधि एमआरपी):",
    "Branded Commercial Equivalent:": "ब्रांडेड व्यावसायिक समतुल्य:",
    "Your Total Savings:": "आपकी कुल बचत:",
    "Delivery Charges:": "डिलीवरी शुल्क:",
    "FREE PMBJP Express": "मुफ़्त पीएमबीजेपी एक्सप्रेस",
    "Continue Shopping": "खरीदारी जारी रखें",
    "Jan Aushadhi Order Checkout": "जन औषधि ऑर्डर चेकआउट",
    "Recipient Full Name *": "प्राप्तकर्ता का पूरा नाम *",
    "Delivery Address & Ward *": "डिलीवरी का पता और वार्ड *",
    "Payment Method": "भुगतान का तरीका",
    "Cash on Delivery": "कैश ऑन डिलीवरी",
    "Ayushman Card": "आयुष्मान कार्ड",
    "UPI / QR": "यूपीआई / क्यूआर",
    "Total Payable": "कुल देय राशि",
    "Confirm & Place Order": "पुष्टि करें और ऑर्डर दें",
    "OFF": "छूट",
    "% OFF": "% छूट",
    "Uses:": "उपयोग:",
    "Add": "जोड़ें",
    "Add to Cart": "कार्ट में जोड़ें",
    "View Details": "विवरण देखें",
    "View Medicine Details": "दवा विवरण देखें",
    "Strip of 10 Tablets": "१० गोलियों की पट्टी",
    "Strip of 10 Capsules": "१० कैप्सूल की पट्टी",
    "Strip of 3 Tablets": "३ गोलियों की पट्टी",
    "21.8g Sachet for 1 Litre Water": "१ लीटर पानी के लिए २१.८ ग्राम का पाउच",
    "In Stock": "उपलब्ध",
    "Out of Stock": "अनुपलब्ध",
    "Your Cart": "आपकी कार्ट",
    "Your cart is empty": "आपकी कार्ट खाली है",
    "Browse Jan Aushadhi Medicines": "जन औषधि दवाएं देखें",
    "Subtotal:": "उप-योग:",
    "Commercial MRP Value:": "व्यावसायिक एमआरपी मूल्य:",
    "Total Generic Savings:": "कुल जेनेरिक बचत:",
    "Delivery Fee:": "डिलीवरी शुल्क:",
    "FREE (PMBJP Rural Initiative)": "मुफ़्त (पीएमबीजेपी ग्रामीण पहल)",
    "Total Payable:": "कुल देय राशि:",
    "Proceed to Checkout": "चेकआउट के लिए आगे बढ़ें",
    "Checkout & Order Placement": "चेकआउट और ऑर्डर प्रेषण",
    "Delivery Recipient:": "प्राप्तकर्ता:",
    "Delivery Address:": "डिलीवरी का पता:",
    "Phone Number:": "फ़ोन नंबर:",
    "Cash on Delivery (Jan Aushadhi Partner)": "कैश ऑन डिलीवरी (जन औषधि भागीदार)",
    "ABHA Health Wallet / UPI": "आभा हेल्थ वॉलेट / यूपीआई",
    "Place Order & Dispatch": "ऑर्डर दें और प्रेषित करें",
    "Track Active Order:": "सक्रिय ऑर्डर ट्रैक करें:",
    "Order Placed": "ऑर्डर दिया गया",
    "Packed at Jan Aushadhi Kendra": "जन औषधि केंद्र पर पैक हुआ",
    "Out for Delivery": "डिलीवरी के लिए निकल चुका है",
    "Delivered to Patient": "मरीज को डिलीवर किया गया",
    "Delivery Partner:": "डिलीवरी पार्टनर:",
    "Contact Rider:": "राइडर से संपर्क करें:",
    "Call Rider": "राइडर को कॉल करें",
    "Estimated Arrival:": "अनुमानित आगमन:",
    "Order placed with Kendrapara Jan Aushadhi Kendra #7821": "केन्द्रपड़ा जन औषधि केंद्र #7821 में ऑर्डर दर्ज हुआ",
    "Rider assigned: Rajesh Mohanty (Bike OD-05-AB-1928)": "राइडर नियुक्त: राजेश मोहंती (बाइक OD-05-AB-1928)",
    "Package is out for express delivery to Sharda Ward 4": "पैकेज शारदा वार्ड ४ के लिए एक्सप्रेस डिलीवरी पर निकला है",
    "Delivered successfully to Sunita Devi (Signed & Verified)": "सुनीता देवी को सफलतापूर्वक डिलीवर किया गया (हस्ताक्षरित एवं सत्यापित)",
    "PRESCRIPTION ORDER TRACKING": "पर्ची ऑर्डर ट्रैकिंग",
    "Live Delivery Telemetry": "लाइव डिलीवरी टेलीमेट्री",
    "Pradhan Mantri Bhartiya Janaushadhi Express Kendrapara Network": "प्रधानमंत्री भारतीय जनऔषधि एक्सप्रेस केन्द्रपड़ा नेटवर्क",
    "← Jan Aushadhi Pharmacy": "← जन औषधि फार्मेसी",
    "Active Order": "सक्रिय ऑर्डर",
    "ORD-7821": "ऑर्डर-7821",
    "Placed on": "ऑर्डर दिनांक",
    "Today, 07:45 AM": "आज, प्रातः ०७:४५",
    "Estimated Arrival": "अनुमानित आगमन",
    "15-20 mins": "१५-२० मिनट",
    "Out for Delivery (Rider nearby)": "डिलीवरी के लिए निकला (राइडर निकट है)",
    "Delivery Milestone Progress": "डिलीवरी प्रगति चरण",
    "1. Order Confirmed": "१. ऑर्डर की पुष्टि हुई",
    "07:45 AM": "प्रातः ०७:४५",
    "2. Packed at Kendra": "२. केंद्र पर पैक हुआ",
    "08:05 AM": "प्रातः ०८:०५",
    "3. Out for Delivery": "३. डिलीवरी के लिए निकला",
    "In Transit": "मार्ग में",
    "4. Delivered": "४. डिलीवर हो गया",
    "Pending": "लंबित",
    "Assigned Delivery Rider": "नियुक्त डिलीवरी राइडर",
    "PMBJP Express": "पीएमबीजेपी एक्सप्रेस",
    "Bikram Mohanty": "बिक्रम मोहंती",
    "Jan Aushadhi Express #OD-05-9921": "जन औषधि एक्सप्रेस #OD-05-9921",
    "Near Navrangpura PHC Gate 2": "नवरंगपुरा पीएचसी गेट २ के पास",
    "Call Rider (+91 94370-11223)": "राइडर को कॉल करें (+91 94370-11223)",
    "Order Items & Bill": "ऑर्डर की गई वस्तुएं और बिल",
    "Delivery Charge:": "डिलीवरी शुल्क:",
    "FREE (PMBJP Pariyojana)": "मुफ़्त (पीएमबीजेपी परियोजना)",
    "Jan Aushadhi Paracetamol 650mg": "जन औषधि पैरासिटामोल ६५० मिलीग्राम",
    "Paracetamol IP 650mg": "पैरासिटामोल आईपी ६५० मिलीग्राम",
    "Fever, Headache, Mild-to-moderate Body Pain": "बुखार, सिरदर्द, हल्का से मध्यम शरीर दर्द",
    "1 tablet every 6-8 hours after food as directed by physician": "चिकित्सक के निर्देशानुसार भोजन के बाद प्रत्येक ६-८ घंटे में १ गोली",
    "Jan Aushadhi Amoxicillin 500mg": "जन औषधि एमोक्सिसिलिन ५०० मिलीग्राम",
    "Amoxicillin Trihydrate IP 500mg": "एमोक्सिसिलिन ट्राइहाइड्रेट आईपी ५०० मिलीग्राम",
    "Bacterial respiratory, ear, throat & dental infections": "जीवाणु श्वसन, कान, गले और दांतों के संक्रमण",
    "Take complete course strictly as advised by medical officer": "चिकित्सा अधिकारी की सलाह के अनुसार पूरा कोर्स अवश्य पूरा करें",
    "Jan Aushadhi Metformin 500mg": "जन औषधि मेटफॉर्मिन ५०० मिलीग्राम",
    "Metformin Hydrochloride IP 500mg": "मेटफॉर्मिन हाइड्रोक्लोराइड आईपी ५०० मिलीग्राम",
    "Type 2 Diabetes Mellitus glycemic control": "टाइप २ मधुमेह में रक्त शर्करा नियंत्रण",
    "1 tablet twice daily with meals": "भोजन के साथ दिन में दो बार १ गोली",
    "Jan Aushadhi Azithromycin 500mg": "जन औषधि एज़िथ्रोमाइसिन ५०० मिलीग्राम",
    "Azithromycin IP 500mg": "एज़िथ्रोमाइसिन आईपी ५०० मिलीग्राम",
    "Upper & lower respiratory tract infections": "ऊपरी और निचले श्वसन तंत्र के संक्रमण",
    "1 tablet once daily 1 hr before or 2 hrs after meal for 3 days": "३ दिनों के लिए भोजन से १ घंटा पहले या २ घंटे बाद दिन में एक बार १ गोली",
    "Jan Aushadhi ORS Electrolyte (WHO Formula)": "जन औषधि ओआरएस इलेक्ट्रोलाइट (डब्ल्यूएचओ फॉर्मूला)",
    "Oral Rehydration Salts IP (WHO Standard)": "ओरल रिहाइड्रेशन साल्ट्स आईपी (डब्ल्यूएचओ मानक)",
    "Acute dehydration, diarrhea, heat stroke & gastroenteritis": "गंभीर निर्जलीकरण, दस्त, लू लगना और गैस्ट्रोएंटेराइटिस",
    "Dissolve entire sachet in 1 Litre boiled & cooled drinking water": "पूरे पाउच को १ लीटर उबले और ठंडे किए गए पीने के पानी में घोलें",
    "Jan Aushadhi Cetirizine 10mg": "जन औषधि सेटिरिज़िन १० मिलीग्राम",
    "Cetirizine Hydrochloride IP 10mg": "सेटिरिज़िन हाइड्रोक्लोराइड आईपी १० मिलीग्राम",
    "Allergic rhinitis, cold sneezing, skin urticaria & itching": "एलर्जी राइनाइटिस, सर्दी-जुकाम में छींकें, त्वचा पर पित्ती और खुजली",
    "1 tablet at bedtime": "सोते समय १ गोली",
    "Jan Aushadhi Amlodipine 5mg": "जन औषधि एम्लोडिपिन ५ मिलीग्राम",
    "Amlodipine Besylate IP 5mg": "एम्लोडिपिन बेसिलेट आईपी ५ मिलीग्राम",
    "Essential Hypertension, Angina Pectoris": "उच्च रक्तचाप (बीपी), एनजाइना पेक्टोरिस",
    "1 tablet daily in the morning with water": "सुबह पानी के साथ रोजाना १ गोली",
    "Essential hypertension & coronary artery disease prophylaxis": "आवश्यक उच्च रक्तचाप और कोरोनरी धमनी रोग रोकथाम",
    "1 tablet daily at fixed time in morning": "सुबह निश्चित समय पर रोजाना १ गोली",
    "Jan Aushadhi Pantoprazole 40mg": "जन औषधि पैंटोप्राजोल ४० मिलीग्राम",
    "Pantoprazole Sodium Gastro-resistant IP 40mg": "पैंटोप्राजोल सोडियम गैस्ट्रो-प्रतिरोधी आईपी ४० मिलीग्राम",
    "GERD, Acidity, Gastric & Duodenal Ulcers": "एसिडिटी, सीने में जलन, गैस्ट्रिक और ग्रहणी संबंधी अल्सर",
    "GERD, gastric acidity, peptic ulcer & NSAID-induced dyspepsia": "जीईआरडी, गैस्ट्रिक एसिडिटी, पेप्टिक अल्सर और दर्द निवारक दवाओं से होने वाली अपच",
    "1 tablet once daily 30 minutes before breakfast": "नाश्ते से ३० मिनट पहले दिन में एक बार १ गोली",
    "1 tablet daily empty stomach 30 mins before breakfast": "नाश्ते से ३० मिनट पहले खाली पेट रोजाना १ गोली",
    "Jan Aushadhi Ciprofloxacin Eye/Ear Drops 0.3%": "जन औषधि सिप्रोफ्लोक्सासिन आई/ईयर ड्रॉप्स ०.३%",
    "Ciprofloxacin 0.3% w/v Sterile Solution": "सिप्रोफ्लोक्सासिन ०.३% बाँझ घोल",
    "Bacterial conjunctivitis, eye redness, outer ear infection": "आंख आना, आंख का लाल होना, बाहरी कान का संक्रमण",
    "1-2 drops in affected eye/ear every 4 hours for 7 days": "७ दिनों तक प्रत्येक ४ घंटे में प्रभावित आंख/कान में १-२ बूंदें",
    "Jan Aushadhi Dextromethorphan Cough Syrup 100ml": "जन औषधि डेक्सट्रोमेथोर्फन कफ सिरप १०० मिली",
    "Dextromethorphan HBr 10mg / 5ml Syrup": "डेक्सट्रोमेथोर्फन एचबीआर १० मिलीग्राम / ५ मिली सिरप",
    "Dry irritating non-productive cough, throat tickle": "सूखी खांसी, गले में खराश और जलन",
    "5-10 ml twice or thrice daily after food": "भोजन के बाद दिन में दो या तीन बार ५-१० मिली",
    "Jan Aushadhi Diclofenac Gel 30g": "जन औषधि डाइक्लोफेनाक जेल ३० ग्राम",
    "Diclofenac Diethylamine 1.16% w/w Topical Gel": "डाइक्लोफेनाक डायथाइलैमाइन १.१६% जेल",
    "Joint sprains, muscular strains, arthritis, neck/back pain": "जोड़ों में मोच, मांसपेशियों में खिंचाव, गठिया, गर्दन/पीठ दर्द",
    "Apply gently over affected area 3-4 times daily. Do not rub vigorously.": "प्रभावित क्षेत्र पर दिन में ३-४ बार धीरे से लगाएं। जोर से न रगड़ें।",
    "Jan Aushadhi Zinc Sulfate 20mg": "जन औषधि जिंक सल्फेट २० मिलीग्राम",
    "Dispersible Zinc Sulfate Tablets IP 20mg": "घुलनशील जिंक सल्फेट गोलियां आईपी २० मिलीग्राम",
    "Pediatric diarrhea adjunct with ORS, immunity booster": "ओआरएस के साथ बाल दस्त उपचार, रोग प्रतिरोधक क्षमता वर्धक",
    "1 tablet dissolved in 5ml water/milk daily for 14 days": "१४ दिनों तक रोजाना ५ मिली पानी/दूध में १ गोली घोलकर लें",
    "Jan Aushadhi Chewable Vitamin C & Zinc": "जन औषधि चबाने योग्य विटामिन सी और जिंक",
    "Ascorbic Acid 500mg + Zinc Sulphate 5mg": "एस्कॉर्बिक एसिड ५०० मिलीग्राम + जिंक सल्फेट ५ मिलीग्राम",
    "Strip of 15 Chewable Tablets (Orange Flavor)": "१५ चबाने योग्य गोलियों की पट्टी (संतरा स्वाद)",
    "Immunity support, post-viral convalescence & tissue recovery": "रोग प्रतिरोधक क्षमता, वायरल के बाद सुधार और ऊतक स्वास्थ्य",
    "1 tablet chewed daily after breakfast": "नाश्ते के बाद रोजाना १ गोली चबाकर लें",
    "Jan Aushadhi First-Aid & Trauma Kit": "जन औषधि प्राथमिक चिकित्सा और ट्रॉमा किट",
    "Povidone Iodine 5% + Cotton + Gauze Bandage + Micropore Tape": "पोविडोन आयोडीन ५% + रुई + जालीदार पट्टी + माइक्रोप्रोर टेप",
    "Emergency Field Dressing Pack": "आपातकालीन फील्ड ड्रेसिंग पैक",
    "Wound disinfection, laceration care, minor trauma & emergency bleeding": "घाव कीटाणुशोधन, कटने की देखभाल और आपातकालीन रक्तस्राव नियंत्रण",
    "Clean with antiseptic and apply sterile bandage with gentle pressure": "एंटीसेप्टिक से साफ करें और हल्के दबाव के साथ बाँझ पट्टी लगाएं",
    "Clear Search Filters": "खोज फ़िल्टर हटाएं",
    "Items in Cart": "कार्ट में वस्तुएं",
    "Shopping Cart": "शॉपिंग कार्ट",
    "Order History": "ऑर्डर इतिहास",
    "IDPL (PMBJP Certified PSU)": "आईडीपीएल (पीएमबीजेपी प्रमाणित पीएसयू)",
    "HAL (PMBJP Certified PSU)": "एचएएल (पीएमबीजेपी प्रमाणित पीएसयू)",
    "Karnataka Antibiotics (KAPL)": "कर्नाटक एंटीबायोटिक्स (केएपीएल)",
    "Bengal Chemicals & Pharmaceuticals": "बंगाल केमिकल्स एंड फार्मास्युटिकल्स",
    "BPPI PMBJP Approved Unit": "बीपीपीआई पीएमबीजेपी स्वीकृत इकाई",
    "HAL Healthcare Unit": "एचएएल हेल्थकेयर इकाई",
    "IDPL Healthcare": "आईडीपीएल हेल्थकेयर",
    "KAPL Pharma": "केएपीएल फार्मा",
    "PMBJP Surgical Supply Kendra": "पीएमबीजेपी सर्जिकल आपूर्ति केंद्र",
    "NATIONAL EMERGENCY HEALTHCARE SERVICE": "राष्ट्रीय आपातकालीन स्वास्थ्य सेवा",
    "Emergency Assistance (108 / 112)": "आपातकालीन सहायता (१०८ / ११२)",
    "Instant ambulance dispatch to Kendrapara Trauma Centre & PHC network": "केन्द्रपड़ा ट्रॉमा सेंटर और पीएचसी नेटवर्क के लिए त्वरित एम्बुलेंस प्रेषण",
    "Ambulance 108 Dispatched!": "एम्बुलेंस १०८ रवाना हो चुकी है!",
    "Unit #OD-05-EMERG-108 en route with paramedic team": "पैरामेडिक टीम के साथ एम्बुलेंस #OD-05-EMERG-108 मार्ग पर है",
    "Live ETA": "लाइव आगमन समय",
    "6 mins": "६ मिनट",
    "Cancel": "रद्द करें",
    "CRITICAL EMERGENCY PROTOCOL": "गंभीर आपातकालीन प्रोटोकॉल",
    "EMERGENCY SOS": "आपातकालीन एसओएस",
    "TAP TO DISPATCH 108": "१०८ रवाना करने के लिए टैप करें",
    "Pressing this button sounds the local emergency alert siren, transmits your GPS coordinates to Kendrapara District Hospital, and summons the nearest 108 ALS Ambulance.": "इस बटन को दबाने से स्थानीय आपातकालीन सायरन बजता है, आपके जीपीएस निर्देशांक केन्द्रपड़ा जिला अस्पताल को प्रेषित होते हैं और निकटतम १०८ एएलएस एम्बुलेंस बुलाई जाती है।",
    "Toggle Emergency Siren": "आपातकालीन सायरन चालू/बंद करें",
    "112 National Helpline": "११२ राष्ट्रीय हेल्पलाइन",
    "Your Live Location:": "आपका लाइव स्थान:",
    "Kendrapara Ward 4, Navrangpura, Odisha": "केन्द्रपड़ा वार्ड ४, नवरंगपुरा, ओडिशा",
    "GPS Active": "जीपीएस सक्रिय",
    "❤️ Chest Pain / Suspected Heart Attack": "❤️ सीने में दर्द / संदिग्ध दिल का दौरा",
    "Keep patient seated and calm. Loosen tight clothing around neck and waist. Do not offer food or heavy water. Administer Sorbitrate/Aspirin only if pre-prescribed by doctor.": "मरीज को बैठाकर शांत रखें। गर्दन और कमर के आसपास के तंग कपड़े ढीले करें। भोजन या भारी पानी न दें। सॉर्बिट्रेट/एस्पिरिन केवल तभी दें जब डॉक्टर द्वारा पहले से निर्धारित हो।",
    "🩸 Heavy Bleeding / Trauma": "🩸 अत्यधिक रक्तस्राव / गंभीर चोट",
    "Apply firm continuous pressure directly on wound using clean cloth or sterile gauze. Keep affected limb elevated above heart level if possible.": "साफ कपड़े या बाँझ जाली का उपयोग करके घाव पर सीधे लगातार दबाव डालें। यदि संभव हो तो प्रभावित अंग को दिल के स्तर से ऊपर उठाएं।",
    "🐍 Snake Bite Protocol": "🐍 सांप के काटने का प्रोटोकॉल",
    "Immobilize the bitten limb with a splint. Keep bite site at or below heart level. DO NOT apply tight tourniquets or cut the wound. Transport to PHC immediately for ASV.": "काटे गए अंग को स्थिर रखें। दंश स्थल को दिल के स्तर पर या उससे नीचे रखें। कसकर न बांधें और न ही घाव को काटें। एएसवी के लिए तुरंत पीएचसी ले जाएं।",
    "☀️ Heat Stroke & Dehydration": "☀️ लू लगना और निर्जलीकरण",
    "Move patient to cool shaded spot. Fan air and sponge skin with cool water. Sip Jan Aushadhi WHO-standard ORS solution slowly.": "मरीज को ठंडे छायादार स्थान पर ले जाएं। पंखा चलाएं और ठंडे पानी से त्वचा को स्पंज करें। जन औषधि डब्ल्यूएचओ-मानक ओआरएस का घोल धीरे-धीरे घूंट-घूंट पिलाएं।",
    "EMERGENCY 108 / 112 SOS DISPATCH": "आपातकालीन १०८ / ११२ एसओएस प्रेषण",
    "Immediate Emergency Response Console for Acute Crises": "गंभीर आपात स्थितियों के लिए त्वरित प्रतिक्रिया कंसोल",
    "HOLD FOR 2 SECONDS FOR EMERGENCY SOS": "आपातकालीन एसओएस के लिए २ सेकंड दबाकर रखें",
    "Ambulance Dispatched!": "एम्बुलेंस रवाना हो चुकी है!",
    "108 Ambulance Unit OD-05-G-4421 Dispatched": "१०८ एम्बुलेंस इकाई OD-05-G-4421 रवाना",
    "Driver: Rajesh Nayak • Contact: 98100-24156": "चालक: राजेश नायक • संपर्क: ९८१००-२४१५६",
    "Receiving Hospital: Kendrapara Sub-District Hospital Emergency ER": "प्राप्तकर्ता अस्पताल: केन्द्रपड़ा उप-जिला अस्पताल आपातकालीन कक्ष (ER)",
    "Estimated Arrival (ETA):": "अनुमानित आगमन समय (ETA):",
    "Your Live GPS Location:": "आपका लाइव जीपीएस स्थान:",
    "Toggle Siren Sound": "सायरन ध्वनि चालू/बंद करें",
    "Cancel SOS Request": "एसओएस अनुरोध रद्द करें",
    "Call 108 Ambulance Direct": "१०८ एम्बुलेंस को सीधे कॉल करें",
    "Call 112 National Emergency Helpline": "११२ राष्ट्रीय आपातकालीन हेल्पलाइन पर कॉल करें",
    "Emergency First Aid Quick Guides": "आपातकालीन प्राथमिक उपचार त्वरित मार्गदर्शिका",
    "Chest Pain / Heart Attack": "सीने में दर्द / दिल का दौरा",
    "Keep patient resting calmly in semi-seated position. Loosen tight clothing around neck and waist. Do NOT allow walking. Do NOT give water or heavy food.": "मरीज को शांत रखकर आधी बैठी स्थिति में आराम करने दें। गर्दन और कमर के आसपास के तंग कपड़े ढीले करें। चलने न दें। पानी या भारी भोजन न दें।",
    "Heavy Bleeding / Trauma": "अत्यधिक रक्तस्राव / गंभीर चोट",
    "Apply firm, continuous direct pressure with a clean cloth or bandage for at least 10 minutes without lifting. Elevate injured limb above heart level if no fracture.": "बिना उठाए कम से कम १० मिनट तक साफ कपड़े या पट्टी से सीधा लगातार दबाव डालें। यदि हड्डी टूटी न हो तो घायल अंग को दिल के स्तर से ऊपर उठाएं।",
    "Severe Burns": "गंभीर रूप से जलना",
    "Cool burn immediately with clean running tap water for 15-20 minutes. Do NOT apply ice, butter, or toothpaste. Cover loosely with sterile cloth.": "जले हुए हिस्से को तुरंत १५-२० मिनट तक साफ बहते पानी से ठंडा करें। बर्फ, मक्खन या टूथपेस्ट न लगाएं। साफ कपड़े से ढीला ढकें।",
    "Arrived at location!": "स्थान पर पहुंच गए!",
    "AYUSHMAN BHARAT DIGITAL MISSION": "आयुष्मान भारत डिजिटल मिशन",
    "Patient Profile & ABHA Card": "मरीज प्रोफ़ाइल और आभा कार्ड",
    "Manage patient demographics, ABHA health records, and emergency contact details": "मरीज की जनसांख्यिकी, आभा स्वास्थ्य रिकॉर्ड और आपातकालीन संपर्क विवरण प्रबंधित करें",
    "NATIONAL HEALTH AUTHORITY": "राष्ट्रीय स्वास्थ्य प्राधिकरण",
    "Ayushman Bharat Health Account (ABHA)": "आयुष्मान भारत स्वास्थ्य खाता (आभा - ABHA)",
    "✓ Verified via NDHM": "✓ एनडीएचएम द्वारा सत्यापित",
    "ABHA ID Number": "आभा (ABHA) आईडी संख्या",
    "ABHA Address (PHR)": "आभा (ABHA) पता (व्यक्तिगत स्वास्थ्य रिकॉर्ड)",
    "sunitadevi@abdm": "sunitadevi@abdm",
    "Gender": "लिंग",
    "Blood Group": "रक्त समूह",
    "B+": "बी+",
    "A+": "ए+",
    "O+": "ओ+",
    "AB+": "एबी+",
    "A-": "ए-",
    "B-": "बी-",
    "O-": "ओ-",
    "AB-": "एबी-",
    "Year of Birth": "जन्म वर्ष",
    "Scan at PHC OPD": "पीएचसी ओपीडी में स्कैन करें",
    "Edit Patient Demographics & Health Profile": "मरीज जनसांख्यिकी और स्वास्थ्य प्रोफ़ाइल संपादित करें",
    "10-Digit Mobile Number *": "१० अंकों का मोबाइल नंबर *",
    "Age": "आयु",
    "Residential Address & Village/Ward *": "निवास का पता और गांव/वार्ड *",
    "Pincode": "पिन कोड",
    "State": "राज्य",
    "Emergency Contact Mobile": "आपातकालीन संपर्क मोबाइल",
    "All updates are encrypted and synced to ABDM Health Registry": "सभी अपडेट एन्क्रिप्टेड हैं और एबीडीएम स्वास्थ्य रजिस्ट्री में सिंक होते हैं",
    "Patient Profile & ABDM Health Records": "मरीज प्रोफ़ाइल और एबीडीएम स्वास्थ्य रिकॉर्ड",
    "Official Ayushman Bharat Digital Mission (ABDM) Profile": "आधिकारिक आयुष्मान भारत डिजिटल मिशन (ABDM) प्रोफ़ाइल",
    "ABHA Health ID Number": "आभा (ABHA) स्वास्थ्य आईडी नंबर",
    "ABHA Address (PHR Handle)": "आभा पता (PHR हैंडल)",
    "Mobile Number": "मोबाइल नंबर",
    "Email Address": "ईमेल पता",
    "Date of Birth": "जन्म तिथि",
    "Residential Address": "निवास का पता",
    "PIN Code": "पिन कोड",
    "State / UT": "राज्य / केंद्र शासित प्रदेश",
    "Emergency Contact Person": "आपातकालीन संपर्क व्यक्ति",
    "Emergency Contact Phone": "आपातकालीन संपर्क फ़ोन",
    "Known Drug Allergies": "ज्ञात दवा एलर्जी",
    "Chronic Medical Conditions": "पुरानी / दीर्घकालिक बीमारियां",
    "Penicillin, Sulfa Drugs": "पेनिसिलिन, सल्फा दवाएं",
    "Hypertension (Controlled)": "उच्च रक्तचाप (नियंत्रित)",
    "Ramesh Devi (Brother)": "रमेश देवी (भाई)",
    "Female": "महिला",
    "Male": "पुरुष",
    "Other": "अन्य",
    "Odisha": "ओडिशा",
    "SYSTEM CONFIGURATION": "सिस्टम कॉन्फ़िगरेशन",
    "Configure multilingual localization, font scaling, high contrast, and notifications": "बहुभाषी स्थानीयकरण, फ़ॉन्ट स्केलिंग, उच्च कंट्रास्ट और सूचनाएं कॉन्फ़िगर करें",
    "Multilingual System (23 Languages)": "बहुभाषी प्रणाली (२३ भाषाएं)",
    "Instant full application language translation with automatic English fallback": "स्वचालित अंग्रेजी फॉलबैक के साथ तत्काल पूर्ण एप्लिकेशन भाषा अनुवाद",
    "Active: English": "सक्रिय: अंग्रेजी",
    "Active: हिन्दी": "सक्रिय: हिन्दी",
    "Accessibility & Visual Controls": "सुगमता और दृश्य नियंत्रण",
    "Font Size Adjustment": "फ़ॉन्ट आकार समायोजन",
    "Normal (100%)": "सामान्य (१००%)",
    "Large (115%)": "बड़ा (११५%)",
    "Enhance readability for visually impaired": "दृष्टिबाधित व्यक्तियों के लिए पठनीयता बढ़ाएं",
    "Toggle Mode": "मोड बदलें",
    "Voice Speech Playback Speed (TTS)": "आवाज प्लेबैक गति (टीटीएस)",
    "1.0x": "१.०x",
    "Test Voice": "आवाज का परीक्षण करें",
    "Alerts & Notifications": "अलर्ट और सूचनाएं",
    "SMS OPD Tokens & Prescriptions": "एसएमएस ओपीडी टोकन और पर्चियां",
    "Sent to registered mobile number": "पंजीकृत मोबाइल नंबर पर भेजा गया",
    "WhatsApp Order & Triage Updates": "व्हाट्सएप ऑर्डर और ट्राइएज अपडेट",
    "Instant Jan Aushadhi tracking receipts": "तत्काल जन औषधि ट्रैकिंग रसीदें",
    "ABDM Health Locker Automatic Sync": "एबीडीएम हेल्थ लॉकर स्वचालित सिंक",
    "Sync with Ayushman Bharat PHR": "आयुष्मान भारत पीएचआर के साथ सिंक करें",
    "Critical Siren & Audio Chimes": "गंभीर सायरन और ऑडियो ध्वनि",
    "Audible notification for urgent vitals": "गंभीर महत्वपूर्ण संकेतों के लिए श्रव्य सूचना",
    "Application Session & Memory": "एप्लिकेशन सत्र और मेमोरी",
    "Reset local browser state or sign out of active ABDM session": "स्थानीय ब्राउज़र स्थिति रीसेट करें या सक्रिय एबीडीएम सत्र से साइन आउट करें",
    "Reset App Cache": "ऐप कैश रीसेट करें",
    "Application Settings & Accessibility": "एप्लिकेशन सेटिंग्स और सुगमता",
    "Configure language, accessibility features, and ABDM sync": "भाषा, सुगमता सुविधाएं और एबीडीएम सिंक कॉन्फ़िगर करें",
    "Language & Dialect Selection": "भाषा और बोली का चयन",
    "Choose your preferred language (changes entire UI instantly):": "अपनी पसंदीदा भाषा चुनें (तुरंत पूरा इंटरफ़ेस बदल जाता है):",
    "Accessibility Preferences": "सुगमता प्राथमिकताएं",
    "Font Size Scaling": "फ़ॉन्ट आकार स्केलिंग",
    "Normal": "सामान्य",
    "Large": "बड़ा",
    "Extra Large": "अति बड़ा",
    "High Contrast Dark Mode": "उच्च कंट्रास्ट डार्क मोड",
    "Text-to-Speech Speed": "टेक्स्ट-टू-स्पीच गति",
    "Slow": "धीमी",
    "Fast": "तेज",
    "Notifications & Alerts": "सूचनाएं और अलर्ट",
    "Audible Sound Alerts": "ध्वनि चेतावनी अलर्ट",
    "SMS Notifications for Appointments": "अपॉइंटमेंट के लिए एसएमएस सूचनाएं",
    "WhatsApp Order Tracking Updates": "व्हाट्सएप ऑर्डर ट्रैकिंग अपडेट",
    "ABDM Health Locker Cloud Sync": "एबीडीएम हेल्थ लॉकर क्लाउड सिंक",
    "Save Preferences": "प्राथमिकताएं सुरक्षित करें",
    "Figma Workflow Storyboard (All Screens)": "फ़िग्मा वर्कफ़्लो स्टोरीबोर्ड (सभी स्क्रीन)",
    "Horizontal overview of all 11 screens side-by-side in the ELARA healthcare triage flow": "एलारा स्वास्थ्य सेवा ट्राइएज प्रवाह में सभी ११ स्क्रीनों का क्षैतिज अवलोकन",
    "Zoom +": "बड़ा करें +",
    "Zoom -": "छोटा करें -",
    "1. Home / Splash": "१. होम / स्प्लैश",
    "2. Role Selection & Login": "२. भूमिका चयन और लॉगिन",
    "3. Patient Home & Banner": "३. मरीज होम और बैनर",
    "8. Healthcare Worker Queue": "८. स्वास्थ्य कार्यकर्ता कतार",
    "9. Nurse Decision Review": "९. नर्स निर्णय समीक्षा",
    "10. Referral Handover": "१०. रेफरल सुपुर्दगी",
    "11. Facility Admin Dashboard": "११. सुविधा व्यवस्थापक डैशबोर्ड",
    "CLINICAL TRIAGE QUEUE (28 PATIENTS)": "क्लिनिकल ट्राइएज कतार (२८ मरीज)",
    "Sister Priya's Desk 2": "सिस्टर प्रिया की डेस्क २",
    "ACTIVE CASE CLINICAL INSPECTOR": "सक्रिय मामला क्लिनिकल निरीक्षक",
    "Patient P-1042: Sunita Devi (42 F)": "मरीज P-1042: सुनीता देवी (४२ महिला)",
    "Patient P-1042: Sunita Devi (42 F) - Review Active": "मरीज P-1042: सुनीता देवी (४२ महिला) - समीक्षा सक्रिय",
    "Dual Workstation Mode (Triage Queue + Inspector)": "दोहरा वर्कस्टेशन मोड (ट्राइएज कतार + निरीक्षक)",
    "Clinical Storyboard & Screen Overview": "क्लिनिकल स्टोरीबोर्ड और स्क्रीन अवलोकन",
    "Interactive Multi-Screen Architecture Preview": "इंटरएक्टिव मल्टी-स्क्रीन आर्किटेक्चर पूर्वावलोकन",
    "Zoom In": "बड़ा करें",
    "Zoom Out": "छोटा करें",
    "Reset Zoom": "ज़ूम रीसेट करें",
    "Close Storyboard": "स्टोरीबोर्ड बंद करें",
    "1. Login & Role Hub": "१. लॉगिन और भूमिका केंद्र",
    "2. Patient Check-In & ABHA": "२. मरीज चेक-इन और आभा",
    "3. Nurse Clinical Terminal": "३. नर्स क्लिनिकल टर्मिनल",
    "4. Multimodal Studio": "४. मल्टीमॉडल स्टूडियो",
    "5. AI Processing Screen": "५. एआई प्रसंस्करण स्क्रीन",
    "6. Missing Info Resolution": "६. छूटी हुई जानकारी का समाधान",
    "7. Triage Result Note": "७. ट्राइएज परिणाम नोट",
    "8. Healthcare Worker Console": "८. स्वास्थ्य कार्यकर्ता कंसोल",
    "9. Clinical Review Inspector": "९. क्लिनिकल समीक्षा निरीक्षक",
    "10. Doctor Referral Slip": "१०. डॉक्टर रेफरल पर्ची",
    "11. Facility Surveillance Hub": "११. सुविधा निगरानी केंद्र",
    "12. Jan Aushadhi Pharmacy": "१२. जन औषधि केंद्र फार्मेसी",
    "Order placed successfully!": "ऑर्डर सफलतापूर्वक दर्ज किया गया!",
    "Dialing 108 Emergency Center...": "१०८ आपातकालीन केंद्र पर कॉल मिलाई जा रही है...",
    "Dialing 112 National Helpline...": "११२ राष्ट्रीय हेल्पलाइन पर कॉल मिलाई जा रही है...",
    "Item added to cart!": "वस्तु कार्ट में जोड़ी गई!",
    "Item removed from cart": "वस्तु कार्ट से हटा दी गई",
    "Facility audit log exported to ABDM registry.": "सुविधा ऑडिट लॉग आयुष्मान भारत रजिस्ट्री में निर्यात किया गया।",
    "ABDM Triage Report Generated for Sharda PHC (128 cases, 91.8% AI concordance). Ready for download.": "शारदा पीएचसी के लिए एबीडीएम ट्राइएज रिपोर्ट तैयार (१२८ मामले, ९१.८% एआई सहमति)। डाउनलोड के लिए तैयार।",
    "Live Queue synced with ABDM registry": "लाइव कतार आयुष्मान भारत रजिस्ट्री से सिंक हो गई",
    "Dark High-Contrast Mode Activated": "डार्क हाई-कंट्रास्ट मोड सक्रिय हुआ",
    "Light Mode Activated": "लाइट मोड सक्रिय हुआ",
    "Emergency SOS initiated. Ambulance 108 dispatched to your location. Stay calm.": "आपातकालीन एसओएस शुरू किया गया। एम्बुलेंस १०८ आपके स्थान पर भेज दी गई है। शांत रहें।",
    "Emergency SOS request cancelled": "आपातकालीन एसओएस अनुरोध रद्द कर दिया गया",
    "Audio recording stopped": "ऑडियो रिकॉर्डिंग बंद हो गई",
    "Inputs reset to blank state": "सभी इनपुट रीसेट कर दिए गए",
    "Switched to Patient View (Sunita Devi)": "मरीज दृश्य पर स्विच किया गया (सुनीता देवी)",
    "Switched to Healthcare Worker Console (Sister Priya)": "स्वास्थ्य कार्यकर्ता कंसोल पर स्विच किया गया (सिस्टर प्रिया)",
    "Switched to Facility Admin (Dr. Ananya Roy)": "सुविधा व्यवस्थापक पर स्विच किया गया (डॉ. अनन्या रॉय)",
    "Signed in as Healthcare Worker (Sister Priya)": "स्वास्थ्य कार्यकर्ता के रूप में साइन इन किया (सिस्टर प्रिया)",
    "Signed in as Medical Superintendent (Dr. Roy)": "चिकित्सा अधीक्षक के रूप में साइन इन किया (डॉ. रॉय)",
    "Logged out of ELARA session successfully": "एलारा सत्र से सफलतापूर्वक लॉग आउट किया गया",
    "Password reset successful. Please sign in.": "पासवर्ड रीसेट सफल रहा। कृपया साइन इन करें।",
    "ABHA Profile saved & synced with ABDM Registry": "आभा प्रोफ़ाइल सुरक्षित की गई और आयुष्मान भारत रजिस्ट्री से सिंक की गई",
    "Profile saved locally": "प्रोफ़ाइल स्थानीय रूप से सुरक्षित की गई",
    "ABDM Consent Granted: Active for 24h": "आयुष्मान भारत (ABDM) सहमति प्रदान की गई: २४ घंटे के लिए सक्रिय",
    "Case cleared to General OPD waiting room": "मामले को सामान्य ओपीडी प्रतीक्षा कक्ष में भेजा गया",
    "Appended clinical remark": "क्लिनिकल टिप्पणी जोड़ी गई",
    "Exporting ABDM FHIR Triage Audit Report...": "आयुष्मान भारत (ABDM) एफएचआईआर ट्राइएज ऑडिट रिपोर्ट तैयार हो रही है...",
    "Listening to patient voice in active dialect...": "सक्रिय भाषा में मरीज की आवाज सुनी जा रही है...",
    "Loading Patient Sunita Devi (Odia/Hindi)...": "मरीज सुनीता देवी का विवरण लोड हो रहा है (ओड़िया/हिन्दी)...",
    "Triage note routed to Sister Priya (Desk 2)": "ट्राइएज नोट सिस्टर प्रिया (डेस्क २) को भेजा गया",
    "Account created! Logged in.": "खाता बनाया गया! लॉग इन किया गया।",
    "Action completed successfully": "कार्य सफलतापूर्वक पूर्ण हुआ",
    "Please enter your ABHA ID or 10-digit mobile number": "अपनी आभा आईडी या १० अंकों का मोबाइल नंबर दर्ज करें",
    "Login verification failed. Please retry.": "लॉगिन सत्यापन विफल रहा। कृपया पुनः प्रयास करें।",
    "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)": "कृपया एक वैध १० अंकों का भारतीय मोबाइल नंबर दर्ज करें (उदा. 9876543210)",
    "Please enter a valid 10-digit Indian mobile number": "कृपया १० अंकों का वैध भारतीय मोबाइल नंबर दर्ज करें",
    "Passwords do not match. Please re-enter.": "पासवर्ड मेल नहीं खाते। कृपया पुनः दर्ज करें।",
    "Signup failed. Please retry.": "साइन अप विफल रहा। कृपया पुनः प्रयास करें।",
    "Invalid OTP code. Please enter demo OTP: 1234": "अमान्य ओटीपी कोड। कृपया डेमो ओटीपी: 1234 दर्ज करें",
    "Password reset failed": "पासवर्ड रीसेट विफल रहा",
    "Fever & Chills": "बुखार और कंपकंपी",
    "Acute febrile illness, shivering, body heat": "तीव्र बुखार की बीमारी, कंपकंपी, शरीर का गर्म होना",
    "Severe Throbbing Headache": "तीव्र धड़कता सिरदर्द",
    "Frontal/temporal cephalea, light sensitivity": "माथे/कनपटी का सिरदर्द, प्रकाश संवेदनशीलता",
    "Acute Abdominal Pain": "तीव्र पेट दर्द",
    "Lower quadrant guarding, nausea, colic": "पेट के निचले हिस्से में दर्द, मतली, मरोड़",
    "Chest Tightness / Shortness of Breath": "सीने में जकड़न / सांस लेने में तकलीफ",
    "Exertional dyspnea, pressure on sternum": "चलने पर सांस फूलना, सीने पर दबाव",
    "Persistent Dry Cough": "लगातार सूखी खांसी",
    "Pharyngeal tickle, post-viral convalescence": "गले में खराश, वायरल के बाद का असर",
    "Start Triage": "ट्राइएज शुरू करें",
    "Track Live": "लाइव ट्रैक करें",
    "Please enter patient name": "कृपया मरीज का नाम दर्ज करें",
    "Please enter patient recipient name.": "कृपया मरीज प्राप्तकर्ता का नाम दर्ज करें।",
    "Please enter a valid 10-digit Indian mobile number.": "कृपया एक वैध १० अंकों का भारतीय मोबाइल नंबर दर्ज करें।",
    "Please provide a valid delivery address with ward/village details.": "कृपया वार्ड/गांव के विवरण के साथ एक वैध डिलीवरी पता प्रदान करें।",
    "Order Placed Successfully via Jan Aushadhi Express!": "जन औषधि एक्सप्रेस द्वारा ऑर्डर सफलतापूर्वक दर्ज किया गया!",
    "Your cart is empty. Add medicines first.": "आपकी कार्ट खाली है। पहले दवाएं जोड़ें।",
    "Failed to submit order:": "ऑर्डर भेजने में विफल:",
    "✓ Completed": "✓ पूर्ण",
    "At least 4 characters": "कम से कम ४ अक्षर",
    "Repeat password": "पासवर्ड दोहराएं",
    "Enter new password": "नया पासवर्ड दर्ज करें",
    "Sign In / Register": "साइन इन / पंजीकरण",
    "Secure OTP": "सुरक्षित ओटीपी",
    "Enter your mobile or Ayushman Bharat Health Account (ABHA) credentials to begin triage.": "ट्राइएज शुरू करने के लिए अपना मोबाइल या आयुष्मान भारत स्वास्थ्य खाता (आभा) विवरण दर्ज करें।",
    "42 Y • Female": "४२ वर्ष • महिला",
    "ID: P-1042": "आईडी: P-1042",
    "Commercial MRP: ₹38": "व्यावसायिक एमआरपी: ₹३८",
    "e.g. NR-2024-DEL-8941": "उदा. NR-2024-DEL-8941",
    "e.g. Ramesh Kumar": "उदा. रमेश कुमार",
    "14-digit ABHA (auto-created if blank)": "१४ अंकों की आभा (खाली रहने पर स्वतः निर्मित)",
    "Back to previous screen": "पिछली स्क्रीन पर वापस जाएं",
    "Open Main Navigation Menu": "मुख्य नेविगेशन मेनू खोलें",
    "Search medicines, symptoms, clinics": "दवाइयां, लक्षण, क्लिनिक खोजें",
    "Emergency 108 Ambulance SOS": "आपातकालीन १०८ एम्बुलेंस एसओएस",
    "View Jan Aushadhi Pharmacy Cart": "जन औषधि फार्मेसी कार्ट देखें",
    "Toggle Dark/Light Mode": "डार्क / लाइट मोड बदलें",
    "Close Menu": "मेनू बंद करें",
    "Voice Search (Speak in any language)": "ध्वनि खोज (किसी भी भाषा में बोलें)",
    "Urdu (RTL)": "उर्दू (RTL)",
    "Sindhi (RTL)": "सिंधी (RTL)",
    "Essential hypertension & chronic stable angina": "अनिवार्य उच्च रक्तचाप और क्रोनिक स्टेबल एंजाइना",
    "Gastroesophageal reflux disease (GERD), acidity & ulcer healing": "गैस्ट्रोएसोफेगल रिफ्लक्स रोग (जीईआरडी), एसिडिटी और अल्सर का इलाज",
    "1 tablet 30 minutes before breakfast": "नाश्ते से ३० मिनट पहले १ गोली",
    "Jan Aushadhi Ibuprofen 400mg": "जन औषधि इबुप्रोफेन ४०० मिलीग्राम",
    "Ibuprofen IP 400mg": "इबुप्रोफेन आईपी ४०० मिलीग्राम",
    "Inflammatory arthritic pain, musculoskeletal injuries & toothache": "गठिया का सूजन दर्द, मांसपेशियों की चोट और दांत दर्द",
    "1 tablet after meals when needed for pain": "दर्द होने पर भोजन के बाद आवश्यकतानुसार १ गोली",
    "Jan Aushadhi Ciprofloxacin Eye/Ear Drops": "जन औषधि सिप्रोफ्लोक्सासिन आई/ईयर ड्रॉप्स",
    "Ciprofloxacin Hydrochloride IP 0.3% w/v": "सिप्रोफ्लोक्सासिन हाइड्रोक्लोराइड आईपी ०.३% w/v",
    "10ml Sterile Dropper Bottle": "१० मिली स्टेराइल ड्रॉपर बोतल",
    "Bacterial conjunctivitis, eye redness & ear canal infection": "बैक्टीरियल नेत्रश्लेष्मलाशोथ (आंख आना), आंख का लाल होना और कान संक्रमण",
    "1-2 drops in affected eye/ear 4 times daily": "प्रभावित आंख/कान में दिन में ४ बार १-२ बूंदें",
    "Jan Aushadhi Povidone Iodine 5% Ointment": "जन औषधि पोविडोन आयोडीन ५% मलहम",
    "Povidone Iodine IP 5% w/w (Antiseptic Microbicide)": "पोविडोन आयोडीन आईपी ५% w/w (एंटीसेप्टिक माइक्रोबिसाइड)",
    "20g Tube": "२० ग्राम ट्यूब",
    "Minor cuts, burns, scrapes, surgical wound antisepsis": "छोटे कट, जलना, खरोंच और सर्जिकल घाव का रोगाणुनाशन",
    "Apply thin layer after cleaning affected surface twice daily": "प्रभावित सतह को साफ करने के बाद दिन में दो बार पतली परत लगाएं",
    "Jan Aushadhi First Aid Clinical Kit": "जन औषधि प्राथमिक चिकित्सा क्लिनिकल किट",
    "Comprehensive Home & PHC Emergency Medical Kit": "व्यापक घरेलू और प्राथमिक स्वास्थ्य केंद्र आपातकालीन मेडिकल किट",
    "Standard First Aid Storage Box": "मानक प्राथमिक उपचार भंडारण बॉक्स",
    "Includes Bandages, Gauze, Antiseptic, Micropore, Scissor, ORS": "बैंडेज, गॉज, एंटीसेप्टिक, माइक्रोफोर, कैंची, ओआरएस शामिल",
    "Keep accessible at room temperature away from children": "बच्चों की पहुंच से दूर कमरे के तापमान पर रखें",
    "Your cart is currently empty": "आपकी कार्ट वर्तमान में खाली है",
    "Remove": "हटाएं",
    "Placing Order...": "ऑर्डर दिया जा रहा है...",
    "15-20 mins (Jan Aushadhi Express)": "१५-२० मिनट (जन औषधि एक्सप्रेस)",
    "Delivered": "डिलीवर हो गया",
    "Packed at Kendra": "केंद्र पर पैक किया गया",
    "Order Confirmed": "ऑर्डर की पुष्टि हुई",
    "Examine →": "परीक्षण करें →",
    "Sister Priya Review": "सिस्टर प्रिया समीक्षा",
    "Speech synthesis not supported on this browser": "इस ब्राउज़र में वाक् संश्लेषण समर्थित नहीं है",
    "Voice recognition stopped": "ध्वनि पहचान बंद हो गई",
    "Voice Input Simulation: Enter your speech transcript:": "आवाज इनपुट अनुकरण: अपना वक्तव्य दर्ज करें:",
    "Failed to submit order: ": "ऑर्डर जमा करने में विफल: ",
    "48 kHz • Noise Suppressed": "४८ kHz • शोर रहित",
    "✓ Complete Blood Count (CBC_1042_0925.pdf)": "✓ पूर्ण रक्त गणना (सीबीसी CBC_1042_0925.pdf)",
    "Generates ABDM compliant digital token #REF-8821 with SMS alert": "एसएमएस अलर्ट के साथ आयुष्मान भारत (ABDM) अनुरूप डिजिटल टोकन #REF-8821 उत्पन्न करता है",
  };

  /**
   * I18nManager: Centralized Localization Engine
   */
  class I18nManager {
    constructor() {
      this.languages = LANGUAGES;
      this.translations = TRANSLATIONS;
      this.textMapHi = HINDI_TEXT_MAP;
      this.currentLang = this.loadInitialLanguage();

      // Listen for window load to apply
      if (typeof document !== "undefined") {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => {
            this.initInterceptors();
            this.applyToDOM();
          });
        } else {
          setTimeout(() => {
            this.initInterceptors();
            this.applyToDOM();
          }, 0);
        }
      }
    }

    loadInitialLanguage() {
      try {
        if (window.ElaraStorage && typeof window.ElaraStorage.getLanguage === "function") {
          const stored = window.ElaraStorage.getLanguage();
          if (stored && this.languages[stored]) return stored;
        }
        const raw = localStorage.getItem("elara_v2_language");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (this.languages[parsed]) return parsed;
        }
      } catch (e) {}
      return "en";
    }

    getCurrentLanguage() {
      return this.currentLang;
    }

    getCurrentLanguageMeta() {
      return this.languages[this.currentLang] || this.languages.en;
    }

    /**
     * Resolves dot notation path on object (e.g. 'home.title' on { home: { title: '...' } })
     */
    resolveKey(obj, path) {
      if (!obj || typeof obj !== "object") return undefined;
      if (obj[path] !== undefined) return obj[path];
      const parts = String(path).split(".");
      let curr = obj;
      for (const p of parts) {
        if (curr && typeof curr === "object" && curr[p] !== undefined) {
          curr = curr[p];
        } else {
          return undefined;
        }
      }
      return curr;
    }

    /**
     * Translates a semantic key or raw English string with fallback and parameter interpolation
     * Examples:
     * - t('home.title')
     * - t('order.arrivalTime', { time: 15 })
     * - t('welcome')
     * - t('trackOrder')
     * - t('emergency')
     */
    t(keyOrText, params = {}) {
      if (!keyOrText) return "";
      const trimmed = String(keyOrText).trim();

      let text;
      if (this.currentLang === "hi") {
        // 1. Direct or dot-path lookup in translations.hi
        text = this.resolveKey(this.translations.hi, keyOrText);
        // 2. Direct lookup in textMapHi
        if (text === undefined) {
          if (this.textMapHi[keyOrText] !== undefined) {
            text = this.textMapHi[keyOrText];
          } else if (this.textMapHi[trimmed] !== undefined) {
            text = this.textMapHi[trimmed];
          } else {
            text = this.translateRawText(keyOrText);
          }
        }
        // 3. Fallback to English
        if (text === undefined || text === keyOrText) {
          const enVal = this.resolveKey(this.translations.en, keyOrText);
          if (enVal !== undefined) text = enVal;
        }
      } else {
        // Non-Hindi: check active language dictionary, then fallback to English
        const activeDict = this.translations[this.currentLang] || {};
        text = this.resolveKey(activeDict, keyOrText);
        if (text === undefined) {
          text = this.resolveKey(this.translations.en, keyOrText);
        }
        if (text === undefined) text = keyOrText;
      }

      // Interpolate parameters like {time} or ${time}
      if (typeof text === "string" && params && Object.keys(params).length > 0) {
        for (const [pKey, pVal] of Object.entries(params)) {
          text = text.replace(new RegExp(`\\{\\s*${pKey}\\s*\\}`, "g"), pVal);
          text = text.replace(new RegExp(`\\$\\{\\s*${pKey}\\s*\\}`, "g"), pVal);
        }
      }

      return text !== undefined ? text : keyOrText;
    }

    /**
     * Translates a raw English string to Hindi if active language is Hindi,
     * with comprehensive regex pattern matchers for dynamic content.
     */
    translateRawText(rawText) {
      if (!rawText) return rawText;
      if (this.currentLang !== "hi") return rawText;

      const trimmed = String(rawText).trim();
      if (!trimmed) return rawText;

      // 1. Direct match in textMapHi
      if (this.textMapHi[trimmed]) {
        return this.textMapHi[trimmed];
      }
      if (this.textMapHi[rawText]) {
        return this.textMapHi[rawText];
      }

      // 2. Check base dictionary
      const resolvedHi = this.resolveKey(this.translations.hi, trimmed);
      if (resolvedHi && typeof resolvedHi === "string") {
        return resolvedHi;
      }

      // 3. Match with leading emoji/symbol prefix
      const emojiMatch = trimmed.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|[^a-zA-Z0-9\s])\s*(.+)$/);
      if (emojiMatch) {
        const prefix = emojiMatch[1];
        const rest = emojiMatch[2].trim();
        if (this.textMapHi[rest]) {
          return prefix + " " + this.textMapHi[rest];
        }
        const transRest = this.translateRawText(rest);
        if (transRest !== rest) {
          return prefix + " " + transRest;
        }
      }

      // 4. Dynamic Patterns
      // "Wait: 12 min" -> "प्रतीक्षा: १२ मिनट"
      const waitMatch = trimmed.match(/^(?:Wait|⏱️\s*Wait):?\s*(\d+)\s*(?:min|mins|minutes)$/i);
      if (waitMatch) {
        return `⏱️ प्रतीक्षा: ${waitMatch[1]} मिनट`;
      }

      // "Found X Results:" -> "X परिणाम मिले:"
      const foundMatch = trimmed.match(/^Found\s+(\d+)\s+Results:?$/i);
      if (foundMatch) {
        return `${foundMatch[1]} परिणाम मिले:`;
      }

      // "Your order will arrive in X minutes"
      const arriveMatch = trimmed.match(/^(?:Your\s+order\s+will\s+arrive\s+in|Estimated\s+Arrival:?)\s*(\d+)\s*(?:min|mins|minutes)$/i);
      if (arriveMatch) {
        return `आपका ऑर्डर ${arriveMatch[1]} मिनट में पहुँचेगा`;
      }

      // "X min" / "X mins"
      const minMatch = trimmed.match(/^(\d+)\s*(?:min|mins|minutes)$/i);
      if (minMatch) {
        return `${minMatch[1]} मिनट`;
      }

      // "X Cases" / "X cases"
      const casesMatch = trimmed.match(/^(\d+)\s+Cases$/i);
      if (casesMatch) {
        return `${casesMatch[1]} मामले`;
      }

      // "X Verified"
      const verMatch = trimmed.match(/^(\d+)\s+Verified$/i);
      if (verMatch) {
        return `${verMatch[1]} सत्यापित`;
      }

      // "X tasks active"
      const taskMatch = trimmed.match(/^(\d+)\s+tasks\s+active$/i);
      if (taskMatch) {
        return `${taskMatch[1]} कार्य सक्रिय`;
      }

      // "Step X of Y Processing"
      const stepMatch = trimmed.match(/^Step\s+(\d+)\s+of\s+(\d+)\s+Processing$/i);
      if (stepMatch) {
        return `चरण ${stepMatch[1]} / ${stepMatch[2]} प्रसंस्करण`;
      }

      // "Price: ₹X (MRP: ₹Y • Z% OFF)"
      const priceMatch = trimmed.match(/^Price:\s*₹(\d+)\s*\(MRP:\s*₹(\d+)\s*•\s*(\d+)%\s*OFF\)$/i);
      if (priceMatch) {
        return `मूल्य: ₹${priceMatch[1]} (एमआरपी: ₹${priceMatch[2]} • ${priceMatch[3]}% छूट)`;
      }

      // "Total Saved: ₹X (Y%)"
      const savedMatch = trimmed.match(/^Total\s+Saved:\s*₹(\d+)\s*\((\d+)%\)$/i);
      if (savedMatch) {
        return `कुल बचत: ₹${savedMatch[1]} (${savedMatch[2]}%)`;
      }

      // "You save X% compared to commercial branded equivalent"
      const saveEquivMatch = trimmed.match(/^You\s+save\s+(\d+)%\s+compared\s+to\s+commercial\s+branded\s+equivalent$/i);
      if (saveEquivMatch) {
        return `व्यावसायिक ब्रांडेड दवा की तुलना में आपकी ${saveEquivMatch[1]}% बचत होगी`;
      }

      // "Savings: X% off commercial MRP"
      const savMrpMatch = trimmed.match(/^Savings:\s*(\d+)%\s*off\s*commercial\s*MRP$/i);
      if (savMrpMatch) {
        return `बचत: व्यावसायिक एमआरपी से ${savMrpMatch[1]}% छूट`;
      }

      // "X% OFF"
      const offMatch = trimmed.match(/^(\d+)%\s*OFF$/i);
      if (offMatch) {
        return `${offMatch[1]}% छूट`;
      }

      // "₹X each"
      const eachMatch = trimmed.match(/^₹(\d+)\s+each$/i);
      if (eachMatch) {
        return `₹${eachMatch[1]} प्रति दवा`;
      }

      // "Strip of X Tablets"
      const tabMatch = trimmed.match(/^Strip\s+of\s+(\d+)\s+Tablets$/i);
      if (tabMatch) {
        return `${tabMatch[1]} गोलियों की स्ट्रिप`;
      }

      // "Strip of X Capsules"
      const capMatch = trimmed.match(/^Strip\s+of\s+(\d+)\s+Capsules$/i);
      if (capMatch) {
        return `${capMatch[1]} कैप्सूल की स्ट्रिप`;
      }

      // "Order #ORD-XXXX"
      const ordMatch = trimmed.match(/^Order\s+#([A-Z0-9\-]+)$/i);
      if (ordMatch) {
        return `ऑर्डर #${ordMatch[1]}`;
      }

      // "Status: X • Total: ₹Y"
      const statMatch = trimmed.match(/^Status:\s*([^•]+)\s*•\s*Total:\s*₹(\d+)$/i);
      if (statMatch) {
        const sTr = this.translateRawText(statMatch[1].trim());
        return `स्थिति: ${sTr} • कुल: ₹${statMatch[2]}`;
      }

      // "Placed: X • Delivery ETA: Y"
      const placedMatch = trimmed.match(/^Placed:\s*([^•]+)\s*•\s*Delivery\s+ETA:\s*(.+)$/i);
      if (placedMatch) {
        const etaTr = this.translateRawText(placedMatch[2].trim());
        return `ऑर्डर दिनांक: ${placedMatch[1].trim()} • डिलीवरी समय: ${etaTr}`;
      }

      // "Delivery ETA: X"
      const etaSingleMatch = trimmed.match(/^Delivery\s+ETA:\s*(.+)$/i);
      if (etaSingleMatch) {
        return `डिलीवरी समय: ${this.translateRawText(etaSingleMatch[1].trim())}`;
      }

      // "Welcome back, {name}"
      const wbMatch = trimmed.match(/^Welcome\s+back,\s*(.+)$/i);
      if (wbMatch) {
        return `वापसी पर स्वागत है, ${wbMatch[1]}`;
      }

      // "Welcome, {name}! Triage Portal ready."
      const wprMatch = trimmed.match(/^Welcome,\s*(.+?)!\s*Triage\s+Portal\s+ready\.$/i);
      if (wprMatch) {
        return `स्वागत है, ${wprMatch[1]}! ट्राइएज पोर्टल तैयार है।`;
      }

      // "Account created for {name}! Logged in."
      const accMatch = trimmed.match(/^Account\s+created\s+for\s*(.+?)!\s*Logged\s+in\.$/i);
      if (accMatch) {
        return `${accMatch[1]} के लिए खाता बनाया गया! लॉग इन किया गया।`;
      }

      // "{name} added to cart!"
      const addCartMatch = trimmed.match(/^(.+?)\s+added\s+to\s+cart!$/i);
      if (addCartMatch) {
        return `${addCartMatch[1]} को कार्ट में जोड़ा गया!`;
      }

      // "Listening in {lang}..."
      const listenMatch = trimmed.match(/^Listening\s+in\s*(.+?)\.\.\.$/i);
      if (listenMatch) {
        return `${listenMatch[1]} में सुन रहे हैं...`;
      }

      // "Dialing {number} Emergency Center..."
      const dialMatch = trimmed.match(/^Dialing\s+(.+?)\s+Emergency\s+Center\.\.\.$/i);
      if (dialMatch) {
        return `${dialMatch[1]} आपातकालीन केंद्र पर कॉल की जा रही है...`;
      }

      // "Referral token {token} sent to Doctor console!"
      const refMatch = trimmed.match(/^Referral\s+token\s*(.+?)\s*sent\s+to\s+Doctor\s+console!$/i);
      if (refMatch) {
        return `रेफरल टोकन ${refMatch[1]} डॉक्टर कंसोल पर भेजा गया!`;
      }

      // "Resolved missing clinical info: {type}"
      const resMatch = trimmed.match(/^Resolved\s+missing\s+clinical\s+info:\s*(.+)$/i);
      if (resMatch) {
        return `छूटी हुई क्लिनिकल जानकारी हल की गई: ${resMatch[1]}`;
      }

      // "Loaded preset audio: {title}"
      const prMatch = trimmed.match(/^Loaded\s+preset\s+audio:\s*(.+)$/i);
      if (prMatch) {
        return `प्रारंभिक ऑडियो लोड किया गया: ${prMatch[1]}`;
      }

      // "Toggled symptom: {name}"
      const sympMatch = trimmed.match(/^Toggled\s+symptom:\s*(.+)$/i);
      if (sympMatch) {
        return `लक्षण चुना गया: ${sympMatch[1]}`;
      }

      // "Loaded sample report: {name}"
      const repMatch = trimmed.match(/^Loaded\s+sample\s+report:\s*(.+)$/i);
      if (repMatch) {
        return `नमूना रिपोर्ट लोड की गई: ${repMatch[1]}`;
      }

      // "No matching results found for \"{query}\""
      const noResMatch = trimmed.match(/^No\s+matching\s+results\s+found\s+for\s*"([^"]*)"$/i);
      if (noResMatch) {
        return `"${noResMatch[1]}" के लिए कोई परिणाम नहीं मिला`;
      }

      // "No medicines found matching \"{query}\""
      const noMedMatch = trimmed.match(/^No\s+medicines\s+found\s+matching\s*"([^"]*)"$/i);
      if (noMedMatch) {
        return `"${noMedMatch[1]}" से मेल खाती कोई दवा नहीं मिली`;
      }

      // "Current Rating: {r}/10 ({desc})"
      const rateMatch = trimmed.match(/^Current\s+Rating:\s*(\d+)\/10\s*\(([^)]+)\)$/i);
      if (rateMatch) {
        const descTr = this.translateRawText(rateMatch[2].trim());
        return `वर्तमान रेटिंग: ${rateMatch[1]}/10 (${descTr})`;
      }

      // "Model: {model} • Latency: {latency}"
      const modelMatch = trimmed.match(/^Model:\s*([^•]+)\s*•\s*Latency:\s*(.+)$/i);
      if (modelMatch) {
        return `मॉडल: ${modelMatch[1].trim()} • विलंबता: ${modelMatch[2].trim()}`;
      }

      return rawText;
    }

    /**
     * Switch language throughout the entire application
     */
    setLanguage(langCode) {
      if (!this.languages[langCode]) {
        console.warn(`[i18n] Language ${langCode} not supported. Defaulting to English.`);
        langCode = "en";
      }

      this.currentLang = langCode;

      // Persist language selection
      if (window.ElaraStorage && typeof window.ElaraStorage.setLanguage === "function") {
        window.ElaraStorage.setLanguage(langCode);
      }
      try {
        localStorage.setItem("elara_v2_language", JSON.stringify(langCode));
      } catch (e) {}

      // 1. Apply translations across entire DOM immediately
      this.applyToDOM();

      // 2. Re-render dynamic components in app if available
      try {
        if (window.ElaraPharmacy) {
          if (typeof window.ElaraPharmacy.renderCatalogGrid === "function") {
            window.ElaraPharmacy.renderCatalogGrid();
          }
          if (typeof window.ElaraPharmacy.renderCartModal === "function") {
            window.ElaraPharmacy.renderCartModal();
          }
          if (typeof window.ElaraPharmacy.renderOrderTracking === "function") {
            window.ElaraPharmacy.renderOrderTracking();
          }
        }
        if (window.elaraApp) {
          if (typeof window.elaraApp.renderQueueList === "function") {
            window.elaraApp.renderQueueList();
          }
          if (typeof window.elaraApp.renderWorkstationViews === "function") {
            window.elaraApp.renderWorkstationViews();
          }
          if (typeof window.elaraApp.loadProfileIntoForm === "function") {
            window.elaraApp.loadProfileIntoForm();
          }
          if (typeof window.elaraApp.loadSettingsIntoUI === "function") {
            window.elaraApp.loadSettingsIntoUI();
          }
        }
      } catch (e) {
        console.warn("[i18n] Error re-rendering dynamic components:", e);
      }

      // 3. Re-run DOM translation to catch any freshly rendered elements
      this.applyToDOM();
      setTimeout(() => this.applyToDOM(), 50);

      // 4. Trigger custom event for external listeners
      if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
        window.dispatchEvent(new CustomEvent("elara:languageChanged", {
          detail: {
            language: langCode,
            meta: this.languages[langCode]
          }
        }));
      }

      // 5. User feedback toast
      if (window.showToast) {
        const langObj = this.languages[langCode];
        const toastMsg = langCode === "hi" 
          ? `भाषा हिन्दी (Hindi) में सेट की गई`
          : `Language set to ${langObj.nativeName} (${langObj.name})`;
        window.showToast(toastMsg, "🌐");
      }

      return this.currentLang;
    }

    /**
     * Apply active language translations to all elements in DOM
     */
    applyToDOM(root = document.body) {
      if (!root) return;
      const isHindi = this.currentLang === "hi";
      const langMeta = this.getCurrentLanguageMeta();

      // 1. Update <html> tag attributes
      if (document.documentElement) {
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = langMeta.rtl ? "rtl" : "ltr";
      }

      // 2. Translate explicit [data-i18n] nodes
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (key) {
          this.setElementTextPreservingIcons(el, this.t(key));
        }
      });

      // 3. Translate placeholders: [data-i18n-placeholder] and raw [placeholder]
      document.querySelectorAll("input, textarea").forEach(el => {
        if (!el.__origPlaceholder) {
          el.__origPlaceholder = el.getAttribute("placeholder") || "";
        }
        if (el.__origPlaceholder) {
          const key = el.getAttribute("data-i18n-placeholder");
          const trans = key ? this.t(key) : this.translateRawText(el.__origPlaceholder);
          el.setAttribute("placeholder", isHindi ? trans : el.__origPlaceholder);
        }
      });

      // 4. Translate titles / tooltips: [data-i18n-title] and raw [title]
      document.querySelectorAll("[title]").forEach(el => {
        if (!el.__origTitle) {
          el.__origTitle = el.getAttribute("title") || "";
        }
        if (el.__origTitle) {
          const key = el.getAttribute("data-i18n-title");
          const trans = key ? this.t(key) : this.translateRawText(el.__origTitle);
          el.setAttribute("title", isHindi ? trans : el.__origTitle);
        }
      });

      // 5. Translate <option> elements in dropdown selects
      document.querySelectorAll("option").forEach(el => {
        // Skip language selector option labels itself so user can always identify their native language
        if (el.closest("#topLangSelector") || el.closest("#menuLangSelector") || el.closest(".elara-lang-select")) {
          return;
        }
        if (!el.__origText) {
          el.__origText = el.textContent.trim();
        }
        if (el.__origText) {
          const trans = this.translateRawText(el.__origText);
          el.textContent = isHindi ? trans : el.__origText;
        }
      });

      // 6. Deep walk all text nodes across root
      this.translateDOMTextNodes(root, isHindi);

      // 7. Update language UI selectors & badges
      this.updateLanguageUIElements();
    }

    /**
     * Safely updates text of an element without overwriting Material Symbol icon child
     */
    setElementTextPreservingIcons(el, newText) {
      const icon = el.querySelector(".material-symbols-outlined");
      if (icon) {
        let textFound = false;
        Array.from(el.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
            node.nodeValue = " " + newText + " ";
            textFound = true;
          }
        });
        if (!textFound) {
          let span = el.querySelector(".i18n-text-span");
          if (!span) {
            span = document.createElement("span");
            span.className = "i18n-text-span";
            el.appendChild(span);
          }
          span.textContent = " " + newText;
        }
      } else {
        el.textContent = newText;
      }
    }

    /**
     * Traverses all text nodes in the DOM and translates/restores them
     */
    translateDOMTextNodes(root, isHindi) {
      if (!root || typeof document === "undefined" || !document.createTreeWalker) return;
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;

            const tag = parent.tagName;
            if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "CODE" || tag === "PRE") {
              return NodeFilter.FILTER_REJECT;
            }

            // Strictly protect Material Symbols icon ligatures!
            if (parent.classList.contains("material-symbols-outlined") || parent.closest(".material-symbols-outlined")) {
              return NodeFilter.FILTER_REJECT;
            }

            // Ignore elements marked as notranslate
            if (parent.classList.contains("notranslate")) {
              return NodeFilter.FILTER_REJECT;
            }

            // Ignore language selector options
            if (parent.closest("#topLangSelector") || parent.closest("#menuLangSelector") || parent.closest(".elara-lang-select")) {
              return NodeFilter.FILTER_REJECT;
            }

            const val = node.nodeValue.trim();
            // Skip empty or pure numbers/symbols
            if (!val || /^[0-9\s\.,;:!\?\/\\|\-_=\+\*\(\)\[\]\{\}\<\>@#\$%\^&•✓○→↓↑←₹%°]+$/.test(val)) {
              return NodeFilter.FILTER_SKIP;
            }

            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      let textNode;
      while ((textNode = walker.nextNode())) {
        // Cache original English text on first pass
        if (textNode.__origText === undefined) {
          textNode.__origText = textNode.nodeValue.trim();
          const matchPrefix = textNode.nodeValue.match(/^\s*/);
          const matchSuffix = textNode.nodeValue.match(/\s*$/);
          textNode.__prefixWs = matchPrefix ? matchPrefix[0] : "";
          textNode.__suffixWs = matchSuffix ? matchSuffix[0] : "";
        }

        const original = textNode.__origText;
        if (!original) continue;

        if (isHindi) {
          const translated = this.translateRawText(original);
          if (translated && translated !== original) {
            textNode.nodeValue = textNode.__prefixWs + translated + textNode.__suffixWs;
          }
        } else {
          // Restore English
          textNode.nodeValue = textNode.__prefixWs + original + textNode.__suffixWs;
        }
      }
    }

    /**
     * Updates active badges and language selector dropdowns
     */
    updateLanguageUIElements() {
      const badge = document.getElementById("menuCurrentLangBadge");
      if (badge) {
        const meta = this.getCurrentLanguageMeta();
        badge.textContent = `${meta.nativeName} (${this.currentLang.toUpperCase()})`;
      }

      document.querySelectorAll("[data-lang]").forEach(btn => {
        const lang = btn.getAttribute("data-lang");
        if (lang === this.currentLang) {
          btn.classList.add("active", "border-teal-600", "bg-teal-50", "text-teal-900");
          btn.classList.remove("border-slate-200", "bg-white");
        } else {
          btn.classList.remove("active", "border-teal-600", "bg-teal-50", "text-teal-900");
          btn.classList.add("border-slate-200");
        }
      });

      document.querySelectorAll(".elara-lang-select, #topLangSelector, #menuLangSelector, #patientIntakeLanguage").forEach(sel => {
        sel.value = this.currentLang;
      });
    }

    /**
     * Initializes global interceptors and mutation observers
     */
    initInterceptors() {
      // Global alert wrapper to ensure any alert() message is automatically localized
      if (typeof window !== "undefined" && window.alert) {
        const nativeAlert = window.alert;
        window.alert = (msg) => {
          const localized = this.currentLang === "hi" ? this.translateRawText(String(msg)) : msg;
          return nativeAlert.call(window, localized);
        };
      }

      // Mutation observer to automatically translate dynamic DOM nodes when Hindi is active
      if (typeof MutationObserver !== "undefined" && document.body) {
        const observer = new MutationObserver((mutations) => {
          if (this.currentLang !== "hi") return;
          for (const m of mutations) {
            if (m.addedNodes && m.addedNodes.length > 0) {
              m.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  this.applyToDOM(node);
                }
              });
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }
    /**
     * Automated Audit Development Check:
     * Scans the rendered DOM for untranslated user-visible English strings when Hindi is active
     */
    scanForMissingTranslations(container = document.body) {
      if (this.currentLang !== "hi") {
        console.warn("[i18n Audit] Current language is not Hindi. Setting language to Hindi for audit...");
        this.setLanguage("hi");
      }

      const untranslated = [];
      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName;
            if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return NodeFilter.FILTER_REJECT;
            if (parent.classList.contains("material-symbols-outlined") || parent.closest(".material-symbols-outlined")) return NodeFilter.FILTER_REJECT;
            if (parent.closest("#topLangSelector") || parent.closest("#menuLangSelector")) return NodeFilter.FILTER_REJECT;

            const text = node.nodeValue.trim();
            // Check if contains significant English text (words of 3+ letters)
            if (/[a-zA-Z]{3,}/.test(text)) {
              // Ignore standard brand/protocol acronyms
              const isAcronym = /^(ELARA|ABDM|ABHA|FHIR|SNOMED|ICD-11|WHO|CDSCO|BP|HR|SpO2|CBC|ECG|PDF|JPG|PNG|OR|IV|NS|OPD|ANC|ESI|NMC|MCI|NUID|ANM|CMO|DHH|PHC|PSU|HAL|IDPL|KAPL|PMBJP|USD|INR)$/i.test(text);
              if (!isAcronym) return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_SKIP;
          }
        }
      );

      let node;
      while ((node = walker.nextNode())) {
        untranslated.push({
          text: node.nodeValue.trim(),
          parentTag: node.parentElement.tagName,
          parentClass: node.parentElement.className
        });
      }

      console.group("[i18n Localization Audit]");
      if (untranslated.length === 0) {
        console.log("%c✓ 100% Localization Complete! No untranslated English strings found in DOM.", "color: #16a34a; font-weight: bold; font-size: 14px;");
      } else {
        console.warn(`%c⚠ Found ${untranslated.length} untranslated English text strings:`, "color: #e11d48; font-weight: bold; font-size: 14px;");
        console.table(untranslated);
      }
      console.groupEnd();

      return {
        isComplete: untranslated.length === 0,
        untranslatedCount: untranslated.length,
        untranslated
      };
    }
  }

  // Global Singleton Instance & Global Helper
  window.ElaraI18n = new I18nManager();
  window.t = (key, params) => window.ElaraI18n.t(key, params);
  window.setLanguage = (code) => window.ElaraI18n.setLanguage(code);
  window.auditLocalization = () => window.ElaraI18n.scanForMissingTranslations();

})();
