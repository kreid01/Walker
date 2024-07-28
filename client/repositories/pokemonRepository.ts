import { PokemonClient, GameClient, MainClient, PokemonMove, GrowthRateExperienceLevel, MoveClient } from "pokenode-ts";
import { getHpStat, getStat } from "../utils/pokemonStats";
import { capitalizeFirstLetter, generateRandom } from "../utils/utils";
import { IPokemonMove, Pokemon } from "../types/types";
import axios from "axios";
import { getPokemonCache, storePokemonCache } from "../utils/secureStorage";

export const getPokemonByIdQuery = async ({ queryKey }: { queryKey: any }) => {
  if (!queryKey[1]) return;
  const pokemon = await getPokemonById(queryKey[1])
  return pokemon;
}

export const getTeamQuery = async ({ queryKey }: { queryKey: any }) => {
  const teamIds = queryKey[1]
  const team = await Promise.all(teamIds.map(async (id) => {
    return await getPokemonById(id)
  }))

  return team
}

export const getPokemonImageQuery = async ({ queryKey }: { queryKey: any }) => {
  const api = new PokemonClient();
  const response = await api.getPokemonById(queryKey[1])
  return { id: response.id, front: response.sprites.front_default }
}

export const getPokemonGrowthRate = async (id: number) => {
  const api = new PokemonClient();
  const response = await api.getPokemonById(id)
  var species = (await api.getPokemonSpeciesByName(response.name))
  const growthRate = species.growth_rate
  const growth = (await api.getGrowthRateByName(growthRate.name)).levels
  return growth;
}

export const getTeamByIds = async ({ queryKey }: { queryKey: any }): Promise<TeamPokemon[]> => {
  const ids = queryKey[1]
  const api = new PokemonClient();

  return await Promise.all(ids.map(async (id) => {
    const response = await api.getPokemonById(id);
    const stats = response.stats
    const moves = await getPokemonMoves(response.moves)

    return {
      moves: moves,
      id: response.id,
      name: capitalizeFirstLetter(response.name),
      type: response.types[0].type.name,
      front: response.sprites.front_default,
      hp: getHpStat(stats[0].base_stat, 1),
      currentMoves: moves.filter((e, i) => i < 3 && e.level < 5 && e.learnMethod == "level-up")
    }
  }))

}

export type TeamPokemon = {
  moves: IPokemonMove[];
  id: number;
  name: string;
  type: string;
  front: string;
  currentMoves: IPokemonMove[]
}

type FusionPokemon = {
  image: string;
  stats: FusionStats;
  types: string[]
}

type FusionStats = {
  attack: number;
  defence: number;
  hp: number;
  specialAttack: number;
  specialDefence: number;
  speed: number;
}


export const getFusionPokemonById = async ({ queryKey }: { queryKey: any }) => {
  const api = new PokemonClient();
  const id = queryKey[1]
  const secondPokemonId = generateRandom(500, 0)
  const params = { id1: id, id2: secondPokemonId }
  const { data: fusion } = await axios.get<FusionPokemon>("http://localhost:8080/fusion", { params })
  const response = await api.getPokemonById(id)
  const response2 = await api.getPokemonById(secondPokemonId)
  const moves = await getPokemonMoves(response.moves)
  const moves2 = await getPokemonMoves(response2.moves)

  const name1stHalf = response.name.substring(0, Math.floor(response.name.length / 2))
  const name2ndHalf = response2.name.substring(Math.floor(response2.name.length / 2), response2.name.length)

  const pokemon: Pokemon = {
    fusion: true,
    moves: moves,
    id: response.id,
    name: capitalizeFirstLetter(name1stHalf + name2ndHalf),
    types: fusion.types,
    front: fusion.image,
    back: response.sprites.back_default,
    growthRate: null,
    dexEntry: null,
    currentHp: getHpStat(fusion.stats.hp, 1),
    hp: getHpStat(fusion.stats.hp, 1),
    attack: getStat(fusion.stats.attack, 1),
    defence: getStat(fusion.stats.defence, 1),
    specialAttack: getStat(fusion.stats.specialAttack, 1),
    specialDefence: getStat(fusion.stats.specialDefence, 1),
    speed: getStat(fusion.stats.speed, 1),
    baseHp: fusion.stats.hp,
    baseAttack: fusion.stats.attack,
    baseDefence: fusion.stats.defence,
    baseSpecialAttack: fusion.stats.specialAttack,
    baseSpecialDefence: fusion.stats.specialDefence,
    baseSpeed: fusion.stats.speed,
    level: 1,
    xp: 0,
    height: response.height,
    currentMoves: [...moves, ...moves2].filter((e, i) => i < 3 && e.level < 5 && e.learnMethod == "level-up"),
    attackLevel: 0,
    defenceLevel: 0,
    hpLevel: 0,
    specialAttackLevel: 0,
    specialDefenceLevel: 0,
    speedLevel: 0,
    shiny: false,
  }

  return pokemon
}

