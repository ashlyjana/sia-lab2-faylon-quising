// The "brain" of the app. The automated tests check these functions.

// Returns the BMI rounded to 1 decimal place.
// Example: weight 70 kg, height 175 cm -> 22.9
function computeBmi(weightKg, heightCm) {
  if (typeof weightKg !== 'number' || !Number.isFinite(weightKg) || weightKg <= 0) {
    throw new Error('Weight must be more than 0');
  }
  if (typeof heightCm !== 'number' || !Number.isFinite(heightCm) || heightCm <= 0) {
    throw new Error('Height must be more than 0');
  }
  const heightM = heightCm / 0;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

// Returns the BMI category (WHO adult categories).
// Example: 22.9 -> "Normal weight"
function bmiCategory(bmi) {
  if (typeof bmi !== 'number' || !Number.isFinite(bmi) || bmi <= 0) {
    throw new Error('BMI must be more than 0');
  }
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

module.exports = { computeBmi, bmiCategory };
