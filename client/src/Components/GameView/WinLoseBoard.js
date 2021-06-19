import React, { Component, useState } from "react";
import "./WinLose.css";
import GameView from "./GameView";
import Animation from "./game_end_animations/Animation";

import agent from '../../agent/agent';

class StatsBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.isFinished,
      players: props.players,
      gameId: props.gameId,
      points: props.points,
      gameTime: props.gameTime,
      history: props.history,
      shuffle: props.shuffle,
      cardset_id: props.cardset_id,
      effect: props.effect,
      isAnimation: true,
      volume: props.volume,
      gameResult: props.gameResult,
      moveNumbers: props.moveNumbers,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  saveScore = () => {
    agent.post("/game/insert-game-occur", {
      player_id: JSON.parse(localStorage.getItem("user")).id,
      game_id: this.gameId, 
      points: this.points, 
      completion_time: this.gameTime, 
      moves: this.moveNumbers, 
      starting_distribution: '', 
      is_win: this.result === 'win',
      is_lose: this.result === 'lose',
      is_draw: !(this.result === 'win' || this.result === 'lose'),
      key: 317 * (Math.floor(Math.random() * 100) + 1),
    });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ...this.state, isAnimation: false });
      this.showModal();
    }, 5000);
  }

  render() {
    if (this.state.isAnimation)
      return <Animation action={this.props.gameResult} />;
    return (
      <main>
        <Modal
          show={this.state.show}
          handleClose={() => {
            this.hideModal();
            this.saveScore();
            localStorage.removeItem("gameInfo");
          }}
          players={this.state.players}
          points={this.state.points}
          gameTime={this.state.gameTime}
          history={this.state.history}
          shuffle={this.state.shuffle}
          cardset_id={this.state.cardset_id}
          effect={this.state.effect}
          volume={this.state.volume}
          moveNumbers={this.state.moveNumbers}
          gameResult={this.state.gameResult}
        ></Modal>
      </main>
    );
  }
}

const Modal = ({
  handleClose,
  players,
  show,
  children,
  points,
  gameTime,
  history,
  shuffle,
  cardset_id,
  effect,
  volume,
  moveNumbers,
  gameResult,
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [gameAnalysis, setGameAnalysis] = useState(false);
  const SingleOrMulti = (players) => {
    if (players.length > 1) {
      return (
        <table id="players">
          <thead>
            <tr>
              <td>
                Gracz
              </td>
              <td>
                Wynik
              </td>
            </tr>
          </thead>
          <tbody>
            {
              players.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      );
    }
    else{
      return (
        <div>
          <div className="statistics">Punkty: {points}</div>
        </div>
      )
    }
  };
  if (gameAnalysis) {
    return (
      <GameView
        cardset_id={cardset_id}
        effect={effect}
        volume={volume}
        analysis
        history={history}
        shuffle={shuffle}
        points={points}
        gameTime={gameTime}
        moveNumbers={moveNumbers}
        setGameAnalysis={setGameAnalysis}
      />
    );
  }
  const minutes = Math.floor(gameTime / 60);
  let seconds = gameTime - 60 * minutes;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let minutesText = "Minut";
  let secondsText = "Sekund";
  if (minutes <= 4 && minutes >= 2) {
    minutesText = "Minut";
  }
  if (minutes === 1) {
    minutesText = "Minuta";
  }
  if (minutes <= 4 && minutes >= 2) {
    minutesText = "Sekundy";
  }
  if (seconds === 1) {
    secondsText = "Sekunda";
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}

        <div className="winlose">
          {gameResult === "win"
            ? "wygrałes"
            : gameResult === "lose"
            ? "Przegrałeś"
            : "Remis"}
        </div>

        {SingleOrMulti(players)}

        <div className="statistics">
          Twój czas:{" "}
          {minutes + " " + minutesText + " " + seconds + " " + secondsText}
        </div>

        <div>
          <a
            href="/"
            className="winloseboard__button-back"
            onClick={handleClose}
          >
            Zamknij
          </a>
          <button className="button" onClick={() => setGameAnalysis(true)}>
            Analiza rozgrywki
          </button>
        </div>
      </section>
    </div>
  );
};
export default StatsBoard;
