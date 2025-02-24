// components/ButtonComponent.js
import React from 'react';
import './ButtonComponent.css'; 

const ButtonComponent = ({ onClick }) => {
    return <button onClick={onClick}>Show story of this balloon</button>;
  };
  
export default ButtonComponent;
      

