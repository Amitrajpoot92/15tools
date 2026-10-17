/**
 * Pure Mathematical Core for Shopping & Daily Life Calculators
 */

export function calculateCostPerItem(packPrice: number, quantity: number): number {
  if (quantity <= 0) return 0;
  return parseFloat((packPrice / quantity).toFixed(2));
}

export function calculatePricePerKg(price: number, grams: number): number {
  if (grams <= 0) return 0;
  return parseFloat(((price / grams) * 1000).toFixed(2));
}

export interface PricePerKgResult {
  totalGrams: number;
  totalKg: number;
  price: number;
  formattedQuantity: string;
}

export function calculatePriceFromWeight(
  pricePerKg: number,
  kg: number,
  grams: number
): PricePerKgResult {
  const k = kg || 0;
  const g = grams || 0;
  const totalGrams = k * 1000 + g;
  const totalKg = totalGrams / 1000;
  const price = totalKg * (pricePerKg || 0);

  let formattedQuantity = "";
  if (k > 0 && g > 0) {
    formattedQuantity = `${k} kg ${g} g`;
  } else if (k > 0) {
    formattedQuantity = `${k} kg`;
  } else {
    formattedQuantity = `${g} Grams`;
  }

  return {
    totalGrams,
    totalKg,
    price: parseFloat(price.toFixed(2)),
    formattedQuantity,
  };
}

export interface TipResult {
  tipAmount: number;
  totalBill: number;
  perPersonTip: number;
  perPersonTotal: number;
}

export function calculateTip(
  billAmount: number,
  tipPercent: number,
  splitCount: number
): TipResult {
  const b = billAmount || 0;
  const t = tipPercent || 0;
  const s = Math.max(1, splitCount || 1);

  const tipAmount = (b * t) / 100;
  const totalBill = b + tipAmount;
  const perPersonTip = tipAmount / s;
  const perPersonTotal = totalBill / s;

  return {
    tipAmount: parseFloat(tipAmount.toFixed(2)),
    totalBill: parseFloat(totalBill.toFixed(2)),
    perPersonTip: parseFloat(perPersonTip.toFixed(2)),
    perPersonTotal: parseFloat(perPersonTotal.toFixed(2)),
  };
}

export interface FuelCostResult {
  fuelNeededLiters: number;
  totalCost: number;
  costPerKm: number;
}

export function calculateFuelCost(
  distanceKm: number,
  mileageKmPerLiter: number,
  fuelPricePerLiter: number
): FuelCostResult {
  const d = distanceKm || 0;
  const m = mileageKmPerLiter || 1;
  const p = fuelPricePerLiter || 0;

  if (m <= 0) return { fuelNeededLiters: 0, totalCost: 0, costPerKm: 0 };

  const fuelNeededLiters = d / m;
  const totalCost = fuelNeededLiters * p;
  const costPerKm = d > 0 ? totalCost / d : 0;

  return {
    fuelNeededLiters: parseFloat(fuelNeededLiters.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    costPerKm: parseFloat(costPerKm.toFixed(2)),
  };
}
