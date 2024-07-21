import { Image, TouchableOpacity, View } from "react-native"
import { MyText } from "../utils/MyText"
import { TeamPokemon } from "../../repositories/pokemonRepository";
import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/utils";

interface LearnMoveProps {
    pokemon: TeamPokemon
    setTeamIds: React.Dispatch<React.SetStateAction<number[]>>
    setSelectedPokemon: any
    team: TeamPokemon[]
    updateText: (text: string) => void
    setSelectedMenu: any
}

export const GotPokemon: React.FC<LearnMoveProps> = ({ team, pokemon, setTeamIds,
    updateText, setSelectedMenu, setSelectedPokemon }) => {
    const [releasePokemon, setReleasePokemon] = useState(false)

    const release = (releasedPokemon: TeamPokemon) => {
        let newArray = team.map(e => e.id)
        newArray = team.filter(e => e.id != releasedPokemon.id).map(e => e.id)
        newArray.push(pokemon.id)
        setTeamIds(newArray)

        updateText("You released " + releasedPokemon.name)
        setTimeout(() => {
            updateText("You got " + pokemon.name)
        }, 2000)
        setSelectedMenu(null)
        setReleasePokemon(false)
        setSelectedPokemon(null)
    }

    return (
        <View>
            {!releasePokemon &&
                <>
                    <MyText style={"text-white text-xl text-center"}>Release a Pokemon</MyText>
                    <View className="fle flex-row justify-between mx-4">
                        <TouchableOpacity onPress={() => setReleasePokemon(true)} className=" border-[1px] border-white rounded-md mt-2">
                            <MyText style={"text-white text-2xl ml-2 py-2 my-auto mx-auto px-1"}>Release Pokemon</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSelectedPokemon(null)
                            setSelectedMenu(null)
                        }} className=" border-[1px] border-white rounded-md mt-2">
                            <MyText style={"text-white text-2xl py-2 ml-2 my-auto mx-auto px-1"}>Keep Old Pokemon</MyText>
                        </TouchableOpacity>
                    </View>
                </>
            }
            {releasePokemon &&
                <View className="flex flex-row mx-4 ">
                    <View>
                        <MyText style="text-white text-xl">New Pokemon</MyText>
                        <View className="border-[1px] border-white px-1 mt-3 rounded-sm">
                            <View className="flex flex-row">
                                <MyText style="text-white text-lg">{capitalizeFirstLetter(pokemon.name)}</MyText>
                                <MyText style="text-white text-lg ml-4"> {capitalizeFirstLetter(pokemon.type)}</MyText>
                            </View>
                            <Image className="h-16 w-16" source={{ uri: pokemon.front }} />
                        </View>
                    </View>
                    <View className="ml-12">
                        <MyText style="text-xl text-white text-center mb-2">Current Pokemon</MyText>
                        {team.map((pokemon) => {
                            return (
                                <TouchableOpacity key={pokemon.id} onPress={() => release(pokemon)}>
                                    <MyText style="text-lg -mt-2 text-white">{pokemon.name}  </MyText>
                                </TouchableOpacity>)
                        })}
                    </View>
                </View>
            }
        </View>
    )
}