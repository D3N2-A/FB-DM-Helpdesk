"use client";
import Image from "next/image";
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
      </div>
    </main>
  );
}
