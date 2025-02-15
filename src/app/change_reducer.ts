import Amounts from "./amounts"
import make_change from "./make_change"
import round_to_nearest_cent from "./round_to_nearest_cent"

export default (old_amounts: Amounts, action: {type: string, value: number}) => {
    let new_amounts: Amounts = {
      totalCostUSD: old_amounts.totalCostUSD,
      amountProvidedUSD: old_amounts.amountProvidedUSD,
      changeOwedUSD: 0,
      stacks: [],
      valid: true
    }

    switch(action.type){
      case 'change:cost': {
        new_amounts.totalCostUSD = round_to_nearest_cent(action.value)
        break
      }
      case 'change:amount_provided': {
        new_amounts.amountProvidedUSD = round_to_nearest_cent(action.value)
        break
      }
      default: {
        throw new Error(`Unknown action '${action.type}'`)
      }
    }

    // CAUTION: JS's IEEE764 floating point may lead to odd fractional remainders of operations. Hence the rounding.
    new_amounts.changeOwedUSD = round_to_nearest_cent(new_amounts.amountProvidedUSD - new_amounts.totalCostUSD)

    let change_stacks = make_change(new_amounts.changeOwedUSD)
    if(change_stacks){
      new_amounts.stacks = change_stacks
    } else {
      new_amounts.valid = false
    }
    return new_amounts
  }