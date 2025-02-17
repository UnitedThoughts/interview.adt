import type Amounts from "./amounts";
import DenominationsList from "./denominations_list";
import styles            from "./page.module.css"

export default ({amounts}: {amounts: Amounts}) => {
    return <div className={styles.previous_purchases}>
        {amounts.purchases.map((purchase) => {
            return <div key={purchase.id} className={styles.purchase}>
                <span className="purchase_name">{purchase.name}</span>
                <DenominationsList amounts={purchase.amounts}/>
            </div>
        })}
    </div>
}