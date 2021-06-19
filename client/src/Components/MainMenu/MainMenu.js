import React, { useState, useEffect } from "react";
import "./MainMenu.css";
import Dropdown from "./Dropdown";
import { useHistory } from "react-router-dom";
import buttonMenuClick from '../../soundtrack/SoundDesign/menu_click.mp3';
import buttonHoverSound from '../../soundtrack/SoundDesign/menu_hover.mp3';
import agent from '../../agent/agent.js';

function MainMenu( {effect, handleButton} ) {
    const history = useHistory();
    const [isLogged, setLog] = useState(false);
    const [user, updateUser] = useState(() => {
        const storageValue = localStorage.getItem('user');
    
        return storageValue !== null
          ? {
              id: (JSON.parse(storageValue)).id,
              name: (JSON.parse(storageValue)).username,
          }
          : {
              id: 0,
              name: "Gość"
          };
    });

    const buttonSound = () => {
            let beep = new Audio(buttonMenuClick);
            beep.volume=(effect/100);
            beep.play();   
    }
    const buttonHover = () => {
            let beep = new Audio(buttonHoverSound);
            beep.volume=(effect/100);
            beep.play();   
    }

    const handleLogButton = (e) => {
        e.preventDefault();

        if(isLogged){
                agent.post("auth/logout")
                .then(() => {
                    setLog(false);
                    localStorage.setItem('isLogged', false);
                    localStorage.removeItem('user');
                })
                
            return;
        }

        history.push('login');
    }

    const startSingleGame = () => {
        if(user.name !== "Gość"){
            agent.post("/game/insert-game", {
                start: new Date(),
                time: 600 // incorrect value for tests
            });

            agent
                .post("/game/get-last-id")
                .then(res => res.data)
                .then(data => {
                    history.push({
                        pathname: '/game-view', 
                        time: Number.MAX_SAFE_INTEGER, 
                        players: [
                            {
                                id: user.id,
                                username: user.name,
                                room: null,
                                inGame: true
                            }
                        ], 
                        id: data,
                        handicap: 0,
                        isMulti: false
                    });
                });
        }

        else{
            history.push({
                pathname: '/game-view', 
                time: Number.MAX_SAFE_INTEGER, 
                players: [
                    {
                        id: user.id,
                        username: user.name,
                        room: null,
                        inGame: true
                    }
                ], 
                id: undefined,
                handicap: 0,
                isMulti: false
                
            });
        }
    }
    

    useEffect(() => {
          agent.get("auth/verify")
          .then(() => {
            setLog(true);
          })
          .catch(() => {
            setLog(false);
          });
    }, []);

    return (<>
        <div className='main-menu'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <div className='main-menu__top-bar'>
                <Dropdown eff={effect}/>
                <div>
                    <button onClick={handleLogButton} onMouseOver={buttonHover} onMouseDown={buttonSound}>
                        {isLogged ?  'WYLOGUJ' : 'LOGOWANIE / REJESTRACJA'}
                    </button>
                </div>
            </div>

            <div className='main-menu__main-elements'>
                <div className='main-elements__title'>
                    <h1>Pasjans Klondike</h1>
                </div>
                <div className='main-elements__buttons'>
                    <button onMouseOver={buttonHover} onMouseDown={buttonSound} onClick={startSingleGame}>JEDNOOSOBOWA</button>
                    <button onMouseOver={buttonHover} onMouseDown={buttonSound} onClick={() => history.push('multiplayer')}>WIELOOSOBOWA</button>
                </div>
            </div>   
        </div>   
   </>);
}

export default MainMenu;