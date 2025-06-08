// Default values and constants

export const DEFAULT_VALUES = {
  loanAmount: 300000,
  interestRate: 12,
  loanYears: 10,
  btcBuyPrice: 80000,
  btcPeak1: 240000,
  btcPeak2: 500000,
  usdPlnRate: 3.75,
  sellAtPeak1: 50,
  monthlyDCA: 0,
  bondsRate: 6.0,
  bondsAmount: 80000
};

export const TAX_RATES = {
  STANDARD: 0.19,
  HIGH_INCOME: 0.23,
  THRESHOLD: 1000000
};

export const LIMITS = {
  loanAmount: { min: 50000, max: 1000000, step: 10000 },
  interestRate: { min: 7, max: 18, step: 0.1 },
  loanYears: { min: 3, max: 15, step: 1 },
  sellAtPeak1: { min: 0, max: 100, step: 5 },
  bondsRate: { min: 3, max: 10, step: 0.1 },
  bondsAmount: { min: 50000, max: 500000, step: 10000 }
};

export const ASSUMPTIONS = {
  AVERAGE_NET_INCOME: 7000,
  TIME_REDUCTION_FACTOR: 0.6, // dla wcześniejszej spłaty kredytu
  AFTER_TAX_FACTOR: 0.81 // po podatku 19%
}; 