import React, {useState} from "react";
import styles from "./Input.module.css";

const Input = ({input, setInput, submitAction, placeholder}) => {
  const [rowCount, setRowCount] = useState(1);
  const minRows = 1;
  const handleInputChange = (event) => {
    const textareaLineHeight = 18;
    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    setRowCount(currentRows);
    setInput(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submitAction();
    }
  };
  return (
    <div className={styles.inputContainer}>
      <textarea
        type="text"
        className={styles.input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        value={input}
        rows={rowCount}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default Input;
