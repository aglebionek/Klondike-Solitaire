import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import buttonMenuClick from "../../soundtrack/SoundDesign/menu_click.mp3";
import buttonHoverSound from "../../soundtrack/SoundDesign/menu_hover.mp3";
import agent from "../../agent/agent.js";
import { GrWindows } from "react-icons/gr";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (isValid()) {
      agent
        .post("auth/login", {
          email,
          password,
        })
        .then((resp) => {
          if (resp.status === 200) {
            localStorage.setItem('isLogged', true);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setLoggedIn(true);
            window.location.href = '/';
          }
        })
        .catch((err) => {
          if (err.response.data) setServerError(err.response.data);
        });
    }
  };

  const isValid = () => {
    setEmailError("");
    setPasswordError("");
    let isValid = true;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailRegex)) {
      setEmailError("Email jest niepoprawny");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Hasło nie może być puste");
      isValid = false;
    }
    return isValid;
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
  var styles = require("./Login.css");
  if (isLoggedIn) {
    if(localStorage.getItem('motiveCss') === "cyberpunk") {
      styles = require("./LoginCyberpunk.css");
    }
    return <Redirect to="/" />;
  }
  return (
    <div className="login__container">
      <a href="/" className="login__back" onMouseDown={buttonSound}
            onMouseOver={buttonHover}>
        &#129044;
      </a>
      <div>
        <header className="login__container__header"> Logowanie </header>
        <form onSubmit={handleSubmit}>
          <div className="login__container__creds">
            <div className="login__container__creds__field">
              <input
                type="text"
                placeholder="Email"
                className="login__container__creds__field__input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p className="register__container__creds__field__error">
                {emailError}
              </p>
            </div>
            <div className="login__container__creds__field">
              <input
                type="password"
                placeholder="Hasło"
                className="login__container__creds__field__input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p className="register__container__creds__field__error">
                {passwordError}
                {serverError}
              </p>
            </div>
          </div>
          <div className="login__container__buttons">   
            <a
              href="/register"
              type="button"
              className="login__container__buttons__btn"
              onMouseDown={buttonSound}
              onMouseOver={buttonHover}
            >
              Zarejestruj się
            </a>
            <button type="submit" className="login__container__buttons__btn">
              Zaloguj się
            </button>
          </div>
        </form>
        <div className="login__container__reminder"></div>
      </div>
    </div>
  );
}
export default Login;
