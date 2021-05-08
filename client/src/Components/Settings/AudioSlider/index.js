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
          background: `linear-gradient(90deg,#00921c ${volume}%,rgb(214, 214, 214) ${volume}%)`,
        }}
      />
      <p className={styles.label}>{volume}%</p>
    </div>
  );
};

export default Index;
