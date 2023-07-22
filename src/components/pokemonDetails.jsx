import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetails = () => {
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemon, setPokemon] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [updatePokemon, setUpdatePokemon] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        if (!pokemonNumber) {
          setPokemon('');
          setPokemonTypes([]);
          return;
        }

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
        const { data } = response;
        setPokemon(data);

        const types = data.types.map((typeInfo) => typeInfo.type.name);
        setPokemonTypes(types);

      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    if (updatePokemon) {
        fetchPokemonDetails(); //resetar o estados das reqs do pokemon details
        setUpdatePokemon(false);
    }

  }, [pokemonNumber, updatePokemon]);

  const handleInputChange = (event) => {
    setPokemonNumber(event.target.value);
  };

  const handleUpdateClick = () => {
    setUpdatePokemon(true);
  }

  return (
    <div>
      <input
        type="number"
        value={pokemonNumber}
        onChange={handleInputChange}
        placeholder="Enter Pokémon number"
      />
      <button onClick={handleUpdateClick}>Atualizar Pokémon</button>
      <div>
        {pokemon.name ? <h2>Pokémon Name: {pokemon.name}</h2> : <p>No Pokémon found</p>}
        {pokemonTypes.length > 0 && (
          <div>
            <h3>Types:</h3>
            <ul>
              {pokemonTypes.map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;