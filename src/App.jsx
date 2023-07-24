import { React } from 'react'
import './App.css'
import PokemonDetails from './components/pokemonDetails'
import PokemonList from './components/pokemonList'


function App() {
  
  return (
    <>
      <div className="card">
        <PokemonDetails />
        <PokemonList />
      </div>
    </>
  )
}

export default App
