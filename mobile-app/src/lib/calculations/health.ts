/**
 * Pure Mathematical Core for Health & Fun Calculators
 */

export interface BMIResult {
  bmi: number;
  category: "Underweight" | "Normal weight" | "Overweight" | "Obesity";
  healthyWeightRange: { min: number; max: number };
}

export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  const w = weightKg || 0;
  const h = (heightCm || 0) / 100; // to meters

  if (w <= 0 || h <= 0) {
    return {
      bmi: 0,
      category: "Normal weight",
      healthyWeightRange: { min: 0, max: 0 },
    };
  }

  const bmi = parseFloat((w / (h * h)).toFixed(1));

  let category: "Underweight" | "Normal weight" | "Overweight" | "Obesity" = "Normal weight";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obesity";

  const minWeight = parseFloat((18.5 * h * h).toFixed(1));
  const maxWeight = parseFloat((24.9 * h * h).toFixed(1));

  return {
    bmi,
    category,
    healthyWeightRange: { min: minWeight, max: maxWeight },
  };
}

export interface CalorieResult {
  bmr: number;
  maintenanceCalories: number;
  weightLossCalories: number;
  weightGainCalories: number;
}

export function calculateCalorie(
  gender: "male" | "female",
  age: number,
  weightKg: number,
  heightCm: number,
  activityMultiplier: number = 1.2
): CalorieResult {
  const w = weightKg || 0;
  const h = heightCm || 0;
  const a = age || 25;
  const m = activityMultiplier || 1.2;

  // Mifflin-St Jeor Equation
  let bmr = 10 * w + 6.25 * h - 5 * a;
  bmr = gender === "male" ? bmr + 5 : bmr - 161;

  const maintenance = Math.round(bmr * m);
  const weightLoss = Math.round(maintenance - 500);
  const weightGain = Math.round(maintenance + 500);

  return {
    bmr: Math.round(bmr),
    maintenanceCalories: maintenance,
    weightLossCalories: Math.max(1200, weightLoss),
    weightGainCalories: weightGain,
  };
}

export function calculateLoveScore(name1: string, name2: string): number {
  const combined = (name1.toLowerCase() + name2.toLowerCase()).replace(/[^a-z]/g, "");
  if (!combined) return 0;

  let sum = 0;
  for (let i = 0; i < combined.length; i++) {
    sum += combined.charCodeAt(i) * (i + 1);
  }

  // Consistent playful 60-99% match
  const score = 60 + (sum % 40);
  return score;
}
