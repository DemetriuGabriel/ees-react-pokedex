import { React, useState, useEffect } from 'react';

import Pokemon from './Pokemon';
import { getPokemons, getPokemonData } from '../api'

const PokemonList = () => {

    const [loading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        console.log("carregou");

        const fetchPokemons = async () => {
            try {
                //setLoading(true)
                const data = await getPokemons(20, (currentPage - 1) * 20);
                const promises = data.results.map(async (pokemon) => {
                    return await getPokemonData(pokemon.url);
                });

                const results = await Promise.all(promises)
            
                setPokemons((prevList) => [...prevList, ...results]);
                setLoading(false);

            } catch (error) {
                console.log("fetch pokemons error: ", error)
            }
        }

        fetchPokemons();
    }, [currentPage]);

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            // When the user scrolls to the bottom 100px of the page, load more Pokémon
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className="pokedex-header">
                <h2>Pokedex</h2>
            </div>
            {loading ? (<h3>Carregando!</h3>
            ) : (
                <div className="pokedex-grid">
                    {pokemons && pokemons.map((pokemon, index) => {
                        return (
                            <Pokemon key={index} pokemon={pokemon} />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PokemonList;