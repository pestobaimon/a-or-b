import React, {useEffect, useContext, useState} from "react";
import {useHistory} from "react-router";
import RoomCard from "../../components/modules/RoomCard/RoomCard";
import {UserContext} from "../../context";
import {FirebaseContext} from "../../Firebase";

import styles from "./RoomSelect.module.css";

const RoomSelect = ({setRoom, savedRooms, setSavedRooms}) => {
  const [loading, setLoading] = useState(false);
  const {db, functions} = useContext(FirebaseContext);
  const {room, user} = useContext(UserContext);
  const history = useHistory();
  console.log(savedRooms);
  //   const goToUserSelect = () => {
  //     history.push("/user-select");
  //   };

  //   const fetchRoomDev = async () => {
  //     const roomId = "5A2E8";
  //     const roomRef = db.collection("rooms").doc(roomId);
  //     const doc = await roomRef.get();

  //     if (!doc.exists) {
  //       console.log("No such room!");
  //     } else {
  //       setRoom(doc.data());
  //     }
  //   };

  const fetchRooms = async (rooms) => {
    console.log(rooms);
    const roomIds = rooms.map((room) => room.roomId);
    if (rooms.length > 0) {
      const docs = await db
        .collection("rooms")
        .where("id", "in", roomIds)
        .get();

      const docRooms = [];
      docs.forEach((doc) => {
        docRooms.push(doc.data());
      });
      setSavedRooms(docRooms);
    } else {
      setSavedRooms([]);
    }
  };

  const getLocalRooms = () => JSON.parse(localStorage.getItem("joinedRooms"));
  const setLocalRooms = (rooms) =>
    localStorage.setItem("joinedRooms", JSON.stringify(rooms));
  const addLocalRooms = (room) => {
    const prevRooms = getLocalRooms();
    setLocalRooms([...prevRooms, room]);
  };

  const createRoomHandler = async () => {
    setLoading(true);
    const cfInstance = functions.httpsCallable("requestNewRoom");
    try {
      const res = await cfInstance({uid: user.uid});
      const {room} = res.data;
      addLocalRooms({roomId: room.id});
      updateLocalRooms();
      setRoom(room);
    } catch (e) {
      console.log(e);
    }
  };

  const updateLocalRooms = () => {
    const localRooms = getLocalRooms();
    console.log(localRooms);
    fetchRooms(localRooms);
  };

  useEffect(() => {
    // localStorage.setItem("joinedRooms", JSON.stringify([]));
    updateLocalRooms();
    if (room != null) {
      setLoading(false);
      history.push("/user-select");
    }
  }, [room]);

  return (
    <div className={styles.roomSelect}>
      {loading ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <>
          Rooms
          {savedRooms === null ? (
            <div className={styles.loading}>Loading Rooms</div>
          ) : (
            [
              <div
                className={styles.createRoomCard}
                onClick={createRoomHandler}
                key={0}
              >
                <div className={styles.createRoomCardContainer}>
                  <h1>+ create new room</h1>
                </div>
              </div>,
              savedRooms.map((roomObj, id) => (
                <RoomCard setRoom={setRoom} key={id + 1} roomObj={roomObj} />
              )),
            ]
          )}
        </>
      )}
    </div>
  );
};

export default RoomSelect;
