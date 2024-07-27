import { TouchableOpacity, View, Image } from "react-native";
import { TeamPokemon } from "../../repositories/pokemonRepository";
import { MyText } from "../utils/MyText";
import { Pokemon } from "../../types/types";
import Animated, { ZoomIn } from "react-native-reanimated";

interface PokemonUIProps {
    changePokemon: (pokemon: number) => void;
    team: Pokemon[]
    setSelectedMenu: React.Dispatch<any>
    health: any
    pokemon: Pokemon
}

export const PokemonUI: React.FC<PokemonUIProps> = ({ team, changePokemon, setSelectedMenu, health, pokemon }) => {
    return (
        pokemon && team && <Animated.View entering={ZoomIn} className={`flex flex-row flex-wrap mx-2`}>
            {team.map((p, i) => {
                const hpWidth = (p?.id == pokemon?.id ? health.value : p?.currentHp) / p?.hp * 82.5
                const isFaintedBg = p?.currentHp > 0 ? "" : "bg-red-500"
                return (
                    <TouchableOpacity
                        key={p?.name} onPress={() => {
                            if (p.currentHp > 0) {
                                changePokemon(p?.id)
                                setSelectedMenu(null)
                            }
                        }} className={`w-[47%] border-white border-[1px] flex flex-row rounded-sm m-1 ${isFaintedBg}`}>
                        <View className={`w-[50%]`}>
                            <MyText style="text-white ml-1 -mt-1 text-lg">{p?.name}</MyText>
                            <View className="w-[100%] absolute top-6 rounded-md ml-1 bg-white h-2"></View>
                            <View style={{ width: hpWidth > 0 ? hpWidth : 1 }}
                                className=" absolute top-6 rounded-md ml-1 bg-green-500 h-2"></View>
                        </View>
                        <MyText style="text-white ml-2 mt-5">{p?.id == pokemon?.id ? health.value : p?.currentHp} / {p?.hp}</MyText>
                        <Image className="ml-auto h-10 w-10 object-fit" source={{ uri: p?.front }} />
                    </TouchableOpacity>
                )
            })}
        </Animated.View>
    )
}

