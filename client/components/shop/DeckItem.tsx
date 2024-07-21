import { useLayoutEffect, useRef } from "react";
import { Pressable, View, Image, Animated } from "react-native";
import { FadeInRight, interpolate, default as reanimated } from "react-native-reanimated";
import { capitalizeFirstLetter } from "../../utils/utils";
import { MyText } from "../utils/MyText";

interface ItemProp {
  pokemon: any
  onPress?: () => void
  flatList?: any;
  index: number
  cardSelected: number
  navigation: any
}




export const DeckItem: React.FC<ItemProp> = (props) => {
  const { onPress, pokemon, flatList, index, cardSelected, navigation } = props;
  const cardAnimation = useRef(new Animated.Value(0));
  const imageFront = useRef(new Animated.Value(0))
  const imageBack = useRef(new Animated.Value(0))

  const image1Opacity = {
    opacity: imageFront.current.interpolate({
      inputRange: [0, 0.7, .71, 1],
      outputRange: [0, 0, 1, 1],
    })
  }

  const image2Opacity = {
    opacity: imageFront.current.interpolate({
      inputRange: [0, 0.7, .71, 1],
      outputRange: [1, 1, 0, 0],
    })
  }

  const transofrm = {
    transform: [
      {
        rotateY: cardAnimation.current.interpolate({
          inputRange: [0, 0.7, 1],
          outputRange: ["0deg", "90deg", "0deg"]
        }),
      }, {
        scale: cardAnimation.current.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 2, 4.6]
        }),
      },
      {
        translateY: cardAnimation.current.interpolate({
          inputRange: [0, 0.3, 1],
          outputRange: [1, -20, -33]
        }),
      }
    ],
  }

  const startAnimation = () => {
    scrollTo();
    setTimeout(() => {
      Animated.timing(imageBack.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 100
      }).start(onPress);
      Animated.timing(cardAnimation.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 2000
      }).start();

      Animated.timing(imageFront.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 2000
      }).start();
    }, 300)
  }

  const scrollTo = () => {
    flatList.current?.scrollToIndex({ index: index, animated: true, duration: 50 });
  }

  const uri = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon?.name.toLowerCase()}.gif`

  return (
    <>
      <Pressable onPress={() => startAnimation()}>
        <Animated.View style={transofrm as any}
          className='mx-auto relative w-20 h-28 border-gray-500 drop-shadow-xl border-[1px] rounded-lg'>
          <Animated.Image style={[{ objectFit: "contain" }, image2Opacity]} source={{
            uri:
              "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_759,h_1053/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA"
          }} className={"h-28 w-20"} />
          <Animated.View className="absolute h-[20px] flex flex-row" style={image1Opacity as any}>
            <MyText style="text-center text-black -mt-1 z-20  w-12 text-sm">{capitalizeFirstLetter(pokemon.name)}</MyText>
            <Animated.Image source={{ uri: uri }} style={[{ objectFit: "contain" }, image1Opacity]} className="h-8 relative w-8" />
          </Animated.View>
        </Animated.View>
      </Pressable>
      {cardSelected &&
        <View>
          <View className="flex flex-row justify-between h-40 mt-12 -ml-32">
            <reanimated.View className="w-20 mx-4" entering={FadeInRight.delay(900)}>
              <MyText style="text-center my-1">Region</MyText>
              <Image className="h-20 w-20" source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/2048px-Pok%C3%A9mon_Water_Type_Icon.svg.png" }} />
              <MyText style="text-center">Sinnoh</MyText>
            </reanimated.View>
            <reanimated.View className="w-20 mx-4" entering={FadeInRight.delay(1100)}>
              <MyText style="text-center my-1">Type</MyText>
              <Image className="h-20 w-20" source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/2048px-Pok%C3%A9mon_Water_Type_Icon.svg.png" }} />
              <MyText style="text-center">{capitalizeFirstLetter(pokemon.type)}</MyText>
            </reanimated.View>
            <reanimated.View className="w-20 mx-4" entering={FadeInRight.delay(1300)}>
              <MyText style="text-center my-1">Rarity</MyText>
              <View className="h-20 w-20 rounded-full bg-black" />
              <MyText style="text-center">Common</MyText>
            </reanimated.View>
          </View>
        </View>}
    </>
  );
};

