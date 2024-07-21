import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity, View, Image } from "react-native";
import { getTransformAnimation } from "../../utils/animationUtils";
import { NavigationItem } from "./NaivgationItem";
import { useFocusEffect } from "@react-navigation/native";
import { interpolate, default as Reanimted, withTiming } from "react-native-reanimated"

interface NavigationProps {
  navigation: any;
}

import masterBall from "../../assets/masterball.png"
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

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

    masterballAnimation.value = 0
    masterballAnimation.value = withTiming(1, { duration: 500 })
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

  const masterballAnimation = useSharedValue(0);
  const masterballStyle = useAnimatedStyle((): any => {
    return { transform: [{ rotate: `${interpolate(masterballAnimation.value, [0, .5, 1], [15, -15, 0])}deg` }] }
  })

  return (
    <>
      <Animated.View style={opacity as any} className="bg-green-300 z-50 h-[100vh] w-[100vw] absolute" />
      <View className="abosolute bottom-[10%] left-[42%] z-20">
        <TouchableOpacity onPress={() => onPressIn()}>
          <Reanimted.Image style={masterballStyle} source={masterBall} className=" rounded-full w-20 h-20 right-3" />
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