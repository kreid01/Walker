import { FlatList, TouchableOpacity, View, Image } from "react-native"
import { MyText } from "../utils/MyText"
import { useEffect, useState } from "react";
import React from "react";
import { StatsShop } from "./StatsShop";
import { MoveShop } from "./MovesShop";
import { TeamPokemon } from "../../repositories/pokemonRepository";
import { useQuery } from "react-query";
import { getItemQuery, IItem } from "../../repositories/itemRepository";
import { PokemonShop } from "./PokemonShop";
import { ItemShop } from "./ItemShop";
import { Pokemon } from "../../types/types";
import Animated, { ZoomIn } from "react-native-reanimated";

interface ShopUIProps {
    coins: number;
    pokemon: Pokemon
    setCurrentPokemon: React.Dispatch<React.SetStateAction<Pokemon>>
    updateText: (text: string) => void
    team: Pokemon[]
    setTeamIds: React.Dispatch<React.SetStateAction<number[]>>
    setMyItemIds: React.Dispatch<React.SetStateAction<number[]>>
    setTeam: React.Dispatch<React.SetStateAction<Pokemon[]>>
}


export const ShopUI: React.FC<ShopUIProps> = ({ coins, pokemon, setCurrentPokemon,
    updateText, team, setTeamIds, setMyItemIds, setTeam }) => {
    const [selectedMenu, setSelectedMenu] = useState(null)
    const { data: items, isSuccess } = useQuery(["items"], getItemQuery)

    return (
        <Animated.View entering={ZoomIn}>
            {selectedMenu == null && <View className="mx-2 mt-2 flex flex-row  justify-between flex-wrap">
                <TouchableOpacity onPress={() => setSelectedMenu("stats")}
                    className="bg-white rounded-md  mx-[2px] my-1 border-white shadow-lg w-[48%] h-8">
                    <MyText style="text-2xl mx-auto">STATS</MyText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu("moves")}
                    className="bg-white rounded-md  mx-[2px] my-1 border-white shadow-lg w-[48%] h-8">
                    <MyText style="text-2xl mx-auto">MOVES</MyText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu("pokemon")}
                    className="bg-white rounded-md  mx-[2px] my-1 border-white shadow-lg w-[48%] h-8">
                    <MyText style="text-2xl mx-auto">POKEMON</MyText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => isSuccess && setSelectedMenu("items")}
                    className="bg-white rounded-md  mx-[2px] my-1 border-white shadow-lg w-[48%] h-8">
                    <MyText style="text-2xl mx-auto">ITEMS</MyText>
                </TouchableOpacity>
            </View>}
            {selectedMenu == "stats" && <StatsShop
                pokemon={pokemon}
                setCurrentPokemon={setCurrentPokemon} />}
            {selectedMenu == "moves" && <MoveShop
                setTeam={setTeam}
                setCurrentPokemon={setCurrentPokemon}
                setSelectedMenu={setSelectedMenu}
                team={team}
                updateText={updateText}
            />}

            {selectedMenu == "pokemon" && <PokemonShop setSelectedMenu={setSelectedMenu}
                team={team} setTeamIds={setTeamIds} updateText={updateText} />}
            {selectedMenu == "items" && <ItemShop items={items} setMyItemsIds={setMyItemIds} />}
        </Animated.View>
    )
}

