export function splitIntoSteps(text: string): string[] {
    // Split on periods but preserve them in the steps
    return text
      .split('.')
      // Filter out empty strings and trim whitespace
      .filter(step => step.trim())
      // Add period back and clean up the text
      .map(step => `${step.trim()}.`)
      // Remove any double periods that might have been created
      .map(step => step.replace('..', '.'));
  }