import { useRef } from "react"
import { TextInput } from "react-native"
import Animated, { runOnJS, SharedValue, useAnimatedReaction } from "react-native-reanimated"
import { Pokemon } from "../../repositories/pokemonRepository";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const AnimatedText = ({
    sharedValue,
    pokemon
}: {
    sharedValue: SharedValue<number>
    pokemon: Pokemon
}) => {

    const textRef = useRef(null)

    const updateText = (value: number) => {
        const hpValue = Math.round((1 - value) * pokemon.hp)
        const hpString = `${hpValue <= 0 ? "0" : hpValue.toString()}`

        if (!textRef.current) return
        textRef.current.setNativeProps({
            text: hpString
        })
    }

    useAnimatedReaction(() => {
        return sharedValue.value
    }, (value) => {

        if (updateText)
            runOnJS(updateText)(value)

    }, [updateText, textRef])


    return (

        <AnimatedTextInput ref={textRef}
            value={Math.round(sharedValue.value).toString()}
            editable={false}
            defaultValue={"HP:"}
            underlineColorAndroid={'transparent'}
            style={{
                color: 'white',
                fontSize: 14,
                fontFamily: "vt"
            }}
        />
    )

}