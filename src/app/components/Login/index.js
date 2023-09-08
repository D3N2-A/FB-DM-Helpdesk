import React from "react";
import styles from "./login.module.scss";

function Login({ handleLogin, handleChange, credentials }) {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Login to your account</h1>

      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={credentials?.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={credentials?.password}
          onChange={handleChange}
        />
      </div>

      <div className={styles.btnPrimary} onClick={handleLogin}>
        Login
      </div>
    </div>
  );
}

export default Login;
