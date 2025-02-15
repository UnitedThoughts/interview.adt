import Amounts from "./amounts"

export default (amounts: Amounts, action: {type: string, value: number}) => {  
    switch(action.type){
      case 'change:cost': {
        return {
          totalCostUSD: action.value,
          amountProvidedUSD: amounts.amountProvidedUSD,
          changeOwedUSD: amounts.amountProvidedUSD - amounts.totalCostUSD,
          valid: (amounts.amountProvidedUSD - amounts.totalCostUSD) >= 0
        }
      }
      case 'change:amount_provided': {
        return {
          totalCostUSD: amounts.totalCostUSD,
          amountProvidedUSD: action.value,
          changeOwedUSD: amounts.amountProvidedUSD - amounts.totalCostUSD,
          valid: (amounts.amountProvidedUSD - amounts.totalCostUSD) >= 0
        }
      }
      default: {
        throw new Error(`Unknown action '${action.type}'`)
      }
    }
  }