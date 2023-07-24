import React, { useState, useEffect } from 'react';
import { searchPokemon } from '../api';
import Pokemon from './Pokemon';

const PokemonDetails = () => {
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemon, setPokemon] = useState('');
  const [updatePokemon, setUpdatePokemon] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        if (!pokemonNumber) {
          setPokemon('');
          return;
        }

        setLoading(true);
        const data = await searchPokemon(pokemonNumber);
        setPokemon(data);
        setLoading(false)

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
      {loading ? (<h2>Carregando!</h2>) : (
        <div>
          {pokemon ? <Pokemon pokemon={pokemon} /> : <h2>Pokémon not found!</h2>}
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;