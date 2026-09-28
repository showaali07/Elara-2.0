const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const i18nCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'i18n.js'), 'utf8');

// Sandbox to load i18n
let windowObj = {};
let documentObj = {
  documentElement: { lang: 'en', dir: 'ltr' },
  querySelectorAll: () => [],
  getElementById: () => null,
  body: null
};

// Execute i18n.js in a safe context to get ElaraI18n instance
const vm = require('vm');
const sandbox = {
  window: windowObj,
  document: documentObj,
  console: console,
  localStorage: { getItem: () => null, setItem: () => null },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  CustomEvent: function() {},
  NodeFilter: { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2, FILTER_SKIP: 3 }
};
vm.createContext(sandbox);

try {
  vm.runInContext(i18nCode, sandbox);
} catch (e) {
  console.error("Failed to run i18n in sandbox:", e);
}

const i18n = sandbox.window.ElaraI18n;
console.log("Loaded i18n manager:", !!i18n);

// Switch language to Hindi in sandbox
i18n.currentLang = 'hi';

// Clean HTML to extract actual text elements
// Remove scripts, styles, comments, and material symbols
let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
clean = clean.replace(/<!--[\s\S]*?-->/g, '');
clean = clean.replace(/<span\s+class="[^"]*material-symbols-outlined[^"]*"[^>]*>[^<]*<\/span>/gi, '');

// Collect all text between tags
const tagTextRegex = />([^<]+)</g;
let m;
const missingTexts = new Map();
let totalTexts = 0;

while ((m = tagTextRegex.exec(clean)) !== null) {
  const raw = m[1].trim();
  if (!raw) continue;
  // Ignore pure numbers, punctuation, icons
  if (!/[a-zA-Z]{2,}/.test(raw)) continue;
  
  // Ignore known acronyms
  if (/^(ELARA|ABDM|ABHA|FHIR|SNOMED|ICD-11|WHO|CDSCO|BP|HR|SpO2|CBC|ECG|PDF|JPG|PNG|OR|IV|NS|OPD|ANC|ESI|NMC|MCI|NUID|ANM|CMO|DHH|PHC|PSU|HAL|IDPL|KAPL|PMBJP|USD|INR)$/i.test(raw)) {
    continue;
  }

  const translated = i18n.translateRawText(raw);
  const remainingEnglish = translated.replace(/\b(ELARA|ABDM|ABHA|FHIR|SNOMED|ICD-11|WHO|CDSCO|BP|HR|SpO2|CBC|ECG|PDF|JPG|PNG|OR|IV|NS|OPD|ANC|ESI|NMC|MCI|NUID|ANM|CMO|DHH|PHC|PSU|HAL|IDPL|KAPL|PMBJP|USD|INR|RTL|EMERG|ORD|TTS|OD|GJ|PHR)\b/gi, '').trim();
  if (translated === raw || /[a-zA-Z]{3,}/.test(remainingEnglish)) {
    // If still contains english words
    missingTexts.set(raw, (missingTexts.get(raw) || 0) + 1);
  }
}

console.log("Total visible text occurrences evaluated:", totalTexts);
console.log("Untranslated or partially translated unique strings:", missingTexts.size);

for (const [txt, count] of missingTexts.entries()) {
  console.log(`[MISSING] (${count}x): "${txt}"`);
}
