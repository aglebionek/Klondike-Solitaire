import React, { useState, useEffect } from "react";
import "./CreateRoom.css";
import Select from 'react-select';
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
      minutes: parseInt(evt.value),
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
  const selstyle ={
    menu: (menu_styles)=> ({...menu_styles, 
        background: '#66bb6ae1', 
        border: 'solid 1px #102542',
        
    }),
    option: (menuList_styles, state)=> ({...menuList_styles,
        color: '#102542',
        background: '#66bb6ae1',
        borderBottom: 'solid 1px #102542'
    }),
    singleValue: (singleValue_styles)=> ({...singleValue_styles,
        color: '#102542'
    }),
    control: (control_styles, state)=> ({...control_styles,
        width: '203px', 
        background: 'none', 
        border: '#102542',
        // eslint-disable-next-line no-dupe-keys
        border: state.isFocused ? 'solid 1px #102542' : 'solid 1px #102542',
        boxShadow: 'none',
        "&:hover": {
            border: 'solid 1px #102542'
        },
    }),
    dropdownIndicator: (dropdown_styles)=> ({...dropdown_styles, 
        color: 'inherit',
        "&:hover": {
            color: 'inherit',
        }
    }),
    indicatorSeparator: (indicator_styles)=> ({...indicator_styles, background: '#102542'}),
    placeholder: (placeholder_styles)=> ({...placeholder_styles, color: '#102542'}),
    input: (input_styles)=> ({...input_styles, color: '#102542'}),
    noOptionsMessage: (noOptions_styles)=> ({...noOptions_styles, color: '#102542'})

  };

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
            <button className='lobby__create-room-button'
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
