import { PokemonClient, GameClient, MainClient, PokemonMove, GrowthRateExperienceLevel, MoveClient } from "pokenode-ts";
import { getHpStat, getStat } from "../utils/pokemonStats";
import { capitalizeFirstLetter } from "../utils/utils";
import pokemonData from "../data/pokemon.json"
import { IPokemonMove, Pokemon } from "../types/types";

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
    moves: moves,
    id: response.id,
    name: capitalizeFirstLetter(response.name),
    type: response.types[0].type.name,
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
    currentMoves: moves.filter((e, i) => i < 3 && e.level < 5 && e.learnMethod == "level-up")
  }


  return pokemon
}


const getPokemonMoves = async (moves: PokemonMove[]): Promise<IPokemonMove[]> => {
  const moveClient = new MoveClient()
  const movesArr = await Promise.all((moves).filter(e =>
    e.version_group_details[0].level_learned_at < 5
    && e.version_group_details[0].move_learn_method.name == "level-up")
    .map(async (move, i): Promise<IPokemonMove> => {
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

    const pokemon = {
      id: response.id, name: response.name, type: response.types[0].type.name, front: response.sprites.front_default,
      back: response.sprites.back_default, hp: stats[0].base_stat, attack: stats[1].base_stat, defence: stats[2].base_stat,
      specialAttack: stats[3].base_stat, specialDefence: stats[4].base_stat, speed: stats[5].base_stat
    }

    return pokemon
  }
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
  const pokemon = await getPokemonByGeneration(1)
  return pokemon.filter(e => e.type == queryKey[1])
}


const getPokemonByGeneration = async (id: number) => {
  const data = await new GameClient().getGenerationById(id)
  const pokemon: any[] = []
  data.pokemon_species.map(async p => {
    pokemon.push(getPokemonByName(p.name))
  })
  return await Promise.all(pokemon)
}
