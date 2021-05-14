import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./Item.module.css";

const Item = ({ name, type, top, index, setDraggingCard, item }) => {
  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [name, type]
  );

  const style = {
    transform: `rotate(90deg)`,
    width: "400px",
    height: "400px",
  };

  const cardColors = {
    spades: "black",
    clubs: "black",
    hearts: "red",
    diamonds: "red",
  };

  const handleDrag = (e) => {
    let rank = e.target.attributes.getNamedItem("data-rank").value;
    let shape = e.target.attributes.getNamedItem("data-shape").value;
    let color = e.target.attributes.getNamedItem("data-color").value;
    let arr = [];
    arr.push({ rank, color, shape });
    let sibling = e.target.nextElementSibling;
    e.target.style.opacity = 0;
    console.log(e);
    while (
      sibling !== null &&
      sibling.attributes.getNamedItem("data-rank") !== null
    ) {
      rank = sibling.attributes.getNamedItem("data-rank").value;
      shape = sibling.attributes.getNamedItem("data-shape").value;
      color = sibling.attributes.getNamedItem("data-color").value;
      arr.push({ rank, color, shape });
      sibling.style.opacity = 0;
      sibling = sibling.nextElementSibling;
    }
    console.log(arr);
    setDraggingCard({
      title: name,
      array: arr,
      target: e.target,
    });
  };
  const convertRankToClass = "v" + item.rank;

  const handleDragEnd = (e) => {
    setDraggingCard({ title: "", array: [] });
    e.target.style.opacity = 1;
    let sibling = e.target.nextElementSibling;
    while (sibling !== null) {
      sibling.style.opacity = 1;
      sibling = sibling.nextElementSibling;
    }
  };
  return (
    <div
      className={styles.card}
      data-rank={item.rank}
      data-color={item.color}
      data-shape={item.shape}
      ref={drag}
      onDragStart={handleDrag}
      onDragEnd={handleDragEnd}
      style={{ top: top + "%", zIndex: index }}
      src="./images/sample_karta.jpg"
      alt="karta"
    >
      <div className={"card " + convertRankToClass + " " + item.shape}>
        <span className="card__value"></span>
        <span className="card__minisuit"></span>
        <span className="card__mainsuit"></span>
      </div>
    </div>
  );
};

export default React.memo(Item);
