// BTC price scenarios for 2030, 2035, and 2040

export const SCENARIOS = {
  pessimistic: { 
    peak1: 120000, 
    peak2: 200000, 
    peak2030: 150000,
    peak2035: 250000,
    peak2040: 350000,
    label: 'Pesymistyczny' 
  },
  conservative: { 
    peak1: 150000, 
    peak2: 300000, 
    peak2030: 200000,
    peak2035: 350000,
    peak2040: 500000,
    label: 'Konserwatywny' 
  },
  neutral: { 
    peak1: 240000, 
    peak2: 500000, 
    peak2030: 400000,
    peak2035: 800000,
    peak2040: 1200000,
    label: 'Neutralny' 
  },
  bullish: { 
    peak1: 350000, 
    peak2: 750000, 
    peak2030: 600000,
    peak2035: 1200000,
    peak2040: 2000000,
    label: 'Byczy' 
  }
}; 