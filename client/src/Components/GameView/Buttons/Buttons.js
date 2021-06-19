import React, { useState } from "react";
import { GrUndo } from "react-icons/gr";
import { RiRestartLine } from "react-icons/ri";
import buttonUndoSound from "../../../soundtrack/SoundDesign/button_undo.mp3";
import buttonHoverSound from "../../../soundtrack/SoundDesign/menu_hover.mp3";

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
  effect,
}) => {
  const [soundUndoButton, setSoundUndoButton] = useState(true);
  const [soundRestartButton, setSoundRestartButton] = useState(true);

  const buttonUndo = () => {
    let beep = new Audio(buttonUndoSound);
    beep.volume = effect / 100;
    beep.play();
  };

  const buttonHover = () => {
    let beep = new Audio(buttonHoverSound);
    console.log(beep);
    beep.volume = effect / 100;
    beep.play();
  };

  const handleMouseOver = (e) => {
    if (e.target.name === "undo" && soundUndoButton) {
      buttonHover();
      setTimeout(() => {
        setSoundUndoButton(false);
      }, 1000);
    } else if (e.target.name === "restart" && soundRestartButton) {
      buttonHover();
      setTimeout(() => {
        setSoundRestartButton(false);
      }, 1000);
    }
  };

  const stepBack = () => {
    if (history.length > 0) {
      setMoveNumbers((prev) => prev + 1);
      buttonUndo();

      const newPoints = points - 20;
      if (newPoints < 0) setPoints(0);
      else setPoints(newPoints);

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
      } else if (lastStep.source === "startColumn2") {
        const columnn = columns["startColumn1"].get;
        const finalColumn = columns[lastStep.target];

        const finalColumnGet = finalColumn.get;
        finalColumnGet.splice(-1, 1);
        finalColumn.set(finalColumnGet);

        columns["startColumn2"].set(lastStep.draggedCards);

        columnn.splice(lastStep.cardIndex - 1, 0, lastStep.draggedCards[0]);
      } else {
        const sourceColumn = columns[lastStep.source].get;
        const draggedCardsLength = lastStep.draggedCards.length;
        const selectedColumn = [...sourceColumn, ...lastStep.draggedCards];
        if (lastStep.reversed !== null && lastStep.reversed !== undefined) {
          selectedColumn[lastStep.reversed].isVisible = false;
        }
        columns[lastStep.source].set(selectedColumn);
        const targetColumn = columns[lastStep.target].get;
        const targetColumnLength = targetColumn.length;
        const targetColumnStartSlice = targetColumnLength - draggedCardsLength;
        columns[lastStep.target].set(
          targetColumn.slice(0, targetColumnStartSlice)
        );
      }
      const newHistory = history.splice(0, history.length - 1);
      setHistory(newHistory);
    }
  };
  var styles = require("./Buttons.module.css");
  if(localStorage.getItem('isLogged')) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
        styles = require("./ButtonsCyberpunk.module.css");
    }
  }
  return (
    <div className={styles.buttons}>
      <button
        onClick={stepBack}
        name="undo"
        className={`${styles.button} ${
          history.length === 0 ? styles.disabledButton : ""
        }`}
        disabled={history.length === 0}
        onMouseOver={handleMouseOver}
      >
        <GrUndo />
      </button>
      <button
        className={styles.button}
        onClick={() => setGameNumber((prev) => prev + 1)}
        name="restart"
        onMouseOver={handleMouseOver}
      >
        <RiRestartLine />
      </button>
    </div>
  );
};

export default Buttons;
