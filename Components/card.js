import React from "react";
import "./CardMotives.css"

//Instruction on card generation can be found in CardMotives.css

function CardMotives(props) {

    const dragStart = e =>{
        const target = e.target;

        e.dataTransfer.setData('card_id', target.id);   //ustawienie id pobrane z board getData

        setTimeout(() => {
            target.style.display = CardMotives;
        },0);
    }
    const dragOver = e =>{
        e.stopPropagation();
    }
    const dragEnd = e => {
            if (e.target.style.display === CardMotives) {
            e.target.style.display = 'block';
        }
    }
  return (
    <div className="v2"
        id={props.id}
        className={props.className}
        draggable={props.draggable}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDragEng={dragEnd}>

        <span className="card__value" ></span>
        <span className="card__minisuit"></span>
        <span className="card__mainsuit"></span>
        {props.children} 
    </div>
  );
}

export default CardMotives;