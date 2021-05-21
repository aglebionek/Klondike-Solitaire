import React from "react";
import './GameView.css';



class GameView extends React.Component {

  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };
  
  moves = 0;
  points = 0;
  timeBonus = 1200;

  

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.timeBonus--;
      if(this.timeBonus < 0){
        this.timeBonus = 0;
      }
      this.setState({
        timerTime: Date.now() - this.state.timerStart        
      });
    }, 1000);

  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
    this.points=this.points+this.timeBonus;
  };

  componentDidMount(){
    this.startTimer();
  };

  getBack() {
    if(this.points - 20 > 0){
    this.points = this.points - 20;
    }
    else
    {
    this.points = 0;
    }
  };

  
  
  
  render(){
    const { timerTime } = this.state;
    const score = this.points;
    const moves = this.moves;
   
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
  return (
    
    <div className="App">
    <div className="menu_top">
        <header className="widok_gry_header">
            <h3 className="klondike_title">Klondike</h3>
        </header>
        <div className="points_time">
        <p className="score_points">Punkty: {score}</p>
        <p className="score_time">Czas: {minutes} : {seconds}</p>
        </div>

        </div>
        <div className="karty_container">
        <div className="karty_top">
        <img src="./images/sample_karta.jpg" alt="karta"></img>
        <img id="druga_top" src="./images/sample_karta.jpg" alt="karta"></img>
        <img src="./images/sample_karta.jpg" alt="karta"></img>
        <img src="./images/sample_karta.jpg" alt="karta"></img>
        <img src="./images/sample_karta.jpg" alt="karta"></img>
        <img id="ostatnia_karta" src="./images/sample_karta.jpg" alt="karta"></img>
        </div>

        <div className="karty_bottom">
        <img src="./images/sample_karta.jpg" alt="karta"></img>
        <img src="./images/sample_karta.jpg" alt="karta"></img>
        <img src="./images/sample_karta.jpg" alt="karta"></img>
        <img src="./images/sample_karta.jpg" alt="karta"></img>
        <img src="./images/sample_karta.jpg" alt="karta"></img>
        <img src="./images/sample_karta.jpg" alt="karta"></img>
        <img id="ostatnia_karta" src="./images/sample_karta.jpg" alt="karta"></img>
        </div>
        </div>
        <div className="bottom_section">
        <button className="undo_button" onClick={this.getBack} >Cofnij</button>
        <div className="info_section">
        <p className="moves_left">Ilość ruchów do wykonania: 1234</p>
        <p className="is_possible">Czy możliwe jest skończenie partii: TAK/NIE</p>
        <p className="moves_done">Ruchy: {moves}</p>

      </div>
      </div>
    </div>
  );
  
}}


export default GameView;