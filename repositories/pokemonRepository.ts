import { PokemonClient, GameClient, MainClient} from "pokenode-ts";

export const getPokemonByIdQuery = async ({queryKey}: {queryKey:any}) => {
    const pokemon = await getPokemonById(queryKey[1])
    return pokemon;
}

export const getPokemonImageQuery = async ({queryKey}: {queryKey:any}) => {
  const api = new PokemonClient();
  const response = await api.getPokemonById(queryKey[1])
  return {id: response.id, front: response.sprites.front_default}
}

export const getPokemonGrowthRate = async(id: number) => {
  const api = new PokemonClient();
  const response = await api.getPokemonById(id)
  var species =(await api.getPokemonSpeciesByName(response.name))
  const growthRate = species.growth_rate
  const growth = (await api.getGrowthRateByName(growthRate.name)).levels
return growth;
}

export const getPokemonById = async (id :number ) => {
  try {
  const api = new PokemonClient();
  const response = await api.getPokemonById(id)
  const stats =  response.stats
  var species =(await api.getPokemonSpeciesByName(response.name))
 const entry = species.flavor_text_entries.filter(e => e.language.name == "en")[7].flavor_text
  const growthRate = species.growth_rate
  const growth = (await api.getGrowthRateByName(growthRate.name)).levels

  const pokemon = {
    id: response.id, name: response.name, type: response.types[0].type.name, front: response.sprites.front_default, back: response.sprites.back_default,
    growthRate :growth, dexEntry: entry,
    hp: stats[0].base_stat, attack: stats[1].base_stat, defence: stats[2].base_stat, specialAttack: stats[3].base_stat, specialDefence: stats[4].base_stat, speed: stats[5].base_stat
  
  }
  
  return pokemon
  } catch(error){
console.log(error)
  }
}

export const getPokemonByName = async (name: string) => {
  const api = new PokemonClient();
  const response = await api.getPokemonByName(name)
  const stats =  response.stats

  const pokemon = {
    id: response.id, name: response.name, type: response.types[0].type.name, front: response.sprites.front_default, back: response.sprites.back_default,
    hp: stats[0].base_stat, attack: stats[1].base_stat, defence: stats[2].base_stat, specialAttack: stats[3].base_stat, specialDefence: stats[4].base_stat, speed: stats[5].base_stat
  }

  return pokemon
}

export const getGenerationPokemonById = async ({queryKey}: {queryKey:any}) => {
    return await getPokemonByGeneration(queryKey[1])
}

export const getPokemonByType = async ({queryKey}: {queryKey:any}) => {
    const pokemon = await getPokemonByGeneration(1)
  return pokemon.filter(e => e.type == queryKey[1])
}

export const getPokemonByRarity = async ({queryKey}: {queryKey: any}) => {
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
    const legendaryIds = [151, 150, 146, 145 ,144]
    const pokemon = []
    legendaryIds.map((p) => getPokemonById(p))
    return await Promise.all(pokemon);
}

export const getMyPokemon= async ({queryKey}: {queryKey: any}) => {
const ids  = queryKey[1].split(',');
const pokemon = []
ids.map((i: string) =>{
  pokemon.push(getPokemonById(parseInt(i)))
}
)
return await Promise.all(pokemon);
}
