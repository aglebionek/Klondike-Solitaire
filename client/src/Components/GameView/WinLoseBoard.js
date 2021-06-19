import React, { Component, useState } from "react";
import "./WinLose.css";
import GameView from "./GameView";
import Animation from "./game_end_animations/Animation";

class StatsBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.isFinished,
      players: props.players,
      points: props.points,
      gameTime: props.gameTime,
      history: props.history,
      shuffle: props.shuffle,
      cardset_id: props.cardset_id,
      effect: props.effect,
      isAnimation: true,
      volume: props.volume,
      gameReuslt: props.gameReuslt,
      moveNumbers: props.moveNumbers,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
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
      return <Animation action={this.props.gameReuslt} />;
    return (
      <main>
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          players={this.players}
          points={this.state.points}
          gameTime={this.state.gameTime}
          history={this.state.history}
          shuffle={this.state.shuffle}
          cardset_id={this.state.cardset_id}
          effect={this.state.effect}
          volume={this.state.volume}
          moveNumbers={this.state.moveNumbers}
          gameReuslt={this.state.gameReuslt}
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
  gameReuslt,
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [gameAnalysis, setGameAnalysis] = useState(false);
  const SingleOrMulti = (players) => {
    if (players > 1) {
      return (
        <table id="players">
          <tr>
            <th>
              {" "}
              <button class="button"> player1 </button>{" "}
            </th>
            <th>
              {" "}
              <button class="button"> player2 </button>
            </th>
            <th>
              {" "}
              <button class="button"> player3 </button>{" "}
            </th>
            <th>
              {" "}
              <button class="button"> player4 </button>{" "}
            </th>
          </tr>
        </table>
      );
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

  var styles = require("./WinLose.css");
  if(localStorage.getItem('isLogged')) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
      styles = require("./WinLoseCyberpunk.css");
    }
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}

        {SingleOrMulti(players)}

        <div class="winlose">
          {gameReuslt === "win"
            ? "wygrałes"
            : gameReuslt === "lose"
            ? "Przegrałeś"
            : "Remis"}
        </div>
        <div class="statistics">Punkty: {points}</div>
        <div class="statistics">
          Twój czas:{" "}
          {minutes + " " + minutesText + " " + seconds + " " + secondsText}
        </div>

        <table id="options">
          <tr>
            <th>
              <a
                href="/"
                class="winloseboard__button-back"
                onClick={handleClose}
              >
                Zamknij
              </a>
            </th>
            <th>
              <button class="button" onClick={() => setGameAnalysis(true)}>
                Analiza rozgrywki
              </button>
            </th>
          </tr>
        </table>
      </section>
    </div>
  );
};
export default StatsBoard;
