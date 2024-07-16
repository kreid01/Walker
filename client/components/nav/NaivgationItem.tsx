import { Animated, TouchableOpacity, View, Text } from "react-native";

interface AnimatedNavigationProp {
  name: string;
  transform: any
  navigation: any
}

export const NavigationItem: React.FC<AnimatedNavigationProp> = ({ name, transform, navigation }) => {
  return (
    <Animated.View className="absolute top-10" style={transform}>
      <TouchableOpacity onPress={() => navigation.navigate(name)}>
        <View className="bg-white h-16 w-16 mx-auto rounded-full border-[1px] border-green-600"></View>
        <Text className="text-white text-center mt-2">{name}</Text>
      </TouchableOpacity>
    </Animated.View>)
}
