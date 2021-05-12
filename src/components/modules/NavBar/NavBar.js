import React from "react";
import styles from "./NavBar.module.css";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={goBack}>
        Back
      </button>
      <button className={styles.btn}>Profile</button>
    </div>
  );
};

export default NavBar;
