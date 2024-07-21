import { ImageBackground, TouchableOpacity, View, Image } from "react-native"
import { MyText } from "../components/utils/MyText"
import { Navigation } from "../components/nav/Navigation"
import { useQuery } from "react-query"
import { getStarterPokemon } from "../utils/secureStorage"
import { useIsFocused } from "@react-navigation/native"
import { useEffect } from "react"

const pikachuUri = `https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif`
const dialgaUri = `https://img.pokemondb.net/sprites/black-white/anim/normal/dialga.gif`
const serperiorUri = `https://img.pokemondb.net/sprites/black-white/anim/normal/serperior.gif`
const rapidashUri = `https://img.pokemondb.net/sprites/black-white/anim/normal/rapidash.gif`
const gengarUri = `https://img.pokemondb.net/sprites/black-white/anim/normal/gengar.gif`
const victiniUri = `https://img.pokemondb.net/sprites/black-white/anim/normal/victini.gif`
const giratinaUri = `https://img.pokemondb.net/sprites/black-white/anim/normal/giratina.gif`
const mewUri = `https://img.pokemondb.net/sprites/black-white/anim/normal/mew.gif`
const bunnyUri = `https://img.pokemondb.net/sprites/black-white/anim/normal/buneary.gif`
const lugiaUri = `https://img.pokemondb.net/sprites/black-white/anim/normal/lugia.gif`


export const HomeScreen = ({ navigation }: { navigation: any }) => {
    const { data: starterPokemon, refetch } = useQuery('starterPokemon', getStarterPokemon)

    const focused = useIsFocused()
    useEffect(() => {
        refetch()
    }, [focused])


    console.log(starterPokemon)

    return (
        <View className="h-[100vh] w-[100vw]">
            <ImageBackground className="w-[100%] h-[100%] absolute -z-10" source={{ uri: "https://i.pinimg.com/originals/af/92/99/af92992e01ed558690e8d6e0bbefb0c9.jpg" }} />
            <Image className="w-16 h-16 ml-20 mt-20 z-2 absolute right-8 top-56" source={{ uri: pikachuUri }} />
            <Image className="w-16 h-16 ml-20 mt-20 z-2 absolute top-24 left-16" source={{ uri: dialgaUri }} />
            <Image className="w-20 h-20 ml-20 mt-20 z-2 absolute top-32 -left-14" source={{ uri: rapidashUri }} />
            <Image className="w-20 h-20 ml-20 mt-20 z-2 absolute top-40 left-10" source={{ uri: serperiorUri }} />
            <Image className="w-20 h-20 ml-20 mt-20 z-2 absolute left-40 -top-10" source={{ uri: gengarUri }} />
            <Image style={{ transform: [{ scaleX: -1 }] }} className="w-28 h-28 ml-20 mt-20 z-2 absolute top-48 -left-20" source={{ uri: giratinaUri }} />
            <Image className="w-16 h-10 ml-20 mt-20 z-2 absolute -top-12" source={{ uri: mewUri }} />
            <Image className="w-28 h-40 ml-20 mt-20 z-2 absolute bottom-20 -left-20" source={{ uri: victiniUri }} />
            <Image className="w-20 h-40 ml-20 mt-20 z-2 absolute right-8 bottom-20" source={{ uri: bunnyUri }} />
            <Image className="w-24 h-16 ml-20 mt-20 z-2 absolute right-8 top-20" source={{ uri: lugiaUri }} />
            <View className=" justify-center mx-24 mt-auto mb-28">
                <TouchableOpacity onPress={() => navigation.navigate("Fight", { starterPokemonId: starterPokemon })} className="border-white drop-shadow-lg border-2 my-2 rounded-md">
                    <MyText style="mx-auto text-white text-3xl">Standard</MyText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Fight")} className="border-white drop-shadow-lg border-2 my-2 rounded-md">
                    <MyText style="mx-auto text-white text-3xl">Fusion</MyText>
                </TouchableOpacity>
            </View>
            <Navigation navigation={navigation} />
        </View>
    )
}