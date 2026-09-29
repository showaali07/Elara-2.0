const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");

// Screens
const screenMatches = [...html.matchAll(/id=["'](screen-[^"']+)["']/g)].map(m => m[1]);
console.log("Screens found (" + screenMatches.length + "):");
screenMatches.forEach(s => console.log(" - " + s));

// Modals / Overlays
const modalMatches = [...html.matchAll(/id=["']([^"']*(?:modal|drawer|dialog|popup|sheet)[^"']*)["']/gi)].map(m => m[1]);
console.log("\nModals/Drawers found (" + modalMatches.length + "):");
modalMatches.forEach(m => console.log(" - " + m));

// Buttons without onclick or type="submit" or data-*
console.log("\nInspecting all <button> elements in index.html...");
const buttonRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
let bMatch;
let totalButtons = 0;
let buttonsWithoutOnclick = [];
let buttonsWithOnclick = [];

while ((bMatch = buttonRegex.exec(html)) !== null) {
  totalButtons++;
  const attrs = bMatch[1];
  const content = bMatch[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const onclickMatch = attrs.match(/onclick=["']([^"']*)["']/i);
  const idMatch = attrs.match(/id=["']([^"']*)["']/i);
  const classMatch = attrs.match(/class=["']([^"']*)["']/i);

  if (onclickMatch) {
    buttonsWithOnclick.push({
      id: idMatch ? idMatch[1] : null,
      onclick: onclickMatch[1],
      text: content.slice(0, 40)
    });
  } else {
    buttonsWithoutOnclick.push({
      id: idMatch ? idMatch[1] : null,
      class: classMatch ? classMatch[1] : null,
      text: content.slice(0, 40),
      raw: attrs.slice(0, 80)
    });
  }
}

console.log("Total buttons: " + totalButtons);
console.log("Buttons with onclick: " + buttonsWithOnclick.length);
console.log("Buttons WITHOUT onclick: " + buttonsWithoutOnclick.length);
if (buttonsWithoutOnclick.length > 0) {
  console.log("\nSample buttons without onclick:");
  buttonsWithoutOnclick.forEach((b, i) => {
    console.log(`[${i + 1}] ID: ${b.id || "none"} | Text: "${b.text}" | Attrs: ${b.raw}`);
  });
}
