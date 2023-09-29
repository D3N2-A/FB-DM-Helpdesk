"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { fbLogin, fbLogout, initFacebookSdk } from "../../../Utils/FIrebaseSDK";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/userAtom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess } from "../../../Utils/theme";

function Configure() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const handleConnect = async () => {
    initFacebookSdk().then(() => {
      fbLogin()
        .then((response) => {
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
            localStorage.setItem("userId", response?.authResponse?.userID);
            localStorage.setItem(
              "userToken",
              response?.authResponse?.accessToken
            );

            setUser({
              authenticated: true,
              userID: response?.authResponse?.userID,
              accessToken: response?.authResponse?.accessToken,
              isLoading: false,
            });
            setIsConnected(true);
            toast.success("Page integrated successfully", toastSuccess);
          } else {
            console.log("Some Error Occured");
          }
        })
        .finally(() => {
          getConversations(user.accessToken, user.userID);
        });
    });
  };

  const handleIntegration = (page) => {
    localStorage.setItem("pageToken", page?.access_token);
    localStorage.setItem("pageId", page?.id);
    router.push("/conversations");
  };
  const deleteIntegration = () => {
    fbLogout();
    setIsConnected(false);
  };

  //---------------------Fetching Pages info---------------------------//
  const [pages, setPages] = useState([]);
  const getConversations = async (
    token = localStorage.getItem("userToken"),
    id = localStorage.getItem("userId")
  ) => {
    try {
      fetch(
        `https://graph.facebook.com/v17.0/${id}/accounts?access_token=${token}`
      )
        .then((res) => {
          if (res.status === 400) {
            deleteIntegration();
          } else {
            res
              .json()
              .then((val) => {
                setPages(val?.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          toast.warn("Some error occured", toastSuccess);
        });
    } catch (error) {
      toast.warn("Tring to Fetch Pages", toastSuccess);
    }
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

              <h1 className={styles.title}>Select page and continue</h1>
              {pages &&
                pages.length > 0 &&
                pages.map((page, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className={styles.btnPrimary}
                        onClick={() => {
                          handleIntegration(page);
                        }}
                      >
                        {page?.name}{" "}
                        <div className={styles.category}>{page?.category}</div>
                      </div>
                    </>
                  );
                })}
            </>
          ) : (
            <div className={styles.btnPrimary} onClick={handleConnect}>
              Connect Account
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}

export default Configure;
