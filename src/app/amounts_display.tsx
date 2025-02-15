import styles from "./page.module.css";
import type Amounts from "./amounts"

export default ({amounts: amounts, dispatch: dispatch}: {amounts: Amounts, dispatch: any}) => {
    return <div className={styles.amounts}>
      <label htmlFor="total_cost_usd">Total Cost</label>
      <input type="number" placeholder="USD" id="total_cost_usd" value={amounts.totalCostUSD} onChange={(e) => dispatch({type: 'change:cost', value: Number(e.target.value)})}/>
  
      <label htmlFor="amount_provided_usd">Amount Provided</label>
      <input type="number" placeholder="USD" id="amount_provided_usd" value={amounts.amountProvidedUSD} onChange={(e) => dispatch({type: 'change:amount_provided', value: Number(e.target.value)})}/>
    
      <span>Change Owed</span>
      <span>{amounts.changeOwedUSD}</span>
    </div>
  }