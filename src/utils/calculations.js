// Utility functions for BTC loan calculations

export const calculateMonthlyPayment = (principal, rate, years) => {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
};

export const calculateBreakEvenPrice = (loanAmount, totalInterest, btcAmount, usdPlnRate) => {
  return (loanAmount + totalInterest) / (btcAmount * usdPlnRate * 0.81); // 0.81 = po podatku 19%
};

export const calculateTax = (grossProfit, isProgressive = false, threshold = 1000000) => {
  if (!isProgressive || grossProfit <= threshold) {
    return grossProfit * 0.19;
  }
  return threshold * 0.19 + (grossProfit - threshold) * 0.23;
};

export const calculateROI = (profit, investment) => {
  return (profit / investment * 100);
};

export const calculateCompoundReturns = (principal, rate, years) => {
  return principal * Math.pow(1 + rate / 100, years) - principal;
};

export const calculateInterestSavings = (earlyPayment, totalLoan, totalInterest, timeReduction = 0.6) => {
  return (Math.min(earlyPayment, totalLoan) / totalLoan) * totalInterest * timeReduction;
}; 