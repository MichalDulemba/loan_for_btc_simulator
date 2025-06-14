import React from 'react';
import BTCParameters from '../BTCParameters';

const BTCParametersSection = ({ btcStrategy }) => (
  <BTCParameters
    btcBuyPrice={btcStrategy.btcBuyPrice}
    btcPeak1={btcStrategy.btcPeak1}
    setBtcPeak1={btcStrategy.setBtcPeak1}
    btcPeak2={btcStrategy.btcPeak2}
    setBtcPeak2={btcStrategy.setBtcPeak2}
    btcPeak2035={btcStrategy.btcPeak2035}
    setBtcPeak2035={btcStrategy.setBtcPeak2035}
    btcPeak2040={btcStrategy.btcPeak2040}
    setBtcPeak2040={btcStrategy.setBtcPeak2040}
    usdPlnRate={btcStrategy.usdPlnRate}
    setUsdPlnRate={btcStrategy.setUsdPlnRate}
    selectedScenario={btcStrategy.selectedScenario}
    setSelectedScenario={btcStrategy.setSelectedScenario}
    btcAmount={btcStrategy.btcAmount}
    breakEvenPrice={btcStrategy.breakEvenPrice}
    inflationRate={btcStrategy.inflationRate}
    setInflationRate={btcStrategy.setInflationRate}
  />
);

export default BTCParametersSection; 