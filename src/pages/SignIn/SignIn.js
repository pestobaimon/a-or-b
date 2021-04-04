import React from "react";
import styles from "./SignIn.module.css";

const SignIn = ({signInWithFacebook, user}) => {
  console.log(user);
  return (
    <div className={styles.signIn}>
      {user ? (
        "signed in"
      ) : (
        <button className={styles.button} onClick={signInWithFacebook}>
          Sign in With Facebook
        </button>
      )}
    </div>
  );
};

export default SignIn;
