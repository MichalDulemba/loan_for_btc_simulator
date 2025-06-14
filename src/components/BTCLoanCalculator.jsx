import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, DollarSign, Target, Percent, PiggyBank, Calendar } from 'lucide-react';

// Import custom hooks
import { useLoanCalculations } from '../hooks/useLoanCalculations';
import { useBTCStrategy } from '../hooks/useBTCStrategy';

// Import components
import LoanParameters from './LoanParameters';
import BTCParameters from './BTCParameters';

// Import utilities
import { formatPLN, formatUSD, formatPercentage, formatNumber } from '../utils/formatters';
import { calculateROI } from '../utils/calculations';
import { ASSUMPTIONS } from '../constants/defaults';

const BTCLoanCalculator = () => {
  // Use custom hooks for state management and calculations
  const loanCalcs = useLoanCalculations();
  const btcStrategy = useBTCStrategy(
    loanCalcs.loanAmount,
    loanCalcs.totalInterest,
    loanCalcs.bondsAmount,
    loanCalcs.bondsRate,
    loanCalcs.loanYears
  );

  // Calculate final results
  const adjustedTotalInterest = loanCalcs.calculateAdjustedInterest(
    btcStrategy.payOffLoan ? btcStrategy.netProfitPeak1 : 0
  );
  
  const finalProfitTotal = btcStrategy.totalNetProfit - adjustedTotalInterest;
  const finalProfitFull1 = btcStrategy.netProfitFull1 - loanCalcs.totalInterest;
  const finalProfitFull2 = btcStrategy.netProfitFull2 - loanCalcs.totalInterest;
  const bondsNetProfit = btcStrategy.bondsNetReturn - loanCalcs.bondsTotalInterest;

  // Projection data for charts with new scenarios
  const projectionData = [
    { 
      year: 2025, 
      price: btcStrategy.btcBuyPrice, 
      value: loanCalcs.loanAmount, 
      bonds: loanCalcs.bondsAmount,
      event: 'Zakup' 
    },
    { 
      year: 2026, 
      price: btcStrategy.btcBuyPrice * 0.9, 
      value: loanCalcs.loanAmount * 0.9, 
      bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 1),
      event: 'Bessa' 
    },
    { 
      year: 2027, 
      price: btcStrategy.btcPeak1, 
      value: btcStrategy.valueAtPeak1Full, 
      bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 2),
      event: `Szczyt 1 (sprzedaż ${btcStrategy.sellAtPeak1}%)` 
    },
    { 
      year: 2028, 
      price: btcStrategy.btcPeak1 * 0.4, 
      value: btcStrategy.valueRemainingPeak2 * (btcStrategy.btcPeak1 * 0.4 / btcStrategy.btcPeak2), 
      bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 3),
      event: 'Korekta' 
    },
    { 
      year: 2029, 
      price: btcStrategy.btcPeak2, 
      value: btcStrategy.valueRemainingPeak2, 
      bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 4),
      event: `Szczyt 2 (${100-btcStrategy.sellAtPeak1}% BTC)` 
    },
    { 
      year: 2030, 
      price: btcStrategy.btcPeak2030, 
      value: btcStrategy.valueAt2030, 
      bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 5),
      event: 'Projekcja 2030' 
    },
    { 
      year: 2035, 
      price: btcStrategy.btcPeak2035, 
      value: btcStrategy.valueAt2035, 
      bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 10),
      event: 'Projekcja 2035' 
    },
    { 
      year: 2040, 
      price: btcStrategy.btcPeak2040, 
      value: btcStrategy.valueAt2040, 
      bonds: loanCalcs.bondsAmount * Math.pow(1 + loanCalcs.bondsRate / 100, 15),
      event: 'Projekcja 2040' 
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-8 dark-card rounded-xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Kalkulator kredytów na BTC - Symulator strategii
        </h1>
        <p className="text-lg text-gray-300">
          Testuj różne scenariusze finansowania zakupu Bitcoin kredytami bankowymi
        </p>
      </div>

      {/* Ostrzeżenie o ryzyku */}
      <div className="bg-red-900/20 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
        <div className="flex items-center">
          <AlertTriangle className="text-red-400 mr-3" size={28} />
          <div>
            <p className="font-semibold text-red-300 text-lg">Ostrzeżenie o wysokim ryzyku</p>
            <p className="text-red-200 text-base mt-2">
              Inwestowanie pożyczonych pieniędzy w kryptowaluty niesie ekstremalne ryzyko. 
              Możesz stracić więcej niż zainwestowałeś. Przemyśl decyzję dokładnie.
            </p>
          </div>
        </div>
      </div>

      {/* Loan Parameters Component */}
      <LoanParameters
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

      {/* BTC Parameters Component */}
      <BTCParameters
        btcBuyPrice={btcStrategy.btcBuyPrice}
        setBtcBuyPrice={btcStrategy.setBtcBuyPrice}
        btcPeak1={btcStrategy.btcPeak1}
        setBtcPeak1={btcStrategy.setBtcPeak1}
        btcPeak2={btcStrategy.btcPeak2}
        setBtcPeak2={btcStrategy.setBtcPeak2}
        usdPlnRate={btcStrategy.usdPlnRate}
        setUsdPlnRate={btcStrategy.setUsdPlnRate}
        selectedScenario={btcStrategy.selectedScenario}
        setSelectedScenario={btcStrategy.setSelectedScenario}
        btcAmount={btcStrategy.btcAmount}
        breakEvenPrice={btcStrategy.breakEvenPrice}
        inflationRate={btcStrategy.inflationRate}
        setInflationRate={btcStrategy.setInflationRate}
      />

      {/* Long-term Scenarios Section */}
      <div className="mb-10 dark-card p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 flex items-center text-white">
          <Calendar className="mr-3" size={24} />
          Scenariusze długoterminowe (2030-2040)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 2030 Scenario */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-6 rounded-lg border border-blue-600/30">
            <h3 className="font-semibold mb-4 text-lg text-blue-300">
              2030 - ${formatNumber(btcStrategy.btcPeak2030)}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Wartość BTC:</span>
                <span className="font-semibold text-white">{formatPLN(btcStrategy.valueAt2030)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Zysk brutto:</span>
                <span className="font-semibold text-green-400">{formatPLN(btcStrategy.grossProfit2030)}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Podatek:</span>
                <span className="font-semibold">-{formatPLN(btcStrategy.tax2030)}</span>
              </div>
              <div className="border-t border-blue-600/30 pt-2 mt-2">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-white">Zysk netto:</span>
                  <span className="font-bold text-green-400">
                    {formatPLN(btcStrategy.netProfit2030)}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <p>ROI: {formatPercentage(calculateROI(btcStrategy.netProfit2030, loanCalcs.loanAmount))}</p>
                <p>Realna wartość: {formatPLN(btcStrategy.netProfit2030Real)}</p>
              </div>
            </div>
          </div>

          {/* 2035 Scenario */}
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-6 rounded-lg border border-purple-600/30">
            <h3 className="font-semibold mb-4 text-lg text-purple-300">
              2035 - ${formatNumber(btcStrategy.btcPeak2035)}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Wartość BTC:</span>
                <span className="font-semibold text-white">{formatPLN(btcStrategy.valueAt2035)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Zysk brutto:</span>
                <span className="font-semibold text-green-400">{formatPLN(btcStrategy.grossProfit2035)}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Podatek:</span>
                <span className="font-semibold">-{formatPLN(btcStrategy.tax2035)}</span>
              </div>
              <div className="border-t border-purple-600/30 pt-2 mt-2">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-white">Zysk netto:</span>
                  <span className="font-bold text-green-400">
                    {formatPLN(btcStrategy.netProfit2035)}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <p>ROI: {formatPercentage(calculateROI(btcStrategy.netProfit2035, loanCalcs.loanAmount))}</p>
                <p>Realna wartość: {formatPLN(btcStrategy.netProfit2035Real)}</p>
              </div>
            </div>
          </div>

          {/* 2040 Scenario */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 p-6 rounded-lg border border-emerald-600/30">
            <h3 className="font-semibold mb-4 text-lg text-emerald-300">
              2040 - ${formatNumber(btcStrategy.btcPeak2040)}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Wartość BTC:</span>
                <span className="font-semibold text-white">{formatPLN(btcStrategy.valueAt2040)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Zysk brutto:</span>
                <span className="font-semibold text-green-400">{formatPLN(btcStrategy.grossProfit2040)}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Podatek:</span>
                <span className="font-semibold">-{formatPLN(btcStrategy.tax2040)}</span>
              </div>
              <div className="border-t border-emerald-600/30 pt-2 mt-2">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-white">Zysk netto:</span>
                  <span className="font-bold text-green-400">
                    {formatPLN(btcStrategy.netProfit2040)}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <p>ROI: {formatPercentage(calculateROI(btcStrategy.netProfit2040, loanCalcs.loanAmount))}</p>
                <p>Realna wartość: {formatPLN(btcStrategy.netProfit2040Real)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Configuration */}
      <div className="mb-10 dark-card p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 flex items-center text-white">
          <Target className="mr-3" size={24} />
          Strategia realizacji zysków
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-300 mb-2">
              Sprzedaż na szczycie 1 (%)
            </label>
            <input
              type="number"
              value={btcStrategy.sellAtPeak1}
              onChange={(e) => btcStrategy.setSellAtPeak1(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full px-4 py-3 dark-input rounded-md text-base"
              min="0"
              max="100"
            />
            <input
              type="range"
              value={btcStrategy.sellAtPeak1}
              onChange={(e) => btcStrategy.setSellAtPeak1(parseInt(e.target.value))}
              min="0"
              max="100"
              step="5"
              className="w-full mt-2"
            />
            <p className="text-base text-gray-400 mt-2">
              Sprzedaż: {(btcStrategy.btcAmount * btcStrategy.sellAtPeak1 / 100).toFixed(4)} BTC | 
              Zostaje: {(btcStrategy.btcAmount * (100 - btcStrategy.sellAtPeak1) / 100).toFixed(4)} BTC
            </p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-300 mb-4">
              Opcje reinwestycji
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={btcStrategy.payOffLoan}
                  onChange={(e) => btcStrategy.setPayOffLoan(e.target.checked)}
                  className="mr-3"
                />
                <span className="text-base text-gray-300">Spłać część kredytu z zysków ze szczytu 1</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-10 dark-card p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 flex items-center text-white">
          <Target className="mr-3" size={24} />
          Analiza wyników - Strategia {btcStrategy.sellAtPeak1}% / {100 - btcStrategy.sellAtPeak1}%
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Peak 1 Results */}
          <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 p-6 rounded-lg border border-blue-600/30">
            <h3 className="font-semibold mb-4 text-lg text-blue-300">
              Szczyt 1 ({formatUSD(btcStrategy.btcPeak1)}) - Sprzedaż {btcStrategy.sellAtPeak1}%
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Sprzedane BTC:</span>
                <span className="font-semibold text-white">{btcStrategy.btcSoldPeak1.toFixed(4)} BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Wartość sprzedaży:</span>
                <span className="font-semibold text-white">{formatPLN(btcStrategy.valueSoldPeak1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Zysk brutto:</span>
                <span className="font-semibold text-green-400">{formatPLN(btcStrategy.grossProfitPeak1)}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Podatek (19%):</span>
                <span className="font-semibold">-{formatPLN(btcStrategy.taxPeak1)}</span>
              </div>
              <div className="border-t border-blue-600/30 pt-2 mt-2">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-white">Zysk netto:</span>
                  <span className="font-bold text-green-400">
                    {formatPLN(btcStrategy.netProfitPeak1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Peak 2 Results */}
          <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 p-6 rounded-lg border border-green-600/30">
            <h3 className="font-semibold mb-4 text-lg text-green-300">
              Szczyt 2 ({formatUSD(btcStrategy.btcPeak2)}) - Pozostałe {100 - btcStrategy.sellAtPeak1}%
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Pozostałe BTC:</span>
                <span className="font-semibold text-white">{btcStrategy.btcRemainingPeak2.toFixed(4)} BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Wartość BTC:</span>
                <span className="font-semibold text-white">{formatPLN(btcStrategy.valueRemainingPeak2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Zysk brutto:</span>
                <span className="font-semibold text-green-400">{formatPLN(btcStrategy.grossProfitPeak2)}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Podatek {btcStrategy.totalGrossProfit > 1000000 ? '(19%+4%)' : '(19%)'}:</span>
                <span className="font-semibold">-{formatPLN(btcStrategy.taxPeak2)}</span>
              </div>
              <div className="border-t border-green-600/30 pt-2 mt-2">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-white">Zysk netto:</span>
                  <span className="font-bold text-green-400">
                    {formatPLN(btcStrategy.netProfitPeak2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Strategy Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-lg border border-purple-600/30">
          <h3 className="font-semibold mb-3 text-purple-300">Podsumowanie całej strategii</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Łączny zysk netto:</span>
                <span className="font-semibold text-white">{formatPLN(btcStrategy.totalNetProfit)}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Koszt odsetek:</span>
                <span className="font-semibold">-{formatPLN(adjustedTotalInterest)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-white">Zysk końcowy:</span>
                <span className={finalProfitTotal > 0 ? 'text-green-400' : 'text-red-400'}>
                  {formatPLN(finalProfitTotal)}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">ROI:</span>
                <span className={`font-bold text-lg ${finalProfitTotal > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatPercentage(calculateROI(finalProfitTotal, loanCalcs.loanAmount))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Vs. 100% HODL:</span>
                <span className="font-semibold text-white">
                  {finalProfitTotal > finalProfitFull2 ? '+' : ''}{formatPLN(finalProfitTotal - finalProfitFull2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inflation-adjusted Results */}
      <div className="mb-10 p-6 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-lg border-2 border-amber-600/30">
        <h2 className="text-2xl font-semibold mb-6 flex items-center text-amber-300">
          📊 Wyniki po korekcie inflacyjnej ({btcStrategy.inflationRate}% rocznie)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strategy Results - Real Values */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600/30">
            <h3 className="font-semibold mb-4 text-gray-200">Strategia częściowej sprzedaży (realna wartość)</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Zysk netto Szczyt 1 (2027):</span>
                <span className="font-semibold text-green-400">
                  {formatPLN(btcStrategy.netProfitPeak1Real)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Zysk netto Szczyt 2 (2029):</span>
                <span className="font-semibold text-green-400">
                  {formatPLN(btcStrategy.netProfitPeak2Real)}
                </span>
              </div>
              <div className="border-t border-gray-600/30 pt-3 mt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-white">Łączny zysk realny:</span>
                  <span className="font-bold text-green-400">
                    {formatPLN(btcStrategy.totalNetProfitReal)}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <p>Nominalna wartość: {formatPLN(btcStrategy.totalNetProfit)}</p>
                <p>Utrata siły nabywczej: -{formatPercentage((btcStrategy.totalNetProfit - btcStrategy.totalNetProfitReal) / btcStrategy.totalNetProfit)}</p>
              </div>
            </div>
          </div>

          {/* Full HODL - Real Values */}
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600/30">
            <h3 className="font-semibold mb-4 text-gray-200">Pełne HODL (realna wartość)</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Sprzedaż w 2027 (${formatNumber(btcStrategy.btcPeak1)}):</span>
                <span className="font-semibold text-blue-400">
                  {formatPLN(btcStrategy.netProfitFull1Real)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Sprzedaż w 2029 (${formatNumber(btcStrategy.btcPeak2)}):</span>
                <span className="font-semibold text-blue-400">
                  {formatPLN(btcStrategy.netProfitFull2Real)}
                </span>
              </div>
              <div className="border-t border-gray-600/30 pt-3 mt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-white">Obligacje (realne):</span>
                  <span className="font-bold text-green-400">
                    {formatPLN(btcStrategy.bondsNetReturnReal)}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <p>Nominalna wartość: {formatPLN(btcStrategy.bondsNetReturn)}</p>
                <p>Utrata siły nabywczej: -{formatPercentage((btcStrategy.bondsNetReturn - btcStrategy.bondsNetReturnReal) / btcStrategy.bondsNetReturn)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inflation Impact Summary */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
          <h4 className="font-semibold mb-3 text-amber-300">💰 Wpływ inflacji na strategię</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-200">Do 2027 (2 lata):</p>
              <p className="text-gray-300">Inflacja skumulowana: {formatPercentage((btcStrategy.inflationFactor2027 - 1))}</p>
              <p className="text-gray-300">1 PLN dziś = {(1/btcStrategy.inflationFactor2027).toFixed(2)} PLN realnie</p>
            </div>
            <div>
              <p className="font-semibold text-gray-200">Do 2029 (4 lata):</p>
              <p className="text-gray-300">Inflacja skumulowana: {formatPercentage((btcStrategy.inflationFactor2029 - 1))}</p>
              <p className="text-gray-300">1 PLN dziś = {(1/btcStrategy.inflationFactor2029).toFixed(2)} PLN realnie</p>
            </div>
            <div>
              <p className="font-semibold text-amber-300">Kluczowa obserwacja:</p>
              <p className="text-gray-300">Dług {loanCalcs.loanAmount.toLocaleString()} PLN będzie "wart" realnie mniej z czasem</p>
              <p className="text-gray-300">W 2029: ~{Math.round(loanCalcs.loanAmount / btcStrategy.inflationFactor2029).toLocaleString()} PLN dzisiejszej siły nabywczej</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Charts */}
      <div className="mb-8 dark-card p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-white">Wizualizacja strategii</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Projection Chart */}
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600/30">
            <h3 className="font-semibold mb-3 text-gray-200">Projekcja wartości BTC vs Obligacje</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9CA3AF" />
                <YAxis tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} stroke="#9CA3AF" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'value') return formatPLN(value);
                    if (name === 'price') return formatUSD(value);
                    if (name === 'bonds') return formatPLN(value);
                    return value;
                  }}
                  labelFormatter={(label) => `Rok ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(31, 41, 55, 0.95)', 
                    border: '1px solid #4B5563',
                    borderRadius: '8px',
                    color: '#E5E7EB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                  name="value"
                />
                <Line 
                  type="monotone" 
                  dataKey="bonds" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                  name="bonds"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 text-xs text-gray-400">
              <span className="text-blue-400">■</span> Strategia BTC | 
              <span className="text-green-400">■</span> Strategia Obligacji
            </div>
          </div>
          
          {/* ROI Comparison Chart */}
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600/30">
            <h3 className="font-semibold mb-3 text-gray-200">Porównanie zwrotu z inwestycji (ROI)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { 
                  strategy: 'BTC', 
                  roi: parseFloat(calculateROI(finalProfitTotal, loanCalcs.loanAmount).toFixed(1)),
                  profit: finalProfitTotal
                },
                { 
                  strategy: 'Obligacje', 
                  roi: parseFloat(calculateROI(bondsNetProfit, loanCalcs.bondsAmount).toFixed(1)),
                  profit: bondsNetProfit
                }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="strategy" stroke="#9CA3AF" />
                <YAxis tickFormatter={(value) => `${value}%`} stroke="#9CA3AF" />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'roi') return `${value}%`;
                    if (name === 'profit') return formatPLN(value);
                    return value;
                  }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(31, 41, 55, 0.95)', 
                    border: '1px solid #4B5563',
                    borderRadius: '8px',
                    color: '#E5E7EB'
                  }}
                />
                <Bar 
                  dataKey="roi" 
                  fill="#10B981"
                  name="roi"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strategy Recommendations */}
      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600/30">
        <h3 className="font-semibold mb-3 text-white">Kluczowe rekomendacje</h3>
        
        <div className="mb-4 p-3 bg-gray-700/50 rounded border border-gray-600/30">
          <h4 className="font-semibold mb-2 text-gray-200">🎯 Wybór strategii na podstawie wyników:</h4>
          <div className="text-sm">
            {finalProfitTotal > bondsNetProfit * 3 ? (
              <p className="text-green-400 font-semibold">
                ✅ BTC zdecydowanie opłacalne - potencjalny zysk {((finalProfitTotal / bondsNetProfit - 1) * 100).toFixed(0)}% wyższy od obligacji
              </p>
            ) : finalProfitTotal > bondsNetProfit ? (
              <p className="text-yellow-400 font-semibold">
                ⚖️ BTC umiarkowanie opłacalne - zysk {formatPLN(finalProfitTotal - bondsNetProfit)} wyższy, ale wyższe ryzyko
              </p>
            ) : (
              <p className="text-red-400 font-semibold">
                🛡️ Obligacje bezpieczniejsze - lepszy stosunek ryzyko/zysk o {formatPLN(bondsNetProfit - finalProfitTotal)}
              </p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-green-400">✓ Strategia BTC - kiedy wybierać</h4>
            <ul className="mt-2 space-y-1 text-gray-300">
              <li>• ROI BTC {'>'} {loanCalcs.bondsRate * 3}% (ponad 3x obligacje)</li>
              <li>• Jesteś gotowy na 80% straty tymczasowo</li>
              <li>• Masz stabilny dochód na raty</li>
              <li>• Kupujesz w bessie (jak teraz przy ${btcStrategy.btcBuyPrice.toLocaleString()})</li>
              <li>• Planasz trzymać 4+ lata</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-400">🛡️ Strategia Obligacji - kiedy wybierać</h4>
            <ul className="mt-2 space-y-1 text-gray-300">
              <li>• Chcesz gwarantowanego zysku {loanCalcs.bondsRate}%</li>
              <li>• Nie tolerujesz wysokiej volatilności</li>
              <li>• Potrzebujesz przewidywalności</li>
              <li>• ROI BTC {'<'} 2x obligacji</li>
              <li>• Blisko emerytury/potrzebujesz stabilności</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-red-400">✗ Czego unikać w obu strategiach</h4>
            <ul className="mt-2 space-y-1 text-gray-300">
              <li>• Nie kredytuj więcej niż 30% dochodu</li>
              <li>• Nie ignoruj podatków (19% w Polsce)</li>
              <li>• Nie inwestuj bez funduszu awaryjnego</li>
              <li>• Nie kupuj BTC na ATH</li>
              <li>• Nie zaniedbuj dywersyfikacji</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-700/50 rounded border border-gray-600/30">
          <p className="text-sm font-semibold text-gray-300">
            💡 Strategia hybrydowa: Możesz też podzielić kwotę - część na BTC (w bessie), część na obligacje (stabilność)
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-900/20 rounded border border-yellow-600/30">
          <p className="text-sm font-semibold text-yellow-300">
            ⚖️ Pamiętaj: Odsetki od kredytów na kryptowaluty NIE są kosztem uzyskania przychodu w Polsce!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BTCLoanCalculator;