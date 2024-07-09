import { getPokemonGrowthRate } from '../repositories/pokemonRepository';
import { PokemonLevelling } from './../screens/FightScreen';
import * as SecureStore from 'expo-secure-store';

export async function savePokemon(key, value) {
  let result = await SecureStore.getItemAsync(key);
  let newResult = "";
  if(result == "" )  newResult = value;
else newResult = result + "," + value;
  await SecureStore.setItemAsync(key, newResult.toString());
}

export async function saveCoins(key, value) {
  let result = await SecureStore.getItemAsync(key);
  let newResult = "";
  if(Number.isNaN(parseInt(result)))  newResult = value;
  else     newResult = parseInt(result) + value;
  await SecureStore.setItemAsync(key, newResult.toString());
}

export async function getValueFor({ queryKey }: { queryKey: any }) {
  let result = await SecureStore.getItemAsync(queryKey[1]);
  return result
}

export const storePokemonLevelling = async (pokemonLevelling) => {
  const result = await SecureStore.getItemAsync('pokemonLevelling');
  if(!result) {
    await SecureStore.setItemAsync('pokemonLevelling', JSON.stringify([ pokemonLevelling])) 
  }
   else {
    const resultJson = JSON.parse(result);
    resultJson.map((pokemon) => {
      if(pokemon.id == pokemonLevelling.id) pokemon = pokemonLevelling
    })

   await SecureStore.setItemAsync("pokemonLevelling", JSON.stringify([pokemonLevelling]))   
  }
}

type Level=  {
id: number;
totalXp: number
xp: number;
xpNeeded:number;
level: number
totalXpRequired: number
}


export const getPokemonLevellingQuery = async ({queryKey}: {queryKey:any}): Promise<Level> => {
  return await getPokemonLevelling(queryKey[1])
}

export const getPokemonLevelling = async (pokemon: any): Promise<Level> => {
  const result = await SecureStore.getItemAsync('pokemonLevelling');
  if(result == "") return null;
  const resultJson = JSON.parse(result);

  const totalXp = resultJson[0].xp;
  return getPokemonLevel(pokemon, totalXp)
}

export const getPokemonLevel = (pokemon: any, totalXp: any) => {
  const growthRate = pokemon?.growthRate

  let xp = 0
  let level = 1;
    let xpNeeded = 0;
    let totalXpRequired = 0

    for (let i = 0; i < growthRate?.length; i++) {
        if (totalXp >= growthRate[i].experience) {
            level = growthRate[i +1].level
            xpNeeded = growthRate[i + 1].experience - growthRate[i].experience
            xp =  totalXp - growthRate[i].experience
totalXpRequired =growthRate[i + 1].experience
        }
    }

  
    return { id:1, totalXp, xp, level, xpNeeded, totalXpRequired };
}