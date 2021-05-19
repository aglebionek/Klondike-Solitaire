import React from "react";
import styles from "./FinalColumnItem.module.css";

const FinalColumnItem = ({ item }) => {
  const convertRankToClass = "v" + item.rank;
  return (
    <div
      className={styles.card}

      // style={{ top: top + "%", zIndex: index + 1 }}
    >
      <div className={"card " + convertRankToClass + " " + item.shape}>
        <span className="card__value"></span>
        <span className="card__minisuit"></span>
        <span className="card__mainsuit"></span>
      </div>
    </div>
  );
};

export default FinalColumnItem;
