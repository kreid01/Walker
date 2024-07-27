import { View } from "react-native";
import { MyText } from "../utils/MyText";
import Animated from "react-native-reanimated";

interface BattleHeaderProps {
    coins: number;
    round: number;
    xpBarAnimation: any
    level: number
}


export const BattleHeader: React.FC<BattleHeaderProps> = ({ coins, round, xpBarAnimation, level }) => {
    return (
        <View className="  bg-slate-500  pt-5 border-2 h-[20vh] border-yellow-500">
            <View className="flex flex-row">
                <MyText style="text-xl mt-5 text-white mx-auto">Coins: {coins}</MyText>
                <MyText style="text-xl mt-5 text-white mx-auto">Level: {level}</MyText>
                <MyText style="text-xl my-5 text-white mx-auto">Round: {round}</MyText>
            </View>
            <View className="h-5 mx-auto  bg-white w-[80%] rounded-lg shadow-lg">
                <Animated.View style={xpBarAnimation} className="h-4 my-auto  bg-yellow-500 w-[99%] rounded-lg">
                </Animated.View>
            </View>
        </View>
    )
}