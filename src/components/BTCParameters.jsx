import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatUSD, formatBTC } from '../utils/formatters';
import { SCENARIOS } from '../constants/scenarios';

const BTCParameters = ({
  btcBuyPrice,
  setBtcBuyPrice,
  btcPeak1,
  setBtcPeak1,
  btcPeak2,
  setBtcPeak2,
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
    <div className="mb-10 dark-card p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-white">
        <TrendingUp className="mr-3" size={24} />
        Parametry Bitcoin
      </h2>
      
      {/* Presety scenariuszy */}
      <div className="mb-6">
        <label className="block text-base font-medium text-gray-300 mb-3">
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
              }}
              className={`px-5 py-3 rounded text-base transition-all duration-200 ${
                selectedScenario === key 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              }`}
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div>
          <label className="block text-base font-medium text-gray-300 mb-2">
            Cena zakupu BTC ($)
          </label>
          <input
            type="number"
            value={btcBuyPrice}
            onChange={(e) => setBtcBuyPrice(parseInt(e.target.value))}
            className="w-full px-4 py-3 dark-input rounded-md text-base"
            step="1000"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-300 mb-2">
            Szczyt 1 - 2025/2026 ($)
          </label>
          <input
            type="number"
            value={btcPeak1}
            onChange={(e) => setBtcPeak1(parseInt(e.target.value))}
            className="w-full px-4 py-3 dark-input rounded-md text-base"
            step="5000"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-300 mb-2">
            Szczyt 2 - 2029/2030 ($)
          </label>
          <input
            type="number"
            value={btcPeak2}
            onChange={(e) => setBtcPeak2(parseInt(e.target.value))}
            className="w-full px-4 py-3 dark-input rounded-md text-base"
            step="10000"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-300 mb-2">
            Kurs USD/PLN
          </label>
          <input
            type="number"
            value={usdPlnRate}
            onChange={(e) => setUsdPlnRate(parseFloat(e.target.value))}
            className="w-full px-4 py-3 dark-input rounded-md text-base"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-300 mb-2">
            Inflacja roczna (%)
          </label>
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(parseFloat(e.target.value))}
            className="w-full px-4 py-3 dark-input rounded-md text-base"
            step="0.1"
            min="0"
            max="20"
          />
        </div>
      </div>
      
      {/* Scenario Details */}
      <div className="mt-6 p-6 bg-gradient-to-r from-blue-900/30 to-blue-800/20 rounded-lg border border-blue-600/30">
        <h3 className="font-semibold mb-4 text-blue-300">Szczegóły scenariusza: {SCENARIOS[selectedScenario]?.label}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-gray-800/50 rounded border border-gray-600/30">
            <p className="text-gray-400">2027 (Szczyt 1)</p>
            <p className="text-lg font-semibold text-blue-400">${formatUSD(SCENARIOS[selectedScenario]?.peak1)}</p>
          </div>
          <div className="text-center p-3 bg-gray-800/50 rounded border border-gray-600/30">
            <p className="text-gray-400">2029 (Szczyt 2)</p>
            <p className="text-lg font-semibold text-blue-400">${formatUSD(SCENARIOS[selectedScenario]?.peak2)}</p>
          </div>
          <div className="text-center p-3 bg-gray-800/50 rounded border border-gray-600/30">
            <p className="text-gray-400">2035</p>
            <p className="text-lg font-semibold text-purple-400">${formatUSD(SCENARIOS[selectedScenario]?.peak2035)}</p>
          </div>
          <div className="text-center p-3 bg-gray-800/50 rounded border border-gray-600/30">
            <p className="text-gray-400">2040</p>
            <p className="text-lg font-semibold text-emerald-400">${formatUSD(SCENARIOS[selectedScenario]?.peak2040)}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-base text-gray-400">Ilość BTC</p>
            <p className="text-xl font-semibold text-white">{formatBTC(btcAmount)}</p>
          </div>
          <div>
            <p className="text-base text-gray-400">Cena break-even</p>
            <p className="text-xl font-semibold text-orange-400">
              {formatUSD(breakEvenPrice)}
            </p>
          </div>
          <div>
            <p className="text-base text-gray-400">Wzrost do szczytu 1</p>
            <p className="text-xl font-semibold text-green-400">
              {((btcPeak1 / btcBuyPrice - 1) * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <p className="text-base text-gray-400">Wzrost do szczytu 2</p>
            <p className="text-xl font-semibold text-green-400">
              {((btcPeak2 / btcBuyPrice - 1) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BTCParameters; 