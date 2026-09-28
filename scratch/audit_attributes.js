const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
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

// 1. Check placeholders
const phRegex = /placeholder="([^"]+)"/g;
let m;
const missingPlaceholders = new Set();
while ((m = phRegex.exec(html)) !== null) {
  const p = m[1].trim();
  const tr = i18n.translateRawText(p);
  if (tr === p && /[a-zA-Z]{3,}/.test(p)) {
    missingPlaceholders.add(p);
  }
}
console.log("Missing Placeholders:", Array.from(missingPlaceholders));

// 2. Check titles
const titleRegex = /title="([^"]+)"/g;
const missingTitles = new Set();
while ((m = titleRegex.exec(html)) !== null) {
  const t = m[1].trim();
  const tr = i18n.translateRawText(t);
  if (tr === t && /[a-zA-Z]{3,}/.test(t)) {
    missingTitles.add(t);
  }
}
console.log("Missing Titles:", Array.from(missingTitles));

// 3. Check <option> text
const optRegex = /<option[^>]*>([^<]+)<\/option>/g;
const missingOptions = new Set();
while ((m = optRegex.exec(html)) !== null) {
  const o = m[1].trim();
  if (o.includes('Hindi') || o.includes('English') || o.includes('Odia')) continue; // skip lang selector
  const tr = i18n.translateRawText(o);
  if (tr === o && /[a-zA-Z]{3,}/.test(o)) {
    missingOptions.add(o);
  }
}
console.log("Missing Options:", Array.from(missingOptions));
