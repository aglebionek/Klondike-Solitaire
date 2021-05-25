import './GameView.css';
import buttonMenuClick from '../../soundtrack/SoundDesign/menu_click.mp3';
import buttonHoverSound from '../../soundtrack/SoundDesign/menu_hover.mp3';
import buttonUndoSound from '../../soundtrack/SoundDesign/button_undo.mp3';
import GameMusic from './GameMusicKlondike';

function GameView({cardset_id,effect, volume}) {
  const score = 1234;
  const stopwatch = '12:34';  

  const buttonSound = () => {
      let beep = new Audio(buttonMenuClick);
      beep.volume=(effect/100);
      beep.play();   
  }
  const buttonHover = () => {
      let beep = new Audio(buttonHoverSound);
      beep.volume=(effect/100);
      beep.play();   
  }
  const buttonUndo = () => {
    let beep = new Audio(buttonUndoSound);
    beep.volume=(effect/100);
    beep.play();   
}

  return (
    <div className="App">
      {volume>0 && <GameMusic musicVolume={volume} cardset={cardset_id}/> }
    <div className="menu_top">
        <a className="game-view__back" href="./..">
          &#129044;
        </a>
        <header className="widok_gry_header">
            <h3 className="klondike_title">Klondike</h3>
        </header>
        <div className="points_time">
        <p className="score_points">Punkty: {score}</p>
        <p className="score_time">Czas: {stopwatch}</p>
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
        <button className="undo_button" onMouseDown={buttonUndo} onMouseOver={buttonHover}>Cofnij</button>
        <div className="info_section">
        <p className="moves_left">Ilość ruchów do wykonania: 1234</p>
        <p className="is_possible">Czy możliwe jest skończenie partii: TAK/NIE</p>
        <p className="moves_done">Ruchy: 1234</p>

      </div>
      </div>
    </div>
  );
}

export default GameView;