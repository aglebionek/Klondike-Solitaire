import React from "react";
import styles from "./FinalColumnItem.module.css";

const FinalColumnItem = ({ item }) => {
  const convertRankToClass = "v" + item.rank;
  var cardStyle = "";
  if(localStorage.getItem("motiveCss") === "cyberpunk" && localStorage.getItem("isLogged") === "true") cardStyle += "cyberpunk";
  
  return (
    <div className={styles.card} style={{ zIndex: 2 }}>
      <div className={"card " + convertRankToClass + " " + item.shape + " " + cardStyle}>
        <span className="card__value"></span>
        <span className="card__minisuit"></span>
        <span className="card__mainsuit"></span>
      </div>
    </div>
  );
};

export default FinalColumnItem;
