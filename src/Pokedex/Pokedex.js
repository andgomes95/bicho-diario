import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cards from "./cards.json";
import myCollection from "./mycollection.json";
import BorderedFrame from "./BorderedFrame";

const Pokedex = () => {
  const [filteredSets, setFilteredSets] = useState({});
  const [visibleSets, setVisibleSets] = useState({});

  useEffect(() => {
    const myCollectionSet = new Set(myCollection);
    let filtered = {};

    Object.entries(cards).forEach(([set, cardsInSet]) => {
      const missingCards = cardsInSet.filter(card => !myCollectionSet.has(card.pokedex));
      if (missingCards.length > 0) {
        filtered[set] = missingCards;
      }
    });

    const sortedFilteredSets = Object.entries(filtered).sort((a, b) => b[1].length - a[1].length);
    const filteredObj = Object.fromEntries(sortedFilteredSets);
    setFilteredSets(filteredObj);

    // Inicializa todos os sets como visíveis (expandido)
    const initialVisibility = {};
    Object.keys(filteredObj).forEach(setName => {
      initialVisibility[setName] = false;
    });
    setVisibleSets(initialVisibility);
  }, []);

  const toggleVisibility = (setName) => {
    setVisibleSets(prev => ({
      ...prev,
      [setName]: !prev[setName]
    }));
  };

  const saveToFile = () => {
    const jsonString = JSON.stringify(filteredSets, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "updated-cards.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <BorderedFrame>
      <h1>Quais cartas faltam para completar minha pokedex?</h1>
      <button onClick={saveToFile} style={{ margin: "10px" }}>Save to JSON</button>
      {Object.keys(filteredSets).length > 0 ? (
        <div className="sets-container">
          {Object.entries(filteredSets).map(([set, cardsInSet]) => (
            <div className="set" key={set}>
              <h2 
                onClick={() => toggleVisibility(set)} 
                style={{ cursor: "pointer" }}
              >
                Set: {set} ({cardsInSet.length} faltando)
              </h2>
              {visibleSets[set] && (
                <div
                  className="cards-container"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {cardsInSet.map((card) => (
                    <div
                      className="card"
                      key={card.id}
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "4px",
                      }}
                    >
                      <h3>
                        {card.name} - Pokédex #{card.pokedex}
                      </h3>
                      <p>ID Original: {card.id}</p>
                      <img
                        src={`${card.image}/low.png`}
                        alt={card.name}
                        width="100"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Todos os cards da minha coleção estão nos sets.</p>
      )}
    </BorderedFrame>
  );
};

export default Pokedex;
