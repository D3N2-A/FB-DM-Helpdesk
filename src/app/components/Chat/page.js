"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { UTCTime, timeConverter } from "../../../../Utils/validation";

function Chat({ chatData }) {
  const [isLoading, setIsLoading] = useState(false);
  const pageToken = localStorage.getItem("pageToken");
  useEffect(() => {
    fetchMessages(chatData?.id, pageToken);
  }, [chatData]);

  //----------------------Message Handeling-------------------------//

  const [messageData, setMessageData] = useState([]);

  //Get Messages from A conversation
  const fetchMessages = async (messageId, pageToken) => {
    setIsLoading(true);
    fetch(
      `https://graph.facebook.com/v17.0/${messageId}?fields=messages&access_token=${pageToken}`
    )
      .then((res) => {
        if (res.status === 200) {
          res.json().then((val) => {
            const messagesArray = val?.messages?.data;
            getMessageSeq(messagesArray, pageToken);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMessageSeq = async (messagesArray, pageToken) => {
    for (const message of messagesArray) {
      await makeAPICall(message.id, pageToken);
    }

    setIsLoading(false);
    console.log(messageData);
  };

  async function makeAPICall(messageId, pageToken) {
    const apiUrl = `https://graph.facebook.com/v17.0/${messageId}?fields=id,created_time,from,to,message&access_token=${pageToken}`;
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        response
          .json()
          .then((val) => {
            setMessageData((prev) => {
              return [...prev, val];
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.error(`API call failed for object with ID ${object.id}`);
      }
    } catch (error) {
      console.error(
        `Error while making API call for object with ID ${object.id}: ${error}`
      );
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1>
            {chatData
              ? chatData?.participants?.data[0]?.name
              : "Select a conversation"}
          </h1>
        </div>
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <span className={styles.loader}></span>
          </div>
        ) : (
          <div className={styles.bottom}>
            {messageData &&
              messageData?.length > 0 &&
              messageData.map((message, index) => {
                return (
                  <div className={styles.message} key={index}>
                    <div className={styles.photo}>
                      <img src="avatar.png" />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.text}>{message?.message}</div>
                      <div className={styles.time}>
                        {" "}
                        {UTCTime(message?.created_time)}
                      </div>
                    </div>
                  </div>
                );
              })}
            {Object?.keys(chatData || {}).length == 0 && (
              <div>No Conversations Selected</div>
            )}
          </div>
        )}
        <input
          type="text"
          name="message"
          id="message"
          placeholder={`Message ${
            chatData?.participants?.data[0]?.name ?? " "
          }`}
        />
      </div>
    </>
  );
}

export default Chat;
