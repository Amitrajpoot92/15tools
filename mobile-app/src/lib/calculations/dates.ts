/**
 * Pure Mathematical Core for Date & Age Calculators
 */

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthdayDays: number;
}

export function calculateAge(birthDate: Date, asOfDate: Date = new Date()): AgeResult {
  let years = asOfDate.getFullYear() - birthDate.getFullYear();
  let months = asOfDate.getMonth() - birthDate.getMonth();
  let days = asOfDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(asOfDate.getFullYear(), asOfDate.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = asOfDate.getTime() - birthDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  // Next birthday calculation
  const currentYear = asOfDate.getFullYear();
  let nextBday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
  if (nextBday < asOfDate) {
    nextBday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
  }
  const nextBirthdayDays = Math.ceil((nextBday.getTime() - asOfDate.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalDays: Math.max(0, totalDays),
    totalHours: Math.max(0, totalHours),
    totalMinutes: Math.max(0, totalMinutes),
    nextBirthdayDays,
  };
}

export interface DateDifferenceResult {
  totalDays: number;
  weeks: number;
  remainingDays: number;
  totalHours: number;
}

export function calculateDateDifference(d1: Date, d2: Date): DateDifferenceResult {
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const totalHours = totalDays * 24;

  return { totalDays, weeks, remainingDays, totalHours };
}
