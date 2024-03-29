import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import agent from '../../agent/agent';

// socket client
import socket from './socketConfig';

function LobbyMultiplayer() {
  
  const [users, setUsers] = useState([]);
  const [player, setPlayer] = useState('');

  const joinRoom = (evt) => {
    const room = evt.target.getAttribute('data-room');

    socket.emit('lobby-join', { player, room });
    socket.emit('export-users');
  }

  const getRooms = () => {
    const roomDict = {};

    for(const user of users){
      const { room } = user;

      if(!roomDict.hasOwnProperty(room)){
        roomDict[room] = {
          name: room,
          players: 1
        }
      }
      else{
        roomDict[room].players++;
      }
    }

    return roomDict;
  }

  useEffect(() => {
    socket.on('pass-users', (usersArr) => {
      setUsers(usersArr);
    });


    if (localStorage.getItem("user") !== null) {
      setPlayer(JSON.parse(localStorage.getItem("user")).username);
    }
    else {
      setPlayer("Gość");
    }

    socket.emit('export-users');
    localStorage.removeItem("roomData");

    return () => {
      socket.off('pass-users', (usersArr) => {
        setUsers(usersArr);
      });
    }
  });

  return (
    <>
    <div className="multiplayer__container">
      <div className="multiplayer__back-div">
        <a className="multiplayer__back" href="./..">
          &#129044;
        </a>
      </div>
      <div className="row">
        <div className="Multi">Tryb Wieloosobowy</div>
      </div>
      <div className="row">
      <div className="ButtRoom">
          <Link to={`/create-room`}>
            <button id = "create-room-btn" className="button-lobby">Stwórz nowy pokój</button>
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
        {Object.values(getRooms()).map((room, index) => (
          <div key={index} className="row1">
            <div className="ID">{index + 1}</div>
            <div className="Name">{room.name}</div>
            <div className="Ppl1">{room.players}</div>
            <div className="butt">
              <Link to={`/game-lobby`}>
                <button id = "join-btn" className="buttonjoin" data-room={room.name} onClick={joinRoom}>Dołącz</button>
              </Link>
            </div>
          </div>
        ))}
        <div className="Line"></div>
      </div>
      </div>
    </>
  );
}
export default ThemeSelector(LobbyMultiplayer);
