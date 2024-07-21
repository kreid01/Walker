import { View } from "react-native"
import { Triangle } from "./Triangle"
import React, { useEffect } from "react"
import { MyText } from "../utils/MyText"
import Animated, { withTiming } from "react-native-reanimated"
import { useGetStatAnimation } from "../../hooks/useGetStatAnimation"

export const Stats = ({ pokemon }) => {
    const { statAnimation: attackAnimation, statStyle: attackStyle, xCor: xAttack, yCor: yAttack } = useGetStatAnimation("attack")
    const { statAnimation: hpAnimation, statStyle: hpStyle, xCor: xHp, yCor: yHp } = useGetStatAnimation("hp")
    const { statAnimation: defenceAnimation, statStyle: defenceStyle, xCor: xDefence, yCor: yDefence } = useGetStatAnimation("defence")
    const { statAnimation: spDefenceAnimation, statStyle: spDefenceStyle, xCor: xSpDef, yCor: ySpDef } = useGetStatAnimation("specialDefence")
    const { statAnimation: spAttackAnimation, statStyle: spAttackStyle, xCor: xSpAtk, yCor: ySpAtk } = useGetStatAnimation("specialAttack")
    const { statAnimation: speedAnimation, statStyle: speedStyle, xCor: xSpeed, yCor: ySpeed } = useGetStatAnimation("speed")


    useEffect(() => {
        if (pokemon) {
            attackAnimation.value = 0
            const attack = pokemon.attack / 256
            attackAnimation.value = withTiming(attack, { duration: 2000 })

            defenceAnimation.value = 0
            const defence = pokemon.defence / 256
            defenceAnimation.value = withTiming(defence, { duration: 2000 })

            hpAnimation.value = 0
            const hp = pokemon.hp / 256
            hpAnimation.value = withTiming(hp, { duration: 2000 })

            spDefenceAnimation.value = 0
            const spDef = pokemon.specialDefence / 256
            spDefenceAnimation.value = withTiming(spDef, { duration: 2000 })

            spAttackAnimation.value = 0
            const spAtk = pokemon.specialAttack / 256
            spAttackAnimation.value = withTiming(spAtk, { duration: 2000 })

            speedAnimation.value = 0
            const speed = pokemon.speed / 256
            speedAnimation.value = withTiming(speed, { duration: 2000 })

        }
    }, [pokemon])


    return (
        <React.Fragment>
            <View className="h-72 mt-auto ">
                <View>
                    <MyText style="text-lg text-black absolute left-[43%] -top-3">Attack</MyText>

                    <MyText style="text-lg text-black absolute left-[10%] top-12">Hp</MyText>
                    <MyText style="text-lg text-black absolute left-[4%] top-44">Defence</MyText>

                    <MyText style="text-lg text-black absolute left-[43%] top-60">Speed</MyText>

                    <MyText style="text-lg text-black absolute right-[5%] top-12">Sp Atk</MyText>
                    <MyText style="text-lg text-black absolute right-[5%] top-44">Sp Df</MyText>
                </View>
                <Animated.View style={attackStyle} className="bg-black h-2 w-2 absolute rounded-full left-[48%] top-[42.5%]"></Animated.View>
                <Animated.View style={defenceStyle} className="bg-black h-2 w-2 rounded-full absolute left-[48%] top-[42.5%]"></Animated.View>
                <Animated.View style={hpStyle} className="bg-black h-2 w-2 rounded-full left-[48%] absolute top-[42.5%]"></Animated.View>
                <Animated.View style={spAttackStyle} className="bg-black h-2 w-2 rounded-full absolute left-[48%] top-[42.5%]"></Animated.View>
                <Animated.View style={spDefenceStyle} className="bg-black h-2 w-2 rounded-full absolute left-[48%] top-[42.5%]"></Animated.View>
                <Animated.View style={speedStyle} className="bg-black h-2 w-2 rounded-full left-[48%] absolute top-[42.5%]"></Animated.View>

                <View className="bg-black h-56 absolute w-[1px] rounded-full left-[49%] top-[5%]"></View>
                <View className="bg-black h-56 absolute rotate-[60deg] w-[1px] rounded-full top-[5%] left-[49%]"></View>
                <View className="bg-black h-56 absolute -rotate-[60deg] w-[1px] rounded-full top-[5%] left-[49%]"></View>
                <View>
                    <Triangle
                        type={pokemon?.type}
                        xCor1={xAttack * pokemon?.attack / 256}
                        yCor1={yAttack * pokemon?.attack / 256}
                        xCor2={xSpAtk * pokemon?.specialAttack / 256}
                        yCor2={ySpAtk * pokemon?.specialAttack / 256} />
                    <Triangle
                        type={pokemon?.type}
                        xCor1={xSpAtk * pokemon?.specialAttack / 256}
                        yCor1={ySpAtk * pokemon?.specialAttack / 256}
                        xCor2={xSpDef * pokemon?.specialDefence / 256}
                        yCor2={ySpDef * pokemon?.specialDefence / 256} />
                    <Triangle
                        type={pokemon?.type}
                        xCor1={xSpDef * pokemon?.specialDefence / 256}
                        yCor1={ySpDef * pokemon?.specialDefence / 256}
                        xCor2={xSpeed * pokemon?.speed / 256}
                        yCor2={ySpeed * pokemon?.speed / 256} />
                    <Triangle
                        type={pokemon?.type}
                        xCor1={xSpeed * pokemon?.speed / 256}
                        yCor1={ySpeed * pokemon?.speed / 256}
                        xCor2={xDefence * pokemon?.defence / 256}
                        yCor2={yDefence * pokemon?.defence / 256} />
                    <Triangle
                        type={pokemon?.type}
                        xCor1={xDefence * pokemon?.defence / 256}
                        yCor1={yDefence * pokemon?.defence / 256}
                        xCor2={xHp * pokemon?.hp / 256}
                        yCor2={yHp * pokemon?.hp / 256} />
                    <Triangle
                        type={pokemon?.type}
                        xCor1={xHp * pokemon?.hp / 256}
                        yCor1={yHp * pokemon?.hp / 256}
                        xCor2={xAttack * pokemon?.attack / 256}
                        yCor2={yAttack * pokemon?.attack / 256} />

                </View>

            </View>
        </React.Fragment>)

}