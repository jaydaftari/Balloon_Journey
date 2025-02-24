import React from "react";
import styles from "./LoadingPage.module.css";
    
const LoadingPage = () => {
  return (
    <div className={`${styles.container}`}>
      {/* Balloons Container */}
      <div className={styles.balloons}>
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={styles.balloon}
            style={{
              left: `${index * 12 + 10}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${3 + (index % 3)}s`,
            }}
          >
            🎈
          </div>
        ))}
      </div>

      {/* Loading Text */}
      <div className={styles.loadingText}>Hang on, Some amazing things are Loading....</div>
    </div>
  );
};

export default LoadingPage;
