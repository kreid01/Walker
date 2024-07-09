import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, useWindowDimensions, Image, Pressable } from "react-native";
import Animated, { Extrapolate, FadeInRight, FadeOutDown, FadeOutRight, LightSpeedInLeft, LightSpeedInRight, RotateInUpLeft, RotateInUpRight, RotateOutUpRight, SlideInLeft, ZoomInRotate, ZoomOutUp, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { DeckItem } from "./DeckItem";
import { save, savePokemon } from "../utils/secureStorage";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";

interface AnimatedCircularCarouselProps {
  data: any
  navigation: any
}


export const AnimatedCircularCarousel: React.FC<AnimatedCircularCarouselProps> = ({data, navigation}) => {
  const contentOffset = useSharedValue(0)
  const { width: windowWidth} = useWindowDimensions()
  const ListItemWidth = windowWidth / 4;
  const flatList = useRef(null)
  const [cardSelected, setCardSelected] = useState(null)

     useFocusEffect(
           useCallback(() => {
setTimeout(() => scrollToIndex(), 100);
            setCardSelected(null)
           }, []))

const scrollToIndex = () => flatList?.current?.scrollToIndex({index: Math.round(data.length / 2)})

  return (
    <>
      <Button className="absolute -top-10"  onPress={() => navigation.navigate("Fight")}> X</Button>
    <Animated.FlatList 
    pointerEvents={cardSelected != null ? "none" : "auto"}
    entering={FadeInRight}
    ref={flatList}
      className="h-[120vh] -top-6  absolute"
      scrollEventThrottle={16}
      pagingEnabled
      snapToInterval={35}
       onScroll={(e) => {
        contentOffset.value = e.nativeEvent.contentOffset.x
      }}
      contentContainerStyle={{ paddingRight: ListItemWidth * 4,  alignItems: 'center' }}
      horizontal 
      data={data}
      keyExtractor={(_, i) => i.toString()} renderItem={({ item, index }) => {
        return (
          <AnimatedCarouselItem
           flatList={flatList}
           navigation={navigation}
            contentOffset={contentOffset}
            cardSelected={cardSelected}
            setCardSelected={setCardSelected}
            pokemon={item}
              index={index} />
        )
      }} />
    </>
  )
}

interface AnimatedCarouselItemProps {
  pokemon: any
  index: number
  contentOffset: Animated.SharedValue<number>
  flatList: any
  cardSelected: any
  setCardSelected: any
  navigation :any
}

const AnimatedCarouselItem: React.FC<AnimatedCarouselItemProps> = ({ pokemon, index, contentOffset, flatList, setCardSelected, cardSelected, navigation }) => {
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
   165 -(carouselWidth),
   165- (carouselWidth * 2),
   165 - (carouselWidth *3)];
  const translateYOutputRange = [13, -10, -40, -100, -30, -10, 13];

  const rStyle = useAnimatedStyle(() => {

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

  console.log(cardSelected, index)

  return (
    <Animated.View  className="rounded-lg" style={[{ width: 35, aspectRatio: 1, height: 300 }, rStyle]}>
      {(cardSelected == null || cardSelected == index)  && 
      <Animated.View entering={LightSpeedInRight.delay(50 * index).duration(300)} exiting={FadeOutDown}>
      <DeckItem
      navigation={navigation}
       index={index}  
        cardSelected={cardSelected}
       onPress={() => 
       {
          savePokemon("pokemon", pokemon.id)
          setCardSelected(index)
        }
      } 
       pokemon={pokemon}
        flatList={flatList} />
        </Animated.View>}

    </Animated.View>

  )
}