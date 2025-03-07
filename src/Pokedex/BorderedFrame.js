import React, { useState, useEffect } from "react";
import myCollection from "./mycollection.json";

const containerStyle = {
  position: "relative",
  minHeight: "100vh",
  boxSizing: "border-box",
};

const rightBorderStyle = {
  top: 0,
  bottom: 0,
  right: 0,
  alignItems: "center",
  backgroundColor: "var(--primary-color)",
  justifyContent: "center",
  display: "flex",
};
const contentStyle = {
  padding: "0 120px",
  backgroundColor: "var(--secondary-color)",
};

const imageStyle = {
  margin: "5px",
};

// Função para embaralhar um array usando o algoritmo Fisher-Yates
const shuffleArray = (array) => {
  const newArray = [...array];
  let answer = [];
  for (let i = 10; i > 0; i--) {
    const j = Math.floor(Math.random() * (array.length -1));
    answer.push(newArray[j]);
  }
  console.log(answer);
  return answer;
};

const BorderedFrame = ({ children }) => {
  const [shuffledCollection, setShuffledCollection] = useState([]);

  useEffect(() => {
    // Embaralha a lista de IDs ao montar o componente
    setShuffledCollection(shuffleArray(myCollection));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {children}
      </div>
      <footer style={rightBorderStyle}>
        {shuffledCollection.map((id) => (
          <img
            key={`right-${id}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={`Pokémon ${id}`}
            style={imageStyle}
          />
        ))}
      </footer>
    </div>
  );
};

export default BorderedFrame;
