import React, { useState } from "react";
import { GrUndo } from "react-icons/gr";
import { RiRestartLine, RiShareForwardFill } from "react-icons/ri";
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
  analysis,
  revealCardRef,
  isMulti,
}) => {
  const [soundUndoButton, setSoundUndoButton] = useState(true);
  const [soundRestartButton, setSoundRestartButton] = useState(true);
  const [historyCount, setHistoryCount] = useState(0);

  const buttonUndo = () => {
    let beep = new Audio(buttonUndoSound);
    beep.volume = effect / 100;
    beep.play();
  };

  const buttonHover = () => {
    let beep = new Audio(buttonHoverSound);
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
    if ((analysis && historyCount > 0) || (!analysis && history.length > 0)) {
      if (!analysis) setMoveNumbers((prev) => prev + 1);
      buttonUndo();

      const newPoints = points - 10;
      if (newPoints < 0) setPoints(0);
      else setPoints(newPoints);
      let lastStep;
      if (analysis) {
        lastStep = history[historyCount - 1];
      } else {
        lastStep = history[history.length - 1];
      }

      if (lastStep.source === "startColumn1") {
        let previousIndex = startCardIndex - 1;
        if (previousIndex === -1) {
          previousIndex = startColumn1.length;
        }
        let cardIndex = previousIndex - 1;
        if (cardIndex === -1) {
          cardIndex = startColumn1.length;
        }

        const previousCard = startColumn1[cardIndex];
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
        columns["startColumn1"].set(columnn);
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
      if (analysis) {
        setHistoryCount((prev) => prev - 1);
      } else {
        const newHistory = history.splice(0, history.length - 1);
        setHistory(newHistory);
      }
    }
  };

  const forwardStep = () => {
    if (history.length > historyCount) {
      const step = history[historyCount];
      if (step.source === "startColumn1") {
        let nextIndex = startCardIndex + 1;
        const nextCard = startColumn1[nextIndex - 1];
        if (startCardIndex + 1 > startColumn1.length) {
          nextIndex = 0;
        }

        setStartCardIndex(nextIndex);
        if (nextCard) setStartColumn2([nextCard]);
        else setStartColumn2([]);
        setHistoryCount((prev) => prev + 1);
      } else if (step.source === "startColumn2") {
        const finalColumn = columns[step.target];
        const finalColumnGet = finalColumn.get;
        const draggedCard = step.draggedCards;
        for (let i = 0; i < draggedCard.length; i++) {
          draggedCard[i].isVisible = true;
        }
        finalColumn.set([...finalColumnGet, ...draggedCard]);
        const source = columns["startColumn1"].get;

        const index = step.cardIndex;
        source.splice(index - 1, 1);
        columns["startColumn1"].set(source);

        const nextCard = startColumn1[startCardIndex - 1];
        if (nextCard) {
          nextCard.isVisible = true;
          setStartColumn2([nextCard]);
        } else setStartColumn2([]);

        setHistoryCount((prev) => prev + 1);
      } else {
        const sourceColumn = columns[step.source].get;
        const sourceColumnLength = sourceColumn.length;
        const draggedCardsLength = step.draggedCards.length;

        const sourceColumnStartSlice = sourceColumnLength - draggedCardsLength;
        const reducedSourceColumn = sourceColumn.slice(
          0,
          sourceColumnStartSlice
        );

        if (reducedSourceColumn.length > 0)
          reducedSourceColumn[reducedSourceColumn.length - 1].isVisible = true;

        columns[step.source].set(reducedSourceColumn);

        const targetColumn = columns[step.target].get;
        const draggedCards = step.draggedCards;
        for (let i = 0; i < draggedCardsLength; i++) {
          draggedCards[i].isVisible = true;
        }
        columns[step.target].set([...targetColumn, ...draggedCards]);
        setHistoryCount((prev) => prev + 1);
      }
    }
  };

  var styles = require("./Buttons.module.css");
  if (localStorage.getItem("isLogged")) {
    if (localStorage.getItem("motiveCss") === "cyberpunk") {
      styles = require("./ButtonsCyberpunk.module.css");
    }
  }
  return (
    <div className={styles.buttons}>
      <button
        onClick={stepBack}
        name="undo"
        className={`${styles.button} ${
          history.length === 0 || historyCount === 0
            ? styles.disabledButton
            : ""
        }`}
        disabled={history.length === 0 || (historyCount === 0 && analysis)}
        onMouseOver={handleMouseOver}
      >
        <GrUndo />
      </button>
      {analysis ? (
        <button
          onClick={forwardStep}
          name="restart"
          onMouseOver={handleMouseOver}
          className={`${styles.button} ${
            history.length === historyCount ? styles.disabledButton : ""
          }`}
          disabled={history.length === historyCount}
        >
          <RiShareForwardFill />
        </button>
      ) : (
        <button
          className={styles.button}
          onClick={() => {
            if (!isMulti) {
              setGameNumber((prev) => prev + 1);
            }
          }}
          name="restart"
          onMouseOver={handleMouseOver}
          disabled={isMulti}
        >
          <RiRestartLine />
        </button>
      )}
    </div>
  );
};

export default Buttons;
