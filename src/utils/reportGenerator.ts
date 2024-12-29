import type { PatientData, AnalysisResult } from '../types';

export function generateMarkdown(data: PatientData, analysis: AnalysisResult): string {
  return `# Clinical Safety Analysis Report

## Patient Summary
- Medication: ${data.medication} ${data.dosage}
- Age: ${data.age} years
- Weight: ${data.weight} kg
- Gender: ${data.gender}

## Clinical Profile

### Current Medical Conditions
${data.conditions.map(condition => `- ${condition}`).join('\n')}

### Current Medications
${data.current_meds.map(med => `- ${med}`).join('\n')}

### Allergies & Sensitivities
${data.allergies.map(allergy => `- ${allergy}`).join('\n')}

## Risk Assessment

**Risk Level: ${analysis.risk_level}**

### Analysis Summary
${analysis.risk_assessment}

### Key Clinical Findings
${analysis.key_findings}

## Action Plan

### Required Actions
${analysis.required_actions}

### Monitoring Protocol
${analysis.monitoring_plan}

### Treatment Alternatives
${analysis.alternatives}

---
Generated: ${new Date().toLocaleString()}
`;
}

export function downloadReport(markdown: string): void {
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `clinical-safety-report-${new Date().toISOString()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}