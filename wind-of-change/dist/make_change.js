import denominations from "./denominations.js";
import round_to_nearest_cent from "./round_to_nearest_cent.js";
export default (amount_usd) => {
    let change_remaining = amount_usd;
    let stacks = [];
    while (change_remaining > 0) {
        let largest_denomination = null;
        for (let next_denomination of denominations) {
            const denomination_fits_in_remaining_change = next_denomination.value_usd <= change_remaining;
            const new_largest_denomination = (!largest_denomination) || (next_denomination.value_usd > largest_denomination?.value_usd);
            if (denomination_fits_in_remaining_change && new_largest_denomination) {
                largest_denomination = next_denomination;
            }
        }
        if (!largest_denomination) {
            return null;
        }
        let existing_stack = stacks.find((stack) => stack.denomination.value_usd === largest_denomination.value_usd);
        if (!existing_stack) {
            existing_stack = { count: 0, denomination: largest_denomination };
            stacks.push(existing_stack);
        }
        existing_stack.count += 1;
        // CAUTION: JS's IEEE764 floating point may lead to odd fractional remainders of operations. Hence the rounding.
        change_remaining = round_to_nearest_cent(change_remaining - largest_denomination.value_usd);
    }
    return stacks;
};
