import React from "react";
import styles from "./page.module.scss";

function Chat() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Amir RG</h1>
      </div>
      <div className={styles.bottom}></div>
      <input
        type="text"
        name="message"
        id="message"
        placeholder={`Message Hiten Saxena`}
      />
    </div>
  );
}

export default Chat;
