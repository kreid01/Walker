import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSharedValue } from "react-native-reanimated";
import { getPokemonByIdQuery } from "../repositories/pokemonRepository";
import { Pokemon } from "../types/types";

export const useGetPokemon = (pokemonId: number) => {
    const { data: pokemon, isSuccess } = useQuery(["pokemon", pokemonId], getPokemonByIdQuery)
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon>()

    useEffect(() => {
        setCurrentPokemon(pokemon)
    }, [pokemon])


    const health = useSharedValue<number>(currentPokemon?.hp)
    useEffect(() => {
        health.value = currentPokemon?.hp
    }, [currentPokemon, pokemon])

    return { currentPokemon, isSuccess, health, setCurrentPokemon }
}
