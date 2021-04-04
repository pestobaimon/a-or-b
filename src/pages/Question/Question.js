import React, { useEffect, useState, useContext } from "react";
import AskedCard from "../../components/modules/AskedCard/AskedCard";
import QuestionCard from "../../components/modules/QuestionCard/QuestionCard";
import styles from "./Question.module.css";
import firebase from "../../Firebase";
import { UserContext } from "../../context";

const Question = () => {
    const [questionArray, setQuestionArray] = useState(null);
    const db = firebase.firestore();
    const { user, room } = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = db
            .collection(`questions`)
            .where("roomRef", "==", room.id)
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
                    console.log("questionsnot found");
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
            <div className={styles.title}>You are asking as {user.name}</div>
            <QuestionCard />
            {questionArray === null ? (
                <div className={styles.loading}>Loading</div>
            ) : (
                questionArray.map((q, i) => <AskedCard key={i} q={q} />)
            )}
        </div>
    );
};

export default Question;
