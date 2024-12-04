"use client";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/searchBar";
import { RenderPokemon } from "@/components/renderPokemon";
import "./globals.css";
import { Footer } from "@/components/footer";
interface type {
  name: string;
  url: string;
}
interface types {
  slot: number;
  type: type;
}
export interface Pokestyle {
  name: string;
  photo: string;
  types: Array<types>;
  color: string;
  height: number;
  habitat: string;
}

export interface PokeCard {
  name: string;
  photo: string;
}

export default function Home() {
  const handleValidation = (isValid: boolean) => {
    setTimeout(() => {
      setSucess(isValid);
    }, 0);
  };
  const [randomPokemon, setRandomPokemon] = useState<Pokestyle>();

  const [data, setData] = useState<Pokestyle[]>();

  const [dataToSearch, setDataToSearch] = useState<PokeCard[]>([]);

  const [cardOriginal, setCardOriginal] = useState<PokeCard[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://luismoraes7.github.io/Testes/pokemons.json`
      );
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      const result = await response.json();
      setData(result);
      const pokemonsNames: PokeCard[] = result.map((pokemon: Pokestyle) => ({
        name: pokemon.name,
        photo: pokemon.photo,
      }));
      setDataToSearch(pokemonsNames);
      setCardOriginal(pokemonsNames);
    } catch (error) {
      console.log(error);
    }
  };
  const [sucess, setSucess] = useState(false);

  function catchRandomPokemon() {
    if (data) {
      const randomIndex = Math.floor(Math.random() * data?.length);
      setRandomPokemon(data[randomIndex]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [counter, setCounter] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const handlePokemonClick = (name: string) => {
    if (randomPokemon) {
      setSelectedPokemon(name);
      setPokemonList((prevList) => [...prevList, name]);
      setDataToSearch((prevData) => prevData.filter((p) => p.name !== name));
      setCounter(counter + 1);
    } else {
      return alert("Selecione um Pokemon primeiro!");
    }
  };

  const discoverPokemon = (pokeName: string): Pokestyle | string => {
    if (data !== undefined) {
      const pokemon = data.find(
        (p) => p.name.toLowerCase() === pokeName.toLowerCase()
      );
      if (pokemon) {
        return pokemon;
      } else {
        return "none";
      }
    } else {
      return "none";
    }
  };

  function handleUpdate() {
    setSucess(false);
    setSelectedPokemon(null);
    setRandomPokemon(undefined);
    setCounter(0);
    setPokemonList([]);
    setDataToSearch(cardOriginal);
  }

  return (
    <div className="mt-6 text-center">
      {data && randomPokemon ? (
        <div>
          {sucess ? (
            <div>
              <p className="text-black">Parabéns! Você acertou.</p>
            </div>
          ) : (
            <h1 className="text-black">Escreva o nome do Pokemon (seu palpite!)</h1>
          )}
        </div>
      ) : (
        <div>
          <p className="text-black">Gere o Pokemon!</p>
          <button onClick={catchRandomPokemon} className="bg-red-900 text-black">
            Gerar pokemon aleatório
          </button>
        </div>
      )}
      {data ? (
        <div>
          {sucess ? (
            <div>
              {selectedPokemon ? (
                <div className="text-center">
                  <RenderPokemon
                    onValidate={handleValidation}
                    pokemon={discoverPokemon(selectedPokemon)}
                    realPokemon={randomPokemon}
                  ></RenderPokemon>
                  <div className="mt-8 text-black">
                    <p>Número de tentativas: {counter}</p>
                    <p>Deseja jogar de novo? </p>
                    <button
                      onClick={handleUpdate}
                      className="bg-green-800 p-2 rounded hover:bg-green-400 text-black"
                    >
                      Sim
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-black">Pokemon não selecionado</p>
              )}
            </div>
          ) : (
            <div className="mt-4">
              <SearchBar
                pokemon={dataToSearch}
                onPokemonClick={handlePokemonClick}
              />
              {selectedPokemon ? (
                <div>
                  {pokemonList.map((pokemon, index) => (
                    <RenderPokemon
                      onValidate={handleValidation}
                      pokemon={discoverPokemon(pokemon)}
                      key={index}
                      realPokemon={randomPokemon}
                    ></RenderPokemon>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
      <Footer></Footer>
    </div>
  );
}
