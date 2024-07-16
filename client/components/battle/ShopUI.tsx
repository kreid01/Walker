import { FlatList, TouchableOpacity, View } from "react-native"
import { MyText } from "../utils/MyText"
import { useCallback, useEffect, useRef, useState } from "react";
import { IPokemonMove, Pokemon, TeamPokemon } from "../../repositories/pokemonRepository";
import { Button } from "react-native-paper";
import { getBackgroundColour } from "./FightUI";
import Animated, { Extrapolation, FadeOut, interpolate, SharedValue, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { capitalizeFirstLetter, generateRandom, shuffle } from "../../utils/utils";
import { LearnMove } from "./LearnMove";
import { AnimatedMove } from "./AnimtedMove";
import { useFocusEffect } from "@react-navigation/native";
import { useCellListener } from "tinybase/ui-react";

interface ShopUIProps {
    coins: number;
    pokemon: Pokemon
    setCurrentPokemon: React.Dispatch<React.SetStateAction<Pokemon>>
    updateText: (text: string) => void
    team: TeamPokemon[]
}


export const ShopUI: React.FC<ShopUIProps> = ({ coins, pokemon, setCurrentPokemon, updateText, team }) => {

    const [selectedMenu, setSelectedMenu] = useState(null)
    const [selectedPokemon, setSelectedPokemon] = useState(null)

    const updatePokemonStat = (stat: string) => {
        setCurrentPokemon((prevState) => (
            { ...prevState, [stat]: prevState[stat] + 1 }))
    }

    const [moves, setMoves] = useState(pokemon?.moves)
    useEffect(() => {
        if (pokemon?.moves?.length > 1) {
            const pokemonMoves = pokemon.currentMoves.map((m) => m.name)
            setMoves(shuffle([
                ...pokemon.moves,
                ...pokemon.moves,
                ...pokemon.moves,
                ...pokemon.moves,
                ...pokemon.moves,
                ...pokemon.moves,
                ...pokemon.moves,
                ...pokemon.moves,
                ...pokemon.moves,
                ...pokemon.moves]).filter((p) => !pokemonMoves.includes(p.name)))
        }
    }, [pokemon?.moves])


    const stats = [
        { name: "Atk", property: "attack" },
        { name: "Df", property: "defence" },
        { name: "Sp Atk", property: "specialAttack" },
        { name: "Sp Df", property: "specialDefence" },
        { name: "Hp", property: "hp" },
        { name: "Speed", property: "speed" },

    ]


    const contentOffset = useSharedValue(0)
    const flatList = useRef(null)
    const [rendered, setRendered] = useState(false)

    const [move, setMove] = useState<IPokemonMove>(null)

    const random = () => {
        flatList.current.scrollToOffset({ offset: 3000, animated: true })
        setTimeout(() => flatList.current.scrollToOffset({ offset: 3000, animated: true }), 200)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4000, animated: true }), 400)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4500, animated: true }), 600)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4600, animated: true }), 800)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4700, animated: true }), 1000)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4750, animated: true }), 1200)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4800, animated: true }), 1400)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4850, animated: true }), 1600)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4890, animated: true }), 1800)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4920, animated: true }), 2000)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4940, animated: true }), 2200)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4960, animated: true }), 2400)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4980, animated: true }), 2600)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 5020, animated: true }), 2800)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 5040, animated: true }), 3000)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 5060, animated: true }), 3200)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 5070, animated: true }), 3400)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 5080, animated: true }), 3600)

        const newMove = moves[127]

        setTimeout(() => {
            if (pokemon.currentMoves.length < 4) {
                setCurrentPokemon(prevState => ({ ...prevState, currentMoves: [...prevState.currentMoves, newMove] }))
                updateText(capitalizeFirstLetter(pokemon.name) + " learned " + newMove.name)
                setSelectedMenu(null)
            } else {
                setMove(newMove)
            }
        }, 5000)
    }

    useEffect(() => {
        if (rendered) random();
    }, [rendered])

    useCallback(() => {
        useFocusEffect(() => {
            if (rendered) random()
        })
    }, [])

    return (
        <View>
            {selectedMenu == null && <View className="mx-2 mt-2 flex flex-row  justify-between flex-wrap">
                <TouchableOpacity onPress={() => setSelectedMenu("stats")} className="bg-white rounded-md shadow-lg w-[48%] h-8">
                    <MyText style="text-2xl mx-auto">STATS</MyText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu("moves")} className="bg-white rounded-md shadow-lg w-[48%] h-8">
                    <MyText style="text-2xl mx-auto">MOVES</MyText>
                </TouchableOpacity>
                <View className="bg-white mt-2 rounded-md shadow-lg w-[48%] h-8">
                    <MyText style="text-2xl mx-auto">POKEMON</MyText>
                </View>
                <View className="bg-white mt-2 rounded-md shadow-lg w-[48%] h-8">
                    <MyText style="text-2xl mx-auto">ITEMS</MyText>
                </View>
            </View>}
            {selectedMenu == "stats" &&
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
            }
            {selectedMenu == "moves" && move == null &&
                <>
                    {selectedPokemon == null ? (
                        <View className="ml-2 mt-2">
                            <View className="flex flex-row flex-wrap">
                                {team.map((p) => {
                                    return (
                                        <>
                                            <MyText style="text-white w-[20%] text-xl">{pokemon?.name}</MyText>
                                            <TouchableOpacity onPress={() => setSelectedPokemon(pokemon)}
                                                className="border-white border-[1px] rounded-md mx-3">
                                                <MyText style="text-white text-xl px-2">BUY MOVE</MyText>
                                            </TouchableOpacity>
                                        </>
                                    )
                                })}
                            </View>
                        </View>) : (
                        <Animated.View exiting={FadeOut}>
                            <Animated.FlatList
                                ref={flatList}
                                onLayout={() => setRendered(true)}
                                style={{ paddingTop: 40 }}
                                pagingEnabled
                                snapToInterval={32}
                                onScroll={(e) => {
                                    contentOffset.value = e.nativeEvent.contentOffset.y
                                }}
                                scrollEventThrottle={16}
                                keyExtractor={(_, i) => i.toString()}
                                onEndReached={() => setMoves(prevState => [...prevState, ...pokemon.moves])} className="mx-auto" data={moves} renderItem={(item) => {
                                    return <AnimatedMove item={item} contentOffset={contentOffset} />
                                }} />
                        </Animated.View>)}
                </>
            }
            {move != null &&
                <LearnMove
                    setPokemon={setCurrentPokemon}
                    move={move} setMove={setMove}
                    pokemon={pokemon}
                    updateText={updateText}
                    setSelectedMenu={setSelectedMenu}
                />
            }
        </View>
    )
}


