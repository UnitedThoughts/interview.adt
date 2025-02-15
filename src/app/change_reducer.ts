import Amounts from "./amounts"

export default (old_amounts: Amounts, action: {type: string, value: number}) => {  

    let new_amounts: Amounts = {
      totalCostUSD: old_amounts.totalCostUSD,
      amountProvidedUSD: old_amounts.amountProvidedUSD,
      changeOwedUSD: 0,
      valid: false
    }
    switch(action.type){
      case 'change:cost': {
        new_amounts.totalCostUSD = action.value
        break
      }
      case 'change:amount_provided': {
        new_amounts.amountProvidedUSD = action.value
        break
      }
      default: {
        throw new Error(`Unknown action '${action.type}'`)
      }
    }

    new_amounts.changeOwedUSD = new_amounts.amountProvidedUSD - new_amounts.totalCostUSD
    new_amounts.valid = new_amounts.changeOwedUSD >= 0

    return new_amounts
  }