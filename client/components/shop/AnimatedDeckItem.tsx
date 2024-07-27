import { default as Reanimted, Extrapolate, FadeOutDown, interpolate, LightSpeedInRight, SharedValue, useAnimatedStyle, FadeInRight, ZoomIn, SlideInRight, SlideInLeft } from "react-native-reanimated"
import { Pressable, Animated, View, Image, ImageBackground } from "react-native"
import { MyText } from "../utils/MyText"
import { useRef } from "react"
import { capitalizeFirstLetter } from "../../utils/utils"
import React from "react"
import { Stats } from "../stats/Stats"
import { useQuery } from "react-query"
import { getPokemonEntry } from "../../repositories/pokemonRepository"
import { getBackgroundColour } from "../battle/FightUI"
import { savePokemon } from "../../utils/secureStorage"

interface AnimatedDeckItemProps {
  pokemon: any
  index: number
  contentOffset: SharedValue<number>
  flatList: any
  cardSelected: any
  setCardSelected: any
  navigation: any
}

import pokecard from "../../assets/poke.png"
import grassbg from "../../assets/grassbg.jpg"

export const AnimatedDeckItem: React.FC<AnimatedDeckItemProps> = ({ pokemon, index, contentOffset, flatList, setCardSelected, cardSelected, navigation }) => {
  const carouselWidth = 35
  const inputRange = [
    (index - 3) * (carouselWidth),
    (index - 2) * (carouselWidth),
    (index - 1) * (carouselWidth),
    index * carouselWidth,
    (index + 1) * carouselWidth,
    (index + 2) * carouselWidth,
    (index + 3) * carouselWidth]

  const rotationOutputRange = [20, 16, 9, 0, -9, -16, -20];
  const translateXOutputRange = [
    165 + (carouselWidth * 3),
    165 + (carouselWidth * 2),
    165 + (carouselWidth), 165,
    165 - (carouselWidth),
    165 - (carouselWidth * 2),
    165 - (carouselWidth * 3)];
  const translateYOutputRange = [13, -10, -40, -100, -30, -10, 13];

  const rStyle = useAnimatedStyle((): any => {
    const value = {
      transform: [
        {
          translateY: interpolate(contentOffset.value, inputRange, translateYOutputRange),
        },
        {
          translateX: parseInt(interpolate(contentOffset.value, inputRange, translateXOutputRange, Extrapolate.CLAMP).toFixed(0)),
        },
        {
          rotate: `${interpolate(contentOffset.value, inputRange, rotationOutputRange)}deg`
        }
      ]
    }

    return value;
  })

  const cardAnimation = useRef(new Animated.Value(0));
  const imageFront = useRef(new Animated.Value(0))
  const imageBack = useRef(new Animated.Value(0))

  const image1Opacity = {
    opacity: imageFront.current.interpolate({
      inputRange: [0, 0.7, .71, 1],
      outputRange: [0, 0, 1, 1],
    })
  }

  const image2Opacity = {
    opacity: imageFront.current.interpolate({
      inputRange: [0, 0.7, .71, 1],
      outputRange: [1, 1, 0, 0],
    })
  }

  const transofrm = {
    transform: [
      {
        rotateY: cardAnimation.current.interpolate({
          inputRange: [0, 0.7, 1],
          outputRange: ["0deg", "90deg", "0deg"]
        }),
      }, {
        scale: cardAnimation.current.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 2, 4.6]
        }),
      },
      {
        translateY: cardAnimation.current.interpolate({
          inputRange: [0, 0.3, 1],
          outputRange: [1, -20, -33]
        }),
      }
    ],
  }

  const startAnimation = () => {
    scrollTo();
    setTimeout(() => {
      Animated.timing(imageBack.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 100
      }).start(() => setCardSelected(index));
      Animated.timing(cardAnimation.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 2000
      }).start();

      Animated.timing(imageFront.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 2000
      }).start();
    }, 300)
  }

  const scrollTo = () => {
    flatList.current?.scrollToIndex({ index: index, animated: true, duration: 50 });
    savePokemon(pokemon.id)
    setTimeout(() => navigation.navigate("Home"), 6000)
  }

  const uri = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon?.name.toLowerCase()}.gif`

  return (
    <Reanimted.View className="rounded-lg relative w-[35px] h-[112px]" style={[{ aspectRatio: 1, }, rStyle]}>
      {(cardSelected == null || cardSelected == index) &&
        <Reanimted.View entering={LightSpeedInRight.delay(50 * index).duration(300)} exiting={FadeOutDown}>
          <Pressable onPress={() => startAnimation()}>

            <Animated.View style={transofrm as any}
              className='mx-auto relative w-20 h-28 drop-shadow-xl rounded-lg'>

              <Animated.Image style={image2Opacity} source={pokecard} className={"h-28 w-20"} />


              <Animated.View
                className="absolute"
                style={image1Opacity}>
                <ImageBackground
                  className="h-28 w-20 border-[1px] border-yellow-100  overflow-hidden rounded-lg"
                  source={grassbg} >
                  <View className="absolute h-28 w-20 bg-white opacity-25"></View>
                </ImageBackground>
              </Animated.View>

              <Animated.View className="absolute scale-50 -right-[129px] -top-[180px]" style={image1Opacity as any}>
                <View className="flex scale-50 flex-row">
                  <View className="top-56 w-36">
                    <MyText style="ml-4 text-black w-40 text-4xl">{capitalizeFirstLetter(pokemon.name)}</MyText>
                    <View className="flex flex-row ml-2">
                      {pokemon?.types.map(type => {
                        if (!type) return
                        return (
                          <View key={type} className={`border-2 w-14 ml-5 mx-1 border-${getBackgroundColour(type)}-500`}>
                            <MyText style={`text-center text-black `}>{capitalizeFirstLetter(type)}</MyText>
                          </View>
                        )
                      })}
                    </View>
                  </View>
                  <Animated.Image source={{ uri: uri }} style={[{ objectFit: "contain" }, image1Opacity]}
                    className="h-36 ml-16 top-56 right-8 relative w-32" />
                </View>
                <Reanimted.View style={{ transform: [{ scale: 0.45 }] }}>
                  <Stats pokemon={pokemon} />
                </Reanimted.View>
              </Animated.View>

            </Animated.View>
          </Pressable>
          {cardSelected &&
            <PokemonEntry name={pokemon?.name} />}
        </Reanimted.View>}
    </Reanimted.View >

  )
}

interface PokemonEntryProps {
  name: string
}

export const PokemonEntry: React.FC<PokemonEntryProps> = ({ name }) => {
  const { data: entry, isSuccess } = useQuery(['pokemonEntry', name], getPokemonEntry)

  return (
    isSuccess &&
    <Reanimted.View className="w-80 -ml-24 mt-14" entering={SlideInLeft.delay(500).duration(1000)}>
      <MyText style="text-xl text-white">{entry}</MyText>
    </Reanimted.View>
  )
}