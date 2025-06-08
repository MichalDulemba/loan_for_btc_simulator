// Input validation utility functions
import { LIMITS } from '../constants/defaults';

export const validateLoanAmount = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return false;
  return numValue >= LIMITS.loanAmount.min && numValue <= LIMITS.loanAmount.max;
};

export const validateInterestRate = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return false;
  return numValue >= LIMITS.interestRate.min && numValue <= LIMITS.interestRate.max;
};

export const validateLoanYears = (value) => {
  const numValue = parseInt(value);
  if (isNaN(numValue)) return false;
  return numValue >= LIMITS.loanYears.min && numValue <= LIMITS.loanYears.max;
};

export const validateSellPercentage = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return false;
  return numValue >= LIMITS.sellAtPeak1.min && numValue <= LIMITS.sellAtPeak1.max;
};

export const validateBondsRate = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return false;
  return numValue >= LIMITS.bondsRate.min && numValue <= LIMITS.bondsRate.max;
};

export const validatePositiveNumber = (value) => {
  const numValue = parseFloat(value);
  return !isNaN(numValue) && numValue > 0;
};

export const validateUSDPLNRate = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return false;
  return numValue >= 2.0 && numValue <= 6.0; // Reasonable range for USD/PLN
};

export const validateBTCPrice = (value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return false;
  return numValue >= 1000 && numValue <= 10000000; // Reasonable range for BTC price
}; 