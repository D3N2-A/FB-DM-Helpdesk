"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { fbLogin, fbLogout, initFacebookSdk } from "../../../Utils/FIrebaseSDK";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/userAtom";

function Configure() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const handleConnect = async () => {
    initFacebookSdk().then(() => {
      fbLogin().then((response) => {
        console.log(response);
        if (response.status === "connected") {
          console.log("Person is connected");
          localStorage.setItem(
            "user",
            JSON.stringify({
              status: "connected",
              accessToken: response?.authResponse?.accessToken,
              userID: response?.authResponse?.userID,
            })
          );

          setUser({
            authenticated: true,
            userID: response?.authResponse?.accessToken,
            accessToken: response?.authResponse?.accessToken,
            isLoading: false,
          });
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
    fbLogout();
    setIsConnected(false);
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
