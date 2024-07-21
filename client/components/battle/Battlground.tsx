import { ImageBackground, View } from "react-native"
import { EnemyPokemon } from "../pokemon/EnemyPokemon"
import { UserPokemon } from "../pokemon/UserPokemon"
import React, { useState } from "react"
import { Pokemon } from "../../types/types"

interface BattleGroundProps {
    currentPokemon: Pokemon
    pokemonAttack: any;
    healthWidth: any;
    userWidthAnimation: any;
    flash: any;
    width: any;
    enemyPokemonAttack: any;
    enemyPokemon: any;
    fainted: boolean;
    enemyFlash: any
    userFainted: boolean
}

export const BattleGround: React.FC<BattleGroundProps> = ({ currentPokemon, pokemonAttack, healthWidth, userWidthAnimation,
    flash, width, enemyPokemon, enemyFlash, enemyPokemonAttack, fainted, userFainted
}) => {
    const [background, setBackground] = useState(require("../../sprites/backgrounds/image-5.png"))

    return (
        <React.Fragment>
            <ImageBackground className="absolute top-[20vh]" style={{ height: 270, width: "100%" }} source={background} />
            <View className="relative z-5">
                <View className=" h-[89vw]">
                    {currentPokemon && <UserPokemon
                        fainted={userFainted}
                        pokemon1={currentPokemon}
                        pokemonAttack={pokemonAttack}
                        healthWidth={healthWidth}
                        widthAnimation={userWidthAnimation}
                        flash={flash}
                    />}
                    {enemyPokemon && <EnemyPokemon width={width}
                        attack={enemyPokemonAttack}
                        pokemon2={enemyPokemon}
                        fainted={fainted}
                        flashAnimation={enemyFlash} />}
                </View>
            </View>
        </React.Fragment>
    )
}