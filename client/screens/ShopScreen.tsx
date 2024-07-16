import {  useCallback, useEffect, useRef, useState } from 'react';
import Animated, {BounceOutRight, Extrapolation, FadeInDown, FadeInRight, FadeOutRight, interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring} from "react-native-reanimated"
import {  ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { IShopItem } from '../types/types';
import { AnimatedDeck } from '../components/shop/AnimatedDeck';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { getGenerationPokemonById, getKantoLegendaries } from '../repositories/pokemonRepository';
import { ShopItem } from '../components/shop/ShopItem';

export const ShopScreen = ({ navigation }) => {
  const [startBuying, setStartBuying] = useState(false)
  const {data, isSuccess} = useQuery(["shopPokemon", 1], getGenerationPokemonById)
  const buyDeck = (pokemon: any[]) => {
    setPokemon(pokemon)
setStartBuying(true)
removeHeaderAnimation()
  }

     useFocusEffect(
           useCallback(() => {
              offset.value = 0
              setStartBuying(false)
           }, []))

const [pokemon, setPokemon] = useState([])

const offset = useSharedValue(0)
 const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const removeHeaderAnimation = () => {
    offset.value = withSpring(400, {
      duration : 1000
    })
  }


  return (
   isSuccess ? (
    <View>
    <Animated.View style={animatedStyles} className="flex flex-row mt-10 h-10 just-between">
      <Button  onPress={() => navigation.navigate("Fight")}>Back</Button>
      <View><Text className='ml-10 text-2xl'>Shop</Text></View>
        <Text className="ml-auto  mr-5 text-xl">$30</Text>
      </Animated.View>
     {startBuying ? 
     <View >
      <AnimatedDeck navigation={navigation}  data={pokemon} />
     </View>:
      <ScrollView className='mb-24'>
        {shopItems.map((i: IShopItem, n) => {
          return (
            <Animated.View entering={FadeInRight.delay(n * 50)} exiting={FadeOutRight.delay(n * 50)} key={i.name}>
              <ShopItem  pokemon={getDeckPokemon(data, i)} key={i.name} item={i} buyDeck={buyDeck}/>
            </Animated.View>
          )
        }
        )}
      </ScrollView>}
    </View>) : <Text className='mt-12 ml-4'>Loading...</Text>
  )
}

export const getDeckPokemon = (pokemon: any, item: IShopItem) => {
  if(item.filterMethod == "generation") return pokemon
  else if(item.filterMethod == "rarity" && item.filterValue == "legendary") return getLegendaries(pokemon)
  else if(item.filterMethod == "rarity") return  pokemon.filter((i: any) => i.id < 50 && i.id > 10)
  else if(item.filterMethod == "type") return pokemon.filter((i: any) => i.type == item.filterValue)
}

const getLegendaries = (pokemon: any) => {
    const legendaryIds = [151, 150, 146, 145 ,144]
    const legendaryPokemon =  pokemon.filter((i: any) => legendaryIds.includes(i.id))
    return [...legendaryPokemon, ...legendaryPokemon, ...legendaryPokemon]
}

const shopItems: IShopItem[] = [
 // {id: 1, name: "Sinnoh", price: 1000, filterMethod: "generation", filterValue: "1" },
//  { id: 2,name: "Sinnoh Common", price: 40, filterMethod: "rarity", filterValue: "common" },
//  {id: 3, name: "Sinnoh Water", price: 40, filterMethod: "type", filterValue: "water" },
 // { id: 4,name: "Sinnoh Poison", price: 40, filterMethod: "type", filterValue: "poison" },
 // { id: 5, name: "Sinnoh Fire", price: 40, filterMethod: "type", filterValue: "fire" },
  {id :6,  name: "Legendaries", price: 1000, filterMethod: "rarity", filterValue: "legendary" },
 // {id :7,  name: "Unova", price: 1000, filterMethod: "type", filterValue: "grass" }
]

