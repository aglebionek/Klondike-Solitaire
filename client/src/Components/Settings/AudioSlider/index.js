import React, { useState } from "react";
import styles from "./AudioSlider.module.css";

const Index = () => {
  const [value, setValue] = useState(20);
  return (
    <div className={styles.container}>
      <input
        type="range"
        min="0"
        max="100"
        className={styles.slider}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          background: `linear-gradient(90deg,#00921c ${value}%,rgb(214, 214, 214) ${value}%)`,
        }}
      />
      <p className={styles.label}>{value}%</p>
    </div>
  );
};

export default Index;
