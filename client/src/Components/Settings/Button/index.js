import React from "react";
import styles from "./Button.module.css";
import buttonClickSound from '../../../soundtrack/SoundDesign/button_undo.mp3';

const Button = ({ isCardSelectionOpen, setCardSelectionOpen, text, soundEffect }) => {
  const buttonSound = (event) => {
    let beep = new Audio(buttonClickSound);
    beep.volume=(soundEffect/100);
    beep.play();   
  }
  return (
    <div className={styles.container}>
      <button
       onMouseDown={buttonSound}
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
