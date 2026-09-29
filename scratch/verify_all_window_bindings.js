const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");

const jsFiles = [
  "js/storage.js",
  "js/i18n.js",
  "js/api.js",
  "js/voice.js",
  "js/medicines.js",
  "js/emergency.js",
  "js/data.js",
  "js/audio-sim.js",
  "js/triage-engine.js",
  "js/app.js"
];

let allJs = "";
jsFiles.forEach(f => {
  if (fs.existsSync(f)) {
    allJs += "\n" + fs.readFileSync(f, "utf8");
  }
});

// Find all window.<something> assignments in JS
const assignedOnWindow = new Set();
const winAssignRegex = /window\.([a-zA-Z0-9_$]+)\s*=/g;
let m;
while ((m = winAssignRegex.exec(allJs)) !== null) {
  assignedOnWindow.add(m[1]);
}

// Global functions
const globalFnRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
while ((m = globalFnRegex.exec(allJs)) !== null) {
  assignedOnWindow.add(m[1]);
}

console.log(`Total assigned globals/window properties: ${assignedOnWindow.size}`);

// Find all calls in index.html like window.foo() or onclick="bar()"
const htmlCalls = new Set();
const onclickRegex = /onclick=["']([\s\S]*?)["']/gi;
while ((m = onclickRegex.exec(html)) !== null) {
  const code = m[1];
  // extract function identifiers
  const calls = [...code.matchAll(/(?:window\.)?([a-zA-Z0-9_$]+)\s*\(/g)].map(c => c[1]);
  calls.forEach(c => htmlCalls.add(c));
}

// Exclude built-in JS identifiers like alert, confirm, prompt, parseInt, parseFloat, setTimeout, setInterval, document
const builtins = new Set([
  "alert", "confirm", "prompt", "parseInt", "parseFloat", "setTimeout", "setInterval",
  "clearTimeout", "clearInterval", "console", "Math", "JSON", "String", "Number", "Array",
  "getElementById", "querySelector", "querySelectorAll", "close", "stopPropagation", "preventDefault",
  "if", "for", "while"
]);

const missing = [];
for (const fn of htmlCalls) {
  if (!builtins.has(fn) && !assignedOnWindow.has(fn)) {
    // Check if it's a method on an object, e.g. ElaraVoice.speak -> fn is speak, let's check
    const isMethodSomewhere = new RegExp(`\\b${fn}\\s*\\(`).test(allJs);
    missing.push({ fn, isMethodSomewhere });
  }
}

console.log("Potentially missing HTML calls (" + missing.length + "):");
missing.forEach(item => {
  console.log(` - ${item.fn} (isMethodSomewhere: ${item.isMethodSomewhere})`);
});
