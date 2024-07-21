import { TouchableOpacity, View } from "react-native"
import { MyText } from "../utils/MyText"
import Animated, { ZoomIn } from "react-native-reanimated";

interface RunUIProps {
    navigation: any;
    setSelectedMenu: React.Dispatch<any>
}

export const RunUI: React.FC<RunUIProps> = ({ navigation, setSelectedMenu }) => {
    return (
        <Animated.View entering={ZoomIn} className="mx-10">
            <MyText style="text-xl text-white text-center">Running will reset the round. Are you sure you want to run?</MyText>
            <View className="flex flex-row justify-center mt-5">
                <TouchableOpacity onPress={() => navigation.navigate("Home")}
                    className="border-white bg-blue-500 border-[1px] rounded-md my-2 px-14 mx-2 ">
                    <MyText style="text-xl text-white mx-auto">Yes</MyText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedMenu(null)} className="border-white border-[1px] bg-red-500 rounded-md my-2 px-14 mx-2">
                    <MyText style="text-xl text-white mx-auto">No</MyText>
                </TouchableOpacity>
            </View>

        </Animated.View>
    )
}