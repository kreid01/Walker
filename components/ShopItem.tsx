import React from "react"
import {View, Text} from "react-native"
import { Button } from "react-native-paper"
import { IShopItem } from "../types/types"
import { AnimatedCarousel } from "./AnimatedCarousel"
import { useQuery } from "react-query"

interface ShopItemProps {
  item: IShopItem;
   buyDeck : (pokemon: any[]) => void
   pokemon: any[]
}

export const ShopItem: React.FC<ShopItemProps> = ({ item , buyDeck, pokemon}) => {
  const { price, name } = item
  

  return (
    <View className="flex flex-row bg-gray-300 my-2 h-40  px-2 mx-2 py-4 rounded-md border-green-500 border-2">
      <AnimatedCarousel autoPlay={true} autoPlayInterval={1000} pokemon={pokemon}/>
      <View>
        <View className="w-[60vw]">
      <Text className={`text-2xl  text-black  font-bold text-left`}>{name}</Text>
      <View className="ml-auto mr-2">
        <Button onPress={() => buyDeck(pokemon as any)} textColor="black" className="bg-green-400 mt-12">Buy ${price}</Button>
      </View>
        </View>
      </View>
    </View>
  )
}
