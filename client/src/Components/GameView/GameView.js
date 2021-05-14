import React, { useState } from "react";
import styles from "./GameView.module.css";
import Item from "./Item/Item";
import Drop from "./Drop/drop";
import CustomDragLayer from "./CustomDrag/Custom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isDroppable } from "../../utils/card";

function GameView() {
  const score = 1234;
  const stopwatch = "12:34";

  const handleDrop = (currentCards, draggingCards) => {
    const selectedCard = currentCards.array[currentCards.array.length - 1];
    const dropTarget = draggingCards.array[0];
    const dragArrayLength = draggingCards.array.length;
    const carriedArray = mainColumns[draggingCard.title].get;
    const carriedArrayLength = carriedArray.length;
    const sliceEnd = carriedArrayLength - dragArrayLength;
    const carriedTarget = draggingCard.target;

    if (isDroppable(selectedCard, dropTarget)) {
      mainColumns[currentCards.title].set([
        ...currentCards.array,
        ...draggingCards.array,
      ]);
      mainColumns[draggingCard.title].set(carriedArray.slice(0, sliceEnd));
    } else {
      carriedTarget.style.opacity = 1;
      let sibling = carriedTarget.nextElementSibling;
      while (sibling !== null) {
        sibling.style.opacity = 1;
        sibling = sibling.nextElementSibling;
      }
    }
    setDraggingCard({ title: "", array: [] });
  };
  const [draggingCard, setDraggingCard] = useState({ title: "", array: [] });

  const [mainColumn1, setMainColumn1] = useState([
    { rank: "Q", color: "red", shape: "diamonds" },
    { rank: "K", color: "black", shape: "clubs" },
    { rank: "J", color: "red", shape: "hearts" },
  ]);

  const [mainColumn2, setMainColumn2] = useState([
    { rank: "Q", color: "red", shape: "diamonds" },
    { rank: "K", color: "black", shape: "clubs" },
    { rank: "10", color: "black", shape: "spades" },
  ]);

  const [mainColumn3, setMainColumn3] = useState([
    { rank: "5", color: "red", shape: "diamonds" },
    { rank: "Q", color: "black", shape: "clubs" },
    { rank: "J", color: "black", shape: "spades" },
  ]);

  const [mainColumn4, setMainColumn4] = useState([
    { rank: "5", color: "red", shape: "diamonds" },
    { rank: "Q", color: "black", shape: "clubs" },
    { rank: "J", color: "black", shape: "spades" },
  ]);

  const [mainColumn5, setMainColumn5] = useState([
    { rank: "5", color: "red", shape: "diamonds" },
    { rank: "Q", color: "black", shape: "clubs" },
    { rank: "J", color: "black", shape: "spades" },
  ]);

  const [mainColumn6, setMainColumn6] = useState([
    { rank: "5", color: "red", shape: "diamonds" },
    { rank: "Q", color: "black", shape: "clubs" },
    { rank: "J", color: "black", shape: "spades" },
  ]);

  const [mainColumn7, setMainColumn7] = useState([
    { rank: "5", color: "red", shape: "diamonds" },
    { rank: "Q", color: "black", shape: "clubs" },
    { rank: "J", color: "black", shape: "spades" },
  ]);

  const [finalColumn1, setFinalColumn1] = useState([
    { rank: "5", color: "red", shape: "diamonds" },
  ]);
  const [finalColumn2, setFinalColumn2] = useState([
    { rank: "5", color: "red", shape: "diamonds" },
  ]);
  const [finalColumn3, setFinalColumn3] = useState([
    { rank: "5", color: "red", shape: "diamonds" },
  ]);
  const [finalColumn4, setFinalColumn4] = useState([
    { rank: "5", color: "red", shape: "diamonds" },
  ]);

  const mainColumns = {
    mainColumn1: {
      set: setMainColumn1,
      get: mainColumn1,
    },
    mainColumn2: {
      set: setMainColumn2,
      get: mainColumn2,
    },
    mainColumn3: {
      set: setMainColumn3,
      get: mainColumn3,
    },
    mainColumn4: {
      set: setMainColumn4,
      get: mainColumn4,
    },
    mainColumn5: {
      set: setMainColumn5,
      get: mainColumn5,
    },
    mainColumn6: {
      set: setMainColumn6,
      get: mainColumn6,
    },
    mainColumn7: {
      set: setMainColumn7,
      get: mainColumn7,
    },
  };

  const finalColumns = {
    finalColumn1: {
      set: setFinalColumn1,
      get: finalColumn1,
    },
    finalColumn2: {
      set: setFinalColumn2,
      get: finalColumn2,
    },
    finalColumn3: {
      set: setFinalColumn3,
      get: finalColumn3,
    },
    finalColumn4: {
      set: setFinalColumn4,
      get: finalColumn4,
    },
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer draggingCard={draggingCard} />
      <div className={styles.container}>
        <div className={styles.cardTop}>
          <div className={styles.deckContainer}>
            <div className={styles.deck}>
              <div></div>
            </div>
            <div className={styles.faceUpCards}>
              <div></div>
            </div>
          </div>
          <div className={styles.empty}></div>
          <div className={styles.finalColumnContainer}>
            {Object.entries(finalColumns).map(([key, column], index) => {
              return (
                <div className={styles.finalColumn}>
                  {column.get.map((item, index) => {
                    const isLastItem = column.get.length - 1 === index;
                    const top = index * 20;
                    return (
                      <Item
                        type="card"
                        top={top}
                        index={index}
                        item={item}
                        name={key}
                        setDraggingCard={setDraggingCard}
                        isLastItem={isLastItem}
                        onDrop={handleDrop}
                        currentArr={mainColumn2}
                        draggingArr={draggingCard}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.cardBottom}>
          {Object.entries(mainColumns).map(([key, column]) => {
            return (
              <div className={styles.mainColumn}>
                {column.get.map((item, index) => {
                  const isLastItem = column.get.length - 1 === index;
                  const top = index * 20;
                  return (
                    <Item
                      type="card"
                      top={top}
                      index={index}
                      item={item}
                      name={key}
                      setDraggingCard={setDraggingCard}
                      isLastItem={isLastItem}
                      onDrop={handleDrop}
                      currentArr={mainColumn2}
                      draggingArr={draggingCard}
                    />
                  );
                })}
                {
                  <Drop
                    onDrop={handleDrop}
                    currentArr={column.get}
                    draggingArr={draggingCard}
                    accept="card"
                    name={key}
                    isDragActive={
                      draggingCard.array.length > 0 &&
                      draggingCard.title !== key
                    }
                    top={(mainColumn2.length - 1) * 20}
                  />
                }
              </div>
            );
          })}
        </div>
        <div className={styles.statisticks}>
          <div>Punkty: 1234</div>
          <div>Czas: 12</div>
        </div>
      </div>
    </DndProvider>
  );
}

export default GameView;
