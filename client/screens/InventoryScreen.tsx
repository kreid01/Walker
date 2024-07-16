import { FlatList, Text, TouchableOpacity, View, Image } from "react-native"
import { getValueFor } from "../utils/secureStorage"
import { useInfiniteQuery, useQuery } from "react-query"
import { getMyPokemon } from "../repositories/pokemonRepository"
import { Button } from "react-native-paper"
import React, { useCallback}from "react"
import { capitalizeFirstLetter } from "../utils/utils"
import { useFocusEffect } from "@react-navigation/native";
import { getPokedex } from "../repositories/pokedexRepository"

export const Inventory = ({ navigation }) => {
  const { data: pokemonIds, refetch: refetchIds } = useQuery(["myPokemonIds", "pokemon"], getValueFor)
  const { data: myPokemon } = useQuery(["myPokemon", pokemonIds], getMyPokemon, { enabled: !!pokemonIds })


     useFocusEffect(
           useCallback(() => {
            refetchIds()
    }, []))

 //   const {data, hasNextPage, isFetching, isLoading, fetchNextPage} = useInfiniteQuery({
 //     queryKey: "pokedex",
  //    queryFn: getPokedex,
  //    getNextPageParam:(lastPage, allPages) => {
  //      if(lastPage.length ===0) return undefined
  //      return allPages.length +1
  //    }
  //  })
  //  const dataArr = data?.pages.map(page => page).flat()


//const onReachEnd = () => {
//  if(hasNextPage && !isLoading) {
 //   fetchNextPage()
//  }
//}
    const {data: pokedex, isSuccess} = useQuery("pokedex", getPokedex)

console.log(pokedex)


  return (
    isSuccess &&
    <View>
    <View className="flex flex-row mt-10 h-10 just-between">
        <TouchableOpacity>
            <Button  onPress={() => navigation.navigate("Fight")}>X</Button>
        </TouchableOpacity>
      <View><Text className='ml-10 text-2xl'>Pokemon</Text></View>
      </View>
      <FlatList
        numColumns={4}
        keyExtractor={(_, i) => i.toString()} 
        renderItem={({ item, index }) => {
          return (
            <View> 
              <Image className="brightness-0 h-[100px] w-[90px]" source={{ uri: item.image }} />
              <Text className="font-bold text-center text-sm">{capitalizeFirstLetter(item.name)}</Text>
            </View>
          )
        }}
       // onEndReached={onReachEnd}
        onEndReachedThreshold={0.5}
        data={pokedex} />
    </View> 
  )
}