global.window = global;
global.window.addEventListener = () => {};
global.document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  documentElement: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } },
  body: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } }
};
global.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] || null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; },
  clear() { this._data = {}; }
};

try {
  console.log("Loading js/storage.js...");
  require("../js/storage.js");
  console.log("Loading js/i18n.js...");
  require("../js/i18n.js");
  console.log("Loading js/api.js...");
  require("../js/api.js");
  console.log("Loading js/voice.js...");
  require("../js/voice.js");
  console.log("Loading js/medicines.js...");
  require("../js/medicines.js");
  console.log("Loading js/emergency.js...");
  require("../js/emergency.js");
  console.log("Loading js/data.js...");
  require("../js/data.js");
  console.log("Loading js/audio-sim.js...");
  require("../js/audio-sim.js");
  console.log("Loading js/triage-engine.js...");
  require("../js/triage-engine.js");
  console.log("Loading js/app.js...");
  require("../js/app.js");

  console.log("\n=== ALL SCRIPTS LOADED CLEANLY WITHOUT CRASH ===");
  console.log("ElaraStorage exists:", !!window.ElaraStorage);
  console.log("ElaraI18n exists:", !!window.ElaraI18n);
  console.log("ElaraAPI exists:", !!window.ElaraAPI);
  console.log("ElaraVoice exists:", !!window.ElaraVoice);
  console.log("ElaraPharmacy exists:", !!window.ElaraPharmacy);
  console.log("ElaraEmergency exists:", !!window.ElaraEmergency);
  console.log("ElaraApp class exists:", typeof ElaraApp);
} catch (e) {
  console.error("CRASH ON SCRIPT LOAD:", e);
}
