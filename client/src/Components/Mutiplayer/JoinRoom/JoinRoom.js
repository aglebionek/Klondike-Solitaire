import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './JoinRoom.css';

import socket from './../socketConfig.js';
import agent from '../../../agent/agent';

function JoinRoom () {
  const history = useHistory();
  const initialData = {
    name: 'test',
    players: [],
  }
  const [roomData, updateRoomData] = useState(initialData);

  useEffect(() => {
    socket.on('pass-room', ({ room, users }) => {
      updateRoomData({
        name: room,
        players: users,
      });
    });

    socket.on('kicked', () => {
      document.querySelector('.lobby__modal-container').classList.add('active');
    });

    socket.emit('export-room');
    socket.emit('export-users');

    socket.on('start', ({ time, id }) => {
      localStorage.setItem("gameInfo", {
        startDate: new Date(),
        timeLeft: time * 60,
        roomName: roomData.name,
        id,
        players: roomData.players,
        handicap: 0
      });

      history.push({
        pathname: '/game-view',
        time,
        players: roomData.players,
        id: id,
        handicap: 0
      });
    });

    return () => {
      socket.off('start');
      socket.off('pass-room');
    }
  });



  return (
    <section className="joined-room">
      <div className="lobby__modal-container">
        <div id = "lobby_modal" className="lobby__modal">
          <p>Wyrzucono cię z pokoju</p>
          <button id = "accept-multiplayer-game" onClick={() => { history.push('/multiplayer') }}>Potwierdź</button>
        </div>
      </div>
      <div className="lobby__inner-container">
          <div className="lobby__headline">Widok lobby</div>
          <div className="lobby__created-data">
            <p>Nazwa:</p>
            <p>{roomData.name}</p>
          </div>
          <div id = {"lobby__created-data_players"} className="lobby__created-data">
            <p>Gracze:</p>
            <ul>
              {
                Object.values(roomData.players).map((player, index) => (
                  <li key={index} className="player-row">
                    <div>
                      <p>{player.username}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="lobby__created-data__btns lobby-extra-button-class">
            <Link to="/multiplayer">
              <button id="lobby-leave" onClick={() => socket.emit('lobby-leave')}>Wyjdź</button>
            </Link>
          </div>
        </div>
    </section>
  );
}

export default JoinRoom;