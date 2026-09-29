const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");

const lines = html.split("\n");
lines.forEach((l, i) => {
  if (l.includes('type="radio"') || l.includes("screen-hw-review") || l.includes("screen-referral-prep")) {
    console.log((i + 1) + ": " + l.trim());
  }
});
