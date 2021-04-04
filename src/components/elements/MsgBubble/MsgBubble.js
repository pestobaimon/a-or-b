import React from "react";
import styles from "./MsgBubble.module.css";
import cx from "classnames";

const MsgBubble = ({ isUserMsg, msg, hidden = false }) => {
    const answerBoxStyle = isUserMsg
        ? cx(styles.answerBox, styles.me)
        : cx(styles.answerBox, styles.them);
    const hiddenStyle = hidden ? styles.hidden : null;
    return (
        <div className={answerBoxStyle}>
            <div className={cx(styles.answer, hiddenStyle)}>{msg}</div>
        </div>
    );
};

export default MsgBubble;
