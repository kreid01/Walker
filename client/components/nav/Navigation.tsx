import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { getTransformAnimation } from "../../utils/animationUtils";
import { NavigationItem } from "./NaivgationItem";
import { useFocusEffect } from "@react-navigation/native";

interface NavigationProps {
  navigation: any;
}

export const Navigation: React.FC<NavigationProps> = ({ navigation }) => {
  const navigationAnimation = useRef(new Animated.Value(0));
  const [out, setOut] = useState(false)

  const onPressIn = () => {
    Animated.timing(opacityAnimation.current, {
      toValue: out ? 0 : 1,
      useNativeDriver: true,
      duration: 100
    }).start(() => setOut(!out));
    Animated.spring(navigationAnimation.current, {
      toValue: out ? 0 : 1,
      useNativeDriver: true,
    }).start(() => setOut(!out))
  };

  useFocusEffect(
    useCallback(() => {
      closeNav()
    }, []))

  useEffect(() => {
    closeNav
  }, [])


  const closeNav = () => {
    Animated.timing(opacityAnimation.current, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100
    }).start()
    Animated.spring(navigationAnimation.current, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
    setOut(false);
  }


  const opacityAnimation = useRef(new Animated.Value(0));
  const opacity = {
    opacity: opacityAnimation.current.interpolate({ inputRange: [0, 1], outputRange: [0, 100] }),
    zIndex: opacityAnimation.current.interpolate({ inputRange: [0, 1], outputRange: [-1, 10], })
  }


  return (
    <>
      <Animated.View style={opacity as any} className="bg-green-300 z-50 h-[100vh] w-[100vw] absolute" />
      <View className="abosolute bottom-[10%] left-[42%] z-20">
        <TouchableOpacity onPress={() => onPressIn()}>
          <View className="bg-white rounded-full w-14 h-14"></View>
        </TouchableOpacity>
        <NavigationItem navigation={navigation} transform={getTransformAnimation(0, 0, 0, -160, navigationAnimation)} name="Pokedex" />
        <NavigationItem navigation={navigation} transform={getTransformAnimation(0, 130, 0, -100, navigationAnimation)} name="Inventory" />
        <NavigationItem navigation={navigation} transform={getTransformAnimation(0, -130, 0, -100, navigationAnimation)} name="Shop" />
        <NavigationItem navigation={navigation} transform={getTransformAnimation(0, 130, 0, -240, navigationAnimation)} name="Pokemon" />
        <NavigationItem navigation={navigation} transform={getTransformAnimation(0, -130, 0, -240, navigationAnimation)} name="Customise" />
      </View>
    </>
  )
}