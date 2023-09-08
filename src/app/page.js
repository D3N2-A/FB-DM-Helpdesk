"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { EMAIL_REGEX } from "../../Utils/validation";
import { auth } from "../../connectors/firebase";

export default function Home() {
  const [tab, setTab] = useState("login");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  /**
   * @async
   * @function handleLogin
   * @returns void
   */
  const handleLogin = async () => {
    setError("");
    if (!EMAIL_REGEX.test(credentials.email.trim())) {
      setError("Invalid Email");
      return;
    }
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleSignUp = async () => {
    setError("");
    if (!EMAIL_REGEX.test(credentials.email.trim())) {
      setError("Invalid Email");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      credentials?.email,
      credentials?.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleChage = (e) => {
    setCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {tab === "login" ? (
          <Login
            handleLogin={handleLogin}
            credentials={credentials}
            setCredentials={setCredentials}
            handleChange={handleChage}
          />
        ) : (
          <SignUp
            handleSignUp={handleSignUp}
            credentials={credentials}
            setCredentials={setCredentials}
            handleChange={handleChage}
          />
        )}

        {error && error?.length > 0 && (
          <div className={styles.error}>{error}</div>
        )}

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
