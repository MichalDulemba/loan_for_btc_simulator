// Formatting utility functions

export const formatPLN = (value) => {
  return new Intl.NumberFormat('pl-PL', { 
    style: 'currency', 
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatUSD = (value) => {
  return new Intl.NumberFormat('pl-PL', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const formatBTC = (value, decimals = 4) => {
  return `${value.toFixed(decimals)} BTC`;
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('pl-PL').format(value);
}; 