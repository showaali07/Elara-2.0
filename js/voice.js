/**
 * ELARA 2.0 - VOICE & ACCESSIBILITY ENGINE
 * Provides:
 * - Text-To-Speech (TTS) using Web Speech API with BCP-47 multi-language voice binding
 * - Speech-To-Text (STT) for voice search and voice triage input fields
 * - Font scaling & accessibility contrast adjustments
 * - Accessible screen reader announcements & aria support
 */

class ElaraVoiceAccessibilityManager {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.isListening = false;
    this.recognition = null;
    this.voices = [];

    this.initSpeechRecognition();
    this.loadVoices();

    // Listen to language changes to update speech voice
    window.addEventListener("elara:languageChanged", () => {
      if (this.isSpeaking) this.stopSpeaking();
    });
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
      } catch (e) {
        console.warn("[ElaraVoice] SpeechRecognition initialization error", e);
      }
    }
  }

  // ================= 1. TEXT-TO-SPEECH (TTS) =================
  speak(text, onEndCallback = null) {
    if (!this.synth) {
      console.warn("[ElaraVoice] Web SpeechSynthesis not supported by this browser.");
      if (window.showToast) window.showToast("Speech synthesis not supported on this browser", "⚠️");
      return;
    }

    if (this.synth.speaking) {
      this.synth.cancel();
    }

    if (!text || text.trim() === "") return;

    const utterance = new SpeechSynthesisUtterance(text);
    const langCode = window.ElaraI18n ? window.ElaraI18n.getCurrentLanguage() : "en";
    const langMeta = window.ElaraI18n ? window.ElaraI18n.getCurrentLanguageMeta() : { bcp47: "en-IN" };

    utterance.lang = langMeta.bcp47 || "en-IN";

    // Set speed from user settings
    const speed = window.ElaraStorage ? window.ElaraStorage.getTtsSpeed() : 1.0;
    utterance.rate = speed || 1.0;
    utterance.pitch = 1.0;

    // Pick best matching voice
    if (this.voices.length > 0) {
      const bcp = utterance.lang.toLowerCase();
      const matched = this.voices.find(v => v.lang.toLowerCase() === bcp || v.lang.toLowerCase().startsWith(bcp.split("-")[0]));
      if (matched) utterance.voice = matched;
    }

    this.isSpeaking = true;
    this.currentUtterance = utterance;

    utterance.onstart = () => {
      this.isSpeaking = true;
      document.body.classList.add("tts-active");
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      document.body.classList.remove("tts-active");
      if (typeof onEndCallback === "function") onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn("[ElaraVoice] TTS Error:", e);
      this.isSpeaking = false;
      document.body.classList.remove("tts-active");
    };

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      document.body.classList.remove("tts-active");
    }
  }

  toggleSpeech(text) {
    if (this.isSpeaking) {
      this.stopSpeaking();
    } else {
      this.speak(text);
    }
  }

  // ================= 2. SPEECH-TO-TEXT (STT) =================
  startListening(targetInputId, onResultCallback = null) {
    const targetInput = typeof targetInputId === "string" ? document.getElementById(targetInputId) : targetInputId;

    if (!this.recognition) {
      // Fallback voice prompt for browsers without Web Speech API
      const fallbackPrompt = prompt("Voice Input Simulation: Enter your speech transcript:");
      if (fallbackPrompt && targetInput) {
        targetInput.value = fallbackPrompt;
        targetInput.dispatchEvent(new Event("input", { bubbles: true }));
        if (typeof onResultCallback === "function") onResultCallback(fallbackPrompt);
      }
      return;
    }

    if (this.isListening) {
      this.stopListening();
      return;
    }

    const langMeta = window.ElaraI18n ? window.ElaraI18n.getCurrentLanguageMeta() : { bcp47: "en-IN" };
    this.recognition.lang = langMeta.bcp47 || "en-IN";

    this.isListening = true;
    if (window.showToast) {
      window.showToast(`Listening in ${langMeta.nativeName || "English"}...`, "🎙️");
    }

    // Add listening visual indicators
    document.body.classList.add("stt-listening");
    const micButtons = document.querySelectorAll(".voice-input-btn");
    micButtons.forEach(btn => btn.classList.add("listening", "animate-pulse", "bg-red-500", "text-white"));

    this.recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const text = finalTranscript || interimTranscript;
      if (targetInput && text) {
        targetInput.value = text;
        targetInput.dispatchEvent(new Event("input", { bubbles: true }));
      }

      if (finalTranscript && typeof onResultCallback === "function") {
        onResultCallback(finalTranscript);
      }
    };

    this.recognition.onerror = (e) => {
      console.warn("[ElaraVoice] STT Error:", e.error);
      this.stopListening();
      if (window.showToast) window.showToast("Voice recognition stopped", "🎙️");
    };

    this.recognition.onend = () => {
      this.stopListening();
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn("[ElaraVoice] Could not start recognition:", e);
      this.stopListening();
    }
  }

  stopListening() {
    this.isListening = false;
    document.body.classList.remove("stt-listening");
    const micButtons = document.querySelectorAll(".voice-input-btn");
    micButtons.forEach(btn => btn.classList.remove("listening", "animate-pulse", "bg-red-500", "text-white"));

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }

  // ================= 3. ACCESSIBILITY CONTROLS =================
  setFontScale(scale) {
    // scale: 'normal' | 'large' | 'xlarge'
    document.documentElement.classList.remove("font-scale-normal", "font-scale-large", "font-scale-xlarge");
    document.documentElement.classList.add(`font-scale-${scale}`);
    if (window.ElaraStorage) {
      window.ElaraStorage.setFontScale(scale);
    }
  }

  setHighContrast(enable) {
    if (enable) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
    if (window.ElaraStorage) {
      window.ElaraStorage.setItem("highContrast", enable);
    }
  }
}

// Global Singleton Instance
window.ElaraVoice = new ElaraVoiceAccessibilityManager();
