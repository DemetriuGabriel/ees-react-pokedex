import {React, useEffect, useState} from 'react';
import axios from 'axios';

import Pokemon from './Pokemon';
import { getPokemonData } from '../api';

const PokemonList = () => {
    const [pokemonsList, setPokemonsList] = useState([]);
    //const [currentPage, setCurrentPage] = useState(1);
    //const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getPokemonsList = async (limit = 20, offset=0) => {
            //setLoading(true);
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
                );
                const {data} = response;

                const promises = data.results.map(async (pokemon) => {
                    return await getPokemonData(pokemon.url);
                });

                const results = await Promise.all(promises)

                setPokemonsList(results);
                //setLoading(false);
                //setCurrentPage((prevPage) => prevPage + 1);

            } catch (error) {
                console.error('Error Fetching Pokemon List', error)
                //setLoading(false);
            }
        };

        getPokemonsList();
    }, [pokemonsList /*currentPage*/]);

    /*useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.scrollHeight
            ) {
                getPokemonsList();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [currentPage]);*/

    return (
        <div>
            <h2>Pokedex</h2>
            <div className="pokedexgrid">
                {pokemonsList && pokemonsList.map((pokemon, index) => {
                    return (
                        <Pokemon key={index} pokemon={pokemon} />
                    );
                })}
            </div>
        </div>
    );

};

export default PokemonList;