import React from "react";
import styles from "../DraggableCard/Item.module.css";

const Card = ({ top, index }) => {
  return (
    <div className={styles.card} style={{ top: top + "%", zIndex: index + 1 }}>
      <div className="card back">
        <span className="card__value"></span>
        <span className="card__minisuit"></span>
        <span className="card__mainsuit"></span>
      </div>
    </div>
  );
};

export default Card;
