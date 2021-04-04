import React, { useEffect } from "react";
import { useHistory } from "react-router";
import firebase from "../../Firebase";
import styles from "./RoomSelect.module.css";

const RoomSelect = ({ setRoom, room }) => {
    const db = firebase.firestore();
    const history = useHistory();

    const goToUserSelect = () => {
        history.push("/user-select");
    };

    const fetchRoom = async () => {
        const roomId = "5A2E8";
        const roomRef = db.collection("rooms").doc(roomId);
        const doc = await roomRef.get();

        if (!doc.exists) {
            console.log("No such room!");
        } else {
            setRoom(doc.data());
        }
    };

    useEffect(() => {
        fetchRoom();
    }, []);

    return (
        <div className={styles.roomSelect}>
            {room === null ? (
                "loading Room"
            ) : (
                <>
                    <div className={styles.title}>{`room loaded: ${room.id}`} </div>
                    <button className={styles.continueButton} onClick={goToUserSelect}>
                        go to user select
                    </button>
                </>
            )}
        </div>
    );
};

export default RoomSelect;
