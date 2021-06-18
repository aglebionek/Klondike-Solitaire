import React from "react";
import styles from "./Statistics.module.css";

const Statistics = ({
  points,
  gameTime,
  possiblemoveNumbers,
  moveNumbers,
  analysis,
}) => {
  const minutes = Math.floor(gameTime / 60);
  let seconds = gameTime - 60 * minutes;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return (
    <div className={styles.statistics}>
      <div>Punkty: {points}</div>
      <div>Czas: {minutes + ":" + seconds}</div>
      {!analysis && <p>Ilość możliwych ruchów: {possiblemoveNumbers}</p>}
      <p>Wykonane ruchy: {moveNumbers}</p>
    </div>
  );
};

export default Statistics;
