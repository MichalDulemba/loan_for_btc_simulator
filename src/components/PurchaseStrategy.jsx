import React from 'react';
import { ShoppingCart, TrendingUp } from 'lucide-react';
import { formatPLN, formatUSD, formatBTC } from '../utils/formatters';

const PurchaseStrategy = ({
  purchaseStrategy,
  setPurchaseStrategy,
  dcaYears,
  setDcaYears,
  dcaAmount,
  setDcaAmount,
  btcBuyPrice,
  setBtcBuyPrice,
  btcPeak1,
  usdPlnRate,
  btcAmount,
  averageBuyPrice,
  savingsAmount,
  setSavingsAmount,
  loanBtcAmount,
  dcaBtcAmount,
  loanAmount,
  dcaTotalSpent,
  // Loan parameters
  loanAmount: loanAmountParam,
  setLoanAmount,
  interestRate,
  setInterestRate,
  loanYears,
  setLoanYears,
  monthlyPayment,
  totalLoanCost,
  totalInterest
}) => {
  return (
    <div className="mb-10 card p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-primary">
        <ShoppingCart className="mr-3" size={24} />
        Strategia zakupu BTC
      </h2>
      
      {/* Strategy Selection */}
      <div className="mb-6">
        <label className="block text-base font-medium text-secondary mb-3">
          Wybierz strategię zakupu
        </label>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setPurchaseStrategy('lump')}
            className={`px-5 py-3 rounded text-base transition-all duration-200 ${
              purchaseStrategy === 'lump' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                : 'bg-secondary text-primary border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Jednorazowy zakup za kredyt
          </button>
          <button
            onClick={() => setPurchaseStrategy('dca')}
            className={`px-5 py-3 rounded text-base transition-all duration-200 ${
              purchaseStrategy === 'dca' 
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg' 
                : 'bg-secondary text-primary border border-gray-300 hover:bg-gray-100'
            }`}
          >
            DCA (Dollar Cost Averaging)
          </button>
          <button
            onClick={() => setPurchaseStrategy('loan-dca')}
            className={`px-5 py-3 rounded text-base transition-all duration-200 ${
              purchaseStrategy === 'loan-dca' 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                : 'bg-secondary text-primary border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Kredyt + DCA
          </button>
          <button
            onClick={() => setPurchaseStrategy('savings')}
            className={`px-5 py-3 rounded text-base transition-all duration-200 ${
              purchaseStrategy === 'savings' 
                ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg' 
                : 'bg-secondary text-primary border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Zakup za gotówkę
          </button>
        </div>
      </div>
      
      {/* Loan Parameters - for lump and loan-dca strategies */}
      {(purchaseStrategy === 'lump' || purchaseStrategy === 'loan-dca') && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold mb-4 text-primary">🏦 Parametry kredytu</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Kwota kredytu (PLN)
              </label>
              <input
                type="number"
                value={loanAmountParam}
                onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                className="w-full px-3 py-2 input rounded-md text-sm"
                step="1000"
                min="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Oprocentowanie (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full px-3 py-2 input rounded-md text-sm"
                step="0.1"
                min="0"
                max="20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Okres (lata)
              </label>
              <input
                type="number"
                value={loanYears}
                onChange={(e) => setLoanYears(parseInt(e.target.value))}
                className="w-full px-3 py-2 input rounded-md text-sm"
                min="1"
                max="30"
              />
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="p-2 bg-secondary rounded border border-gray-200">
              <span className="text-secondary">Miesięczna rata:</span>
              <div className="font-semibold text-primary">{formatPLN(monthlyPayment)}</div>
            </div>
            <div className="p-2 bg-secondary rounded border border-gray-200">
              <span className="text-secondary">Całkowity koszt:</span>
              <div className="font-semibold text-primary">{formatPLN(totalLoanCost)}</div>
            </div>
            <div className="p-2 bg-secondary rounded border border-gray-200">
              <span className="text-secondary">Odsetki:</span>
              <div className="font-semibold text-danger">{formatPLN(totalInterest)}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* BTC Buy Price - for lump, loan-dca, and savings strategies */}
      {(purchaseStrategy === 'lump' || purchaseStrategy === 'loan-dca' || purchaseStrategy === 'savings') && (
        <div className="mb-6">
          <label className="block text-base font-medium text-secondary mb-2">
            Cena zakupu BTC ($)
          </label>
          <input
            type="number"
            value={btcBuyPrice}
            onChange={(e) => setBtcBuyPrice(parseInt(e.target.value))}
            className="w-full px-4 py-3 input rounded-md text-base"
            step="1000"
          />
        </div>
      )}
      
      {/* Savings Amount - for savings strategy */}
      {purchaseStrategy === 'savings' && (
        <div className="mb-6">
          <label className="block text-base font-medium text-secondary mb-2">
            Kwota gotówki (PLN)
          </label>
          <input
            type="number"
            value={savingsAmount}
            onChange={(e) => setSavingsAmount(parseInt(e.target.value))}
            className="w-full px-4 py-3 input rounded-md text-base"
            step="1000"
            min="1000"
          />
        </div>
      )}
      
      {/* DCA Parameters - for DCA and Loan+DCA strategies */}
      {(purchaseStrategy === 'dca' || purchaseStrategy === 'loan-dca') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-base font-medium text-secondary mb-2">
              Okres DCA (lata)
            </label>
            <select
              value={dcaYears}
              onChange={(e) => setDcaYears(parseInt(e.target.value))}
              className="w-full px-4 py-3 input rounded-md text-base"
            >
              <option value={2}>2 lata</option>
              <option value={5}>5 lat</option>
              <option value={10}>10 lat</option>
              <option value={15}>15 lat</option>
            </select>
          </div>
          
          <div>
            <label className="block text-base font-medium text-secondary mb-2">
              Miesięczna kwota DCA (PLN)
            </label>
            <input
              type="number"
              value={dcaAmount}
              onChange={(e) => setDcaAmount(parseInt(e.target.value))}
              className="w-full px-4 py-3 input rounded-md text-base"
              step="1000"
              min="1000"
            />
          </div>
          
          <div>
            <label className="block text-base font-medium text-secondary mb-2">
              Łączna kwota DCA (PLN)
            </label>
            <div className="w-full px-4 py-3 bg-secondary rounded-md text-base text-primary">
              {formatPLN(dcaAmount * dcaYears * 12)}
            </div>
          </div>
        </div>
      )}
      
      {/* Summary */}
      <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <h3 className="font-semibold mb-4 text-primary">
          {purchaseStrategy === 'lump' && 'Zakup jednorazowy za kredyt'}
          {purchaseStrategy === 'dca' && 'Strategia DCA'}
          {purchaseStrategy === 'loan-dca' && 'Kredyt + DCA'}
          {purchaseStrategy === 'savings' && 'Zakup za gotówkę'}
        </h3>
        
        {/* Detailed breakdown for loan-dca */}
        {purchaseStrategy === 'loan-dca' && (
          <div className="mb-6 p-4 bg-purple-50 rounded border border-purple-200">
            <h4 className="font-semibold mb-3 text-primary">Szczegółowy podział:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <h5 className="font-medium text-primary mb-2">Część kredytowa:</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Kwota:</span>
                    <span className="text-primary">{formatPLN(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">BTC:</span>
                    <span className="text-primary">{formatBTC(loanBtcAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Cena zakupu:</span>
                    <span className="text-blue-600">{formatUSD(btcBuyPrice)}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded border border-green-200">
                <h5 className="font-medium text-primary mb-2">Część DCA:</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Kwota:</span>
                    <span className="text-primary">{formatPLN(dcaTotalSpent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">BTC:</span>
                    <span className="text-primary">{formatBTC(dcaBtcAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Średnia cena:</span>
                    <span className="text-green-600">{formatUSD(dcaBtcAmount > 0 ? dcaTotalSpent / (dcaBtcAmount * usdPlnRate) : 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-secondary rounded border border-gray-200">
            <p className="text-secondary">Ilość BTC</p>
            <p className="text-lg font-semibold text-primary">{formatBTC(btcAmount)}</p>
          </div>
          <div className="text-center p-3 bg-secondary rounded border border-gray-200">
            <p className="text-secondary">
              {purchaseStrategy === 'lump' && 'Cena zakupu'}
              {purchaseStrategy === 'dca' && 'Średnia cena'}
              {purchaseStrategy === 'loan-dca' && 'Średnia cena'}
              {purchaseStrategy === 'savings' && 'Cena zakupu'}
            </p>
            <p className="text-lg font-semibold text-primary">{formatUSD(averageBuyPrice)}</p>
          </div>
          <div className="text-center p-3 bg-secondary rounded border border-gray-200">
            <p className="text-secondary">Wartość w PLN</p>
            <p className="text-lg font-semibold text-primary">{formatPLN(btcAmount * averageBuyPrice * usdPlnRate)}</p>
          </div>
          <div className="text-center p-3 bg-secondary rounded border border-gray-200">
            <p className="text-secondary">ROI do szczytu 1</p>
            <p className="text-lg font-semibold text-success">
              {averageBuyPrice > 0 ? ((btcPeak1 / averageBuyPrice - 1) * 100).toFixed(0) : '0'}%
            </p>
          </div>
        </div>
        
        {(purchaseStrategy === 'dca' || purchaseStrategy === 'loan-dca') && (
          <div className="mt-4 p-3 bg-blue-900/20 rounded border border-blue-600/30">
            <p className="text-sm text-blue-300">
              💡 DCA: Kupujesz BTC przez {dcaYears} lat po {formatPLN(dcaAmount)} miesięcznie. 
              Średnia cena: {formatUSD(averageBuyPrice)} (vs cena początkowa: {formatUSD(btcBuyPrice)})
            </p>
          </div>
        )}
        
        {purchaseStrategy === 'loan-dca' && (
          <div className="mt-4 p-3 bg-purple-900/20 rounded border border-purple-600/30">
            <p className="text-sm text-purple-300">
              💡 Kredyt + DCA: Używasz kredytu jako podstawy + dodatkowo DCA przez {dcaYears} lat
            </p>
          </div>
        )}
        
        {purchaseStrategy === 'savings' && (
          <div className="mt-4 p-3 bg-orange-900/20 rounded border border-orange-600/30">
            <p className="text-sm text-orange-300">
              💡 Zakup za gotówkę: Kupujesz jednorazowo za {formatPLN(savingsAmount)} PLN (bez kredytu)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseStrategy; 