import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import buttonMenuClick from "../../soundtrack/SoundDesign/menu_click.mp3";
import buttonHoverSound from "../../soundtrack/SoundDesign/menu_hover.mp3";
import agent from "../../agent/agent.js";

function Register() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const isValid = () => {
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setServerError("");
    let isValid = true;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailRegex)) {
      setEmailError("Email jest niepoprawny");
      isValid = false;
    }

    if (!username) {
      setUsernameError("Nazwa gracza nie może byc pusta");
      isValid = false;
    }

    if (username.length > 20) {
      setUsernameError("Nazwa gracza jest za długa");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError("Hasło musi zawierać conajmniej 6 znaków");
      isValid = false;
    }

    if (password.length > 15) {
      setPasswordError("Hasło nie może mieć więcej niż 15 znaków");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Hasła są różne");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      agent
        .post("auth/register", {
          email: email,
          username: username,
          password: password,
        })
        .then((resp) => {
          if (resp.status === 200) {
            localStorage.setItem('isLogged', true);
            localStorage.setItem('userId', resp.data);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          const { data } = err.response;
          if (data) {
            data.email && setEmailError(data.email);
            data.server && setServerError(data.server);
          }
        });
    }
  };
  const buttonSound = () => {
    let beep = new Audio(buttonMenuClick);
    beep.volume = 1;
    beep.play();
  };
  const buttonHover = () => {
    let beep = new Audio(buttonHoverSound);
    beep.volume = 1;
    beep.play();
  };

  var styles = require("./Register.css");

  if (isLoggedIn) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
      styles = require("./RegisterCyberpunk.css");
    }
    return <Redirect to="/" />;
  } 
  return (
    <div className="register__container">
      <div className="register__back">
        <a href="/" className="register__back" onMouseDown={buttonSound}
              onMouseOver={buttonHover}>
          &#129044;
        </a>
      </div>
      <div>
        <header className="register__container__header">Rejestracja</header>
        <form onSubmit={handleSubmit}>
          <div className="register__container__creds">
            <div className="register__container__creds__field">
              <input
                type="text"
                placeholder="Email"
                className="register__container__creds__field"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p className="register__container__creds__field__error">
                {emailError}
              </p>
            </div>
            <div className="register__container__creds__field">
              <input
                type="text"
                placeholder="Nazwa użytkownika"
                className="register__container__creds__field"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <p className="register__container__creds__field__error">
                {usernameError}
              </p>
            </div>
            <div className="register__container__creds__field">
              <input
                type="password"
                placeholder="Hasło"
                className="register__container__creds__field"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p className="register__container__creds__field__error">
                {passwordError}
              </p>
            </div>
            <div className="register__container__creds__field">
              <input
                type="password"
                placeholder="Powtórz hasło"
                className="register__container__creds__field"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <p className="register__container__creds__field__error">
                {confirmPasswordError}
                {serverError}
              </p>
            </div>
          </div>
          <div className="register__container__buttons">
            <a
              href="/login"
              type="button"
              className="register__container__buttons__btn"
              onMouseDown={buttonSound}
              onMouseOver={buttonHover}
            >
              Zaloguj się
            </a>
            <button
              type="submit"
              className="register__container__buttons__btn"
              onMouseDown={buttonSound}
              onMouseOver={buttonHover}
            >
              Stwórz użytkownika
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
