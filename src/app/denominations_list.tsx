import type Amounts from "./amounts";
import type DenominationStack from "./denomination_stack"

import icons from "./icons.module.css"
import styles from "./page.module.css"

const DenominationDisplay = ({stack}: {stack: DenominationStack}) => {
    return (<div className={`${styles.denomination_display} ${stack.count === 0 ? 'inactive' : 'active'}`} >
      {stack.denomination.type === 'bill' ? (
        <span className={ icons.bill_icon }>{stack.denomination.value_usd}</span>
      ) : (
        <span className={ icons.coin_icon }>{stack.denomination.value_usd * 100}</span>
      )}
          x
          <span className="count">{stack.count}</span>
        </div>
    )
  }
  
  const DenominationsList = ({amounts}: {amounts: Amounts}) => {
    return (
      <div id="change-returned" className={styles.change_returned}>
        {amounts.stacks.map(stack =>  <DenominationDisplay key={stack.denomination.value_usd} stack={stack}/>)
        }
      </div>
    )
  }

  export default DenominationsList