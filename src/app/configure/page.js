"use client";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import {
  fbLogin,
  getFacebookLoginStatus,
  initFacebookSdk,
} from "../../../Utils/FIrebaseSDK";

function Configure() {
  const handleConnect = async () => {
    initFacebookSdk().then(() => {
      fbLogin().then((response) => {
        console.log(response);
        if (response.status === "connected") {
          console.log("Person is connected");
        } else {
          // something
        }
      });
    });
  };
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Facebook Page Integration</h1>
          {true ? (
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
