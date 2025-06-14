import React from 'react';
import { AlertTriangle } from 'lucide-react';

const RiskWarning = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg glow-effect">
      <div className="flex items-center">
        <AlertTriangle className="text-red-500 mr-3" size={28} />
        <div>
          <p className="font-semibold text-red-700 text-lg">Ostrzeżenie o wysokim ryzyku</p>
          <p className="text-red-600 text-base mt-2">
            Inwestowanie pożyczonych pieniędzy w kryptowaluty niesie ekstremalne ryzyko. 
            Możesz stracić więcej niż zainwestowałeś. Przemyśl decyzję dokładnie.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskWarning; 