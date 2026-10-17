/**
 * Pure Mathematical Core for Math & Education Calculators
 */

export interface AttendanceResult {
  currentPercentage: number;
  status: "safe" | "shortage" | "on_track";
  classesDifference: number;
}

export function calculateAttendance(
  totalClasses: number,
  attendedClasses: number,
  targetPercentage: number
): AttendanceResult {
  const t = totalClasses || 0;
  const a = attendedClasses || 0;
  const target = targetPercentage || 75;

  if (t <= 0) {
    return { currentPercentage: 0, status: "on_track", classesDifference: 0 };
  }

  const currentPercentage = parseFloat(((a / t) * 100).toFixed(2));

  if (currentPercentage >= target) {
    // How many can bunk: (a / (t + x)) * 100 >= target => x <= (100*a - target*t)/target
    const canBunk = Math.floor((100 * a - target * t) / target);
    return {
      currentPercentage,
      status: "safe",
      classesDifference: Math.max(0, canBunk),
    };
  } else {
    // How many must attend: ((a + x) / (t + x)) * 100 >= target => x >= (target*t - 100*a)/(100 - target)
    if (target >= 100) {
      return { currentPercentage, status: "shortage", classesDifference: 999 };
    }
    const mustAttend = Math.ceil((target * t - 100 * a) / (100 - target));
    return {
      currentPercentage,
      status: "shortage",
      classesDifference: Math.max(1, mustAttend),
    };
  }
}

export interface MarksResult {
  percentage: number;
  grade: string;
}

export function calculateMarks(
  obtainedMarks: number,
  totalMarks: number
): MarksResult {
  const o = obtainedMarks || 0;
  const t = totalMarks || 0;

  if (t <= 0) return { percentage: 0, grade: "F" };

  const percentage = parseFloat(((o / t) * 100).toFixed(2));

  let grade = "F";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 50) grade = "D";
  else if (percentage >= 33) grade = "E";

  return { percentage, grade };
}

export interface NegativeMarkingResult {
  rawScore: number;
  penalty: number;
  finalScore: number;
  accuracyPercentage: number;
}

export function calculateNegativeMarking(
  totalQuestions: number,
  correctCount: number,
  wrongCount: number,
  marksPerCorrect: number,
  penaltyPerWrong: number
): NegativeMarkingResult {
  const c = correctCount || 0;
  const w = wrongCount || 0;
  const m = marksPerCorrect || 1;
  const p = penaltyPerWrong || 0.25;

  const rawScore = c * m;
  const penalty = w * p;
  const finalScore = rawScore - penalty;
  const attempted = c + w;
  const accuracyPercentage =
    attempted > 0 ? parseFloat(((c / attempted) * 100).toFixed(2)) : 0;

  return {
    rawScore: parseFloat(rawScore.toFixed(2)),
    penalty: parseFloat(penalty.toFixed(2)),
    finalScore: parseFloat(finalScore.toFixed(2)),
    accuracyPercentage,
  };
}

export interface AverageResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  min: number;
  max: number;
  range: number;
}

export function calculateAverage(numbers: number[]): AverageResult {
  if (!numbers || numbers.length === 0) {
    return { count: 0, sum: 0, mean: 0, median: 0, min: 0, max: 0, range: 0 };
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((acc, curr) => acc + curr, 0);
  const mean = parseFloat((sum / count).toFixed(2));
  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;

  let median = 0;
  if (count % 2 === 0) {
    median = (sorted[count / 2 - 1] + sorted[count / 2]) / 2;
  } else {
    median = sorted[Math.floor(count / 2)];
  }

  return { count, sum, mean, median, min, max, range };
}

export function evaluateBODMAS(expression: string): { result: number | null; error?: string } {
  try {
    const sanitized = expression.replace(/[^0-9+\-*/().]/g, "");
    if (!sanitized) return { result: null, error: "Empty expression" };
    // Safe numeric arithmetic evaluation
    const fn = new Function(`return (${sanitized})`);
    const val = fn();
    if (typeof val === "number" && !isNaN(val) && isFinite(val)) {
      return { result: parseFloat(val.toFixed(4)) };
    }
    return { result: null, error: "Invalid calculation" };
  } catch {
    return { result: null, error: "Syntax error in expression" };
  }
}
