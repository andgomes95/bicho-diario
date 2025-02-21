import React, { useState, useEffect } from "react";
import myCollection from "./mycollection.json";

const containerStyle = {
  position: "relative",
  minHeight: "100vh",
  boxSizing: "border-box",
};

const borderCommon = {
  position: "fixed",
  zIndex: 1000,
  display: "flex",
};

const leftBorderStyle = {
  ...borderCommon,
  top: 0,
  bottom: 0,
  left: 0,
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.8)",
};

const rightBorderStyle = {
  ...borderCommon,
  top: 0,
  bottom: 0,
  right: 0,
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.8)",
};

const contentStyle = {
  padding: "0 120px", // Espaço lateral para evitar sobreposição com as bordas
};

const imageStyle = {
  margin: "5px",
};

// Função para embaralhar um array usando o algoritmo Fisher-Yates
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const BorderedFrame = ({ children }) => {
  const [shuffledCollection, setShuffledCollection] = useState([]);

  useEffect(() => {
    // Embaralha a lista de IDs ao montar o componente
    setShuffledCollection(shuffleArray(myCollection));
  }, []);

  return (
    <div style={containerStyle}>
      {/* Borda esquerda */}
      <div style={leftBorderStyle}>
        {shuffledCollection.map((id) => (
          <img
            key={`left-${id}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={`Pokémon ${id}`}
            style={imageStyle}
          />
        ))}
      </div>

      {/* Borda direita */}
      <div style={rightBorderStyle}>
        {shuffledCollection.map((id) => (
          <img
            key={`right-${id}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={`Pokémon ${id}`}
            style={imageStyle}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default BorderedFrame;
