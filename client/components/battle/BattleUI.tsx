import React, { useState } from "react";
import { IPokemonMove, Pokemon, TeamPokemon } from "../../repositories/pokemonRepository";
import { TouchableOpacity, View, Image } from "react-native";
import { FightUI } from "./FightUI";
import TypingText from 'react-native-typing-text';
import { BattleButton } from "../utils/BattleButton";
import Typing from "../text/Typing";
import { MyText } from "../utils/MyText";
import { ShopUI } from "./ShopUI";

interface BattleUIProps {
    pokemon: Pokemon
    attack: (move: IPokemonMove) => void
    text: string;
    resettingText: boolean
    lockUI: boolean
    team: TeamPokemon[]
    changePokemon: (pokemon: TeamPokemon) => void
    setCurrentPokemon: any
    coins: number
    updateText: (text: string) => void
}


export const BattleUI: React.FC<BattleUIProps> = ({ pokemon, attack, text, updateText,
    resettingText, lockUI, team, changePokemon, coins, setCurrentPokemon }) => {
    const [selectedMenu, setSelectedMenu] = useState(null)
    console.log(selectedMenu)

    return (
        <View className="w-[100%] fixed  top-8  bg-slate-500 -mt-24  border-2 border-yellow-500 h-[52%] py-2" pointerEvents={lockUI ? "none" : "auto"}>
            <View className="bg-white w-[95%] mt-2 h-16 border-yellow-300 border-2 rounded-md mr-1 ml-2">
                {!resettingText && <Typing color={"black"} textSize={22} text={text} />}
            </View>
            {selectedMenu == null &&
                <View className="flex flex-wrap flex-row w-[98%] mt-2 mx-2 ">
                    <BattleButton setSelectedMenu={setSelectedMenu} text="FIGHT" colour={"bg-red-500"} />
                    <BattleButton setSelectedMenu={setSelectedMenu} text="POKeMON" colour="bg-green-500" />
                    <BattleButton setSelectedMenu={setSelectedMenu} text="BAG" colour="bg-yellow-500" />
                    <BattleButton setSelectedMenu={setSelectedMenu} text="RUN" colour="bg-blue-500" />
                    <BattleButton setSelectedMenu={setSelectedMenu} text="SHOP" colour="bg-purple-500" />
                </View>}
            {selectedMenu == "fight" && <FightUI
                setSelectedMenu={setSelectedMenu}
                pokemon={pokemon}
                attack={attack} />}
            {selectedMenu == "pokemon" && <PokemonUI
                changePokemon={changePokemon}
                team={team}
                setSelectedMenu={setSelectedMenu} />}
            {selectedMenu == "shop" && <ShopUI
                pokemon={pokemon}
                updateText={updateText}
                setCurrentPokemon={setCurrentPokemon}
                team={team}
                coins={coins} />}
            {selectedMenu != null &&
                <TouchableOpacity onPress={() => setSelectedMenu(null)}
                    className="border-[1px] mt-auto ml-3 my-2 mx-auto  border-white w-14 rounded-sm">
                    <MyText style="px-2 mx-auto text-white text-xl">{"Back"}</MyText>
                </TouchableOpacity>}
        </View>
    )
}

interface PokemonUIProps {
    changePokemon: (pokemon: TeamPokemon) => void;
    team: TeamPokemon[]
    setSelectedMenu: React.Dispatch<any>
}

export const PokemonUI: React.FC<PokemonUIProps> = ({ team, changePokemon, setSelectedMenu }) => {
    return (
        <View className="flex flex-row flex-wrap mx-2">
            {team.map((p) => {
                return (
                    <TouchableOpacity onPress={() => {
                        changePokemon(p)
                        setSelectedMenu(null)
                    }} className="w-[47%] border-white border-[1px] flex flex-row rounded-sm m-1">
                        <View className="w-[50%]">
                            <MyText style="text-white ml-1 -mt-1 text-xl">{p.name}</MyText>
                            <View className="w-[100%] rounded-md ml-1 bg-green-500 h-2"></View>
                        </View>
                        <MyText style="text-white ml-2 mt-5">20/20</MyText>
                        <Image className="ml-auto h-10 w-10 object-fit" source={{ uri: p.front }} />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}