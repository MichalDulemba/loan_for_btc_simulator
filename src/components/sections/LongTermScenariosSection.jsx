import { Calendar } from 'lucide-react';
import { formatPLN, formatUSD } from '../../utils/formatters';

const LongTermScenariosSection = ({ btcStrategy }) => (
  <div className="mb-10 tech-card p-6 rounded-xl">
    <h2 className="text-2xl font-semibold mb-6 flex items-center text-primary">
      <Calendar className="mr-3" size={24} />
      Scenariusze długoterminowe (2030-2040)
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 2030 Scenario */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold mb-4 text-primary">2030 - {formatUSD(btcStrategy.btcPeak2030)}</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-secondary">Wartość BTC:</span>
            <span className="font-semibold text-primary">{formatPLN(btcStrategy.valueAt2030)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Koszt całkowity:</span>
            <span className="font-semibold text-danger">{formatPLN(btcStrategy.totalCost2030)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Zysk brutto:</span>
            <span className={`font-semibold ${btcStrategy.grossProfit2030 >= 0 ? 'text-success' : 'text-danger'}`}>
              {formatPLN(btcStrategy.grossProfit2030)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Siła nabywcza (2025):</span>
            <span className={`font-semibold ${btcStrategy.inflationAdjustedProfit2030 >= 0 ? 'text-success' : 'text-danger'}`}>
              {formatPLN(btcStrategy.inflationAdjustedProfit2030)}
            </span>
          </div>
        </div>
      </div>
      {/* 2035 Scenario */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 shadow-md hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold mb-4 text-primary">2035 - {formatUSD(btcStrategy.finalBtcPeak2035)}</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-secondary">Wartość BTC:</span>
            <span className="font-semibold text-primary">{formatPLN(btcStrategy.valueAt2035)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Koszt całkowity:</span>
            <span className="font-semibold text-danger">{formatPLN(btcStrategy.totalCost2035)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Zysk brutto:</span>
            <span className={`font-semibold ${btcStrategy.grossProfit2035 >= 0 ? 'text-success' : 'text-danger'}`}>
              {formatPLN(btcStrategy.grossProfit2035)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Siła nabywcza (2025):</span>
            <span className={`font-semibold ${btcStrategy.inflationAdjustedProfit2035 >= 0 ? 'text-success' : 'text-danger'}`}>
              {formatPLN(btcStrategy.inflationAdjustedProfit2035)}
            </span>
          </div>
        </div>
      </div>
      {/* 2040 Scenario */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
        <h3 className="font-semibold mb-4 text-primary">2040 - {formatUSD(btcStrategy.finalBtcPeak2040)}</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-secondary">Wartość BTC:</span>
            <span className="font-semibold text-primary">{formatPLN(btcStrategy.valueAt2040)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Koszt całkowity:</span>
            <span className="font-semibold text-danger">{formatPLN(btcStrategy.totalCost2040)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Zysk brutto:</span>
            <span className={`font-semibold ${btcStrategy.grossProfit2040 >= 0 ? 'text-success' : 'text-danger'}`}>
              {formatPLN(btcStrategy.grossProfit2040)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Siła nabywcza (2025):</span>
            <span className={`font-semibold ${btcStrategy.inflationAdjustedProfit2040 >= 0 ? 'text-success' : 'text-danger'}`}>
              {formatPLN(btcStrategy.inflationAdjustedProfit2040)}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-sm text-secondary">
        <strong>Siła nabywcza (2025):</strong> Wartość zysku w dzisiejszych pieniądzach, skorygowana o inflację. 
        Obliczana jako: Zysk nominalny ÷ (1 + inflacja)^lata. 
        Przykład: Przy inflacji 4% rocznie, 100 000 PLN za 10 lat = 67 556 PLN w dzisiejszych pieniądzach.
        To pokazuje realną wartość zysku w dzisiejszych pieniądzach.
        <br />
        <em>Używana stopa inflacji: {btcStrategy.inflationRate || 4}% rocznie</em>
      </p>
    </div>
  </div>
);

export default LongTermScenariosSection; 