import Image from "next/image";
import styles from "./page.module.css";
import icons from "./icons.module.css"

export default function Home() {
  return (
      <main className={styles.main}>

        <label htmlFor="total_cost_usd">Total Cost</label>
        <input type="number" id="total_cost_usd"/>

        <label htmlFor="amount_provided_usd">Amount Provided</label>
        <input type="number" id="amount_provided_usd"/>

        <div id="change-returned" className={styles.change_returned}>
          <div id="usd_100">
            <span className={icons.bill_icon}>100</span>
          </div>
          <div id="usd_0.01">
            <span className={icons.coin_icon}>1</span>
          </div>
        </div>

      </main>
  );
}
