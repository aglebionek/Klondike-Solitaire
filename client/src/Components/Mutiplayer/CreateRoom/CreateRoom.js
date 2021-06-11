import React, { useState, useEffect } from "react";
import "./CreateRoom.css";

import { Link } from 'react-router-dom';
import socket from './../socketConfig.js';
import { useHistory } from "react-router-dom";
import agent from '../../../agent/agent';



function CreateRoom({userId}) {
  const history = useHistory();
  let player = 'player';

  const SECONDS_IN_MINUTE = 60;
  
  agent.get(`/account/${userId}`).then(({ data }) => {
    player = data.username;
  })
    .catch((error) =>{
      console.log(error.response.data)
  });
  const initialRoomData = {
    isCreated: false,
    isBeingModified: false,
    name: "Nowy pokój",
    minutes: 5,
    players: []
  };
  console.log(initialRoomData)
  const [roomData, updateRoomData] = useState(() => {
    const storageValue = localStorage.getItem('roomData');

    return storageValue !== null
      ? JSON.parse(storageValue)
      : initialRoomData;
  });
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
      minutes: parseInt(evt.target.value),
    }));
  };

  const handleRoomCreateButton = (evt) => {
    evt.preventDefault();

    updateRoomData((prevData) => ({
      ...prevData,
      isCreated: true,
      isBeingModified: false,
    }));

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

    updateRoomBuffer(roomData.name);
  };

  const handleRoomModifyButton = (evt) => {
    evt.preventDefault();

    updateRoomData((prevData) => ({
      ...prevData,
      isBeingModified: true,
    }));
  };

  const handleGameBegin = () => {
    socket.emit('game-start', {
      room: roomData.name,
      time: roomData.minutes * SECONDS_IN_MINUTE
    });
  }

  useEffect(() => {
    socket.on('pass-room', ({ room, users }) => {
      updateRoomData((prevData) => ({
        ...prevData,
        name: room,
        players: users
      }));

      localStorage.setItem('roomData', JSON.stringify(roomData));
    });

    socket.on('start', ({ time }) => {
      history.push({
        pathname: '/game-view',
        time,
        players: roomData.players
      });
    });

    return () => {
      socket.off('start');
      socket.off('pass-room');
    }
  });

  if (roomData.isCreated && !roomData.isBeingModified) {
    return (
      <section className="lobby__container">
        <div className="lobby__inner-container">
          <h1 className="lobby__headline">Pokój utworzony</h1>
          <div className="lobby__created-data">
            <p>Nazwa:</p>
            <p id={'Name'}>{roomData.name}</p>
          </div>
          <div className="lobby__created-data">
            <p>Czas gry (w minutach):</p>
            <p id={'Minutes'}>{roomData.minutes}</p>
          </div>
          <div className="lobby__created-data">
            <p>Gracze:</p>
            <ul>
              {
                Object.values(roomData.players).map((player, index) => (
                  <li key={index} className="player-row">
                    <div>
                      <p id={"PUsername"}>{player.username}</p>
                      <button onClick={() => socket.emit("kick", { player })}>x</button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="lobby__created-data__btns">
            <Link to="/multiplayer" onClick={() => {
                socket.emit('lobby-leave');
                localStorage.removeItem('roomData');
              }}>
                <button>
                  Rozwiąż
                </button>
            </Link>
            <button onClick={handleRoomModifyButton} id={'Modify'}>Modyfikuj</button>
            <button onClick={handleGameBegin}>Rozpocznij grę</button>
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
          <h1 className="lobby__headline">
            {roomData.isBeingModified ? "Modyfikowanie pokoju" : "Tworzenie pokoju"}
          </h1>
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
              <label htmlFor="room-name">Czas gry (w minutach):</label>
              <select
                onChange={handleTimeChange}
                value={roomData.minutes}
                id="game-time"
                name="game-time"
                required
              >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <button 
              onClick={() => setTimeout(() => {
                  socket.emit('export-room');
                  socket.emit('export-users');
                } 
                , 10
              )} // async loading hack
            >
              {roomData.isBeingModified ? "Zatwierdź modyfikację" : "Utwórz"}
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default CreateRoom;
