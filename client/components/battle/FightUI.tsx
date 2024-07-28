import { TouchableOpacity, View, Text } from "react-native"
import { MyText } from "../utils/MyText"
import { IPokemonMove, Pokemon } from "../../types/types"
import Animated, { ZoomIn } from "react-native-reanimated"

interface FightUIProps {
    pokemon: Pokemon
    attack: (move: IPokemonMove) => void
    setSelectedMenu: any
}

export const FightUI: React.FC<FightUIProps> = ({ pokemon, attack, setSelectedMenu }) => {

    return (
        <Animated.View entering={ZoomIn} className="flex flex-wrap flex-row w-[98%] my-1 mt-2 mx-2 ">
            {pokemon.currentMoves.map(move => {
                return (
                    <TouchableOpacity key={move.name} className="w-[48%] h-14" onPress={() => {
                        attack(move)
                        setSelectedMenu(null)
                    }
                    }>
                        <View style={{ backgroundColor: getBackgroundColour(move.type) }} className="h-[97%]  mx-[4px] 
                        border-white my-2 border-2 rounded-sm">
                            <View className="flex flex-row">
                                <MyText style="mr-auto ml-2 text-md my-auto text-white">{move.name.toUpperCase()}</MyText>
                                <View className={`border-2 mr-2 px-2 h-6 mt-1 rounded-sm border-${getBackgroundColour(move.type)}-500`}>
                                    <MyText style=" text-lg -mt-1 text-white">{move.type}</MyText>
                                </View>
                            </View>
                            <View className="flex flex-row mb-1">
                                <MyText style="mr-auto ml-2 my-auto text-lg text-white">{move.power > 0 ? `Power: ${move.power}` : "Status"}</MyText>
                                <MyText style="mr-auto ml-auto mr-2 my-auto text-lg text-white">{`${move.pp}/${move.pp} PP`}</MyText>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </Animated.View>
    )
}

export const getBackgroundColour = (type: string) => {
    switch (type) {
        case "fire":
            return "red"
        case "grass":
            return "green"
        case "water":
            return "teal"
        case "ghost":
            return "purple"
        case "dragon":
            return "blue"
        case "psychic":
            return "pink"
        case "electric":
            return "yellow"
        case "ground":
            return "brown"
        case "rock":
            return "orange"
        case "steel":
            return "silver"
        case "bug":
            return "lime"


        default:
            return "gray"

    }
}