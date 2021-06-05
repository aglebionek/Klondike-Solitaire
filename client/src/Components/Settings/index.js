import React, { useState, useEffect } from "react";
import styles from "./SettingCyberpunk.module.css";
import Button from "./Button";
import AudioSlider from "./AudioSlider";
import buttonClickSound from '../../soundtrack/SoundDesign/menu_click.mp3';
import Spinner from "../Spinner/Spinner";
import agent from '../../agent/agent.js';
import CardMotives from "../CardMotives/CardMotives";

const Settings = () => {
  const [isCardSelectionOpen, setCardSelectionOpen] = useState(false);
  const [card, setCard] = useState(1);
  const [temporaryCard, setTemporaryCard] = useState("vA hearts");
  const [musicVolume, setMusicVolume] = useState(JSON.parse(localStorage.getItem('guestMusic')) ?? 20);
  const [effectVolume, setEffectVolume] = useState(JSON.parse(localStorage.getItem('guestEffect')) ?? 20);
  const [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem('isLogged')) ?? false);
  const [loading, setLoading] = useState(isLogged);


  const cards = ["vA hearts cyberpunk","vA hearts"];
  const userId = 26;

  const nextCard = () => {
    let index = cards.indexOf(temporaryCard);
    if (index === cards.length - 1) index = 0;
    else index++;
    setTemporaryCard(cards[index]);
  };

  const previousCard = () => {
    let index = cards.indexOf(temporaryCard);
    if (index === 0) index = cards.length - 1;
    else index--;
    setTemporaryCard(cards[index]);
  };

  const setNewCard = () => {
    const num = cards.indexOf(temporaryCard);
    setCard(Number(num) + 1);
    setCardSelectionOpen(false);
  };
  const buttonSound = (event) => {
    let beep = new Audio(buttonClickSound);
    beep.volume=(effectVolume/100);
    beep.play();   
  }

  useEffect(() => {
    if (isLogged) {
      agent.get(`settings/${userId}`).then(({ data }) => {
        const { cardset_id, volume, effect } = data;
        setTemporaryCard(cards[cardset_id-1]);
        setMusicVolume(Number(volume));
        setEffectVolume(effect);
        setLoading(false);
      }).catch(error =>console.log(error.response));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogged) {
      agent.put(`settings/edit/${userId}`, {
        cardset_id: card,
        music: musicVolume,
        effect: effectVolume,
      });
    } else {
      localStorage.setItem('guestMusic', musicVolume);
      localStorage.setItem('guestEffect', effectVolume);
    }
  };
  if (loading) return (
    <Spinner></Spinner>
  );
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href="/" className={styles.settings__back} onMouseDown={buttonSound}>
          &#129044;
        </a>
      </div>
      <div>
      <header className={styles.title}>Ustawienia Gry</header>
      <form onSubmit={handleSubmit}>
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <div className={styles.itemsContainer}>
              {isLogged && (<>
                <div className={styles.item}>
                  <div className={styles.name}>Talia</div>
                  <div className={styles.switch}>
                    <Button
                      text="Zmień"
                      isCardSelectionOpen={isCardSelectionOpen}
                      setCardSelectionOpen={setCardSelectionOpen}
                      soundEffect={effectVolume}
                    />
                  </div>
                </div>
              </>)}
              <div className={styles.item}>
                <div className={styles.name}>Efekty dźwiekowe</div>
                <div className={styles.switch}>
                  <AudioSlider
                    volume={effectVolume}
                    setVolume={setEffectVolume}
                  />
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.name}>Głośność</div>
                <div className={styles.switch}>
                  <AudioSlider
                    volume={musicVolume}
                    setVolume={setMusicVolume}
                  />
                </div>
              </div>
              </div>
            </div>
            {isCardSelectionOpen && (
              <div className={styles.selection}>
                <div className={styles.selectionContainer}>
                  <div
                    className={`${styles.arrow} ${styles.arrowLeft}`}
                    onClick={() => previousCard()}
                  >
                    &lt;
                  </div>
                  <div>
                    <CardMotives card_classes={temporaryCard}/>
                  </div>
                  <div
                    className={`${styles.arrow} ${styles.arrowRight}`}
                    onClick={() => nextCard()}
                  >
                    &gt;
                  </div>
                </div>
                <button
                  className={styles.saveCardButton}
                  onClick={() => setNewCard()}
                  type="button"
                >
                  Wybierz
                </button>
              </div>
            )}
          
          </div>
          <div className={styles.saveButtonContainer}>
            <button
              className={`${styles.saveButton} ${
                isCardSelectionOpen ? styles.disabledButton : ""
              }`}
              type={isCardSelectionOpen ? "button" : "submit"}
              onMouseDown={buttonSound}
            >
              Zapisz
            </button>
          </div>
          </form>
        </div>
        </div>
      
  );
};

export default Settings;