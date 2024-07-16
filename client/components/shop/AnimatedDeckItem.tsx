import Animated, { Extrapolate, FadeOutDown, interpolate, LightSpeedInRight, useAnimatedStyle } from "react-native-reanimated"
import { savePokemon } from "../../utils/secureStorage"
import { DeckItem } from "./DeckItem"

interface AnimatedDeckItemProps {
  pokemon: any
  index: number
  contentOffset: Animated.SharedValue<number>
  flatList: any
  cardSelected: any
  setCardSelected: any
  navigation: any
}

export const AnimatedDeckItem: React.FC<AnimatedDeckItemProps> = ({ pokemon, index, contentOffset, flatList, setCardSelected, cardSelected, navigation }) => {
  const carouselWidth = 35
  const inputRange = [
    (index - 3) * (carouselWidth),
    (index - 2) * (carouselWidth),
    (index - 1) * (carouselWidth),
    index * carouselWidth,
    (index + 1) * carouselWidth,
    (index + 2) * carouselWidth,
    (index + 3) * carouselWidth]

  const rotationOutputRange = [20, 16, 9, 0, -9, -16, -20];
  const translateXOutputRange = [
    165 + (carouselWidth * 3),
    165 + (carouselWidth * 2),
    165 + (carouselWidth), 165,
    165 - (carouselWidth),
    165 - (carouselWidth * 2),
    165 - (carouselWidth * 3)];
  const translateYOutputRange = [13, -10, -40, -100, -30, -10, 13];

  const rStyle = useAnimatedStyle((): any => {
    const value = {
      transform: [
        {
          translateY: interpolate(contentOffset.value, inputRange, translateYOutputRange),
        },
        {
          translateX: parseInt(interpolate(contentOffset.value, inputRange, translateXOutputRange, Extrapolate.CLAMP).toFixed(0)),
        },
        {
          rotate: `${interpolate(contentOffset.value, inputRange, rotationOutputRange)}deg`
        }
      ]
    }

    return value;
  })


  return (
    <Animated.View className="rounded-lg w-[35px] h-[300px]" style={[{ aspectRatio: 1, }, rStyle]}>
      {(cardSelected == null || cardSelected == index) &&
        <Animated.View entering={LightSpeedInRight.delay(50 * index).duration(300)} exiting={FadeOutDown}>
          <DeckItem
            navigation={navigation}
            index={index}
            cardSelected={cardSelected}
            onPress={() => {
              savePokemon("pokemon", pokemon.id)
              setCardSelected(index)
            }
            }
            pokemon={pokemon}
            flatList={flatList} />
        </Animated.View>}

    </Animated.View>

  )
}