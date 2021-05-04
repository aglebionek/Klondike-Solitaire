import React, { useState, useEffect } from "react";
import "./Account.css";
import axios from "axios";

const Account =() => {
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState('Nazwa użytkownika');
    const [accountCreation, setAccountCreation] = useState('2020-01-01');
    const [country, setCountry] = useState('Polska');
    const [avatar, setAvatar] = useState('avatar1');
    const [idAvatar, setIdAvatar] = useState('1');
    const [temporaryAvatar, setTemporaryAvatar] = useState('avatar1');
    const [newUsername, setNewUsername] = useState('');
    const [newCountry, setNewCountry] = useState('');
    
    const [currentPassword, setCurrentPassword] = useState('admin');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState(''); 
    

    const userId = 2;
    const avatars =["avatar1", "avatar2"];

    const nextAvatar = () => {
        let index = avatars.indexOf(temporaryAvatar);
        if (index === avatars.length - 1) index = 0;
        else index++;
        setTemporaryAvatar(avatars[index]);
      };
    
      const previousAvatar = () => {
        let index = avatars.indexOf(temporaryAvatar);
        if (index === 0) index = avatars.length - 1;
        else index--;
        setTemporaryAvatar(avatars[index]);
      };

      const setNewData = () => {
        const num = temporaryAvatar.match(/\d+/)[0];
        setIdAvatar(Number(num));
        if(newUsername === '') {
            setNewUsername(userName);
        };
        if(oldPassword===currentPassword && newPassword===repeatPassword){
            setCurrentPassword(newPassword);
        };
        if(newCountry===''){
            setNewCountry(country);
        }


        clearSettings();
        
      };

      const clearSettings = () => {
        setNewPassword('');
        setOldPassword('');
        setRepeatPassword('');
        document.getElementsByName('editForm')[0].reset();
        setShow(false);
      }

      

    useEffect(() => {
        axios.get(`http://localhost:3000/account/${userId}`).then(({ data }) => {
          const { username, registration_date, country, icon_id, password} = data.resp[0];     
          setUserName(username);
          setAccountCreation(registration_date);
          setCountry(country);
          setTemporaryAvatar("avatar"+icon_id);
          setAvatar("avatar"+icon_id) ;
          setCurrentPassword(password);
        });
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/account/edit/${userId}`, {
        icon_id: idAvatar,
        username: newUsername,
        password: currentPassword,
        country: newCountry,
        });
      };

    return (<>
        <div className = "profile-container">
            <div className="profile-heading">KONTO</div>
            <div className="profile-header">
                <div className="profile-avatar">
                    <img className="account-avatar" src={`./images/${avatar}.png`} alt="Awatar użytkownika" width="150" height="150" />
                </div> 
                <div className="profile-header-info"> 
                    <div className="profile-username">{userName}</div>
                    <div className="profile-creation-date">
                        Profil utworzono: <span className = "profile-header-date">{accountCreation}</span>
                    </div>
                    <div className="profile-country-info">
                        <div className="country-img">
                            <span><img id="flag-picture"src="./images/polska.png" alt="Flag " width="25" height="20" /></span>
                        </div>
                        <div className="country-name">
                            {country}
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
            <form onSubmit={handleSubmit} name="editForm">
                <div className="modal-settings">Ustawienia</div>
                <div className="modal-nick">
                    <div className="modak-nick-text row-one">
                        Nazwa użytkownika
                    </div>
                    <div className="modal-nick-current">
                        <input 
                            className="modal-nick-input" 
                            type="text" 
                            onChange={(event) => {
                                setNewUsername(event.target.value);
                        }}
                        />
                    </div> 
                </div>         
                <div className="modal-password-old">
                    <div className="row-one">Stare hasło</div>
                    <div className="modal-password-old-current">
                        <input 
                            className="modal-password-old-input"
                            type="password"
                            onChange={(event) => {
                                setOldPassword(event.target.value);
                            }}
                        />

                    </div>
                    {!(currentPassword===oldPassword || oldPassword==='')&&(<span class="red-star">niepoprawne hasło</span>)}
                </div>
                <div className="modal-password-new">
                    <div className="row-one">Nowe hasło</div>
                        <input 
                            className="modal-password-input-new"
                            type="password"
                            onChange={(event) => {
                                setNewPassword(event.target.value);
                            }}
                        />
                </div>
                <div className="modal-password-new-repeat">
                    <div className="row-one">Powtórz hasło</div>
                        <input 
                            className="modal-password-input-new-repeat"
                            type="password"
                            onChange={(event) => {
                                setRepeatPassword(event.target.value);
                            }}
                        />
                        {!(repeatPassword===newPassword||repeatPassword==='')&&(<span class="red-star">powtórz hasło</span>)}
                </div>
                <div className="modal-country">
                    <div className="modal-country-text row-one">Kraj</div>
                    <div className="modal-country-input">
                        <input 
                        type="text"
                        onChange={(event) => {
                            setNewCountry(event.target.value);
                        }}
                        />
                    </div>
                </div>
                <div className="modal-avatar">
                    <div className="modal-avatar-text row-one"></div>
                    <div className="arrow modal-left-arrow" onClick={() => previousAvatar()}>&lt;</div>
                    <div>
                        <img className="modal-avatar-image" src={`./images/${temporaryAvatar}.png`} alt="Awatar użytkownika" width="150" height="150" />
                    </div>
                    <div className="arrow modal-right-arrow"  onClick={() => nextAvatar()}>&gt;</div>
                </div>
                <div className="modal-avatar-current">
                  
                    </div>
                <div className="modal-button">
                    <button className="modal-button-save" type="submit" onClick={() => setNewData()} >Ok</button>
                    <button className="modal-button-cancel" type = "button" onClick={() => clearSettings()}>Anuluj</button>
                </div>
                </form>

            </div>
        </div>
    </>)
}

export default Account;