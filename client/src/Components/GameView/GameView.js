import React, { useState, useEffect, useRef } from "react";
import CustomDragLayer from "./CustomDrag/Custom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiArrowLeft } from "react-icons/fi";
import { drop, shuffleCards, numMoves, gameResult } from "../../utils/card";
import Deck from "./Deck/Deck";
import Buttons from "./Buttons/Buttons";
import FinalColumns from "./FinalColumns/FinalColumns";
import MainColumns from "./MainColumns/MainColumns";
import GameMusic from "./Music/Audio";
import "../CardMotives/CardMotives.css";
import cardRight from "../../soundtrack/SoundDesign/card_right.mp3";
import Statistics from "./Statistics/Statistics";
import { useLocation } from "react-router-dom";
import WinLoseBoard from "./WinLoseBoard";

import socket from "../Mutiplayer/socketConfig";

function GameView({
  cardset_id,
  effect,
  volume,
  analysis = false,
  setGameAnalysis,
  history: initialHistory,
  shuffle: initialShuffle,
  points: initialPoints,
  gameTime: initialGameTime,
  moveNumbers: initialMoveNumbers,
}) {
  const location = useLocation();
  const [draggingCard, setDraggingCard] = useState({ title: "", array: [] });
  const [shuffle, setShuffle] = useState(() => {
    const initialStorage = localStorage.getItem("shuffle");

    return initialStorage !== null ? JSON.parse(initialStorage) : null;
  });
  const [startCardIndex, setStartCardIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [moveNumbers, setMoveNumbers] = useState(0);
  const [possiblemoveNumbers, setPossibleMoveNumbers] = useState(0);
  const [gameNumber, setGameNumber] = useState(0);
  const [isGameEnded, setGameEnd] = useState(false);
  const [isGameLoaded, setGameLoaded] = useState(false);
  const [bonus, setBonus] = useState(1200);
  const [gameTime, setGameTime] = useState(() => {
    const item = localStorage.getItem("gameInfo");

    if(location.handicap){
      return location.handicap;
    }

    if(item !== null){
      const gameInfoDate = JSON.parse(item).startDate;

      return Math.floor((new Date() - new Date(gameInfoDate)) / 1000);
    }

    return 0;
  });
  const [points, setPoints] = useState(0);
  const [endTime, setEndTime] = useState(() => {
    const time = location.time;

    return location.time
      ? location.time
      : JSON.parse(localStorage.getItem("gameInfo")).time
  });
  const [playMusic, setPlayMusic] = useState(false);

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
    let firstShuffle;

    if (initialShuffle) {
      firstShuffle = initialShuffle;
    } else if (shuffle) {
      firstShuffle = shuffle;
    } else {
      firstShuffle = shuffleCards();
      setShuffle(firstShuffle);
    }

    Object.entries(firstShuffle).map(([key, item]) => {
      const newArray = [];
      for (let i = 0; i < item.length; i++) {
        newArray.push({ ...item[i] });
      }
      columns[key].set(newArray);
    });
    setLoading(false);
    if (analysis) {
      setHistory(initialHistory);
      setPoints(initialPoints);
      setGameTime(initialGameTime);
      setMoveNumbers(initialMoveNumbers);
    } else startTimer();

    if (location.isOwner) {
      socket.emit("send-shuffle", {
        shuffle: firstShuffle,
        time: location.time,
        id: location.id,
      });
      localStorage.setItem("shuffle", JSON.stringify(firstShuffle));
    }
  }, []);

  const startTimer = () => {
    timer = setInterval(() => {
      const reducedBonus = bonus - 1;
      setGameTime((prev) => prev + 1);
      if (reducedBonus < 0) {
        setBonus(0);
      } else setBonus(reducedBonus);
    }, 1000);
  };

  useEffect(() => {
    socket.on("write-to-end-list", ({ player, score }) => {
      setPlayersOnEndGame((prev) => [...prev, { name: player, score: score }]);
    });

    return () => {
      socket.off("write-to-end-list");
    };
  }, []);

  useEffect(() => {
    if (gameNumber > 0) {
      const initialShuffle = shuffleCards();
      setShuffle(shuffle);

      Object.entries(initialShuffle).map(([key, item]) => {
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
    if (isGameEnded) {
      clearInterval(timer);

      if (location.time === Number.MAX_SAFE_INTEGER) {
        setPlayersOnEndGame((prev) => [
          ...prev,
          { name: location.players[0].username, score: points + bonus },
        ]);
      } else {
        socket.emit("end-game", { 
          room: JSON.parse(localStorage.getItem("roomData")).name,
          player: JSON.parse(localStorage.getItem("user")).username,
          score: points + bonus 
        });
      }
    }
  }, [isGameEnded]);

  useEffect(() => {
    if (!isLoading && !analysis) {
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

      if (gameTime === endTime) {
        setGameEnd(true);
        setTimeout(() => setGameLoaded(true), 100);
      }

      if (possibleMoves === 0) {
        setGameEnd(true);
        setTimeout(() => setGameLoaded(true), 100);
      } else setPossibleMoveNumbers(possibleMoves);
    }
  }, [moveNumbers, isLoading, gameNumber, gameTime]);

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
      setDraggingCard,
      analysis
    );
  };

  const playMusicFunc = () => {
    setPlayMusic(true);
  };

  useEffect(() => {
    window.addEventListener("click", playMusicFunc);
    return () => {
      window.removeEventListener("click", playMusicFunc);
    };
  }, []);

  if (isLoading) return <div>loading...</div>;

  var styles = require("./GameView.module.css");

  if (localStorage.getItem("isLogged")) {
    if (localStorage.getItem("motiveCss") === "cyberpunk") {
      styles = require("./GameViewCyberpunk.module.css");
    }
  }

  if (isGameLoaded) {
    const finalColumnsArr = Object.keys(finalColumns).map(function (key) {
      return finalColumns[key].get;
    });

    localStorage.removeItem("shuffle");

    const result = gameResult(finalColumnsArr);

    playersOnEndGame.sort((a, b) => b.score - a.score);
    return (
      <WinLoseBoard
        points={points + bonus}
        gameId={location.id}
        gameTime={gameTime}
        history={history}
        players={playersOnEndGame}
        shuffle={shuffle}
        cardset_id={cardset_id}
        effect={effect}
        volume={volume}
        gameResult={result}
        moveNumbers={moveNumbers}
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
      {analysis && (
        <button
          onClick={() => setGameAnalysis(false)}
          className={styles.analysisBackButton}
        >
          <FiArrowLeft />
        </button>
      )}
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
            analysis={analysis}
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
            isMulti={location.isMulti}
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
            analysis={analysis}
          />
        </div>
        <MainColumns
          mainColumns={mainColumns}
          setDraggingCard={setDraggingCard}
          handleDrop={handleDrop}
          draggingCard={draggingCard}
          effect={effect}
          analysis={analysis}
        />
        <Statistics
          points={points}
          gameTime={gameTime}
          possiblemoveNumbers={possiblemoveNumbers}
          moveNumbers={moveNumbers}
          analysis={analysis}
        />
      </div>
    </DndProvider>
  );
}

export default GameView;
