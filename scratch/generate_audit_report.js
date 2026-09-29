const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");

// Split by screens
const screens = {};
const screenRegex = /<section\b[^>]*id=["'](screen-[^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi;
let match;
while ((match = screenRegex.exec(html)) !== null) {
  screens[match[1]] = match[2];
}

const report = {
  screens: {},
  globalElements: {
    topbarButtons: [],
    flowStepButtons: [],
    bottomNavButtons: [],
    modals: []
  },
  unhandledItems: []
};

// Check screens
for (const [screenId, content] of Object.entries(screens)) {
  const buttons = [...content.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)].map(b => {
    const text = b[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 50);
    const onclick = (b[1].match(/onclick=["']([^"']*)["']/i) || [])[1];
    const id = (b[1].match(/id=["']([^"']*)["']/i) || [])[1];
    const disabled = /\bdisabled\b/i.test(b[1]);
    const type = (b[1].match(/type=["']([^"']*)["']/i) || [])[1];
    return { text, onclick, id, disabled, type };
  });

  const selects = [...content.matchAll(/<select\b([^>]*)>([\s\S]*?)<\/select>/gi)].map(s => {
    const id = (s[1].match(/id=["']([^"']*)["']/i) || [])[1];
    const onchange = (s[1].match(/onchange=["']([^"']*)["']/i) || [])[1];
    const options = [...s[2].matchAll(/<option\b[^>]*>([\s\S]*?)<\/option>/gi)].map(o => o[1].trim());
    return { id, onchange, options };
  });

  const inputs = [...content.matchAll(/<input\b([^>]*)>/gi)].map(inp => {
    const type = (inp[1].match(/type=["']([^"']*)["']/i) || [])[1] || "text";
    const id = (inp[1].match(/id=["']([^"']*)["']/i) || [])[1];
    const name = (inp[1].match(/name=["']([^"']*)["']/i) || [])[1];
    const placeholder = (inp[1].match(/placeholder=["']([^"']*)["']/i) || [])[1];
    const onchange = (inp[1].match(/onchange=["']([^"']*)["']/i) || [])[1];
    const oninput = (inp[1].match(/oninput=["']([^"']*)["']/i) || [])[1];
    const onclick = (inp[1].match(/onclick=["']([^"']*)["']/i) || [])[1];
    return { type, id, name, placeholder, onchange, oninput, onclick };
  });

  // Track unhandled buttons
  buttons.forEach(b => {
    if (!b.onclick && b.type !== "submit") {
      report.unhandledItems.push({ screen: screenId, type: "button", text: b.text, id: b.id });
    }
  });

  // Track unhandled selects
  selects.forEach(s => {
    if (!s.onchange && !s.id) {
      report.unhandledItems.push({ screen: screenId, type: "select", options: s.options });
    }
  });

  report.screens[screenId] = {
    buttonCount: buttons.length,
    buttons,
    selects,
    inputs
  };
}

fs.writeFileSync("scratch/audit_report.json", JSON.stringify(report, null, 2), "utf8");
console.log("Audit report written. Unhandled items count:", report.unhandledItems.length);
console.log("Unhandled items:", JSON.stringify(report.unhandledItems, null, 2));
