import { Pressable, View } from "react-native";
import {Extrapolate, default as Reanimated, interpolate, interpolateColor, useAnimatedStyle, useSharedValue} from "react-native-reanimated"

interface ItemProp {
  animationValue: any
  label: any
}

export const Item: React.FC<ItemProp> = (props) => {
  const { animationValue, label } = props;
  const animated = Reanimated;
  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.3, 1, 0.3],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  }, [animationValue]);


  const labelStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP,
    ) 

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#b6bbc0", "transparent", "#b6bbc0"],
    );

    return {
      transform: [{ scale }, { translateY: translateY.value }],
      backgroundColor: color,
    };
  }, [animationValue, translateY]);


  return (
      <animated.View
      className="h-[100%] items-center justify-center" style={[
          containerStyle,
        ]}
      >
        <animated.View style={labelStyle as any} className=" w-20 h-20 border-[1px] rounded-full border-white">
        <animated.Image   source={{uri: label.front}} className="h-16 mx-auto my-auto w-16 brightness-0"/>
        </animated.View>
      </animated.View>
  );
};

type Item = {
  name: string;
  price: number;
  preview: null | []
}