import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatPLN, formatUSD } from '../../utils/formatters';
import { useTheme } from '../../hooks/useTheme';

const ComparisonChartsSection = ({ projectionData, loanCalcs, btcStrategy }) => {
  const { theme } = useTheme();
  
  // Kolory dynamiczne w zależności od motywu
  const isDark = theme === 'dark';
  const gridColor = isDark ? '#374151' : '#e2e8f0';
  const axisColor = isDark ? '#9CA3AF' : '#64748b';
  const tooltipBg = isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)';
  const tooltipBorder = isDark ? '#4B5563' : '#e2e8f0';
  const tooltipText = isDark ? '#E5E7EB' : '#1a1a2e';

  return (
    <div className="mb-8 tech-card p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-primary">Wizualizacja strategii</h2>
      {/* Alternative Investments Section */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 border-glow">
        <h3 className="font-semibold mb-4 text-info">📊 Alternatywne inwestycje (porównanie)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-secondary mb-2">
              Oprocentowanie obligacji (%)
            </label>
            <input
              type="number"
              value={loanCalcs.bondsRate}
              onChange={(e) => loanCalcs.setBondsRate(parseFloat(e.target.value))}
              className="w-full px-4 py-3 input rounded-md text-base border-glow"
              step="0.1"
              min="0"
              max="20"
            />
            <p className="text-sm text-secondary mt-1">Domyślnie: 6% rocznie</p>
          </div>
          <div>
            <label className="block text-base font-medium text-secondary mb-2">
              Zwrot S&P500* (%)
            </label>
            <input
              type="number"
              value={btcStrategy.sp500Return}
              onChange={(e) => btcStrategy.setSp500Return(parseFloat(e.target.value))}
              className="w-full px-4 py-3 input rounded-md text-base border-glow"
              step="0.5"
              min="0"
              max="20"
            />
            <p className="text-sm text-secondary mt-1">*przed odliczeniem inflacji - domyślnie: 10%</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price Projection Chart */}
        <div className="bg-secondary p-4 rounded-lg border border-gray-200 shadow-md">
          <h3 className="font-semibold mb-3 text-primary">Projekcja wartości BTC vs Obligacje vs S&P500</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="year" stroke={axisColor} />
              <YAxis tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} stroke={axisColor} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'value') return formatPLN(value);
                  if (name === 'price') return formatUSD(value);
                  if (name === 'bonds') return formatPLN(value);
                  if (name === 'sp500') return formatPLN(value);
                  return value;
                }}
                labelFormatter={(label) => `Rok ${label}`}
                contentStyle={{ 
                  backgroundColor: tooltipBg, 
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: '8px',
                  color: tooltipText
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
                name="value"
              />
              <Line 
                type="monotone" 
                dataKey="bonds" 
                stroke="#00b894" 
                strokeWidth={2}
                dot={{ fill: '#00b894' }}
                name="bonds"
              />
              <Line 
                type="monotone" 
                dataKey="sp500" 
                stroke="#f39c12" 
                strokeWidth={2}
                dot={{ fill: '#f39c12' }}
                name="sp500"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-2 text-xs text-secondary">
            <span className="text-blue-600">■</span> Strategia BTC | 
            <span className="text-green-600">■</span> Strategia Obligacji |
            <span className="text-orange-600">■</span> S&P500
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChartsSection; 