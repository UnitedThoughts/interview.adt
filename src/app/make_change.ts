import type Denomination from "./denomination"
import type DenominationStack from "./denomination_stack"
import denominations from "./denominations"
import round_to_nearest_cent from "./round_to_nearest_cent"

export default (amount_usd: number): DenominationStack[] | null => {
    let change_remaining = amount_usd
    let stacks: DenominationStack[] = []

    while(change_remaining > 0){
        let largest_denomination: Denomination | null = null
        
        for (let next_denomination of denominations){
            const denomination_fits_in_remaining_change = next_denomination.value_usd <= change_remaining
            const new_largest_denomination = (!largest_denomination) || (next_denomination.value_usd > largest_denomination?.value_usd)

            if( denomination_fits_in_remaining_change && new_largest_denomination){ largest_denomination = next_denomination }
        }
        
        if(!largest_denomination){
            console.log("Cannot make change for", change_remaining, stacks)
            return null
        }

        let existing_stack: DenominationStack | undefined = stacks.find((stack) => stack.denomination.value_usd === largest_denomination.value_usd)
        if(!existing_stack){
            existing_stack = {count: 0, denomination: largest_denomination}
            stacks.push(existing_stack)
        }

        existing_stack.count += 1

        // CAUTION: JS's IEEE764 floating point may lead to odd fractional remainders of operations. Hence the rounding.
        change_remaining = round_to_nearest_cent(change_remaining - largest_denomination.value_usd)
    }
    
    return stacks
}