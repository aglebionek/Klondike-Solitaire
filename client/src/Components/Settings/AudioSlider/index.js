import React, { useState } from "react";

const Index = ({ volume, setVolume }) => {
  var styles = require("./AudioSlider.module.css");
  var glow = {};
  if(localStorage.getItem('isLogged')) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
      styles = require("./AudioSliderCyberpunk.module.css");
      glow = {boxShadow: `0px 0px 10px rgba(0, 214, 252, ${volume/100}), 0px 0px 10px rgba(0, 214, 252, ${volume/100})`};
    };
  };
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
