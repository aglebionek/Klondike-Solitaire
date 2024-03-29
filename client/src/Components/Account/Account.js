import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import ReactCountryFlag from "react-country-flag";
import dataCountry from "./country-list.json";
import buttonClickSound from "../../soundtrack/SoundDesign/menu_click.mp3";
import buttonHoverSound from "../../soundtrack/SoundDesign/menu_hover.mp3";
import agent from "../../agent/agent.js";
import Spinner from "../Spinner/Spinner";
import accountSelectStyle from "./AccountSelectStyle";
import accountSelectStyleCyberpunk from "./AccountSelectStyleCyberpunk";
import ThemeSelector from "../ThemeSelector/ThemeSelector";

const Account = ({ effect, userId }) => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("Nazwa użytkownika");
  const [accountCreation, setAccountCreation] = useState("2020-01-01");
  const [country, setCountry] = useState("PL");
  const [avatar, setAvatar] = useState("1");
  const [temporaryAvatar, setTemporaryAvatar] = useState("avatar1");
  const [newUsername, setNewUsername] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [currentPassword, setCurrentPassword] = useState("admin");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [countryName, setCountryName] = useState("Poland");
  const [newCountryName, setNewCountryName] = useState("");

  const [winGames, setWinGames] = useState(0);
  const [loseGames, setLoseGames] = useState(0);
  const [drawGames, setDrawGames] = useState(0);
  const [totalCompletionTime, setTotalCompletionTime] = useState(0);
  const [totalGamePoints, setTotalGamePoints] = useState(0);
  const [statsError, setStatsError] = useState(false);
  const [error, setError] = useState("");

  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("isLogged")) ?? false
  );
  const [loading, setLoading] = useState(isLogged);

  const avatars = [
    "avatar1",
    "avatar2",
    "avatar3",
    "avatar4",
    "avatar5",
    "avatar6",
  ];

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
    setAvatar(Number(num));
    if (newUsername != "") {
      setUserName(newUsername);
    }
    if (oldPassword === currentPassword && newPassword === repeatPassword) {
      setCurrentPassword(newPassword);
    } else {
    }
    if (newCountry != "") {
      setCountry(newCountry);
      setCountryName(newCountryName);
    }
    clearSettings();
  };

  const clearSettings = () => {
    setError("");
    setNewPassword("");
    setOldPassword("");
    setRepeatPassword("");
    document.getElementsByName("editForm")[0].reset();
    setValue("");
    setShow(false);
  };

  const [value, setValue] = useState("");
  const options = useMemo(() => dataCountry, []);

  const changeHandler = (value) => {
    setValue(value);
    setNewCountry(value.value);
    setNewCountryName(value.label);
  };

  const buttonSound = () => {
    let beep = new Audio(buttonClickSound);
    beep.volume = effect / 100;
    beep.play();
  };

  const buttonHover = () => {
    let beep = new Audio(buttonHoverSound);
    beep.volume = 1;
    beep.play();
  };

  useEffect(() => {
    if (isLogged) {
      agent
        .get(`account/${userId}`)
        .then(({ data }) => {
          const { username, registration_date, country, icon_id, password } =
            data;
          setUserName(username);
          setAccountCreation(registration_date);
          setCountry(country);
          setTemporaryAvatar("avatar" + icon_id);
          setAvatar(icon_id);
          setCurrentPassword(password);
          setCountryName(options.find(({ value }) => value === country).label);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });

      agent
        .get(`account/stats/${userId}`)
        .then(({ data }) => {
          const { wins, losses, draws, totalPoints, totalTime } = data;
          if (wins != null) {
            setWinGames(wins);
          }
          if (draws != null) {
            setDrawGames(draws);
          }
          if (losses != null) {
            setLoseGames(losses);
          }
          if (totalTime != null) {
            setTotalCompletionTime(totalTime);
          }
          if (totalPoints != null) {
            setTotalGamePoints(totalPoints);
          }
        })
        .catch((error) => {
          setStatsError(true);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== repeatPassword) {
      setError("Hasła są różne");
    } else {
      const newAvatar = temporaryAvatar.match(/\d+/)[0];
      agent
        .put(`account/edit`, {
          icon_id: newAvatar,
          username: newUsername,
          password: oldPassword,
          newPassword,
          country: newCountry,
        })
        .then(() => {
          setNewData();
        })
        .catch(({ response }) => {
          if (response?.data) {
            setError(response.data);
          }
        });
    }
  };
  if (loading) return <Spinner></Spinner>;

  var selectStyle;
  if (localStorage.getItem("motiveCss") !== "cyberpunk") {
    selectStyle = accountSelectStyle;
  } else {
    selectStyle = accountSelectStyleCyberpunk;
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-menu-button-div">
          <a
            className="account__back"
            href="./.."
            onMouseDown={buttonSound}
            onMouseOver={buttonHover}
          >
            &#129044;
          </a>
        </div>
        <div className="profile-heading">KONTO</div>
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              draggable="false"
              className="account-avatar"
              src={`./images/avatar${avatar}.png`}
              alt="Awatar użytkownika"
              width="150"
              height="150"
            />
          </div>
          <div className="profile-header-info">
            <div className="profile-username">{userName}</div>
            <div className="profile-creation-date">
              Profil utworzono:{" "}
              <span className="profile-header-date">{accountCreation}</span>
            </div>
            <div className="profile-country-info">
              <div className="country-img">
                <span>
                  <ReactCountryFlag
                    countryCode={country}
                    svg
                    style={{
                      fontSize: "1.5em",
                      lineHeight: "1.5em",
                    }}
                    className="emojiFlag"
                  />
                </span>
              </div>
              <div className="country-name">{countryName}</div>
              <div className="edition-text">
                <button
                  className="profile-edit-button"
                  onClick={() => setShow(true)}
                >
                  Edycja
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-main">
          <div className="profile-statistics">
            <div className="profile-statistics-inscription">Statystyki</div>
            <div className="profile-statistics-number-of-games stats">
              <div id="number-of-game-text">Gry</div>
              <div id="number-of-game-stats">
                {parseInt(winGames) + parseInt(drawGames) + parseInt(loseGames)}
              </div>
            </div>
            <div className="profile-statistics-number-of-points stats">
              <div id="number-of-points-text">Punkty</div>
              <div id="number-of-points-stats">{totalGamePoints}</div>
            </div>
            <div className="profile-statistics-W-L-D-games stats">
              <div id="W-L-D-games-text">W/P/R</div>
              <div id="W-L-D-games-stats">
                {winGames}/{loseGames}/{drawGames}
              </div>
            </div>
            <div className="profile-statistics-total-game-time stats">
              <div id="total-game-time-text">Całkowity czas gry</div>
              <div id="total-game-time-stats">{totalCompletionTime + " s"}</div>
            </div>
            <div className="profile-statistics-average-game-time stats">
              <div id="average-game-time-text">Średni czas gry</div>
              <div id="average-game-time-stats">
                {parseInt(winGames) +
                  parseInt(drawGames) +
                  parseInt(loseGames) ===
                0
                  ? "0 s"
                  : Math.round(
                      totalCompletionTime /
                        (parseInt(winGames) +
                          parseInt(drawGames) +
                          parseInt(loseGames))
                    ) + " s"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={show ? { display: "flex" } : { display: "none" }}
        className="background-modal"
      >
        <div className="modal-content">
          <form onSubmit={handleSubmit} name="editForm">
            <div className="modal-settings">Ustawienia</div>
            <div className="modal-nick">
              <div className="row-one">Nazwa użytkownika</div>
              <input
                className="account_modal-nick-input"
                type="text"
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
              />
            </div>
            <div className="modal-password-old">
              <div className="row-one">Stare hasło</div>
              <input
                className="account_modal-password-old-input"
                type="password"
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
              />
            </div>
            <div className="modal-password-new">
              <div className="row-one">Nowe hasło</div>
              <input
                className="account_modal-password-input-new"
                type="password"
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
            </div>
            <div className="modal-password-new-repeat">
              <div className="row-one">Powtórz hasło</div>
              <input
                className="account_modal-password-input-new-repeat"
                type="password"
                onChange={(event) => {
                  setRepeatPassword(event.target.value);
                }}
              />
            </div>
            <div className="modal-country">
              <div className="modal-country-text row-one">Kraj</div>
              <div className="modal-country-input">
                <Select
                  options={options}
                  value={value}
                  styles={selectStyle}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <p className="modal-error">{error && error}</p>
            <div className="modal-avatar">
              <div className="modal-avatar-text"></div>
              <div
                className="arrow modal-left-arrow"
                onClick={() => previousAvatar()}
              >
                &lt;
              </div>
              <div>
                <img
                  className="modal-avatar-image"
                  src={`./images/${temporaryAvatar}.png`}
                  alt="Awatar użytkownika"
                  width="150"
                  height="150"
                />
              </div>
              <div
                className="arrow modal-right-arrow"
                onClick={() => nextAvatar()}
              >
                &gt;
              </div>
            </div>
            <div className="modal-avatar-current"></div>

            <div className="modal-button">
              <button className="modal-button-save" type="submit">
                Ok
              </button>
              <button
                className="modal-button-cancel"
                type="button"
                onClick={() => clearSettings()}
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ThemeSelector(Account);
