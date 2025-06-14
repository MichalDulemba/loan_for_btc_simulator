// Formatting utility functions

export const formatPLN = (value) => {
  if (isNaN(value) || !isFinite(value)) return '0 PLN';
  return new Intl.NumberFormat('pl-PL', { 
    style: 'currency', 
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatUSD = (value) => {
  if (isNaN(value) || !isFinite(value)) return '$0';
  return new Intl.NumberFormat('pl-PL', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatPercentage = (value, decimals = 1) => {
  if (isNaN(value) || !isFinite(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
};

export const formatBTC = (value, decimals = 4) => {
  if (isNaN(value) || !isFinite(value)) return '0 BTC';
  return `${value.toFixed(decimals)} BTC`;
};

export const formatNumber = (value) => {
  if (isNaN(value) || !isFinite(value)) return '0';
  return new Intl.NumberFormat('pl-PL').format(value);
}; 