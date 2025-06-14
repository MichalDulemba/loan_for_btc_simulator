import { TrendingUp, DollarSign, Percent } from 'lucide-react';

const EconomicParametersSection = ({ btcStrategy }) => (
  <div className="mb-8 tech-card p-6 rounded-xl">
    <h2 className="text-xl font-semibold mb-6 flex items-center text-primary">
      <TrendingUp className="mr-3" size={20} />
      Parametry ekonomiczne
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Inflacja */}
      <div className="space-y-3">
        <label className="block text-base font-medium text-secondary">
          <Percent className="inline mr-2" size={16} />
          Inflacja w PL (%)
        </label>
        <input
          type="number"
          value={btcStrategy.inflationRate}
          onChange={(e) => btcStrategy.setInflationRate(parseFloat(e.target.value))}
          className="w-full px-4 py-3 input rounded-md text-base"
          step="0.1"
          min="0"
          max="20"
        />
        <div className="text-sm text-secondary">
          Używana do obliczania siły nabywczej w przyszłości
        </div>
      </div>

      {/* Kurs USD/PLN */}
      <div className="space-y-3">
        <label className="block text-base font-medium text-secondary">
          <DollarSign className="inline mr-2" size={16} />
          Kurs USD/PLN
        </label>
        <input
          type="number"
          value={btcStrategy.usdPlnRate}
          onChange={(e) => btcStrategy.setUsdPlnRate(parseFloat(e.target.value))}
          className="w-full px-4 py-3 input rounded-md text-base"
          step="0.01"
          min="1"
          max="10"
        />
        <div className="text-sm text-secondary">
          Aktualny kurs wymiany
        </div>
      </div>

      {/* Koszt transakcji */}
      <div className="space-y-3">
        <label className="block text-base font-medium text-secondary">
          <Percent className="inline mr-2" size={16} />
          Koszt transakcji (%)
        </label>
        <input
          type="number"
          value={btcStrategy.transactionCost || 1}
          onChange={(e) => btcStrategy.setTransactionCost(parseFloat(e.target.value))}
          className="w-full px-4 py-3 input rounded-md text-base"
          step="0.1"
          min="0"
          max="5"
        />
        <div className="text-sm text-secondary">
          Koszt zakupu/sprzedaży BTC
        </div>
      </div>
    </div>

    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-sm text-secondary">
        <strong>Wpływ na obliczenia:</strong>
        <br />
        • <strong>Inflacja:</strong> Używana do obliczania siły nabywczej zysków w przyszłości
        <br />
        • <strong>Kurs USD/PLN:</strong> Wpływa na wszystkie obliczenia w PLN
        <br />
        • <strong>Koszt transakcji:</strong> Zmniejsza efektywny zysk z zakupu i sprzedaży BTC
      </p>
    </div>
  </div>
);

export default EconomicParametersSection; 