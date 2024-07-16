import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { getBackgroundColour } from "./FightUI";
import { View } from "react-native";
import { MyText } from "../utils/MyText";

interface AnimatedMoveProps {
    item: any;
    contentOffset: SharedValue<number>
}

export const AnimatedMove: React.FC<AnimatedMoveProps> = ({ item, contentOffset }) => {
    const itemHeight = 40;
    const index = item.index

    const inputRange = [
        (index - 1) * itemHeight,
        (index) * itemHeight,
        (index + 1) * itemHeight,
    ]

    const style = useAnimatedStyle((): any => {
        const value = {
            opacity: interpolate(contentOffset.value, inputRange, [0.5, 1, 0.5], Extrapolation.CLAMP),
            transform: [{ scale: interpolate(contentOffset.value, inputRange, [0.7, 1, 0.7], Extrapolation.CLAMP) }]
        }

        return value
    })

    return (
        <Animated.View style={style} className="border-white  h-8 shadow-md my-1 border-[1px]">
            <View className={`border-${getBackgroundColour(item.item.type)}-500 border-[2px]`}>
                <MyText style=" text-center text-white text-xl">{item.item.name}</MyText>
            </View>
        </Animated.View>)
}