import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSharedValue } from "react-native-reanimated";
import { getFusionPokemonById, getPokemonByIdQuery } from "../repositories/pokemonRepository";
import { Pokemon } from "../types/types";
import { getPokemonStats } from "../utils/pokemonStats";
import { generateRandom } from "../utils/utils";

export const useGetPokemon = (pokemonId: number, round: number, fusion: boolean) => {
    const method = fusion ? getFusionPokemonById : getPokemonByIdQuery
    const { data: pokemon, isSuccess } = useQuery(["pokemon", pokemonId], method)
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon>()

    useEffect(() => {
        let min = 1
        if (round < 4) min = 2
        else min = round - 3
        const level = generateRandom(round + 3, min)
        if (pokemon) setCurrentPokemon(getPokemonStats(pokemon, 0, level))
    }, [pokemon])


    const health = useSharedValue<number>(currentPokemon?.hp)
    useEffect(() => {
        health.value = currentPokemon?.hp
    }, [currentPokemon, pokemon])

    return { currentPokemon, isSuccess, health, setCurrentPokemon }
}
