import React, { useState } from "react";
import axios from "axios";
import "./register.css";

function Register({ history }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const isValid = () => {
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    let isValid = true;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      setPasswordError("Hasło musi nie może mieć więcej niż 15 znaków");
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
      axios
        .post("http://localhost:3000/auth/register", {
          email: email,
          username: username,
          password: password,
        })
        .then(() => {
          history.push("/");
        })
        .catch((err) => {
          if (Object.keys(err.response.data)[0] === "email")
            setEmailError("Email jest zajęty");
        });
    }
  };

  return (
    <div className="register__container">
      <div className="register__container__menu-button">
        <a href="/" className="register__container__menu-button__link">
          Menu
        </a>
      </div>
      <div>
        <header className="register__container__header">Rejstracja</header>
        <form onSubmit={handleSubmit}>
          <div className="register__container__creds">
            <div className="register__container__creds__field">
              <input
                type="text"
                placeholder="Email"
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
                placeholder="username"
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
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <p className="register__container__creds__field__error">
                {confirmPasswordError}
              </p>
            </div>
          </div>
          <div className="register__container__buttons">
            <button type="submit" className="register__container__buttons__btn">
              Stwórz użytkownika
            </button>
            <a
              href="/login"
              type="button"
              className="register__container__buttons__btn register__container__buttons__btn--link"
            >
              Zaloguj się
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
