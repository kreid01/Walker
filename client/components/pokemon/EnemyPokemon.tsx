import { View, Image, useAnimatedValue, TextInput } from "react-native"
import Animated, { FadeInDown, FadeInUp, FadeOutDown, runOnJS, SharedValue, SlideInLeft, SlideInUp, useAnimatedReaction, useAnimatedRef, useDerivedValue, useSharedValue } from "react-native-reanimated"
import hud from "../../sprites/hud/enemy.png"
import { MyText } from "../utils/MyText";
import { useRef } from "react";
import { updateHealthColour } from "./UserPokemon";
import { getPokemonScale } from "../../utils/utils";
import { Pokemon } from "../../types/types";

interface EnemyPokemonProps {
  attack: any
  pokemon2: Pokemon
  fainted: boolean
  width: {
    width: number;
  }
  flashAnimation: any
  widthAnimation: SharedValue<number>
}


export const EnemyPokemon: React.FC<EnemyPokemonProps> = ({ attack, pokemon2, width, flashAnimation, fainted, widthAnimation }) => {

  const healthRef = useRef()
  updateHealthColour(healthRef, widthAnimation)
  const uri = pokemon2.fusion ? pokemon2.front : `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon2.name.toLowerCase()}.gif`

  const height = pokemon2.height;
  const top =
    pokemon2.fusion && height == 65 ? 40
      : pokemon2.fusion ? 70 : (height == 17 ? 55 :
        height == 7 ? 50 :
          height == 6 ? 60 :
            height == 5 ? 35 :
              height > 12 ? 40
                : height > 9 ? 45 : 70)

  return (
    <>
      <Animated.View entering={SlideInLeft} className="relative top-[10%] left-[65%]">
        <Image className="h-10 w-56 absolute  right-[120%] top-[45%]" source={hud} />
        <Animated.View ref={healthRef} style={[width]} className={`h-[4px] w-10 bg-green-500  absolute -left-[57.2%] top-[20.7px] rounded-md`} />
        <MyText style="w-[120px]  right-[131%] -top-1 absolute text-xl">{pokemon2?.name}</MyText>
        <MyText style="w-[120px]  right-[102%] -top-[2px] absolute text-xl">{pokemon2?.level}</MyText>
      </Animated.View>
      {!fainted &&
        <Animated.View exiting={FadeOutDown} entering={FadeInDown}>
          <Animated.View className={"absolute right-0 -top-5"} style={[attack, flashAnimation]}>{ }
            <Animated.Image style={[{
              transform: [{ scale: getPokemonScale(height) }],
              top: top, aspectRatio: 1,
              height: undefined, width: 180,
              objectFit: 'contain'
            }]} source={{ uri: uri }} />
          </Animated.View>
        </Animated.View>}
    </>
  )
}

export const getHeatlhBarColour = (width: number) => {
  const percent = width / 82 * 100
  if (percent <= 50) return "yellow"
  if (percent <= 30) return "orange"
  if (percent <= 20) return "red"
  else return "green"
}