import React, {useState, useContext} from "react";
import Input from "../../elements/Input/Input";
import styles from "./RoomSearch.module.css";

import {FirebaseContext} from "../../../Firebase";

const RoomSearch = ({fetchRooms}) => {
  const [roomIdInput, setRoomIdInput] = useState("");
  const [roomResult, setRoomResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [joining, setJoining] = useState(false);
  const {functions} = useContext(FirebaseContext);

  const searchRoom = async () => {
    setLoading(true);
    setRoomResult(null);
    console.log(roomIdInput);
    const roomId = roomIdInput.toLowerCase();
    const cfInstance = functions.httpsCallable("requestSearchRoom");
    try {
      const res = await cfInstance({roomId: roomId});
      const {success, room, msg} = res.data;
      console.log(msg);
      if (success) {
        if (room.player2.length === 0) {
          setRoomResult(room);
        } else {
          console.log(`room ${roomId} fully occupied`);
          setRoomResult(null);
        }
      } else {
        console.log("room not found");
        setRoomResult(null);
      }
    } catch (e) {
      console.log(e);
      setRoomResult(null);
    }
    setLoading(false);
  };

  const handleJoinClick = async (id) => {
    setJoining(true)
    const cfInstance = functions.httpsCallable("requestJoinRoom");
    try {
      const res = await cfInstance({roomId: id});
      const {success, roomId, msg} = res.data;
      console.log(msg);
      if(success){
        setRoomResult(null);
        await fetchRooms();
      }
    } catch (e){
      console.log(e)
    }
    setJoining(false);
  }

  const handleCloseClick = () => {
    setRoomResult(null);
  }

  return (
    <div>
      <div className={styles.header}>Room Search</div>
      <div className={styles.searchBar}>
        <Input
          setInput={setRoomIdInput}
          input={roomIdInput}
          submitAction={searchRoom}
          placeholder="search by room ID"
          margin={false}
          expandible={false}
        />
        {loading ? (
          <button className={styles.btn} disabled={true}>
            loading
          </button>
        ) : (
          <button className={styles.btn} onClick={searchRoom}>
            search
          </button>
        )}
      </div>
      {roomResult ? (
        <div className={styles.searchResult}>
          <div className={styles.searchResultRoomId}>
            {roomResult.id.toUpperCase()}
          </div>
          <div className={styles.buttonGroup}>
            {joining ? (
              <button disabled={true} className={styles.joinButton}>
                Joining
              </button>
            ) : (
              <button
                onClick={() => handleJoinClick(roomResult.id)}
                className={styles.joinButton}
              >
                Join
              </button>
            )}

            <button onClick={handleCloseClick} className={styles.closeButton}>
              X
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoomSearch;
