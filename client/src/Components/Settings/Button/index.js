import React from "react";
import buttonClickSound from '../../../soundtrack/SoundDesign/menu_click.mp3';
import buttonStyles from "./Button.module.css";
import buttonStylesCyberpunk from "./ButtonCyberpunk.module.css";

const Button = ({ isCardSelectionOpen, setCardSelectionOpen, text, soundEffect }) => {
  const buttonSound = (event) => {
    let beep = new Audio(buttonClickSound);
    beep.volume=(soundEffect/100);
    beep.play();   
  };
  var styles;
  if (localStorage.getItem("motiveCss") !== "cyberpunk" || localStorage.getItem("isLogged") === "false") {
    styles = buttonStyles;
  } else if (localStorage.getItem("motiveCss") === "cyberpunk" && localStorage.getItem("isLogged") === "true") {
    styles = buttonStylesCyberpunk;
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
