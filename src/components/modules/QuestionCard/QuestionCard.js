import React, {useState, useContext, useEffect} from "react";
import Input from "../../elements/Input/Input";
import SubmitButton from "../../elements/SubmitButton/SubmitButton";
import styles from "./QuestionCard.module.css";
import {FirebaseContext} from "../../../Firebase";

import {AuthContext} from "../../../context"

const QuestionCard = ({room}) => {
  const [question, setQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const {db} = useContext(FirebaseContext);

  const {state} = useContext(AuthContext);
  const {user} = state;

  let playerSelf;
  if (room.player1 === user.uid) playerSelf = "1";
  else playerSelf = "2";

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
      askerId: playerSelf,
      player1Ans: "",
      player2Ans: "",
      question: question,
      timeStamp: new Date(),
    };
    console.log(q);
    const res = await db.collection(`rooms/${room.id}/questions`).add(q);
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
        {isTyping ? <Input submitAction={submitAction} setInput={setQuestion} /> : null}
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
