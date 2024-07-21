import { useCallback, useEffect, useRef, useState } from 'react';
import Animated, { BounceOutRight, Extrapolation, FadeInDown, FadeInRight, FadeInUp, FadeOutRight, interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated"
import { ScrollView, TouchableOpacity, View, Text, Image, FlatList, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { IShopItem, Pokemon } from '../types/types';
import { AnimatedDeck } from '../components/shop/AnimatedDeck';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { ShopItem } from '../components/shop/ShopItem';
import { PokemonClient } from 'pokenode-ts';
import { getPokemonByName } from '../repositories/pokemonRepository';

const getPokemonByGeneration = async () => {
  const api = new PokemonClient();
  const pokemon = (await api.listPokemons(387, 100)).results
  return await Promise.all(pokemon.map(p => {
    return getPokemonByName(p.name)
  }))
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
      <View>
        {!startBuying && <Animated.View style={animatedStyles} className="flex flex-row bg-transparent mt-4  justify-between">
          <Button onPress={() => navigation.navigate("Home")}>Back</Button>
          <View><Text className='ml-10 text-2xl'>Shop</Text></View>
          <Text className="ml-auto  mr-5 text-xl">$30</Text>
        </Animated.View>}
        {startBuying ?
          <View>
            <ImageBackground
              className='h-[100vh] w-[100vh]'
              source={{ uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fstapledslut%2Fart%2FPokemon-Landscape-854544742&psig=AOvVaw2fFDq4-UkqpNvzoyo7un0l&ust=1721583675774000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjH_42VtocDFQAAAAAdAAAAABAJ" }} />
            <AnimatedDeck navigation={navigation} data={pokemon} />

          </View>
          :
          <FlatList numColumns={3} className='mb-24' data={shopItems} keyExtractor={(item, _) => item.id.toString()}
            renderItem={(item,) => {
              return (
                <Animated.View entering={FadeInUp.delay(item.index * 50)} exiting={FadeOutRight.delay(item.index * 50)}>
                  <ShopItem pokemon={getDeckPokemon(data, item.item)} item={item.item} buyDeck={buyDeck} />
                </Animated.View>
              )
            }}>
          </FlatList>}
      </View>)
      : <Text className='mt-12 ml-4'>Loading...</Text>
  )
}

export const getDeckPokemon = (pokemon: any[], item: IShopItem) => {
  if (item.filterValue == "legendary") return getLegendaries(pokemon)
  return pokemon.filter(e => e.type == item.filterValue);
}

const getLegendaries = (pokemon: any) => {
  const legendaryIds = [480, 481, 482, 483, 484, 485, 486, 487, 489, 450]
  const legendaryPokemon = pokemon.filter((i: any) => legendaryIds.includes(i.id))
  return [...legendaryPokemon, ...legendaryPokemon, ...legendaryPokemon]
}



const shopItems: IShopItem[] = [
  { id: 2, name: "Electric", price: 40, filterValue: "electric" },
  { id: 3, name: " Water", price: 40, filterValue: "water" },
  { id: 4, name: "Poison", price: 40, filterValue: "poison" },
  { id: 5, name: "Fire", price: 40, filterValue: "fire" },
  { id: 6, name: "Legendaries", price: 1000, filterValue: "legendary" },
  { id: 7, name: "Fighting", price: 1000, filterValue: "fighting" },
  { id: 8, name: "Poison", price: 1000, filterValue: "poison" },
  { id: 9, name: "Ground", price: 1000, filterValue: "ground" },
  { id: 10, name: "Rock", price: 1000, filterValue: "rock" },
  { id: 11, name: "Dragon", price: 1000, filterValue: "dragon" },
  { id: 12, name: "Grass", price: 1000, filterValue: "grass" },
  { id: 13, name: "Dark", price: 1000, filterValue: "dark" },
]

