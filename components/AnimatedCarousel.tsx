import Carousel from "react-native-reanimated-carousel"
import { Item } from "./AnimatedItem";
import { Animated, View } from "react-native";

interface AnimatedCarouselProps{
    autoPlayInterval:number;
    pokemon:any
    autoPlay:boolean
}

export const AnimatedCarousel:React.FC<AnimatedCarouselProps> = ({autoPlayInterval, pokemon, autoPlay}) => {

   const baseOptions = {
        parallaxScrollingOffset: 1000,
        parallaxScrollingScale: 1.2,
        parallaxAdjacentItemScale: 0.7,
    }

return (
    <View pointerEvents="none" className="w-32">
        <Carousel 
         height={150}
         width={200} 
         autoPlayInterval={autoPlayInterval}     
         defaultIndex={1}
         mode="parallax"
         modeConfig={baseOptions}
              style={{
            width: window.outerWidth,
            height: 120,
            justifyContent: "center",
            alignItems: "center",
          }}
        autoPlay={autoPlay}
         data={pokemon} 
        scrollAnimationDuration={150}
         renderItem={({animationValue,  item}) =>{
        return (
            <Item
                animationValue={animationValue}
                label={item}
                />
              )
         }}/>

    </View>
)
}
