import React, { useState } from "react";
import styles from "./Button.module.css";

const Button = () => {
  const [isActive, setStatusOfActive] = useState(false);
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${isActive ? styles.activeButton : ""}`}
        onClick={() => setStatusOfActive((prev) => !prev)}
      >
        {isActive ? "Anuluj" : "Wybierz"}
      </button>
    </div>
  );
};

export default Button;
