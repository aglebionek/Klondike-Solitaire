import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ name }) => {
  return (
    <div className={styles.container}>
      <input type="checkbox" id={name} className={styles.checkboxInput} />
      <label for={name} className={styles.status}>
        <div
          className={styles.statusSwitch}
          data-unchecked="Off"
          data-checked="On"
        ></div>
      </label>
    </div>
  );
};

export default Checkbox;
