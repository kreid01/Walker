import { Ref, useEffect, useRef, useState } from "react"
import { View, Text, Image } from "react-native"
import Animated, { FadeInUp, FadeOutDown, runOnJS, SharedValue, SlideInDown, SlideInRight, SlideInUp, useAnimatedReaction, ZoomIn } from "react-native-reanimated";
import { AnimatedText } from "../utils/AnimatedText";
import hud from "../../sprites/hud/pokemon.png"
import { MyText } from "../utils/MyText";
import { Pokemon } from "../../types/types";
import { getPokemonScale } from "../../utils/utils";

interface UserPokemonProps {
  pokemon1: Pokemon;
  pokemonAttack: any
  flash: any
  widthAnimation: SharedValue<number>
  healthWidth: {
    width: number;
  }
  fainted: boolean
  pokemonOutStyle: any
}


export const UserPokemon: React.FC<UserPokemonProps> = ({ pokemon1, fainted, pokemonOutStyle,
  widthAnimation, pokemonAttack, healthWidth, flash }) => {
  const healthRef = useRef(null)
  updateHealthColour(healthRef, widthAnimation)


  const scale = getPokemonScale(pokemon1.height)
  const top = 90

  const uri = `https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pokemon1.name.toLowerCase()}.gif`

  return (
    <>
      <Animated.View entering={SlideInRight} className="relative right-[0%] top-[65%] pl-5 w-[50%]">
        <Image className="h-11 w-56 absolute left-[100%] top-[74%]" source={hud} />
        <Animated.View ref={healthRef} style={healthWidth} className="h-[5.5px] z-30
         absolute -bottom-[13px] left-[270px] rounded-md"></Animated.View>
        <MyText style="absolute left-[197%] text-xl -bottom-[14px]">{pokemon1?.level}</MyText>
        <MyText style="absolute -right-[90px] text-xl -bottom-[12px]">{pokemon1?.name}</MyText>
        <View className="absolute left-[290px] z-40 top-[15px]">
          <AnimatedText pokemon={pokemon1} sharedValue={widthAnimation} />
        </View>
        <MyText style="absolute left-[330px] text-white z-40 top-[15px]">{pokemon1?.hp}</MyText>
      </Animated.View>
      {!fainted &&
        <>
          <Animated.View style={pokemonOutStyle}>
            <Animated.View entering={SlideInDown} exiting={FadeOutDown}>
              <Animated.View className={"absolute left-0  top-14"} style={[pokemonAttack, flash]}>
                <Animated.Image style={[{
                  transform: [{ scale: scale }],
                  top: top, aspectRatio: 1,
                  height: undefined, width: 180,
                  objectFit: 'contain'
                }]} source={{ uri: uri }} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </>}
    </>
  )
}

export const updateHealthColour = (healthRef: any, widthAnimation: SharedValue<number>) => {
  const updateColour = (value: number) => {
    const percent = 100 - (value * 100)

    const colour = percent < 25 ? "rgb(239,68,68)" : percent < 50 ? "rgb(234,179,8)" : "rgb(34,197,94)"

    if (!healthRef.current) return
    healthRef.current.setNativeProps({ style: { backgroundColor: colour } })
  }

  useAnimatedReaction(() => {
    return widthAnimation.value
  }, (value) => {

    if (updateColour)
      runOnJS(updateColour)(value)

  }, [updateColour, widthAnimation.value])
}