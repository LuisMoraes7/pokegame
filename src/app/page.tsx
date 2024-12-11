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
  //variavel que obtem a resposta do componente renderPokemon se o usuario descobriu ou nao o pokemon aleatorio.
  const handleValidation = (isValid: boolean) => {
    setTimeout(() => {
      setSucess(isValid);
    }, 0);
  };
  //guarda o pokemon aleatorio
  const [randomPokemon, setRandomPokemon] = useState<Pokestyle>();

  //guarda todos os pokemons
  const [data, setData] = useState<Pokestyle[]>();

  //lista MUTAVEL de pokemons que é mudada a cada click do usuario (que remove um pokemon da lista)
  const [dataToSearch, setDataToSearch] = useState<PokeCard[]>([]);

  //lista original de card de Pokemons (que serao renderizadas na busca a cada fim de tentativa) imutavel
  const [cardOriginal, setCardOriginal] = useState<PokeCard[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://luismoraes7.github.io/myself/pokemons.json`
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
  //variavel booleana que guarda se o usuario acertou ou nao o pokemon
  const [sucess, setSucess] = useState(false);

  //gera um pokemon random
  function catchRandomPokemon() {
    if (data) {
      const randomIndex = Math.floor(Math.random() * data?.length);
      setRandomPokemon(data[randomIndex]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  //contador para o numero de tentativas do usuario
  const [counter, setCounter] = useState(0);
  //entrara na pokemonList
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  //variavel que sera renderizada em tela
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const handlePokemonClick = (name: string) => {
    if (randomPokemon) {
      setSelectedPokemon(name);
      //adiciona o pokemon numa lista para ela ser renderizada em tela
      setPokemonList((prevList) => [...prevList, name]);
      //retira o nome do pokemon da busca quando clicado
      setDataToSearch((prevData) => prevData.filter((p) => p.name !== name));
      setCounter(counter + 1);
    } else {
      return alert("Gere um Pokemon primeiro!");
    }
  };

  //funcao que obtem o nome do pokemon e converte em um objeto que esta dentro de data
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

  //ao apertar no botao de adivinhar de novo
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
          <p className="text-black">Quer adivinhar um pokemon? Gere o Pokemon aleatório primeiro clicando no botão!</p>
          <button onClick={catchRandomPokemon} className="bg-red-900 p-1 border border-black rounded text-white hover:bg-red-700 hover:text-black">
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
