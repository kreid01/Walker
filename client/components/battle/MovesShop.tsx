import { useCallback, useEffect, useRef, useState } from "react";
import Animated, { FadeOut, useSharedValue } from "react-native-reanimated";
import { getPokemonMovesQuery, TeamPokemon } from "../../repositories/pokemonRepository";
import { useFocusEffect } from "@react-navigation/native";
import { capitalizeFirstLetter, duplidateData, shuffle } from "../../utils/utils";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { MyText } from "../utils/MyText";
import { LearnMove } from "./LearnMove";
import { ShuffleAnimation } from "./SuffleAnimation";
import { IPokemonMove, Pokemon } from "../../types/types";

interface MoveShopProps {
    setCurrentPokemon: React.Dispatch<React.SetStateAction<Pokemon>>
    updateText: (text: string) => void
    team: Pokemon[]
    setSelectedMenu: React.Dispatch<React.SetStateAction<string>>
    setTeam: React.Dispatch<React.SetStateAction<Pokemon[]>>
    setCoins: React.Dispatch<React.SetStateAction<number>>
    coins: number;
}

export const MoveShop: React.FC<MoveShopProps> = ({ setTeam, setCoins, coins,
    setCurrentPokemon, updateText, team, setSelectedMenu }) => {
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [move, setMove] = useState<IPokemonMove>(null)
    const [moves, setMoves] = useState(selectedPokemon?.moves)

    const updateMove = (newMove: IPokemonMove) => {
        if (selectedPokemon?.currentMoves.length < 4) {
            let newTeam = team;
            const index = newTeam.indexOf(selectedPokemon)
            newTeam[index].currentMoves = [...newTeam[index].currentMoves, newMove]
            setTeam(newTeam)

            updateText(capitalizeFirstLetter(selectedPokemon.name) + " learned " + newMove.name)
            setSelectedMenu(null)
        } else {
            setMove(newMove)
        }
    }


    useEffect(() => {
        if (selectedPokemon) {
            const pokemonMoves = selectedPokemon.currentMoves.map((m) => m && m.name)
            setMoves(shuffle(duplidateData(selectedPokemon?.moves.filter(e => !pokemonMoves.includes(e.name)))))
        }
    }, [selectedPokemon, team])


    return (
        selectedPokemon == null ? (
            <View className="ml-2 mt-2">
                <View className="flex flex-row flex-wrap">
                    {team.map((p) => {
                        return (
                            <React.Fragment key={p.id}>
                                <MyText style="text-white w-[20%] text-lg">{p?.name}</MyText>
                                <TouchableOpacity onPress={() => {
                                    if (coins > 50) {
                                        setCoins((prevState) => prevState - 50)
                                        setSelectedPokemon(p)
                                    }
                                }}
                                    className="border-white border-[1px] rounded-md mx-3">
                                    <MyText style="text-white text-lg px-2">MOVE $50</MyText>
                                </TouchableOpacity>
                            </React.Fragment>
                        )
                    })}
                </View>
            </View>
        ) : (selectedPokemon != null && !move) ?
            <ShuffleAnimation data={moves} method={updateMove} />
            : (selectedPokemon != null && move) ?
                <LearnMove
                    setPokemon={setCurrentPokemon}
                    move={move} setMove={setMove}
                    pokemon={selectedPokemon}
                    updateText={updateText}
                    setSelectedMenu={setSelectedMenu}
                /> : <MyText style="text-white text-xl ml-3 mt-2">Loading...</MyText>
    )
}
