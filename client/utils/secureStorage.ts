import * as SecureStore from 'expo-secure-store';
import { ShopPokemon } from '../repositories/pokemonRepository';

export async function saveStarterPokemon(value) {
  await SecureStore.setItemAsync("starterPokemon", value.toString());
}

export async function getStarterPokemon() {
  return await SecureStore.getItemAsync("starterPokemon")
}

export async function savePokemon(value) {
  let result = await SecureStore.getItemAsync("pokemon");
  let newResult = "";
  if (result == "") newResult = value;
  else newResult = result + "," + value;
  await SecureStore.setItemAsync("pokemon", newResult.toString());
}

export async function getUserPokemon() {
  const result = await SecureStore.getItemAsync("pokemon")
  return (result)
}

export async function saveCoins(key, value) {
  let result = await SecureStore.getItemAsync(key);
  let newResult = "";
  if (Number.isNaN(parseInt(result))) newResult = value;
  else newResult = parseInt(result) + value;
  await SecureStore.setItemAsync(key, newResult.toString());
}

export async function getValueFor({ queryKey }: { queryKey: any }) {
  let result = await SecureStore.getItemAsync(queryKey[1]);
  return result
}

export const getLevel = async () => {
  const result = await SecureStore.getItemAsync("level")
  console.log(result)
  if (result == "" || !result) {
    return 0
  }
  return parseFloat(result)
}

export const levelUser = async () => {
  let result = parseInt(await SecureStore.getItemAsync("level"))
  if (result == null || Number.isNaN(result)) {
    await SecureStore.setItemAsync("level", (0).toString())
    result = 0
  }
  result += 1
  await SecureStore.setItemAsync("level", result.toString())
}

export const resetLevel = async () => {
  await SecureStore.setItemAsync("level", "")
}

export const resetXp = async () => {
  await SecureStore.setItemAsync("xp", "")
}

export const getXp = async () => {
  const result = parseInt(await SecureStore.getItemAsync("xp"))
  if (result == null || Number.isNaN(result)) {
    postXp(0)
    return 0;
  }
  return result
}

export const postXp = async (xp: number) => {
  await SecureStore.setItemAsync("xp", xp.toString())
}

export const storePokemonCache = async (pokemon: ShopPokemon) => {
  await SecureStore.setItemAsync(pokemon.name, JSON.stringify(pokemon))
}

export const getPokemonCache = async (pokemonName: string) => {
  const result = await SecureStore.getItemAsync(pokemonName)
  return JSON.parse(result)
}
