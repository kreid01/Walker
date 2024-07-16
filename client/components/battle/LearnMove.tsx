import { TouchableOpacity, View } from "react-native"
import { MyText } from "../utils/MyText"
import { IPokemonMove, Pokemon } from "../../repositories/pokemonRepository";
import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/utils";

interface LearnMoveProps {
    setMove: any;
    pokemon: Pokemon
    move: IPokemonMove
    setPokemon: any
    updateText: (text: string) => void
    setSelectedMenu: any
}

export const LearnMove: React.FC<LearnMoveProps> = ({ setMove, pokemon, move, setPokemon, updateText, setSelectedMenu }) => {
    const [forgetAMove, setForgetAMove] = useState(false)

    const forgetMove = (forgotMove: IPokemonMove) => {
        let newArray = pokemon.currentMoves
        newArray.push(move)
        newArray = pokemon.currentMoves.filter(e => e.name != forgotMove.name)
        setPokemon((prevState) => ({ ...prevState, currentMoves: newArray }))

        updateText(capitalizeFirstLetter(pokemon.name) + " learned " + move.name)
        setSelectedMenu(null)
        setForgetAMove(false)
        setMove(null)
    }

    return (
        <View>
            {!forgetAMove &&
                <>
                    <MyText style={"text-white text-xl text-center"}>Change Move</MyText>
                    <View className="fle flex-row justify-between mx-4">
                        <TouchableOpacity onPress={() => setForgetAMove(true)} className=" border-[1px] border-white rounded-md mt-2">
                            <MyText style={"text-white text-2xl ml-2 py-2 my-auto mx-auto px-1"}>Forget a move</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setMove(null)
                            setSelectedMenu(null)
                        }} className=" border-[1px] border-white rounded-md mt-2">
                            <MyText style={"text-white text-2xl py-2 ml-2 my-auto mx-auto px-1"}>Keep old moves</MyText>
                        </TouchableOpacity>
                    </View>
                </>
            }
            {forgetAMove &&
                <View className="flex flex-row mx-4 -mt-4">
                    <View>
                        <MyText style="text-white text-xl">New Move</MyText>
                        <View className="border-[1px] border-white px-1 mt-3 rounded-sm">
                            <View className="flex flex-row">
                                <MyText style="text-white text-lg">{move.name}</MyText>
                                <MyText style="text-white text-lg ml-4"> {capitalizeFirstLetter(move.type)}</MyText>
                            </View>
                            <View className="flex flex-row">
                                <MyText style="text-white text-lg">Power {move.power}</MyText>
                                <MyText style="text-white text-lg ml-auto">PP {move.pp}</MyText>
                            </View>
                        </View>
                    </View>
                    <View className="ml-12">
                        <MyText style="text-xl text-white text-center mb-2">Current Moves</MyText>
                        {pokemon.currentMoves.map((move) => {
                            return (
                                <TouchableOpacity onPress={() => forgetMove(move)}>
                                    <MyText style="text-lg -mt-2 text-white">{move.name} - {move.power < 1 ? "status" : move.power}
                                    </MyText>
                                </TouchableOpacity>)
                        })}
                    </View>
                </View>
            }
        </View>
    )
}