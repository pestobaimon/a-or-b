import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router";
import {UserContext} from "../../../context";
import styles from "./RoomCard.module.css";

const RoomCard = ({roomObj, setRoom}) => {
  const history = useHistory();
  const {room} = useContext(UserContext);

  const handleClick = async () => {
    await setRoom(roomObj);
  };

  useEffect(() => {
    if (room != null) history.push(`/user-select`);
  }, [room]);
  return (
    <div onClick={handleClick} className={styles.roomCard}>
      <div className={styles.container}>
        <h1>{roomObj.id.toUpperCase()}</h1>
      </div>
    </div>
  );
};

export default RoomCard;
