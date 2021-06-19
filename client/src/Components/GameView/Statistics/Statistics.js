import React from "react";

const Statistics = ({ points, gameTime, possiblemoveNumbers, moveNumbers }) => {
  const minutes = Math.floor(gameTime / 60);
  let seconds = gameTime - 60 * minutes;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var styles = require("./Statistics.module.css");
  if(localStorage.getItem('isLogged')) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
        styles = require("./StatisticsCyberpunk.module.css");
    }
  }
  return (
    <div className={styles.statistics}>
      <div>Punkty: {points}</div>
      <div>Czas: {minutes + ":" + seconds}</div>
      <p>Ilość możliwych ruchów: {possiblemoveNumbers}</p>
      <p>Wykonane ruchy: {moveNumbers}</p>
    </div>
  );
};

export default Statistics;
