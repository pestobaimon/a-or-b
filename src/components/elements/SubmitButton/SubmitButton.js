import React from "react";
import styles from "./SubmitButton.module.css";
import cx from "classnames";

const SubmitButton = ({ action, text, btnStyle, border }) => {
    const borderStyle = border ? "" : "noBorder";
    return (
        <button className={cx(styles[btnStyle], styles[borderStyle])} onClick={action}>
            {text}
        </button>
    );
};

export default SubmitButton;
