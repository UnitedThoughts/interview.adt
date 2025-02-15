'use client'

import { useReducer } from 'react';

import styles from "./page.module.css";
import AmountsDisplay from "./amounts_display";
import DenominationsList from "./denominations_list";
import changeReducer from "./change_reducer"

export default function Home() {
  const [amounts, dispatch] = useReducer(changeReducer, {totalCostUSD: 0, amountProvidedUSD: 0, changeOwedUSD: 0, stacks: [], valid: true})

  return (
    <main className={styles.main}>
      <AmountsDisplay amounts={amounts} dispatch={dispatch}/>
      <DenominationsList amounts={amounts}/>
    </main>
  )
}
