import React from "react";
import styles from "./page.module.scss";
import { AiFillDribbbleSquare } from "react-icons/ai";
import { FaChartArea, FaInbox } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

function Conversations() {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <div>
          <AiFillDribbbleSquare size={40} />
        </div>
        <div className={styles.iconPrimary}>
          <FaInbox size={30} color="" />
        </div>
        <div className={styles.icon}>
          <BsPeopleFill size={25} />
        </div>
        <div className={styles.icon}>
          <FaChartArea size={25} />
        </div>
      </div>
    </div>
  );
}

export default Conversations;
