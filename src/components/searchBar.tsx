import { useState } from "react";
import { PokeCard } from "../app/page";

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const SearchBar = (
  {pokemon, 
  onPokemonClick}: {pokemon: PokeCard[]; onPokemonClick: (name: string) => void}
) => {
    const [query, setQuery] = useState<string>("")
    const filterData = pokemon.filter((pokemon) => pokemon.name.toLowerCase().startsWith(query.toLowerCase()))
    return(
        <div className="flex justify-center flex-col items-center">
          <input 
          className="text-red-600 w-52 border border-black rounded"
          type="text" 
          placeholder="Nome do Pokemon"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
          {query !== ''? (
            filterData.length > 0 && query!== '' ? (
              
              <ul>
                {filterData.map((pokemon,index) => (
                  <li key={index} >
                    <button onClick={(e) => onPokemonClick(pokemon.name)} className="flex bg-white w-52 items-center justify-evenly border border-black rounded">
                      <img src={pokemon.photo} alt="" className="w-7"/>
                      <p className="text-black ">{capitalizeFirstLetter(pokemon.name)}</p>
                    </button>
                    </li>
                ))}
              </ul>
            ): (
              <p>Nenhum Pokemon encontrado</p>
            )
            
          ): (
            <p></p>
          )}
            
        </div>
    )
}