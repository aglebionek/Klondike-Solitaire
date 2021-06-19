import React from "react";
import styles from "./AudioSlider.module.css";

const Index = ({ volume, setVolume }) => {
  return (
    <div className={styles.container}>
      <input
        type="range"
        min="0"
        max="100"
        className={styles.slider}
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        
      />
      <p className={styles.label}>{volume}%</p>
    </div>
  );
};

export default Index;
