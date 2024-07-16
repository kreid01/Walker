import { Pokemon } from "../repositories/pokemonRepository";
import { generateRandom } from "../utils/utils";

export const levelPokemon = (pokemon: Pokemon) => {
    const xp = generateRandom()
    const xpNeeded = pokemon.growthRate.filter(e => e.experience == pokemon.level)[0].experience;
    return xpNeeded - (pokemon.xp + xp)
}