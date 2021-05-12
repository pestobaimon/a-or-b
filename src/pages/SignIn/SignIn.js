import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import styles from "./SignIn.module.css";

//firebase
import {FirebaseContext} from "../../Firebase";

//auth
import {AuthContext} from "../../context";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const {state, dispatch} = useContext(AuthContext);
  const {user} = state;

  const history = useHistory();

  const signInHandler = async () => {
    setLoading(true);
    const result = await firebase.signInWithFacebook();
    await setTimeout(()=>null, 1000);
    const userInDb = await firebase.db.doc(`users/${result.user.uid}`).get();
    if (result && userInDb.exists) {
      const newUser = {...result.user, ...userInDb.data()};
      return dispatch({
        type: "SIGNIN",
        payload: newUser,
      });
    }else{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) history.push("/");
  }, [user]);

  return (
    <div className={styles.signIn}>
      {user ? (
        "signed in"
      ) : (
        <>
          {loading ? (
            <div>loading</div>
          ) : (
            <button className={styles.button} onClick={signInHandler}>
              Sign in With Facebook
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SignIn;
