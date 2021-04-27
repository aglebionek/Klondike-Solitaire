import React from 'react';
import { Link } from 'react-router-dom';
import './LobbyMultiplayer.css';

function LobbyMultiplayer() {
    return (
      <>
        <div className="row">
          <div className="Multi">Tryb Wieloosobowy</div>
          <div className="ButtRoom">
            <Link to="/multiplayer/create-room">
              <button className="button">Stwórz nowy pokój</button>
            </Link>
          </div>
        </div>
        <div className="container">
        <div className="ID">ID</div>
        <div className="Name">NAZWA</div>
        <div className="Ppl">Osoby</div>
        </div>
        <div className="container1">
        <div className="Line"></div>
        <div className="row1">
        <div className="ID">1</div>
        <div className="Name">nazwa pokoju</div>
        <div className="Ppl1">2/2</div>
        <div className="butt">
          <button className="buttonjoin">Dołącz</button>
        </div>
        </div>
        <div className="Line"></div>
        <div className="row1">
        <div className="ID">1</div>
        <div className="Name">nazwa pokoju</div>
        <div className="Ppl1">2/2</div>
        <div className="butt">
          <button className="buttonjoin">Dołącz</button>
        </div>
        </div>
        <div className="Line"></div>
        <div className="row1">
        <div className="ID">1</div>
        <div className="Name">nazwa pokoju</div>
        <div className="Ppl1">2/2</div>
        <div className="butt">
          <button className="buttonjoin">Dołącz</button>
        </div>
        </div>
        <div className="Line"></div>
        <div className="row1">
        <div className="ID">1</div>
        <div className="Name">nazwa pokoju</div>
        <div className="Ppl1">2/2</div>
        <div className="butt">
          <button className="buttonjoin">Dołącz</button>
        </div>
        </div>
        <div className="Line"></div>
        <div className="row1">
        <div className="ID">1</div>
        <div className="Name">nazwa pokoju</div>
        <div className="Ppl1">2/2</div>
        <div className="butt">
          <button className="buttonjoin">Dołącz</button>
        </div>
        </div>
        <div className="Line"></div>
        <div className="row1">
        <div className="ID">1</div>
        <div className="Name">nazwa pokoju</div>
        <div className="Ppl1">2/2</div>
        <div className="butt">
          <button className="buttonjoin">Dołącz</button>
        </div>
        </div>
        <div className="Line"></div>
        </div>
      </>
    )
}
export default LobbyMultiplayer;
