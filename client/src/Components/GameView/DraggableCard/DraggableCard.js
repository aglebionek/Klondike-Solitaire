import React from "react";
import { useDrag } from "react-dnd";
import styles from "./Item.module.css";
import cardPick from "../../../soundtrack/SoundDesign/card_pick.mp3";
import cardWrong from "../../../soundtrack/SoundDesign/card_wrong.mp3";

const DraggableCard = ({
  name,
  type,
  top,
  index,
  setDraggingCard,
  item,
  startCardIndex,
  effect,
}) => {
  const [{}, drag] = useDrag(
    () => ({
      type,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [name, type]
  );

  const handleDrag = (e) => {
    let el = e.target;
    if (!e.target.classList.contains("card-parent")) {
      el = e.target.closest(".card-parent");
    }
    let rank = el.attributes.getNamedItem("data-rank").value;
    let shape = el.attributes.getNamedItem("data-shape").value;
    let color = el.attributes.getNamedItem("data-color").value;
    let isVisible = el.attributes.getNamedItem("data-visible").value;
    let cardIndex = el.attributes.getNamedItem("data-index")?.value;

    let arr = [];
    arr.push({ rank, color, shape, isVisible });

    let sibling = el.nextElementSibling;
    el.style.opacity = 0;
    while (
      sibling !== null &&
      sibling.attributes.getNamedItem("data-rank") !== null
    ) {
      rank = sibling.attributes.getNamedItem("data-rank").value;
      shape = sibling.attributes.getNamedItem("data-shape").value;
      color = sibling.attributes.getNamedItem("data-color").value;
      isVisible = sibling.attributes.getNamedItem("data-visible").value;

      arr.push({ rank, color, shape, isVisible });
      
      sibling.style.opacity = 0;
      sibling = sibling.nextElementSibling;
    }
    setDraggingCard({
      title: name,
      array: arr,
      target: el,
      cardIndex: cardIndex,
    });
    cardSound(cardPick)
  };
  const convertRankToClass = "v" + item.rank;
  var cardStyle = "";
  if(localStorage.getItem('isLogged')) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
        cardStyle += "cyberpunk";
    }
  }


  const handleDragEnd = (e) => {
    setDraggingCard({ title: "", array: [] });
    let el = e.target;
    if (!e.target.classList.contains("card-parent")) {
      el = e.target.closest(".card-parent"); 
    }
    el.style.opacity = 1;
    let sibling = el.nextElementSibling;
    while (sibling !== null) {
      sibling.style.opacity = 1;
      sibling = sibling.nextElementSibling;    
    }
    cardSound(cardWrong)
  };
  const cardSound = (src) => {
    let beep = new Audio(src);
    beep.volume=(effect/100);
    beep.play();   
  };
  return (
    <div
      className={`${styles.card} card-parent`}
      data-rank={item.rank}
      data-color={item.color}
      data-shape={item.shape}
      data-visible={item.isVisible}
      data-index={startCardIndex}
      ref={drag}
      onDragStart={handleDrag}
      onDragEnd={handleDragEnd}     
      style={{ top: top + "%", zIndex: index + 1 }}
    >
      <div className={"card " + convertRankToClass + " " + item.shape + " " + cardStyle}>
        <span className="card__value"></span>
        <span className="card__minisuit"></span>
        <span className="card__mainsuit"></span>
      </div>
    </div>
  );
};

export default React.memo(DraggableCard);
