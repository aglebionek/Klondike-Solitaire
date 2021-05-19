import React from "react";
import styles from "./Checkbox.module.css";
import buttonClickSound from '../../../soundtrack/SoundDesign/menu_click.mp3';

const Checkbox = ({ name, status, setStatus, soundEffect }) => {
  const buttonSound = (event) => {
    let beep = new Audio(buttonClickSound);
    beep.volume=(soundEffect/100);
    beep.play();   
  }
  return (
    <div className={styles.container}>
      <input
        onMouseDown={buttonSound}
        type="checkbox"
        id={name}
        className={styles.checkboxInput}
        defaultChecked={status}
        onChange={() => setStatus((prev) => !prev), buttonSound}
      />
      <label htmlFor={name} className={styles.status}>
        <div
          className={styles.statusSwitch}
          data-unchecked="Wył"
          data-checked="Wł"
        ></div>
      </label>
    </div>
  );
};

export default Checkbox;
