"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { EMAIL_REGEX } from "../../Utils/validation";
import { auth, db } from "../../connectors/firebase";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import styles from "./page.module.scss";
import {
  getFacebookLoginStatus,
  initFacebookSdk,
  loadFacebookSDK,
} from "../../Utils/FIrebaseSDK";
import { doc, setDoc } from "firebase/firestore";

export default function Home() {
  const [tab, setTab] = useState("login");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const authRef = auth;

  useEffect(() => {
    loadFacebookSDK();
    localStorage.setItem(
      "person",
      JSON.stringify({ status: "", accessToken: "" })
    );
  }, []);

  useEffect(() => {
    authRef.onAuthStateChanged((user) => {
      if (user) {
        router.push("/configure");
      } else {
        return;
      }
    });
  }, [authRef]);

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
        let data = {
          name: credentials?.name,
          email: user?.email,
          emailVerified: user?.emailVerified,
          createdAt: user?.metadata?.creationTime,
        };
        setDoc(doc(db, "users", user?.uid), data);
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
      <RecoilRoot>
        {" "}
        <div className={styles.container}>
          {tab === "login" ? (
            <Login
              credentials={credentials}
              setCredentials={setCredentials}
              handleChange={handleChage}
              setError={setError}
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
      </RecoilRoot>
    </main>
  );
}
