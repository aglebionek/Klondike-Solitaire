import React from 'react';
import "./passwordResetCyberpunk.css"

function PasswordReset (){
    return (
    <div className="password__reset__container">
      <a href="/" className="password__reset__back">
        &#129044;
      </a>
      <div>
        <header className="password__reset__container__header"> Resetuj hasło </header>
        <info className="password__reset__info">Aby odzyskać hasło, wpisz swój email, na który wyślemy link do resetowania hasła: </info>
        <form>
          <div className="password__reset__container__creds">
            <div className="password__reset__container__creds__field">
              <input
                type="text"
                placeholder="Email"
              />
              <p className="register__container__creds__field__error">
              </p>
            </div>
          </div>
          <div className="password__reset__container__buttons">
            <button type="submit" className="password__reset__container__buttons__btn">
                Wróć do logowania
            </button>
            <button
              className="password__reset__container__buttons__btn"
            >
              Resetuj hasło
            </button>
          </div>
        </form>
        <div className="password__reset__container__reminder"></div>
      </div>
    </div>
  );
}
export default PasswordReset