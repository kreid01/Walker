import { ItemClient } from "pokenode-ts";
import { Animated, TouchableOpacity, View, Text, Image } from "react-native";

interface AnimatedNavigationProp {
  name: string;
  transform: any
  navigation: any
}



export const NavigationItem: React.FC<AnimatedNavigationProp> = ({ name, transform, navigation }) => {
  const ball = name == "Customise" ? "duskball"
    : name == "Pokemon" ? "pokeball"
      : name == "Shop" ? "ultraball" : name == "Pokedex" ? "greatball" : "beastball"
  const uri = `https://www.serebii.net/itemdex/sprites/sv/${ball}.png`

  return (
    <Animated.View className="absolute top-10" style={transform}>
      <TouchableOpacity onPress={() => navigation.navigate(name)}>
        <Image source={{ uri: uri }} className=" h-16 w-16 mx-auto rounded-full border-[1px] border-white"></Image>
        <Text className="text-white text-center mt-2">{name}</Text>
      </TouchableOpacity>
    </Animated.View>)
}
