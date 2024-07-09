import { FlatList, Text, TouchableOpacity, View, Image } from "react-native"
import { getValueFor } from "../utils/secureStorage"
import { useQuery } from "react-query"
import { getMyPokemon } from "../repositories/pokemonRepository"
import { Button } from "react-native-paper"
import React, { useCallback}from "react"
import { capitalizeFirstLetter } from "../utils/utils"
import { useFocusEffect } from "@react-navigation/native";

export const Inventory = ({ navigation }) => {
  const { data: pokemonIds, refetch: refetchIds } = useQuery(["myPokemonIds", "pokemon"], getValueFor)
  const { data: myPokemon } = useQuery(["myPokemon", pokemonIds], getMyPokemon, { enabled: !!pokemonIds })

     useFocusEffect(
           useCallback(() => {
            refetchIds()
    }, []))

  return (
    <View>
    <View className="flex flex-row mt-10 h-10 just-between">
        <TouchableOpacity>
            <Button  onPress={() => navigation.navigate("Fight")}>X</Button>
        </TouchableOpacity>
      <View><Text className='ml-10 text-2xl'>Pokemon</Text></View>
      </View>
      <FlatList
        numColumns={3}
        keyExtractor={(_, i) => i.toString()} renderItem={({ item, index }) => {
          return (
            <View>
              <Image source={{ uri: item.front }} height={130} width={135} />
              <Text className="font-bold text-center">{capitalizeFirstLetter(item.name)}</Text>
            </View>
          )
        }}
        data={myPokemon} />
    </View>
  )
}