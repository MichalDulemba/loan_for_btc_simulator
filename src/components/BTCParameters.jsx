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
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <TrendingUp className="mr-3" size={24} />
        Parametry Bitcoin
      </h2>
      
      {/* Presety scenariuszy */}
      <div className="mb-6">
        <label className="block text-base font-medium text-gray-700 mb-3">
          Wybierz scenariusz
        </label>
        <div className="flex gap-3">
          {Object.entries(SCENARIOS).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedScenario(key);
                setBtcPeak1(scenario.peak1);
                setBtcPeak2(scenario.peak2);
              }}
              className={`px-5 py-3 rounded text-base ${
                selectedScenario === key 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Cena zakupu BTC ($)
          </label>
          <input
            type="number"
            value={btcBuyPrice}
            onChange={(e) => setBtcBuyPrice(parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
            step="1000"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Szczyt 1 - 2025/2026 ($)
          </label>
          <input
            type="number"
            value={btcPeak1}
            onChange={(e) => setBtcPeak1(parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
            step="5000"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Szczyt 2 - 2029/2030 ($)
          </label>
          <input
            type="number"
            value={btcPeak2}
            onChange={(e) => setBtcPeak2(parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
            step="10000"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Kurs USD/PLN
          </label>
          <input
            type="number"
            value={usdPlnRate}
            onChange={(e) => setUsdPlnRate(parseFloat(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
            step="0.01"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Inflacja roczna (%)
          </label>
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(parseFloat(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
            step="0.1"
            min="0"
            max="20"
          />
        </div>
      </div>
      
      <div className="mt-6 p-6 bg-blue-50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-base text-gray-600">Ilość BTC</p>
            <p className="text-xl font-semibold">{formatBTC(btcAmount)}</p>
          </div>
          <div>
            <p className="text-base text-gray-600">Cena break-even</p>
            <p className="text-xl font-semibold text-orange-600">
              {formatUSD(breakEvenPrice)}
            </p>
          </div>
          <div>
            <p className="text-base text-gray-600">Wzrost do szczytu 1</p>
            <p className="text-xl font-semibold text-green-600">
              {((btcPeak1 / btcBuyPrice - 1) * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <p className="text-base text-gray-600">Wzrost do szczytu 2</p>
            <p className="text-xl font-semibold text-green-600">
              {((btcPeak2 / btcBuyPrice - 1) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BTCParameters; 