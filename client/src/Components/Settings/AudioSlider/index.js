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
        style={{
          boxShadow: `0px 0px 10px rgba(0, 214, 252, ${volume/100}), 0px 0px 10px rgba(0, 214, 252, ${volume/100})`,
        }}
      />
      <p className={styles.label}>{volume}%</p>
    </div>
  );
};

export default Index;
