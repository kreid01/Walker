import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Button } from "react-native-paper"
import { useQuery } from "react-query"
import { IShopItem } from "../../types/types";

interface ShopItemProps {
  item: IShopItem;
  buyDeck: (pokemon: any[]) => void
  pokemon: any[]
}

import dp from "../../assets/dp.png"
import { MyText } from "../utils/MyText";

import fighting from "../../assets/fighting.jpg"
import legendary from "../../assets/legendary.jpg"
import fire from "../../assets/fire.png"
import psychic from "../../assets/psychic.jpg"
import water from "../../assets/water.jpg"
import rock from "../../assets/rock.jpg"
import electric from "../../assets/electric.jpg"
import poison from "../../assets/poison.jpg"
import dragon from "../../assets/dragon.jpg"
import dark from "../../assets/dark.jpg"
import fairy from "../../assets/fairy.jpg"
import grass from "../../assets/grass.jpg"


export const ShopItem: React.FC<ShopItemProps> = ({ item, buyDeck, pokemon }) => {
  const { price, name } = item
  const type = item.filterValue
  let image = electric

  switch (type) {
    case "electric":
      image = electric
      break;
    case "fighting":
      image = fighting;
      break;
    case 'legendary':
      image = legendary;
      break;
    case "fire":
      image = fire;
      break;
    case "psychic":
      image = psychic
      break;
    case "water":
      image = water;
      break;
    case "rock":
      image = rock
      break;
    case "dragon":
      image = dragon
      break;
    case "fairy":
      image = fairy
      break;
    case "dark":
      image = dark
      break;
    case "grass":
      image = grass
      break;
    case "poison":
      image = poison
      break;
    default:
      image = fire
  }


  return (
    <View className="flex flex-row bg-gray-100 my-2 h-64  mx-1 rounded-md border-purple-400 drop-shadow-xl border-2">
      <View className="flex flex-row justify-between w-[31%]">
        <View>
          <Image source={image} className="h-48 w-28" />
          <MyText style="text-black text-center text-xl ml-1">{item.name.toUpperCase()}</MyText>
          <View className="">
            <TouchableOpacity onPress={() => buyDeck(pokemon as any)} className="border-black border-[1px] mx-4 h-6 rounded-md ">
              <MyText style="text-lg mx-auto -mt-1">Buy ${item.price}</MyText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
