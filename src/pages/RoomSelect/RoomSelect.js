import React, {useEffect, useContext, useState} from "react";
import {useHistory} from "react-router";
import RoomCard from "../../components/modules/RoomCard/RoomCard";
import RoomSearch from "../../components/modules/RoomSearch/RoomSearch";
import {AuthContext} from "../../context";
import {FirebaseContext} from "../../Firebase";

import styles from "./RoomSelect.module.css";

const RoomSelect = (props) => {
  const [rooms, setRooms] = useState(null);
  const [createRoomLoading, setCreateRoomLoading] = useState(false);
  const {db, functions} = useContext(FirebaseContext);
  const {state} = useContext(AuthContext);
  const {user} = state;

  // const history = useHistory();

  const fetchRooms = async () => {
    const cfInstance = functions.httpsCallable("requestJoinedRooms");
    try {
      const res = await cfInstance({uid: user.uid});
      const {rooms, success, msg} = res.data;
      console.log(msg);
      if (success) setRooms(rooms);
    } catch (e) {
      console.log(e);
    }
  };

  const createRoomHandler = async () => {
    setCreateRoomLoading(true);
    const cfInstance = functions.httpsCallable("requestCreateRoom");
    try {
      const res = await cfInstance({uid: user.uid});
      const {success, roomId} = res.data;
      // console.log(msg);
      if(success && roomId.length > 0){
        console.log(`successfully created room ${roomId}`);
        fetchRooms();
      }
    } catch (e) {
      console.log(e);
    }
    setCreateRoomLoading(false);
  };

  useEffect(() => {
    // localStorage.setItem("joinedRooms", JSON.stringify([]));
    fetchRooms();
  }, []);

  return (
    <div className={styles.roomSelect}>
      {rooms ? (
        <>
          <RoomSearch fetchRooms={fetchRooms} />
          Rooms
          {rooms.map((room, key) => (
            <RoomCard key={key} room={room} />
          ))}
          {createRoomLoading ? (
            <div>creating room...</div>
          ) : (
            <div
              className={styles.createRoomCard}
              onClick={createRoomHandler}
              key={0}
            >
              <div className={styles.createRoomCardContainer}>
                <h1>+ create new room</h1>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <h1>loading rooms...</h1>
        </div>
      )}
    </div>
  );
};

export default RoomSelect;
