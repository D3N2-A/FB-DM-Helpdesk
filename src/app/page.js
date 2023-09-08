"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

export default function Home() {
  const [tab, setTab] = useState("login");
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {tab === "login" ? <Login /> : <SignUp />}

        {tab === "login" ? (
          <div className={styles.footer}>
            New to HelpDesk?{" "}
            <div
              className={styles.link}
              onClick={() => {
                setTab("signup");
              }}
            >
              Sign Up
            </div>
          </div>
        ) : (
          <div className={styles.footer}>
            Already have an account?{" "}
            <div
              className={styles.link}
              onClick={() => {
                setTab("login");
              }}
            >
              Login
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
