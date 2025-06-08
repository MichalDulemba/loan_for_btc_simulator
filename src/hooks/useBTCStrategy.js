import { useState } from 'react';
import { calculateBreakEvenPrice, calculateTax, calculateROI, calculateCompoundReturns } from '../utils/calculations';
import { DEFAULT_VALUES, TAX_RATES } from '../constants/defaults';

export const useBTCStrategy = (loanAmount, totalInterest, bondsAmount, bondsRate, loanYears) => {
  const [btcBuyPrice, setBtcBuyPrice] = useState(DEFAULT_VALUES.btcBuyPrice);
  const [btcPeak1, setBtcPeak1] = useState(DEFAULT_VALUES.btcPeak1);
  const [btcPeak2, setBtcPeak2] = useState(DEFAULT_VALUES.btcPeak2);
  const [usdPlnRate, setUsdPlnRate] = useState(DEFAULT_VALUES.usdPlnRate);
  const [sellAtPeak1, setSellAtPeak1] = useState(DEFAULT_VALUES.sellAtPeak1);
  const [payOffLoan, setPayOffLoan] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState('neutral');
  const [inflationRate, setInflationRate] = useState(DEFAULT_VALUES.inflationRate);

  // BTC calculations
  const btcAmount = loanAmount / (btcBuyPrice * usdPlnRate);
  const breakEvenPrice = calculateBreakEvenPrice(loanAmount, totalInterest, btcAmount, usdPlnRate);

  // Strategy calculations
  const btcSoldPeak1 = btcAmount * (sellAtPeak1 / 100);
  const btcRemainingPeak2 = btcAmount - btcSoldPeak1;

  // Peak 1 calculations
  const valueSoldPeak1 = btcSoldPeak1 * btcPeak1 * usdPlnRate;
  const grossProfitPeak1 = valueSoldPeak1 - (loanAmount * sellAtPeak1 / 100);
  const taxPeak1 = calculateTax(grossProfitPeak1);
  const netProfitPeak1 = grossProfitPeak1 - taxPeak1;

  // Peak 2 calculations
  const valueRemainingPeak2 = btcRemainingPeak2 * btcPeak2 * usdPlnRate;
  const grossProfitPeak2 = valueRemainingPeak2 - (loanAmount * (100 - sellAtPeak1) / 100);
  const totalGrossProfit = grossProfitPeak1 + grossProfitPeak2;
  
  const taxPeak2 = totalGrossProfit > TAX_RATES.THRESHOLD 
    ? calculateTax(totalGrossProfit, true) - taxPeak1
    : calculateTax(grossProfitPeak2);
  
  const netProfitPeak2 = grossProfitPeak2 - taxPeak2;

  // Total results
  const totalNetProfit = netProfitPeak1 + netProfitPeak2;

  // Full strategy comparisons
  const valueAtPeak1Full = btcAmount * btcPeak1 * usdPlnRate;
  const valueAtPeak2Full = btcAmount * btcPeak2 * usdPlnRate;
  
  const grossProfitFull1 = valueAtPeak1Full - loanAmount;
  const grossProfitFull2 = valueAtPeak2Full - loanAmount;
  
  const taxFull1 = calculateTax(grossProfitFull1);
  const taxFull2 = calculateTax(grossProfitFull2, grossProfitFull2 > TAX_RATES.THRESHOLD);
  
  const netProfitFull1 = grossProfitFull1 - taxFull1;
  const netProfitFull2 = grossProfitFull2 - taxFull2;

  // Bonds alternative calculations
  const bondsCompoundReturns = calculateCompoundReturns(bondsAmount, bondsRate, loanYears);
  const bondsTax = calculateTax(bondsCompoundReturns);
  const bondsNetReturn = bondsCompoundReturns - bondsTax;

  // Inflation-adjusted calculations (real values)
  const inflationFactor2027 = Math.pow(1 + inflationRate / 100, 2); // 2 years to peak 1
  const inflationFactor2029 = Math.pow(1 + inflationRate / 100, 4); // 4 years to peak 2
  
  // Real values (inflation-adjusted)
  const netProfitPeak1Real = netProfitPeak1 / inflationFactor2027;
  const netProfitPeak2Real = netProfitPeak2 / inflationFactor2029;
  const totalNetProfitReal = netProfitPeak1Real + netProfitPeak2Real;
  
  const netProfitFull1Real = netProfitFull1 / inflationFactor2027;
  const netProfitFull2Real = netProfitFull2 / inflationFactor2029;
  
  const bondsNetReturnReal = bondsNetReturn / Math.pow(1 + inflationRate / 100, loanYears);

  return {
    // State
    btcBuyPrice,
    setBtcBuyPrice,
    btcPeak1,
    setBtcPeak1,
    btcPeak2,
    setBtcPeak2,
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

    // BTC calculations
    btcAmount,
    breakEvenPrice,
    btcSoldPeak1,
    btcRemainingPeak2,

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

    // Inflation-adjusted results
    netProfitPeak1Real,
    netProfitPeak2Real,
    totalNetProfitReal,
    netProfitFull1Real,
    netProfitFull2Real,
    bondsNetReturnReal,
    inflationFactor2027,
    inflationFactor2029
  };
}; 