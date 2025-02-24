import React from "react";
import "./Slider.css"; // Import the CSS file

const Slider = ({ min, max, value, onChange, coord }) => {
  return (
    <div className="slider-container">
      <span className="slider-label">Adjust slider to change the balloon:</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="slider-input"
      />
      <div className="slider-info">
        Balloon Index: {value}, (Lat: {coord[0]}, Long: {coord[1]}, Alt: {coord[2]})
      </div>
    </div>
  );
};

export default Slider;
  