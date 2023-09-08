import React from "react";
import styles from "../Login/login.module.scss";

function SignUp({ credentials, handleSignUp, handleChange }) {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Create Account</h1>

      <div className={styles.inputGroup}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={credentials.name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={credentials.email}
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

      <div className={styles.btnPrimary} onClick={handleSignUp}>Sign Up</div>
    </div>
  );
}

export default SignUp;
