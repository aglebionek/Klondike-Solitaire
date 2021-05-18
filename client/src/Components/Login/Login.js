import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError("");
    if (isValid()) {
      axios
        .post("http://localhost:3001/auth/login", {
          email,
          password,
        })
        .then(() => {
          history.push("/");
        })
        .catch((err) => setServerError(err.response.data));
    }
  };

  const isValid = () => {
    setEmailError("");
    setPasswordError("");
    let isValid = true;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  return (
    <div className="login__container">
      <div className="login__container__menu-button">
        <a href="/" className="login__container__menu-button__link">
          Menu
        </a>
      </div>
      <div>
        <header className="login__container__header"> Logowanie </header>
        <form onSubmit={handleSubmit}>
          <div className="login__container__creds">
            <div className="login__container__creds__field">
              <input
                type="text"
                placeholder="Email"
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
            <button type="submit" className="login__container__buttons__btn">
              Przejdz do gry
            </button>
            <a
              href="/register"
              type="button"
              className="login__container__buttons__btn login__container__buttons__btn--link"
            >
              Zarejestruj się
            </a>
          </div>
        </form>
        <div className="login__container__reminder"></div>
      </div>
    </div>
  );
}
export default Login;
