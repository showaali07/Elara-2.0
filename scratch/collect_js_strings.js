const fs = require('fs');
const path = require('path');

const jsFiles = ['medicines.js', 'emergency.js', 'app.js', 'data.js', 'voice.js'];
const i18nCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'i18n.js'), 'utf8');

const vm = require('vm');
const sandbox = {
  window: {},
  document: { documentElement: { lang: 'en', dir: 'ltr' }, querySelectorAll: () => [], getElementById: () => null, body: null },
  console: console,
  localStorage: { getItem: () => null, setItem: () => null },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  CustomEvent: function() {},
  NodeFilter: { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2, FILTER_SKIP: 3 }
};
vm.createContext(sandbox);
vm.runInContext(i18nCode, sandbox);

const i18n = sandbox.window.ElaraI18n;
i18n.currentLang = 'hi';

const allMissingJs = [];

// Specific user-facing strings in JS files
const candidateStrings = [
  // medicines.js
  "Jan Aushadhi Paracetamol 650mg",
  "Paracetamol IP 650mg",
  "Strip of 10 Tablets",
  "IDPL (PMBJP Certified PSU)",
  "Fever, Headache, Mild-to-moderate Body Pain",
  "1 tablet every 6-8 hours after food as directed by physician",
  "Jan Aushadhi Amoxicillin 500mg",
  "Amoxicillin Trihydrate IP 500mg",
  "Strip of 10 Capsules",
  "HAL (PMBJP Certified PSU)",
  "Bacterial respiratory, ear, throat & dental infections",
  "Take complete course strictly as advised by medical officer",
  "Jan Aushadhi Metformin 500mg",
  "Metformin Hydrochloride IP 500mg",
  "Karnataka Antibiotics (KAPL)",
  "Type 2 Diabetes Mellitus glycemic control",
  "1 tablet twice daily with meals",
  "Jan Aushadhi Azithromycin 500mg",
  "Azithromycin IP 500mg",
  "Strip of 3 Tablets",
  "Bengal Chemicals & Pharmaceuticals",
  "Upper & lower respiratory tract infections",
  "1 tablet once daily 1 hr before or 2 hrs after meal for 3 days",
  "Jan Aushadhi ORS Electrolyte (WHO Formula)",
  "Oral Rehydration Salts IP (WHO Standard)",
  "21.8g Sachet for 1 Litre Water",
  "BPPI PMBJP Approved Unit",
  "Acute dehydration, diarrhea, heat stroke & gastroenteritis",
  "Dissolve entire sachet in 1 Litre boiled & cooled drinking water",
  "Jan Aushadhi Cetirizine 10mg",
  "Cetirizine Hydrochloride IP 10mg",
  "HAL Healthcare Unit",
  "Allergic rhinitis, cold sneezing, skin urticaria & itching",
  "1 tablet at bedtime",
  "Jan Aushadhi Amlodipine 5mg",
  "Amlodipine Besylate IP 5mg",
  "Essential hypertension & chronic stable angina",
  "1 tablet daily in the morning with water",
  "Jan Aushadhi Pantoprazole 40mg",
  "Pantoprazole Sodium Gastro-resistant IP 40mg",
  "Gastroesophageal reflux disease (GERD), acidity & ulcer healing",
  "1 tablet 30 minutes before breakfast",
  "Jan Aushadhi Ibuprofen 400mg",
  "Ibuprofen IP 400mg",
  "Inflammatory arthritic pain, musculoskeletal injuries & toothache",
  "1 tablet after meals when needed for pain",
  "Jan Aushadhi Ciprofloxacin Eye/Ear Drops",
  "Ciprofloxacin Hydrochloride IP 0.3% w/v",
  "10ml Sterile Dropper Bottle",
  "Bacterial conjunctivitis, eye redness & ear canal infection",
  "1-2 drops in affected eye/ear 4 times daily",
  "Jan Aushadhi Povidone Iodine 5% Ointment",
  "Povidone Iodine IP 5% w/w (Antiseptic Microbicide)",
  "20g Tube",
  "Minor cuts, burns, scrapes, surgical wound antisepsis",
  "Apply thin layer after cleaning affected surface twice daily",
  "Jan Aushadhi First Aid Clinical Kit",
  "Comprehensive Home & PHC Emergency Medical Kit",
  "Standard First Aid Storage Box",
  "Includes Bandages, Gauze, Antiseptic, Micropore, Scissor, ORS",
  "Keep accessible at room temperature away from children",
  "Please enter patient recipient name.",
  "Please enter a valid 10-digit Indian mobile number.",
  "Please provide a valid delivery address with ward/village details.",
  "Your cart is empty. Add medicines first.",
  "Your cart is currently empty",
  "Browse Jan Aushadhi Medicines",
  "Remove",
  "Clear Search Filters",
  "Placing Order...",
  "Confirm & Place Order",
  "Order Placed Successfully via Jan Aushadhi Express!",
  "Failed to submit order: ",
  "15-20 mins",
  "15-20 mins (Jan Aushadhi Express)",
  "Out for Delivery",
  "Delivered",
  "Packed at Kendra",
  "Order Confirmed",
  "PMBJP Generic",
  "OFF",
  "Uses:",
  "View Medicine Details",
  "Add",

  // emergency.js
  "Emergency SOS initiated. Ambulance 108 dispatched to your location. Stay calm.",
  "Emergency SOS request cancelled",
  "Arrived at location!",

  // app.js
  "Switched to Patient View (Sunita Devi)",
  "Switched to Healthcare Worker Console (Sister Priya)",
  "Switched to Facility Admin (Dr. Ananya Roy)",
  "Signed in as Healthcare Worker (Sister Priya)",
  "Signed in as Medical Superintendent (Dr. Roy)",
  "Logged out of ELARA session successfully",
  "Password reset successful. Please sign in.",
  "Please enter patient name",
  "ABHA Profile saved & synced with ABDM Registry",
  "Profile saved locally",
  "ABDM Consent Granted: Active for 24h",
  "Loading Patient Sunita Devi (Odia/Hindi)...",
  "Audio recording stopped",
  "Listening to patient voice in active dialect...",
  "Inputs reset to blank state",
  "Triage note routed to Sister Priya (Desk 2)",
  "Appended clinical remark",
  "Case cleared to General OPD waiting room",
  "Exporting ABDM FHIR Triage Audit Report...",
  "Facility audit log exported to ABDM registry.",
  "Live Queue synced with ABDM registry",
  "Dark High-Contrast Mode Activated",
  "Light Mode Activated",
  "Track Live",
  "Examine →",
  "Sister Priya Review",
  "Urgent",
  "Priority",
  "Routine",

  // voice.js
  "Speech synthesis not supported on this browser",
  "Voice recognition stopped",
  "Voice Input Simulation: Enter your speech transcript:"
];

candidateStrings.forEach(s => {
  const tr = i18n.translateRawText(s);
  if (tr === s || /[a-zA-Z]{3,}/.test(tr)) {
    allMissingJs.push(s);
  }
});

console.log("Candidate JS strings checked:", candidateStrings.length);
console.log("Missing JS translations count:", allMissingJs.length);
fs.writeFileSync(path.join(__dirname, 'missing_js_strings.json'), JSON.stringify(allMissingJs, null, 2));
