import Amounts from "./amounts"
import type Denomination from "./denomination"
import type DenominationStack from "./denomination_stack"
import denominations from "./denominations"

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

    let change_remaining = new_amounts.changeOwedUSD

    while(change_remaining > 0){
      let largest_denomination: Denomination | null = null
      
      for (let denomination of denominations){
        if(denomination.value_usd <= change_remaining && (!largest_denomination || denomination.value_usd > largest_denomination?.value_usd)){
          largest_denomination = denomination
        }
      }
      
      if(!largest_denomination){
        new_amounts.valid = false
        break
      }

      let existing_stack: DenominationStack | undefined = new_amounts.stacks.find((stack) => stack.denomination.value_usd === largest_denomination.value_usd)
      if(!existing_stack){
        existing_stack = {count: 0, denomination: largest_denomination}
        new_amounts.stacks.push(existing_stack)
      }

      existing_stack.count += 1
      change_remaining -= largest_denomination.value_usd
    }

    new_amounts.valid = true

    return new_amounts
  }