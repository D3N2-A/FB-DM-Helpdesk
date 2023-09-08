"use client";
import React from "react";
import styles from "./page.module.scss";

function Configure() {
  const handleConnect = async () => {
    console.log("Hello");
  };
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Facebook Page Integration</h1>
          {!true ? (
            <div className={styles.btnPrimary} onClick={handleConnect}>
              Connect Page
            </div>
          ) : (
            <>
              <div className={styles.btnDanger}>Delete Integration</div>
              <div className={styles.btnPrimary}>Reply To Message</div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Configure;
