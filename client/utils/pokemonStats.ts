import { Pokemon } from "../types/types"

export const getPokemonStats = (pokemon: Pokemon, xp: number, level: number): Pokemon => {
    return ({
        ...pokemon,
        hp: getHpStat(pokemon.hp, level),
        attack: getStat(pokemon.attack, level),
        specialAttack: getStat(pokemon.specialAttack, level),
        specialDefence: getStat(pokemon.specialDefence, level),
        speed: getStat(pokemon.speed, level),
        baseAttack: pokemon.attack,
        baseDefence: pokemon.defence,
        baseHp: pokemon.hp,
        baseSpecialAttack: pokemon.specialAttack,
        baseSpecialDefence: pokemon.specialDefence,
        baseSpeed: pokemon.speed,
        xp: xp,
        level: level
    })
}

export const getHpStat = (hp: number, level: number) => {
    return Math.floor(0.01 * (2 * hp + 13) * level) + level + 10
}

export const getStat = (stat: number, level: number) => {
    return (Math.floor(0.01 * (2 * stat + 13) * level) + 5)
}
