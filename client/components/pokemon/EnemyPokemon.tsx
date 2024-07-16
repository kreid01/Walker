import { View, Image, useAnimatedValue, TextInput } from "react-native"
import Animated, { FadeInDown, FadeOutDown, SharedValue, SlideInLeft, useAnimatedRef, useDerivedValue, useSharedValue } from "react-native-reanimated"

interface EnemyPokemonProps {
  attack: any
  pokemon2: any
  fainted: boolean
  width: {
    width: number;
  }
  flashAnimation: any
}

import hud from "../../sprites/hud/enemy.png"
import { MyText } from "../utils/MyText";

export const EnemyPokemon: React.FC<EnemyPokemonProps> = ({ attack, pokemon2, width, flashAnimation, fainted }) => {

  const uri = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon2.name.toLowerCase()}.gif`

  const scale =
    pokemon2.height > 50 ? pokemon2.height / 60 :
      pokemon2.height > 20 ? pokemon2.height / 30 :
        pokemon2.height > 18 ? pokemon2.height / 25 :
          pokemon2.height > 14 ? pokemon2.height / 20 :
            pokemon2.height > 10 ? pokemon2.height / 18 :
              pokemon2.height > 5 ? pokemon2.height / 15 :
                pokemon2.height <= 3 ? pokemon2.height / 7 :
                  pokemon2.height / 9

  const top = pokemon2.height > 12 ? 40 : pokemon2.height > 9 ? 45 : 70

  return (
    <>
      <Animated.View entering={SlideInLeft} className="relative top-[10%] left-[65%]">
        <Image className="h-10 w-56 absolute  right-[120%] top-[45%]" source={hud} />
        <Animated.View style={width} className="h-[4px] w-10  bg-green-500 absolute right-[135.7%] top-[20.5px] rounded-md" />
        <MyText style="w-[120px]  right-[131%] -top-1 absolute text-xl">{pokemon2?.name}</MyText>
      </Animated.View>
      {!fainted && <Animated.View exiting={FadeOutDown}>
        <Animated.View className={"absolute right-0 -top-5"} style={[attack, flashAnimation]}>{ }
          <Animated.Image style={[{
            transform: [{ scale: scale }],
            top: top, aspectRatio: 1,
            height: undefined, width: 180,
            objectFit: 'contain'
          }]} source={{ uri: uri }} />
        </Animated.View>
      </Animated.View>}
    </>
  )
}