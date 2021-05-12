import React, {useEffect, useState, useContext} from "react";
import {useHistory} from "react-router";
import AskedCard from "../../components/modules/AskedCard/AskedCard";
import QuestionCard from "../../components/modules/QuestionCard/QuestionCard";
import styles from "./Room.module.css";
import {FirebaseContext} from "../../Firebase";

import queryString from "query-string";

import {AuthContext} from "../../context";

const Room = (props) => {
  const {db, functions} = useContext(FirebaseContext);

  const [questionArray, setQuestionArray] = useState(null);
  const [roomData, setRoomData] = useState(null);

  const {state} = useContext(AuthContext);
  const {user} = state;

  const history = useHistory();

  const parsed = queryString.parse(props.location.search);

  let roomId = "";

  if (parsed.id) {
    roomId = parsed.id;
  } else {
    history.push("/");
  }

  const fetchRoom = async () => {
    const cfInstance = functions.httpsCallable("requestRoomData");
    try {
      const res = await cfInstance({roomId: roomId});
      const {success, roomData, msg} = res.data;
      console.log(msg);
      if (success && roomData) {
        setRoomData(roomData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRoom();
    const unsubscribe = db
      .collection(`rooms/${roomId}/questions`)
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          const questions = snapshot.docs.map((doc) => {
            const item = doc.data();
            item["id"] = doc.id;
            return item;
          });
          console.log(questions);
          setQuestionArray(questions);
        } else {
          console.log("questions not found");
          setQuestionArray([]);
        }
      });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.chatContainer}>
      {roomData ? (
        <>
          {roomData.opponent ? (
            <>
              <div className={styles.title}>
                You are asking as {user.displayName}
              </div>
              <QuestionCard room={roomData} />
              {questionArray === null ? (
                <div className={styles.loading}>Loading</div>
              ) : (
                questionArray.map((q, i) => (
                  <AskedCard key={i} q={q} room={roomData} />
                ))
              )}
            </>
          ) : (
            <div className={styles.notJoinedMsg}>
              The other user has not joined yet. Send the room code{" "}
              {roomData.id} to your friend and tell them to join RIGHT NOW.
            </div>
          )}
        </>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default Room;
