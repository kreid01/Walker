import React, { useEffect, useState } from "react";
import { generateRandom } from "../utils/utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {  getPokemonByIdQuery} from '../repositories/pokemonRepository';
import { Animated, ImageBackground, TouchableOpacity, View, Image, Text } from "react-native";
import background from "../assets/Bricks.png"
import sky from "../assets/sky.png"
import { ActivePokemon } from "../components/ActivePokemon";
import { Navigation } from "../components/Navigation";
import { UserPokemon } from "../components/UserPokemon";
import { EnemyPokemon } from "../components/EnemyPokemon";
import { getPokemonLevel, getPokemonLevelling, getPokemonLevellingQuery, getValueFor, saveCoins, storePokemonLevelling } from "../utils/secureStorage";

export type PokemonLevelling = {
id: number;
xp: number;
}

export const FightScreen = ({ navigation }) => {
  const [userPokemon, setUserPokemon] = useState(generateRandom());
  const [pokemon, setPokemon] = useState(generateRandom())
  const { data: pokemon1, isSuccess } = useQuery(["pokemon", userPokemon], getPokemonByIdQuery)
  const { data: pokemon2, isSuccess: isSuccess2 } = useQuery(["pokemon2", pokemon], getPokemonByIdQuery)
  const { data: coins, refetch } = useQuery(["myPokemonIds", "coins"], getValueFor)
  const {data: pokemonLevel} = useQuery(["pokemonLevel", pokemon1], getPokemonLevellingQuery)

  const mutation = useMutation({
  mutationFn: (pokemon: PokemonLevelling) => storePokemonLevelling(pokemon),
  onSuccess: () => {
    console.log(pokemonLevel, "cache")
    queryClient.invalidateQueries()
  },
})

  const queryClient = useQueryClient()

 
  const [health2, setHealth2] = useState(pokemon2?.hp)
  useEffect(() => {
  setHealth2(pokemon2?.hp)
  },[pokemon2])

  const updateEnemyHp = async () => {
    setHealth2((prevState) => Math.floor(prevState - ((pokemon1.attack / pokemon2.defence) * 2)))
    if (health2 - Math.floor((pokemon1.attack / pokemon2.defence) * 2) <= 1) {
      setPokemon(generateRandom())
      await saveCoins("coins", generateRandom())
      refetch()
      levelPokemon()
    }
  }

  const levelPokemon = async() => {
    console.log(pokemonLevel, "function")
    let xp = pokemonLevel.totalXp += 10;
    const levelling: PokemonLevelling = {
      id: pokemonLevel.id,
      xp: xp,
    }

    console.log(levelling, "mutation")
    mutation.mutate(levelling)
  }

  const enemyAttack = () => {
    if (pokemon1 && pokemon2) {
      setHealth2((prevState) => Math.floor(prevState - ((pokemon2?.attack / pokemon1?.defence) * 2)))
      if (health2 - Math.floor((pokemon2.attack / pokemon1.defence) * 2) <= 1) {
        setUserPokemon(generateRandom())
        setHealth2(128)
      }
    }
  }

  // const startAttack = setInterval(enemyAttack, 1000)
  const pokemonAnimation = new Animated.Value(0)
  const pokemonAttack = {
    transform: [
      {
        translateX: pokemonAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, -110, 1]
        }),
      },
    ],
  }

  const attack = () => {
    pokemonAnimation.setValue(0)
    Animated.spring(pokemonAnimation, {
      toValue: 1,
      speed: 100,
      useNativeDriver: true,
    }).start(updateEnemyHp);
  }

  return (
    <View className="h-[140%]">
      <View className="bg-white border-2 border-green-700 w-40 rounded-lg z-10 mt-10 ml-2">
        <Text className="text-xl text-green-500 mx-auto">Coins: {coins}</Text>
      </View>
      <ImageBackground className="absolute" style={{ height: 450, width: 420 }} source={sky} />
      <ImageBackground className="absolute mt-[400px]" style={{ height: 500, width: 420 }} source={background} />
      <View>
        <View className="flex flex-row mt-56">
          {isSuccess && pokemon1?.growthRate.length > 1 && <UserPokemon pokemon1={pokemon1} pokemonAttack={pokemonAttack} pokemonLevel={pokemonLevel}/>}
          {isSuccess2 && <EnemyPokemon attack={attack} pokemon2={pokemon2} health2={health2}/>}
        </View>
        <View >
          <View className=" mx-10 mt-10 flex flex-row justify-between">
            <ActivePokemon pokemonId={478} setActivePokemon={setUserPokemon} />
            <ActivePokemon pokemonId={460} setActivePokemon={setUserPokemon} />
            <ActivePokemon pokemonId={486} setActivePokemon={setUserPokemon} />
          </View>
          <View className="mx-10 mt-5 flex flex-row justify-between">
            <ActivePokemon pokemonId={483} setActivePokemon={setUserPokemon} />
            <ActivePokemon pokemonId={484} setActivePokemon={setUserPokemon} />
            <ActivePokemon pokemonId={487} setActivePokemon={setUserPokemon} />
          </View>
        </View>
      </View>
      <Navigation navigation={navigation} />
    </View >
  )
}
