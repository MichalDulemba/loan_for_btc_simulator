// Debug - szukanie skąd pochodzi 266 304 zł

console.log('=== SZUKANIE 266 304 zł ===');

// Sprawdzenie różnych kombinacji parametrów
const targetValue = 266304;

// Test 1: Sprawdzenie czy to może być wynik dla innych wartości
console.log('\n=== TEST 1: Różne wartości nominalne z 5% inflacją przez 5 lat ===');
for (let nominal = 300000; nominal <= 500000; nominal += 10000) {
  const result = nominal / Math.pow(1 + 0.05, 5);
  if (Math.abs(result - targetValue) < 100) {
    console.log(`Znaleziono! ${nominal} PLN z 5% inflacją przez 5 lat = ${result.toFixed(2)} PLN`);
  }
}

// Test 2: Sprawdzenie różnych stóp inflacji dla 400 000 PLN przez 5 lat
console.log('\n=== TEST 2: 400 000 PLN z różnymi stopami inflacji przez 5 lat ===');
for (let inflation = 1; inflation <= 10; inflation += 0.1) {
  const result = 400000 / Math.pow(1 + inflation / 100, 5);
  if (Math.abs(result - targetValue) < 100) {
    console.log(`Znaleziono! 400 000 PLN z ${inflation}% inflacją przez 5 lat = ${result.toFixed(2)} PLN`);
  }
}

// Test 3: Sprawdzenie różnych lat dla 400 000 PLN z 5% inflacją
console.log('\n=== TEST 3: 400 000 PLN z 5% inflacją przez różne lata ===');
for (let years = 1; years <= 20; years++) {
  const result = 400000 / Math.pow(1 + 0.05, years);
  if (Math.abs(result - targetValue) < 100) {
    console.log(`Znaleziono! 400 000 PLN z 5% inflacją przez ${years} lat = ${result.toFixed(2)} PLN`);
  }
}

// Test 4: Sprawdzenie czy to może być wynik dla 4% inflacji
console.log('\n=== TEST 4: Sprawdzenie 4% inflacji (domyślna wartość) ===');
for (let nominal = 300000; nominal <= 500000; nominal += 10000) {
  for (let years = 1; years <= 20; years++) {
    const result = nominal / Math.pow(1 + 0.04, years);
    if (Math.abs(result - targetValue) < 100) {
      console.log(`Znaleziono! ${nominal} PLN z 4% inflacją przez ${years} lat = ${result.toFixed(2)} PLN`);
    }
  }
}

// Test 5: Sprawdzenie czy to może być wynik dla scenariusza 2030
console.log('\n=== TEST 5: Sprawdzenie scenariusza 2030 ===');
// Domyślne wartości: btcBuyPrice: 80000, usdPlnRate: 3.75, loanAmount: 100000
// Scenariusz neutralny 2030: peak2030: 400000
const btcBuyPrice = 80000;
const usdPlnRate = 3.75;
const loanAmount = 100000;
const btcPeak2030 = 400000;

// Obliczenie BTC amount
const btcAmount = loanAmount / (btcBuyPrice * usdPlnRate);
console.log(`BTC amount: ${btcAmount}`);

// Obliczenie wartości w 2030
const valueAt2030 = btcAmount * btcPeak2030 * usdPlnRate;
console.log(`Wartość w 2030: ${valueAt2030}`);

// Obliczenie zysku brutto
const grossProfit2030 = valueAt2030 - (btcAmount * btcBuyPrice * usdPlnRate);
console.log(`Zysk brutto 2030: ${grossProfit2030}`);

// Obliczenie podatku (19%)
const tax2030 = grossProfit2030 * 0.19;
console.log(`Podatek 2030: ${tax2030}`);

// Obliczenie zysku netto
const netProfit2030 = grossProfit2030 - tax2030;
console.log(`Zysk netto 2030: ${netProfit2030}`);

// Obliczenie wartości realnej z 4% inflacją przez 5 lat
const realValue2030 = netProfit2030 / Math.pow(1 + 0.04, 5);
console.log(`Wartość realna 2030: ${realValue2030}`);

if (Math.abs(realValue2030 - targetValue) < 100) {
  console.log(`ZNALEZIONO! Wartość realna 2030 = ${realValue2030.toFixed(2)} PLN`);
}

// Test 6: Sprawdzenie czy to może być wynik dla innych scenariuszy
console.log('\n=== TEST 6: Sprawdzenie innych scenariuszy ===');
const scenarios = [
  { name: 'pessimistic', peak2030: 150000 },
  { name: 'conservative', peak2030: 200000 },
  { name: 'neutral', peak2030: 400000 },
  { name: 'bullish', peak2030: 600000 }
];

scenarios.forEach(scenario => {
  const valueAt2030 = btcAmount * scenario.peak2030 * usdPlnRate;
  const grossProfit2030 = valueAt2030 - (btcAmount * btcBuyPrice * usdPlnRate);
  const tax2030 = grossProfit2030 * 0.19;
  const netProfit2030 = grossProfit2030 - tax2030;
  const realValue2030 = netProfit2030 / Math.pow(1 + 0.04, 5);
  
  console.log(`${scenario.name}: ${realValue2030.toFixed(2)} PLN`);
  
  if (Math.abs(realValue2030 - targetValue) < 100) {
    console.log(`ZNALEZIONO! Scenariusz ${scenario.name} = ${realValue2030.toFixed(2)} PLN`);
  }
}); 