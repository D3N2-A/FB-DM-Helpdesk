"use client";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import { timeConverter } from "../../../../Utils/validation";

function Chat({ chatData }) {
  useEffect(() => {
    console.log(chatData);
  }, [chatData]);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Amit RG</h1>
      </div>
      <div className={styles.bottom}>
        {chatData &&
          chatData?.entry?.length > 0 &&
          chatData?.entry.map((message, index) => {
            return (
              <div className={styles.message}>
                <div className={styles.photo}>
                  <img src="avatar.png" />
                </div>
                <div className={styles.content}>
                  <div className={styles.text}>
                    {message?.messaging[index]?.message?.text}
                  </div>
                  <div className={styles.time}>
                    {" "}
                    {message?.messaging[index]?.message?.mid}{" "}
                    {timeConverter(message?.messaging[index]?.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}
        {Object.keys(chatData).length == 0 && <div>No Conversations</div>}
      </div>
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
