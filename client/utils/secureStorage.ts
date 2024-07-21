import * as SecureStore from 'expo-secure-store';

export async function saveStarterPokemon(value) {
  console.log(value)
  await SecureStore.setItemAsync("starterPokemon", value.toString());
}

export async function getStarterPokemon() {
  var result = await SecureStore.getItemAsync("starterPokemon")
  console.log(result)
  return (result)
}

export async function savePokemon(value) {
  let result = await SecureStore.getItemAsync("pokemon");
  let newResult = "";
  if (result == "") newResult = value;
  else newResult = result + "," + value;
  await SecureStore.setItemAsync("pokemon", newResult.toString());
}

export async function getPokemon() {
  return await SecureStore.getItemAsync("pokemon")
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
