import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { getTeamQuery } from "../repositories/pokemonRepository";
import { Pokemon } from "../types/types";

export const useGetTeam = (teamIds: number[], currentPokemonHealth: number) => {
    const { data: pokemon, isSuccess } = useQuery(["pokemon", teamIds], getTeamQuery)
    const [team, setTeam] = useState<Pokemon[]>()

    const effectTriggeredRef = useRef(false)
    const initialTeamTriggerRef = useRef(false)

    const [oldTeamIds, setOldTeamIds] = useState(teamIds)
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon>()

    const updateTeamIds = (health: number) => {
        let newTeam = team;
        let currentPokemon = newTeam.filter(e => e.id == currentPokemon.id)[0]
        currentPokemon.currentHp = health;
        setTeam(newTeam)
    }

    useEffect(() => {
        if (pokemon && team) {
            const newTeam = team.filter(e => e && oldTeamIds.includes(e.id))
            const newPokemon = pokemon.filter(e => !oldTeamIds.includes(e.id))[0]
            let pokemonToSwich = newTeam.filter(e => e && e.id == currentPokemon?.id)[0]
            pokemonToSwich = currentPokemon
            pokemonToSwich.currentHp = currentPokemonHealth
            newTeam.push(newPokemon ?? newPokemon)
            setTeam(newTeam)
            setOldTeamIds(teamIds)
        }
    }, [pokemon])

    const changePokemon = (id: number) => {
        if (currentPokemon) {
            const newTeam = team.filter(e => e && e.id != currentPokemon?.id)
            let pokemonToSwich = newTeam.filter(e => e && e.id == currentPokemon?.id)[0]
            pokemonToSwich = currentPokemon
            pokemonToSwich.currentHp = health.value
            newTeam.push(pokemonToSwich)
            setTeam(newTeam.filter(e => e))
        }


        setCurrentPokemon(team.filter(e => e.id == id)[0])
    }

    useEffect(() => {
        if (!initialTeamTriggerRef.current && pokemon) {
            initialTeamTriggerRef.current = true;
            setTeam(pokemon)
        }
    }, [pokemon]);


    useEffect(() => {
        if (!effectTriggeredRef.current && team) {
            effectTriggeredRef.current = true;
            changePokemon(teamIds[0])
        }
    }, [team]);

    const health = useSharedValue<number>(currentPokemon?.hp)
    useEffect(() => {
        health.value = currentPokemon?.currentHp
    }, [currentPokemon])

    return { currentPokemon, isSuccess, health, setCurrentPokemon, changePokemon, setTeam, team, updateTeamIds }
}