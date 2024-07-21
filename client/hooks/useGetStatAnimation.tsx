import { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export const useGetStatAnimation = (stat: string) => {
    const lineLength = stat == "hp" || stat == "defence" ? -100 : 100
    const angleInRadians = Math.PI / (stat == "specialDefence" || stat == "hp" ? 6 : stat == "speed" ? 2 : stat == "specialAttack"
        || stat == "defence" ? -6 : stat == "attack" ? -2 : null);
    const xCor = lineLength * Math.cos(angleInRadians)
    const yCor = lineLength * Math.sin(angleInRadians)
    const statAnimation = useSharedValue(0)

    const statStyle = useAnimatedStyle((): any => {
        const x = interpolate(statAnimation.value, [0, 1], [0, xCor]); // 30 degrees in radians
        const y = interpolate(statAnimation.value, [0, 1], [0, yCor]);
        return { transform: [{ translateX: x }, { translateY: y }] }
    })

    return { statStyle, statAnimation, xCor, yCor }
}

