import DenominationStack from "./denomination_stack"

type Amounts = {totalCostUSD: number, amountProvidedUSD: number, changeOwedUSD: number, stacks: DenominationStack[], valid: boolean}

export default Amounts