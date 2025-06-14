import { createRoot } from 'react-dom/client'
import BTCLoanCalculator from './components/BTCLoanCalculator'
import './index.css'

const root = createRoot(document.getElementById('root'))
root.render(
  <BTCLoanCalculator />
) 