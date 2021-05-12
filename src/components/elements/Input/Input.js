import React, {useState} from "react";
import styles from "./Input.module.css";

const Input = ({
  input,
  setInput,
  submitAction,
  placeholder,
  margin = true,
  expandible = true,
}) => {
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
    if (expandible) {
      setRowCount(currentRows);
    }
    setInput(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submitAction();
    }
  };

  const marginStyle = margin
    ? styles.inputContainerMargin
    : styles.inputContainerNoMargin;
  return (
    <div className={marginStyle}>
      {expandible ? (
        <textarea
          type="text"
          className={styles.input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={input}
          rows={rowCount}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type="text"
          className={styles.input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={input}
          placeholder={placeholder}
        ></input>
      )}
    </div>
  );
};

export default Input;
