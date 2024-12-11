export const calculateBMI = (weight: number, heightInCm: number): number => {
  // Convert height from cm to meters
  const heightInM = heightInCm / 100;
  return Number((weight / (heightInM * heightInM)).toFixed(1));
};

export const calculateBMR = (
  weight: number,
  heightInCm: number,
  age: number,
  gender: 'male' | 'female'
): number => {
  // Mifflin-St Jeor Equation
  // Height should be in cm for this formula
  if (gender === 'male') {
    return Math.round((10 * weight) + (6.25 * heightInCm) - (5 * age) + 5);
  } else {
    return Math.round((10 * weight) + (6.25 * heightInCm) - (5 * age) - 161);
  }
};