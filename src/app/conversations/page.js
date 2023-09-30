"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { AiFillDribbbleSquare, AiOutlineReload } from "react-icons/ai";
import { FaChartArea, FaInbox } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { VscListSelection } from "react-icons/vsc";
import Chat from "../components/Chat/page";
import Details from "../components/Details/page";
import { getFacebookLoginStatus } from "../../../Utils/FIrebaseSDK";

function Conversations() {
  const [chatData, setChatData] = useState({});
  const pageID = localStorage.getItem("pageID");
  const pageToken = localStorage.getItem("pageToken");
  useEffect(() => {
    fetchConversations(pageID, pageToken);
  }, []);

  //----------------------Conversations------------------------------//
  const [conversations, setConversations] = useState([]);
  const fetchConversations = async (pageID, pageToken) => {
    fetch(
      `https://graph.facebook.com/v17.0/${pageID}/conversations?fields=participants&platform=MESSENGER&access_token=${pageToken}`
    )
      .then((res) => {
        if (res.status === 200) {
          res.json().then((val) => {
            setConversations(val.data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const ws = new WebSocket("wss://expressjs-production-623d.up.railway.app");

    ws.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:");
    });

    ws.addEventListener("message", (event) => {
      console.log("Received message from server:", JSON.parse(event.data));
      setChatData(JSON.parse(event.data));
    });
    ws.addEventListener("close", () => {
      console.log("connection closed");
    });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <div>
          <AiFillDribbbleSquare color="white" size={40} />
        </div>
        <div className={styles.iconPrimary}>
          <FaInbox size={30} color="" />
        </div>
        <div className={styles.icon}>
          <BsPeopleFill size={25} color="white" />
        </div>
        <div className={styles.icon}>
          <FaChartArea size={25} color="white" />
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.heading}>
          <VscListSelection color="#b1b1b1" />
          <h1>Conversations</h1>
          <AiOutlineReload color="#686868" className={styles.last} />
        </div>

        <div className={styles.chatContainer}>
          {conversations &&
            conversations.map((chat, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.chat} ${styles.primary}`}
                  onClick={() => {
                    setChatData(chat);
                  }}
                >
                  <div className={styles.top}>
                    <input type="checkbox" name="" id="" />
                    <div className={styles.title}>
                      {chat?.participants?.data[0]?.name}
                    </div>
                    <div className={styles.time}>10m</div>
                  </div>
                  <div className={styles.bottom}>
                    <div className={styles.messageHead}>Awesome Product</div>
                    <div className={styles.messageBody}>id:{chat?.id}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className={styles.third}>
        <Chat chatData={chatData} />
      </div>

      <div className={styles.fourth}>
        <Details chatData={chatData} />
      </div>
    </div>
  );
}

export default Conversations;
