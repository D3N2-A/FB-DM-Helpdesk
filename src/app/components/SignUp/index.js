import React from "react";
import styles from "../Login/login.module.scss";

function SignUp() {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Create Account</h1>

      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input type="text" name="name" id="name" />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input type="email" name="email" id="email" />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input type="password" name="password" id="password" />
      </div>

      <div className={styles.btnPrimary}>Login</div>
    </div>
  );
}

export default SignUp;
