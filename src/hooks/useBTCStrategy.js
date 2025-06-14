import { useState } from 'react';
import { calculateBreakEvenPrice, calculateTax, calculateROI, calculateCompoundReturns } from '../utils/calculations';
import { DEFAULT_VALUES, TAX_RATES } from '../constants/defaults';
import { SCENARIOS } from '../constants/scenarios';

export const useBTCStrategy = (loanAmount, totalInterest, bondsAmount, bondsRate, loanYears) => {
  const [btcBuyPrice, setBtcBuyPrice] = useState(DEFAULT_VALUES.btcBuyPrice);
  const [btcPeak1, setBtcPeak1] = useState(DEFAULT_VALUES.btcPeak1);
  const [btcPeak2, setBtcPeak2] = useState(DEFAULT_VALUES.btcPeak2);
  const [btcPeak2035, setBtcPeak2035] = useState(800000);
  const [btcPeak2040, setBtcPeak2040] = useState(1200000);
  const [usdPlnRate, setUsdPlnRate] = useState(DEFAULT_VALUES.usdPlnRate);
  const [sellAtPeak1, setSellAtPeak1] = useState(DEFAULT_VALUES.sellAtPeak1);
  const [payOffLoan, setPayOffLoan] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState('neutral');
  const [inflationRate, setInflationRate] = useState(DEFAULT_VALUES.inflationRate);
  const [purchaseStrategy, setPurchaseStrategy] = useState('lump'); // 'lump' or 'dca' or 'loan-dca' or 'savings'
  const [dcaYears, setDcaYears] = useState(5);
  const [dcaAmount, setDcaAmount] = useState(20000);
  const [savingsAmount, setSavingsAmount] = useState(100000); // Default savings amount
  const [sp500Return, setSp500Return] = useState(10); // Default S&P500 return

  // Get scenario prices
  const scenario = SCENARIOS[selectedScenario];
  const btcPeak2030 = scenario?.peak2030 || 400000;
  // Use custom values if set, otherwise use scenario values
  const finalBtcPeak2035 = btcPeak2035 || scenario?.peak2035 || 800000;
  const finalBtcPeak2040 = btcPeak2040 || scenario?.peak2040 || 1200000;

  // BTC calculations based on purchase strategy
  let btcAmount, averageBuyPrice, loanBtcAmount, dcaBtcAmount, dcaTotalSpent;
  
  if (purchaseStrategy === 'lump') {
    // One-time purchase with loan
    btcAmount = (btcBuyPrice > 0 && usdPlnRate > 0) ? loanAmount / (btcBuyPrice * usdPlnRate) : 0;
    averageBuyPrice = btcBuyPrice;
    loanBtcAmount = btcAmount;
    dcaBtcAmount = 0;
    dcaTotalSpent = 0;
  } else if (purchaseStrategy === 'dca') {
    // Pure DCA strategy (no loan)
    const dcaMonths = dcaYears * 12;
    const monthlyDcaAmount = dcaAmount;
    dcaTotalSpent = monthlyDcaAmount * dcaMonths;
    
    // Calculate average BTC price during DCA period
    // Approximate price movement between peaks
    const peak1Price = btcPeak1 || 240000; // Default value if not set
    const priceChange = (peak1Price - btcBuyPrice) / dcaMonths;
    let totalBtcBought = 0;
    let totalSpent = 0;
    
    for (let month = 0; month < dcaMonths; month++) {
      const currentPrice = btcBuyPrice + (priceChange * month);
      if (currentPrice > 0 && usdPlnRate > 0) {
        const btcBoughtThisMonth = monthlyDcaAmount / (currentPrice * usdPlnRate);
        totalBtcBought += btcBoughtThisMonth;
        totalSpent += monthlyDcaAmount;
      }
    }
    
    btcAmount = totalBtcBought;
    averageBuyPrice = (btcAmount > 0 && usdPlnRate > 0) ? totalSpent / (btcAmount * usdPlnRate) : btcBuyPrice;
    loanBtcAmount = 0;
    dcaBtcAmount = btcAmount;
  } else if (purchaseStrategy === 'loan-dca') {
    // Loan + DCA strategy: use loan as base + additional DCA
    loanBtcAmount = (btcBuyPrice > 0 && usdPlnRate > 0) ? loanAmount / (btcBuyPrice * usdPlnRate) : 0;
    
    // Additional DCA
    const dcaMonths = dcaYears * 12;
    const monthlyDcaAmount = dcaAmount;
    dcaTotalSpent = monthlyDcaAmount * dcaMonths;
    
    // Calculate average BTC price during DCA period
    const peak1Price = btcPeak1 || 240000;
    const priceChange = (peak1Price - btcBuyPrice) / dcaMonths;
    let dcaBtcBought = 0;
    let dcaSpent = 0;
    
    for (let month = 0; month < dcaMonths; month++) {
      const currentPrice = btcBuyPrice + (priceChange * month);
      if (currentPrice > 0 && usdPlnRate > 0) {
        const btcBoughtThisMonth = monthlyDcaAmount / (currentPrice * usdPlnRate);
        dcaBtcBought += btcBoughtThisMonth;
        dcaSpent += monthlyDcaAmount;
      }
    }
    
    dcaBtcAmount = dcaBtcBought;
    
    // Combine loan and DCA
    btcAmount = loanBtcAmount + dcaBtcAmount;
    const totalSpent = loanAmount + dcaTotalSpent;
    averageBuyPrice = (btcAmount > 0 && usdPlnRate > 0) ? totalSpent / (btcAmount * usdPlnRate) : btcBuyPrice;
  } else if (purchaseStrategy === 'savings') {
    // Lump sum from savings (no loan)
    btcAmount = (btcBuyPrice > 0 && usdPlnRate > 0) ? savingsAmount / (btcBuyPrice * usdPlnRate) : 0;
    averageBuyPrice = btcBuyPrice;
    loanBtcAmount = 0;
    dcaBtcAmount = 0;
    dcaTotalSpent = 0;
  }
  
  const breakEvenPrice = calculateBreakEvenPrice(loanAmount, totalInterest, btcAmount, usdPlnRate);

  // Strategy calculations
  const btcSoldPeak1 = btcAmount * (sellAtPeak1 / 100);
  const btcRemainingPeak2 = btcAmount - btcSoldPeak1;

  // Peak 1 calculations
  const valueSoldPeak1 = btcSoldPeak1 * btcPeak1 * usdPlnRate;
  const grossProfitPeak1 = valueSoldPeak1 - (btcSoldPeak1 * averageBuyPrice * usdPlnRate);
  const taxPeak1 = calculateTax(grossProfitPeak1);
  const netProfitPeak1 = grossProfitPeak1 - taxPeak1;

  // Peak 2 calculations
  const valueRemainingPeak2 = btcRemainingPeak2 * btcPeak2 * usdPlnRate;
  const grossProfitPeak2 = valueRemainingPeak2 - (btcRemainingPeak2 * averageBuyPrice * usdPlnRate);
  const totalGrossProfit = grossProfitPeak1 + grossProfitPeak2;
  
  const taxPeak2 = totalGrossProfit > TAX_RATES.THRESHOLD 
    ? calculateTax(totalGrossProfit, true) - taxPeak1
    : calculateTax(grossProfitPeak2);
  
  const netProfitPeak2 = grossProfitPeak2 - taxPeak2;

  // Long-term projections (2030, 2035, 2040)
  const valueAt2030 = btcAmount * btcPeak2030 * usdPlnRate;
  const valueAt2035 = btcAmount * finalBtcPeak2035 * usdPlnRate;
  const valueAt2040 = btcAmount * finalBtcPeak2040 * usdPlnRate;
  
  const grossProfit2030 = valueAt2030 - (btcAmount * averageBuyPrice * usdPlnRate);
  const grossProfit2035 = valueAt2035 - (btcAmount * averageBuyPrice * usdPlnRate);
  const grossProfit2040 = valueAt2040 - (btcAmount * averageBuyPrice * usdPlnRate);
  
  const tax2030 = calculateTax(grossProfit2030, grossProfit2030 > TAX_RATES.THRESHOLD);
  const tax2035 = calculateTax(grossProfit2035, grossProfit2035 > TAX_RATES.THRESHOLD);
  const tax2040 = calculateTax(grossProfit2040, grossProfit2040 > TAX_RATES.THRESHOLD);
  
  const netProfit2030 = grossProfit2030 - tax2030;
  const netProfit2035 = grossProfit2035 - tax2035;
  const netProfit2040 = grossProfit2040 - tax2040;

  // Total cost calculations for long-term scenarios
  const totalCost2030 = (btcAmount * averageBuyPrice * usdPlnRate) + (purchaseStrategy === 'lump' || purchaseStrategy === 'loan-dca' ? totalInterest : 0);
  const totalCost2035 = (btcAmount * averageBuyPrice * usdPlnRate) + (purchaseStrategy === 'lump' || purchaseStrategy === 'loan-dca' ? totalInterest : 0);
  const totalCost2040 = (btcAmount * averageBuyPrice * usdPlnRate) + (purchaseStrategy === 'lump' || purchaseStrategy === 'loan-dca' ? totalInterest : 0);

  // Total results
  const totalNetProfit = netProfitPeak1 + netProfitPeak2;

  // Full strategy comparisons
  const valueAtPeak1Full = btcAmount * btcPeak1 * usdPlnRate;
  const valueAtPeak2Full = btcAmount * btcPeak2 * usdPlnRate;
  
  const grossProfitFull1 = valueAtPeak1Full - (btcAmount * averageBuyPrice * usdPlnRate);
  const grossProfitFull2 = valueAtPeak2Full - (btcAmount * averageBuyPrice * usdPlnRate);
  
  const taxFull1 = calculateTax(grossProfitFull1);
  const taxFull2 = calculateTax(grossProfitFull2, grossProfitFull2 > TAX_RATES.THRESHOLD);
  
  const netProfitFull1 = grossProfitFull1 - taxFull1;
  const netProfitFull2 = grossProfitFull2 - taxFull2;

  // Bonds alternative calculations
  const bondsCompoundReturns = calculateCompoundReturns(bondsAmount, bondsRate, loanYears);
  const bondsTax = calculateTax(bondsCompoundReturns);
  const bondsNetReturn = bondsCompoundReturns - bondsTax;

  // S&P500 alternative calculations
  const sp500CompoundReturns = calculateCompoundReturns(loanAmount, sp500Return, loanYears);
  const sp500Tax = calculateTax(sp500CompoundReturns);
  const sp500NetReturn = sp500CompoundReturns - sp500Tax;

  // Inflation-adjusted calculations (real values)
  // Inflation factor = (1 + inflation_rate)^years
  const inflationFactor2027 = Math.pow(1 + (inflationRate || 0) / 100, 2); // 2 years to peak 1
  const inflationFactor2029 = Math.pow(1 + (inflationRate || 0) / 100, 4); // 4 years to peak 2
  const inflationFactor2030 = Math.pow(1 + (inflationRate || 0) / 100, 5); // 5 years to 2030
  const inflationFactor2035 = Math.pow(1 + (inflationRate || 0) / 100, 10); // 10 years to 2035
  const inflationFactor2040 = Math.pow(1 + (inflationRate || 0) / 100, 15); // 15 years to 2040
  
  // Real values (inflation-adjusted) - proper calculation
  // Real profit = Nominal profit - Inflation impact
  // Inflation impact = Nominal profit * (1 - 1/inflation_factor)
  // This gives us the purchasing power loss due to inflation
  const inflationImpact2027 = netProfitPeak1 * (1 - 1/inflationFactor2027);
  const inflationImpact2029 = netProfitPeak2 * (1 - 1/inflationFactor2029);
  const inflationImpact2030 = netProfit2030 * (1 - 1/inflationFactor2030);
  const inflationImpact2035 = netProfit2035 * (1 - 1/inflationFactor2035);
  const inflationImpact2040 = netProfit2040 * (1 - 1/inflationFactor2040);
  
  // Real profits (inflation-adjusted)
  const netProfitPeak1Real = netProfitPeak1 - inflationImpact2027;
  const netProfitPeak2Real = netProfitPeak2 - inflationImpact2029;
  const totalNetProfitReal = netProfitPeak1Real + netProfitPeak2Real;
  
  const netProfit2030Real = netProfit2030 - inflationImpact2030;
  const netProfit2035Real = netProfit2035 - inflationImpact2035;
  const netProfit2040Real = netProfit2040 - inflationImpact2040;
  
  // Full strategy real profits
  const netProfitFull1Real = netProfitFull1 - (netProfitFull1 * (1 - 1/inflationFactor2027));
  const netProfitFull2Real = netProfitFull2 - (netProfitFull2 * (1 - 1/inflationFactor2029));
  
  // Bonds real return
  const bondsInflationFactor = Math.pow(1 + (inflationRate || 0) / 100, loanYears);
  const bondsNetReturnReal = bondsNetReturn - (bondsNetReturn * (1 - 1/bondsInflationFactor));

  return {
    // State
    btcBuyPrice,
    setBtcBuyPrice,
    btcPeak1,
    setBtcPeak1,
    btcPeak2,
    setBtcPeak2,
    btcPeak2035,
    setBtcPeak2035,
    btcPeak2040,
    setBtcPeak2040,
    usdPlnRate,
    setUsdPlnRate,
    sellAtPeak1,
    setSellAtPeak1,
    payOffLoan,
    setPayOffLoan,
    selectedScenario,
    setSelectedScenario,
    inflationRate,
    setInflationRate,
    purchaseStrategy,
    setPurchaseStrategy,
    dcaYears,
    setDcaYears,
    dcaAmount,
    setDcaAmount,
    savingsAmount,
    setSavingsAmount,
    sp500Return,
    setSp500Return,

    // BTC calculations
    btcAmount,
    averageBuyPrice,
    breakEvenPrice,
    btcSoldPeak1,
    btcRemainingPeak2,
    loanBtcAmount,
    dcaBtcAmount,
    dcaTotalSpent,

    // Peak 1 results
    valueSoldPeak1,
    grossProfitPeak1,
    taxPeak1,
    netProfitPeak1,

    // Peak 2 results
    valueRemainingPeak2,
    grossProfitPeak2,
    taxPeak2,
    netProfitPeak2,
    totalGrossProfit,
    totalNetProfit,

    // Long-term projections
    btcPeak2030,
    finalBtcPeak2035,
    finalBtcPeak2040,
    valueAt2030,
    valueAt2035,
    valueAt2040,
    grossProfit2030,
    grossProfit2035,
    grossProfit2040,
    netProfit2030,
    netProfit2035,
    netProfit2040,
    tax2030,
    tax2035,
    tax2040,

    // Full strategy results
    valueAtPeak1Full,
    valueAtPeak2Full,
    grossProfitFull1,
    grossProfitFull2,
    netProfitFull1,
    netProfitFull2,

    // Bonds results
    bondsCompoundReturns,
    bondsTax,
    bondsNetReturn,

    // S&P500 results
    sp500CompoundReturns,
    sp500Tax,
    sp500NetReturn,

    // Inflation-adjusted results
    netProfitPeak1Real,
    netProfitPeak2Real,
    totalNetProfitReal,
    netProfit2030Real,
    netProfit2035Real,
    netProfit2040Real,
    netProfitFull1Real,
    netProfitFull2Real,
    bondsNetReturnReal,
    inflationFactor2027,
    inflationFactor2029,
    inflationFactor2030,
    inflationFactor2035,
    inflationFactor2040,

    // Total cost calculations
    totalCost2030,
    totalCost2035,
    totalCost2040,

    // Inflation-adjusted profit calculations (aliases for compatibility)
    inflationAdjustedProfit2030: netProfit2030Real,
    inflationAdjustedProfit2035: netProfit2035Real,
    inflationAdjustedProfit2040: netProfit2040Real
  };
}; 