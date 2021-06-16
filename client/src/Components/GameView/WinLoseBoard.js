import React, { Component, useState } from "react";
import "./WinLose.css";
import GameView from "./GameView";

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
      volume: props.volume,
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

  render() {
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
        ></Modal>
        <button onClick={this.showModal}> show </button>
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
      />
    );
  }
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}

        {SingleOrMulti(players)}

        <div class="winlose">Wygrana</div>
        <div class="statistics">Punkty: {points}</div>
        <div class="statistics">Twój czas: {gameTime}</div>

        <table id="options">
          <tr>
            <th>
              <button class="button" onClick={handleClose}>
                Zamknij
              </button>
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
