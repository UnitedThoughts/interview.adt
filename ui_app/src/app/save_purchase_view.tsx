import type Amounts from "./amounts"
import styles            from "./page.module.css"

export default function SavePurchaseView({amounts, dispatch}: {amounts: Amounts, dispatch: any}) {
    return <>
        <input type="text" placeholder="Purchase name" className={styles.current_purchase_name} value={amounts.current_purchase_name} onChange={(e) => dispatch({type: 'change:current_purchase_name', value: e.target.value})}/> 
        <button className={styles.save_purchase_button} onClick={ (e) => dispatch({type: "save:purchase"})}>Save Purchase</button>
    </>
}