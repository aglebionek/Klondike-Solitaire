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
}) => {
  const stepBack = () => {
    if (history.length > 0) {
      const lastStep = history[history.length - 1];
      if (lastStep.source === "startColumn1") {
        let previousIndex = startCardIndex - 1;
        if (startCardIndex === 0) {
          previousIndex = startColumn1.length;
        }
        const previousCard = startColumn1[previousIndex - 1];
        setStartCardIndex(previousIndex);
        if (previousCard) setStartColumn2([previousCard]);
        else setStartColumn2([]);
      } else {
        const targetColumn = columns[lastStep.target].get;
        const sourceColumn = columns[lastStep.source].get;
        const draggedCardsLength = lastStep.draggedCards.length;
        const targetColumnLength = targetColumn.length;
        const targetColumnStartSlice = targetColumnLength - draggedCardsLength;
        const selectedColumn = [...sourceColumn, ...lastStep.draggedCards];
        if (lastStep.reversed !== null) {
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
      <button className={styles.button}>
        <RiRestartLine />
      </button>
    </div>
  );
};

export default Buttons;
