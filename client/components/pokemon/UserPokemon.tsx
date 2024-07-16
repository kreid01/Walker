import { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import Animated, { FadeInUp, SharedValue, SlideInRight, SlideInUp } from "react-native-reanimated";
import { AnimatedText } from "../utils/AnimatedText";
import { Pokemon } from "../../repositories/pokemonRepository";
import hud from "../../sprites/hud/pokemon.png"
import { MyText } from "../utils/MyText";

interface UserPokemonProps {
  pokemon1: Pokemon;
  pokemonAttack: any
  flash: any
  widthAnimation: SharedValue<number>
  healthWidth: {
    width: number;
  }
}


export const UserPokemon: React.FC<UserPokemonProps> = ({ pokemon1,
  widthAnimation, pokemonAttack, healthWidth, flash }) => {
  const xpNeeded = pokemon1?.growthRate?.filter(e => e.level == pokemon1.level)[0].experience
  const [xpBar, setXpBar] = useState((pokemon1?.xp / xpNeeded) * 118)

  const scale =
    pokemon1.height > 50 ? pokemon1.height / 60 :
      pokemon1.height > 20 ? pokemon1.height / 30 :
        pokemon1.height > 18 ? pokemon1.height / 23 :
          pokemon1.height > 10 ? pokemon1.height / 18 :
            pokemon1.height > 5 ? pokemon1.height / 15 :
              pokemon1.height <= 3 ? pokemon1.height / 7 :
                pokemon1.height / 9

  const top = 80

  console.log(pokemon1.height, scale)


  useEffect(() => {
    setXpBar(((pokemon1?.xp / xpNeeded)) * 118)
  }, [pokemon1])

  const uri = `https://img.pokemondb.net/sprites/black-white/anim/back-normal/${pokemon1.name.toLowerCase()}.gif`

  return (
    <>
      <Animated.View entering={SlideInRight} className="relative right-[0%] top-[65%] pl-5 w-[50%]">
        <Image className="h-11 w-56 absolute left-[100%] top-[74%]" source={hud} />
        <Animated.View style={healthWidth} className="h-[5.5px] z-30
          bg-green-500 absolute -bottom-[13px] -right-[163px] rounded-md"></Animated.View>
        <MyText style="absolute left-[197%] text-xl -bottom-[14px]">{pokemon1?.level}</MyText>
        <MyText style="absolute -right-[90px] text-xl -bottom-[12px]">{pokemon1?.name}</MyText>
        <View className="absolute left-[290px] z-40 top-[15px]">
          <AnimatedText pokemon={pokemon1} sharedValue={widthAnimation} />
        </View>
        <MyText style="absolute left-[330px] text-white z-40 top-[15px]">{pokemon1?.hp}</MyText>
      </Animated.View>
      <Animated.View entering={FadeInUp} className={"absolute left-0 bottom-[105px]"} style={[pokemonAttack, flash]}>
        <Animated.Image style={[{
          transform: [{ scale: scale }],
          top: top, aspectRatio: 1,
          height: undefined, width: 180,
          objectFit: 'contain'
        }]} source={{ uri: uri }} />
      </Animated.View>
    </>
  )
}