import React, { useEffect, useState } from "react";
import axios from "axios";
import myCollection from "./mycollection.json";
import "./Collection.css";
import BorderedFrame from "./BorderedFrame";

const Collection = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [showMine, setShowMine] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1025"
        );
        const results = response.data.results;

        const pokemonData = await Promise.all(
          results.map(async (pokemon, index) => {
            const pokemonDetails = await axios.get(pokemon.url);
            return {
              name: pokemonDetails.data.name,
              pokedex: pokemonDetails.data.id,
              iHaveIt: myCollection.includes(pokemonDetails.data.id),
              image: pokemonDetails.data.sprites.front_default,
            };
          })
        );

        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  const showOnlyMine = (value) => {
    setShowMine(value);
  };
  
  return (
    <BorderedFrame>
      <h1>Pokémon Pokédex</h1>
      <button onClick={() => showOnlyMine(false)}>Show only mine</button>
      <button onClick={() => showOnlyMine(true)}>Show all</button>
      <div className="pokemon-grid">
        {pokemonList.map(
          (pokemon) =>
            (showMine || pokemon.iHaveIt) && (
              <div key={pokemon.pokedex} className="pokemon-card">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className={pokemon.iHaveIt ? "" : "grayscale"} // Apply class conditionally
                />
                <p>{pokemon.name}</p>
                <p>Pokédex: #{pokemon.pokedex}</p>
                <p>{pokemon.iHaveIt ? "I have it!" : "I don't have it."}</p>
              </div>
            )
        )}
      </div>
    </BorderedFrame>
  );
};

export default Collection;
