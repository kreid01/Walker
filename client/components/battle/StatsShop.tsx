import { TouchableOpacity, View } from "react-native"
import { MyText } from "../utils/MyText"
import { Pokemon } from "../../types/types"

interface StatsShop {
    pokemon: Pokemon
    setCurrentPokemon: React.Dispatch<React.SetStateAction<Pokemon>>
}

export const StatsShop: React.FC<StatsShop> = ({ pokemon, setCurrentPokemon }) => {
    const updatePokemonStat = (stat: string) => {
        setCurrentPokemon((prevState) => (
            { ...prevState, [stat]: prevState[stat] + 1 }))
    }

    const stats = [
        { name: "Atk", property: "attack" },
        { name: "Df", property: "defence" },
        { name: "Sp Atk", property: "specialAttack" },
        { name: "Sp Df", property: "specialDefence" },
        { name: "Hp", property: "hp" },
        { name: "Speed", property: "speed" },
    ]

    return (
        <View className="mx-4 flex  flex-row flex-wrap">
            {stats.map((stat) => {
                return (
                    <View key={stat.name} className="flex flex-row w-[50%]">
                        <MyText style="text-white text-xl">{stat.name}: </MyText>
                        <MyText style="text-white text-xl ml-auto">{pokemon[stat.property]}</MyText>
                        <TouchableOpacity onPress={() => updatePokemonStat(stat.property)}>
                            <MyText style="text-xl ml-4 text-white">{"+"}</MyText>
                        </TouchableOpacity>
                        <MyText style="text-xl ml-4 text-green-500 mr-4">10$</MyText>
                    </View>
                )
            })}
        </View>
    )
}