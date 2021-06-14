import React, { useState, useEffect } from "react";
import "./CreateRoomCyberpunk.css";
import Select from 'react-select';
import { Link } from 'react-router-dom';
import socket from './../socketConfig.js';
import { useHistory } from "react-router-dom";
import agent from '../../../agent/agent';

function CreateRoom() {
  const history = useHistory();

  const SECONDS_IN_MINUTE = 60;
  
  const initialRoomData = {
    isCreated: false,
    isBeingModified: false,
    name: "Nowy pokój",
    minutes: 5,
    players: [],
    id: 0,
  };

  const [roomData, updateRoomData] = useState(() => {
    const storageValue = localStorage.getItem('roomData');

    return storageValue !== null
      ? JSON.parse(storageValue)
      : initialRoomData;
  });

  const [roomNameBuffer, updateRoomBuffer] = useState(roomData.name);
  const [player, setPlayer] = useState(() => (JSON.parse(localStorage.getItem("user"))).username);

  const handleNameChange = (evt) => {
    updateRoomData((prevData) => ({
      ...prevData,
      name: evt.target.value,
    }));
  };

  const handleTimeChange = (evt) => {
    updateRoomData((prevData) => ({
      ...prevData,
      minutes: parseInt(evt.value),
    }));
  };

  const handleRoomCreateButton = (evt) => {
    evt.preventDefault();

    setTimeout(() => {
      socket.emit('export-room');
      socket.emit('export-users');
    }, 10);

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
        room: roomData.name,
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
    let id;

    const start = new Date();
    const now = start.toISOString().slice(0, 19).replace('T', ' ');
    let then = new Date();

    then.setMinutes(start.getMinutes() + roomData.minutes);
    then = then.toISOString().slice(0, 19).replace('T', ' ');

    agent.post("/game/insert-game", {
      start: now,
      end: then
    })

    agent
      .post("/game/get-last-id")
      .then(res => res.data)
      .then(data => {
        localStorage.setItem("gameInfo", JSON.stringify({
          startDate: new Date(),
          time: roomData.minutes * SECONDS_IN_MINUTE,
          roomName: roomData.name,
          gameId: data,
          players: roomData.players,
        }));
    
        socket.emit('game-start', {
          room: roomData.name,
          time: roomData.minutes * SECONDS_IN_MINUTE,
          id: data
        });
      })
  }

  const selstyle ={
    menu: (menu_styles)=> ({...menu_styles, 
        background: 'black', 
        border: 'solid 1px rgba(0, 214, 252, 0.6)',
        
    }),
    option: (menuList_styles, state)=> ({...menuList_styles,
        color: 'rgba(0, 214, 252, 0.9)',
        background: 'black',
        textShadow: state.isFocused ? '0px 0px 10px rgba(0, 214, 252, 1), 0px 0px 10px rgba(0, 214, 252, 1)' : 'none',
        "&:hover": {
            background: 'black',
            textShadow: '0px 0px 10px rgba(0, 214, 252, 1), 0px 0px 10px rgba(0, 214, 252, 1)'
        }
    }),
    singleValue: (singleValue_styles)=> ({...singleValue_styles,
        color: 'rgba(0, 214, 252, 0.9)'
    }),
    control: (control_styles, state)=> ({...control_styles,
        width: '203px', 
        background: 'none', 
        border: 'solid 1px rgba(0, 214, 252, 0.6)',
        border: state.isFocused ? 'solid 1px rgba(0, 214, 252, 0.6)' : 'solid 1px rgba(0, 214, 252, 0.6)',
        boxShadow: state.isFocused ? '0px 0px 10px rgba(0, 214, 252, 1)' : 'none',
        "&:hover": {
            border: 'solid 1px rgba(0, 214, 252, 0.6)',
            boxShadow: '0px 0px 10px rgba(0, 214, 252, 1)'
        },
    }),
    dropdownIndicator: (dropdown_styles)=> ({...dropdown_styles, 
        color: 'inherit',
        "&:hover": {
            color: 'inherit',
            textShadowColor: 'rgba(0, 214, 252, 1)',
            textShadowRadius: 10
        }
    }),
    indicatorSeparator: (indicator_styles)=> ({...indicator_styles, background: 'rgba(0, 214, 252, 0.6)'}),
    placeholder: (placeholder_styles)=> ({...placeholder_styles, color: 'rgba(0, 214, 252, 0.9)'}),
    input: (input_styles)=> ({...input_styles, color: 'rgba(0, 214, 252, 0.9)'}),
    noOptionsMessage: (noOptions_styles)=> ({...noOptions_styles, color: 'rgba(0, 214, 252, 0.9)'})
  };

  useEffect(() => {
    socket.on('pass-room', ({ room, users }) => {
      updateRoomData((prevData) => ({
        ...prevData,
        name: room,
        players: users,
      }));

      localStorage.setItem('roomData', JSON.stringify(roomData));
    });

    socket.on('start', ({ time, id }) => {
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

  if (roomData.isCreated && !roomData.isBeingModified) {
    return (
      <section className="lobby__container">
        <div className="lobby__inner-container">
          <div className="lobby__headline">Pokój utworzony</div>
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
        <a className="lobby__back" href="/multiplayer">
          &#129044;
        </a>
        <div className="lobby__inner-container">
          <div className="lobby__headline">
            {roomData.isBeingModified ? "Modyfikowanie pokoju" : "Tworzenie pokoju"}
          </div>
          <form
            onSubmit={handleRoomCreateButton}
            className="lobby__create-room-form"
            action=""
          >
            <div>
              <label className='lobby__label' htmlFor="room-name">Nazwa pokoju</label>
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
              <label className='lobby__label' htmlFor="room-name">Czas gry (w minutach):</label>  
              <Select id="game-time" name="game-time"
                options={[
                  { value: '1', label: '1' },
                  { value: '5', label: '5' },
                  { value: '10', label: '10' },
                  { value: '15', label: '15' },
                  { value: '20', label: '20' }
                ]}
                onChange={handleTimeChange}
                value={{value: roomData.minutes, label: roomData.minutes}}
                styles={selstyle} 
                required
              />
            </div>
            <button>
              {roomData.isBeingModified ? "Zatwierdź modyfikację" : "Utwórz"}
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default CreateRoom;
