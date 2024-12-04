import { Pokestyle } from "@/app/page";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import setaBaixo from "@/assets/setabaixo.png"
import setaCima from "@/assets/setacima.png"
type RenderPokemonProps = {
    pokemon: string | Pokestyle;
    realPokemon: Pokestyle | undefined;
    onValidate: (isValid: boolean) => void
}

function right(variableChoosed: number | string, variableOriginal?: number | string){
    try{
        if (typeof variableChoosed === 'undefined'){
            return 'bg-red-700'
        }
        
        if (typeof variableChoosed && typeof variableOriginal === 'string'){
            if (variableChoosed == variableOriginal){
                return 'bg-green-700'
            }else{
                return 'bg-red-700'
            }
        } else if (typeof variableChoosed === 'number' && typeof variableOriginal === 'number'){
            if (variableChoosed == variableOriginal){
                return 'bg-green-700'
            } else{
                return 'bg-white'
          }
           
        }
    } catch (error){
        console.error(error)
    }
}

function arredondaHeight(height: number){
    if (Number(height) > 10){
        return `${height.toString()[0]}m${height.toString().slice(1)}0`
    } else{
        return `${height}0cm`
    }
}

function analiseHeight(heightChoosed: number, heightOriginal: number){
    if (Number(heightChoosed) > Number(heightOriginal)){
        return setaBaixo
    } else{
        return setaCima
    }
}

export const RenderPokemon: FunctionComponent<RenderPokemonProps> = ({pokemon, realPokemon, onValidate}) => {
  if (typeof pokemon !== "string" && realPokemon) {
    console.log(realPokemon.name)
    if(pokemon.name == realPokemon.name){
      onValidate(true)
    } else{
      onValidate(false)
    }
    return (
      <div className="flex gap-5 flex-wrap justify-center mt-4 text-black">
        <div>
          <div className="border border-white text-center p-1">Pokemon</div>
          <img
            className="bg-white border border-black rounded w-20 h-16 object-cover"
            src={pokemon.photo}
            alt=""
          />
        </div>
        <div>
          <div className="border border-white text-center p-1">Cor</div>
          <div className={`${right(pokemon.color, realPokemon?.color)} border border-black rounded p-5 text-gray-900`}>
            {pokemon.color}
          </div>
        </div>

        <div>
          <div className="border border-white text-center p-1">Habitat</div>
          <div className={`${right(pokemon.habitat, realPokemon?.habitat)} border border-black rounded p-5 text-gray-900`}>
            {pokemon.habitat}
          </div>
        </div>

        <div>
          <div className="border border-white text-center p-1">Altura</div>
          
          <div className={`${right(Number(pokemon.height), Number(realPokemon?.height))} border border-black rounded p-5 text-gray-900 flex gap-1`}>
            {arredondaHeight(pokemon.height)}
            {pokemon.height === realPokemon.height ? (
                <p></p>
            ) : (
                <Image src={analiseHeight(pokemon.height, realPokemon?.height)} width={20} height={20} alt="Menor"></Image>                
            )}

          </div>
        </div>

        {pokemon.types.length === 1 ? (
          <div className="flex gap-5 flex-wrap justify-center">
            <div>
              <div className="border border-white text-center p-1">
                Tipo 1:
              </div>
              {realPokemon.types.length > 1 ? (
                <div>
                  {realPokemon.types[1].type.name === pokemon.types[0].type.name ? (
                    <div className="bg-yellow-500 border border-black rounded p-5 text-gray-900">
                      {pokemon.types[0].type.name}
                    </div>
                  ) : (
                    <div className={`${right(pokemon.types[0].type.name, realPokemon?.types[0].type.name)} border border-black rounded p-5 text-gray-900`}>
                    {pokemon.types[0].type.name}
                  </div>
                  )}
                </div>
              ) : (
                <div>

                  <div className={`${right(pokemon.types[0].type.name, realPokemon?.types[0].type.name)} border border-black rounded p-5 text-gray-900`}>
                    {pokemon.types[0].type.name}
                  </div>
                </div>
              )}
            </div>
            <div>
            {realPokemon.types.length > 1 ? (
                <div>
                    <div className="border border-white text-center p-1">
                        Tipo 2:
                    </div>
                    <div className="bg-white border border-black rounded p-5 text-gray-900">
                        Não tem
                    </div>
                </div>
            ) : (
                <div>
                    <div className="border border-white text-center p-1">
                        Tipo 2:
                    </div>
                    <div className="bg-green-700 border border-black rounded p-5 text-gray-900">
                        Não tem
                    </div>
                </div>
            )}
              </div>
          </div>
        ) : (
            
            <div className="flex gap-5 flex-wrap justify-center">
            <div>
              <div className="border border-white text-center p-1">
                Tipo 1:
              </div>
              <div className={`${right(pokemon.types[0].type.name, realPokemon?.types[0].type.name)} border border-black rounded p-5 text-gray-900`}>
                {pokemon.types[0].type.name}

              </div>
            </div>
            <div>
              <div className="border border-white text-center p-1">
                Tipo 2:
              </div>
              {pokemon.types[1].type.name === realPokemon.types[0].type.name ? (
                <div>
                  <div className={`bg-yellow-500 border border-black rounded p-5 text-gray-900`}>
                      {pokemon.types[1].type.name}
                    </div>
                </div>
              ) : (
                <div>
                  {realPokemon.types.length > 1 ? (  
                    <div className={`${right(pokemon.types[1].type.name, realPokemon?.types[1].type.name)} border border-black rounded p-5 text-gray-900`}>
                      {pokemon.types[1].type.name}
                    </div>
                  ) : (
                    <div className={`bg-red-700 border border-black rounded p-5 text-gray-900`}>
                      {pokemon.types[1].type.name}
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  } else{
    return(
      <div>
        Gere um Pokemon aleatório antes de selecionar sua escolha!
      </div>
    )
  }
};
