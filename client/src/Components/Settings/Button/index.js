import React from "react";
import styles from "./Button.module.css";

const Button = ({ isCardSelectionOpen, setCardSelectionOpen, text }) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.button} ${
          isCardSelectionOpen ? styles.activeButton : ""
        }`}
        onClick={() => setCardSelectionOpen((prev) => !prev)}
      >
        {isCardSelectionOpen ? "Anuluj" : text}
      </button>
    </div>
  );
};

export default Button;
