import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './JoinRoom.css';

import socket from './../socketConfig.js';

function JoinRoom () {
  const history = useHistory();
  const initialData = {
    name: 'test',
    players: 0
  }
  const [roomData, updateRoomData] = useState(initialData);

  useEffect(() => {
    socket.on('pass-room', ({ room, users }) => {
      const players = users.length;
  
      updateRoomData({
        name: room,
        players
      });
    });

    socket.emit('export-room');

    socket.on('start', () => {
      console.log('test')
      history.push('/game-view');
    });

    return () => {
      socket.off('start', () => {
        history.push('/game-view');
      });
      socket.off('pass-room');
    }

  }, []);

  return (
    <section className="joined-room">
      <h1>
        Dołączyłeś do pokoju: {roomData.name}
      </h1>
      <p>
        Liczba osób: {roomData.players}
      </p>
      <Link to="/multiplayer">
        <button onClick={() => socket.emit('lobby-leave')}>Wyjdź</button>
      </Link>
    </section>
  );
}

export default JoinRoom;