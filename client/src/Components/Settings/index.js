import React from "react";
import styles from "./Settings.module.css";
import Checkbox from "./Checkbox";
import Button from "./Button";
import AudioSlider from "./AudioSlider";

const Settings = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ustawienia Gry</h1>
      <div className={styles.content}>
        <div className={styles.itemsContainer}>
          <div className={styles.item}>
            <div className={styles.name}>Muzyka</div>
            <div className={styles.switch}>
              <Checkbox name="music" />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.name}>Animacje kart</div>
            <div className={styles.switch}>
              <Checkbox name="cardAnimations" />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.name}>Efekty dźwiekowe</div>
            <div className={styles.switch}>
              <Checkbox name="soundEffects" />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.name}>Talia</div>
            <div className={styles.switch}>
              <Button />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.name}>Motyw</div>
            <div className={styles.switch}>
              <Button />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.name}>Głośność</div>
            <div className={styles.switch}>
              <AudioSlider />
            </div>
          </div>
        </div>
        <div className={styles.selection}>
          <div className={styles.selectionContainer}>
            <div className={`${styles.arrow} ${styles.arrowLeft}`}>&lt;</div>
            <div>
              <img
                src="./images/card.png"
                alt="karta"
                className={styles.card}
              />
            </div>
            <div className={`${styles.arrow} ${styles.arrowRight}`}>&gt;</div>
          </div>
          <button className={styles.saveButton}>Zapisz</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
