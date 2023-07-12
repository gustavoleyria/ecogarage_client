import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/navbar/Ruta.css';

const Ruta = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  return (
    <div className="historyNavContainer">
      <button className="historyNavButton" onClick={goBack}>←</button>
      <button className="historyNavButton" onClick={goForward}>→</button>
    </div>
  );
};

export default Ruta;
