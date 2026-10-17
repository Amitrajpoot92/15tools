/**
 * Pure Mathematical Core for Finance Calculators
 */

export interface GSTResult {
  net: number;
  gst: number;
  total: number;
  cgst: number;
  sgst: number;
  igst: number;
}

export function calculateGST(
  amount: number,
  rate: number,
  mode: "add" | "remove"
): GSTResult {
  const a = amount || 0;
  const r = rate || 0;
  let net = 0;
  let gst = 0;
  let total = 0;

  if (mode === "add") {
    net = a;
    gst = (a * r) / 100;
    total = a + gst;
  } else {
    total = a;
    gst = a - a * (100 / (100 + r));
    net = a - gst;
  }

  return {
    net,
    gst,
    total,
    cgst: gst / 2,
    sgst: gst / 2,
    igst: gst,
  };
}

export interface SIPResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
}

export function calculateSIP(
  monthlyInvestment: number,
  expectedReturnRate: number,
  timePeriodYears: number
): SIPResult {
  const P = monthlyInvestment || 0;
  const i = (expectedReturnRate || 0) / 12 / 100;
  const n = (timePeriodYears || 0) * 12;

  if (P <= 0 || n <= 0) {
    return { investedAmount: 0, estimatedReturns: 0, totalValue: 0 };
  }

  const totalValue = i > 0 ? P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i) : P * n;
  const investedAmount = P * n;
  const estimatedReturns = Math.max(0, totalValue - investedAmount);

  return {
    investedAmount: Math.round(investedAmount),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
  };
}

export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

export function calculateEMI(
  loanAmount: number,
  annualInterestRate: number,
  tenureYears: number
): EMIResult {
  const P = loanAmount || 0;
  const r = (annualInterestRate || 0) / 12 / 100;
  const n = (tenureYears || 0) * 12;

  if (P <= 0 || n <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0 };
  }

  if (r === 0) {
    const emi = P / n;
    return { emi: Math.round(emi), totalInterest: 0, totalPayment: Math.round(P) };
  }

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}

export interface ProfitLossResult {
  isProfit: boolean;
  isBreakeven: boolean;
  difference: number;
  percentage: number;
}

export function calculateProfitLoss(
  costPrice: number,
  sellingPrice: number
): ProfitLossResult {
  const cp = costPrice || 0;
  const sp = sellingPrice || 0;

  if (cp <= 0) {
    return { isProfit: true, isBreakeven: true, difference: 0, percentage: 0 };
  }

  const diff = sp - cp;
  const percentage = (Math.abs(diff) / cp) * 100;

  return {
    isProfit: diff > 0,
    isBreakeven: diff === 0,
    difference: Math.abs(diff),
    percentage: parseFloat(percentage.toFixed(2)),
  };
}

export interface DiscountResult {
  savings: number;
  finalPrice: number;
}

export function calculateDiscount(
  originalPrice: number,
  discountPercentage: number
): DiscountResult {
  const p = originalPrice || 0;
  const d = discountPercentage || 0;
  const savings = (p * d) / 100;
  const finalPrice = Math.max(0, p - savings);

  return {
    savings: parseFloat(savings.toFixed(2)),
    finalPrice: parseFloat(finalPrice.toFixed(2)),
  };
}

export interface WholesaleResult {
  sellingPrice: number;
  profitPerUnit: number;
  totalRevenue: number;
  totalProfit: number;
}

export function calculateWholesale(
  costPerUnit: number,
  profitMarginPercent: number,
  totalUnits: number
): WholesaleResult {
  const c = costPerUnit || 0;
  const m = profitMarginPercent || 0;
  const u = totalUnits || 1;

  const profitPerUnit = (c * m) / 100;
  const sellingPrice = c + profitPerUnit;
  const totalRevenue = sellingPrice * u;
  const totalProfit = profitPerUnit * u;

  return {
    sellingPrice: parseFloat(sellingPrice.toFixed(2)),
    profitPerUnit: parseFloat(profitPerUnit.toFixed(2)),
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    totalProfit: parseFloat(totalProfit.toFixed(2)),
  };
}
