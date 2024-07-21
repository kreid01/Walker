import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, useWindowDimensions, Image, Pressable } from "react-native";
import Animated, { Extrapolate, FadeInRight, FadeOutDown, FadeOutRight, FadeOutUp, LightSpeedInLeft, LightSpeedInRight, RotateInUpLeft, RotateInUpRight, RotateOutUpRight, SlideInLeft, ZoomInRotate, ZoomOutUp, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { AnimatedDeckItem } from "./AnimatedDeckItem";

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

  useFocusEffect(
    useCallback(() => {
      setCardSelected(null)
    }, []))

  useEffect(() => {
    if (rendered && data) setTimeout(() => scrollToIndex(), 400)
  }, [rendered, data])


  const scrollToIndex = () => flatList?.current?.scrollToIndex({ index: Math.round(data.length / 2) })

  return (
    <>
      <Animated.FlatList
        pointerEvents={cardSelected != null ? "none" : "auto"}
        entering={FadeInRight}
        exiting={FadeOutUp}
        ref={flatList}
        onLayout={() => setRendered(true)}
        className="h-[100vh] w-[105vw] absolute pt-[50vh]  -ml-[18px] "
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
    </>
  )
}
