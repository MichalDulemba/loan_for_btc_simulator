# BTC Loan Calculator - Modular Architecture

A React-based calculator for analyzing Bitcoin investment strategies funded by bank loans, now refactored into a clean, modular architecture.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── BTCLoanCalculator.jsx    # Main component
│   ├── LoanParameters.jsx       # Loan configuration UI
│   └── BTCParameters.jsx        # Bitcoin price configuration UI
├── hooks/
│   ├── useLoanCalculations.js   # Loan calculation logic
│   └── useBTCStrategy.js        # BTC strategy calculations
├── utils/
│   ├── calculations.js          # Pure calculation functions
│   ├── formatters.js           # Number/currency formatting
│   └── validators.js           # Input validation
├── constants/
│   ├── scenarios.js            # BTC price scenarios
│   └── defaults.js             # Default values & limits
└── index.js                    # Main exports
```

## 🔧 Architecture Benefits

### 1. **Separation of Concerns**
- **Components**: UI rendering and user interaction
- **Hooks**: State management and business logic
- **Utils**: Pure functions for calculations and formatting
- **Constants**: Configuration and default values

### 2. **Improved Maintainability**
- Each file has a single responsibility
- Easy to locate and fix bugs
- Clear dependency structure

### 3. **Better Testability**
- Individual functions can be unit tested
- Hooks can be tested in isolation
- Components can be tested with mocked data

### 4. **Enhanced Reusability**
- Components can be reused in other projects
- Calculation functions are framework-agnostic
- Hooks can be shared between components

## 📦 Key Modules

### Custom Hooks

#### `useLoanCalculations`
Manages loan-related state and calculations:
- Loan amount, interest rate, loan years
- Monthly payments and total costs
- Bonds alternative calculations

#### `useBTCStrategy`
Handles Bitcoin strategy logic:
- BTC price projections and scenarios
- Profit calculations for different peaks
- Tax calculations and ROI analysis

### Utility Functions

#### `calculations.js`
Pure calculation functions:
- `calculateMonthlyPayment()` - Loan payment calculations
- `calculateBreakEvenPrice()` - BTC break-even analysis
- `calculateTax()` - Progressive tax calculations
- `calculateROI()` - Return on investment

#### `formatters.js`
Number and currency formatting:
- `formatPLN()` - Polish Złoty formatting
- `formatUSD()` - US Dollar formatting
- `formatPercentage()` - Percentage formatting
- `formatBTC()` - Bitcoin amount formatting

#### `validators.js`
Input validation functions:
- Range checking for all numeric inputs
- Currency and percentage validation
- BTC price validation

### Constants

#### `scenarios.js`
Predefined BTC price scenarios:
- Bearish: Peak 1: $150k, Peak 2: $300k
- Neutral: Peak 1: $240k, Peak 2: $500k
- Bullish: Peak 1: $350k, Peak 2: $750k

#### `defaults.js`
Default values, limits, and assumptions:
- Input ranges and step values
- Tax rates and thresholds
- Financial assumptions

## 🚀 Usage

```javascript
import { BTCLoanCalculator } from './index';

// Use the main component
function App() {
  return <BTCLoanCalculator />;
}

// Or use individual components
import { LoanParameters, useLoanCalculations } from './index';

function CustomApp() {
  const loanCalcs = useLoanCalculations();
  
  return (
    <LoanParameters
      loanAmount={loanCalcs.loanAmount}
      setLoanAmount={loanCalcs.setLoanAmount}
      // ... other props
    />
  );
}
```

## 🧪 Testing Strategy

The modular structure enables comprehensive testing:

1. **Unit Tests** - Test individual calculation functions
2. **Hook Tests** - Test custom hooks with React Testing Library
3. **Component Tests** - Test UI components with mocked data
4. **Integration Tests** - Test component interactions

## 🔄 Migration from Original

The original 1100+ line component has been broken down into:
- **6 focused files** instead of 1 monolithic component
- **2 custom hooks** for state management
- **3 utility modules** for pure functions
- **2 constant files** for configuration

This results in:
- 🔍 **Better debugging** - Easier to locate issues
- 📈 **Improved performance** - Better code splitting opportunities
- 👥 **Team collaboration** - Multiple developers can work simultaneously
- 🔄 **Easier updates** - Changes are localized to specific modules

## 🎯 Key Features Preserved

All original functionality is maintained:
- ✅ Loan parameter configuration
- ✅ BTC price scenario modeling
- ✅ Tax calculation (19% standard, 23% high income)
- ✅ Strategy analysis (partial selling at peaks)
- ✅ Bonds vs BTC comparison
- ✅ Risk analysis and recommendations
- ✅ Interactive charts and visualizations

## ⚠️ Risk Warning

**This calculator is for educational purposes only.** Investing borrowed money in cryptocurrencies carries extreme risk. You could lose more than your initial investment. Always consult with a financial advisor before making investment decisions. 