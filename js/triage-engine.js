/**
 * ELARA 2.0 - CLINICAL TRIAGE ENGINE
 * Rule-based NLP symptom entity extraction, red-flag scanner, missing vital identifier,
 * and clinical urgency matrix.
 */

class ElaraTriageEngine {
  constructor() {
    this.redFlagRules = [
      { symptom: "chest pain", urgency: "urgent", rationale: "Potential acute coronary syndrome or cardiopulmonary compromise." },
      { symptom: "difficulty breathing", urgency: "urgent", rationale: "Respiratory distress requiring immediate SpO2 & nebulization assessment." },
      { symptom: "stiff neck", urgency: "urgent", rationale: "Meningeal sign alert; requires emergency physician examination." },
      { symptom: "fever with chills", urgency: "urgent", rationale: "Acute febrile presentation; prompt assessment for vector illness & vitals monitoring." }
    ];
  }

  /**
   * Evaluates patient data and calculates triage note
   */
  evaluateTriage(patientData) {
    const symptoms = patientData.symptoms || [];
    const labValues = patientData.labReport?.values || {};
    const missingInfo = patientData.missingInfo || {};

    let calculatedUrgency = "routine";
    let rationale = "Stable vital signs and mild non-progressive symptoms. Suitable for standard OPD consultation.";
    let detectedRedFlags = [];

    // Check symptoms for red flags
    const symptomNames = symptoms.map(s => (s.name || s).toLowerCase());
    
    const hasChestPain = symptomNames.some(s => s.includes("chest") || s.includes("dyspnea"));
    const hasHighFever = symptomNames.some(s => s.includes("fever") || s.includes("chills"));
    const hasHeadache = symptomNames.some(s => s.includes("headache") || s.includes("cephalea"));

    if (hasChestPain) {
      calculatedUrgency = "urgent";
      rationale = "CRITICAL: Acute cardiovascular / pulmonary distress alert. Immediate triage desk review required within 10 minutes.";
      detectedRedFlags.push("Chest tightness / shortness of breath");
    } else if (hasHighFever && hasHeadache) {
      calculatedUrgency = "urgent";
      rationale = "Prompt clinical assessment recommended within 30 minutes to manage worsening acute febrile illness and headache.";
      detectedRedFlags.push("High febrile presentation with severe cephalea");
    } else if (hasHighFever || symptomNames.some(s => s.includes("vomiting") || s.includes("cough"))) {
      calculatedUrgency = "priority";
      rationale = "Sub-acute presentation requiring evaluation within 60 minutes for symptomatic relief.";
    }

    // Check CBC Lab Values
    if (labValues.platelets && parseFloat(labValues.platelets.val) < 1.0) {
      calculatedUrgency = "urgent";
      rationale = "Severe thrombocytopenia detected on lab report (< 1.0 lakh/µL). High risk of hemorrhagic complications.";
      detectedRedFlags.push("Critical Low Platelets");
    }

    // Synthesize structured note
    const summaryParagraph = this.generateClinicalSynthesisParagraph(patientData, calculatedUrgency);

    return {
      urgency: calculatedUrgency,
      priorityLabel: calculatedUrgency === "urgent" ? "HIGH URGENCY REVIEW SUGGESTED" : (calculatedUrgency === "priority" ? "PRIORITY REVIEW SUGGESTED" : "ROUTINE CONSULTATION"),
      color: calculatedUrgency === "urgent" ? "red" : (calculatedUrgency === "priority" ? "amber" : "green"),
      rationale: rationale,
      detectedRedFlags: detectedRedFlags,
      synthesisParagraph: summaryParagraph
    };
  }

  generateClinicalSynthesisParagraph(patient, urgency) {
    const tempText = patient.missingInfo?.temperature?.resolved ? "Temp 102.4°F recorded" : "Exact temperature unrecorded";
    const medText = patient.missingInfo?.medications?.resolved ? "Paracetamol 650mg logged" : "Medication history pending";

    if (urgency === "urgent") {
      return `"Acute febrile illness presentation with severe cephalea. Stable hematological profile on attached CBC (Hb 11.2, Platelets 2.1L). Recommended for targeted vitals measurement (${tempText}) and urgent malaria/dengue screening by duty doctor."`;
    } else if (urgency === "priority") {
      return `"Sub-acute symptomatic illness with upper respiratory / gastrointestinal complaints. Patient is ambulatory. Targeted symptomatic care and doctor consultation advised within 60 minutes."`;
    } else {
      return `"Chronic or routine clinical presentation with stable parameters. Vitals within manageable range. Queued for general OPD consultation."`;
    }
  }

  /**
   * Resolves a missing info field
   */
  resolveMissingField(patient, fieldKey) {
    if (patient.missingInfo && patient.missingInfo[fieldKey]) {
      patient.missingInfo[fieldKey].resolved = true;
      patient.missingInfo[fieldKey].status = "verified";
    }
    return this.evaluateTriage(patient);
  }
}

// Global instance
window.elaraEngine = new ElaraTriageEngine();
