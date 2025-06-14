// Debug obliczeń kredytu dla domyślnych parametrów

// Domyślne parametry
const loanAmount = 100000;
const interestRate = 12; // 12%
const loanYears = 10;

// Obliczenie miesięcznej raty
const monthlyRate = interestRate / 100 / 12;
const months = loanYears * 12;
const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

// Obliczenie całkowitego kosztu i odsetek
const totalLoanCost = monthlyPayment * months;
const totalInterest = totalLoanCost - loanAmount;

console.log('=== OBLICZENIA KREDYTU ===');
console.log(`Kwota kredytu: ${loanAmount} PLN`);
console.log(`Oprocentowanie: ${interestRate}%`);
console.log(`Okres: ${loanYears} lat`);
console.log(`Miesięczna rata: ${monthlyPayment.toFixed(2)} PLN`);
console.log(`Całkowity koszt: ${totalLoanCost.toFixed(2)} PLN`);
console.log(`Odsetki: ${totalInterest.toFixed(2)} PLN`);
console.log('==========================');

// Sprawdzenie czy to może być 72 165 zł
console.log('\n=== SPRAWDZENIE 72 165 zł ===');
console.log(`Czy odsetki = 72 165? ${Math.abs(totalInterest - 72165) < 1 ? 'TAK' : 'NIE'}`);
console.log(`Różnica: ${Math.abs(totalInterest - 72165)}`);

// Sprawdzenie czy całkowity koszt to 172 165 zł
console.log('\n=== SPRAWDZENIE 172 165 zł ===');
console.log(`Całkowity koszt: ${totalLoanCost.toFixed(2)} PLN`);
console.log(`Czy całkowity koszt = 172 165? ${Math.abs(totalLoanCost - 172165) < 1 ? 'TAK' : 'NIE'}`);
console.log(`Różnica: ${Math.abs(totalLoanCost - 172165)}`);

// Sprawdzenie różnych oprocentowań
console.log('\n=== SPRAWDZENIE RÓŻNYCH OPROCENTOWAŃ ===');
for (let rate = 10; rate <= 15; rate += 0.1) {
  const testMonthlyRate = rate / 100 / 12;
  const testMonthlyPayment = loanAmount * (testMonthlyRate * Math.pow(1 + testMonthlyRate, months)) / (Math.pow(1 + testMonthlyRate, months) - 1);
  const testTotalCost = testMonthlyPayment * months;
  const testTotalInterest = testTotalCost - loanAmount;
  
  if (Math.abs(testTotalInterest - 72165) < 100) {
    console.log(`Znaleziono! Oprocentowanie ${rate}% daje odsetki: ${testTotalInterest.toFixed(2)} PLN`);
  }
} 