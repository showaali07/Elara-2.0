const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");

// Remove screens from html to inspect the wrappers/modals/headers/drawers
const outsideScreens = html.replace(/<section\b[^>]*id=["'](screen-[^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi, "<!-- SCREEN REMOVED -->");

console.log("=== INSPECTING ELEMENTS OUTSIDE SCREENS ===");

const buttons = [...outsideScreens.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)].map(b => {
  const text = b[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 50);
  const onclick = (b[1].match(/onclick=["']([^"']*)["']/i) || [])[1];
  const id = (b[1].match(/id=["']([^"']*)["']/i) || [])[1];
  const type = (b[1].match(/type=["']([^"']*)["']/i) || [])[1];
  return { text, onclick, id, type, raw: b[1].slice(0, 80) };
});

console.log(`Buttons outside screens (${buttons.length}):`);
buttons.forEach((b, i) => {
  if (!b.onclick && b.type !== "submit") {
    console.log(`[UNHANDLED BUTTON] [${i+1}] ID: ${b.id || "none"} | Text: "${b.text}" | Attrs: ${b.raw}`);
  } else {
    // console.log(`  [${i+1}] "${b.text}" -> ${b.onclick}`);
  }
});

const selects = [...outsideScreens.matchAll(/<select\b([^>]*)>([\s\S]*?)<\/select>/gi)].map(s => {
  const id = (s[1].match(/id=["']([^"']*)["']/i) || [])[1];
  const onchange = (s[1].match(/onchange=["']([^"']*)["']/i) || [])[1];
  const options = [...s[2].matchAll(/<option\b[^>]*>([\s\S]*?)<\/option>/gi)].map(o => o[1].trim());
  return { id, onchange, options };
});

console.log(`\nSelects outside screens (${selects.length}):`);
selects.forEach((s, i) => {
  console.log(`  [${i+1}] ID: ${s.id || "none"} | onchange: ${s.onchange || "NONE"} | Options: ${s.options.join(", ")}`);
});

// Check all modals/drawers
console.log("\n=== AUDITING MODALS/DRAWERS ===");
const drawerMatches = [...html.matchAll(/id=["']([^"']*(?:modal|drawer|dialog|popup|sheet|menu)[^"']*)["']/gi)].map(m => m[1]);
console.log("Found modal/drawer IDs:", [...new Set(drawerMatches)]);
