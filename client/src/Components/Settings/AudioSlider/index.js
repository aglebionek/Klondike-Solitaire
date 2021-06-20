import React, { useState } from "react";
import audioSliderStyles from "./AudioSlider.module.css";
import audioSliderStylesCyberpunk from "./AudioSliderCyberpunk.module.css";

const Index = ({ volume, setVolume }) => {
  var glow = {};
  var styles;
  if (localStorage.getItem("motiveCss") !== "cyberpunk" || localStorage.getItem("isLogged") === "false") {
    styles = audioSliderStyles;
  } else if (localStorage.getItem("motiveCss") === "cyberpunk" && localStorage.getItem("isLogged") === "true") {
    styles = audioSliderStylesCyberpunk;
    glow = {boxShadow: `0px 0px 10px rgba(0, 214, 252, ${volume/100}), 0px 0px 10px rgba(0, 214, 252, ${volume/100})`};
  }

  return (
    <div className={styles.container}>
      <input
        type="range"
        min="0"
        max="100"
        className={styles.slider}
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        style={glow}
      />
      <p className={styles.label}>{volume}%</p>
    </div>
  );
};

export default Index;
