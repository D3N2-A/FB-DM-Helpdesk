"use client";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import { SlCallEnd } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { userState } from "../../../../store/userAtom";

function Details({ chatData }) {
  // useEffect(() => {
  //   const pageToken = localStorage.getItem("pageToken");
  //   fetchUserDetails(chatData?.participants?.data[0]?.id, pageToken);
  // }, [chatData]);

  const fetchUserDetails = async (userId, pageToken) => {
    fetch(
      `https://graph.facebook.com/v18.0/${userId}/picture?access_token=${pageToken}`
    )
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.photo}>
          <img src="avatar.png" alt="" />
        </div>
        <div className={styles.status}>
          <h1>{chatData?.participants?.data[0]?.name ?? " "}</h1>
          <p>
            {chatData && chatData.hasOwnProperty("participants")
              ? "online"
              : "Select a conversation"}
          </p>
        </div>

        <div className={styles.actions}>
          <div className={styles.action}>
            <SlCallEnd />
            <p>Call</p>
          </div>
          <div className={styles.action}>
            <FaUserCircle />
            <p>Profile</p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.card}>
          <h1>Customer Details</h1>

          {chatData && chatData?.hasOwnProperty("participants") ? (
            <React.Fragment>
              <div className={styles.info}>
                <h1>Email</h1>
                <p>{chatData?.participants?.data[0]?.email}</p>
              </div>
              <div className={styles.info}>
                <h1>First Name</h1>
                <p>{chatData?.participants?.data[0]?.name.split(" ")[0]}</p>
              </div>
              <div className={styles.info}>
                <h1>Last Name</h1>
                <p>{chatData?.participants?.data[0]?.name.split(" ")[1]}</p>
              </div>
              <p
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/profile.php?id=${chatData?.participants?.data[0]?.id}`,
                    "_blank"
                  );
                }}
              >
                View more details
              </p>
            </React.Fragment>
          ) : (
            <div className={styles.info}>
              <h1>Select A Conversation</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
