import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Fight } from "../components/battle/Fight";
import { Touchable, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


import masterball from "../assets/masterball.png"
import { TouchableOpacity } from "react-native-gesture-handler";

export const FightScreen = ({ navigation, route }) => {
  const { starterPokemonId, fusion } = route.params
  const [focused, setIsFocused] = useState(false)
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsFocused(isFocused)
  }, [isFocused])




  return (
    focused &&
    <Fight navigation={navigation} starterPokemonId={starterPokemonId} fusion={fusion} />
  )
}
