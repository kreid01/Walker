import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, useWindowDimensions, Image, Pressable, ImageBackground } from "react-native";
import Animated, { Extrapolate, FadeInRight, FadeOutDown, FadeOutRight, FadeOutUp, LightSpeedInLeft, LightSpeedInRight, RotateInUpLeft, RotateInUpRight, RotateOutUpRight, SlideInDown, SlideInLeft, ZoomIn, ZoomInRotate, ZoomOutUp, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { AnimatedDeckItem } from "./AnimatedDeckItem";
import loading from "../../assets/loading.gif"

interface AnimatedDeckProps {
  data: any
  navigation: any
}


export const AnimatedDeck: React.FC<AnimatedDeckProps> = ({ data, navigation }) => {
  const contentOffset = useSharedValue(0)
  const { width: windowWidth } = useWindowDimensions()
  const ListItemWidth = windowWidth / 4;
  const flatList = useRef(null)
  const [cardSelected, setCardSelected] = useState(null)

  const [rendered, setRendered] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setCardSelected(null)
    }, []))

  useEffect(() => {
    if (rendered && data) {
      setTimeout(() => scrollToIndex(), 400)
    }
  }, [rendered, data])

  setTimeout(() => setLoaded(true), 2500)
  const scrollToIndex = () => flatList?.current?.scrollToIndex({ index: Math.round(data.length / 2) })

  return (
    <ImageBackground className="absolute h-[100%] w-[100%]" source={{ uri: "https://wallpapercave.com/wp/wp10311662.jpg" }}>
      <View className="absolute w-[100%] h-[100%] opacity-20 bg-black"></View>
      {!loaded && <Image source={loading} className='ml-[38%] absolute mt-[50%] h-20 w-20 ' />}
      <Animated.FlatList
        pointerEvents={cardSelected != null ? "none" : "auto"}
        entering={SlideInDown.delay(2500)}
        exiting={FadeOutUp}
        ref={flatList}
        onLayout={() => setRendered(true)}
        className="h-[100vh] w-[105vw] absolute pt-[50vh]  -ml-[18px]"
        scrollEventThrottle={16}
        pagingEnabled
        snapToInterval={35}
        onScroll={(e) => {
          contentOffset.value = e.nativeEvent.contentOffset.x
        }}
        contentContainerStyle={{ paddingRight: ListItemWidth * 4, alignItems: 'center' }}
        horizontal
        data={data}
        keyExtractor={(_, i) => i.toString()} renderItem={({ item, index }) => {
          return (
            <AnimatedDeckItem
              flatList={flatList}
              navigation={navigation}
              contentOffset={contentOffset}
              cardSelected={cardSelected}
              setCardSelected={setCardSelected}
              pokemon={item}
              index={index} />
          )
        }} />
    </ImageBackground>
  )
}
