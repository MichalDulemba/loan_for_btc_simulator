import { useState } from 'react';
import { calculateMonthlyPayment, calculateInterestSavings } from '../utils/calculations';
import { DEFAULT_VALUES } from '../constants/defaults';

export const useLoanCalculations = () => {
  const [loanAmount, setLoanAmount] = useState(DEFAULT_VALUES.loanAmount);
  const [interestRate, setInterestRate] = useState(DEFAULT_VALUES.interestRate);
  const [loanYears, setLoanYears] = useState(DEFAULT_VALUES.loanYears);
  const [additionalLoans, setAdditionalLoans] = useState([]);
  const [bondsAmount, setBondsAmount] = useState(DEFAULT_VALUES.bondsAmount);
  const [bondsRate, setBondsRate] = useState(DEFAULT_VALUES.bondsRate);

  // Primary loan calculations
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanYears);
  const totalLoanCost = monthlyPayment * loanYears * 12;
  const totalInterest = totalLoanCost - loanAmount;

  // Bonds calculations
  const bondsMonthlyPayment = calculateMonthlyPayment(bondsAmount, interestRate, loanYears);
  const bondsTotalLoanCost = bondsMonthlyPayment * loanYears * 12;
  const bondsTotalInterest = bondsTotalLoanCost - bondsAmount;

  const calculateAdjustedInterest = (earlyPayment) => {
    if (earlyPayment <= 0) return totalInterest;
    const interestSaved = calculateInterestSavings(earlyPayment, loanAmount, totalInterest);
    return totalInterest - interestSaved;
  };

  return {
    // State
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanYears,
    setLoanYears,
    additionalLoans,
    setAdditionalLoans,
    bondsAmount,
    setBondsAmount,
    bondsRate,
    setBondsRate,
    
    // Calculations
    monthlyPayment,
    totalLoanCost,
    totalInterest,
    bondsMonthlyPayment,
    bondsTotalLoanCost,
    bondsTotalInterest,
    calculateAdjustedInterest
  };
}; 