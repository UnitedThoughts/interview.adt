'use client'

import styles from "./page.module.css";
import icons from "./icons.module.css"
import { useReducer } from 'react';

const denominations = [
  {value_usd: 100, type: 'bill'},
  {value_usd:  50, type: 'bill'},
  {value_usd:  20, type: 'bill'},
  {value_usd:  10, type: 'bill'},
  {value_usd:   5, type: 'bill'},
  // do not count on your register having $2 bills
  {value_usd:   1, type: 'bill'},

  // do not count on your register having $1 coins
  {value_usd: 0.25, type: 'coin'},
  {value_usd: 0.10, type: 'coin'},
  {value_usd: 0.05, type: 'coin'},
  // TODO: Victorian mode for thruppence
  // TODO: Victorian mode for tuppence
  {value_usd: 0.01, type: 'coin'},
  // TODO: Victorian mode for ha'penny
]

type DenominationStack = {value_usd: number, type: string, count: number}

let change: DenominationStack[] = denominations.map((denomination) => {
  return {
    value_usd: denomination.value_usd, 
    type: denomination.type,
    count: 0
  }
})

const DenominationDisplay = ({denomination: denomination}: {denomination: DenominationStack}) => {
  return (<div key={denomination.value_usd} className={`${styles.denomination_display} ${denomination.count === 0 ? 'inactive' : 'active'}`} >
    {denomination.type === 'bill' ? (
      <span className={ icons.bill_icon }>{denomination.value_usd}</span>
    ) : (
      <span className={ icons.coin_icon }>{denomination.value_usd * 100}</span>
    )}
        x
        <span className="count">{denomination.count}</span>
      </div>
  )
}

const DemoninationsList = () => {
  return (
    <div id="change-returned" className={styles.change_returned}>
      {change.map(denomination =>  <DenominationDisplay key={denomination.value_usd} denomination={denomination}/>)
      }
    </div>
  )
}

type Amounts = {totalCostUSD: number, amountProvidedUSD: number, changeOwedUSD: number, valid: boolean}

const AmountsDisplay = ({amounts: amounts, dispatch: dispatch}: {amounts: Amounts, dispatch: any}) => {
  return <div className={styles.amounts}>
    <label htmlFor="total_cost_usd">Total Cost</label>
    <input type="number" placeholder="USD" id="total_cost_usd" value={amounts.totalCostUSD} onChange={(e) => dispatch({type: 'change:cost', value: Number(e.target.value)})}/>

    <label htmlFor="amount_provided_usd">Amount Provided</label>
    <input type="number" placeholder="USD" id="amount_provided_usd" value={amounts.amountProvidedUSD} onChange={(e) => dispatch({type: 'change:amount_provided', value: Number(e.target.value)})}/>
  
    <span>Change Owed</span>
    <span>{amounts.changeOwedUSD}</span>
  </div>
}

const changeReducer = (amounts: Amounts, action: {type: string, value: number}) => {  
  switch(action.type){
    case 'change:cost': {
      return {
        totalCostUSD: action.value,
        amountProvidedUSD: amounts.amountProvidedUSD,
        changeOwedUSD: amounts.amountProvidedUSD - amounts.totalCostUSD,
        valid: (amounts.amountProvidedUSD - amounts.totalCostUSD) >= 0
      }
    }
    case 'change:amount_provided': {
      return {
        totalCostUSD: amounts.totalCostUSD,
        amountProvidedUSD: action.value,
        changeOwedUSD: amounts.amountProvidedUSD - amounts.totalCostUSD,
        valid: (amounts.amountProvidedUSD - amounts.totalCostUSD) >= 0
      }
    }
    default: {
      throw new Error(`Unknown action '${action.type}'`)
    }
  }
}

export default function Home() {
  const [amounts, dispatch] = useReducer(changeReducer, {totalCostUSD: 0, amountProvidedUSD: 0, changeOwedUSD: 0, valid: true})

  return (
    <main className={styles.main}>
      <AmountsDisplay amounts={amounts} dispatch={dispatch}/>
      <DemoninationsList />
    </main>
  )
}
