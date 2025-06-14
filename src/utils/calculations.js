// Utility functions for BTC loan calculations

export const calculateMonthlyPayment = (principal, rate, years) => {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
};

export const calculateBreakEvenPrice = (loanAmount, totalInterest, btcAmount, usdPlnRate, transactionCost = 0) => {
  // Include transaction costs in break-even calculation
  // Buy cost: btcAmount * price * usdPlnRate * (1 + transactionCost/100)
  // Sell cost: btcAmount * price * usdPlnRate * (1 - transactionCost/100)
  // Break-even: (loanAmount + totalInterest) / (btcAmount * usdPlnRate * 0.81 * (1 - transactionCost/100))
  const denominator = btcAmount * usdPlnRate * 0.81 * (1 - transactionCost / 100); // 0.81 = po podatku 19%
  return denominator > 0 ? (loanAmount + totalInterest) / denominator : 0;
};

export const calculateTax = (grossProfit, isProgressive = false, threshold = 1000000) => {
  if (!isProgressive || grossProfit <= threshold) {
    return grossProfit * 0.19;
  }
  return threshold * 0.19 + (grossProfit - threshold) * 0.23;
};

export const calculateROI = (profit, investment) => {
  return investment > 0 ? (profit / investment * 100) : 0;
};

export const calculateCompoundReturns = (principal, rate, years) => {
  return principal * Math.pow(1 + rate / 100, years) - principal;
};

export const calculateInterestSavings = (earlyPayment, totalLoan, totalInterest, timeReduction = 0.6) => {
  return (Math.min(earlyPayment, totalLoan) / totalLoan) * totalInterest * timeReduction;
};

export const calculatePurchasingPower = (nominalValue, inflationRate, years) => {
  // Calculate purchasing power adjusted value
  // Formula: Real Value = Nominal Value / (1 + inflation_rate)^years
  // This gives us the value in today's money, accounting for inflation
  // Example: 100,000 PLN in 10 years with 4% inflation = 67,556 PLN in today's money
  const inflationFactor = Math.pow(1 + inflationRate / 100, years);
  return nominalValue / inflationFactor;
}; 