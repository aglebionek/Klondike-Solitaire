import React from "react";
import "./CardMotives.css"

//Instruction on card generation can be found in CardMotives.css

function CardMotives() {
  return (
    <div className="card">
        <span className="card__value"></span>
        <span className="card__minisuit"></span>
        <span className="card__mainsuit"></span>        
    </div>
  );
}

export default CardMotives;