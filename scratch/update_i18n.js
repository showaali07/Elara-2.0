const fs = require('fs');
const path = require('path');

const currentI18n = fs.readFileSync(path.join(__dirname, '..', 'js', 'i18n.js'), 'utf8');
const newEntries = JSON.parse(fs.readFileSync(path.join(__dirname, 'new_hindi_entries.json'), 'utf8'));

// Extract existing HINDI_TEXT_MAP
const mapMatch = currentI18n.match(/const HINDI_TEXT_MAP\s*=\s*(\{[\s\S]*?\n\s*\};)/);
if (!mapMatch) {
  console.error("Could not find HINDI_TEXT_MAP in i18n.js");
  process.exit(1);
}

let existingMap = {};
eval('existingMap = ' + mapMatch[1]);
console.log("Existing HINDI_TEXT_MAP entries count:", Object.keys(existingMap).length);

// Merge new entries
const mergedMap = Object.assign({}, existingMap, newEntries);
console.log("Merged HINDI_TEXT_MAP entries count:", Object.keys(mergedMap).length);

// Format mergedMap into JS object string
const mapStringLines = ['  const HINDI_TEXT_MAP = {'];
for (const [k, v] of Object.entries(mergedMap)) {
  mapStringLines.push(`    ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
}
mapStringLines.push('  };');
const formattedMap = mapStringLines.join('\n');

// Replace HINDI_TEXT_MAP in currentI18n
let updatedI18n = currentI18n.replace(mapMatch[0], formattedMap);

// Ensure TRANSLATIONS.en and TRANSLATIONS.hi have the hierarchical keys requested by user
const hierarchicalEn = `      // Hierarchical keys for localization engine
      home: {
        title: "ELARA 2.0",
        description: "Multimodal Clinical Triage Assistant"
      },
      order: {
        confirmation: "Order Confirmed",
        arrivalTime: "Your order will arrive in {time} minutes",
        placedSuccess: "Order Placed Successfully via Jan Aushadhi Express!"
      },
      tracking: {
        deliveryStatus: "Order Status",
        eta: "Estimated Arrival: {time}"
      },
      errors: {
        network: "Network connection lost. Offline fallback mode activated.",
        server: "Service temporarily unavailable. Please retry."
      },
      welcome: "Welcome",
      trackOrder: "Track Order",
      emergencyAssistance: "Emergency Assistance",
`;

const hierarchicalHi = `      // Hierarchical keys for localization engine
      home: {
        title: "एलारा २.०",
        description: "मल्टीमॉडल क्लिनिकल ट्राइएज सहायक"
      },
      order: {
        confirmation: "ऑर्डर की पुष्टि हुई",
        arrivalTime: "आपका ऑर्डर {time} मिनट में पहुँचेगा",
        placedSuccess: "जन औषधि एक्सप्रेस द्वारा ऑर्डर सफलतापूर्वक दर्ज किया गया!"
      },
      tracking: {
        deliveryStatus: "ऑर्डर स्थिति",
        eta: "अनुमानित आगमन: {time}"
      },
      errors: {
        network: "नेटवर्क कनेक्शन टूट गया। ऑफलाइन बैकअप मोड सक्रिय।",
        server: "सेवा अस्थायी रूप से अनुपलब्ध है। कृपया पुनः प्रयास करें।"
      },
      welcome: "स्वागत है",
      trackOrder: "ऑर्डर ट्रैक करें",
      emergencyAssistance: "आपातकालीन सहायता",
`;

// Insert after en: {
updatedI18n = updatedI18n.replace('en: {', 'en: {\n' + hierarchicalEn);
// Insert after hi: {
updatedI18n = updatedI18n.replace('hi: {', 'hi: {\n' + hierarchicalHi);

fs.writeFileSync(path.join(__dirname, '..', 'js', 'i18n.js'), updatedI18n, 'utf8');
console.log("Successfully updated js/i18n.js with merged translation dictionary and hierarchical keys!");
