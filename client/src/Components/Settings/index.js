import React, { useState, useEffect } from "react";
import styles from "./SettingCyberpunk.module.css";
import Checkbox from "./Checkbox";
import Button from "./Button";
import AudioSlider from "./AudioSlider";
import axios from "axios";

const Settings = () => {
  const [isCardSelectionOpen, setCardSelectionOpen] = useState(false);
  const [card, setCard] = useState(1);
  const [temporaryCard, setTemporaryCard] = useState("card1");
  const [musicVolume, setMusicVolume] = useState(10);
  const [effectVolume, setEffectVolume] = useState(40);
  const [isCardAnimation, setCardAnimation] = useState(true);
  const [loading, setLoading] = useState(true);

  const cards = ["card1", "card2"];
  const userId = 1;

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
    const num = temporaryCard.match(/\d+/)[0];
    setCard(Number(num));
    setCardSelectionOpen(false);
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/settings/${userId}`).then(({ data }) => {
      const { carset_id, volume, effect, card_animation } = data;
      setTemporaryCard("card" + carset_id);
      setMusicVolume(Number(volume));
      setEffectVolume(effect);
      setCardAnimation(Boolean(card_animation));
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/settings/edit/${userId}`, {
      cardset_id: card,
      music: musicVolume,
      effect: effectVolume,
      card_animation: isCardAnimation,
    });
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a href="/" className={styles.menuButton}>
          MENU
        </a>
      </div>
      <div>
        <header className={styles.title}>Ustawienia Gry</header>
        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.contentWrapper}>
              <div className={styles.itemsContainer}>
                <div className={styles.item}>
                  <div className={styles.name}>Animacje kart</div>
                  <div className={styles.switch}>
                    <Checkbox
                      name="cardAnimations"
                      status={isCardAnimation}
                      setStatus={setCardAnimation}
                    />
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.name}>Talia</div>
                  <div className={styles.switch}>
                    <Button
                      text="Zmień"
                      isCardSelectionOpen={isCardSelectionOpen}
                      setCardSelectionOpen={setCardSelectionOpen}
                    />
                  </div>
                </div>

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
                    <img
                      src={`./images/${temporaryCard}.png`}
                      alt="karta"
                      className={styles.card}
                    />
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
