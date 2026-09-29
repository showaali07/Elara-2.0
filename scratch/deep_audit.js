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

let allJsCode = "";
jsFiles.forEach(f => {
  if (fs.existsSync(f)) {
    allJsCode += "\n/* " + f + " */\n" + fs.readFileSync(f, "utf8");
  }
});

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 1. Audit all `<a>` tags
console.log("=== AUDITING <a> TAGS ===");
const aRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
let aMatch;
let aCount = 0;
while ((aMatch = aRegex.exec(html)) !== null) {
  aCount++;
  const attrs = aMatch[1];
  const text = aMatch[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const href = (attrs.match(/href=["']([^"']*)["']/i) || [])[1];
  const onclick = (attrs.match(/onclick=["']([^"']*)["']/i) || [])[1];
  if (!onclick && (!href || href === "#" || href === "javascript:void(0)" || href === "javascript:;")) {
    console.log(`[DEAD LINK] Text: "${text}" | Attrs: ${attrs.slice(0, 100)}`);
  } else {
    console.log(`[LINK] Text: "${text}" | href: ${href || "none"} | onclick: ${onclick || "none"}`);
  }
}

// 2. Audit all `<select>` tags
console.log("\n=== AUDITING <select> TAGS ===");
const selectRegex = /<select\b([^>]*)>([\s\S]*?)<\/select>/gi;
let sMatch;
while ((sMatch = selectRegex.exec(html)) !== null) {
  const attrs = sMatch[1];
  const id = (attrs.match(/id=["']([^"']*)["']/i) || [])[1];
  const onchange = (attrs.match(/onchange=["']([^"']*)["']/i) || [])[1];
  console.log(`Select ID: "${id || "none"}" | onchange: "${onchange || "NONE"}" | attrs: ${attrs.slice(0, 80)}`);
}

// 3. Audit all onclick handlers in HTML
console.log("\n=== AUDITING ONCLICK HANDLERS IN HTML ===");
const onclickRegex = /onclick=["']([^"']+)["']/gi;
let ocMatch;
const rawExpressions = new Set();
while ((ocMatch = onclickRegex.exec(html)) !== null) {
  rawExpressions.add(ocMatch[1].trim());
}

for (const expr of rawExpressions) {
  // If it's a function call like `foo(...)`
  const fnMatch = expr.match(/^([a-zA-Z0-9_$.]+)\s*\(/);
  if (fnMatch) {
    const fnName = fnMatch[1];
    if (fnName.startsWith("window.")) {
      const bareName = fnName.replace("window.", "");
      // check bareName
      const isWindowProp = new RegExp(`window\\.${escapeRegExp(bareName)}\\b`).test(allJsCode);
      const isGlobalFn = new RegExp(`function\\s+${escapeRegExp(bareName)}\\b`).test(allJsCode);
      if (!isWindowProp && !isGlobalFn) {
        console.log(`[POTENTIALLY UNDEFINED] "${expr}" -> "${bareName}"`);
      }
    } else if (fnName.includes(".")) {
      // e.g. ElaraPharmacy.something
      const parts = fnName.split(".");
      const objName = parts[0];
      const isObjDefined = new RegExp(`(?:const|var|let|window\\.)\\s*${escapeRegExp(objName)}\\b`).test(allJsCode);
      if (!isObjDefined) {
        console.log(`[POTENTIALLY UNDEFINED OBJECT] "${expr}" -> "${objName}"`);
      }
    } else {
      const isFunction = new RegExp(`function\\s+${escapeRegExp(fnName)}\\b`).test(allJsCode);
      const isWindowBind = new RegExp(`window\\.${escapeRegExp(fnName)}\\s*=`).test(allJsCode);
      if (!isFunction && !isWindowBind) {
        console.log(`[POTENTIALLY UNDEFINED FUNCTION] "${expr}" -> "${fnName}"`);
      }
    }
  } else if (!expr.includes("getElementById") && !expr.includes("this.") && !expr.includes("event.")) {
    console.log(`[NON-STANDARD ONCLICK] "${expr}"`);
  }
}

// 4. Audit all cursor-pointer elements
console.log("\n=== AUDITING CURSOR-POINTER ELEMENTS ===");
const cursorPointerRegex = /<([a-z0-9]+)\b([^>]*class=["'][^"']*cursor-pointer[^"']*["'][^>]*)>([\s\S]*?)<\/\1>/gi;
let cpMatch;
let unhandledClickables = 0;
while ((cpMatch = cursorPointerRegex.exec(html)) !== null) {
  const tag = cpMatch[1];
  const attrs = cpMatch[2];
  const text = cpMatch[3].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 40);
  const hasOnclick = /onclick=["']/i.test(attrs);
  const id = (attrs.match(/id=["']([^"']*)["']/i) || [])[1];
  if (!hasOnclick && tag !== "label" && tag !== "input" && tag !== "select" && tag !== "summary") {
    const hasListener = id && new RegExp(`["']#?${escapeRegExp(id)}["']\\s*\\)\\s*\\.\\s*addEventListener`).test(allJsCode);
    if (!hasListener) {
      unhandledClickables++;
      console.log(`[UNHANDLED CLICKABLE <${tag}>] ID: "${id || "none"}" | Text: "${text}" | Attrs: ${attrs.slice(0, 80)}`);
    }
  }
}
console.log(`Total unhandled cursor-pointer elements: ${unhandledClickables}`);

// 5. Audit all forms
console.log("\n=== AUDITING FORMS ===");
const formRegex = /<form\b([^>]*)>([\s\S]*?)<\/form>/gi;
let fMatch;
while ((fMatch = formRegex.exec(html)) !== null) {
  const attrs = fMatch[1];
  const id = (attrs.match(/id=["']([^"']*)["']/i) || [])[1];
  const onsubmit = (attrs.match(/onsubmit=["']([^"']*)["']/i) || [])[1];
  const hasListener = id && new RegExp(`["']#?${escapeRegExp(id)}["']\\s*\\)\\s*\\.\\s*addEventListener`).test(allJsCode);
  console.log(`Form ID: "${id || "none"}" | onsubmit: "${onsubmit || "NONE"}" | hasListener: ${!!hasListener}`);
}
