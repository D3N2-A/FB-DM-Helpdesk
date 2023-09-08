"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { fbLogin, initFacebookSdk } from "../../../Utils/FIrebaseSDK";
import { useRouter } from "next/navigation";

function Configure() {
  const router = useRouter();
  let person = JSON.parse(localStorage.getItem("person"));
  const [isConnected, setIsConnected] = useState(false);
  const handleConnect = async () => {
    initFacebookSdk().then(() => {
      fbLogin().then((response) => {
        console.log(response);
        if (response.status === "connected") {
          console.log("Person is connected");
          localStorage.setItem(
            "person",
            JSON.stringify({
              status: "connected",
              accessToken: response?.authResponse?.accessToken,
              userID: response?.authResponse?.userID,
            })
          );
          setIsConnected(true);
        } else {
          console.log("Some Error Occured");
        }
      });
    });
  };

  const handleIntegration = () => {
    router.push("/conversations");
  };
  const deleteIntegration = () => {
    console.log("Hello");
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Facebook Page Integration</h1>
          {isConnected ? (
            <>
              <div className={styles.btnDanger} onClick={deleteIntegration}>
                Delete Integration
              </div>
              <div className={styles.btnPrimary} onClick={handleIntegration}>
                Reply To Messages
              </div>
            </>
          ) : (
            <div className={styles.btnPrimary} onClick={handleConnect}>
              Connect Account
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Configure;
