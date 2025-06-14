import { useState } from 'react';
import { Bitcoin, TrendingUp, Calculator, BarChart3, Eye, EyeOff } from 'lucide-react';
import { formatPLN, formatUSD } from '../../utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BTC_CYCLES } from '../../constants/scenarios';

const BTCParametersSection = ({ btcStrategy }) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [showCycle2, setShowCycle2] = useState(true);
  const [showCycle3, setShowCycle3] = useState(true);

  // Calculate growth percentages between peaks
  const calculateGrowthPercentage = (currentPrice, previousPrice) => {
    if (previousPrice <= 0) return 0;
    return ((currentPrice - previousPrice) / previousPrice * 100).toFixed(1);
  };

  const growthPeak1 = calculateGrowthPercentage(btcStrategy.btcPeak1, btcStrategy.btcBuyPrice);
  const growthPeak2 = calculateGrowthPercentage(btcStrategy.btcPeak2, btcStrategy.btcPeak1);
  const growth2030 = calculateGrowthPercentage(btcStrategy.btcPeak2030, btcStrategy.btcPeak2);
  const growth2035 = calculateGrowthPercentage(btcStrategy.finalBtcPeak2035, btcStrategy.btcPeak2030);
  const growth2040 = calculateGrowthPercentage(btcStrategy.finalBtcPeak2040, btcStrategy.finalBtcPeak2035);

  // Calculate BTC prices based on yearly percentage changes
  const calculateBTCPrices = () => {
    const prices = [];
    let currentPrice = btcStrategy.btcBuyPrice;
    
    for (let year = 1; year <= 15; year++) {
      const change = btcStrategy.yearlyChanges?.[year] || 0;
      currentPrice = currentPrice * (1 + change / 100);
      prices.push({
        year: 2025 + year - 1,
        yearNumber: year,
        price: currentPrice,
        change: change,
        cycle: year <= 5 ? 1 : year <= 10 ? 2 : 3
      });
    }
    
    return prices;
  };

  const btcPrices = calculateBTCPrices();

  // Prepare chart data
  const chartData = btcPrices.map(item => ({
    year: item.year,
    price: item.price,
    change: item.change,
    cycle: item.cycle
  }));

  // Filter chart data based on visible cycles
  const filteredChartData = chartData.filter(item => {
    if (item.cycle === 1) return true;
    if (item.cycle === 2) return showCycle2;
    if (item.cycle === 3) return showCycle2 && showCycle3;
    return false;
  });

  // Calculate percentage change from base price
  const percentageChartData = filteredChartData.map(item => ({
    ...item,
    percentageChange: ((item.price - btcStrategy.btcBuyPrice) / btcStrategy.btcBuyPrice * 100)
  }));

  // Chart colors for dark theme
  const chartColors = {
    primary: '#3b82f6', // blue-500
    secondary: '#10b981', // emerald-500
    accent: '#f59e0b', // amber-500
    grid: '#374151', // gray-700
    text: '#d1d5db', // gray-300
    background: '#1f2937' // gray-800
  };

  return (
    <div className="mb-8 tech-card p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-6 flex items-center text-primary">
        <Bitcoin className="mr-3" size={20} />
        Parametry Bitcoin
      </h2>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-secondary rounded-lg p-1">
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'manual'
              ? 'bg-primary text-white shadow-sm'
              : 'text-secondary hover:text-primary'
          }`}
        >
          <Calculator className="inline mr-2" size={16} />
          Manual
        </button>
        <button
          onClick={() => setActiveTab('percentage')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'percentage'
              ? 'bg-primary text-white shadow-sm'
              : 'text-secondary hover:text-primary'
          }`}
        >
          <TrendingUp className="inline mr-2" size={16} />
          Zmiany procentowe
        </button>
      </div>

      {/* Manual Tab */}
      {activeTab === 'manual' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-base font-medium text-secondary mb-2">
                Cena zakupu BTC ($)
              </label>
              <input
                type="number"
                value={btcStrategy.btcBuyPrice}
                onChange={(e) => btcStrategy.setBtcBuyPrice(parseInt(e.target.value))}
                className="w-full px-4 py-3 input rounded-md text-base"
                step="1000"
              />
            </div>
            
            <div>
              <label className="block text-base font-medium text-secondary mb-2">
                Szczyt 1 - 2025/2026 ($)
              </label>
              <input
                type="number"
                value={btcStrategy.btcPeak1}
                onChange={(e) => btcStrategy.setBtcPeak1(parseInt(e.target.value))}
                className="w-full px-4 py-3 input rounded-md text-base"
                step="5000"
              />
              <div className="text-sm text-success mt-1">
                Wzrost: +{growthPeak1}%
              </div>
            </div>
            
            <div>
              <label className="block text-base font-medium text-secondary mb-2">
                Szczyt 2 - 2029/2030 ($)
              </label>
              <input
                type="number"
                value={btcStrategy.btcPeak2}
                onChange={(e) => btcStrategy.setBtcPeak2(parseInt(e.target.value))}
                className="w-full px-4 py-3 input rounded-md text-base"
                step="10000"
              />
              <div className="text-sm text-success mt-1">
                Wzrost: +{growthPeak2}%
              </div>
            </div>
            
            <div>
              <label className="block text-base font-medium text-secondary mb-2">
                Scenariusz długoterminowy
              </label>
              <select
                value={btcStrategy.selectedScenario}
                onChange={(e) => btcStrategy.setSelectedScenario(e.target.value)}
                className="w-full px-4 py-3 input rounded-md text-base"
              >
                <option value="pessimistic">Pesymistyczny</option>
                <option value="conservative">Konserwatywny</option>
                <option value="neutral">Neutralny</option>
                <option value="bullish">Byczy</option>
              </select>
            </div>
          </div>

          {/* Custom 2035 and 2040 prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-medium text-secondary mb-2">
                Cena BTC 2035 ($)
              </label>
              <input
                type="number"
                value={btcStrategy.btcPeak2035}
                onChange={(e) => btcStrategy.setBtcPeak2035(parseInt(e.target.value))}
                className="w-full px-4 py-3 input rounded-md text-base"
                step="10000"
              />
              <div className="text-sm text-success mt-1">
                Wzrost: +{growth2035}%
              </div>
            </div>
            
            <div>
              <label className="block text-base font-medium text-secondary mb-2">
                Cena BTC 2040 ($)
              </label>
              <input
                type="number"
                value={btcStrategy.btcPeak2040}
                onChange={(e) => btcStrategy.setBtcPeak2040(parseInt(e.target.value))}
                className="w-full px-4 py-3 input rounded-md text-base"
                step="10000"
              />
              <div className="text-sm text-success mt-1">
                Wzrost: +{growth2040}%
              </div>
            </div>
          </div>

          {/* Growth Summary */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <h3 className="font-semibold mb-3 text-primary">Podsumowanie wzrostów</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="text-center">
                <div className="text-secondary">Zakup → Szczyt 1</div>
                <div className="font-semibold text-success">+{growthPeak1}%</div>
              </div>
              <div className="text-center">
                <div className="text-secondary">Szczyt 1 → Szczyt 2</div>
                <div className="font-semibold text-success">+{growthPeak2}%</div>
              </div>
              <div className="text-center">
                <div className="text-secondary">Szczyt 2 → 2030</div>
                <div className="font-semibold text-success">+{growth2030}%</div>
              </div>
              <div className="text-center">
                <div className="text-secondary">2030 → 2035</div>
                <div className="font-semibold text-success">+{growth2035}%</div>
              </div>
              <div className="text-center">
                <div className="text-secondary">2035 → 2040</div>
                <div className="font-semibold text-success">+{growth2040}%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Percentage Changes Tab */}
      {activeTab === 'percentage' && (
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-secondary mb-4">
              <strong>Jak to działa:</strong> Wprowadź procentowe zmiany cen BTC w każdym roku. 
              <br />
              <strong>Zmiana procentowa</strong> = (cena w danym roku - cena w poprzednim roku) / cena w poprzednim roku × 100%
              <br />
              <strong>Przykład:</strong> Jeśli w roku 1 wpiszesz +50%, to cena BTC wzrośnie z {formatUSD(btcStrategy.btcBuyPrice)} do {formatUSD(btcStrategy.btcBuyPrice * 1.5)}
            </p>
          </div>

          {/* Cycle Controls */}
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowCycle2(!showCycle2)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  showCycle2 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {showCycle2 ? <Eye className="mr-1" size={16} /> : <EyeOff className="mr-1" size={16} />}
                Cykl 2 (lata 6-10)
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowCycle3(!showCycle3)}
                disabled={!showCycle2}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  showCycle3 && showCycle2
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {showCycle3 && showCycle2 ? <Eye className="mr-1" size={16} /> : <EyeOff className="mr-1" size={16} />}
                Cykl 3 (lata 11-15)
              </button>
            </div>
          </div>

          {/* Cycle 1 - Years 1-5 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-gray-200 pb-2">
              Cykl 1: Lata 1-5 (2025-2029)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((year) => (
                <div key={year} className="space-y-2">
                  <label className="block text-sm font-medium text-secondary">
                    Rok {year} ({2025 + year - 1})
                  </label>
                  <input
                    type="number"
                    value={btcStrategy.yearlyChanges?.[year] || 0}
                    onChange={(e) => {
                      const newChanges = { ...btcStrategy.yearlyChanges };
                      newChanges[year] = parseFloat(e.target.value);
                      btcStrategy.setYearlyChanges(newChanges);
                    }}
                    className="w-full px-3 py-2 input rounded-md text-sm"
                    step="0.1"
                    placeholder="0"
                  />
                  <div className="text-xs text-secondary">
                    Zmiana: {btcStrategy.yearlyChanges?.[year] || 0}%
                  </div>
                  <div className="text-xs font-medium text-primary">
                    Cena: {formatUSD(btcPrices.find(p => p.yearNumber === year)?.price || btcStrategy.btcBuyPrice)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cycle 2 - Years 6-10 */}
          {showCycle2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b border-gray-200 pb-2">
                Cykl 2: Lata 6-10 (2030-2034)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Array.from({ length: 5 }, (_, i) => i + 6).map((year) => (
                  <div key={year} className="space-y-2">
                    <label className="block text-sm font-medium text-secondary">
                      Rok {year} ({2025 + year - 1})
                    </label>
                    <input
                      type="number"
                      value={btcStrategy.yearlyChanges?.[year] || 0}
                      onChange={(e) => {
                        const newChanges = { ...btcStrategy.yearlyChanges };
                        newChanges[year] = parseFloat(e.target.value);
                        btcStrategy.setYearlyChanges(newChanges);
                      }}
                      className="w-full px-3 py-2 input rounded-md text-sm"
                      step="0.1"
                      placeholder="0"
                    />
                    <div className="text-xs text-secondary">
                      Zmiana: {btcStrategy.yearlyChanges?.[year] || 0}%
                    </div>
                    <div className="text-xs font-medium text-primary">
                      Cena: {formatUSD(btcPrices.find(p => p.yearNumber === year)?.price || btcStrategy.btcBuyPrice)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cycle 3 - Years 11-15 */}
          {showCycle2 && showCycle3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b border-gray-200 pb-2">
                Cykl 3: Lata 11-15 (2035-2039)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Array.from({ length: 5 }, (_, i) => i + 11).map((year) => (
                  <div key={year} className="space-y-2">
                    <label className="block text-sm font-medium text-secondary">
                      Rok {year} ({2025 + year - 1})
                    </label>
                    <input
                      type="number"
                      value={btcStrategy.yearlyChanges?.[year] || 0}
                      onChange={(e) => {
                        const newChanges = { ...btcStrategy.yearlyChanges };
                        newChanges[year] = parseFloat(e.target.value);
                        btcStrategy.setYearlyChanges(newChanges);
                      }}
                      className="w-full px-3 py-2 input rounded-md text-sm"
                      step="0.1"
                      placeholder="0"
                    />
                    <div className="text-xs text-secondary">
                      Zmiana: {btcStrategy.yearlyChanges?.[year] || 0}%
                    </div>
                    <div className="text-xs font-medium text-primary">
                      Cena: {formatUSD(btcPrices.find(p => p.yearNumber === year)?.price || btcStrategy.btcBuyPrice)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BTC Cycle Options */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold mb-4 text-primary">Opcje cykli BTC</h3>
            <p className="text-sm text-secondary mb-4">
              Wybierz jeden z predefiniowanych wzorców cykli Bitcoin, aby automatycznie wypełnić zmiany procentowe:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(BTC_CYCLES).map(([key, cycle]) => (
                <button
                  key={key}
                  onClick={() => {
                    btcStrategy.setYearlyChanges(cycle.yearlyChanges);
                  }}
                  className="p-3 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-primary mb-1">{cycle.label}</div>
                  <div className="text-xs text-secondary">{cycle.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Legacy Suggested Bitcoin Cycle */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold mb-3 text-primary">Sugerowany cykl Bitcoin (Legacy)</h3>
            <button
              onClick={() => {
                const suggestedCycle = {
                  1: 150,   // Rok 1: duży wzrost
                  2: -60,   // Rok 2: duży spadek
                  3: 20,    // Rok 3: umiarkowany wzrost
                  4: 80,    // Rok 4: silny wzrost
                  5: -30,   // Rok 5: korekta
                  6: 40,    // Rok 6: wzrost
                  7: 100,   // Rok 7: silny wzrost
                  8: -50,   // Rok 8: duży spadek
                  9: 30,    // Rok 9: odbicie
                  10: 60,   // Rok 10: wzrost
                  11: 120,  // Rok 11: silny wzrost
                  12: -40,  // Rok 12: korekta
                  13: 50,   // Rok 13: wzrost
                  14: 90,   // Rok 14: silny wzrost
                  15: 150   // Rok 15: bardzo silny wzrost
                };
                btcStrategy.setYearlyChanges(suggestedCycle);
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              Wypełnij sugerowanym cyklem (Legacy)
            </button>
          </div>

          {/* Charts */}
          <div className="space-y-6">
            {/* Price Chart */}
            <div className="p-4 bg-background rounded-lg border border-border">
              <h3 className="font-semibold mb-4 text-primary flex items-center">
                <BarChart3 className="mr-2" size={20} />
                Wykres cen BTC (USD)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis 
                      dataKey="year" 
                      stroke={chartColors.text}
                      label={{ value: 'Rok', position: 'insideBottom', offset: -5, fill: chartColors.text }}
                    />
                    <YAxis 
                      stroke={chartColors.text}
                      label={{ value: 'Cena BTC (USD)', angle: -90, position: 'insideLeft', fill: chartColors.text }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: chartColors.background,
                        border: `1px solid ${chartColors.grid}`,
                        borderRadius: '8px',
                        color: chartColors.text
                      }}
                      formatter={(value, name) => [
                        name === 'price' ? formatUSD(value) : `${value.toFixed(1)}%`,
                        name === 'price' ? 'Cena BTC' : 'Zmiana %'
                      ]}
                      labelFormatter={(label) => `Rok ${label}`}
                    />
                    <Legend 
                      wrapperStyle={{ color: chartColors.text }}
                      verticalAlign="top"
                      height={36}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke={chartColors.primary} 
                      strokeWidth={2}
                      name="Cena BTC"
                      dot={{ fill: chartColors.primary, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Percentage Change Chart */}
            <div className="p-4 bg-background rounded-lg border border-border">
              <h3 className="font-semibold mb-4 text-primary flex items-center">
                <TrendingUp className="mr-2" size={20} />
                Wykres zmian procentowych (względem ceny początkowej)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={percentageChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis 
                      dataKey="year" 
                      stroke={chartColors.text}
                      label={{ value: 'Rok', position: 'insideBottom', offset: -5, fill: chartColors.text }}
                    />
                    <YAxis 
                      stroke={chartColors.text}
                      label={{ value: 'Zmiana %', angle: -90, position: 'insideLeft', fill: chartColors.text }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: chartColors.background,
                        border: `1px solid ${chartColors.grid}`,
                        borderRadius: '8px',
                        color: chartColors.text
                      }}
                      formatter={(value, name) => [
                        `${value.toFixed(1)}%`,
                        name === 'percentageChange' ? 'Zmiana względem ceny początkowej' : 'Zmiana roczna'
                      ]}
                      labelFormatter={(label) => `Rok ${label}`}
                    />
                    <Legend 
                      wrapperStyle={{ color: chartColors.text }}
                      verticalAlign="top"
                      height={36}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="percentageChange" 
                      stroke={chartColors.secondary} 
                      strokeWidth={2}
                      name="Zmiana względem ceny początkowej"
                      dot={{ fill: chartColors.secondary, strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="change" 
                      stroke={chartColors.accent} 
                      strokeWidth={1}
                      name="Zmiana roczna"
                      dot={{ fill: chartColors.accent, strokeWidth: 1, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Summary Table */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold mb-3 text-primary">Podsumowanie kluczowych lat</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {[1, 5, 10, 15].map((year) => {
                const priceData = btcPrices.find(p => p.yearNumber === year);
                return (
                  <div key={year} className="text-center">
                    <div className="text-secondary">Rok {year} ({2025 + year - 1})</div>
                    <div className="font-semibold text-primary">
                      {priceData ? formatUSD(priceData.price) : formatUSD(btcStrategy.btcBuyPrice)}
                    </div>
                    <div className="text-xs text-secondary">
                      Zmiana: {priceData?.change || 0}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BTCParametersSection; 