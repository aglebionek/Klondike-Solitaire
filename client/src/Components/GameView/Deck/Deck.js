import React, { useImperativeHandle } from "react";
import Card from "../Card/Card";
import DraggableCard from "../DraggableCard/DraggableCard";
import cardDraw from "../../../soundtrack/SoundDesign/card_draw.mp3";

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
  effect,
  revealCardRef,
  analysis,
}) => {
  useImperativeHandle(revealCardRef, () => ({
    revealTheCard(isMoved) {
      let cardIndex = startCardIndex;
      if (isMoved) {
        cardIndex -= 1;
      }
      const card = startColumn1[cardIndex];
      if (card) card.isVisible = true;
      setStartColumn2([card]);
      const newHistoryStep = {
        source: "startColumn1",
        target: "startColumn2",
        draggedCards: [startColumn1[cardIndex]],
      };
      if (cardIndex + 1 > startColumn1.length && startColumn1.length > 0) {
        const newPoints = points - 50;
        if (newPoints < 0) {
          setPoints(0);
        } else setPoints(newPoints);
        setStartCardIndex(0);
      } else setStartCardIndex(cardIndex + 1);

      setHistory([...history, newHistoryStep]);
    },
  }));

  const cardSound = () => {

    let beep = new Audio(cardDraw);
    beep.volume = effect / 100;
    beep.play();
  };

  var styles = require("./Deck.module.css");
  if(localStorage.getItem('isLogged')) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
        styles = require("./DeckCyberpunk.module.css");
    }
  }

  return (
    <div className={styles.deckContainer}>
      <div className={styles.deck}>
        <div
          className={styles.cardShadow}
          onClick={() => {
            if (!analysis) revealCardRef.current.revealTheCard();
          }}
          onMouseDown={cardSound}
        >
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
              effect={effect}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Deck;
