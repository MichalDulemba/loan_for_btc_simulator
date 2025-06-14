// Debug obliczeń dla 400 000 PLN z 5% inflacją przez 5 lat

// Parametry
const nominalValue = 400000; // PLN
const inflationRate = 5; // %
const years = 5;

// Obliczenie ręczne
const inflationFactor = Math.pow(1 + inflationRate / 100, years);
const realValue = nominalValue / inflationFactor;

console.log('=== OBLICZENIA DLA 400 000 PLN ===');
console.log(`Nominalna wartość: ${nominalValue} PLN`);
console.log(`Inflacja: ${inflationRate}%`);
console.log(`Lata: ${years}`);
console.log(`Czynnik inflacyjny: (1 + ${inflationRate/100})^${years} = ${inflationFactor}`);
console.log(`Wartość realna: ${nominalValue} / ${inflationFactor} = ${realValue}`);
console.log(`Wartość realna (zaokrąglona): ${realValue.toFixed(2)} PLN`);
console.log('===================================');

// Sprawdzenie z funkcją calculatePurchasingPower
import { calculatePurchasingPower } from './src/utils/calculations.js';

const functionResult = calculatePurchasingPower(nominalValue, inflationRate, years);
console.log(`Wynik funkcji: ${functionResult}`);
console.log(`Różnica: ${Math.abs(realValue - functionResult)}`);

// Sprawdzenie czy to może być 266 304 zł
console.log('\n=== SPRAWDZENIE 266 304 zł ===');
console.log(`Czy 266 304 = ${realValue}? ${Math.abs(266304 - realValue) < 1 ? 'TAK' : 'NIE'}`);
console.log(`Różnica: ${Math.abs(266304 - realValue)}`);

// Sprawdzenie innych możliwych obliczeń
console.log('\n=== INNE MOŻLIWE OBLICZENIA ===');
console.log(`400000 * 0.05 * 5 = ${400000 * 0.05 * 5}`); // Proste odejmowanie inflacji
console.log(`400000 - (400000 * 0.05 * 5) = ${400000 - (400000 * 0.05 * 5)}`); // Stare obliczenie
console.log(`400000 / (1 + 0.05 * 5) = ${400000 / (1 + 0.05 * 5)}`); // Błędne obliczenie
console.log(`400000 * (1 - 0.05)^5 = ${400000 * Math.pow(1 - 0.05, 5)}`); // Inne błędne obliczenie 