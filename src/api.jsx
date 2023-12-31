import axios from 'axios';

export const searchPokemon = async (pokemon) => {
    try{
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const response = await fetch(url)
        return await response.json();
    } catch (error) {
         console.log("error: ", error)
    }
}

export const getPokemonData = async (url) => {
    try {
        const response = await fetch(url)
        return await response.json();
    } catch (error) {
        console.log('error: ', error)
    }
}

export const getPokemons = async (limit=20, offset=0) => {
    try {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const {data} = response;
        return data;

    } catch (error) {
        console.error('Error Fetching Pokemon List', error)
    }
}