import DenominationStack from "./denomination_stack"
import icons from "./icons.module.css"
import styles from "./page.module.css";

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
  
  const DenominationsList = ({change}: {change: DenominationStack[]}) => {
    return (
      <div id="change-returned" className={styles.change_returned}>
        {change.map(denomination =>  <DenominationDisplay key={denomination.value_usd} denomination={denomination}/>)
        }
      </div>
    )
  }

  export default DenominationsList