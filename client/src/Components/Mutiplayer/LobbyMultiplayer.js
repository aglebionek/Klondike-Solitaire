import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from '../../agent/agent';

// socket client
import socket from './socketConfig';


function LobbyMultiplayer({userId}) {
  let player = 'player';
  
  agent.get(`/account/${userId}`).then(({ data }) => {
    player = data.username;
  });
  
  const [users, setUsers] = useState([]);

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

    socket.emit('export-users');

    return () => {
      socket.off('pass-users', (usersArr) => {
        setUsers(usersArr);
      });
    }
  });

  var styles = require("./LobbyMultiplayer.css");
  if(localStorage.getItem('isLogged')) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
      styles = require("./LobbyMultiplayerCyberpunk.css");
    }
  }

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
        {Object.values(getRooms()).map((room, index) => (
          <div key={index} className="row1">
            <div className="ID">{index + 1}</div>
            <div className="Name">{room.name}</div>
            <div className="Ppl1">{room.players}</div>
            <div className="butt">
              <Link to={`/game-lobby`}>
                <button className="buttonjoin" data-room={room.name} onClick={joinRoom}>Dołącz</button>
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
export default LobbyMultiplayer;
