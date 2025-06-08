import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, DollarSign, Target, Percent, PiggyBank } from 'lucide-react';

// Import custom hooks
import { useLoanCalculations } from '../hooks/useLoanCalculations';
import { useBTCStrategy } from '../hooks/useBTCStrategy';

// Import components
import LoanParameters from './LoanParameters';
import BTCParameters from './BTCParameters';

// Import utilities
import { formatPLN, formatUSD, formatPercentage } from '../utils/formatters';
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

  // Projection data for charts
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
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Kalkulator kredytów na BTC - Symulator strategii
        </h1>
        <p className="text-lg text-gray-600">
          Testuj różne scenariusze finansowania zakupu Bitcoin kredytami bankowymi
        </p>
      </div>

      {/* Ostrzeżenie o ryzyku */}
      <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
        <div className="flex items-center">
          <AlertTriangle className="text-red-500 mr-3" size={28} />
          <div>
            <p className="font-semibold text-red-800 text-lg">Ostrzeżenie o wysokim ryzyku</p>
            <p className="text-red-700 text-base mt-2">
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
      />

      {/* Strategy Configuration */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Target className="mr-3" size={24} />
          Strategia realizacji zysków
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Sprzedaż na szczycie 1 (%)
            </label>
            <input
              type="number"
              value={btcStrategy.sellAtPeak1}
              onChange={(e) => btcStrategy.setSellAtPeak1(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
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
            <p className="text-base text-gray-600 mt-2">
              Sprzedaż: {(btcStrategy.btcAmount * btcStrategy.sellAtPeak1 / 100).toFixed(4)} BTC | 
              Zostaje: {(btcStrategy.btcAmount * (100 - btcStrategy.sellAtPeak1) / 100).toFixed(4)} BTC
            </p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-700 mb-4">
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
                <span className="text-base">Spłać część kredytu z zysków ze szczytu 1</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Target className="mr-3" size={24} />
          Analiza wyników - Strategia {btcStrategy.sellAtPeak1}% / {100 - btcStrategy.sellAtPeak1}%
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Peak 1 Results */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <h3 className="font-semibold mb-4 text-lg">
              Szczyt 1 ({formatUSD(btcStrategy.btcPeak1)}) - Sprzedaż {btcStrategy.sellAtPeak1}%
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Sprzedane BTC:</span>
                <span className="font-semibold">{btcStrategy.btcSoldPeak1.toFixed(4)} BTC</span>
              </div>
              <div className="flex justify-between">
                <span>Wartość sprzedaży:</span>
                <span className="font-semibold">{formatPLN(btcStrategy.valueSoldPeak1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Zysk brutto:</span>
                <span className="font-semibold">{formatPLN(btcStrategy.grossProfitPeak1)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Podatek (19%):</span>
                <span className="font-semibold">-{formatPLN(btcStrategy.taxPeak1)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Zysk netto:</span>
                  <span className="font-bold text-green-600">
                    {formatPLN(btcStrategy.netProfitPeak1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Peak 2 Results */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <h3 className="font-semibold mb-4 text-lg">
              Szczyt 2 ({formatUSD(btcStrategy.btcPeak2)}) - Pozostałe {100 - btcStrategy.sellAtPeak1}%
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Pozostałe BTC:</span>
                <span className="font-semibold">{btcStrategy.btcRemainingPeak2.toFixed(4)} BTC</span>
              </div>
              <div className="flex justify-between">
                <span>Wartość BTC:</span>
                <span className="font-semibold">{formatPLN(btcStrategy.valueRemainingPeak2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Zysk brutto:</span>
                <span className="font-semibold">{formatPLN(btcStrategy.grossProfitPeak2)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Podatek {btcStrategy.totalGrossProfit > 1000000 ? '(19%+4%)' : '(19%)'}:</span>
                <span className="font-semibold">-{formatPLN(btcStrategy.taxPeak2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Zysk netto:</span>
                  <span className="font-bold text-green-600">
                    {formatPLN(btcStrategy.netProfitPeak2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Strategy Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
          <h3 className="font-semibold mb-3">Podsumowanie całej strategii</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Łączny zysk netto:</span>
                <span className="font-semibold">{formatPLN(btcStrategy.totalNetProfit)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Koszt odsetek:</span>
                <span className="font-semibold">-{formatPLN(adjustedTotalInterest)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Zysk końcowy:</span>
                <span className={finalProfitTotal > 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatPLN(finalProfitTotal)}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>ROI:</span>
                <span className={`font-bold text-lg ${finalProfitTotal > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(calculateROI(finalProfitTotal, loanCalcs.loanAmount))}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Vs. 100% HODL:</span>
                <span className="font-semibold">
                  {finalProfitTotal > finalProfitFull2 ? '+' : ''}{formatPLN(finalProfitTotal - finalProfitFull2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Charts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Wizualizacja strategii</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Projection Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Projekcja wartości BTC vs Obligacje</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'value') return formatPLN(value);
                    if (name === 'price') return formatUSD(value);
                    if (name === 'bonds') return formatPLN(value);
                    return value;
                  }}
                  labelFormatter={(label) => `Rok ${label}`}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
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
            <div className="mt-2 text-xs text-gray-600">
              <span className="text-blue-600">■</span> Strategia BTC | 
              <span className="text-green-600">■</span> Strategia Obligacji
            </div>
          </div>
          
          {/* ROI Comparison Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Porównanie zwrotu z inwestycji (ROI)</h3>
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="strategy" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'roi') return `${value}%`;
                    if (name === 'profit') return formatPLN(value);
                    return value;
                  }}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
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
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="font-semibold mb-3">Kluczowe rekomendacje</h3>
        
        <div className="mb-4 p-3 bg-white rounded">
          <h4 className="font-semibold mb-2">🎯 Wybór strategii na podstawie wyników:</h4>
          <div className="text-sm">
            {finalProfitTotal > bondsNetProfit * 3 ? (
              <p className="text-green-700 font-semibold">
                ✅ BTC zdecydowanie opłacalne - potencjalny zysk {((finalProfitTotal / bondsNetProfit - 1) * 100).toFixed(0)}% wyższy od obligacji
              </p>
            ) : finalProfitTotal > bondsNetProfit ? (
              <p className="text-yellow-700 font-semibold">
                ⚖️ BTC umiarkowanie opłacalne - zysk {formatPLN(finalProfitTotal - bondsNetProfit)} wyższy, ale wyższe ryzyko
              </p>
            ) : (
              <p className="text-red-700 font-semibold">
                🛡️ Obligacje bezpieczniejsze - lepszy stosunek ryzyko/zysk o {formatPLN(bondsNetProfit - finalProfitTotal)}
              </p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-green-700">✓ Strategia BTC - kiedy wybierać</h4>
            <ul className="mt-2 space-y-1 text-gray-700">
              <li>• ROI BTC {'>'} {loanCalcs.bondsRate * 3}% (ponad 3x obligacje)</li>
              <li>• Jesteś gotowy na 80% straty tymczasowo</li>
              <li>• Masz stabilny dochód na raty</li>
              <li>• Kupujesz w bessie (jak teraz przy ${btcStrategy.btcBuyPrice.toLocaleString()})</li>
              <li>• Planasz trzymać 4+ lata</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-700">🛡️ Strategia Obligacji - kiedy wybierać</h4>
            <ul className="mt-2 space-y-1 text-gray-700">
              <li>• Chcesz gwarantowanego zysku {loanCalcs.bondsRate}%</li>
              <li>• Nie tolerujesz wysokiej volatilności</li>
              <li>• Potrzebujesz przewidywalności</li>
              <li>• ROI BTC {'<'} 2x obligacji</li>
              <li>• Blisko emerytury/potrzebujesz stabilności</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-red-700">✗ Czego unikać w obu strategiach</h4>
            <ul className="mt-2 space-y-1 text-gray-700">
              <li>• Nie kredituj więcej niż 30% dochodu</li>
              <li>• Nie ignoruj podatków (19% w Polsce)</li>
              <li>• Nie inwestuj bez funduszu awaryjnego</li>
              <li>• Nie kupuj BTC na ATH</li>
              <li>• Nie zaniedbuj dywersyfikacji</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded">
          <p className="text-sm font-semibold text-gray-700">
            💡 Strategia hybrydowa: Możesz też podzielić kwotę - część na BTC (w bessie), część na obligacje (stabilność)
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded">
          <p className="text-sm font-semibold text-gray-700">
            ⚖️ Pamiętaj: Odsetki od kredytów na kryptowaluty NIE są kosztem uzyskania przychodu w Polsce!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BTCLoanCalculator;