import React from "react";
import styles from "./FinalColumns.module.css";
import { check4Stack } from "../../../utils/card";
import FinalColumnItem from "../FinalColumnItem/FinalColumnItem";
import DraggableCard from "../DraggableCard/DraggableCard";
import Drop from "../Drop/drop";

const FinalColumns = ({
  finalColumns,
  columns,
  draggingCard,
  setHistory,
  history,
  setDraggingCard,
  setMoveNumbers,
  setPoints,
  handleDrop,
  effect,
  revealCardRef,
  analysis,
}) => {
  const handleReverseDrop = (currentCards, draggingCards) => {
    if (draggingCards.array.length === 0) return;
    const selectedCard =
      currentCards.array[currentCards.array.length - 1] || null;
    const dropTarget = draggingCards.array[0];
    const dragArrayLength = draggingCards.array.length;
    const carriedArray = columns[draggingCard.title].get;
    const carriedArrayLength = carriedArray.length;
    const sliceEnd = carriedArrayLength - dragArrayLength;
    const carriedTarget = draggingCard.target;

    setMoveNumbers((prev) => prev + 1);

    if (check4Stack(selectedCard, dropTarget)) {
      let newHistoryStep;
      if (draggingCards.title === "startColumn2") {
        const source = columns["startColumn1"].get;

        const index = draggingCard.cardIndex;
        source.splice(index - 1, 1);
        columns[draggingCard.title].set([]);
        columns["startColumn1"].set(source);
        columns[currentCards.title].set([
          ...currentCards.array,
          ...draggingCards.array,
        ]);
        newHistoryStep = {
          source: draggingCard.title,
          target: currentCards.title,
          draggedCards: draggingCard.array,
          cardIndex: index,
        };
        revealCardRef.current.revealTheCard(true);
      } else {
        columns[currentCards.title].set([
          ...currentCards.array,
          ...draggingCards.array,
        ]);
        const reducedColumn = carriedArray.slice(0, sliceEnd);

        columns[draggingCard.title].set(reducedColumn);

        let reversed = null;
        if (
          reducedColumn.length > 0 &&
          !reducedColumn[reducedColumn.length - 1].isVisible
        ) {
          reversed = reducedColumn.length - 1;
        }
        if (reducedColumn.length > 0)
          reducedColumn[reducedColumn.length - 1].isVisible = true;

        newHistoryStep = {
          source: draggingCard.title,
          target: currentCards.title,
          draggedCards: draggingCard.array,
          reversed,
        };
      }
      setHistory([...history, newHistoryStep]);
      setPoints((prev) => prev + 10);
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
  return (
    <div className={styles.finalColumnContainer}>
      {Object.entries(finalColumns).map(([key, column]) => {
        const columnLength = column.get.length;
        const card = column.get[columnLength - 1];
        let card2 = null;
        if (
          draggingCard.array.length &&
          draggingCard.title &&
          draggingCard.title.includes("finalColumn")
        ) {
          if (columnLength - 2 >= 0) card2 = column.get[columnLength - 2];
        }
        return (
          <div className={styles.finalColumn} key={key}>
            <div className={styles.cardShadow}>
              {card?.rank === "A" ? (
                <FinalColumnItem item={card} />
              ) : card ? (
                <DraggableCard
                  type="card"
                  top={0}
                  index={3}
                  item={card}
                  name={key}
                  setDraggingCard={setDraggingCard}
                  isLastItem={true}
                  onDrop={handleDrop}
                  currentArr={column.get}
                  draggingArr={draggingCard}
                  effect={effect}
                />
              ) : null}
              {card2 && <FinalColumnItem item={card2} />}
              {!analysis && (
                <Drop
                  onDrop={handleReverseDrop}
                  currentArr={column.get}
                  draggingArr={draggingCard}
                  accept="card"
                  name={key}
                  isDragActive={
                    draggingCard.array.length > 0 && draggingCard.title !== key
                  }
                  top={0}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FinalColumns;
