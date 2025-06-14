import { describe, it, expect } from 'vitest'
import { calculatePurchasingPower } from '../calculations'

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