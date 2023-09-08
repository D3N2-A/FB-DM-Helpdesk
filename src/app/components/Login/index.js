import React from "react";
import styles from "./login.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../connectors/firebase";
import { userState } from "../../../../store/userAtom";
import { useRecoilState } from "recoil";
import { EMAIL_REGEX } from "../../../../Utils/validation";

function Login({ setError, handleChange, credentials }) {
  const [user, setUser] = useRecoilState(userState);
  const handleLogin = async () => {
    setError("");
    if (!EMAIL_REGEX.test(credentials.email.trim())) {
      setError("Invalid Email");
      return;
    }
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser({
          authenticated: true,
          isLoading: false,
          displayName: user?.displayName,
          email: user?.email,
          photoUrl: user.photoURL,
          uid: user?.uid,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
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
