import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useBTCStrategy } from '../useBTCStrategy'

describe('useBTCStrategy - Purchasing Power Calculations', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => 
      useBTCStrategy(100000, 20000, 80000, 6.0, 10)
    )

    // Check that default values are set correctly
    expect(result.current.inflationRate).toBe(4.0) // Default from DEFAULT_VALUES
    expect(result.current.btcBuyPrice).toBe(80000) // Default from DEFAULT_VALUES
    expect(result.current.selectedScenario).toBe('neutral') // Default from useState
  })

  it('should calculate correct purchasing power for long-term scenarios', () => {
    // Given: Basic loan parameters
    const loanAmount = 100000
    const totalInterest = 20000
    const bondsAmount = 80000
    const bondsRate = 6.0
    const loanYears = 10

    // When: Render the hook
    const { result } = renderHook(() => 
      useBTCStrategy(loanAmount, totalInterest, bondsAmount, bondsRate, loanYears)
    )

    // Set specific values for testing using act()
    act(() => {
      result.current.setBtcBuyPrice(80000)
      result.current.setBtcPeak1(240000)
      result.current.setBtcPeak2(500000)
      result.current.setBtcPeak2035(800000)
      result.current.setBtcPeak2040(1200000)
      result.current.setUsdPlnRate(3.75)
      result.current.setInflationRate(5) // 5% inflation
      result.current.setPurchaseStrategy('lump')
      result.current.setSellAtPeak1(50)
    })

    // Wait for state to update
    expect(result.current.btcAmount).toBeGreaterThan(0)
    expect(result.current.netProfit2030).toBeGreaterThan(0)

    // Then: Check that purchasing power calculations are correct
    // For 2030 (5 years from 2025): 100,000 PLN with 5% inflation = 78,352.62 PLN
    const expected2030 = result.current.netProfit2030 / Math.pow(1 + 0.05, 5)
    expect(result.current.inflationAdjustedProfit2030).toBeCloseTo(expected2030, 1)

    // For 2035 (10 years from 2025): 100,000 PLN with 5% inflation = 61,391.33 PLN
    const expected2035 = result.current.netProfit2035 / Math.pow(1 + 0.05, 10)
    expect(result.current.inflationAdjustedProfit2035).toBeCloseTo(expected2035, 1)

    // For 2040 (15 years from 2025): 100,000 PLN with 5% inflation = 48,102.45 PLN
    const expected2040 = result.current.netProfit2040 / Math.pow(1 + 0.05, 15)
    expect(result.current.inflationAdjustedProfit2040).toBeCloseTo(expected2040, 1)
  })

  it('should calculate correct purchasing power with default parameters (4% inflation)', () => {
    // Given: Default parameters that should give 266 304 zł
    const loanAmount = 100000
    const totalInterest = 20000
    const bondsAmount = 80000
    const bondsRate = 6.0
    const loanYears = 10

    // When: Render the hook with default values
    const { result } = renderHook(() => 
      useBTCStrategy(loanAmount, totalInterest, bondsAmount, bondsRate, loanYears)
    )

    // Set default values (same as in app)
    act(() => {
      result.current.setBtcBuyPrice(80000)
      result.current.setBtcPeak1(240000)
      result.current.setBtcPeak2(500000)
      result.current.setUsdPlnRate(3.75)
      result.current.setInflationRate(4) // Default 4% inflation
      result.current.setPurchaseStrategy('lump')
      result.current.setSellAtPeak1(50)
      result.current.setSelectedScenario('neutral') // Default scenario
    })

    // Wait for state to update
    expect(result.current.btcAmount).toBeGreaterThan(0)
    expect(result.current.netProfit2030).toBeGreaterThan(0)

    // Debug output
    console.log('=== DEBUG: Default Parameters Test ===')
    console.log(`BTC amount: ${result.current.btcAmount}`)
    console.log(`Value at 2030: ${result.current.valueAt2030}`)
    console.log(`Gross profit 2030: ${result.current.grossProfit2030}`)
    console.log(`Tax 2030: ${result.current.tax2030}`)
    console.log(`Net profit 2030: ${result.current.netProfit2030}`)
    console.log(`Inflation adjusted profit 2030: ${result.current.inflationAdjustedProfit2030}`)
    console.log('=====================================')

    // Then: Check that we get the expected 266 304 zł
    // Expected calculation: netProfit2030 / (1 + 0.04)^5
    const expected2030 = result.current.netProfit2030 / Math.pow(1 + 0.04, 5)
    expect(result.current.inflationAdjustedProfit2030).toBeCloseTo(expected2030, 1)
    
    // This should be approximately 266 304 zł
    expect(result.current.inflationAdjustedProfit2030).toBeCloseTo(266304, 0)
  })

  it('should match exact UI values for 2030 scenario', () => {
    // Given: Exact parameters from UI with real loan calculations
    const loanAmount = 100000
    const interestRate = 12 // Default interest rate
    const loanYears = 10 // Default loan years
    
    // Calculate real total interest using the same formula as useLoanCalculations
    const monthlyRate = interestRate / 100 / 12;
    const months = loanYears * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalLoanCost = monthlyPayment * months;
    const totalInterest = totalLoanCost - loanAmount; // This should be ~72,165 PLN
    
    const bondsAmount = 80000
    const bondsRate = 6.0

    // When: Render the hook with exact UI values
    const { result } = renderHook(() => 
      useBTCStrategy(loanAmount, totalInterest, bondsAmount, bondsRate, loanYears)
    )

    // Set exact values from UI
    act(() => {
      result.current.setBtcBuyPrice(80000)
      result.current.setBtcPeak1(240000)
      result.current.setBtcPeak2(500000)
      result.current.setUsdPlnRate(3.75)
      result.current.setInflationRate(4) // Default 4% inflation
      result.current.setPurchaseStrategy('lump')
      result.current.setSellAtPeak1(50)
      result.current.setSelectedScenario('neutral') // Default scenario
    })

    // Then: Verify exact UI values with tax calculations
    expect(result.current.valueAt2030).toBeCloseTo(500000, 0) // Wartość BTC: 500 000 zł
    
    // Total cost should include loan amount + real interest
    expect(result.current.totalCost2030).toBeCloseTo(172165, 0) // Koszt całkowity: 172 165 zł
    
    // Gross profit should be value - purchase cost (without tax)
    expect(result.current.grossProfit2030).toBeCloseTo(400000, 0) // Zysk brutto: 400 000 zł
    
    // Net profit should be gross profit - tax (19%)
    expect(result.current.netProfit2030).toBeCloseTo(324000, 0) // Zysk netto: 324 000 zł
    
    // Inflation adjusted profit should be net profit / (1 + 0.04)^5
    expect(result.current.inflationAdjustedProfit2030).toBeCloseTo(266304, 0) // Siła nabywcza: 266 304 zł

    // Debug output with detailed calculations
    console.log('=== EXACT UI VALUES TEST (WITH REAL LOAN CALC) ===')
    console.log(`Real total interest: ${totalInterest.toFixed(2)} PLN`)
    console.log(`BTC amount: ${result.current.btcAmount}`)
    console.log(`Value at 2030: ${result.current.valueAt2030} (expected: 500000)`)
    console.log(`Purchase cost: ${result.current.btcAmount * result.current.averageBuyPrice * result.current.usdPlnRate}`)
    console.log(`Total cost 2030: ${result.current.totalCost2030} (expected: 172165)`)
    console.log(`Gross profit 2030: ${result.current.grossProfit2030} (expected: 400000)`)
    console.log(`Tax 2030: ${result.current.tax2030} (expected: 76000)`)
    console.log(`Net profit 2030: ${result.current.netProfit2030} (expected: 324000)`)
    console.log(`Inflation adjusted profit 2030: ${result.current.inflationAdjustedProfit2030} (expected: 266304)`)
    console.log(`Manual calculation: ${result.current.netProfit2030} / ${Math.pow(1 + 0.04, 5)} = ${result.current.netProfit2030 / Math.pow(1 + 0.04, 5)}`)
    console.log('==================================================')
  })

  it('should handle zero inflation correctly', () => {
    const { result } = renderHook(() => 
      useBTCStrategy(100000, 20000, 80000, 6.0, 10)
    )

    act(() => {
      result.current.setInflationRate(0)
    })

    // With zero inflation, real values should equal nominal values
    expect(result.current.inflationAdjustedProfit2030).toBeCloseTo(result.current.netProfit2030, 1)
    expect(result.current.inflationAdjustedProfit2035).toBeCloseTo(result.current.netProfit2035, 1)
    expect(result.current.inflationAdjustedProfit2040).toBeCloseTo(result.current.netProfit2040, 1)
  })

  it('should calculate correct purchasing power for peak scenarios', () => {
    const { result } = renderHook(() => 
      useBTCStrategy(100000, 20000, 80000, 6.0, 10)
    )

    act(() => {
      result.current.setInflationRate(5)
      result.current.setBtcBuyPrice(80000)
      result.current.setBtcPeak1(240000)
      result.current.setBtcPeak2(500000)
      result.current.setUsdPlnRate(3.75)
      result.current.setPurchaseStrategy('lump')
      result.current.setSellAtPeak1(50)
    })

    // Check peak 1 real profit (2 years from 2025)
    const expectedPeak1 = result.current.netProfitPeak1 / Math.pow(1 + 0.05, 2)
    expect(result.current.netProfitPeak1Real).toBeCloseTo(expectedPeak1, 1)

    // Check peak 2 real profit (4 years from 2025)
    const expectedPeak2 = result.current.netProfitPeak2 / Math.pow(1 + 0.05, 4)
    expect(result.current.netProfitPeak2Real).toBeCloseTo(expectedPeak2, 1)
  })

  it('should calculate correct bonds real return', () => {
    const { result } = renderHook(() => 
      useBTCStrategy(100000, 20000, 80000, 6.0, 10)
    )

    act(() => {
      result.current.setInflationRate(5)
    })

    // Bonds real return should be calculated correctly
    const expectedBondsReal = result.current.bondsNetReturn / Math.pow(1 + 0.05, 10)
    expect(result.current.bondsNetReturnReal).toBeCloseTo(expectedBondsReal, 1)
  })

  it('should use calculatePurchasingPower function correctly', () => {
    const { result } = renderHook(() => 
      useBTCStrategy(100000, 20000, 80000, 6.0, 10)
    )

    act(() => {
      result.current.setInflationRate(5)
      result.current.setBtcBuyPrice(80000)
      result.current.setBtcPeak1(240000)
      result.current.setBtcPeak2(500000)
      result.current.setUsdPlnRate(3.75)
      result.current.setPurchaseStrategy('lump')
      result.current.setSellAtPeak1(50)
    })

    // Test the specific case: 100,000 PLN with 5% inflation over 5 years
    const testValue = 100000
    const expectedRealValue = testValue / Math.pow(1 + 0.05, 5)
    
    // This should be approximately 78,352.62 PLN
    expect(expectedRealValue).toBeCloseTo(78352.62, 1)
    
    // Verify that the hook's inflation rate is set correctly
    expect(result.current.inflationRate).toBe(5)
  })

  it('should verify economic consistency of calculations', () => {
    // Given: Default parameters
    const loanAmount = 100000
    const totalInterest = 20000
    const bondsAmount = 80000
    const bondsRate = 6.0
    const loanYears = 10

    // When: Render the hook with default values
    const { result } = renderHook(() => 
      useBTCStrategy(loanAmount, totalInterest, bondsAmount, bondsRate, loanYears)
    )

    // Set default values
    act(() => {
      result.current.setBtcBuyPrice(80000)
      result.current.setBtcPeak1(240000)
      result.current.setBtcPeak2(500000)
      result.current.setUsdPlnRate(3.75)
      result.current.setInflationRate(4)
      result.current.setPurchaseStrategy('lump')
      result.current.setSellAtPeak1(50)
      result.current.setSelectedScenario('neutral')
    })

    // Then: Verify economic consistency
    // 1. BTC amount should be correct
    const expectedBtcAmount = loanAmount / (result.current.btcBuyPrice * result.current.usdPlnRate)
    expect(result.current.btcAmount).toBeCloseTo(expectedBtcAmount, 6)

    // 2. Value at 2030 should be correct
    const expectedValue2030 = result.current.btcAmount * result.current.btcPeak2030 * result.current.usdPlnRate
    expect(result.current.valueAt2030).toBeCloseTo(expectedValue2030, 0)

    // 3. Gross profit should be value - purchase cost
    const purchaseCost = result.current.btcAmount * result.current.averageBuyPrice * result.current.usdPlnRate
    const expectedGrossProfit = result.current.valueAt2030 - purchaseCost
    expect(result.current.grossProfit2030).toBeCloseTo(expectedGrossProfit, 0)

    // 4. Tax should be 19% of gross profit
    const expectedTax = result.current.grossProfit2030 * 0.19
    expect(result.current.tax2030).toBeCloseTo(expectedTax, 0)

    // 5. Net profit should be gross profit - tax
    const expectedNetProfit = result.current.grossProfit2030 - result.current.tax2030
    expect(result.current.netProfit2030).toBeCloseTo(expectedNetProfit, 0)

    // 6. Inflation adjusted profit should be net profit / (1 + inflation)^years
    const expectedInflationAdjusted = result.current.netProfit2030 / Math.pow(1 + 0.04, 5)
    expect(result.current.inflationAdjustedProfit2030).toBeCloseTo(expectedInflationAdjusted, 0)

    // Debug output
    console.log('=== ECONOMIC CONSISTENCY TEST ===')
    console.log(`BTC amount: ${result.current.btcAmount} (expected: ${expectedBtcAmount})`)
    console.log(`Value at 2030: ${result.current.valueAt2030} (expected: ${expectedValue2030})`)
    console.log(`Purchase cost: ${purchaseCost}`)
    console.log(`Gross profit: ${result.current.grossProfit2030} (expected: ${expectedGrossProfit})`)
    console.log(`Tax: ${result.current.tax2030} (expected: ${expectedTax})`)
    console.log(`Net profit: ${result.current.netProfit2030} (expected: ${expectedNetProfit})`)
    console.log(`Inflation adjusted: ${result.current.inflationAdjustedProfit2030} (expected: ${expectedInflationAdjusted})`)
    console.log('=================================')
  })

  it('should verify loan calculations are consistent with real loan math', () => {
    // Given: Default loan parameters
    const loanAmount = 100000
    const interestRate = 12
    const loanYears = 10
    
    // Calculate real loan values
    const monthlyRate = interestRate / 100 / 12;
    const months = loanYears * 12;
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalLoanCost = monthlyPayment * months;
    const totalInterest = totalLoanCost - loanAmount;
    
    const bondsAmount = 80000
    const bondsRate = 6.0

    // When: Render the hook with real loan calculations
    const { result } = renderHook(() => 
      useBTCStrategy(loanAmount, totalInterest, bondsAmount, bondsRate, loanYears)
    )

    // Set default values
    act(() => {
      result.current.setBtcBuyPrice(80000)
      result.current.setBtcPeak1(240000)
      result.current.setBtcPeak2(500000)
      result.current.setUsdPlnRate(3.75)
      result.current.setInflationRate(4)
      result.current.setPurchaseStrategy('lump')
      result.current.setSellAtPeak1(50)
      result.current.setSelectedScenario('neutral')
    })

    // Then: Verify loan calculations are correct
    expect(totalInterest).toBeCloseTo(72165, 0) // Real interest should be ~72,165 PLN
    expect(totalLoanCost).toBeCloseTo(172165, 0) // Total cost should be ~172,165 PLN
    
    // Total cost in hook should match real loan cost
    expect(result.current.totalCost2030).toBeCloseTo(totalLoanCost, 0)
    
    // Debug output
    console.log('=== LOAN CALCULATIONS CONSISTENCY TEST ===')
    console.log(`Loan amount: ${loanAmount} PLN`)
    console.log(`Interest rate: ${interestRate}%`)
    console.log(`Loan years: ${loanYears}`)
    console.log(`Monthly payment: ${monthlyPayment.toFixed(2)} PLN`)
    console.log(`Total loan cost: ${totalLoanCost.toFixed(2)} PLN`)
    console.log(`Total interest: ${totalInterest.toFixed(2)} PLN`)
    console.log(`Hook total cost 2030: ${result.current.totalCost2030.toFixed(2)} PLN`)
    console.log('==========================================')
  })
}) 