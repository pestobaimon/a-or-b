import React, {useContext, useState} from "react";
import styles from "./NameSelect.module.css";
import {useHistory} from "react-router-dom";
import Input from "../../components/elements/Input/Input";

const NameSelect = ({setUser, setOppositeUser}) => {
  const history = useHistory();
  // const {user, room, name, setName} = useContext(UserContext);
  const user = {};
  const room = {};
  const name = {};
  const setName = {};
  const handleUserSelect = (userObj, oppositeUserObj) => {
    console.log(userObj);
    console.log(oppositeUserObj);
    console.log(room);
    setUser(userObj);
    setOppositeUser(oppositeUserObj);
  };

  const handleReselect = () => {
    setUser(null);
  };
  const handleContinue = () => {
    history.push("/room");
  };

  const handleNameChange = () => {
    //do smth
  };

  const loaded =
    name === "" ? (
      <>
        <div className={styles.title}>Enter your name</div>
        <Input submitAction={handleNameChange} input={name} setInput={setName} placeHolder={""} />
      </>
    ) : (
      <>
        <div className={styles.title}>You are playing as {user.name}</div>
        <div className={styles.buttonGroupContinue}>
          <button className={styles.userSelectButton} onClick={() => handleContinue()}>
            Continue
          </button>
          <button className={styles.userSelectButton} onClick={() => handleReselect()}>
            Reselect
          </button>
        </div>
      </>
    );

  const loading = room === null;
  return (
    <div className={styles.home}>
      {loading ? <div className={styles.loading}>Loading</div> : loaded}
    </div>
  );
};

export default NameSelect;
