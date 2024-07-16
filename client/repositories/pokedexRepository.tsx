import axios from "axios"
import { PokemonClient } from "pokenode-ts"
import { getStoredPokedex, getValueFor, savePokedex } from "../utils/secureStorage"

export const getPokedex = async () => {
    const storedPokedex = await getStoredPokedex()
    if (storedPokedex.length > 1) {
        return getStoredPokedex()
    }

    //const limit = pageParam* 100
    const api = new PokemonClient()
    // const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${limit - 100}`)
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${151}&offset=${0}`)

    const pokemon = await Promise.all(data.results.map(async (p, i) => {
        const mon = await api.getPokemonByName(p.name);
        const front = mon.sprites.front_default
        return { name: p.name, image: front }
    }
    ))

    savePokedex(pokemon)
    return pokemon
}
