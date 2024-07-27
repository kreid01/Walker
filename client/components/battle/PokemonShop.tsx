import { useEffect, useState } from "react";
import { getPokemonByType, TeamPokemon } from "../../repositories/pokemonRepository";
import { useQuery } from "react-query";
import { capitalizeFirstLetter, duplidateData } from "../../utils/utils";
import { TouchableOpacity, View } from "react-native";
import { getBackgroundColour } from "./FightUI";
import { ShuffleAnimation } from "./SuffleAnimation";
import { GotPokemon } from "./GotPokemon";
import { MyText } from "../utils/MyText";
import { Pokemon } from "../../types/types";

interface PokemonShopProps {
    setSelectedMenu: any
    team: Pokemon[];
    setTeamIds: React.Dispatch<React.SetStateAction<number[]>>
    updateText: (text: string) => void
    setCoins: React.Dispatch<React.SetStateAction<number>>
    coins: number
}

export const PokemonShop: React.FC<PokemonShopProps> = ({ setSelectedMenu, team, setTeamIds, setCoins, coins,
    updateText
}) => {
    const shopItems = ["water", "fire", "grass", "ghost", "dragon", "poison"]
    const [selectedType, setSelectedType] = useState(null)
    const { data, isSuccess } = useQuery(["shopPokemon", selectedType], getPokemonByType)
    const [duplicatedData, setDuplicatedData] = useState([])
    const [selectedPokemon, setSelectPokemon] = useState(null)

    useEffect(() => {
        if (data) setDuplicatedData(duplidateData(data))
    }, [data, isSuccess])

    const updatePokemon = (pokemon: Pokemon) => {
        if (team.length < 6) {
            setTeamIds((prevState) => [...prevState, pokemon.id])
            updateText("You got " + pokemon.name)
            setSelectedMenu(null)
            setSelectedType(null)
        } else {
            setSelectPokemon(pokemon)
        }
    }

    return (
        selectedType == null ? (
            <View className="flex flex-row flex-wrap">
                {shopItems.map(item => {
                    return (
                        <TouchableOpacity key={item} onPress={() => {
                            if (coins > 100) {
                                setCoins((prevState) => prevState - 100)
                                setSelectedType(item)
                            }
                        }}
                            className="w-[45%] mx-2 border-white border-[1px] rounded-lg mt-2">
                            <View className={`border-[1px] mx-1 rounded-lg  border-${getBackgroundColour(item)}-500`}>
                                <MyText style="text-white mx-auto text-2xl">{capitalizeFirstLetter(item)} Type $100</MyText>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        ) :
            isSuccess && selectedPokemon == null ?
                <ShuffleAnimation data={duplicatedData} method={updatePokemon} /> :
                isSuccess && selectedPokemon != null ?
                    <GotPokemon pokemon={selectedPokemon} setSelectedMenu={setSelectedMenu}
                        setSelectedPokemon={setSelectPokemon} setTeamIds={setTeamIds} team={team}
                        updateText={updateText} />
                    : <MyText style="text-xl text-white ml-2 mt-1">Loading...</MyText>

    )
}


