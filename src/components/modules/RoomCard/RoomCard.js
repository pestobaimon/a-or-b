import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router";
import styles from "./RoomCard.module.css";

const RoomCard = ({room}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/room?id=${room.id}`);
  };

  return (
    <div onClick={handleClick} className={styles.roomCard}>
      <div className={styles.container}>
        <h1>{room.id.toUpperCase()}</h1>
      </div>
    </div>
  );
};

export default RoomCard;
