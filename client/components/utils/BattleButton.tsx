import { Text, TouchableOpacity, View } from "react-native"
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from "react-native-reanimated"

interface BattleButtonProps {
    text: string
    setSelectedMenu: any
    colour: string
}

export const BattleButton: React.FC<BattleButtonProps> = ({ text, setSelectedMenu, colour }) => {
    const animation = text.toLowerCase() == "fight"
        || text.toLowerCase() == "bag" || text.toLowerCase() == "run" ? SlideInLeft : SlideInRight

    const animationOut = text.toLowerCase() == "fight"
        || text.toLowerCase() == "bag" || text.toLowerCase() == "run" ? SlideOutLeft : SlideOutRight

    return (
        <TouchableOpacity onPress={() => setSelectedMenu(text.toLowerCase())} className="w-[48%]">
            <Animated.View entering={animation} exiting={animationOut}
                className={`${colour} h-8  mx-[2px] my-1 border-white border-2 rounded-md`}>
                <Text style={{ fontFamily: 'vt' }} className="mx-auto -mt-1 text-2xl text-white">
                    {text}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    )
}