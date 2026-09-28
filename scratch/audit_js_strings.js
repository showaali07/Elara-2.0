const fs = require('fs');
const path = require('path');

const jsFiles = ['medicines.js', 'emergency.js', 'app.js', 'data.js', 'voice.js', 'api.js'];
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

const allMissing = {};

jsFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, '..', 'js', file), 'utf8');
  // Match template strings and normal strings
  const stringRegex = /(?:`([^`]+)`|"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')/g;
  let m;
  const missing = new Set();
  while ((m = stringRegex.exec(content)) !== null) {
    const s = (m[1] || m[2] || m[3] || '').trim();
    if (!s) continue;
    // Skip code/HTML selectors, tags, CSS classes, URLs, IDs, event names
    if (s.startsWith('http') || s.startsWith('#') || s.startsWith('.') || s.startsWith('<div') || s.includes('class="') || s.length < 3) continue;
    if (/^(GET|POST|PUT|DELETE|application\/json|click|input|change|keydown|active|hidden|show)$/.test(s)) continue;
    if (!/[a-zA-Z]{3,}/.test(s)) continue;

    // Check if it's English text intended for user
    const tr = i18n.translateRawText(s);
    if (tr === s && /[a-zA-Z]{3,}/.test(s)) {
      // Ignore variable names or technical keys
      if (/^[a-z]+[A-Z][a-zA-Z0-9]*$/.test(s)) continue; // camelCase
      if (/^[A-Z0-9_\-]+$/.test(s)) continue; // CONSTANT
      if (s.includes('px') && s.length < 10) continue;
      missing.add(s);
    }
  }
  allMissing[file] = Array.from(missing);
});

console.log(JSON.stringify(allMissing, null, 2));
