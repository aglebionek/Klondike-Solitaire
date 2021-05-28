import React from "react";
import styles from "./Buttons.module.css";
import { GrUndo } from "react-icons/gr";
import { RiRestartLine } from "react-icons/ri";

const Buttons = ({
  history,
  startCardIndex,
  startColumn1,
  setStartCardIndex,
  setStartColumn2,
  columns,
  setHistory,
  setMoveNumbers,
  setGameNumber,
  points,
  setPoints,
}) => {
  const stepBack = () => {
    if (history.length > 0) {
      setMoveNumbers((prev) => prev + 1);

      const newPoints = points - 20;
      if (newPoints < 0) setPoints(0);
      else setPoints(newPoints);

      const lastStep = history[history.length - 1];
      if (lastStep.source === "startColumn1") {
        console.log("start");
        let previousIndex = startCardIndex - 1;
        if (startCardIndex === 0) {
          previousIndex = startColumn1.length;
        }
        const previousCard = startColumn1[previousIndex - 1];
        setStartCardIndex(previousIndex);
        if (previousCard) setStartColumn2([previousCard]);
        else setStartColumn2([]);
      } else if (lastStep.source === "startColumn2") {
        const columnn = columns["startColumn1"].get;
        const finalColumn = columns[lastStep.target];

        const finalColumnGet = finalColumn.get;
        finalColumnGet.splice(-1, 1);
        finalColumn.set(finalColumnGet);

        columns["startColumn2"].set(lastStep.draggedCards);

        columnn.splice(lastStep.cardIndex - 1, 0, lastStep.draggedCards[0]);
      } else {
        const targetColumn = columns[lastStep.target].get;
        const sourceColumn = columns[lastStep.source].get;
        const draggedCardsLength = lastStep.draggedCards.length;
        const targetColumnLength = targetColumn.length;
        const targetColumnStartSlice = targetColumnLength - draggedCardsLength;
        const selectedColumn = [...sourceColumn, ...lastStep.draggedCards];
        if (lastStep.reversed !== null && lastStep.reversed !== undefined) {
          selectedColumn[lastStep.reversed].isVisible = false;
        }
        columns[lastStep.target].set(
          targetColumn.slice(0, targetColumnStartSlice)
        );
        columns[lastStep.source].set(selectedColumn);
      }
      const newHistory = history.splice(0, history.length - 1);
      setHistory(newHistory);
    }
  };
  return (
    <div className={styles.buttons}>
      <button
        onClick={stepBack}
        className={`${styles.button} ${
          history.length === 0 ? styles.disabledButton : ""
        }`}
        disabled={history.length === 0}
      >
        <GrUndo />
      </button>
      <button
        className={styles.button}
        onClick={() => setGameNumber((prev) => prev + 1)}
      >
        <RiRestartLine />
      </button>
    </div>
  );
};

export default Buttons;
