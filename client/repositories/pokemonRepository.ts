import { PokemonClient, GameClient, MainClient, PokemonMove, GrowthRateExperienceLevel, MoveClient } from "pokenode-ts";
import { getHpStat, getStat } from "../utils/pokemonStats";
import { capitalizeFirstLetter } from "../utils/utils";

export const getPokemonByIdQuery = async ({ queryKey }: { queryKey: any }) => {
  const pokemon = await getPokemonById(queryKey[1])
  return pokemon;
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
    const response = await api.getPokemonById(id)
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

export const getPokemonById = async (id: number) => {
  const api = new PokemonClient();
  const response = await api.getPokemonById(id)
  const stats = response.stats
  var species = (await api.getPokemonSpeciesByName(response.name))
  const entry = species.flavor_text_entries.filter(e => e.language.name == "en")[7].flavor_text
  const growthRate = species.growth_rate
  const growth = (await api.getGrowthRateByName(growthRate.name)).levels
  const moves = await getPokemonMoves(response.moves)

  const pokemon: Pokemon = {
    moves: moves,
    id: response.id,
    name: capitalizeFirstLetter(response.name),
    type: response.types[0].type.name,
    front: response.sprites.front_default,
    back: response.sprites.back_default,
    growthRate: growth,
    dexEntry: entry,
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
    currentMoves: moves.filter(e => e.level < 5 && e.learnMethod == "level-up")
  }

  return pokemon
}

export type Pokemon = {
  id: number;
  name: string;
  moves: IPokemonMove[]
  type: string;
  growthRate: GrowthRateExperienceLevel[]
  front: string;
  back: string;
  hp: number;
  attack: number;
  defence: number;
  specialAttack: number;
  specialDefence: number;
  speed: number;
  dexEntry: string;
  xp: number;
  level: number
  baseAttack: number,
  baseHp: number;
  baseSpecialAttack: number;
  baseDefence: number;
  baseSpecialDefence: number;
  baseSpeed: number
  height: number
  currentMoves: IPokemonMove[]
}


export type IPokemonMove = {
  name: string;
  level: number;
  power: number;
  accuracy: number;
  pp: number;
  type: string;
  learnMethod: string
}

const getPokemonMoves = async (moves: PokemonMove[]): Promise<IPokemonMove[]> => {
  const moveClient = new MoveClient()
  const movesArr = await Promise.all(moves
    .map(async (move): Promise<IPokemonMove> => {
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

export const getPokemonByName = async (name: string) => {
  const api = new PokemonClient();
  const response = await api.getPokemonByName(name)
  const stats = response.stats

  const pokemon = {
    id: response.id, name: response.name, type: response.types[0].type.name, front: response.sprites.front_default, back: response.sprites.back_default,
    hp: stats[0].base_stat, attack: stats[1].base_stat, defence: stats[2].base_stat, specialAttack: stats[3].base_stat, specialDefence: stats[4].base_stat, speed: stats[5].base_stat
  }

  return pokemon
}

export const getGenerationPokemonById = async ({ queryKey }: { queryKey: any }) => {
  return await getPokemonByGeneration(queryKey[1])
}

export const getPokemonByType = async ({ queryKey }: { queryKey: any }) => {
  const pokemon = await getPokemonByGeneration(1)
  return pokemon.filter(e => e.type == queryKey[1])
}

export const getPokemonByRarity = async ({ queryKey }: { queryKey: any }) => {
  const pokemon = await getPokemonByGeneration(1)
  return pokemon.filter(e => e.id <= 50 && e.id >= 10)
}

const getPokemonByGeneration = async (id: number) => {
  const data = await new GameClient().getGenerationById(id)
  const pokemon: any[] = []
  data.pokemon_species.map(async p => {
    pokemon.push(getPokemonByName(p.name))
  })
  return await Promise.all(pokemon)
}

export const getKantoLegendaries = async () => {
  const legendaryIds = [151, 150, 146, 145, 144]
  const pokemon = []
  legendaryIds.map((p) => getPokemonById(p))
  return await Promise.all(pokemon);
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


export const getRapidash = async () => {
  const api = new PokemonClient();
  const pokemon = await api.getPokemonById(78)
  console.log(pokemon.sprites)
}