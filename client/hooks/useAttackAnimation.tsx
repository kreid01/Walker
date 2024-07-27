import { interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated"
import { generateRandom } from "../utils/utils"
import { useEffect, useState } from "react"
import { getPokemonStats } from "../utils/pokemonStats"
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors"
import { IPokemonMove } from "../types/types"

export const useAttackAnimation = (pokemon1, pokemon2, updateText, setPokemon, health2, setCurrentPokemon) => {
    const attack = (move: IPokemonMove) => {
        updateText(pokemon1.name + " used " + move.name)
        setTimeout(() => {
            updateEnemyHp(move)
            attackAnimation()
        }, 1000)
    }

    const pokemonAnimation = useSharedValue(0)
    const pokemonAttack = useAnimatedStyle((): any => {
        return {
            transform: [
                {
                    translateX: interpolate(pokemonAnimation.value, [0, 0.5, 1], [1, 130, 1])
                },
                {
                    translateY: interpolate(pokemonAnimation.value, [0, 0.5, 1], [1, -100, 1])
                },
            ],
        }
    })

    const attackAnimation = () => {
        pokemonAnimation.value = 0
        pokemonAnimation.value = withTiming(1, { duration: 500 })
        setTimeout(startEnemyHpAnimation, 300)
    }

    const updateEnemyHp = (move: IPokemonMove) => {
        const damage = (((((2 * 1) / 5) + 2) * move.power * pokemon1.attack / pokemon2.defence) / 50 + 2) * 10
        health2.value = Math.round(health2.value - damage)
    }

    const widthAnimation = useSharedValue(0);
    const width = useAnimatedStyle(() => {
        return {
            width: interpolate(widthAnimation.value, [0, 1], [82, 0]),
        }
    })

    const enemyFlashAnimation = useSharedValue(0)
    const enemyFlash = useAnimatedStyle(() => {
        return {
            opacity: interpolate(enemyFlashAnimation.value,
                [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
            )
        }
    })

    const startEnemyHpAnimation = () => {
        const value = 1 - (health2.value / pokemon2?.hp)
        enemyFlashAnimation.value = 0
        enemyFlashAnimation.value = withTiming(1, { duration: 1000 })
        widthAnimation.value = withTiming(value, { duration: 3000 })
    }



    return { pokemonAttack, attack, width, widthAnimation, enemyFlash }
}
