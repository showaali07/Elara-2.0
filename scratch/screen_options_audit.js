const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");

// Split by screens
const screens = {};
const screenRegex = /<section\b[^>]*id=["'](screen-[^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi;
let match;
while ((match = screenRegex.exec(html)) !== null) {
  screens[match[1]] = match[2];
}

console.log("Total screens parsed:", Object.keys(screens).length);

for (const [screenId, content] of Object.entries(screens)) {
  console.log(`\n========================================`);
  console.log(`SCREEN: ${screenId}`);
  console.log(`========================================`);

  // Find all buttons
  const buttons = [...content.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)].map(b => {
    const text = b[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 35);
    const onclick = (b[1].match(/onclick=["']([^"']*)["']/i) || [])[1];
    const id = (b[1].match(/id=["']([^"']*)["']/i) || [])[1];
    const disabled = /\bdisabled\b/i.test(b[1]);
    return { text, onclick, id, disabled };
  });

  console.log(`Buttons (${buttons.length}):`);
  buttons.forEach((b, i) => {
    const status = b.onclick ? `onclick: ${b.onclick.slice(0, 35)}` : "NO ONCLICK";
    const dis = b.disabled ? " [DISABLED]" : "";
    console.log(`  [${i+1}] "${b.text}" -> ${status}${dis}`);
  });

  // Find all selects
  const selects = [...content.matchAll(/<select\b([^>]*)>([\s\S]*?)<\/select>/gi)].map(s => {
    const id = (s[1].match(/id=["']([^"']*)["']/i) || [])[1];
    const onchange = (s[1].match(/onchange=["']([^"']*)["']/i) || [])[1];
    const options = [...s[2].matchAll(/<option\b[^>]*>([\s\S]*?)<\/option>/gi)].map(o => o[1].trim());
    return { id, onchange, options };
  });

  if (selects.length > 0) {
    console.log(`Selects (${selects.length}):`);
    selects.forEach((s, i) => {
      console.log(`  [${i+1}] ID: ${s.id || "none"} | onchange: ${s.onchange || "NONE"} | Options: ${s.options.join(", ")}`);
    });
  }

  // Find all inputs
  const inputs = [...content.matchAll(/<input\b([^>]*)>/gi)].map(inp => {
    const type = (inp[1].match(/type=["']([^"']*)["']/i) || [])[1] || "text";
    const id = (inp[1].match(/id=["']([^"']*)["']/i) || [])[1];
    const placeholder = (inp[1].match(/placeholder=["']([^"']*)["']/i) || [])[1];
    const onchange = (inp[1].match(/onchange=["']([^"']*)["']/i) || [])[1];
    const oninput = (inp[1].match(/oninput=["']([^"']*)["']/i) || [])[1];
    return { type, id, placeholder, onchange, oninput };
  });

  if (inputs.length > 0) {
    console.log(`Inputs (${inputs.length}):`);
    inputs.forEach((inp, i) => {
      console.log(`  [${i+1}] type: ${inp.type} | id: ${inp.id || "none"} | ph: ${inp.placeholder || "none"} | oninput: ${inp.oninput || inp.onchange || "none"}`);
    });
  }
}
