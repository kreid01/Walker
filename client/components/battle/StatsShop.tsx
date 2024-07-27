import { TouchableOpacity, View } from "react-native"
import { MyText } from "../utils/MyText"
import { Pokemon } from "../../types/types"
import { SetStateAction } from "react"

interface StatsShop {
    pokemon: Pokemon
    setCurrentPokemon: React.Dispatch<React.SetStateAction<Pokemon>>
    coins: number;
    setCoins: React.Dispatch<SetStateAction<number>>
}

export const StatsShop: React.FC<StatsShop> = ({ pokemon, setCurrentPokemon, coins, setCoins }) => {
    const updatePokemonStat = (stat: string, statLevelProperty: string) => {
        setCurrentPokemon((prevState) => (
            { ...prevState, [stat]: prevState[stat] + 1, [statLevelProperty]: prevState[statLevelProperty] + 1 }))
    }

    const stats = [
        { name: "Atk", property: "attack", levelProperty: "attackLevel" },
        { name: "Df", property: "defence", levelProperty: "defenceLevel" },
        { name: "Sp Atk", property: "specialAttack", levelProperty: "specialAttackLevel" },
        { name: "Sp Df", property: "specialDefence", levelProperty: "specialDefenceLevel" },
        { name: "Hp", property: "hp", levelProperty: "hpLevel" },
        { name: "Speed", property: "speed", levelProperty: "speedLevel" },
    ]

    return (
        <View className="mx-4 flex  flex-row flex-wrap">
            {stats.map((stat) => {
                return (
                    <View key={stat.name} className="flex flex-row w-[50%]">
                        <MyText style="text-white text-xl">{stat.name}: </MyText>
                        <MyText style="text-white text-xl ml-auto">{pokemon[stat.property]}</MyText>
                        <TouchableOpacity onPress={() => {
                            if (coins > (10 + pokemon[stat.levelProperty])) {
                                setCoins((prevState) => prevState - 10)
                                updatePokemonStat(stat.property, stat.levelProperty)
                            }
                        }
                        }>
                            <MyText style="text-xl ml-4 text-white">{"+"}</MyText>
                        </TouchableOpacity>
                        <MyText style="text-xl ml-4 text-green-500 mr-4">{10 + pokemon[stat.levelProperty]}$</MyText>
                    </View>
                )
            })}
        </View>
    )
}