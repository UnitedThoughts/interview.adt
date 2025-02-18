'use client'
import { useReducer }    from 'react';

import styles            from "./page.module.css";
import AmountsDisplay    from "./amounts_display";
import DenominationsList from "./denominations_list";
import changeReducer     from "./change_reducer"
import SavePurchaseView  from "./save_purchase_view"
import PreviousPurchasesList from "./previous_purchases_list"

export default function Home() {
  const [amounts, dispatch] = useReducer(changeReducer, {
    totalCostUSD: 0, 
    amountProvidedUSD: 0, 
    changeOwedUSD: 0, 
    stacks: [], 
    purchases: [],
    current_purchase_name: "",
    valid: true})
  return (
    <main className={styles.main}>
      <AmountsDisplay amounts={amounts} dispatch={dispatch}/>
      <DenominationsList amounts={amounts}/>
      <SavePurchaseView amounts={amounts} dispatch={dispatch}/>
      <PreviousPurchasesList amounts={amounts}/>
    </main>
  )
}
