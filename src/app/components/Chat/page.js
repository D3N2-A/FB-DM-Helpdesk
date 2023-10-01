"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { UTCTime, timeConverter } from "../../../../Utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastSuccess } from "../../../../Utils/theme";

function Chat({ chatData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pageToken, setPageToken] = useState("");

  useEffect(() => {
    const pageToken = localStorage.getItem("pageToken");
    setPageToken(pageToken);
    fetchMessages(chatData?.id, pageToken);
  }, [chatData]);

  //----------------------Message Handeling-------------------------//

  const [messageData, setMessageData] = useState([]);

  //Get Messages from A conversation
  const fetchMessages = async (messageId, pageToken) => {
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

  //------------------------------------------Sequencially fetching messages--------------------------//
  const getMessageSeq = async (messagesArray, pageToken) => {
    setIsLoading(true);
    for (const message of messagesArray) {
      await makeAPICall(message.id, pageToken);
    }

    setIsLoading(false);
  };

  //-----------------------------Using MessageId get message Info----------------------------------//
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

  //----------------------------Response Handelling----------------------------------------------//
  const [response, setResponse] = useState("");
  const sendMessage = async (recieverId, pageId, pageToken) => {
    fetch(
      `https://graph.facebook.com/v18.0/${pageId}/messages?recipient={'id':${recieverId}}&messaging_type=RESPONSE&message={'text':${response}}access_token=${pageToken}`,
      { method: "POST" }
    )
      .then((res) => {
        if (res.ok) {
          setResponse("");
          toast.success("Message Sent", toastSuccess);
        }
        if (res.status === 400) {
          res.json().then((val) => {
            toast.error(`${val.error.message}`, toastSuccess);
          });
          setResponse("");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

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
                  <div
                    className={`${styles.message} ${
                      message.from.name !==
                        chatData?.participants?.data[0]?.name && styles.op
                    }`}
                    key={index}
                  >
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
          value={response}
          onChange={(e) => {
            setResponse(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const pageId = localStorage.getItem("pageID");
              sendMessage(
                chatData?.participants?.data[0]?.id,
                pageId,
                pageToken
              );
            }
          }}
          placeholder={`Message ${
            chatData?.participants?.data[0]?.name ?? " "
          }`}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default Chat;
