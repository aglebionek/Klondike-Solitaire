import React, { useState, useEffect } from "react";
import "./CreateRoom.css";

import { Link } from 'react-router-dom';
import socket from './../socketConfig.js';
import { useHistory } from "react-router-dom";

const player = 'player';

/*
  TODO:
    - obsługa refresha podczas tworzenia pokoju
*/

function CreateRoom() {
  const history = useHistory();
  const initialRoomData = {
    isCreated: false,
    isBeingModified: false,
    name: "Nowy pokój",
    minutes: 5
  };

  const [roomData, updateRoomData] = useState(initialRoomData);
  const [roomNameBuffer, updateRoomBuffer] = useState(roomData.name);

  const handleNameChange = (evt) => {
    updateRoomData((prevData) => ({
      ...prevData,
      name: evt.target.value,
    }));
  };

  const handleTimeChange = (evt) => {
    updateRoomData((prevData) => ({
      ...prevData,
      minutes: evt.target.value,
    }));
  };

  const handleRoomCreateButton = (evt) => {
    evt.preventDefault();

    if(roomData.isBeingModified){
      socket.emit('lobby-modify', {
        room: roomNameBuffer,
        newName: roomData.name
      });
    }
    else{
      socket.emit('lobby-join', { 
        player, 
        room: roomData.name 
      });
    }

    updateRoomData((prevData) => ({
      ...prevData,
      isCreated: true,
      isBeingModified: false,
    }));

    updateRoomBuffer(roomData.name);
  };

  const handleRoomModifyButton = (evt) => {
    evt.preventDefault();

    updateRoomData((prevData) => ({
      ...prevData,
      isBeingModified: true,
    }));
  };

  useEffect(() => {
    socket.on('start', () => {
      console.log('test')
      history.push('/game-view');
    });

    return () => {
      socket.off('start', () => {
        console.log('test')
        history.push('/game-view');
      });
    }
  }, []);

  if (roomData.isCreated && !roomData.isBeingModified) {
    return (
      <section className="lobby__container">
        <div className="lobby__inner-container">
          <h1 className="lobby__headline">Pokój utworzony</h1>
          <div className="lobby__created-data">
            <p>Nazwa:</p>
            <p>{roomData.name}</p>
          </div>
          <div className="lobby__created-data">
            <p>Czas gry (w minutach):</p>
            <p>{roomData.minutes}</p>
          </div>
          <div className="lobby__created-data__btns">
            <Link to="/multiplayer">
              <button onClick={() => socket.emit('lobby-leave')}>Rozwiąż</button>
            </Link>
            <button onClick={handleRoomModifyButton}>Modyfikuj</button>
            <button onClick={() => socket.emit('game-start', {room: roomData.name})}>Rozpocznij grę</button>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="lobby__container">
        <a className="multiplayer__back" href="/multiplayer">
          &#129044;
        </a>
        <div className="lobby__inner-container">
          <h1 className="lobby__headline">Tworzenie pokoju</h1>
          <form
            onSubmit={handleRoomCreateButton}
            className="lobby__create-room-form"
            action=""
          >
            <div>
              <label htmlFor="room-name">Nazwa</label>
              <input
                onChange={handleNameChange}
                value={roomData.name}
                id="room-name"
                name="room-name"
                type="text"
                required
              />
            </div>
            <div>
              <label htmlFor="room-name">Czas gry</label>
              <select
                onChange={handleTimeChange}
                value={roomData.minutes}
                id="game-time"
                name="game-time"
                required
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <button>{roomData.isBeingModified ? "Zatwierdź modyfikację" : "Utwórz"}</button>
          </form>
        </div>
      </section>
    );
  }
}

export default CreateRoom;
