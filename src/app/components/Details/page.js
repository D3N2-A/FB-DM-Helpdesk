import React from "react";
import styles from "./page.module.scss";
import { SlCallEnd } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";

function Details() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.photo}>
          <img src="avatar.png" alt="" />
        </div>
        <div className={styles.status}>
          <h1>Amit RG</h1>
          <p>online</p>
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
          <div className={styles.info}>
            <h1>Email</h1>
            <p>amit@gmail.com</p>
          </div>
          <div className={styles.info}>
            <h1>First Name</h1>
            <p>Amit</p>
          </div>
          <div className={styles.info}>
            <h1>Last Name</h1>
            <p>RG</p>
          </div>
          <p>View more details</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
