import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { withTiming } from "react-native-reanimated";
import { BattleUI } from "../components/battle/BattleUI";
import { Navigation } from "../components/nav/Navigation";
import { EnemyPokemon } from "../components/pokemon/EnemyPokemon";
import { UserPokemon } from "../components/pokemon/UserPokemon";
import { useAttackAnimation } from "../hooks/useAttackAnimation";
import { useEnemyAttackAnimation } from "../hooks/useEnemyAttackAnimation";
import { useGetPokemon } from "../hooks/useGetPokemon";
import { getRapidash, getTeamByIds, IPokemonMove, TeamPokemon } from '../repositories/pokemonRepository';
import { capitalizeFirstLetter, generateRandom } from "../utils/utils";
import { ShopUI } from "../components/battle/ShopUI";
import { useQuery } from "react-query";
import { MyText } from "../components/utils/MyText";


export const FightScreen = ({ navigation }) => {
  const [myPokemon, setMyPokemon] = useState(1)
  const [pokemon, setPokemon] = useState(4)
  const [teamIds, setTeamIds] = useState([1, 77, 92, 172, 3, 6])

  const [text, setText] = useState("")
  const [round, setRound] = useState(0)
  const [coins, setCoins] = useState(0)

  const [resettingText, setResettingText] = useState(false)
  const [lockUI, setLockUI] = useState(false)

  const { currentPokemon: userPokemon, isSuccess, health: userHealth, setCurrentPokemon } = useGetPokemon(myPokemon)
  const { currentPokemon: enemyPokemon, isSuccess: isSuccess2, health: enemyHealth } = useGetPokemon(pokemon)
  const { data: team } = useQuery(["team", teamIds], getTeamByIds)

  console.log(team)

  const [fainted, setFainted] = useState(false)

  const updateText = (text: string) => {
    setResettingText(true)
    setTimeout(() => {
      setText(text)
      setResettingText(false)
    }, 100)
  }

  const { attack,
    pokemonAttack,
    width,
    widthAnimation,
    enemyFlash } = useAttackAnimation(userPokemon,
      enemyPokemon,
      updateText,
      setPokemon,
      enemyHealth,
      setCurrentPokemon
    )
  const { enemyPokemonAttack,
    enemyAttack,
    healthWidth,
    widthAnimation: userWidthAnimation,
    flash
  } = useEnemyAttackAnimation(userPokemon,
    enemyPokemon,
    updateText,
    userHealth)

  useEffect(() => {
    if (enemyPokemon) {
      setLockUI(true)
      updateText(enemyPokemon?.name + " appeared")
      widthAnimation.value = withTiming(0, { duration: 50 })
      setTimeout(() => updateText("What will you do?"), 2000)
      setTimeout(() => setLockUI(false), 4000)
    }
  }, [enemyPokemon?.name])

  const startAttack = (move: IPokemonMove) => {
    setLockUI(true)
    attack(move)
    setTimeout(() => {
      if (enemyHealth.value <= 0) {
        updateText(enemyPokemon.name + " fainted")
        setCoins(prevState => prevState + generateRandom(10))
        setRound(prevState => prevState + 1)
        setFainted(true)
        setTimeout(() => {
          setPokemon(generateRandom())
          setFainted(false)
        }, 1000)
      } else {
        enemyAttack()
        setTimeout(() => updateText("What will you do?"), 2000)
      }
    }, 3000)
    setTimeout(() => setLockUI(false), 7000)
  }

  const changePokemon = (pokemon: TeamPokemon) => {
    setMyPokemon(pokemon.id)
  }

  useEffect(() => {
    if (userPokemon) updateText("You send out " + capitalizeFirstLetter(userPokemon.name))
  }, [userPokemon])


  const [background, setBackground] = useState(require("../sprites/backgrounds/image-5.png"))


  return (
    <View className="h-[100vh] relative">
      <View className=" flex flex-row bg-slate-500 pt-5 border-2 border-yellow-500">
        <MyText style="text-xl  text-white mx-auto">Coins: {coins}</MyText>
        <MyText style="text-xl text-white mx-auto">Round: {round}</MyText>
      </View>
      <ImageBackground className="absolute top-[7.7vh]" style={{ height: 270, width: "100%" }} source={background} />
      <View className="relative z-5">
        <View className=" h-[89vw]">
          {isSuccess && userPokemon?.growthRate.length > 1 && userWidthAnimation &&
            <UserPokemon
              pokemon1={userPokemon}
              pokemonAttack={pokemonAttack}
              healthWidth={healthWidth}
              widthAnimation={userWidthAnimation}
              flash={flash}
            />}
          {isSuccess2 && enemyPokemon && widthAnimation &&
            <EnemyPokemon width={width}
              attack={enemyPokemonAttack}
              pokemon2={enemyPokemon}
              fainted={fainted}
              flashAnimation={enemyFlash} />
          }
        </View>
      </View>
      <BattleUI
        team={team}
        changePokemon={changePokemon}
        lockUI={lockUI}
        pokemon={userPokemon}
        attack={startAttack}
        text={text}
        coins={coins}
        setCurrentPokemon={setCurrentPokemon}
        updateText={updateText}
        resettingText={resettingText} />
      <View className="hidden">
        <Navigation navigation={navigation} />
      </View>
    </View >
  )
}
