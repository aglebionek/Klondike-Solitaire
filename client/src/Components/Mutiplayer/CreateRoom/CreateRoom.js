import React, { useState } from "react";
import "./CreateRoom.css";

import { Link } from 'react-router-dom';
import socket from './../socketConfig.js';

const player = 'player';

/*
  TODO:
    - obsługa refresha podczas tworzenia pokoju
*/

function CreateRoom() {
  const initialRoomData = {
    isCreated: false,
    isBeingModified: false,
    name: "Nowy pokój",
  };

  const [roomData, updateRoomData] = useState(initialRoomData);
  const [roomNameBuffer, updateRoomBuffer] = useState(roomData.name);

  const handleNameChange = (evt) => {
    updateRoomData((prevData) => ({
      ...prevData,
      name: evt.target.value,
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

  if (roomData.isCreated && !roomData.isBeingModified) {
    return (
      <section className="lobby__container">
        <div className="lobby__inner-container">
          <h1 className="lobby__headline">Pokój utworzony</h1>
          <div className="lobby__created-data">
            <p>Nazwa:</p>
            <p>{roomData.name}</p>
          </div>
          <div className="lobby__created-data__btns">
            <Link to="/multiplayer">
              <button onClick={() => socket.emit('lobby-leave')}>Rozwiąż</button>
            </Link>
            <button onClick={handleRoomModifyButton}>Modyfikuj</button>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="lobby__container">
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
            <button>{roomData.isBeingModified ? "Zatwierdź modyfikację" : "Utwórz"}</button>
          </form>
        </div>
      </section>
    );
  }
}

export default CreateRoom;
