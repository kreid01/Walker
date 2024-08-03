import { View, Image, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { useQuery } from "react-query"
import { getPokemonByName, getPokemonByNameQuery, getTeamByIds, TeamPokemon } from "../repositories/pokemonRepository"
import { MyText } from "../components/utils/MyText"
import { useEffect, useState } from "react"
import Animated, { interpolate, SlideInDown, SlideInUp, useAnimatedStyle, useSharedValue, withTiming, ZoomIn } from "react-native-reanimated"
import { PokemonClient } from "pokenode-ts"
import { Triangle } from "../components/stats/Triangle"
import { getStarterPokemon, getUserPokemon, savePokemon, saveStarterPokemon } from "../utils/secureStorage"
import { Stats } from "../components/stats/Stats"
import { getBackgroundColour } from "../components/battle/FightUI"
import { capitalizeFirstLetter } from "../utils/utils"
import React from "react"
import { useIsFocused } from "@react-navigation/native"

const getPokemon = async () => {
    const api = new PokemonClient();
    return (await api.listPokemons(0, 500)).results
}

export const getUserPokemonQuery = async () => {
    return (await getUserPokemon()).split(",")
}

export const PokemonScreen = ({ navigation }) => {
    const { data: pokedex, isSuccess } = useQuery("pokedex", getPokemon)
    const { data: userPokemon } = useQuery('userPokemon', getUserPokemonQuery)
    const [selectedPokemonName, setSelectedPokemonName] = useState<any>()
    const { data: pokemon, isSuccess: isSuccessPokemon } = useQuery(["pokemon", selectedPokemonName?.toLowerCase()], getPokemonByNameQuery)
    const { data: selectedPokemon } = useQuery('selectedPokemon', getStarterPokemon)
    const [selected, setSelected] = useState(false)
    useEffect(() => {
        setSelected(selectedPokemon == pokemon?.id.toString())
        if (pokemon) selectedPokemonValue.value = withTiming(1, { duration: 500 })
    }, [pokemon])

    const selectedPokemonValue = useSharedValue(0)
    const selectedPokemonStyle = useAnimatedStyle((): any => {
        return {
            height: interpolate(selectedPokemonValue.value, [0, 1], [0, 350]),
            transform: [{ scale: interpolate(selectedPokemonValue.value, [0, 1], [0, 1]) }]
        }
    })

    const focused = useIsFocused()

    useEffect(() => {
        setSelectedPokemonName(null)
        selectedPokemonValue.value = 0
    }, [focused])

    return (
        isSuccess &&
        < View className="pt-8">
            <View className="flex flex-row">
                <TouchableOpacity onPress={() => navigation.navigate("Home")}><MyText style="text-black text-xl ml-4 mr-10 mt-5">{"<"}</MyText></TouchableOpacity>
                <MyText style="text-center text-black text-3xl mt-4 ml-3">Starter Pokemon</MyText>
            </View>
            <Animated.View style={selectedPokemonStyle} className="border-b-[1px] h-[48%] relative border-b-black mx-4">
                {isSuccessPokemon && pokemon &&
                    <Animated.View entering={ZoomIn}>
                        <View className="flex flex-row">
                            <Animated.View className="ml-2">
                                <View className="flex flex-row">
                                    <MyText style="text-black w-24 font-bold text-2xl">{capitalizeFirstLetter(pokemon?.name)}</MyText>
                                    {selected ?
                                        <MyText style="text-lg ml-1 mt-1 ml-10 underline">Selected</MyText> :
                                        <TouchableOpacity onPress={() => {
                                            setSelected(true)
                                            saveStarterPokemon(pokemon.id)
                                        }
                                        } className="border-[1px] 
                                        h-6 px-4  ml-8 mt-2 rounded-md">
                                            <MyText style="text-lg -mt-1 mx-auto">Select</MyText>
                                        </TouchableOpacity>}
                                </View>
                                {isSuccessPokemon && pokemon &&
                                    <View className="flex flex-row">
                                        {pokemon?.types.filter(t => t).map(type => {
                                            return (
                                                <View key={type} className={`border-2 mx-1 px-2 rounded-sm border-${getBackgroundColour(type)}-500`}>
                                                    <MyText style="text-black text-l">{type}</MyText>
                                                </View>
                                            )
                                        })}
                                    </View>}
                            </Animated.View>
                            <Image style={{ objectFit: "contain" }}
                                source={{ uri: `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon?.name.toLowerCase()}.gif` }}
                                className="h-20 w-20 ml-auto mr-4" />
                        </View>
                        <Stats pokemon={pokemon} />
                    </Animated.View>}
            </Animated.View>
            <FlatList horizontal={false} data={pokedex.filter((e, i) => userPokemon.includes(i.toString()))} numColumns={4}
                className="felx flex-row flex-wrap mx-5 mb-20 pb-20" renderItem={(pokemon) => {
                    return (
                        <TouchableOpacity onPress={() => { setSelectedPokemonName(pokemon.item.name) }} className="mx-2 `">
                            <Image style={{ objectFit: "contain" }} className="h-14 w-16"
                                source={{
                                    uri:
                                        `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.item?.name}.png`
                                }} />
                            <MyText style="text-black text-md text-center">{pokemon?.item.name}</MyText>
                        </TouchableOpacity>
                    )
                }} />
        </ View >
    )
}

