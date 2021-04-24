import React, { useState } from "react";
import "./Account.css";

function Account() {
    const [show, setShow] = useState(false);

    return (<>
        <div className = "profile-container">
            <div className="profile-heading">KONTO</div>
            <div className="profile-header">
                <div className="profile-avatar">
                    <img className="account-avatar" src="./images/profile_picture.jpg" alt="Awatar użytkownika" width="150" height="150" />
                </div> 
                <div className="profile-header-info"> 
                    <div className="profile-username">Nazwa użytkownika</div>
                    <div className="profile-creation-date">
                        Profil utworzono: <span className = "profile-header-date">01.01.2001</span>
                    </div>
                    <div className="profile-country-info">
                        <div className="country-img">
                            <span><img id="flag-picture"src="./images/polska.png" alt="Flag " width="25" height="20" /></span>
                        </div>
                        <div className="country-name">
                            Polska
                        </div>
                    </div>
                </div>
                <div className="profile-header-edit"> 
                    <div className="edition-text">
                        <button onClick={() => setShow(true)}>Edycja</button>
                    </div>
                </div>
            </div>
            <div className="profile-main">
                <div className="profile-statistics"> 
                    <div className="profile-statistics-inscription">Statystyki</div>
                    <div className="profile-statistics-number-of-games stats">
                        <div id="number-of-game-text">Gry</div>
                        <div id="number-of-game-stats">146</div>
                    </div>
                    <div className="profile-statistics-number-of-points stats">
                        <div id="number-of-points-text">Punkty</div>
                        <div id="number-of-points-stats">23 590</div>
                    </div>
                    <div className="profile-statistics-W-L-D-games stats">
                        <div id="W-L-D-games-text">W/P/R</div>
                        <div id="W-L-D-games-stats">42/98/6</div>
                    </div>
                    <div className="profile-statistics-total-game-time stats">
                        <div id="total-game-time-text">Całkowity czas gry</div>
                        <div id="total-game-time-stats">7,3h</div>
                    </div>
                    <div className="profile-statistics-average-game-time stats">
                        <div id="average-game-time-text">Średni czas gry</div>
                        <div id="average-game-time-stats">2min 36sec</div>
                    </div>
                    <div className="profile-statistics-best-win-streak stats">
                        <div id="best-win-streak-text">Winstreak</div>
                        <div id="best-win-streak-stats">5</div>
                    </div>
                    <div className="profile-statistics-number-of-abandoned-games stats">
                        <div id="number-of-abandoned-games-text">Liczba porzuconych gier</div>
                        <div id="number-of-abandoned-games-stats">11</div>
                    </div>
                </div>
                <div className="profile-return-button">
                    <input type="button" value="Powrót" />
                </div> 
            </div>
        </div> 
        <div style={show ? {display: 'flex'} : {display: 'none'}} className="background-modal">
            <div className="modal-content">
                <div className="modal-settings">Ustawienia</div>
                <div className="modal-nick">
                    <div className="modak-nick-text row-one">
                        Nazwa użytkownika
                    </div>
                    <div className="modal-nick-current"></div>
                    <input className="modal-nick-input"/>
                </div>
                <div className="modal-email">
                    <div className="modal-email-text row-one">Email</div>
                    <input className="modal-email-input"/>
                </div>

                <div className="modal-password-old">
                    <div className="row-one">Stare hasło</div>
                    <input className="modal-password-input-old"/>
                </div>
                <div className="modal-password-new">
                    <div className="row-one">Nowe hasło</div>
                    <input className="modal-password-input-new"/>
                </div>
                <div className="modal-password-new-repeat">
                    <div className="row-one">Powtórz hasło</div>
                    <input className="modal-password-input-new-repeat"/>
                </div>
                <div className="modal-country">
                    <div className="modal-country-text row-one">Kraj</div>

                </div>
                <div className="modal-button">
                    <button className="modal-button-save">Zmień</button>
                    <button className="modal-button-cancel" onClick={() => setShow(false)}>Anuluj</button>
                </div>
            </div>
        </div>
    </>)
}

export default Account;