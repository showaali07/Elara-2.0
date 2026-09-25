# ELARA 2.0 — Multimodal AI Healthcare Triage Assistant
> **Smarter Triage, Faster Care | Healthcare at the Center**

ELARA 2.0 is an intelligent, multimodal clinical triage assistant designed for primary health centres (PHCs), district hospitals, and community care. It streamlines patient intake across **Voice**, **Text**, and **Medical Lab Reports (OCR)** in Indian languages (**Hindi**, **Odia**, and **English**), providing structured triage notes, urgency stratification, and clinician referral handovers under human-in-the-loop safeguards.

---

## 🌟 Key Features

- **Multimodal Patient Intake**:
  - 🎤 **Voice-First Triage**: Real-time microphone audio recording, Web Audio API frequency waveform visualizer, and simulated Whisper/Vani Speech-to-Text in Hindi, Odia, and English.
  - 📝 **Interactive Form**: Guided symptom chips (*Fever with Chills*, *Throbbing Headache*, *Shortness of breath*) and duration selectors.
  - 📄 **Lab Report OCR**: Extracts lab values from CBC (Hemoglobin, WBC, Platelets) and Dengue Serology reports with verification alerts.
- **Explainable AI Pipeline**:
  - Live 5-step clinical synthesis pipeline visualizer.
  - Transparent data processing complying with clinical decision support guidelines (non-diagnostic triage scoring).
- **Missing Information Resolution**:
  - Automatically identifies missing vital parameters (e.g., exact temperature, medication history, red-flag symptoms) and allows 1-click interactive resolution.
- **Clinical Urgency Stratification**:
  - 🔴 **Urgent**: Prompt assessment recommended within 30 minutes.
  - 🟡 **Priority**: Review recommended within 60 minutes.
  - 🟢 **Routine**: Stable parameters routed to standard OPD queue.
- **Healthcare Worker (Nurse) Console**:
  - Live priority queue tracking with wait times.
  - Clinical chart review with human decision override controls.
  - Quick clinical note templates (`+ Vitals Normal`, `+ Order Rapid Kit`).
- **Doctor Referral & Handover**:
  - 1-click referral preparation to duty Medical Officers and specialists.
  - Generates verifiable digital tokens (`#REF-8821`).
- **Facility Admin Dashboard**:
  - Real-time PHC metrics (daily caseload, average review time, queue clearance).
  - Multilingual intake analytics (52% Hindi, 31% English, 17% Odia).
  - AI-to-clinician concordance tracking (91.8% agreement rate).
- **Multi-View Modes**:
  - 📱 **Interactive Mobile**: Realistic smartphone frame with Dynamic Island and status bar.
  - 🎨 **Figma Flow Board**: Full horizontal overview of all 11 screens side-by-side with zoom controls.
  - 🖥️ **Dual Workstation**: Side-by-side split screen for clinical desks.
  - 🌓 **High-Contrast Dark Mode** for night shifts at PHC wards.

---

## 📁 Repository Structure

```
elara-2.0/
├── index.html            # Main semantic HTML5 application containing all 12 screens & modes
├── css/
│   └── style.css         # Vanilla CSS design system, glassmorphism, responsive frames & animations
├── js/
│   ├── data.js           # Patient cases, 28-patient queue, multilingual strings (EN, HI, OD)
│   ├── audio-sim.js      # Web Audio API waveform visualizer, audio chimes & STT simulation
│   ├── triage-engine.js  # Clinical rule engine, red-flag scanner & FHIR triage note generator
│   └── app.js            # Main controller managing transitions, modes, overrides & referrals
└── README.md             # Project documentation
```

---

## 🚀 Quick Start

No external dependencies, build tools, or packages required!

1. Clone or download this repository:
   ```bash
   git clone https://github.com/<your-username>/elara-2.0.git
   cd elara-2.0
   ```
2. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari):
   - **Windows**: Double-click `index.html` or run:
     ```powershell
     Start-Process index.html
     ```
   - **macOS**:
     ```bash
     open index.html
     ```
   - **Linux**:
     ```bash
     xdg-open index.html
     ```

---

## 🛡️ Clinical Safety & Compliance

- **ABDM Milestone 3 Aligned**: Incorporates ABHA Health ID schemas, role-based access, and encrypted audit trails.
- **Decision Support Only**: ELARA does not prescribe therapeutics or diagnose illnesses; it supports triage urgency prioritization under qualified clinical supervision.
- **Privacy-First**: No persistent identifiable patient recordings stored without explicit consent.

---

## 📜 License

MIT License. Designed for public health and clinical triage support.
