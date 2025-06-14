import { useLoanCalculations } from '../hooks/useLoanCalculations';
import { useBTCStrategy } from '../hooks/useBTCStrategy';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import RiskWarning from './RiskWarning';
import PurchaseStrategySection from './sections/PurchaseStrategySection';
import EconomicParametersSection from './sections/EconomicParametersSection';
import BTCParametersSection from './sections/BTCParametersSection';
import LongTermScenariosSection from './sections/LongTermScenariosSection';
import ComparisonChartsSection from './sections/ComparisonChartsSection';
import StrategySummarySection from './sections/StrategySummarySection';

const BTCLoanCalculator = () => {
  // Initialize theme
  useTheme();
  
  const loanCalcs = useLoanCalculations();
  const btcStrategy = useBTCStrategy(
    loanCalcs.loanAmount,
    loanCalcs.totalInterest,
    loanCalcs.bondsAmount,
    loanCalcs.bondsRate,
    loanCalcs.loanYears
  );

  // Projection data for charts with new scenarios
  const projectionData = [
    { year: 2025, value: 0, price: btcStrategy.btcBuyPrice, bonds: loanCalcs.bondsAmount },
    { year: 2026, value: btcStrategy.valueAtPeak1Full, price: btcStrategy.btcPeak1, bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 1) },
    { year: 2030, value: btcStrategy.valueAtPeak2Full, price: btcStrategy.btcPeak2, bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 5) },
    { year: 2035, value: btcStrategy.valueAt2035, price: btcStrategy.finalBtcPeak2035, bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 10) },
    { year: 2040, value: btcStrategy.valueAt2040, price: btcStrategy.finalBtcPeak2040, bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 15) }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            🚀 Kalkulator Kredytu BTC
          </h1>
          <ThemeToggle />
        </div>

        <RiskWarning />

        {/* Purchase Strategy Section */}
        <PurchaseStrategySection 
          btcStrategy={btcStrategy}
          loanCalcs={loanCalcs}
        />

        {/* Economic Parameters Section */}
        <EconomicParametersSection 
          btcStrategy={btcStrategy}
        />

        {/* BTC Parameters Section */}
        <BTCParametersSection 
          btcStrategy={btcStrategy}
        />

        {/* Strategy Summary Section */}
        <StrategySummarySection 
          btcStrategy={btcStrategy}
          loanCalcs={loanCalcs}
        />

        {/* Long-term Scenarios Section */}
        <LongTermScenariosSection 
          btcStrategy={btcStrategy}
        />

        {/* Comparison Charts Section */}
        <ComparisonChartsSection 
          btcStrategy={btcStrategy}
          loanCalcs={loanCalcs}
          projectionData={projectionData}
        />
      </div>
    </div>
  );
};

export default BTCLoanCalculator;