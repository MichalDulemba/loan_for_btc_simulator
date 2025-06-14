import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatUSD, formatBTC } from '../utils/formatters';
import { SCENARIOS } from '../constants/scenarios';

const BTCParameters = ({
  btcBuyPrice,
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
  selectedScenario,
  setSelectedScenario,
  btcAmount,
  breakEvenPrice,
  inflationRate,
  setInflationRate
}) => {
  return (
    <div className="mb-10 card p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-primary">
        <TrendingUp className="mr-3" size={24} />
        Parametry Bitcoin
      </h2>
      
      {/* Presety scenariuszy */}
      <div className="mb-6">
        <label className="block text-base font-medium text-secondary mb-3">
          Wybierz scenariusz
        </label>
        <div className="flex gap-3 flex-wrap">
          {Object.entries(SCENARIOS).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedScenario(key);
                setBtcPeak1(scenario.peak1);
                setBtcPeak2(scenario.peak2);
                setBtcPeak2035(scenario.peak2035);
                setBtcPeak2040(scenario.peak2040);
              }}
              className={`px-4 py-2 rounded text-sm transition-all duration-200 ${
                selectedScenario === key 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'bg-secondary text-primary border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-base font-medium text-secondary mb-2">
            Szczyt 1 - 2025/2026 ($)
          </label>
          <input
            type="number"
            value={btcPeak1}
            onChange={(e) => setBtcPeak1(parseInt(e.target.value))}
            className="w-full px-4 py-3 input rounded-md text-base"
            step="5000"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-secondary mb-2">
            Szczyt 2 - 2029/2030 ($)
          </label>
          <input
            type="number"
            value={btcPeak2}
            onChange={(e) => setBtcPeak2(parseInt(e.target.value))}
            className="w-full px-4 py-3 input rounded-md text-base"
            step="10000"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-secondary mb-2">
            Kurs USD/PLN
          </label>
          <input
            type="number"
            value={usdPlnRate}
            onChange={(e) => setUsdPlnRate(parseFloat(e.target.value))}
            className="w-full px-4 py-3 input rounded-md text-base"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-secondary mb-2">
            Inflacja w PL (%)
          </label>
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(parseFloat(e.target.value))}
            className="w-full px-4 py-3 input rounded-md text-base"
            step="0.1"
            min="0"
            max="20"
          />
        </div>
      </div>
      
      {/* Custom 2035 and 2040 prices */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-base font-medium text-secondary mb-2">
            Cena 2035 - Custom ($)
          </label>
          <input
            type="number"
            value={btcPeak2035}
            onChange={(e) => setBtcPeak2035(parseInt(e.target.value))}
            className="w-full px-4 py-3 input rounded-md text-base"
            step="10000"
            placeholder="800000"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-secondary mb-2">
            Cena 2040 - Custom ($)
          </label>
          <input
            type="number"
            value={btcPeak2040}
            onChange={(e) => setBtcPeak2040(parseInt(e.target.value))}
            className="w-full px-4 py-3 input rounded-md text-base"
            step="10000"
            placeholder="1200000"
          />
        </div>
      </div>
      
      {/* Scenario Details */}
      <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <h3 className="font-semibold mb-4 text-primary">Szczegóły scenariusza: {SCENARIOS[selectedScenario]?.label}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-secondary rounded border border-gray-200">
            <p className="text-secondary">2027 (Szczyt 1)</p>
            <p className="text-lg font-semibold text-blue-600">${formatUSD(SCENARIOS[selectedScenario]?.peak1)}</p>
          </div>
          <div className="text-center p-3 bg-secondary rounded border border-gray-200">
            <p className="text-secondary">2029 (Szczyt 2)</p>
            <p className="text-lg font-semibold text-blue-600">${formatUSD(SCENARIOS[selectedScenario]?.peak2)}</p>
          </div>
          <div className="text-center p-3 bg-secondary rounded border border-gray-200">
            <p className="text-secondary">2035</p>
            <p className="text-lg font-semibold text-purple-600">${formatUSD(btcPeak2035)}</p>
          </div>
          <div className="text-center p-3 bg-secondary rounded border border-gray-200">
            <p className="text-secondary">2040</p>
            <p className="text-lg font-semibold text-emerald-600">${formatUSD(btcPeak2040)}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-base text-secondary">Ilość BTC</p>
            <p className="text-xl font-semibold text-primary">{formatBTC(btcAmount)}</p>
          </div>
          <div>
            <p className="text-base text-secondary">Cena break-even</p>
            <p className="text-xl font-semibold text-orange-600">
              {formatUSD(breakEvenPrice)}
            </p>
          </div>
          <div>
            <p className="text-base text-secondary">Wzrost do szczytu 1</p>
            <p className="text-xl font-semibold text-success">
              {btcBuyPrice > 0 ? ((btcPeak1 / btcBuyPrice - 1) * 100).toFixed(0) : '0'}%
            </p>
          </div>
          <div>
            <p className="text-base text-secondary">Wzrost do szczytu 2</p>
            <p className="text-xl font-semibold text-success">
              {btcBuyPrice > 0 ? ((btcPeak2 / btcBuyPrice - 1) * 100).toFixed(0) : '0'}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BTCParameters; 