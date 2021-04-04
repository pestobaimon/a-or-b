import React, {useState, useContext, useEffect} from "react";
import Input from "../../elements/Input/Input";
import SubmitButton from "../../elements/SubmitButton/SubmitButton";
import styles from "./QuestionCard.module.css";

import {UserContext} from "../../../context";
import {FirebaseContext} from "../../../Firebase";

const QuestionCard = () => {
  const [question, setQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const {user, room} = useContext(UserContext);
  const {db} = useContext(FirebaseContext);

  const fetchPremadeQuestion = async () => {
    const randomId = Math.round(Math.random() * 5).toString();
    const premadeQuestionRef = db.collection("premadeQuestions").doc(randomId);
    const doc = await premadeQuestionRef.get();
    if (!doc.exists) {
      console.log(`No such document! : ${randomId}}`);
    } else {
      setQuestion(doc.data().question);
    }
  };

  useEffect(() => {
    fetchPremadeQuestion();
  }, []);

  const submitAction = async () => {
    const q = {
      askerId: user.id,
      player1Ans: "",
      player2Ans: "",
      question: question,
      roomRef: room.id,
      timeStamp: new Date(),
    };
    console.log(q);
    const res = await db.collection("questions").add(q);
    console.log(res);
  };

  const getNewQuestion = () => {
    fetchPremadeQuestion();
    setIsTyping(false);
  };

  const typeQuestion = (async) => {
    setQuestion("");
    setIsTyping(true);
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          {isTyping ? null : <div className={styles.title}>{question}</div>}
          <button className={styles.randomButton} onClick={getNewQuestion}>
            Get a new question
          </button>
        </div>
        {isTyping ? (
          <Input submitAction={submitAction} setInput={setQuestion} />
        ) : null}
        <SubmitButton
          btnStyle="buttonQuestion"
          border={true}
          action={submitAction}
          text="Send question"
        />
        {isTyping ? null : (
          <SubmitButton
            btnStyle="buttonQuestion"
            border={false}
            action={typeQuestion}
            text="Type your own question"
          />
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
