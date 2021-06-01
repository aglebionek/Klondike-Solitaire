import React, { useState, useEffect } from "react";
import "./MainMenuCyberpunk.css";
import Dropdown from "./Dropdown";
import { useHistory } from "react-router-dom";
import buttonMenuClick from '../../soundtrack/SoundDesign/menu_click.mp3';
import buttonHoverSound from '../../soundtrack/SoundDesign/menu_hover.mp3';
import agent from '../../agent/agent.js';

function MainMenu( {effect} ) {
    const history = useHistory();
    const [isLogged, setLog] = useState(false);

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
                })
                
            return;
        }

        history.push('login');
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
                    <button onMouseOver={buttonHover} onMouseDown={buttonSound} onClick={() => history.push('game-view')}>JEDNOOSOBOWA</button>
                    <button onMouseOver={buttonHover} onMouseDown={buttonSound} onClick={() => history.push('multiplayer')}>WIELOOSOBOWA</button>
                </div>
            </div>   
        </div>   
   </>);
}

export default MainMenu;