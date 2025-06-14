import { describe, it, expect } from 'vitest'
import { calculatePurchasingPower, calculateBreakEvenPrice } from '../calculations'

describe('calculatePurchasingPower', () => {
  it('should calculate correct purchasing power for 100,000 PLN with 5% inflation over 5 years', () => {
    // Given
    const nominalValue = 100000
    const inflationRate = 5
    const years = 5
    
    // When
    const result = calculatePurchasingPower(nominalValue, inflationRate, years)
    
    // Then
    // Expected calculation: 100000 / (1 + 0.05)^5 = 100000 / 1.2762815625 = 78352.62
    const expectedValue = 100000 / Math.pow(1 + 0.05, 5)
    
    expect(result).toBeCloseTo(expectedValue, 2)
    expect(result).toBeCloseTo(78352.62, 2)
    
    // Debug information
    console.log(`Test case: ${nominalValue} PLN with ${inflationRate}% inflation over ${years} years`)
    console.log(`Expected: ${expectedValue}`)
    console.log(`Actual: ${result}`)
    console.log(`Difference: ${Math.abs(result - expectedValue)}`)
  })

  it('should handle zero inflation correctly', () => {
    const result = calculatePurchasingPower(100000, 0, 5)
    expect(result).toBe(100000)
  })

  it('should handle zero years correctly', () => {
    const result = calculatePurchasingPower(100000, 5, 0)
    expect(result).toBe(100000)
  })

  it('should handle negative values gracefully', () => {
    const result = calculatePurchasingPower(-100000, 5, 5)
    const expectedValue = -100000 / Math.pow(1 + 0.05, 5)
    expect(result).toBeCloseTo(expectedValue, 2)
  })

  it('should calculate correct purchasing power for different scenarios', () => {
    // Test case 1: 4% inflation over 10 years
    const result1 = calculatePurchasingPower(100000, 4, 10)
    const expected1 = 100000 / Math.pow(1 + 0.04, 10)
    expect(result1).toBeCloseTo(expected1, 2)
    expect(result1).toBeCloseTo(67556.42, 2)

    // Test case 2: 2% inflation over 2 years
    const result2 = calculatePurchasingPower(100000, 2, 2)
    const expected2 = 100000 / Math.pow(1 + 0.02, 2)
    expect(result2).toBeCloseTo(expected2, 2)
    expect(result2).toBeCloseTo(96116.88, 2)
  })

  it('should handle decimal inflation rates', () => {
    const result = calculatePurchasingPower(100000, 3.5, 5)
    const expectedValue = 100000 / Math.pow(1 + 0.035, 5)
    expect(result).toBeCloseTo(expectedValue, 1)
    expect(result).toBeCloseTo(84197.31, 1)
  })

  it('should verify the main test case with detailed output', () => {
    // This is the main test case requested by the user
    const nominalValue = 100000
    const inflationRate = 5
    const years = 5
    
    const result = calculatePurchasingPower(nominalValue, inflationRate, years)
    const expectedValue = nominalValue / Math.pow(1 + inflationRate / 100, years)
    
    console.log('=== MAIN TEST CASE ===')
    console.log(`Input: ${nominalValue} PLN, ${inflationRate}% inflation, ${years} years`)
    console.log(`Formula: ${nominalValue} / (1 + ${inflationRate/100})^${years}`)
    console.log(`Formula: ${nominalValue} / ${Math.pow(1 + inflationRate/100, years)}`)
    console.log(`Expected: ${expectedValue}`)
    console.log(`Actual: ${result}`)
    console.log(`Difference: ${Math.abs(result - expectedValue)}`)
    console.log('=====================')
    
    expect(result).toBeCloseTo(expectedValue, 2)
    expect(result).toBeCloseTo(78352.62, 2)
  })

  it('should verify the function works with manual calculation', () => {
    // Manual step-by-step calculation
    const nominalValue = 100000
    const inflationRate = 5
    const years = 5
    
    // Step 1: Calculate inflation factor
    const inflationFactor = Math.pow(1 + inflationRate / 100, years)
    console.log(`Inflation factor: (1 + ${inflationRate/100})^${years} = ${inflationFactor}`)
    
    // Step 2: Calculate real value
    const realValue = nominalValue / inflationFactor
    console.log(`Real value: ${nominalValue} / ${inflationFactor} = ${realValue}`)
    
    // Step 3: Compare with function result
    const functionResult = calculatePurchasingPower(nominalValue, inflationRate, years)
    console.log(`Function result: ${functionResult}`)
    
    expect(functionResult).toBe(realValue)
    expect(functionResult).toBeCloseTo(78352.62, 2)
  })
})

