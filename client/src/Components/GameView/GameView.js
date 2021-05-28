import React, { useState, useEffect } from "react";
import styles from "./GameView.module.css";
import CustomDragLayer from "./CustomDrag/Custom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isDroppable, shuffleCards, numMoves } from "../../utils/card";
import Deck from "./Deck/Deck";
import Buttons from "./Buttons/Buttons";
import FinalColumns from "./FinalColumns/FinalColumns";
import MainColumns from "./MainColumns/MainColumns";
import "../CardMotives/CardMotives.css";

function GameView() {
  const [draggingCard, setDraggingCard] = useState({ title: "", array: [] });
  const [startCardIndex, setStartCardIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [moveNumbers, setMoveNumbers] = useState(0);
  const [possiblemoveNumbers, setPossibleMoveNumbers] = useState(0);
  const [gameNumber, setGameNumber] = useState(0);
  const [isGameEnded, setGameEnd] = useState(false);
  const [bonus, setBonus] = useState(1200);
  const [gameTime, setGameTime] = useState(0);
  const [points, setPoints] = useState(0);

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
    setLoading(false);
    startTimer();
  }, []);

  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      const reducedBonus = bonus - 1;
      setGameTime((prev) => prev + 1);
      if (reducedBonus < 0) {
        setBonus(0);
      } else setBonus(reducedBonus);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setPoints((prev) => prev + bonus);
  };

  useEffect(() => {
    if (gameNumber > 0) {
      const initialShuffle = shuffleCards();
      Object.entries(initialShuffle).map(([key, item]) => {
        columns[key].set(item);
      });
      setMoveNumbers(0);

      Object.entries(finalColumns).map(([key, column]) => {
        column.set([]);
      });
      setStartCardIndex(0);
      setStartColumn2([]);
    }
  }, [gameNumber]);

  useEffect(() => {
    if (!isLoading) {
      console.log("Wchodzimy");
      const mainColumnsArr = Object.keys(mainColumns).map(function (key) {
        return mainColumns[key].get;
      });
      const finalColumnsArr = Object.keys(finalColumns).map(function (key) {
        return finalColumns[key].get;
      });
      const possibleMoves = numMoves(
        mainColumnsArr,
        finalColumnsArr,
        startColumn1
      );
      if (possibleMoves === 0) {
        setGameEnd(true);
      } else setPossibleMoveNumbers(possibleMoves);
    }
  }, [moveNumbers, isLoading, gameNumber]);

  const handleDrop = (currentCards, draggingCards) => {
    const selectedCard = currentCards.array[currentCards.array.length - 1];
    const dropTarget = draggingCards.array[0];
    const dragArrayLength = draggingCards.array.length;
    const carriedArray = columns[draggingCard.title].get;
    const carriedArrayLength = carriedArray.length;
    const sliceEnd = carriedArrayLength - dragArrayLength;
    const carriedTarget = draggingCard.target;
    setMoveNumbers((prev) => prev + 1);
    if (
      currentCards.array.length === 0 ||
      isDroppable(selectedCard, dropTarget)
    ) {
      console.log(draggingCards.title);
      if (draggingCards.title.includes("finalColumns")) {
        console.log("contains");
      }
      console.log(draggingCards);
      columns[currentCards.title].set([
        ...currentCards.array,
        ...draggingCards.array,
      ]);

      const reducedColumn = carriedArray.slice(0, sliceEnd);
      let reversed = null;
      if (
        reducedColumn.length > 0 &&
        !reducedColumn[reducedColumn.length - 1].isVisible
      ) {
        reversed = reducedColumn.length - 1;
      }
      if (reducedColumn.length > 0)
        reducedColumn[reducedColumn.length - 1].isVisible = true;
      columns[draggingCard.title].set(reducedColumn);

      const newHistoryStep = {
        source: draggingCard.title,
        target: currentCards.title,
        draggedCards: draggingCard.array,
        reversed,
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
  if (isLoading) return <div>loading...</div>;
  if (isGameEnded) return <div>Gra zakończona</div>;
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
            points={points}
            setPoints={setPoints}
          />
          <Buttons
            history={history}
            startCardIndex={startCardIndex}
            startColumn1={startColumn1}
            setStartCardIndex={setStartCardIndex}
            setStartColumn2={setStartColumn2}
            columns={columns}
            setHistory={setHistory}
            setMoveNumbers={setMoveNumbers}
            setGameNumber={setGameNumber}
            points={points}
            setPoints={setPoints}
          />
          <FinalColumns
            finalColumns={finalColumns}
            columns={columns}
            draggingCard={draggingCard}
            setHistory={setHistory}
            history={history}
            setDraggingCard={setDraggingCard}
            setMoveNumbers={setMoveNumbers}
            setPoints={setPoints}
          />
        </div>
        <MainColumns
          mainColumns={mainColumns}
          setDraggingCard={setDraggingCard}
          handleDrop={handleDrop}
          draggingCard={draggingCard}
        />
        <div className={styles.statisticks}>
          <div>Punkty: {points}</div>
          <div>Czas: {gameTime}</div>
          <p>Ilość możliwych ruchów: {possiblemoveNumbers}</p>
          <p>Wykonane ruchy: {moveNumbers}</p>
        </div>
      </div>
    </DndProvider>
  );
}

export default GameView;
