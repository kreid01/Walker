import { useCallback, useEffect, useRef, useState } from 'react';
import Animated, { BounceOutRight, Extrapolation, FadeInDown, FadeInRight, FadeInUp, FadeOut, FadeOutRight, interpolate, SlideInRight, useAnimatedStyle, useSharedValue, withDelay, withSpring, ZoomIn } from "react-native-reanimated"
import { ScrollView, TouchableOpacity, View, Text, Image, FlatList, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { IShopItem, Pokemon } from '../types/types';
import { AnimatedDeck } from '../components/shop/AnimatedDeck';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { ShopItem } from '../components/shop/ShopItem';
import { PokemonClient } from 'pokenode-ts';
import { createTable, getDBConnection, getPokemon, getPokemonByName, savePokemon } from '../repositories/pokemonRepository';
import { duplidateData } from '../utils/utils';
import loading from "../assets/loading.gif"
import bg from "../assets/shopbg.png"
import { MyText } from '../components/utils/MyText';

const getPokemonByGeneration = async () => {

  const api = new PokemonClient();
  const pokemon = (await api.listPokemons(387, 100)).results
  const result = await Promise.all(pokemon.map(p => {
    return getPokemonByName(p.name)
  }))

  return result
}

export const ShopScreen = ({ navigation }) => {
  const [startBuying, setStartBuying] = useState(false)
  const { data, isSuccess } = useQuery(["shopPokemon", 1], getPokemonByGeneration)
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
      duration: 1000
    })
  }


  return (
    isSuccess ? (
      <ImageBackground source={bg} className='h-[100%] w-[100%]'>
        {!startBuying && <Animated.View style={animatedStyles} className="flex flex-row bg-transparent mt-4  justify-between">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}><MyText style="text-black text-xl ml-4 mr-10 mt-2">{"<"}</MyText></TouchableOpacity>
          <View><MyText style='ml-24 text-4xl text-center'>Shop</MyText></View>
          <MyText style="ml-auto mt-2  mr-5 text-2xl">$30</MyText>
        </Animated.View>}
        {startBuying ?
          <View>
            <ImageBackground
              className='h-[100vh] w-[100vh]'
              source={{ uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fstapledslut%2Fart%2FPokemon-Landscape-854544742&psig=AOvVaw2fFDq4-UkqpNvzoyo7un0l&ust=1721583675774000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjH_42VtocDFQAAAAAdAAAAABAJ" }} />
            <AnimatedDeck navigation={navigation} data={pokemon} />

          </View>
          :
          <Animated.FlatList exiting={FadeOut} numColumns={3} className='pb-24' data={shopItems} keyExtractor={(item, _) => item.id.toString()}
            renderItem={(item,) => {
              return (
                <Animated.View entering={SlideInRight.delay(item.index * 50)}>
                  <ShopItem pokemon={getDeckPokemon(data, item.item)} item={item.item} buyDeck={buyDeck} />
                </Animated.View>
              )
            }}>
          </Animated.FlatList>}
      </ImageBackground>)
      : <Image source={loading} className='ml-[38%] mt-[50%] h-20 w-20 ' />
  )
}

export const getDeckPokemon = (pokemon: any[], item: IShopItem) => {
  if (item.filterValue == "legendary") return getLegendaries(pokemon)
  return duplidateData(pokemon.filter(e => e.types.includes(item.filterValue))).filter((e, i) => i < 30);
}

const getLegendaries = (pokemon: any) => {
  const legendaryIds = [480, 481, 482, 483, 484, 485, 486, 487, 489, 450]
  const legendaryPokemon = pokemon.filter((i: any) => legendaryIds.includes(i.id))
  return [...legendaryPokemon, ...legendaryPokemon, ...legendaryPokemon]
}



const shopItems: IShopItem[] = [
  { id: 2, name: "Electric", price: 40, filterValue: "electric", levelRequired: 1 },
  { id: 3, name: " Water", price: 40, filterValue: "water", levelRequired: 1 },
  { id: 12, name: "Grass", price: 1000, filterValue: "grass", levelRequired: 1 },
  { id: 4, name: "Poison", price: 40, filterValue: "poison", levelRequired: 5 },
  { id: 5, name: "Fire", price: 40, filterValue: "fire", levelRequired: 5 },
  { id: 7, name: "Fighting", price: 1000, filterValue: "fighting", levelRequired: 5 },
  { id: 8, name: "Poison", price: 1000, filterValue: "poison", levelRequired: 10 },
  { id: 9, name: "Ground", price: 1000, filterValue: "ground", levelRequired: 10 },
  { id: 10, name: "Rock", price: 1000, filterValue: "rock", levelRequired: 10 },
  { id: 13, name: "Dark", price: 1000, filterValue: "dark", levelRequired: 20 },
  { id: 11, name: "Dragon", price: 1000, filterValue: "dragon", levelRequired: 20 },
  { id: 6, name: "Legendaries", price: 1000, filterValue: "legendary", levelRequired: 25 },
]

