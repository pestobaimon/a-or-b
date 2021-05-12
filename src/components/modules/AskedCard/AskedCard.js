import React, {useState, useContext} from "react";
import Input from "../../elements/Input/Input";
import SubmitButton from "../../elements/SubmitButton/SubmitButton";
import styles from "./AskedCard.module.css";

import MsgBubble from "../../elements/MsgBubble/MsgBubble";
import ProfilePic from "../../elements/ProfilePic/ProfilePic";
import {FirebaseContext} from "../../../Firebase";

import {AuthContext} from "../../../context";

const AskedCard = ({q, room}) => {
  const [yourAnswer, setYourAnswer] = useState("");
  const {db} = useContext(FirebaseContext);
  const bothAnswered = q.player1Ans.length > 0 && q.player2Ans.length > 0;

  const {state} = useContext(AuthContext);
  const {user} = state;
  
  let playerSelf;
  if(room.player1 === user.uid) playerSelf = "1";
  else playerSelf = "2";

  const theirAnswer = playerSelf === "1" ? q.player2Ans : q.player1Ans;
  const yourFinalAnswer = playerSelf === "1" ? q.player1Ans : q.player2Ans;

  const submitAction = async () => {
    const questionRef = db.doc(`rooms/${room.id}/questions/${q.id}`);
    if (playerSelf === "1") {
      await questionRef.update({player1Ans: yourAnswer});
    } else {
      await questionRef.update({player2Ans: yourAnswer});
    }
    setYourAnswer("");
  };

  const inputs =
    yourFinalAnswer === "" ? (
      <>
        <Input placeholder="Add answer" input={yourAnswer} setInput={setYourAnswer} submitAction={submitAction}/>
        <div className={styles.submitButtonContainer}>
          <div className={styles.submitButton}>
            <SubmitButton btnStyle="buttonPrimary" action={submitAction} text="submit" />
          </div>
        </div>
      </>
    ) : (
      <div className={styles.yourAnswerContainer}>
        <MsgBubble isUserMsg={true} msg={yourFinalAnswer} />
        <div className={styles.yourProfilePic}>
          <ProfilePic src={user.profilePic} />
        </div>
      </div>
    );
  

  return (
    <div className={styles.askedCard}>
      <div className={styles.container}>
        <div className={styles.askedBy}>
          {q.askerId === playerSelf ? user.displayName : room.opponent?.displayName} asked:
        </div>
        <div className={styles.question}>{q.question}</div>

        <div className={styles.theirAnswerContainer}>
          <div className={styles.theirProfilePic}>
            <ProfilePic src={room.opponent?.profilePic} />
          </div>
          {bothAnswered ? (
            <MsgBubble isUserMsg={false} msg={theirAnswer} />
          ) : (
            <MsgBubble
              isUserMsg={false}
              msg={theirAnswer === "" ? "not yet answered" : "loremipsum"}
              hidden={theirAnswer !== ""}
            />
          )}
        </div>
        {inputs}
      </div>
    </div>
  );
};

export default AskedCard;
