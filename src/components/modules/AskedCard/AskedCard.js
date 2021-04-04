import React, {useState, useContext} from "react";
import {UserContext} from "../../../context";
import Input from "../../elements/Input/Input";
import SubmitButton from "../../elements/SubmitButton/SubmitButton";
import styles from "./AskedCard.module.css";

import MsgBubble from "../../elements/MsgBubble/MsgBubble";
import ProfilePic from "../../elements/ProfilePic/ProfilePic";
import {FirebaseContext} from "../../../Firebase";

const AskedCard = ({q}) => {
  const [yourAnswer, setYourAnswer] = useState("");
  const {user, oppositeUser, room} = useContext(UserContext);
  const {db} = useContext(FirebaseContext);
  const bothAnswered = q.player1Ans.length > 0 && q.player2Ans.length > 0;
  const theirAnswer = user.id === "1" ? q.player2Ans : q.player1Ans;
  const yourFinalAnswer = user.id === "1" ? q.player1Ans : q.player2Ans;

  const submitAction = async () => {
    const questionRef = db.collection("questions").doc(q.id);
    if (user.id === "1") {
      await questionRef.update({player1Ans: yourAnswer});
    } else {
      await questionRef.update({player2Ans: yourAnswer});
    }
  };

  const inputs =
    yourFinalAnswer === "" ? (
      <>
        <Input
          placeholder="Add answer"
          input={yourAnswer}
          setInput={setYourAnswer}
        />
        <div className={styles.submitButtonContainer}>
          <div className={styles.submitButton}>
            <SubmitButton
              btnStyle="buttonPrimary"
              action={submitAction}
              text="submit"
            />
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
          {q.askerId === "1" ? room.player1.name : room.player2.name} asked:
        </div>
        <div className={styles.question}>{q.question}</div>

        <div className={styles.theirAnswerContainer}>
          <div className={styles.theirProfilePic}>
            <ProfilePic src={oppositeUser.profilePic} />
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
