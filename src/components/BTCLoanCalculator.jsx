import { useLoanCalculations } from '../hooks/useLoanCalculations';
import { useBTCStrategy } from '../hooks/useBTCStrategy';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import RiskWarning from './RiskWarning';
import PurchaseStrategySection from './sections/PurchaseStrategySection';
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
    { year: 2025, price: btcStrategy.btcBuyPrice, value: loanCalcs.loanAmount, bonds: loanCalcs.bondsAmount, sp500: loanCalcs.loanAmount, event: 'Zakup' },
    { year: 2026, price: btcStrategy.btcBuyPrice * 0.9, value: loanCalcs.loanAmount * 0.9, bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 1), sp500: loanCalcs.loanAmount * Math.pow(1 + btcStrategy.sp500Return / 100, 1), event: 'Bessa' },
    { year: 2027, price: btcStrategy.btcPeak1, value: btcStrategy.valueAtPeak1Full, bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 2), sp500: loanCalcs.loanAmount * Math.pow(1 + btcStrategy.sp500Return / 100, 2), event: `Szczyt 1 (sprzedaż ${btcStrategy.sellAtPeak1}%)` },
    { year: 2028, price: btcStrategy.btcPeak1 * 0.4, value: btcStrategy.valueRemainingPeak2 * (btcStrategy.btcPeak1 * 0.4 / btcStrategy.btcPeak2), bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 3), sp500: loanCalcs.loanAmount * Math.pow(1 + btcStrategy.sp500Return / 100, 3), event: 'Korekta' },
    { year: 2029, price: btcStrategy.btcPeak2, value: btcStrategy.valueRemainingPeak2, bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 4), sp500: loanCalcs.loanAmount * Math.pow(1 + btcStrategy.sp500Return / 100, 4), event: `Szczyt 2 (${100-btcStrategy.sellAtPeak1}% BTC)` },
    { year: 2030, price: btcStrategy.btcPeak2030, value: btcStrategy.valueAt2030, bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 5), sp500: loanCalcs.loanAmount * Math.pow(1 + btcStrategy.sp500Return / 100, 5), event: 'Projekcja 2030' },
    { year: 2035, price: btcStrategy.finalBtcPeak2035, value: btcStrategy.valueAt2035, bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 10), sp500: loanCalcs.loanAmount * Math.pow(1 + btcStrategy.sp500Return / 100, 10), event: 'Projekcja 2035' },
    { year: 2040, price: btcStrategy.finalBtcPeak2040, value: btcStrategy.valueAt2040, bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 15), sp500: loanCalcs.loanAmount * Math.pow(1 + btcStrategy.sp500Return / 100, 15), event: 'Projekcja 2040' }
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto p-8 tech-card rounded-xl fade-in">
      <ThemeToggle />
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          Kalkulator kredytów na BTC - Symulator strategii
        </h1>
        <p className="text-lg text-secondary">
          Testuj różne scenariusze finansowania zakupu Bitcoin kredytami bankowymi
        </p>
      </div>
      <RiskWarning />
      <PurchaseStrategySection btcStrategy={btcStrategy} loanCalcs={loanCalcs} />
      <BTCParametersSection btcStrategy={btcStrategy} />
      <LongTermScenariosSection btcStrategy={btcStrategy} />
      <ComparisonChartsSection projectionData={projectionData} loanCalcs={loanCalcs} btcStrategy={btcStrategy} />
      <StrategySummarySection btcStrategy={btcStrategy} loanCalcs={loanCalcs} />
    </div>
  );
};

export default BTCLoanCalculator;