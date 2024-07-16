import { Text, TouchableOpacity, View } from "react-native"

interface BattleButtonProps {
    text: string
    setSelectedMenu: any
    colour: string
}

export const BattleButton: React.FC<BattleButtonProps> = ({ text, setSelectedMenu, colour }) => {
    return (
        <TouchableOpacity onPress={() => setSelectedMenu(text.toLowerCase())} className="w-[48%]">
            <View className={`${colour} h-8  mx-[2px] my-1 border-white border-2 rounded-md`}>
                <Text style={{ fontFamily: 'vt' }} className="mx-auto -mt-1 text-2xl text-white">
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}