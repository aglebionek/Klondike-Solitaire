import React from 'react'

function Board (props) {
    const drop = e =>{
        e.preventDefault();
        const card_id=e.dataTransfer.getData('card_id'); //transfer id

        const card = document.getElementById(card_id);  //pobieranie id
        card.style.dispaly = 'block';

        e.target.appendChild(card);                     //wyswietlanie na stole
    }
    
    const dragOver= e => {
        e.preventDefault();
    }
    
    return(
        <div
            id={props.id}
            className={props.className} 
            onDrop={drop}
            onDragOver={dragOver}        
        >
            {props.children}
        </div>
    )
}
export default Board