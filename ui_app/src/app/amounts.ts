import DenominationStack from "../../../wind-of-change/src/denomination_stack"

export type Purchase = {
    id: string,
    name: string,
    amounts: Amounts
}

type Amounts = {
    totalCostUSD: number, 
    amountProvidedUSD: number, 
    changeOwedUSD: number, 
    stacks: DenominationStack[], 
    valid: boolean,
    current_purchase_name: string,
    purchases: Purchase[]
}

export default Amounts