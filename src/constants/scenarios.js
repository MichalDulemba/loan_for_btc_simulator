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

// BTC Cycle patterns with yearly percentage changes
export const BTC_CYCLES = {
  volatile: {
    label: 'Volatile - Duża zmienność',
    description: 'Ekstremalne wahania cen z dużymi wzrostami i spadkami',
    yearlyChanges: {
      1: 200,   // Rok 1: bardzo duży wzrost
      2: -70,   // Rok 2: bardzo duży spadek
      3: 150,   // Rok 3: duży wzrost
      4: -60,   // Rok 4: duży spadek
      5: 180,   // Rok 5: bardzo duży wzrost
      6: -80,   // Rok 6: ekstremalny spadek
      7: 250,   // Rok 7: ogromny wzrost
      8: -75,   // Rok 8: bardzo duży spadek
      9: 120,   // Rok 9: duży wzrost
      10: -50,  // Rok 10: duży spadek
      11: 300,  // Rok 11: ekstremalny wzrost
      12: -90,  // Rok 12: ekstremalny spadek
      13: 200,  // Rok 13: bardzo duży wzrost
      14: -65,  // Rok 14: duży spadek
      15: 400   // Rok 15: ogromny wzrost
    }
  },
  flat: {
    label: 'Flat - Stabilny',
    description: 'Maksymalnie +50% do -50% zmienności rocznie',
    yearlyChanges: {
      1: 30,    // Rok 1: umiarkowany wzrost
      2: -20,   // Rok 2: umiarkowany spadek
      3: 25,    // Rok 3: umiarkowany wzrost
      4: -15,   // Rok 4: mały spadek
      5: 40,    // Rok 5: umiarkowany wzrost
      6: -25,   // Rok 6: umiarkowany spadek
      7: 35,    // Rok 7: umiarkowany wzrost
      8: -30,   // Rok 8: umiarkowany spadek
      9: 45,    // Rok 9: umiarkowany wzrost
      10: -20,  // Rok 10: umiarkowany spadek
      11: 50,   // Rok 11: maksymalny wzrost
      12: -35,  // Rok 12: umiarkowany spadek
      13: 30,   // Rok 13: umiarkowany wzrost
      14: -25,  // Rok 14: umiarkowany spadek
      15: 40    // Rok 15: umiarkowany wzrost
    }
  },
  similarToPrev: {
    label: 'Similar to Previous - Podobny do 2000-2025',
    description: 'Wartości podobne do historycznego cyklu Bitcoin 2000-2025',
    yearlyChanges: {
      1: 150,   // Rok 1: duży wzrost (jak 2017)
      2: -60,   // Rok 2: duży spadek (jak 2018)
      3: 20,    // Rok 3: umiarkowany wzrost (jak 2019)
      4: 80,    // Rok 4: silny wzrost (jak 2020)
      5: -30,   // Rok 5: korekta (jak 2021)
      6: 40,    // Rok 6: wzrost (jak 2022)
      7: 100,   // Rok 7: silny wzrost (jak 2023)
      8: -50,   // Rok 8: duży spadek (jak 2024)
      9: 30,    // Rok 9: odbicie (jak 2025)
      10: 60,   // Rok 10: wzrost
      11: 120,  // Rok 11: silny wzrost
      12: -40,  // Rok 12: korekta
      13: 50,   // Rok 13: wzrost
      14: 90,   // Rok 14: silny wzrost
      15: 150   // Rok 15: bardzo silny wzrost
    }
  },
  bullish: {
    label: 'Bullish - Byczy',
    description: 'Przeważają wzrosty z małymi korektami',
    yearlyChanges: {
      1: 80,    // Rok 1: silny wzrost
      2: -15,   // Rok 2: mała korekta
      3: 60,    // Rok 3: silny wzrost
      4: -10,   // Rok 4: mała korekta
      5: 100,   // Rok 5: bardzo silny wzrost
      6: -20,   // Rok 6: mała korekta
      7: 120,   // Rok 7: bardzo silny wzrost
      8: -25,   // Rok 8: mała korekta
      9: 150,   // Rok 9: ogromny wzrost
      10: -30,  // Rok 10: mała korekta
      11: 200,  // Rok 11: ekstremalny wzrost
      12: -35,  // Rok 12: mała korekta
      13: 180,  // Rok 13: bardzo silny wzrost
      14: -40,  // Rok 14: mała korekta
      15: 250   // Rok 15: ekstremalny wzrost
    }
  }
}; 