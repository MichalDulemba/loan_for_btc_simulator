import React from 'react';
import PurchaseStrategy from '../PurchaseStrategy';

const PurchaseStrategySection = ({
  btcStrategy,
  loanCalcs
}) => (
  <PurchaseStrategy
    purchaseStrategy={btcStrategy.purchaseStrategy}
    setPurchaseStrategy={btcStrategy.setPurchaseStrategy}
    dcaYears={btcStrategy.dcaYears}
    setDcaYears={btcStrategy.setDcaYears}
    dcaAmount={btcStrategy.dcaAmount}
    setDcaAmount={btcStrategy.setDcaAmount}
    btcBuyPrice={btcStrategy.btcBuyPrice}
    setBtcBuyPrice={btcStrategy.setBtcBuyPrice}
    btcPeak1={btcStrategy.btcPeak1}
    usdPlnRate={btcStrategy.usdPlnRate}
    btcAmount={btcStrategy.btcAmount}
    averageBuyPrice={btcStrategy.averageBuyPrice}
    savingsAmount={btcStrategy.savingsAmount}
    setSavingsAmount={btcStrategy.setSavingsAmount}
    loanBtcAmount={btcStrategy.loanBtcAmount}
    dcaBtcAmount={btcStrategy.dcaBtcAmount}
    dcaTotalSpent={btcStrategy.dcaTotalSpent}
    // Loan parameters
    loanAmount={loanCalcs.loanAmount}
    setLoanAmount={loanCalcs.setLoanAmount}
    interestRate={loanCalcs.interestRate}
    setInterestRate={loanCalcs.setInterestRate}
    loanYears={loanCalcs.loanYears}
    setLoanYears={loanCalcs.setLoanYears}
    monthlyPayment={loanCalcs.monthlyPayment}
    totalLoanCost={loanCalcs.totalLoanCost}
    totalInterest={loanCalcs.totalInterest}
  />
);

export default PurchaseStrategySection; 