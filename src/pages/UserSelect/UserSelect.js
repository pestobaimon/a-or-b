import React, { useContext } from "react";
import styles from "./UserSelect.module.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context";

const UserSelect = ({ setUser, setOppositeUser }) => {
    const history = useHistory();
    const { user, room } = useContext(UserContext);
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
        history.push("/ask");
    };

    const loaded =
        user === null ? (
            <>
                <div className={styles.title}>Who are you?</div>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.userSelectButton}
                        onClick={() => handleUserSelect(room.player1, room.player2)}
                    >
                        {room.player1.name}
                    </button>
                    <button
                        className={styles.userSelectButton}
                        onClick={() => handleUserSelect(room.player2, room.player1)}
                    >
                        {room.player2.name}
                    </button>
                </div>
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

export default UserSelect;
