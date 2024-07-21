import { View, Image, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { useQuery } from "react-query"
import { getPokemonByName, getPokemonByNameQuery, getTeamByIds, TeamPokemon } from "../repositories/pokemonRepository"
import { MyText } from "../components/utils/MyText"
import { useEffect, useState } from "react"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, ZoomIn } from "react-native-reanimated"
import { PokemonClient } from "pokenode-ts"
import { Triangle } from "../components/stats/Triangle"
import { getStarterPokemon, savePokemon, saveStarterPokemon } from "../utils/secureStorage"
import { Stats } from "../components/stats/Stats"
import { getBackgroundColour } from "../components/battle/FightUI"
import { capitalizeFirstLetter } from "../utils/utils"
import React from "react"

const getPokemon = async () => {
    const api = new PokemonClient();
    return (await api.listPokemons(0, 500)).results
}

export const PokemonScreen = ({ navigation }) => {
    const { data: team, isSuccess } = useQuery("team", getPokemon)
    const [selectedPokemonName, setSelectedPokemonName] = useState<any>()
    const { data: pokemon, isSuccess: isSuccessPokemon } = useQuery(["pokemon", selectedPokemonName?.toLowerCase()], getPokemonByNameQuery)
    const { data: selectedPokemon } = useQuery('selectedPokemon', getStarterPokemon)
    const [selected, setSelected] = useState(false)
    useEffect(() => {
        setSelected(selectedPokemon == pokemon?.id.toString())
    }, [pokemon])

    return (
        isSuccess &&
        < View>
            <View className="flex flex-row">
                <TouchableOpacity onPress={() => navigation.navigate("Home")}><MyText style="text-black text-xl ml-4 mr-10 mt-5">{"<"}</MyText></TouchableOpacity>
                <MyText style="text-center text-black text-3xl mt-4">Starter Pokemon</MyText>
            </View>
            <View className="border-[1px] h-[38%] relative border-black mx-4">
                {isSuccessPokemon && pokemon &&
                    <Animated.View entering={ZoomIn}>
                        <View className="flex flex-row">
                            <View className="ml-2">
                                <View className="flex flex-row">
                                    <MyText style="text-black  font-bold text-2xl">{capitalizeFirstLetter(pokemon?.name)}</MyText>
                                    {selected ?
                                        <MyText style="text-lg ml-10 mt-1 underline">Selected</MyText> :
                                        <TouchableOpacity onPress={() => {
                                            setSelected(true)
                                            saveStarterPokemon(pokemon.id)
                                        }
                                        } className="border-[1px] 
                                        h-6 px-4  ml-8 mt-2 rounded-md">
                                            <MyText style="text-lg -mt-1 mx-auto">Select</MyText>
                                        </TouchableOpacity>}
                                </View>
                                {isSuccessPokemon && pokemon && <View className="flex flex-row">
                                    <View className={`border-2 px-2 rounded-sm border-${getBackgroundColour(pokemon?.type)}-500`}>
                                        <MyText style="text-black text-l">{pokemon?.type}</MyText>
                                    </View>
                                </View>}
                            </View>
                            <Image style={{ objectFit: "contain" }}
                                source={{ uri: `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon?.name.toLowerCase()}.gif` }}
                                className="h-20 w-20 ml-auto mr-4" />
                        </View>
                        <Stats pokemon={pokemon} />
                    </Animated.View>}
            </View>
            <FlatList horizontal={false} data={team} numColumns={4} className="felx flex-row flex-wrap mx-5 mb-40" renderItem={(pokemon) => {
                return (
                    <TouchableOpacity onPress={() => setSelectedPokemonName(pokemon.item.name)} className="mx-2">
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

