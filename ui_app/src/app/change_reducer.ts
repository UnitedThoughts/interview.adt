import { v4 as randomUUID }  from "uuid"
import Amounts               from "./amounts"
import {make_change, round_to_nearest_cent}   from "@unitedthoughts/wind-of-change"

export default (old_amounts: Amounts, action: {type: string, value: number | string}) => {
    let new_amounts: Amounts = {
      totalCostUSD: old_amounts.totalCostUSD,
      amountProvidedUSD: old_amounts.amountProvidedUSD,
      changeOwedUSD: 0,
      stacks: [],
      current_purchase_name: old_amounts.current_purchase_name,
      // Caution: Reducers need to be pure functions, so clone the purchases history array to avoid accidental side effects.
      purchases: [...old_amounts.purchases], 
      valid: true
    }

    switch(action.type){
      case 'change:cost': {
        new_amounts.totalCostUSD = round_to_nearest_cent(<number>action.value)
        break
      }
      case 'change:amount_provided': {
        new_amounts.amountProvidedUSD = round_to_nearest_cent(<number>action.value)
        break
      }
      case 'change:current_purchase_name': {
        new_amounts.current_purchase_name = <string>action.value
        break
      }
      case 'save:purchase': {
        new_amounts.purchases.push({
          id: randomUUID(),
          name: new_amounts.current_purchase_name, 
          amounts: old_amounts
        })
        break
      }
      default: {
        throw new Error(`Unknown action '${action.type}'`)
      }
    }

    // CAUTION: JS's IEEE754 floating point may lead to odd fractional remainders of operations. Hence the rounding.
    new_amounts.changeOwedUSD = round_to_nearest_cent(new_amounts.amountProvidedUSD - new_amounts.totalCostUSD)

    let change_stacks = make_change(new_amounts.changeOwedUSD)
    if(change_stacks){
      new_amounts.stacks = change_stacks
    } else {
      new_amounts.valid = false
    }

    console.log(action, new_amounts)
    return new_amounts
  }