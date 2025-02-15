'use client'

import styles from "./page.module.css";
import { useReducer } from 'react';

import denominations from "./denominations";
import AmountsDisplay from "./amounts_display";
import DenominationsList from "./denominations_list";

import type DenominationStack from "./denomination_stack";
import changeReducer from "./change_reducer"

let change: DenominationStack[] = denominations.map((denomination) => {
  return {
    value_usd: denomination.value_usd, 
    type: denomination.type,
    count: 0
  }
})

export default function Home() {
  const [amounts, dispatch] = useReducer(changeReducer, {totalCostUSD: 0, amountProvidedUSD: 0, changeOwedUSD: 0, valid: true})

  return (
    <main className={styles.main}>
      <AmountsDisplay amounts={amounts} dispatch={dispatch}/>
      <DenominationsList change={change}/>
    </main>
  )
}
