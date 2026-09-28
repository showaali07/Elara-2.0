const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const i18nContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'i18n.js'), 'utf8');

// We can extract textMapHi and TRANSLATIONS from i18n.js using a small sandbox or regex
let textMapHi = {};
let translationsHi = {};

try {
  // Extract textMapHi object
  const mapMatch = i18nContent.match(/const HINDI_TEXT_MAP\s*=\s*(\{[\s\S]*?\n\s*\};)/);
  if (mapMatch) {
    eval('textMapHi = ' + mapMatch[1]);
  } else {
    // Check if it's assigned to this.textMapHi or similar
    const mapMatch2 = i18nContent.match(/this\.textMapHi\s*=\s*(\{[\s\S]*?\n\s*\};)/);
    if (mapMatch2) {
      eval('textMapHi = ' + mapMatch2[1]);
    }
  }
} catch (e) {
  console.error("Error parsing textMapHi:", e.message);
}

console.log("textMapHi keys count:", Object.keys(textMapHi).length);

// Remove script and style tags first
let cleanHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
cleanHtml = cleanHtml.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
// Remove material symbols
cleanHtml = cleanHtml.replace(/<span\s+class="[^"]*material-symbols-outlined[^"]*"[^>]*>[^<]*<\/span>/gi, '');
// Remove comments
cleanHtml = cleanHtml.replace(/<!--[\s\S]*?-->/g, '');

const textRegex = />([^<]+)</g;
let match;
const allTexts = new Set();
while ((match = textRegex.exec(cleanHtml)) !== null) {
  const str = match[1].trim();
  if (str && /[a-zA-Z]{3,}/.test(str)) {
    allTexts.add(str);
  }
}

console.log("Total unique user-visible text strings in index.html with 3+ English letters:", allTexts.size);

let untranslated = [];
for (const txt of allTexts) {
  if (!textMapHi[txt]) {
    const emojiMatch = txt.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|[^a-zA-Z0-9\s])\s*(.+)$/);
    const rest = emojiMatch ? emojiMatch[2].trim() : txt;
    if (!textMapHi[rest]) {
      untranslated.push(txt);
    }
  }
}

console.log("Untranslated count in index.html:", untranslated.length);
console.log("First 30 untranslated strings:\n", untranslated.slice(0, 30));
