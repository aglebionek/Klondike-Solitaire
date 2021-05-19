import React, { useState, useEffect } from "react";
import styles from "./GameView.module.css";
import CustomDragLayer from "./CustomDrag/Custom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isDroppable, shuffleCards } from "../../utils/card";
import Deck from "./Deck/Deck";
import Buttons from "./Buttons/Buttons";
import FinalColumns from "./FinalColumns/FinalColumns";
import MainColumns from "./MainColumns/MainColumns";
import "../CardMotives/CardMotives.css";

function GameView() {
  const [draggingCard, setDraggingCard] = useState({ title: "", array: [] });
  const [startCardIndex, setStartCardIndex] = useState(0);

  const [mainColumn1, setMainColumn1] = useState([]);
  const [mainColumn2, setMainColumn2] = useState([]);
  const [mainColumn3, setMainColumn3] = useState([]);
  const [mainColumn4, setMainColumn4] = useState([]);
  const [mainColumn5, setMainColumn5] = useState([]);
  const [mainColumn6, setMainColumn6] = useState([]);
  const [mainColumn7, setMainColumn7] = useState([]);

  const [finalColumn1, setFinalColumn1] = useState([]);
  const [finalColumn2, setFinalColumn2] = useState([]);
  const [finalColumn3, setFinalColumn3] = useState([]);
  const [finalColumn4, setFinalColumn4] = useState([]);

  const [startColumn1, setStartColumn1] = useState([]);
  const [startColumn2, setStartColumn2] = useState([]);

  const [history, setHistory] = useState([]);

  const startColumns = {
    startColumn1: {
      get: startColumn1,
      set: setStartColumn1,
    },
    startColumn2: {
      get: startColumn2,
      set: setStartColumn2,
    },
  };

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

  const columns = { ...finalColumns, ...mainColumns, ...startColumns };

  useEffect(() => {
    const initialShuffle = shuffleCards();
    Object.entries(initialShuffle).map(([key, item]) => {
      columns[key].set(item);
    });
  }, []);

  const handleDrop = (currentCards, draggingCards) => {
    const selectedCard = currentCards.array[currentCards.array.length - 1];
    const dropTarget = draggingCards.array[0];
    const dragArrayLength = draggingCards.array.length;
    const carriedArray = columns[draggingCard.title].get;
    const carriedArrayLength = carriedArray.length;
    const sliceEnd = carriedArrayLength - dragArrayLength;
    const carriedTarget = draggingCard.target;

    if (
      currentCards.array.length === 0 ||
      isDroppable(selectedCard, dropTarget)
    ) {
      columns[currentCards.title].set([
        ...currentCards.array,
        ...draggingCards.array,
      ]);

      const reducedColumn = carriedArray.slice(0, sliceEnd);
      if (reducedColumn.length > 0)
        reducedColumn[reducedColumn.length - 1].isVisible = true;
      columns[draggingCard.title].set(reducedColumn);
      const newHistoryStep = {
        source: draggingCard.title,
        target: currentCards.title,
        draggedCards: draggingCard.array,
        reversed: reducedColumn.length > 0 ? reducedColumn.length - 1 : null,
      };
      setHistory([...history, newHistoryStep]);
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
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer draggingCard={draggingCard} />
      <div className={styles.container}>
        <div className={styles.cardTop}>
          <Deck
            startColumn1={startColumn1}
            startColumn2={startColumn2}
            startCardIndex={startCardIndex}
            handleDrop={handleDrop}
            setDraggingCard={setDraggingCard}
            draggingCard={draggingCard}
            setStartCardIndex={setStartCardIndex}
            setStartColumn2={setStartColumn2}
            setHistory={setHistory}
            history={history}
          />
          <Buttons
            history={history}
            startCardIndex={startCardIndex}
            startColumn1={startColumn1}
            setStartCardIndex={setStartCardIndex}
            setStartColumn2={setStartColumn2}
            columns={columns}
            setHistory={setHistory}
          />
          <FinalColumns
            finalColumns={finalColumns}
            columns={columns}
            draggingCard={draggingCard}
            setHistory={setHistory}
            history={history}
            setDraggingCard={setDraggingCard}
          />
        </div>
        <MainColumns
          mainColumns={mainColumns}
          setDraggingCard={setDraggingCard}
          handleDrop={handleDrop}
          draggingCard={draggingCard}
        />
        <div className={styles.statisticks}>
          <div>Punkty: 1234</div>
          <div>Czas: 12</div>
        </div>
      </div>
    </DndProvider>
  );
}

export default GameView;
