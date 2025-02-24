"use client";

import styles from "./Popup.module.css";

export default function Popup({ text, onToggleMap }) {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
        <h2 className={styles.title}>🎈 Balloon Story 🎈</h2>
        <p className={styles.story}>{text}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.toggleButton} onClick={onToggleMap}>
            Show Map
          </button>
        </div>
      </div>
    </div>
  );
}
