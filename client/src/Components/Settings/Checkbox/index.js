import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ name, status, setStatus }) => {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id={name}
        className={styles.checkboxInput}
        defaultChecked={status}
        onChange={() => setStatus((prev) => !prev)}
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
