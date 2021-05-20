import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainMenu.css";
import { useHistory } from "react-router-dom";

function MainMenu(props) {
    const history = useHistory();
    const [isLogged, setLog] = useState(false);

    const handleLogButton = (e) => {
        e.preventDefault();

        if(isLogged){
            axios
                .post("http://localhost:3000/auth/logout")
                .then(() => {
                    setLog(false);
                })
                
            return;
        }

        history.push('login');
    }

    useEffect(() => {
        axios
          .get("http://localhost:3000/auth/verify")
          .then(() => {
            setLog(true);
          })
          .catch(() => {
            setLog(false);
          });
    }, []);

    return (
        <div className='main-menu'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <div className='main-menu__top-bar'>
                <div className='top-bar__dropdown'>
                    <button><i className="fa fa-bars"></i></button>
                    <div className="dropdown__content">
                        <button onClick={() => history.push('settings')}>USTAWIENIA</button>
                        <button onClick={() => history.push('global-stats')}>STATYSTYKI</button>
                        <button onClick={() => history.push('authors')}>AUTORZY</button>
                        <button onClick={() => history.push('app-info')}>O GRZE</button> 
                        <button onClick={() => history.push('account')}>KONTO</button> 
                    </div>
                </div>
                <div>
                    <button onClick={handleLogButton}>
                        {isLogged ?  'WYLOGUJ' : 'LOGOWANIE / REJESTRACJA'}
                    </button>
                </div>
            </div>

            <div className='main-menu__main-elements'>
                <div className='main-elements__title'>
                    <h1>Pasjans Klondike</h1>
                </div>
                <div className='main-elements__buttons'>
                    <button onClick={() => history.push('game-view')}>JEDNOOSOBOWA</button>
                    <button onClick={() => history.push('multiplayer')}>WIELOOSOBOWA</button>
                </div>
            </div>
        </div>        
    );
}

export default MainMenu;