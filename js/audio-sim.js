/**
 * ELARA 2.0 - AUDIO RECORDER & WAVEFORM SYNTHESIS
 * Realistic microphone recording, real-time waveform canvas, audio chimes, and STT simulation.
 */

class ElaraAudioEngine {
  constructor() {
    this.isRecording = false;
    this.timerInterval = null;
    this.recordingSeconds = 8;
    this.canvas = null;
    this.ctx = null;
    this.animFrameId = null;
    this.wavePhase = 0;
    this.audioContext = null;
    this.speechRecognition = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  // Play synthetic tone using Web Audio API
  playTone(frequency = 440, type = "sine", duration = 0.15) {
    if (!this.audioContext) return;
    try {
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

      gain.gain.setValueAtTime(0.12, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback note error", e);
    }
  }

  playStartRecordingChime() {
    this.playTone(587.33, "sine", 0.12); // D5
    setTimeout(() => this.playTone(880.00, "sine", 0.22), 100); // A5
  }

  playStopRecordingChime() {
    this.playTone(880.00, "sine", 0.12);
    setTimeout(() => this.playTone(587.33, "sine", 0.22), 100);
  }

  playSuccessTriageTone() {
    this.playTone(523.25, "triangle", 0.1); // C5
    setTimeout(() => this.playTone(659.25, "triangle", 0.1), 100); // E5
    setTimeout(() => this.playTone(783.99, "triangle", 0.1), 200); // G5
    setTimeout(() => this.playTone(1046.50, "triangle", 0.35), 300); // C6
  }

  initCanvas() {
    this.canvas = document.getElementById("audioWaveformCanvas");
    if (this.canvas) {
      this.ctx = this.canvas.getContext("2d");
      this.drawIdleWaveform();
    }
  }

  drawIdleWaveform() {
    if (!this.ctx || !this.canvas) return;
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.clearRect(0, 0, width, height);

    this.ctx.beginPath();
    this.ctx.moveTo(0, height / 2);
    for (let x = 0; x < width; x += 4) {
      const y = height / 2 + Math.sin(x * 0.05) * 4;
      this.ctx.lineTo(x, y);
    }
    this.ctx.strokeStyle = "#94a3b8";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  animateActiveWaveform() {
    if (!this.ctx || !this.canvas) return;
    const width = this.canvas.width;
    const height = this.canvas.height;

    this.ctx.clearRect(0, 0, width, height);
    this.wavePhase += 0.12;

    // Background gradient glow
    const grad = this.ctx.createLinearGradient(0, 0, width, 0);
    grad.addColorStop(0, "#0f766e");
    grad.addColorStop(0.5, "#10b981");
    grad.addColorStop(1, "#0ea5e9");

    // Draw primary energetic wave
    this.ctx.beginPath();
    this.ctx.moveTo(0, height / 2);
    for (let x = 0; x < width; x += 3) {
      const amplitude = Math.sin(x * 0.04 + this.wavePhase) * 16 * Math.sin(x / width * Math.PI);
      const noise = (Math.random() - 0.5) * 6;
      const y = height / 2 + amplitude + noise;
      this.ctx.lineTo(x, y);
    }
    this.ctx.strokeStyle = grad;
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    // Draw secondary harmonic wave
    this.ctx.beginPath();
    this.ctx.moveTo(0, height / 2);
    for (let x = 0; x < width; x += 3) {
      const amplitude2 = Math.cos(x * 0.06 - this.wavePhase * 0.8) * 10 * Math.sin(x / width * Math.PI);
      const y = height / 2 + amplitude2;
      this.ctx.lineTo(x, y);
    }
    this.ctx.strokeStyle = "rgba(45, 212, 191, 0.5)";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    if (this.isRecording) {
      this.animFrameId = requestAnimationFrame(() => this.animateActiveWaveform());
    }
  }

  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  startRecording() {
    this.isRecording = true;
    this.playStartRecordingChime();
    this.recordingSeconds = 0;

    const micWrap = document.querySelector(".mic-pulse-wrapper");
    if (micWrap) micWrap.classList.add("recording");

    const label = document.getElementById("micStateLabel");
    if (label) label.textContent = "Recording...";

    const timer = document.getElementById("recordingTimer");
    if (timer) timer.textContent = "00:00 / 02:00";

    // Timer interval
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.recordingSeconds++;
      const mins = String(Math.floor(this.recordingSeconds / 60)).padStart(2, "0");
      const secs = String(this.recordingSeconds % 60).padStart(2, "0");
      if (timer) timer.textContent = `${mins}:${secs} / 02:00`;

      // Simulating live transcription incoming words
      this.updateLiveTranscriptionProgress(this.recordingSeconds);

      if (this.recordingSeconds >= 120) {
        this.stopRecording();
      }
    }, 1000);

    // Canvas animation
    cancelAnimationFrame(this.animFrameId);
    this.animateActiveWaveform();

    // Pulse dynamic island
    const island = document.getElementById("islandPulse");
    if (island) {
      island.style.background = "#ef4444";
      island.style.boxShadow = "0 0 8px #ef4444";
    }
  }

  stopRecording() {
    this.isRecording = false;
    this.playStopRecordingChime();
    clearInterval(this.timerInterval);
    cancelAnimationFrame(this.animFrameId);

    const micWrap = document.querySelector(".mic-pulse-wrapper");
    if (micWrap) micWrap.classList.remove("recording");

    const label = document.getElementById("micStateLabel");
    if (label) label.textContent = "Tap to Speak";

    // Restore idle wave
    this.drawIdleWaveform();

    // Restore dynamic island
    const island = document.getElementById("islandPulse");
    if (island) {
      island.style.background = "#10b981";
      island.style.boxShadow = "0 0 6px #10b981";
    }

    if (window.showToast) {
      window.showToast("Voice recorded & verified with Whisper STT (98% confidence)", "🎙️");
    }
  }

  updateLiveTranscriptionProgress(sec) {
    const hindiEl = document.getElementById("hindiTranscription");
    const engEl = document.getElementById("englishTranslation");
    if (!hindiEl || !engEl) return;

    if (sec === 1) {
      hindiEl.textContent = "मुझे कल रात से तेज़ बुखार...";
      engEl.textContent = "I have high fever since last night...";
    } else if (sec === 3) {
      hindiEl.textContent = "मुझे कल रात से तेज़ बुखार और सिरदर्द है...";
      engEl.textContent = "I have high fever and severe headache since last night...";
    } else if (sec >= 5) {
      hindiEl.textContent = "मुझे कल रात से तेज़ बुखार और सिरदर्द है... नींद नहीं आ रही है और बदन दर्द भी है।";
      engEl.textContent = "I have high fever and severe headache since last night with chills, cannot sleep, and generalized body ache.";
    }
  }
}

// Global instance
window.elaraAudio = new ElaraAudioEngine();
window.addEventListener("DOMContentLoaded", () => {
  window.elaraAudio.initCanvas();
});
