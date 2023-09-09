"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { AiFillDribbbleSquare, AiOutlineReload } from "react-icons/ai";
import { FaChartArea, FaInbox } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { VscListSelection } from "react-icons/vsc";
import Chat from "../components/Chat/page";
import Details from "../components/Details/page";

function Conversations() {
  const [chatData, setChatData] = useState({});
  useEffect(() => {
    const ws = new WebSocket("wss://expressjs-production-623d.up.railway.app"); // Replace with your server's URL and port

    ws.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
      // Send data to the server when the connection is established
      // For example:
      // ws.send('Hello, server!');
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
          <div className={`${styles.chat} ${styles.primary}`}>
            <div className={styles.top}>
              <input type="checkbox" name="" id="" />
              <div className={styles.title}>Amit RG</div>
              <div className={styles.time}>10m</div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.messageHead}>Awesome Product</div>
              <div className={styles.messageBody}>
                Lorem ipsum dolor sit amet consectetur adipisi...
              </div>
            </div>
          </div>
          <div className={styles.chat}>
            <div className={styles.top}>
              <input type="checkbox" name="" id="" />
              <div className={styles.title}>Hiten Saxena</div>
              <div className={styles.time}>10m</div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.messageHead}>Available in store</div>
              <div className={styles.messageBody}>
                Hi, do you have any in stock....
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.third}>
        <Chat chatData={chatData} />
      </div>

      <div className={styles.fourth}>
        <Details />
      </div>
    </div>
  );
}

export default Conversations;
