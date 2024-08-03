import React, { SetStateAction, useEffect, useState } from "react";
import { getTeamByIds, TeamPokemon } from "../../repositories/pokemonRepository";
import { TouchableOpacity, View } from "react-native";
import { FightUI } from "./FightUI";
import { BattleButton } from "../utils/BattleButton";
import Typing from "../text/Typing";
import { MyText } from "../utils/MyText";
import { ShopUI } from "./ShopUI";
import { useQuery } from "react-query";
import { IPokemonMove, Pokemon } from "../../types/types";
import { BagUI } from "./BagUI";
import { RunUI } from "./RunUI";
import { PokemonUI } from "./PokemonUI";
import Animated from "react-native-reanimated";

interface BattleUIProps {
    pokemon: Pokemon
    attack: (move: IPokemonMove) => void
    text: string;
    resettingText: boolean
    lockUI: boolean
    changePokemon: (pokemon: number) => void
    setCurrentPokemon: any
    coins: number
    updateText: (text: string) => void
    navigation: any
    team: Pokemon[]
    setTeam: any
    setTeamIds: any
    health: any
    setCoins: React.Dispatch<SetStateAction<number>>
}


export const BattleUI: React.FC<BattleUIProps> = ({ pokemon, attack, text, updateText, team, setTeam, setTeamIds,
    resettingText, lockUI, changePokemon, coins, setCurrentPokemon, navigation, health, setCoins }) => {
    const [itemIds, setItemIds] = useState([])
    const [selectedMenu, setSelectedMenu] = useState(null)

    return (
        <View className="w-[100%] fixed  top-8  bg-slate-500 -mt-28  border-2 border-yellow-500 h-[49vh] -m py-2" pointerEvents={lockUI ? "none" : "auto"}>
            <View className="bg-white w-[95%]  h-16 border-yellow-300 border-2 rounded-md mr-1 ml-2">
                {!resettingText && <Typing color={"black"} textSize={22} text={text} />}
            </View>
            {selectedMenu == null &&
                <View className="flex flex-wrap flex-row w-[98%] mt-2 mx-2 ">
                    <BattleButton setSelectedMenu={setSelectedMenu} text="FIGHT" colour={"bg-red-500"} />
                    <BattleButton setSelectedMenu={setSelectedMenu} text="POKeMON" colour="bg-green-500" />
                    <BattleButton setSelectedMenu={setSelectedMenu} text="BAG" colour="bg-yellow-500" />
                    <BattleButton setSelectedMenu={setSelectedMenu} text="SHOP" colour="bg-purple-500" />
                    <BattleButton setSelectedMenu={setSelectedMenu} text="RUN" colour="bg-blue-500" />
                </View>}
            {selectedMenu == "fight" && <FightUI
                setSelectedMenu={setSelectedMenu}
                pokemon={pokemon}
                attack={attack} />}
            {selectedMenu == "pokemon" && <PokemonUI
                health={health}
                pokemon={pokemon}
                changePokemon={changePokemon}
                team={team}
                setSelectedMenu={setSelectedMenu} />}
            {selectedMenu == "bag" && <BagUI teamPokemon={team} itemIds={itemIds} />}
            {selectedMenu == "shop" && <ShopUI
                setCoins={setCoins}
                setTeamIds={setTeamIds}
                pokemon={pokemon}
                setTeam={setTeam}
                updateText={updateText}
                setMyItemIds={setItemIds}
                setCurrentPokemon={setCurrentPokemon}
                team={team}
                coins={coins} />}
            {selectedMenu == "run" && <RunUI navigation={navigation} setSelectedMenu={setSelectedMenu} />}
            {(selectedMenu != null || selectedMenu == "run") &&
                <View className="mt-auto relative w-14 z-10">
                    <TouchableOpacity onPress={() => setSelectedMenu(null)}
                        className="border-[1px] ml-2 mb-8 border-white w-14 rounded-sm">
                        <MyText style="px-2 mx-auto text-white text-xl">{"Back"}</MyText>
                    </TouchableOpacity>
                </View>}
        </View>
    )
}