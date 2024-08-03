import { PokemonClient } from "pokenode-ts";
import { TouchableOpacity, View, Image, FlatList, ImageBackground, TextInput } from "react-native"
import { useQuery } from "react-query";
import { MyText } from "../components/utils/MyText";
import { getUserPokemonQuery } from "./PokemonScreen";
import { useEffect, useState } from "react";
import { getPokemonByNameQuery, getPokemonEntry } from "../repositories/pokemonRepository";
import Animated, { FlipInYRight, interpolate, SlideInDown, SlideInUp, SlideOutDown, SlideOutUp, useAnimatedStyle, useSharedValue, withTiming, ZoomIn } from "react-native-reanimated";
import { capitalizeFirstLetter } from "../utils/utils";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureEvent, GestureHandlerRootView, PanGestureHandler, PanGestureHandlerEventPayload } from "react-native-gesture-handler";
import { PokemonEntry } from "../components/shop/AnimatedDeckItem";
import { Stats } from "../components/stats/Stats";
import { SwipeGesture } from "react-native-swipe-gesture-handler";
import { Checkbox } from "react-native-paper";


const getPokemon = async () => {
    const api = new PokemonClient();
    const result = (await api.listPokemons(0, 600)).results
    return result.map((e, i) => ({ id: i, name: e.name }))
}



export const PokedexScreen = ({ navigation }) => {
    const { data: pokedex, isSuccess } = useQuery("team", getPokemon)
    const { data: userPokemon } = useQuery('userPokemon', getUserPokemonQuery)
    const [selectedPokemonName, setSelectedPokemonName] = useState<any>()
    const { data: pokemon, isSuccess: isSuccessPokemon } = useQuery(["pokemon", selectedPokemonName?.toLowerCase()], getPokemonByNameQuery)

    const translateX = useSharedValue(0)
    const [text, onChangeText] = useState("")

    const panGestureHanlder = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        translateX.value = withTiming(event.nativeEvent.translationY, { duration: 100 })
        if (event.nativeEvent.translationY > 350) {
            setSelectedPokemonName(null)
            translateX.value = 0
        }

    }

    const cardStyle = useAnimatedStyle((): any => {
        return { transform: [{ translateY: interpolate(translateX.value, [0, 40], [0, 100]) }] }
    })

    const [shiny, setShiny] = useState(true)


    return (
        isSuccess &&
        <View className="pt-10">
            <View className="flex flex-row">
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <MyText style="text-black text-xl ml-4 mr-10 mt-5">{"<"}</MyText></TouchableOpacity>
                <MyText style="text-center text-black text-3xl mt-4">Pokedex</MyText>
                <TextInput onChangeText={text => onChangeText(text)}
                    className="h-6 w-44 ml-8 mt-5 border-[1px] rounded-lg" />
            </View>
            <FlatList className="mx-2 h-[100%]" numColumns={4} data={pokedex.filter(e => e.name.includes(text.toLowerCase()))} renderItem={(pokemon) => {
                return (
                    <TouchableOpacity onPress={() => {
                        userPokemon.includes(pokemon.item?.id.toString()) && setSelectedPokemonName(pokemon.item.name)
                    }} className="mx-1">
                        <Animated.Image style={{ objectFit: "contain", tintColor: userPokemon.includes(pokemon.item?.id.toString()) ? "" : "black" }}
                            className="h-14 w-20"
                            source={{
                                uri:
                                    `https://img.pokemondb.net/sprites/black-white/normal/${pokemon.item?.name}.png`
                            }} />
                        <MyText style="text-black text-md text-center">{pokemon?.item.name}</MyText>
                    </TouchableOpacity>
                )
            }}>

            </FlatList>
            {isSuccessPokemon && pokemon &&
                <Animated.View style={cardStyle} entering={SlideInDown} className=" left-2 top-6 absolute h-[90%] w-[95%] bg-slate-300 border-gray-800 border-2 rounded-lg">
                    <ImageBackground className="h-[100%] w-[100%] realtive z-0" source={{ uri: "https://wallpapercave.com/wp/wp10311683.jpg" }} >
                        <View className="h-[100%] w-[100%] bg-white absolute opacity-50 z-0" />
                        <PanGestureHandler onGestureEvent={panGestureHanlder}>
                            <View className="w-[100%] relative z-20 h-[100%] rounded-lg border-yellow-500 border-2">
                                <TouchableOpacity onPress={() => setShiny(isShiny => !isShiny)}
                                    className=" absolute border-black z-10 border-[1px] h-8 w-8 ml-2 mt-1 bg-gray-200">
                                    <MyText style="text-2xl mx-auto">{shiny ? "✔" : " "}</MyText>
                                </TouchableOpacity>
                                <MyText style="text-4xl text-center mt-1">{`${capitalizeFirstLetter(pokemon.name)} ${shiny ? "(shiny)" : ""}`}</MyText>
                                <Image
                                    style={{ objectFit: "contain" }}
                                    className="h-44 w-48 mx-auto mt-3"
                                    source={{ uri: `https://projectpokemon.org/images/${shiny ? "shiny" : "normal"}-sprite/${pokemon.name}.gif` }} />
                                <View className="mb-6 mt-4">
                                    <PokedexEntry name={pokemon.name} />
                                </View>
                                <View className="ml-2 ">
                                    <Stats pokemon={pokemon} />
                                </View>
                            </View>
                        </PanGestureHandler>
                    </ImageBackground>
                </Animated.View>
            }
        </View>
    )
}

interface PokedexEntryProps {
    name: string
}

export const PokedexEntry: React.FC<PokedexEntryProps> = ({ name }) => {
    const { data: entry, isSuccess } = useQuery(['pokemonEntry', name], getPokemonEntry)

    return (
        isSuccess &&
        <MyText style="text-lg w-[80vw]  mx-auto text-center">{removeWhitespace(entry)}</MyText>
    )
}

export function removeWhitespace(inputString) {
    let trimmedString = inputString.trim();
    let cleanedString = trimmedString.replace(/\s+/g, ' ');
    return cleanedString;
}
