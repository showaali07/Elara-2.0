const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// Strip non-content
let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
clean = clean.replace(/<!--[\s\S]*?-->/g, '');
clean = clean.replace(/<span\s+class="[^"]*material-symbols-outlined[^"]*"[^>]*>[^<]*<\/span>/gi, '');

const textRegex = />([^<]+)</g;
let m;
const allUnique = new Set();
while ((m = textRegex.exec(clean)) !== null) {
  const s = m[1].trim();
  if (s && /[a-zA-Z]{2,}/.test(s)) {
    allUnique.add(s);
  }
}

// Attributes: placeholder and title
const phRegex = /placeholder="([^"]+)"/g;
while ((m = phRegex.exec(html)) !== null) {
  const s = m[1].trim();
  if (s && /[a-zA-Z]{2,}/.test(s)) allUnique.add(s);
}

const titleRegex = /title="([^"]+)"/g;
while ((m = titleRegex.exec(html)) !== null) {
  const s = m[1].trim();
  if (s && /[a-zA-Z]{2,}/.test(s)) allUnique.add(s);
}

console.log("Total unique strings to check:", allUnique.size);

// Read current i18n
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

const missingList = [];
for (const str of allUnique) {
  // skip language dropdown names
  if (str.includes('English') || str.includes('हिन्दी') || str.includes('বাংলা') || str.includes('ଓଡ଼ିଆ') || str.includes('RTL')) continue;
  if (/^(ELARA|ABDM|ABHA|FHIR|SNOMED|ICD-11|WHO|CDSCO|BP|HR|SpO2|CBC|ECG|PDF|JPG|PNG|OR|IV|NS|OPD|ANC|ESI|NMC|MCI|NUID|ANM|CMO|DHH|PHC|PSU|HAL|IDPL|KAPL|PMBJP|USD|INR)$/i.test(str)) continue;

  const tr = i18n.translateRawText(str);
  if (tr === str || /[a-zA-Z]{3,}/.test(tr)) {
    missingList.push(str);
  }
}

console.log("Total strictly missing strings from index.html:", missingList.length);
fs.writeFileSync(path.join(__dirname, 'missing_index_strings.json'), JSON.stringify(missingList, null, 2));
console.log("Saved to scratch/missing_index_strings.json");