export const getPokemonById = async (id: number) => {
  const api = new PokemonClient();
  const response = await api.getPokemonById(id)
  const stats = response.stats
  var species = (await api.getPokemonSpeciesByName(response.name))
  const entry = species.flavor_text_entries.filter(e => e.language.name == "en")[2].flavor_text
  //const growthRate = species.growth_rate
  //  const growth = (await api.getGrowthRateByName(growthRate.name)).levels
  const moves = await getPokemonMoves(response.moves)

  const pokemon: Pokemon = {
    fusion: false,
    moves: moves,
    id: response.id,
    name: capitalizeFirstLetter(response.name),
    types: [response.types[0].type.name, response.types.length > 1 && response.types[1].type.name],
    front: response.sprites.front_default,
    back: response.sprites.back_default,
    growthRate: null,
    dexEntry: entry,
    currentHp: getHpStat(stats[0].base_stat, 1),
    hp: getHpStat(stats[0].base_stat, 1),
    attack: getStat(stats[1].base_stat, 1),
    defence: getStat(stats[2].base_stat, 1),
    specialAttack: getStat(stats[3].base_stat, 1),
    specialDefence: getStat(stats[4].base_stat, 1),
    speed: getStat(stats[5].base_stat, 1),
    baseHp: stats[0].base_stat,
    baseAttack: stats[1].base_stat,
    baseDefence: stats[2].base_stat,
    baseSpecialAttack: stats[3].base_stat,
    baseSpecialDefence: stats[4].base_stat,
    baseSpeed: stats[5].base_stat,
    level: 1,
    xp: 0,
    height: response.height,
    currentMoves: moves.filter((e, i) => e.level < 5 && e.learnMethod == "level-up").filter((m, i) => i < 3),
    attackLevel: 0,
    defenceLevel: 0,
    hpLevel: 0,
    specialAttackLevel: 0,
    specialDefenceLevel: 0,
    speedLevel: 0,
    shiny: false,
  }


  return pokemon
}


const getPokemonMoves = async (moves: PokemonMove[]): Promise<IPokemonMove[]> => {
  const moveClient = new MoveClient()
  const movesArr = await Promise.all(moves.map(async (move, i): Promise<IPokemonMove> => {
    const moveObject = await moveClient.getMoveByName(move.move.name)
    return {
      name: move.move.name,
      level: move.version_group_details[0].level_learned_at,
      accuracy: moveObject.accuracy,
      power: moveObject.power,
      pp: moveObject.pp,
      type: moveObject.type.name,
      learnMethod: move.version_group_details[0].move_learn_method.name
    }
  }))

  return movesArr;
}

export const getPokemonMovesQuery = async ({ queryKey }: { queryKey: any }): Promise<IPokemonMove[]> => {
  const pokemon = await new PokemonClient().getPokemonById(queryKey[1])
  const moves = pokemon.moves
  const moveClient = new MoveClient()
  const movesArr = await Promise.all((moves).map(async (move, i): Promise<IPokemonMove> => {
    const moveObject = await moveClient.getMoveByName(move.move.name)
    return {
      name: move.move.name,
      level: move.version_group_details[0].level_learned_at,
      accuracy: moveObject.accuracy,
      power: moveObject.power,
      pp: moveObject.pp,
      type: moveObject.type.name,
      learnMethod: move.version_group_details[0].move_learn_method.name
    }
  }))

  return movesArr;
}

export const getPokemonByNameQuery = async ({ queryKey }: { queryKey: any }) => {
  return await getPokemonByName(queryKey[1])
}

export const getPokemonByName = async (name: string) => {
  if (name) {
    const api = new PokemonClient();
    const response = await api.getPokemonByName(name)
    const stats = response.stats

    const pokemon: ShopPokemon = {
      id: response.id, name: response.name, types: [response.types[0].type.name, response.types.length > 1 && response.types[1].type.name],
      hp: stats[0].base_stat, attack: stats[1].base_stat, defence: stats[2].base_stat,
      specialAttack: stats[3].base_stat, specialDefence: stats[4].base_stat, speed: stats[5].base_stat,

    }

    return pokemon
  }
}

export type ShopPokemon = {
  id: number;
  name: string;
  types: string[]
  hp: number;
  attack: number;
  defence: number;
  specialAttack: number;
  specialDefence: number;
  speed: number;
}

export const getPokemonEntry = async ({ queryKey }: { queryKey: any }) => {
  const api = new PokemonClient();
  var species = (await api.getPokemonSpeciesByName(queryKey[1]))
  return species.flavor_text_entries.filter(e => e.language.name == "en")[2].flavor_text
}


export const getMyPokemon = async ({ queryKey }: { queryKey: any }) => {
  const ids = queryKey[1].split(',');
  const pokemon = []
  ids.map((i: string) => {
    pokemon.push(getPokemonById(parseInt(i)))
  }
  )
  return await Promise.all(pokemon);
}

export const getPokemonByType = async ({ queryKey }: { queryKey: any }) => {
  const pokemon = await getGen5Pokemon(queryKey[1])
  return pokemon.filter(e => e.types.some(t => t == queryKey[1]))
}

export const getGen5Pokemon = async (type: string) => {
  const api = new PokemonClient();
  const data = (await api.listPokemons(0, 649)).results
  const pokemon = await Promise.all(data.map(async p => {
    const cachedPokemon = await getPokemonCache(p.name)
    if (cachedPokemon) return cachedPokemon
    else {
      const calledPokemon = await getPokemonByName(p.name)
      await storePokemonCache(calledPokemon)
      return cachedPokemon;
    }
  }))

  return pokemon.filter(e => e.types.some(t => t == type))
}


const getPokemonByGeneration = async (id: number) => {
  const data = await new GameClient().getGenerationById(id)
  const pokemon: any[] = []
  data.pokemon_species.map(async p => {
    const cachedPokemon = await getPokemonCache(p.name)
    if (cachedPokemon) return cachedPokemon
    else {
      const calledPokemon = await getPokemonByName(p.name)
      await storePokemonCache(calledPokemon)
      return cachedPokemon;
    }
  })
  return await Promise.all(pokemon)
}

