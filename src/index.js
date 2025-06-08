// Main entry point for the BTC Loan Calculator
export { default as BTCLoanCalculator } from './components/BTCLoanCalculator';

// Export individual components for potential reuse
export { default as LoanParameters } from './components/LoanParameters';
export { default as BTCParameters } from './components/BTCParameters';

// Export hooks
export { useLoanCalculations } from './hooks/useLoanCalculations';
export { useBTCStrategy } from './hooks/useBTCStrategy';

// Export utilities
export * from './utils/calculations';
export * from './utils/formatters';

// Export constants
export { SCENARIOS } from './constants/scenarios';
export { DEFAULT_VALUES, TAX_RATES, LIMITS, ASSUMPTIONS } from './constants/defaults'; 