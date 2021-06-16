import React, { useState, useEffect, useRef } from "react";
import styles from "./GameView.module.css";
import CustomDragLayer from "./CustomDrag/Custom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { drop, shuffleCards, numMoves, isGameWin } from "../../utils/card";
import Deck from "./Deck/Deck";
import Buttons from "./Buttons/Buttons";
import FinalColumns from "./FinalColumns/FinalColumns";
import MainColumns from "./MainColumns/MainColumns";
import GameMusic from "./Music/Audio";
import "../CardMotives/CardMotives.css";
import cardRight from "../../soundtrack/SoundDesign/card_right.mp3";
import Statistics from "./Statistics/Statistics";
import { useLocation } from "react-router-dom";
import Animation from "./game_end_animations/Animation";
import WinLoseBoard from "./WinLoseBoard";

import socket from "../Mutiplayer/socketConfig";

function GameView({
  cardset_id,
  effect,
  volume,
  analysis = false,
  history: initialHistory,
  shuffle: initialShuffle,
}) {
  const [draggingCard, setDraggingCard] = useState({ title: "", array: [] });
  const [shuffle, setShuffle] = useState();
  const [startCardIndex, setStartCardIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [moveNumbers, setMoveNumbers] = useState(0);
  const [possiblemoveNumbers, setPossibleMoveNumbers] = useState(0);
  const [gameNumber, setGameNumber] = useState(0);
  const [isGameEnded, setGameEnd] = useState(false);
  const [bonus, setBonus] = useState(1200);
  const [gameTime, setGameTime] = useState(0);
  const [points, setPoints] = useState(0);
  const [playMusic, setPlayMusic] = useState(false);
  const [gameEndEffect, setGameEndEffect] = useState(null);

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
  const [playersOnEndGame, setPlayersOnEndGame] = useState([]);
  const location = useLocation();

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

  let timer = useRef(null);
  const revealCardRef = useRef(null);

  const columns = { ...finalColumns, ...mainColumns, ...startColumns };

  useEffect(() => {
    let shuffle;
    if (initialShuffle) {
      shuffle = initialShuffle;
    } else {
      shuffle = { ...shuffleCards() };
      setShuffle({ ...shuffle });
    }
    const copy = { ...shuffle };

    Object.entries(copy).map(([key, item]) => {
      const newArray = [];
      for (let i = 0; i < item.length; i++) {
        newArray.push({ ...item[i] });
      }
      columns[key].set(newArray);
    });
    setLoading(false);
    if (initialHistory) {
      setHistory(initialHistory);
    }
  }, []);

  const stopTimer = () => {
    clearInterval(timer.current);
    setPoints((prev) => prev + bonus);
  };

  useEffect(() => {
    socket.on("write-to-end-list", ({ player, score }) => {
      let arr = playersOnEndGame.slice();

      arr.push({
        name: player,
        score: score,
      });

      setPlayersOnEndGame(arr);
    });

    return () => {
      socket.off("write-to-end-list");
    };
  }, []);

  useEffect(() => {
    if (gameNumber > 0) {
      const initialShuffle = shuffleCards();
      setShuffle({ ...shuffle });
      const copy = { ...initialShuffle };
      Object.entries(copy).map(([key, item]) => {
        const newArray = [];
        for (let i = 0; i < item.length; i++) {
          newArray.push({ ...item[i] });
        }
        columns[key].set(newArray);
      });

      Object.entries(finalColumns).map(([key, column]) => {
        column.set([]);
      });
      setMoveNumbers(0);
      setHistory([]);
      setStartCardIndex(0);
      setStartColumn2([]);
      setGameTime(0);
    }
  }, [gameNumber]);

  useEffect(() => {
    if (history) {
      console.log(shuffle);
    }
  }, [history]);

  useEffect(() => {
    if (!isLoading) {
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

      if (location.time !== undefined) {
        if (gameTime >= location.time) {
          stopTimer();
          gameEnd();
          // tablica z graczami, ktorzy do gry weszli jest pod location.players

          socket.emit("end-game", { score: points });
        }
      }

      //console.log(possibleMoves);
      if (possibleMoves === 0) {
        gameEnd();
      } else setPossibleMoveNumbers(possibleMoves);
    }
  }, [moveNumbers, isLoading, gameNumber, gameTime]);

  const gameEnd = () => {
    const result = isGameWin(finalColumns);
    setGameEndEffect(result);
  };

  const cardSound = (src) => {
    let beep = new Audio(src);
    beep.volume = effect / 100;
    beep.play();
  };

  const handleDrop = (currentCards, draggingCards) => {
    drop(
      currentCards,
      draggingCards,
      columns,
      draggingCard,
      setMoveNumbers,
      setPoints,
      points,
      revealCardRef,
      cardSound,
      setHistory,
      history,
      cardRight,
      setDraggingCard
    );
  };

  window.addEventListener("click", function (event) {
    setPlayMusic(true);
  });
  if (isLoading) return <div>loading...</div>;

  if (gameEndEffect) {
    setTimeout(() => {
      setGameEnd(true);
      setGameEndEffect(null);
    }, 500);
    // return <Animation action={gameEndEffect} />;
    return <div>Animation</div>;
  }

  if (isGameEnded) {
    return (
      <WinLoseBoard
        points={points}
        gameTime={gameTime}
        isFinished
        history={history}
        shuffle={shuffle}
        cardset_id={cardset_id}
        effect={effect}
        volume={volume}
      />
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {playMusic ? (
        volume > 0 && <GameMusic musicVolume={volume} cardset={cardset_id} />
      ) : (
        <></>
      )}
      <button onClick={() => setGameEndEffect("win")}>End game</button>

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
            effect={effect}
            revealCardRef={revealCardRef}
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
            effect={effect}
            analysis={analysis}
            revealCardRef={revealCardRef}
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
            handleDrop={handleDrop}
            effect={effect}
            revealCardRef={revealCardRef}
          />
        </div>
        <MainColumns
          mainColumns={mainColumns}
          setDraggingCard={setDraggingCard}
          handleDrop={handleDrop}
          draggingCard={draggingCard}
          effect={effect}
        />
        <Statistics
          points={points}
          gameTime={gameTime}
          possiblemoveNumbers={possiblemoveNumbers}
          moveNumbers={moveNumbers}
        />
      </div>
    </DndProvider>
  );
}

export default GameView;
