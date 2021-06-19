import React from "react";
import buttonClickSound from '../../../soundtrack/SoundDesign/menu_click.mp3';

const Button = ({ isCardSelectionOpen, setCardSelectionOpen, text, soundEffect }) => {
  const buttonSound = (event) => {
    let beep = new Audio(buttonClickSound);
    beep.volume=(soundEffect/100);
    beep.play();   
  };
  var styles = require("./Button.module.css");
  if(localStorage.getItem('isLogged')) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
      styles = require("./ButtonCyberpunk.module.css");
    };
  };
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
