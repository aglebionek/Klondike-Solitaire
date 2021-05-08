import React from 'react';
import './GameViewTemplate.css';
import Board from './board';
import Card from './card.js';


const score = 1234;
const stopwatch = '12:34';

function Board1() {
 
  return (
    <div className="App">
    <div className="menu_top">
    <header className="widok_gry_header">
        <h3 class="klondike_title">Klondike</h3>
      </header>
      <div className="points_time">
      <p className="score_points">Punkty: {score}</p>
      <p className="score_time">Czas: {stopwatch}</p>
      </div>
      </div>
      <div className="karty_container">
      <div className="karty_top">
      <div className="flexbox-draw">
      <Board id="board-draw" className="board">
      
                    <Card id="card-1" className="card v3 diamonds cyberpunk" draggable="true">     
                   
                    </Card>
      </Board>
      <Board id="board-draw2" className="board">
                    <Card id="card-2" className="card v5 spades cyberpunk" draggable="true">     
                    
                    </Card>
      </Board>
     
      </div>
      
      <div className="flexbox-blank">
      <Board id="board-3" className="board">
                    <Card id="card-3" className="card v9 clubs cyberpunk" draggable="true">     
                    </Card>
                  
      </Board>
      <Board id="board-4" className="board">
                    <Card id="card-4" className="card v9 hearts cyberpunk" draggable="true">     
                    </Card>
      </Board>
      <Board id="board-5" className="board">

                    <Card id="card-5" className="card vA diamonds cyberpunk" draggable="true">     
                    </Card>
                  
      </Board>
      <Board id="board-6" className="board">
                    <Card id="card-6" className="card v6 hearts cyberpunk" draggable="true">     
                    </Card>
                    
      </Board>
      </div>
     
      </div>

     <div className="karty_bottom">
      <div className="flexbox-bottom">
      <Board id="board-3" className="board">
                    <Card id="card-7" className="card vQ hearts cyberpunk" draggable="true">     
                    </Card>
                  
      </Board>
      <Board id="board-4" className="board">
                    <Card id="card-8" className="card v5 hearts cyberpunk" draggable="true">     
                    </Card>
      </Board>
      <Board id="board-5" className="board">

                    <Card id="card-9" className="card v4 hearts cyberpunk" draggable="true">     
                    </Card>
                  
      </Board>
      <Board id="board-6" className="board">  
                    <Card id="card-10" className="card vJ clubs cyberpunk" draggable="true">     
                    </Card>
                    
      </Board>
      <Board id="board-6" className="board">
                    <Card id="card-11" className="card vK hearts cyberpunk" draggable="true">     
                    </Card>
                    <Card id="card-15" className="card vQ hearts cyberpunk" draggable="true">     
                    </Card>
      </Board>
      <Board id="board-6" className="board">
                    <Card id="card-12" className="card v9 hearts cyberpunk" draggable="true">     
                    </Card>
                    
      </Board>
      <Board id="board-6" className="board">
                    <Card id="card-13" className="card v2 hearts cyberpunk" draggable="true">     
                    </Card>
      </Board>
   
      </div>
      </div>
      </div>
      <div className="bottom_section">
      <button className="undo_button">Cofnij</button>
      <div className="info_section">
      <p className="moves_left">Ilość ruchów do wykonania: 1234</p>
      <p className="is_possible">Czy możliwe jest skończenie partii: TAK/NIE</p>
      <p className="moves_done">Ruchy: 1234</p>

      </div>
      

      </div>
    </div>
  );
}

export default Board1;