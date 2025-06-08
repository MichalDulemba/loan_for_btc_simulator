import React from 'react';
import { Calculator } from 'lucide-react';
import { formatPLN } from '../utils/formatters';
import { LIMITS, ASSUMPTIONS } from '../constants/defaults';

const LoanParameters = ({
  loanAmount,
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
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Calculator className="mr-3" size={24} />
        Parametry kredytu podstawowego
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Kwota kredytu (PLN)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
            step={LIMITS.loanAmount.step}
          />
          <input
            type="range"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
            min={LIMITS.loanAmount.min}
            max={LIMITS.loanAmount.max}
            step={LIMITS.loanAmount.step}
            className="w-full mt-2"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Oprocentowanie roczne (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
            step={LIMITS.interestRate.step}
          />
          <input
            type="range"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            min={LIMITS.interestRate.min}
            max={LIMITS.interestRate.max}
            step={LIMITS.interestRate.step}
            className="w-full mt-2"
          />
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Okres kredytowania (lata)
          </label>
          <input
            type="number"
            value={loanYears}
            onChange={(e) => setLoanYears(parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base"
          />
          <input
            type="range"
            value={loanYears}
            onChange={(e) => setLoanYears(parseInt(e.target.value))}
            min={LIMITS.loanYears.min}
            max={LIMITS.loanYears.max}
            className="w-full mt-2"
          />
        </div>
      </div>
      
      {/* Podsumowanie kredytu */}
      <div className="mt-6 p-6 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-base text-gray-600">Miesięczna rata</p>
            <p className="text-xl font-semibold">{formatPLN(monthlyPayment)}</p>
          </div>
          <div>
            <p className="text-base text-gray-600">Całkowity koszt</p>
            <p className="text-xl font-semibold">{formatPLN(totalLoanCost)}</p>
          </div>
          <div>
            <p className="text-base text-gray-600">Odsetki</p>
            <p className="text-xl font-semibold text-red-600">{formatPLN(totalInterest)}</p>
          </div>
          <div>
            <p className="text-base text-gray-600">Rata/dochód netto*</p>
            <p className="text-xl font-semibold">
              {((monthlyPayment / ASSUMPTIONS.AVERAGE_NET_INCOME) * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-gray-500">*przy {ASSUMPTIONS.AVERAGE_NET_INCOME} PLN netto</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanParameters; 