import { useEffect, useState } from "react"
import { View, Text, Animated } from "react-native"
import { useQuery } from "react-query";
import { getPokemonLevelling, getPokemonLevellingQuery } from "../utils/secureStorage";
import { getPokemonByIdQuery } from "../repositories/pokemonRepository";

interface UserPokemonProps {
pokemon1: any;
pokemonAttack: any
pokemonLevel: any
}

export const UserPokemon:React.FC<UserPokemonProps> = ({pokemon1, pokemonAttack, pokemonLevel}) => {
  const [health, setHealth] = useState(pokemon1?.hp)
  const [healthBar1, setHealthBar1] = useState((health / pokemon1?.hp) * 128)
const [xpBar, setXpBar] = useState((pokemonLevel?.xp /pokemonLevel?.xpNeeded) * 128)

  useEffect(() => {
  setXpBar(((pokemonLevel?.xp/ pokemonLevel?.xpNeeded)) * 128)
  }, [pokemonLevel?.xpNeeded, pokemonLevel?.xp, pokemonLevel?.level])

  useEffect(() => {
setHealth(pokemon1?.hp)
  }, [pokemon1])

  useEffect(() => {
  setHealthBar1(((health / pokemon1?.hp)) * 128)
  }, [health])


  return(
    <View className="relative">
        <Text className="absolute left-8 top-4">Level: {pokemonLevel?.level}</Text>
        <View className="h-4 z-1 w-32 bg-red-500 absolute top-10 left-8 border-white border-[1px] rounded-md"></View>
        <View style={{ width: healthBar1  }} className="h-4 z-10 w-32 bg-green-500 absolute top-10 left-8 rounded-md"></View>
        <View className="h-4 z-1 w-32 bg-white absolute top-[44px] left-8 rounded-md "></View>
        <View style={{ width: xpBar ? xpBar: 1 }} className="h-4 z-1 w-28 bg-orange-300 absolute top-[46px] left-8 rounded-md"></View>
        <Animated.Text className="absolute top-10 z-20 left-10 text-white ">HP: {health}</Animated.Text>
        <View style={{ transform: [{ scaleX: -1 }] }}>
            <Animated.Image style={pokemonAttack as any} className="mt-14" source={{ uri: pokemon1 && pokemon1.front }} height={200} width={200} />
        </View>
    </View>
  )
}