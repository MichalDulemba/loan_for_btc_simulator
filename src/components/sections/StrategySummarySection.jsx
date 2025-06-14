import React from 'react';
import { formatBTC, formatPLN, formatUSD } from '../../utils/formatters';

const StrategySummarySection = ({ btcStrategy, loanCalcs }) => (
  <div className="mb-8 tech-card p-6 rounded-xl">
    <h2 className="text-xl font-semibold mb-4 text-primary">Podsumowanie aktualnej strategii</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* BTC Details */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 shadow-md">
        <h3 className="font-semibold mb-3 text-primary">📊 Szczegóły BTC</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary">Ilość BTC:</span>
            <span className="font-semibold text-primary">{formatBTC(btcStrategy.btcAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Średnia cena zakupu:</span>
            <span className="font-semibold text-primary">{formatUSD(btcStrategy.averageBuyPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Cena w PLN:</span>
            <span className="font-semibold text-primary">{formatPLN(btcStrategy.averageBuyPrice * btcStrategy.usdPlnRate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Wartość aktualna:</span>
            <span className="font-semibold text-primary">{formatPLN(btcStrategy.btcAmount * btcStrategy.btcPeak1 * btcStrategy.usdPlnRate)}</span>
          </div>
        </div>
      </div>
      {/* Strategy Details */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 shadow-md">
        <h3 className="font-semibold mb-3 text-primary">💰 Szczegóły strategii</h3>
        <div className="space-y-2 text-sm">
          {btcStrategy.purchaseStrategy === 'lump' && (
            <>
              <div className="flex justify-between">
                <span className="text-secondary">BTC z kredytu:</span>
                <span className="font-semibold text-primary">{formatBTC(btcStrategy.loanBtcAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Koszt kredytu:</span>
                <span className="font-semibold text-danger">{formatPLN(loanCalcs.totalLoanCost)}</span>
              </div>
            </>
          )}
          {btcStrategy.purchaseStrategy === 'dca' && (
            <>
              <div className="flex justify-between">
                <span className="text-secondary">BTC z DCA:</span>
                <span className="font-semibold text-primary">{formatBTC(btcStrategy.dcaBtcAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Wydane na DCA:</span>
                <span className="font-semibold text-danger">{formatPLN(btcStrategy.dcaTotalSpent)}</span>
              </div>
            </>
          )}
          {btcStrategy.purchaseStrategy === 'loan-dca' && (
            <>
              <div className="flex justify-between">
                <span className="text-secondary">BTC z kredytu:</span>
                <span className="font-semibold text-primary">{formatBTC(btcStrategy.loanBtcAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">BTC z DCA:</span>
                <span className="font-semibold text-primary">{formatBTC(btcStrategy.dcaBtcAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Koszt kredytu:</span>
                <span className="font-semibold text-danger">{formatPLN(loanCalcs.totalLoanCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Wydane na DCA:</span>
                <span className="font-semibold text-danger">{formatPLN(btcStrategy.dcaTotalSpent)}</span>
              </div>
            </>
          )}
          {btcStrategy.purchaseStrategy === 'savings' && (
            <>
              <div className="flex justify-between">
                <span className="text-secondary">BTC za gotówkę:</span>
                <span className="font-semibold text-primary">{formatBTC(btcStrategy.btcAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Wydane gotówki:</span>
                <span className="font-semibold text-danger">{formatPLN(btcStrategy.savingsAmount)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default StrategySummarySection; 