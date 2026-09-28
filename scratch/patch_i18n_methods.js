const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'js', 'i18n.js');
let content = fs.readFileSync(i18nPath, 'utf8');

// Replace I18nManager methods with full implementation
const targetStart = "    /**\n     * Translates a semantic key or raw English string with fallback and interpolation";
const targetEnd = "    /**\n     * Automated Audit Development Check:";

const startIndex = content.indexOf(targetStart);
const endIndex = content.indexOf(targetEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find start or end index for I18nManager methods patch", startIndex, endIndex);
  process.exit(1);
}

const newMethods = `    /**
     * Resolves dot notation path on object (e.g. 'home.title' on { home: { title: '...' } })
     */
    resolveKey(obj, path) {
      if (!obj || typeof obj !== "object") return undefined;
      if (obj[path] !== undefined) return obj[path];
      const parts = String(path).split(".");
      let curr = obj;
      for (const p of parts) {
        if (curr && typeof curr === "object" && curr[p] !== undefined) {
          curr = curr[p];
        } else {
          return undefined;
        }
      }
      return curr;
    }

    /**
     * Translates a semantic key or raw English string with fallback and parameter interpolation
     * Examples:
     * - t('home.title')
     * - t('order.arrivalTime', { time: 15 })
     * - t('welcome')
     * - t('trackOrder')
     * - t('emergency')
     */
    t(keyOrText, params = {}) {
      if (!keyOrText) return "";
      const trimmed = String(keyOrText).trim();

      let text;
      if (this.currentLang === "hi") {
        // 1. Direct or dot-path lookup in translations.hi
        text = this.resolveKey(this.translations.hi, keyOrText);
        // 2. Direct lookup in textMapHi
        if (text === undefined) {
          if (this.textMapHi[keyOrText] !== undefined) {
            text = this.textMapHi[keyOrText];
          } else if (this.textMapHi[trimmed] !== undefined) {
            text = this.textMapHi[trimmed];
          } else {
            text = this.translateRawText(keyOrText);
          }
        }
        // 3. Fallback to English
        if (text === undefined || text === keyOrText) {
          const enVal = this.resolveKey(this.translations.en, keyOrText);
          if (enVal !== undefined) text = enVal;
        }
      } else {
        // Non-Hindi: check active language dictionary, then fallback to English
        const activeDict = this.translations[this.currentLang] || {};
        text = this.resolveKey(activeDict, keyOrText);
        if (text === undefined) {
          text = this.resolveKey(this.translations.en, keyOrText);
        }
        if (text === undefined) text = keyOrText;
      }

      // Interpolate parameters like {time} or \${time}
      if (typeof text === "string" && params && Object.keys(params).length > 0) {
        for (const [pKey, pVal] of Object.entries(params)) {
          text = text.replace(new RegExp(\`\\\\{\\\\s*\${pKey}\\\\s*\\\\}\`, "g"), pVal);
          text = text.replace(new RegExp(\`\\\\$\\\\{\\\\s*\${pKey}\\\\s*\\\\}\`, "g"), pVal);
        }
      }

      return text !== undefined ? text : keyOrText;
    }

    /**
     * Translates a raw English string to Hindi if active language is Hindi,
     * with comprehensive regex pattern matchers for dynamic content.
     */
    translateRawText(rawText) {
      if (!rawText) return rawText;
      if (this.currentLang !== "hi") return rawText;

      const trimmed = String(rawText).trim();
      if (!trimmed) return rawText;

      // 1. Direct match in textMapHi
      if (this.textMapHi[trimmed]) {
        return this.textMapHi[trimmed];
      }
      if (this.textMapHi[rawText]) {
        return this.textMapHi[rawText];
      }

      // 2. Check base dictionary
      const resolvedHi = this.resolveKey(this.translations.hi, trimmed);
      if (resolvedHi && typeof resolvedHi === "string") {
        return resolvedHi;
      }

      // 3. Match with leading emoji/symbol prefix
      const emojiMatch = trimmed.match(/^([\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\u2600-\\u27BF]|[^a-zA-Z0-9\\s])\\s*(.+)$/);
      if (emojiMatch) {
        const prefix = emojiMatch[1];
        const rest = emojiMatch[2].trim();
        if (this.textMapHi[rest]) {
          return prefix + " " + this.textMapHi[rest];
        }
        const transRest = this.translateRawText(rest);
        if (transRest !== rest) {
          return prefix + " " + transRest;
        }
      }

      // 4. Dynamic Patterns
      // "Wait: 12 min" -> "प्रतीक्षा: १२ मिनट"
      const waitMatch = trimmed.match(/^(?:Wait|⏱️\\s*Wait):?\\s*(\\d+)\\s*(?:min|mins|minutes)$/i);
      if (waitMatch) {
        return \`⏱️ प्रतीक्षा: \${waitMatch[1]} मिनट\`;
      }

      // "Found X Results:" -> "X परिणाम मिले:"
      const foundMatch = trimmed.match(/^Found\\s+(\\d+)\\s+Results:?$/i);
      if (foundMatch) {
        return \`\${foundMatch[1]} परिणाम मिले:\`;
      }

      // "Your order will arrive in X minutes"
      const arriveMatch = trimmed.match(/^(?:Your\\s+order\\s+will\\s+arrive\\s+in|Estimated\\s+Arrival:?)\\s*(\\d+)\\s*(?:min|mins|minutes)$/i);
      if (arriveMatch) {
        return \`आपका ऑर्डर \${arriveMatch[1]} मिनट में पहुँचेगा\`;
      }

      // "X min" / "X mins"
      const minMatch = trimmed.match(/^(\\d+)\\s*(?:min|mins|minutes)$/i);
      if (minMatch) {
        return \`\${minMatch[1]} मिनट\`;
      }

      // "X Cases" / "X cases"
      const casesMatch = trimmed.match(/^(\\d+)\\s+Cases$/i);
      if (casesMatch) {
        return \`\${casesMatch[1]} मामले\`;
      }

      // "X Verified"
      const verMatch = trimmed.match(/^(\\d+)\\s+Verified$/i);
      if (verMatch) {
        return \`\${verMatch[1]} सत्यापित\`;
      }

      // "X tasks active"
      const taskMatch = trimmed.match(/^(\\d+)\\s+tasks\\s+active$/i);
      if (taskMatch) {
        return \`\${taskMatch[1]} कार्य सक्रिय\`;
      }

      // "Step X of Y Processing"
      const stepMatch = trimmed.match(/^Step\\s+(\\d+)\\s+of\\s+(\\d+)\\s+Processing$/i);
      if (stepMatch) {
        return \`चरण \${stepMatch[1]} / \${stepMatch[2]} प्रसंस्करण\`;
      }

      // "Price: ₹X (MRP: ₹Y • Z% OFF)"
      const priceMatch = trimmed.match(/^Price:\\s*₹(\\d+)\\s*\\(MRP:\\s*₹(\\d+)\\s*•\\s*(\\d+)%\\s*OFF\\)$/i);
      if (priceMatch) {
        return \`मूल्य: ₹\${priceMatch[1]} (एमआरपी: ₹\${priceMatch[2]} • \${priceMatch[3]}% छूट)\`;
      }

      // "Total Saved: ₹X (Y%)"
      const savedMatch = trimmed.match(/^Total\\s+Saved:\\s*₹(\\d+)\\s*\\((\\d+)%\\)$/i);
      if (savedMatch) {
        return \`कुल बचत: ₹\${savedMatch[1]} (\${savedMatch[2]}%)\`;
      }

      // "You save X% compared to commercial branded equivalent"
      const saveEquivMatch = trimmed.match(/^You\\s+save\\s+(\\d+)%\\s+compared\\s+to\\s+commercial\\s+branded\\s+equivalent$/i);
      if (saveEquivMatch) {
        return \`व्यावसायिक ब्रांडेड दवा की तुलना में आपकी \${saveEquivMatch[1]}% बचत होगी\`;
      }

      // "Savings: X% off commercial MRP"
      const savMrpMatch = trimmed.match(/^Savings:\\s*(\\d+)%\\s*off\\s*commercial\\s*MRP$/i);
      if (savMrpMatch) {
        return \`बचत: व्यावसायिक एमआरपी से \${savMrpMatch[1]}% छूट\`;
      }

      // "X% OFF"
      const offMatch = trimmed.match(/^(\\d+)%\\s*OFF$/i);
      if (offMatch) {
        return \`\${offMatch[1]}% छूट\`;
      }

      // "₹X each"
      const eachMatch = trimmed.match(/^₹(\\d+)\\s+each$/i);
      if (eachMatch) {
        return \`₹\${eachMatch[1]} प्रति दवा\`;
      }

      // "Strip of X Tablets"
      const tabMatch = trimmed.match(/^Strip\\s+of\\s+(\\d+)\\s+Tablets$/i);
      if (tabMatch) {
        return \`\${tabMatch[1]} गोलियों की स्ट्रिप\`;
      }

      // "Strip of X Capsules"
      const capMatch = trimmed.match(/^Strip\\s+of\\s+(\\d+)\\s+Capsules$/i);
      if (capMatch) {
        return \`\${capMatch[1]} कैप्सूल की स्ट्रिप\`;
      }

      // "Order #ORD-XXXX"
      const ordMatch = trimmed.match(/^Order\\s+#([A-Z0-9\\-]+)$/i);
      if (ordMatch) {
        return \`ऑर्डर #\${ordMatch[1]}\`;
      }

      // "Status: X • Total: ₹Y"
      const statMatch = trimmed.match(/^Status:\\s*([^•]+)\\s*•\\s*Total:\\s*₹(\\d+)$/i);
      if (statMatch) {
        const sTr = this.translateRawText(statMatch[1].trim());
        return \`स्थिति: \${sTr} • कुल: ₹\${statMatch[2]}\`;
      }

      // "Placed: X • Delivery ETA: Y"
      const placedMatch = trimmed.match(/^Placed:\\s*([^•]+)\\s*•\\s*Delivery\\s+ETA:\\s*(.+)$/i);
      if (placedMatch) {
        const etaTr = this.translateRawText(placedMatch[2].trim());
        return \`ऑर्डर दिनांक: \${placedMatch[1].trim()} • डिलीवरी समय: \${etaTr}\`;
      }

      // "Delivery ETA: X"
      const etaSingleMatch = trimmed.match(/^Delivery\\s+ETA:\\s*(.+)$/i);
      if (etaSingleMatch) {
        return \`डिलीवरी समय: \${this.translateRawText(etaSingleMatch[1].trim())}\`;
      }

      // "Welcome back, {name}"
      const wbMatch = trimmed.match(/^Welcome\\s+back,\\s*(.+)$/i);
      if (wbMatch) {
        return \`वापसी पर स्वागत है, \${wbMatch[1]}\`;
      }

      // "Welcome, {name}! Triage Portal ready."
      const wprMatch = trimmed.match(/^Welcome,\\s*(.+?)!\\s*Triage\\s+Portal\\s+ready\\.$/i);
      if (wprMatch) {
        return \`स्वागत है, \${wprMatch[1]}! ट्राइएज पोर्टल तैयार है।\`;
      }

      // "Account created for {name}! Logged in."
      const accMatch = trimmed.match(/^Account\\s+created\\s+for\\s*(.+?)!\\s*Logged\\s+in\\.$/i);
      if (accMatch) {
        return \`\${accMatch[1]} के लिए खाता बनाया गया! लॉग इन किया गया।\`;
      }

      // "{name} added to cart!"
      const addCartMatch = trimmed.match(/^(.+?)\\s+added\\s+to\\s+cart!$/i);
      if (addCartMatch) {
        return \`\${addCartMatch[1]} को कार्ट में जोड़ा गया!\`;
      }

      // "Listening in {lang}..."
      const listenMatch = trimmed.match(/^Listening\\s+in\\s*(.+?)\\.\\.\\.$/i);
      if (listenMatch) {
        return \`\${listenMatch[1]} में सुन रहे हैं...\`;
      }

      // "Dialing {number} Emergency Center..."
      const dialMatch = trimmed.match(/^Dialing\\s+(.+?)\\s+Emergency\\s+Center\\.\\.\\.$/i);
      if (dialMatch) {
        return \`\${dialMatch[1]} आपातकालीन केंद्र पर कॉल की जा रही है...\`;
      }

      // "Referral token {token} sent to Doctor console!"
      const refMatch = trimmed.match(/^Referral\\s+token\\s*(.+?)\\s*sent\\s+to\\s+Doctor\\s+console!$/i);
      if (refMatch) {
        return \`रेफरल टोकन \${refMatch[1]} डॉक्टर कंसोल पर भेजा गया!\`;
      }

      // "Resolved missing clinical info: {type}"
      const resMatch = trimmed.match(/^Resolved\\s+missing\\s+clinical\\s+info:\\s*(.+)$/i);
      if (resMatch) {
        return \`छूटी हुई क्लिनिकल जानकारी हल की गई: \${resMatch[1]}\`;
      }

      // "Loaded preset audio: {title}"
      const prMatch = trimmed.match(/^Loaded\\s+preset\\s+audio:\\s*(.+)$/i);
      if (prMatch) {
        return \`प्रारंभिक ऑडियो लोड किया गया: \${prMatch[1]}\`;
      }

      // "Toggled symptom: {name}"
      const sympMatch = trimmed.match(/^Toggled\\s+symptom:\\s*(.+)$/i);
      if (sympMatch) {
        return \`लक्षण चुना गया: \${sympMatch[1]}\`;
      }

      // "Loaded sample report: {name}"
      const repMatch = trimmed.match(/^Loaded\\s+sample\\s+report:\\s*(.+)$/i);
      if (repMatch) {
        return \`नमूना रिपोर्ट लोड की गई: \${repMatch[1]}\`;
      }

      // "No matching results found for \\"{query}\\""
      const noResMatch = trimmed.match(/^No\\s+matching\\s+results\\s+found\\s+for\\s*"([^"]*)"$/i);
      if (noResMatch) {
        return \`"\${noResMatch[1]}" के लिए कोई परिणाम नहीं मिला\`;
      }

      // "No medicines found matching \\"{query}\\""
      const noMedMatch = trimmed.match(/^No\\s+medicines\\s+found\\s+matching\\s*"([^"]*)"$/i);
      if (noMedMatch) {
        return \`"\${noMedMatch[1]}" से मेल खाती कोई दवा नहीं मिली\`;
      }

      // "Current Rating: {r}/10 ({desc})"
      const rateMatch = trimmed.match(/^Current\\s+Rating:\\s*(\\d+)\\/10\\s*\\(([^)]+)\\)$/i);
      if (rateMatch) {
        const descTr = this.translateRawText(rateMatch[2].trim());
        return \`वर्तमान रेटिंग: \${rateMatch[1]}/10 (\${descTr})\`;
      }

      // "Model: {model} • Latency: {latency}"
      const modelMatch = trimmed.match(/^Model:\\s*([^•]+)\\s*•\\s*Latency:\\s*(.+)$/i);
      if (modelMatch) {
        return \`मॉडल: \${modelMatch[1].trim()} • विलंबता: \${modelMatch[2].trim()}\`;
      }

      return rawText;
    }

    /**
     * Switch language throughout the entire application
     */
    setLanguage(langCode) {
      if (!this.languages[langCode]) {
        console.warn(\`[i18n] Language \${langCode} not supported. Defaulting to English.\`);
        langCode = "en";
      }

      this.currentLang = langCode;

      // Persist language selection
      if (window.ElaraStorage && typeof window.ElaraStorage.setLanguage === "function") {
        window.ElaraStorage.setLanguage(langCode);
      }
      try {
        localStorage.setItem("elara_v2_language", JSON.stringify(langCode));
      } catch (e) {}

      // 1. Apply translations across entire DOM immediately
      this.applyToDOM();

      // 2. Re-render dynamic components in app if available
      try {
        if (window.ElaraPharmacy) {
          if (typeof window.ElaraPharmacy.renderCatalogGrid === "function") {
            window.ElaraPharmacy.renderCatalogGrid();
          }
          if (typeof window.ElaraPharmacy.renderCartModal === "function") {
            window.ElaraPharmacy.renderCartModal();
          }
          if (typeof window.ElaraPharmacy.renderOrderTracking === "function") {
            window.ElaraPharmacy.renderOrderTracking();
          }
        }
        if (window.elaraApp) {
          if (typeof window.elaraApp.renderQueueList === "function") {
            window.elaraApp.renderQueueList();
          }
          if (typeof window.elaraApp.renderWorkstationViews === "function") {
            window.elaraApp.renderWorkstationViews();
          }
          if (typeof window.elaraApp.loadProfileIntoForm === "function") {
            window.elaraApp.loadProfileIntoForm();
          }
          if (typeof window.elaraApp.loadSettingsIntoUI === "function") {
            window.elaraApp.loadSettingsIntoUI();
          }
        }
      } catch (e) {
        console.warn("[i18n] Error re-rendering dynamic components:", e);
      }

      // 3. Re-run DOM translation to catch any freshly rendered elements
      this.applyToDOM();
      setTimeout(() => this.applyToDOM(), 50);

      // 4. Trigger custom event for external listeners
      window.dispatchEvent(new CustomEvent("elara:languageChanged", {
        detail: {
          language: langCode,
          meta: this.languages[langCode]
        }
      }));

      // 5. User feedback toast
      if (window.showToast) {
        const langObj = this.languages[langCode];
        const toastMsg = langCode === "hi" 
          ? \`भाषा हिन्दी (Hindi) में सेट की गई\`
          : \`Language set to \${langObj.nativeName} (\${langObj.name})\`;
        window.showToast(toastMsg, "🌐");
      }

      return this.currentLang;
    }

    /**
     * Apply active language translations to all elements in DOM
     */
    applyToDOM(root = document.body) {
      if (!root) return;
      const isHindi = this.currentLang === "hi";
      const langMeta = this.getCurrentLanguageMeta();

      // 1. Update <html> tag attributes
      if (document.documentElement) {
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = langMeta.rtl ? "rtl" : "ltr";
      }

      // 2. Translate explicit [data-i18n] nodes
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (key) {
          this.setElementTextPreservingIcons(el, this.t(key));
        }
      });

      // 3. Translate placeholders: [data-i18n-placeholder] and raw [placeholder]
      document.querySelectorAll("input, textarea").forEach(el => {
        if (!el.__origPlaceholder) {
          el.__origPlaceholder = el.getAttribute("placeholder") || "";
        }
        if (el.__origPlaceholder) {
          const key = el.getAttribute("data-i18n-placeholder");
          const trans = key ? this.t(key) : this.translateRawText(el.__origPlaceholder);
          el.setAttribute("placeholder", isHindi ? trans : el.__origPlaceholder);
        }
      });

      // 4. Translate titles / tooltips: [data-i18n-title] and raw [title]
      document.querySelectorAll("[title]").forEach(el => {
        if (!el.__origTitle) {
          el.__origTitle = el.getAttribute("title") || "";
        }
        if (el.__origTitle) {
          const key = el.getAttribute("data-i18n-title");
          const trans = key ? this.t(key) : this.translateRawText(el.__origTitle);
          el.setAttribute("title", isHindi ? trans : el.__origTitle);
        }
      });

      // 5. Translate <option> elements in dropdown selects
      document.querySelectorAll("option").forEach(el => {
        // Skip language selector option labels itself so user can always identify their native language
        if (el.closest("#topLangSelector") || el.closest("#menuLangSelector") || el.closest(".elara-lang-select")) {
          return;
        }
        if (!el.__origText) {
          el.__origText = el.textContent.trim();
        }
        if (el.__origText) {
          const trans = this.translateRawText(el.__origText);
          el.textContent = isHindi ? trans : el.__origText;
        }
      });

      // 6. Deep walk all text nodes across root
      this.translateDOMTextNodes(root, isHindi);

      // 7. Update language UI selectors & badges
      this.updateLanguageUIElements();
    }

    /**
     * Safely updates text of an element without overwriting Material Symbol icon child
     */
    setElementTextPreservingIcons(el, newText) {
      const icon = el.querySelector(".material-symbols-outlined");
      if (icon) {
        let textFound = false;
        Array.from(el.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
            node.nodeValue = " " + newText + " ";
            textFound = true;
          }
        });
        if (!textFound) {
          let span = el.querySelector(".i18n-text-span");
          if (!span) {
            span = document.createElement("span");
            span.className = "i18n-text-span";
            el.appendChild(span);
          }
          span.textContent = " " + newText;
        }
      } else {
        el.textContent = newText;
      }
    }

    /**
     * Traverses all text nodes in the DOM and translates/restores them
     */
    translateDOMTextNodes(root, isHindi) {
      if (!root) return;
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;

            const tag = parent.tagName;
            if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "CODE" || tag === "PRE") {
              return NodeFilter.FILTER_REJECT;
            }

            // Strictly protect Material Symbols icon ligatures!
            if (parent.classList.contains("material-symbols-outlined") || parent.closest(".material-symbols-outlined")) {
              return NodeFilter.FILTER_REJECT;
            }

            // Ignore elements marked as notranslate
            if (parent.classList.contains("notranslate")) {
              return NodeFilter.FILTER_REJECT;
            }

            // Ignore language selector options
            if (parent.closest("#topLangSelector") || parent.closest("#menuLangSelector") || parent.closest(".elara-lang-select")) {
              return NodeFilter.FILTER_REJECT;
            }

            const val = node.nodeValue.trim();
            // Skip empty or pure numbers/symbols
            if (!val || /^[0-9\\s\\.,;:!\\?\\/\\\\|\\-_=\\+\\*\\(\\)\\[\\]\\{\\}\\<\\>@#\\$%\\^&•✓○→↓↑←₹%°]+$/.test(val)) {
              return NodeFilter.FILTER_SKIP;
            }

            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      let textNode;
      while ((textNode = walker.nextNode())) {
        // Cache original English text on first pass
        if (textNode.__origText === undefined) {
          textNode.__origText = textNode.nodeValue.trim();
          const matchPrefix = textNode.nodeValue.match(/^\\s*/);
          const matchSuffix = textNode.nodeValue.match(/\\s*$/);
          textNode.__prefixWs = matchPrefix ? matchPrefix[0] : "";
          textNode.__suffixWs = matchSuffix ? matchSuffix[0] : "";
        }

        const original = textNode.__origText;
        if (!original) continue;

        if (isHindi) {
          const translated = this.translateRawText(original);
          if (translated && translated !== original) {
            textNode.nodeValue = textNode.__prefixWs + translated + textNode.__suffixWs;
          }
        } else {
          // Restore English
          textNode.nodeValue = textNode.__prefixWs + original + textNode.__suffixWs;
        }
      }
    }

    /**
     * Updates active badges and language selector dropdowns
     */
    updateLanguageUIElements() {
      const badge = document.getElementById("menuCurrentLangBadge");
      if (badge) {
        const meta = this.getCurrentLanguageMeta();
        badge.textContent = \`\${meta.nativeName} (\${this.currentLang.toUpperCase()})\`;
      }

      document.querySelectorAll("[data-lang]").forEach(btn => {
        const lang = btn.getAttribute("data-lang");
        if (lang === this.currentLang) {
          btn.classList.add("active", "border-teal-600", "bg-teal-50", "text-teal-900");
          btn.classList.remove("border-slate-200", "bg-white");
        } else {
          btn.classList.remove("active", "border-teal-600", "bg-teal-50", "text-teal-900");
          btn.classList.add("border-slate-200");
        }
      });

      document.querySelectorAll(".elara-lang-select, #topLangSelector, #menuLangSelector, #patientIntakeLanguage").forEach(sel => {
        sel.value = this.currentLang;
      });
    }

    /**
     * Initializes global interceptors and mutation observers
     */
    initInterceptors() {
      // Global alert wrapper to ensure any alert() message is automatically localized
      if (typeof window !== "undefined" && window.alert) {
        const nativeAlert = window.alert;
        window.alert = (msg) => {
          const localized = this.currentLang === "hi" ? this.translateRawText(String(msg)) : msg;
          return nativeAlert.call(window, localized);
        };
      }

      // Mutation observer to automatically translate dynamic DOM nodes when Hindi is active
      if (typeof MutationObserver !== "undefined" && document.body) {
        const observer = new MutationObserver((mutations) => {
          if (this.currentLang !== "hi") return;
          for (const m of mutations) {
            if (m.addedNodes && m.addedNodes.length > 0) {
              m.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  this.applyToDOM(node);
                }
              });
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }
`;

const updated = content.slice(0, startIndex) + newMethods + content.slice(endIndex);
fs.writeFileSync(i18nPath, updated, 'utf8');
console.log("Successfully patched I18nManager methods in js/i18n.js!");
