import Image from "next/image";
import styles from "./page.module.css";
import icons from "./icons.module.css"

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
  {value_usd: 0.01, type: 'coin'},
]

type DenominationStack = {value_usd: number, type: string, count: number}

let change: DenominationStack[] = denominations.map((denomination) => {
  return {
    value_usd: denomination.value_usd, 
    type: denomination.type,
    count: 0
  }
})

const DenominationDisplay = ({denomination}) => {
  return (<div key={denomination.value_usd} className={styles.denomination_display}>
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

export default function Home() {
  return (
      <main className={styles.main}>

        <div className={styles.amounts}>
          <label htmlFor="total_cost_usd">Total Cost</label>
          <input type="number" placeholder="USD" id="total_cost_usd"/>

          <label htmlFor="amount_provided_usd">Amount Provided</label>
          <input type="number" placeholder="USD" id="amount_provided_usd"/>
        </div>

        <DemoninationsList />

      </main>
  )
}
