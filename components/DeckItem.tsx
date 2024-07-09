import { useLayoutEffect, useRef } from "react";
import { Pressable, View, Image, Animated, Text } from "react-native";
import {FadeInRight, interpolate, default as reanimated} from "react-native-reanimated";

interface ItemProp {
  pokemon: any
  onPress: () => void
  flatList: any;
  index: number
  cardSelected: number
  navigation:any 
}


import pokecard from "../assets/pokecard.png"
import { capitalizeFirstLetter } from "../utils/utils";
import { useQuery } from "react-query";

export const DeckItem: React.FC<ItemProp> = (props) => {
const {onPress, pokemon, flatList, index, cardSelected, navigation} = props;
  const cardAnimation = useRef(new Animated.Value(0));
const imageFront = useRef(new Animated.Value(0))
const imageBack = useRef(new Animated.Value(0))

const image1Opacity = {
    opacity : imageFront.current.interpolate({
        inputRange:[0, 0.7, .71, 1],
        outputRange:[0, 0, 1, 1],
    })
}

const image2Opacity = {
    opacity : imageFront.current.interpolate({
        inputRange:[0, 0.7, .71, 1],
        outputRange:[1, 1,0, 0],
    })
}

const transofrm= {
    transform: [
      {
        rotateY: cardAnimation.current.interpolate({
          inputRange: [0, 0.7, 1],
          outputRange: ["0deg", "90deg", "0deg"]
        }),
    },{
        scale: cardAnimation.current.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 2,4.6]
        }),
    },
    {
        translateY: cardAnimation.current.interpolate({
          inputRange: [0, 0.3, 1],
          outputRange: [1, -50, -60]
        }),
    }
    ],
}



const startAnimation= () => {
  scrollTo();
  setTimeout(() => {
    Animated.timing(imageBack.current, {
      toValue:  1  ,
      useNativeDriver: true,
      duration:100
    }).start(onPress);
    Animated.timing(cardAnimation.current, {
      toValue:  1,
      useNativeDriver: true,
      duration:2000
    }).start();
    
    Animated.timing(imageFront.current, {
      toValue:  1,
      useNativeDriver: true,
      duration:2000
    }).start();
  }, 300)
}

const scrollTo = () => {
        flatList.current?.scrollToIndex({ index: index, animated: true , duration:50});
}


  return (
    <>
    {cardSelected &&
     <reanimated.View entering={FadeInRight.delay(900).duration(500)} className="h-20 flex flex-row w-[60vw] absolute justify-between z-20  -top-[422px]">
      <Text className="text-center text-3xl">{capitalizeFirstLetter(pokemon.name)}</Text>
      </reanimated.View>}
    <Pressable onPress={() => startAnimation()}>
      <Animated.View style={transofrm as any} className='mx-auto relative w-20 top-[100px] h-28 bg-white  border-gray-500 border-[1px]  px-2 rounded-lg '>
    <Animated.Image style={image2Opacity} source={pokecard} className="h-28 w-20 absolute"/>
    <Animated.View className="absolute top-[130px] h-[20px] flex flex-row" style={image1Opacity as any}>
     </Animated.View>
    <Animated.Image  source={{uri: pokemon.front}} style={image1Opacity} className="h-28 w-[76px] absolute"/>
      </Animated.View>
    </Pressable>
    {cardSelected && 
    <View>
      <reanimated.Text entering={FadeInRight.delay(900)} className="w-[100vw] -ml-24 mt-10 h-20">{pokemon.dexEntry}</reanimated.Text>
    <View className="flex flex-row justify-between h-40 -ml-32 mt-2">
      <reanimated.View className="w-24 mx-2" entering={FadeInRight.delay(900)}>
        <Text className="text-center my-1">Region</Text>
        <Image className="h-24 w-24" source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/2048px-Pok%C3%A9mon_Water_Type_Icon.svg.png"}}/>
        <Text className="text-center">Sinnoh</Text>
      </reanimated.View>
      <reanimated.View className="w-24 mx-2" entering={FadeInRight.delay(1100)}>
        <Text className="text-center my-1">Type</Text>
        <Image className="h-24 w-24" source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/2048px-Pok%C3%A9mon_Water_Type_Icon.svg.png"}}/>
        <Text className="text-center">{capitalizeFirstLetter(pokemon.type)}</Text>
      </reanimated.View>
      <reanimated.View className="w-24 mx-2" entering={FadeInRight.delay(1300)}>
        <Text className="text-center my-1">Rarity</Text>
        <View className="h-24 w-24 rounded-full bg-black"/>
        <Text className="text-center">Common</Text>
      </reanimated.View>
    </View>
    </View>}
    </>
  );
};