describe('calculateBreakEvenPrice', () => {
  it('should calculate break-even price without transaction cost', () => {
    const loanAmount = 100000
    const totalInterest = 20000
    const btcAmount = 0.5
    const usdPlnRate = 4
    
    const breakEvenPrice = calculateBreakEvenPrice(loanAmount, totalInterest, btcAmount, usdPlnRate, 0)
    
    // Expected: (100000 + 20000) / (0.5 * 4 * 0.81) = 120000 / 1.62 = 74,074 USD
    expect(breakEvenPrice).toBeCloseTo(74074.07, 0)
  })

  it('should calculate break-even price with 1% transaction cost', () => {
    const loanAmount = 100000
    const totalInterest = 20000
    const btcAmount = 0.5
    const usdPlnRate = 4
    const transactionCost = 1
    
    const breakEvenPrice = calculateBreakEvenPrice(loanAmount, totalInterest, btcAmount, usdPlnRate, transactionCost)
    
    // Expected: (100000 + 20000) / (0.5 * 4 * 0.81 * 0.99) = 120000 / 1.6038 = 74,822 USD
    expect(breakEvenPrice).toBeCloseTo(74822.29, 0)
  })

  it('should calculate break-even price with 2% transaction cost', () => {
    const loanAmount = 100000
    const totalInterest = 20000
    const btcAmount = 0.5
    const usdPlnRate = 4
    const transactionCost = 2
    
    const breakEvenPrice = calculateBreakEvenPrice(loanAmount, totalInterest, btcAmount, usdPlnRate, transactionCost)
    
    // Expected: (100000 + 20000) / (0.5 * 4 * 0.81 * 0.98) = 120000 / 1.5876 = 75,585 USD
    // Using more precise calculation and tolerance
    const expectedValue = (loanAmount + totalInterest) / (btcAmount * usdPlnRate * 0.81 * (1 - transactionCost / 100))
    expect(breakEvenPrice).toBeCloseTo(expectedValue, 1)
  })

  it('should return 0 when btcAmount is 0', () => {
    const breakEvenPrice = calculateBreakEvenPrice(100000, 20000, 0, 4, 1)
    expect(breakEvenPrice).toBe(0)
  })

  it('should return 0 when usdPlnRate is 0', () => {
    const breakEvenPrice = calculateBreakEvenPrice(100000, 20000, 0.5, 0, 1)
    expect(breakEvenPrice).toBe(0)
  })

  it('should handle high transaction costs', () => {
    const loanAmount = 100000
    const totalInterest = 20000
    const btcAmount = 0.5
    const usdPlnRate = 4
    const transactionCost = 5 // 5% transaction cost
    
    const breakEvenPrice = calculateBreakEvenPrice(loanAmount, totalInterest, btcAmount, usdPlnRate, transactionCost)
    
    // Expected: (100000 + 20000) / (0.5 * 4 * 0.81 * 0.95) = 120000 / 1.539 = 77,973 USD
    // Using more precise calculation and tolerance
    const expectedValue = (loanAmount + totalInterest) / (btcAmount * usdPlnRate * 0.81 * (1 - transactionCost / 100))
    expect(breakEvenPrice).toBeCloseTo(expectedValue, 1)
  })

  it('should verify break-even calculation with manual calculation', () => {
    const loanAmount = 100000
    const totalInterest = 20000
    const btcAmount = 0.5
    const usdPlnRate = 4
    const transactionCost = 1
    
    // Manual calculation
    const totalCost = loanAmount + totalInterest
    const denominator = btcAmount * usdPlnRate * 0.81 * (1 - transactionCost / 100)
    const expectedBreakEven = totalCost / denominator
    
    const functionResult = calculateBreakEvenPrice(loanAmount, totalInterest, btcAmount, usdPlnRate, transactionCost)
    
    console.log('=== BREAK-EVEN TEST CASE ===')
    console.log(`Input: Loan ${loanAmount}, Interest ${totalInterest}, BTC ${btcAmount}, Rate ${usdPlnRate}, Cost ${transactionCost}%`)
    console.log(`Total cost: ${totalCost}`)
    console.log(`Denominator: ${btcAmount} * ${usdPlnRate} * 0.81 * ${1 - transactionCost/100} = ${denominator}`)
    console.log(`Expected: ${totalCost} / ${denominator} = ${expectedBreakEven}`)
    console.log(`Actual: ${functionResult}`)
    console.log('============================')
    
    expect(functionResult).toBeCloseTo(expectedBreakEven, 1)
  })
}) 