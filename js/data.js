/**
 * ELARA 2.0 - DATA MODELS & CLINICAL VOCABULARY
 * Multilingual dictionaries, sample patient cases, lab presets, and PHC metrics.
 */

const ELARA_DATA = {
  // Active facility information
  facility: {
    name: "Sharda Hospital Navrangpura",
    type: "Primary Health Centre (PHC)",
    code: "PHC-GJ-0921",
    abdmStatus: "Milestone 3 Certified",
    chiefMO: "Dr. Ananya Roy, MBBS, MD (Med)",
    nurseIncharge: "Sister Priya Patel, GNM"
  },

  // Active Patient Profile (Sunita Devi)
  activePatient: {
    id: "P-1042",
    abhaId: "91-4820-1928-3341",
    name: "Sunita Devi",
    age: 42,
    gender: "Female",
    location: "Navrangpura Ward 4, Ahmedabad",
    language: "Hindi",
    phone: "+91 98765-43210",
    symptoms: [
      { name: "Fever with Chills", severity: "High", duration: "24 hrs", onset: "Yesterday evening" },
      { name: "Throbbing Frontal Headache", severity: "Severe", duration: "Acute", onset: "Yesterday night" },
      { name: "Generalized Fatigue & Body Ache", severity: "Moderate", duration: "1 day", onset: "Continuous" }
    ],
    missingInfo: {
      temperature: { status: "missing", value: "102.4 °F", resolved: false },
      medications: { status: "missing", value: "Paracetamol 650mg taken 4 hrs ago", resolved: false },
      redFlags: { status: "missing", value: "No neck stiffness, no petechial rash", resolved: false }
    },
    labReport: {
      fileName: "CBC_1042_0925.pdf",
      date: "Today, 08:30 AM",
      values: {
        hemoglobin: { val: 11.2, unit: "g/dL", status: "warn", desc: "Slightly Low" },
        wbc: { val: 8200, unit: "/µL", status: "ok", desc: "Normal" },
        platelets: { val: "2.1 L", unit: "/µL", status: "ok", desc: "Adequate" }
      }
    },
    triageScore: {
      priority: "urgent", // 'urgent' | 'priority' | 'routine'
      label: "HIGH URGENCY REVIEW SUGGESTED",
      color: "red",
      waitMax: "30 mins",
      rationale: "Prompt clinical assessment recommended within 30 minutes to manage worsening acute symptoms."
    },
    voiceNote: {
      hindi: "मुझे कल रात से तेज़ बुखार और सिरदर्द है... नींद नहीं आ रही है और बदन दर्द भी है।",
      english: "I have high fever and severe headache since last night with chills, cannot sleep, and generalized body ache.",
      odia: "ମୋତେ ଗତକାଲି ରାତିରୁ ପ୍ରବଳ ଜ୍ୱର ଏବଂ ମୁଣ୍ଡବିନ୍ଧା ହେଉଛି, ଶୋଇ ପାରୁନାହିଁ।"
    }
  },

  // Today's Live Queue for Healthcare Worker (28 total cases)
  queue: [
    {
      id: "P-1042",
      name: "Sunita Devi",
      age: 42,
      gender: "F",
      priority: "urgent",
      priorityLabel: "🔴 URGENT",
      waitingTime: "12 min",
      symptoms: "Fever with Chills • Severe Headache • Body Ache",
      tags: ["📄 CBC Attached", "🌡️ Temp: 102.4°F", "Hindi Voice Note"],
      desk: "Assigned to Sister Priya",
      canReview: true
    },
    {
      id: "P-1045",
      name: "Amit Sharma",
      age: 58,
      gender: "M",
      priority: "urgent",
      priorityLabel: "🔴 URGENT",
      waitingTime: "4 min",
      symptoms: "Acute Chest Tightness • Dyspnea • Diaphoresis",
      tags: ["⚡ Red Flag Alert", "Immediate ECG Required"],
      desk: "Emergency Triage Area",
      canReview: true
    },
    {
      id: "P-1043",
      name: "Rajesh Kumar",
      age: 35,
      gender: "M",
      priority: "priority",
      priorityLabel: "🟡 PRIORITY",
      waitingTime: "24 min",
      symptoms: "Persistent Cough • Low Grade Fever • Sore Throat",
      tags: ["📝 Text Form", "Duration: 3 days"],
      desk: "General OPD Queue",
      canReview: true
    },
    {
      id: "P-1047",
      name: "Meena Ben",
      age: 29,
      gender: "F",
      priority: "priority",
      priorityLabel: "🟡 PRIORITY",
      waitingTime: "31 min",
      symptoms: "Abdominal Cramping • Dehydration • Vomiting",
      tags: ["ORS Administered", "Vitals Stable"],
      desk: "Desk 2 - Triage",
      canReview: true
    },
    {
      id: "P-1044",
      name: "Anita Behera",
      age: 61,
      gender: "F",
      priority: "routine",
      priorityLabel: "🟢 ROUTINE",
      waitingTime: "45 min",
      symptoms: "Chronic Knee Joint Swelling & Pain (5 days)",
      tags: ["Odia Audio Note", "Ortho OPD"],
      desk: "Routine Queue",
      canReview: true
    },
    {
      id: "P-1046",
      name: "Devendra Sahu",
      age: 48,
      gender: "M",
      priority: "routine",
      priorityLabel: "🟢 ROUTINE",
      waitingTime: "52 min",
      symptoms: "Refill for Hypertension Medication (Amlodipine)",
      tags: ["NCD Follow-up", "BP: 130/84"],
      desk: "NCD Desk",
      canReview: true
    }
  ],

  // Sample Presets for Multimodal Demonstrations
  presets: {
    fever: {
      name: "Sunita Devi (42 F) - Fever & Cephalea",
      lang: "hi",
      transcriptHindi: "मुझे कल रात से तेज़ बुखार और सिरदर्द है... नींद नहीं आ रही है और बदन दर्द भी है।",
      transcriptEnglish: "I have high fever and severe headache since last night with chills, cannot sleep, and generalized body ache.",
      symptoms: ["Fever with Chills", "Throbbing Headache", "Body Ache"],
      duration: "1 day",
      urgency: "urgent",
      report: "cbc"
    },
    chest: {
      name: "Amit Sharma (58 M) - Chest Pain Red Flag",
      lang: "en",
      transcriptHindi: "मुझे सीने में भारी दबाव महसूस हो रहा है और सांस लेने में कठिनाई हो रही है।",
      transcriptEnglish: "I am feeling heavy pressure in my chest and difficulty breathing since 30 minutes, sweating heavily.",
      symptoms: ["Acute Chest Tightness", "Difficulty Breathing", "Diaphoresis"],
      duration: "< 2 hours",
      urgency: "urgent",
      report: "none"
    },
    odia: {
      name: "Anita Behera (61 F) - Knee Joint Swelling",
      lang: "od",
      transcriptHindi: "मेरे घुटने में पिछले पांच दिनों से सूजन और दर्द है, चलने में परेशानी हो रही है।",
      transcriptEnglish: "Severe swelling and stiffness in right knee joint for 5 days, pain increases upon standing.",
      symptoms: ["Knee Joint Swelling", "Difficulty Walking"],
      duration: "5 days",
      urgency: "routine",
      report: "none"
    }
  },

  // Lab Report Samples
  reports: {
    cbc: {
      name: "CBC Complete Blood Count",
      file: "CBC_1042_0925.pdf",
      hb: "11.2 g/dL",
      wbc: "8,200 /µL",
      platelets: "2.1 lakh/µL",
      note: "Hemoglobin slightly lower than reference normal range (12.0-15.5 g/dL). Normal platelet count rules out immediate severe thrombocytopenia."
    },
    dengue: {
      name: "Dengue NS1 Antigen & IgM",
      file: "DENGUE_SERO_0925.pdf",
      hb: "12.8 g/dL",
      wbc: "4,100 /µL",
      platelets: "1.4 lakh/µL",
      note: "Platelets slightly borderline (1.4L). NS1 Antigen test pending confirmation. Strict hydration advised."
    }
  },

  // Facility Admin Statistics (128 Cases Today)
  adminStats: {
    totalCases: 128,
    urgentCount: 12,
    priorityCount: 36,
    routineCount: 80,
    avgReviewTime: "8 min",
    queueClearanceRate: "94.2%",
    languages: {
      hindi: 52,
      english: 31,
      odia: 17
    },
    aiClinicianAlignment: "91.8%",
    overridesCount: 11
  },

  // Multilingual UI Strings
  i18n: {
    en: {
      appName: "ELARA",
      tagline: "Smarter Triage, Faster Care",
      role_patient: "Patient / Citizen",
      role_patient_desc: "Describe symptoms in voice or text, upload lab reports, and get a triage review.",
      role_nurse: "Healthcare Worker / Nurse",
      role_nurse_desc: "Review incoming patient triage queue, verify clinical notes, and refer to doctor.",
      role_admin: "Facility Admin / PHC Incharge",
      role_admin_desc: "Monitor live case load, urgent queue, turnaround times, and PHC language analytics.",
      start_voice: "Start Voice Triage",
      record_prompt: "Tap to Speak",
      processing: "Analyzing & Structuring Triage Note...",
      triage_result: "Triage Result & Clinical Summary",
      send_to_hw: "Send for Healthcare Worker Review 🚀",
      refer_doctor: "Refer to Doctor / Specialist →"
    },
    hi: {
      appName: "एलारा",
      tagline: "सटीक ट्रायज, त्वरित उपचार",
      role_patient: "मरीज़ / नागरिक",
      role_patient_desc: "अपनी आवाज़ या लिखकर लक्षण बताएं, रिपोर्ट अपलोड करें और त्वरित समीक्षा पाएं।",
      role_nurse: "स्वास्थ्य कार्यकर्ता / नर्स",
      role_nurse_desc: "आने वाले मरीज़ों की कतार देखें, एआई सारांश की पुष्टि करें और डॉक्टर को भेजें।",
      role_admin: "पीएचसी प्रभारी / व्यवस्थापक",
      role_admin_desc: "आज के कुल मामले, आपात स्थिति, औसत समय और भाषा आंकड़ों की निगरानी करें।",
      start_voice: "बोलकर लक्षण बताएं",
      record_prompt: "बोलने के लिए दबाएं",
      processing: "ट्रायज नोट तैयार किया जा रहा है...",
      triage_result: "ट्रायज परिणाम व क्लीनिकल सारांश",
      send_to_hw: "स्वास्थ्य कार्यकर्ता समीक्षा हेतु भेजें 🚀",
      refer_doctor: "डॉक्टर को रेफर करें →"
    },
    od: {
      appName: "ଏଲାରା",
      tagline: "ସଠିକ ଟ୍ରିଆଜ୍, ଶୀଘ୍ର ଚିକିତ୍ସା",
      role_patient: "ରୋଗୀ / ନାଗରିକ",
      role_patient_desc: "କଣ୍ଠସ୍ୱର କିମ୍ବା ଲେଖି ଲକ୍ଷଣ ଜଣାନ୍ତୁ, ରିପୋର୍ଟ ଅପଲୋଡ୍ କରନ୍ତୁ ଏବଂ ଯାଞ୍ଚ ପାଆନ୍ତୁ।",
      role_nurse: "ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀ / ନର୍ସ",
      role_nurse_desc: "ରୋଗୀଙ୍କ କ୍ୟୁ ଯାଞ୍ଚ କରନ୍ତୁ, ଏଆଇ ନୋଟ୍ ସୁନିଶ୍ଚିତ କରନ୍ତୁ ଏବଂ ଡାକ୍ତରଙ୍କୁ ରେଫର କରନ୍ତୁ।",
      role_admin: "ସ୍ୱାସ୍ଥ୍ୟକେନ୍ଦ୍ର ପ୍ରଭାରୀ",
      role_admin_desc: "ଦୈନିକ କେସ୍, ଜରୁରୀ ପରିସ୍ଥିତି, ସମୀକ୍ଷା ସମୟ ଏବଂ ଭାଷା ବିଶ୍ଳେଷଣ ଅନୁଧ୍ୟାନ କରନ୍ତୁ।",
      start_voice: "କଣ୍ଠସ୍ୱରରେ ଲକ୍ଷଣ କୁହନ୍ତୁ",
      record_prompt: "କହିବା ପାଇଁ ଦବାନ୍ତୁ",
      processing: "ଟ୍ରିଆଜ୍ ପ୍ରସ୍ତୁତ ହେଉଛି...",
      triage_result: "ଟ୍ରିଆଜ୍ ଫଳାଫଳ ଓ ସାରାଂଶ",
      send_to_hw: "ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀ ସମୀକ୍ଷାକୁ ପଠାନ୍ତୁ 🚀",
      refer_doctor: "ଡାକ୍ତରଙ୍କୁ ରେଫର୍ କରନ୍ତୁ →"
    }
  }
};
