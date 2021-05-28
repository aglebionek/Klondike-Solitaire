import React from "react";
import styles from "./Deck.module.css";
import Card from "../Card/Card";
import DraggableCard from "../DraggableCard/DraggableCard";

const Deck = ({
  startColumn1,
  startColumn2,
  startCardIndex,
  handleDrop,
  setDraggingCard,
  draggingCard,
  setStartCardIndex,
  setStartColumn2,
  setHistory,
  history,
  points,
  setPoints,
}) => {
  const revealTheCard = () => {
    if (startCardIndex + 1 > startColumn1.length) {
      const newPoints = points - 50;
      if (newPoints < 0) {
        setPoints(0);
      } else setPoints(newPoints);
      setStartCardIndex(0);
    } else setStartCardIndex((prev) => prev + 1);
    const card = startColumn1[startCardIndex];
    if (card) card.isVisible = true;
    setStartColumn2([card]);
    const newHistoryStep = {
      source: "startColumn1",
      target: "startColumn2",
      draggedCards: [startColumn1[startCardIndex]],
    };
    setHistory([...history, newHistoryStep]);
  };
  return (
    <div className={styles.deckContainer}>
      <div className={styles.deck}>
        <div className={styles.cardShadow} onClick={revealTheCard}>
          {startColumn1[startCardIndex] ? (
            <Card item={startColumn1[startCardIndex]} index={0} />
          ) : null}
        </div>
      </div>
      <div className={styles.faceUpCards}>
        <div className={styles.cardShadow}>
          {startColumn2[0] ? (
            <DraggableCard
              type="card"
              top={0}
              index={0}
              startCardIndex={startCardIndex}
              item={startColumn2[0]}
              name={"startColumn2"}
              setDraggingCard={setDraggingCard}
              isLastItem={true}
              onDrop={handleDrop}
              currentArr={startColumn2}
              draggingArr={draggingCard}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Deck;
