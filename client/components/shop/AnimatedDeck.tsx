import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, useWindowDimensions, Image, Pressable } from "react-native";
import Animated, { Extrapolate, FadeInRight, FadeOutDown, FadeOutRight, LightSpeedInLeft, LightSpeedInRight, RotateInUpLeft, RotateInUpRight, RotateOutUpRight, SlideInLeft, ZoomInRotate, ZoomOutUp, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
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

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => scrollToIndex(), 100);
      setCardSelected(null)
    }, []))

  const scrollToIndex = () => flatList?.current?.scrollToIndex({ index: Math.round(data.length / 2) })

  return (
    <>
      <Button className="absolute -top-10" onPress={() => navigation.navigate("Fight")}> X</Button>
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
