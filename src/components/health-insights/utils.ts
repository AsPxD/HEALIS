export const calculateBMI = (weight: number, height: number): number => {
  // Weight in kg, height in meters
  return Number((weight / (height * height)).toFixed(1));
};

export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female'
): number => {
  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
  } else {
    return Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);
  }
};