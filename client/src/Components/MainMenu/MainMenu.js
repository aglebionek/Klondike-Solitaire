import React from "react";
import "./MainMenu.css";
import { useHistory } from "react-router-dom";
import MenuMusic from './MenuMusic';
import buttonMenuClick from '../../soundtrack/SoundDesign/menu_click.mp3';



function MainMenu({effect, volume}) {
    const history = useHistory();
   

    const buttonSound = (event) => {
            let beep = new Audio(buttonMenuClick);
            beep.volume=(effect/100);
            beep.play();   
    }

    return (
        <div className='main-menu'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <div className='main-menu__top-bar'>
                <div className='top-bar__dropdown'>
                    <button><i className="fa fa-bars"></i></button>
                    <div className="dropdown__content">
                        <button onMouseDown={buttonSound} onClick={() => history.push('settings')}>USTAWIENIA</button>
                        <button onMouseDown={buttonSound} onClick={() => history.push('global-stats')}>STATYSTYKI</button>
                        <button onMouseDown={buttonSound}>AUTORZY</button>
                        <button onMouseDown={buttonSound}>O GRZE</button> 
                        <button onMouseDown={buttonSound} onClick={() => history.push('account')}>KONTO</button> 
                    </div>
                </div>
                <div>
                    <button onMouseDown={buttonSound} onClick={() => history.push('login')}>LOGOWANIE / REJESTRACJA</button>
                </div>
            </div>

            <div className='main-menu__main-elements'>
                <div className='main-elements__title'>
                    <h1>Pasjans Klondike</h1>
                </div>
                <div className='main-elements__buttons'>
                    <button onMouseDown={buttonSound} onClick={() => history.push('game-view')}>JEDNOOSOBOWA</button>
                    <button onMouseDown={buttonSound} onClick={() => history.push('multiplayer')}>WIELOOSOBOWA</button>
                    <MenuMusic musicVolume = {volume}></MenuMusic>
                </div>
            </div>
        </div>        
    );
}

export default MainMenu;