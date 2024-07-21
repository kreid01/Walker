import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { generateRandom } from "../utils/utils"
import { Pokemon } from "../types/types"

export const useEnemyAttackAnimation = (currentPokemon: Pokemon, enemyPokemon: Pokemon, updateText
    : (text: string) => void, health1, checkAllFainted) => {

    const enemyAttack = () => {
        const powerMoves = enemyPokemon.moves.filter(e => e.power > 1)
        const move = powerMoves[generateRandom(powerMoves.length)]

        updateText(enemyPokemon.name + " used " + move.name)

        const damage = ((((2 * 1) / 5) + 2) * move.power * enemyPokemon.attack / currentPokemon.defence) / 50 + 2 * 10
        health1.value = Math.round(health1.value - damage);
        setTimeout(enemyAttackAnimation, 1000)
        setTimeout(() => {
            if (checkAllFainted(health1.value)) {
                return
            }
            else { setTimeout(() => updateText("What will you do?"), 2000) }

        }, 3000)

    }

    const enemyPokemonAnimation = useSharedValue(0)
    const enemyPokemonAttack = useAnimatedStyle((): any => {
        return {
            transform: [
                {
                    translateX: interpolate(enemyPokemonAnimation.value, [0, 0.5, 1], [1, -130, 1])
                },
                {
                    translateY: interpolate(enemyPokemonAnimation.value, [0, 0.5, 1], [1, 110, 1])
                },
            ],
        }
    })

    const flashAnimation = useSharedValue(0)
    const flash = useAnimatedStyle(() => {
        return {
            opacity: interpolate(flashAnimation.value,
                [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
            )
        }
    })

    const enemyAttackAnimation = () => {
        flashAnimation.value = 0
        flashAnimation.value = withTiming(1, { duration: 1000 })
        enemyPokemonAnimation.value = 0
        enemyPokemonAnimation.value = withTiming(1, { duration: 500 })
        setTimeout(startEnemyHpAnimation, 300)
    }

    const widthAnimation = useSharedValue(0);
    const healthWidth = useAnimatedStyle(() => {
        return { width: interpolate(widthAnimation.value, [0, 1], [81, 0]), scaleX: -1 }
    })

    const startEnemyHpAnimation = () => {
        const value = 1 - (health1.value / currentPokemon?.hp)
        widthAnimation.value = withTiming(value, { duration: 2000 })
    }

    return { enemyAttack, enemyPokemonAttack, healthWidth, widthAnimation, flash }
}