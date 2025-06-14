import { useState } from 'react';
import { calculateBreakEvenPrice, calculateTax, calculateROI, calculateCompoundReturns } from '../utils/calculations';
import { DEFAULT_VALUES, TAX_RATES } from '../constants/defaults';
import { SCENARIOS } from '../constants/scenarios';

export const useBTCStrategy = (loanAmount, totalInterest, bondsAmount, bondsRate, loanYears) => {
  const [btcBuyPrice, setBtcBuyPrice] = useState(DEFAULT_VALUES.btcBuyPrice);
  const [btcPeak1, setBtcPeak1] = useState(DEFAULT_VALUES.btcPeak1);
  const [btcPeak2, setBtcPeak2] = useState(DEFAULT_VALUES.btcPeak2);
  const [usdPlnRate, setUsdPlnRate] = useState(DEFAULT_VALUES.usdPlnRate);
  const [sellAtPeak1, setSellAtPeak1] = useState(DEFAULT_VALUES.sellAtPeak1);
  const [payOffLoan, setPayOffLoan] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState('neutral');
  const [inflationRate, setInflationRate] = useState(DEFAULT_VALUES.inflationRate);

  // Get scenario prices
  const scenario = SCENARIOS[selectedScenario];
  const btcPeak2030 = scenario?.peak2030 || 400000;
  const btcPeak2035 = scenario?.peak2035 || 800000;
  const btcPeak2040 = scenario?.peak2040 || 1200000;

  // BTC calculations
  const btcAmount = (btcBuyPrice > 0 && usdPlnRate > 0) ? loanAmount / (btcBuyPrice * usdPlnRate) : 0;
  const breakEvenPrice = calculateBreakEvenPrice(loanAmount, totalInterest, btcAmount, usdPlnRate);

  // Strategy calculations
  const btcSoldPeak1 = btcAmount * (sellAtPeak1 / 100);
  const btcRemainingPeak2 = btcAmount - btcSoldPeak1;

  // Peak 1 calculations
  const valueSoldPeak1 = btcSoldPeak1 * btcPeak1 * usdPlnRate;
  const grossProfitPeak1 = valueSoldPeak1 - (btcSoldPeak1 * btcBuyPrice * usdPlnRate);
  const taxPeak1 = calculateTax(grossProfitPeak1);
  const netProfitPeak1 = grossProfitPeak1 - taxPeak1;

  // Peak 2 calculations
  const valueRemainingPeak2 = btcRemainingPeak2 * btcPeak2 * usdPlnRate;
  const grossProfitPeak2 = valueRemainingPeak2 - (btcRemainingPeak2 * btcBuyPrice * usdPlnRate);
  const totalGrossProfit = grossProfitPeak1 + grossProfitPeak2;
  
  const taxPeak2 = totalGrossProfit > TAX_RATES.THRESHOLD 
    ? calculateTax(totalGrossProfit, true) - taxPeak1
    : calculateTax(grossProfitPeak2);
  
  const netProfitPeak2 = grossProfitPeak2 - taxPeak2;

  // Long-term projections (2030, 2035, 2040)
  const valueAt2030 = btcAmount * btcPeak2030 * usdPlnRate;
  const valueAt2035 = btcAmount * btcPeak2035 * usdPlnRate;
  const valueAt2040 = btcAmount * btcPeak2040 * usdPlnRate;
  
  const grossProfit2030 = valueAt2030 - (btcAmount * btcBuyPrice * usdPlnRate);
  const grossProfit2035 = valueAt2035 - (btcAmount * btcBuyPrice * usdPlnRate);
  const grossProfit2040 = valueAt2040 - (btcAmount * btcBuyPrice * usdPlnRate);
  
  const tax2030 = calculateTax(grossProfit2030, grossProfit2030 > TAX_RATES.THRESHOLD);
  const tax2035 = calculateTax(grossProfit2035, grossProfit2035 > TAX_RATES.THRESHOLD);
  const tax2040 = calculateTax(grossProfit2040, grossProfit2040 > TAX_RATES.THRESHOLD);
  
  const netProfit2030 = grossProfit2030 - tax2030;
  const netProfit2035 = grossProfit2035 - tax2035;
  const netProfit2040 = grossProfit2040 - tax2040;

  // Total results
  const totalNetProfit = netProfitPeak1 + netProfitPeak2;

  // Full strategy comparisons
  const valueAtPeak1Full = btcAmount * btcPeak1 * usdPlnRate;
  const valueAtPeak2Full = btcAmount * btcPeak2 * usdPlnRate;
  
  const grossProfitFull1 = valueAtPeak1Full - (btcAmount * btcBuyPrice * usdPlnRate);
  const grossProfitFull2 = valueAtPeak2Full - (btcAmount * btcBuyPrice * usdPlnRate);
  
  const taxFull1 = calculateTax(grossProfitFull1);
  const taxFull2 = calculateTax(grossProfitFull2, grossProfitFull2 > TAX_RATES.THRESHOLD);
  
  const netProfitFull1 = grossProfitFull1 - taxFull1;
  const netProfitFull2 = grossProfitFull2 - taxFull2;

  // Bonds alternative calculations
  const bondsCompoundReturns = calculateCompoundReturns(bondsAmount, bondsRate, loanYears);
  const bondsTax = calculateTax(bondsCompoundReturns);
  const bondsNetReturn = bondsCompoundReturns - bondsTax;

  // Inflation-adjusted calculations (real values)
  const inflationFactor2027 = Math.pow(1 + (inflationRate || 0) / 100, 2); // 2 years to peak 1
  const inflationFactor2029 = Math.pow(1 + (inflationRate || 0) / 100, 4); // 4 years to peak 2
  const inflationFactor2030 = Math.pow(1 + (inflationRate || 0) / 100, 5); // 5 years to 2030
  const inflationFactor2035 = Math.pow(1 + (inflationRate || 0) / 100, 10); // 10 years to 2035
  const inflationFactor2040 = Math.pow(1 + (inflationRate || 0) / 100, 15); // 15 years to 2040
  
  // Real values (inflation-adjusted)
  const netProfitPeak1Real = inflationFactor2027 > 0 ? netProfitPeak1 / inflationFactor2027 : netProfitPeak1;
  const netProfitPeak2Real = inflationFactor2029 > 0 ? netProfitPeak2 / inflationFactor2029 : netProfitPeak2;
  const totalNetProfitReal = netProfitPeak1Real + netProfitPeak2Real;
  
  const netProfit2030Real = inflationFactor2030 > 0 ? netProfit2030 / inflationFactor2030 : netProfit2030;
  const netProfit2035Real = inflationFactor2035 > 0 ? netProfit2035 / inflationFactor2035 : netProfit2035;
  const netProfit2040Real = inflationFactor2040 > 0 ? netProfit2040 / inflationFactor2040 : netProfit2040;
  
  const netProfitFull1Real = inflationFactor2027 > 0 ? netProfitFull1 / inflationFactor2027 : netProfitFull1;
  const netProfitFull2Real = inflationFactor2029 > 0 ? netProfitFull2 / inflationFactor2029 : netProfitFull2;
  
  const bondsNetReturnReal = Math.pow(1 + (inflationRate || 0) / 100, loanYears) > 0 ? 
    bondsNetReturn / Math.pow(1 + (inflationRate || 0) / 100, loanYears) : bondsNetReturn;

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

    // Long-term projections
    btcPeak2030,
    btcPeak2035,
    btcPeak2040,
    valueAt2030,
    valueAt2035,
    valueAt2040,
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
    inflationFactor2040
  };
}; 