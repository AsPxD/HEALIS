import { API_CONFIG } from '../config/api';
import type { PatientData, AnalysisResult } from '../types';

export async function analyzeClinicalCase(patientData: PatientData): Promise<AnalysisResult> {
  try {
    const response = await fetch(API_CONFIG.GROQ_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: API_CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: `You are a clinical safety analyst. Return a JSON object with exactly these fields:
              {
                "risk_level": "SAFE|CAUTION|WARNING|DANGER",
                "risk_assessment": "detailed assessment",
                "key_findings": "list of findings",
                "required_actions": "action items",
                "monitoring_plan": "monitoring details",
                "alternatives": "alternative options"
              }`
          },
          {
            role: 'user',
            content: constructPrompt(patientData)
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    
    return {
      risk_level: content.risk_level || 'WARNING',
      risk_assessment: content.risk_assessment || 'Manual review required',
      key_findings: content.key_findings || 'Analysis pending',
      required_actions: content.required_actions || 'Consult healthcare provider',
      monitoring_plan: content.monitoring_plan || 'Regular monitoring required',
      alternatives: content.alternatives || 'Discuss alternatives with provider'
    };
  } catch (error) {
    console.error('Analysis error:', error);
    return {
      risk_level: 'WARNING',
      risk_assessment: 'API Error: Manual review required',
      key_findings: 'Unable to complete analysis',
      required_actions: 'Consult healthcare provider',
      monitoring_plan: 'Regular monitoring required',
      alternatives: 'Discuss alternatives with provider'
    };
  }
}

function constructPrompt(patient: PatientData): string {
  return `Analyze this patient case and provide a JSON response:

Patient Details:
- Medication: ${patient.medication} ${patient.dosage}
- Age: ${patient.age} years
- Weight: ${patient.weight} kg
- Gender: ${patient.gender}

Conditions: ${patient.conditions.join(', ')}
Allergies: ${patient.allergies.join(', ')}
Current Medications: ${patient.current_meds.join(', ')}

Provide detailed analysis in JSON format with risk level assessment.`;
}