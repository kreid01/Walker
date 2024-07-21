import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import Animated, { FadeOut, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { BattleUI } from "../components/battle/BattleUI";
import { BattleGround } from "../components/battle/Battlground";
import { useAttackAnimation } from "../hooks/useAttackAnimation";
import { useEnemyAttackAnimation } from "../hooks/useEnemyAttackAnimation";
import { IPokemonMove } from "../types/types";
import { generateRandom } from "../utils/utils";
import { BattleHeader } from "../components/battle/BattleHeader";
import { useGetPokemon } from "../hooks/useGetPokemon";
import { useGetTeam } from "../hooks/useGetTeam";


export const FightScreen = ({ navigation, route }) => {
  const { starterPokemonId } = route.params
  const [starterPokemon, setStarterPokemon] = useState(starterPokemonId)

  const [pokemon, setPokemon] = useState<number>(generateRandom())
  const isFocused = useIsFocused();
  const [focused, setIsFocused] = useState(true)


  useEffect(() => {
    if (!isFocused) {
      setPokemon(generateRandom(1000))
      userWidthAnimation.value = withTiming(0, { duration: 50 })

      setCoins(0)
      setRound(0)
      setStarterPokemon(route.params)

      setIsFocused(false)
    } else {
      setIsFocused(true)
    }
  }, [isFocused])


  const [text, setText] = useState("")
  const [round, setRound] = useState(0)
  const [coins, setCoins] = useState(0)

  const [resettingText, setResettingText] = useState(false)
  const [lockUI, setLockUI] = useState(false)
  const [lost, setLost] = useState(false)
  const [fainted, setFainted] = useState(false)
  const [userFainted, setUserFainted] = useState(false)
  const [teamIds, setTeamIds] = useState([parseInt(starterPokemon)])

  const [currentPokemonHealth, setCurrentPokemonHealth] = useState<number>()

  const { currentPokemon: currentPokemon, health: userHealth, setCurrentPokemon, changePokemon,
    team, setTeam
  } = useGetTeam(teamIds, currentPokemonHealth)
  const { currentPokemon: enemyPokemon, health: enemyHealth } = useGetPokemon(pokemon)

  const updateText = (text: string) => {
    setResettingText(true)
    setTimeout(() => {
      setText(text)
      setResettingText(false)
    }, 100)
  }

  const checkAllFainted = (currentPokemonHp: number) => {
    const teamFainted = team.filter(e => e && e.id != currentPokemon.id).every(e => e.currentHp <= 0)
    const currentPokemonFainted = currentPokemonHp <= 0
    if (teamFainted && currentPokemonFainted) {
      return true
    }
  }

  const { attack,
    pokemonAttack,
    width,
    widthAnimation,
    enemyFlash } = useAttackAnimation(currentPokemon,
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
  } = useEnemyAttackAnimation(currentPokemon,
    enemyPokemon,
    updateText,
    userHealth,
    checkAllFainted)

  useEffect(() => {
    if (currentPokemon)
      userWidthAnimation.value = withTiming(1 - (currentPokemon.currentHp / currentPokemon.hp), { duration: 50 })
  }, [currentPokemon?.name])

  useEffect(() => {
    setCurrentPokemonHealth(userHealth.value)
  }, [userHealth.value])


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
        levelUp()
        setFainted(true)
        setTimeout(() => {
          setPokemon(generateRandom())
          setFainted(false)
        }, 1000)
      } else {
        startEnemyAttack()
      }
    }, 3000)

    setTimeout(() => {
      if (!lost) setLockUI(false)
    }, 7000)
  }

  const startEnemyAttack = () => {
    enemyAttack()
    setTimeout(() => {
      if (userHealth.value <= 0 && !checkAllFainted(userHealth.value)) {
        setTimeout(() => {
          const id = (team.filter(e => e && e.id != currentPokemon.id && e.currentHp > 0)[0])
          changePokemon(id.id)
          setUserFainted(false)
        }, 1000)
      } else {
        updateText(currentPokemon.name + " fainted")
        setUserFainted(true)
        setLost(true)
        setLockUI(true)
        setTimeout(() => updateText(`All your pokemon have fainted, you made it to round ${round}`), 2000)
      }
    }, 3000)
  }


  const levelUp = () => {
    const value = (xpBar.value + (20))
    xpBar.value = withTiming(value, { duration: 500 })
  }

  const xpBar = useSharedValue(0);
  const xpBarAnimation = useAnimatedStyle((): any => {
    return { width: interpolate(xpBar.value, [0, 99], [0, 99]) }
  })

  const changePokemonTurn = (id: number) => {
    changePokemon(id)
    setLockUI(true)
    const pokemon = team.filter(e => e.id == id)[0].name
    updateText("You sent out " + pokemon)
    setTimeout(() => {
      enemyAttack()
      setTimeout(() => updateText("What will you do?"), 2000)
    }, 3000)
    setTimeout(() => setLockUI(false), 7000)
  }

  const [showIntro, setShowIntro] = useState(true)
  useEffect(() => {
    setShowIntro(true)
    setTimeout(() => setShowIntro(false), 2500)
  }, [focused])

  return (
    focused && <View className="h-[100vh] relative">
      {showIntro && <Animated.Image exiting={FadeOut} source={gif} className="h-[268px] top-[135px] w-[375px] l z-20 absolute" />}
      <BattleHeader coins={coins} round={round} xpBarAnimation={xpBarAnimation} />
      <BattleGround
        userFainted={userFainted}
        currentPokemon={currentPokemon}
        pokemonAttack={pokemonAttack}
        healthWidth={healthWidth}
        userWidthAnimation={userWidthAnimation}
        fainted={fainted}
        flash={flash}
        enemyFlash={enemyFlash}
        enemyPokemon={enemyPokemon}
        enemyPokemonAttack={enemyPokemonAttack}
        width={width}
      />
      {currentPokemon && <BattleUI
        health={userHealth}
        navigation={navigation}
        team={team}
        changePokemon={changePokemonTurn}
        setTeam={setTeam}
        setTeamIds={setTeamIds}
        lockUI={lockUI}
        pokemon={currentPokemon}
        setCurrentPokemon={setCurrentPokemon}
        attack={startAttack}
        text={text}
        coins={coins}
        updateText={updateText}
        resettingText={resettingText} />}
    </View >
  )
}

import gif from "../assets/intro.gif"
import { UserPokemon } from "../components/pokemon/UserPokemon";
