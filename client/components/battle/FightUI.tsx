import { TouchableOpacity, View, Text } from "react-native"
import { IPokemonMove, Pokemon } from "../../repositories/pokemonRepository"
import { MyText } from "../utils/MyText"

interface FightUIProps {
    pokemon: Pokemon
    attack: (move: IPokemonMove) => void
    setSelectedMenu: any
}

export const FightUI: React.FC<FightUIProps> = ({ pokemon, attack, setSelectedMenu }) => {

    return (
        <View className="flex flex-wrap flex-row w-[98%] mt-2 mx-2 ">
            {pokemon.currentMoves.map(move => {
                return (
                    <TouchableOpacity key={move.name} className="w-[48%]" onPress={() => {
                        attack(move)
                        setSelectedMenu(null)
                    }
                    }>
                        <View style={{ backgroundColor: getBackgroundColour(move.type) }} className="h-8 mx-[2px] border-white border-2 flex flex-row rounded-md">
                            <MyText style="mr-auto ml-1 text-lg my-auto text-white">{move.name.toUpperCase()}</MyText>
                            <MyText style="mr-auto ml-1 my-auto text-lg text-white">{move.power > 0 ? `Power: ${move.power}` : "Status"}</MyText>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export const getBackgroundColour = (type: string) => {
    switch (type) {
        case "fire":
            return "red"
        case "grass":
            return "green"
        case "water":
            return "blue"

        default:
            return "gray"

    }
}