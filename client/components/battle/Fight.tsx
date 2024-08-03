import { useEffect, useState } from "react";
import { generateRandom } from "../../utils/utils";
import { useQuery } from "react-query";
import { getLevel, getXp, levelUser, postXp } from "../../utils/secureStorage";
import { useGetPokemon } from "../../hooks/useGetPokemon";
import { useGetTeam } from "../../hooks/useGetTeam";
import { useAttackAnimation } from "../../hooks/useAttackAnimation";
import { useEnemyAttackAnimation } from "../../hooks/useEnemyAttackAnimation";
import Animated, { Extrapolation, FadeOut, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { IPokemonMove } from "../../types/types";
import { growthRate } from "../../constants/growthRate";
import { TouchableOpacity, View } from "react-native";
import gif from "../../assets/intro.gif"
import { BattleHeader } from "./BattleHeader";
import { BattleGround } from "./Battlground";
import { BattleUI } from "./BattleUI";
import masterball from "../../assets/masterball.png"
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

interface FightProps {
    navigation: any;
    fusion: boolean;
    starterPokemonId: string
}

export const Fight: React.FC<FightProps> = ({ navigation, starterPokemonId, fusion }) => {
    const [pokemon, setPokemon] = useState<number>(generateRandom(500, 0))
    const { data: level, refetch } = useQuery('level', getLevel)

    const [text, setText] = useState("")
    const [round, setRound] = useState(0)
    const [coins, setCoins] = useState(50)

    const [resettingText, setResettingText] = useState(false)
    const [lockUI, setLockUI] = useState(false)
    const [lost, setLost] = useState(false)
    const [fainted, setFainted] = useState(false)
    const [userFainted, setUserFainted] = useState(false)
    const [teamIds, setTeamIds] = useState([parseInt(starterPokemonId)])

    const [currentPokemonHealth, setCurrentPokemonHealth] = useState<number>()

    const { currentPokemon: currentPokemon, health: userHealth, setCurrentPokemon, changePokemon,
        team, setTeam
    } = useGetTeam(teamIds, currentPokemonHealth)
    const { currentPokemon: enemyPokemon, health: enemyHealth } = useGetPokemon(pokemon, round, fusion)

    const [showIntro, setShowIntro] = useState(true)
    useEffect(() => {
        setShowIntro(true)
        setTimeout(() => setShowIntro(false), 2500)
    }, [])

    const updateText = (text: string) => {
        setResettingText(true)
        setTimeout(() => {
            setText(text)
            setResettingText(false)
        }, 100)
    }

    const checkAllFainted = (currentPokemonHp: number) => {
        const teamFainted = team.filter(e => e && e.id != currentPokemon.id).every(e => e.currentHp <= 0)
        const currentPokemonFainted = currentPokemonHp <= 0
        if (teamFainted && currentPokemonFainted) {
            return true
        }
    }

    const { attack,
        pokemonAttack,
        width,
        widthAnimation,
        enemyFlash } = useAttackAnimation(currentPokemon,
            enemyPokemon,
            updateText,
            setPokemon,
            enemyHealth,
            setCurrentPokemon
        )
    const { enemyPokemonAttack,
        enemyAttack,
        healthWidth,
        widthAnimation: userWidthAnimation,
        flash
    } = useEnemyAttackAnimation(currentPokemon,
        enemyPokemon,
        updateText,
        userHealth,
        checkAllFainted)

    useEffect(() => {
        setUserFainted(true)
        if (currentPokemon && !showIntro) {
            console.log(currentPokemon.name)
            updateText("You sent out " + currentPokemon.name)
            startAnimation()
            setTimeout(() => {
                userWidthAnimation.value = withTiming(1 - (currentPokemon.currentHp / currentPokemon.hp), { duration: 50 })
            }, 1000)
        }
    }, [currentPokemon?.name, showIntro])

    useEffect(() => {
        setCurrentPokemonHealth(userHealth.value)
    }, [userHealth.value])


    useEffect(() => {
        if (enemyPokemon) {
            setLockUI(true)
            updateText(enemyPokemon?.name + " appeared")
            widthAnimation.value = withTiming(0, { duration: 50 })
            setTimeout(() => updateText("What will you do?"), 4000)
            setTimeout(() => setLockUI(false), 5000)
        }
    }, [enemyPokemon?.name])

    const startAttack = (move: IPokemonMove) => {
        setLockUI(true)
        if (currentPokemon.speed > enemyPokemon.speed) {
            userAttackFirst(move)
        }
        else {
            enemyAttackFirst(move);
        }

        setTimeout(() => {
            if (!checkAllFainted(userHealth.value)) setLockUI(false)
        }, 7000)
    }

    const userAttackFirst = (move: IPokemonMove) => {
        attack(move)
        setTimeout(() => {
            if (enemyHealth.value <= 0) {
                enemyPokemonFainted()
            } else {
                startEnemyAttack()
            }
        }, 3000)
    }

    const enemyAttackFirst = (move: IPokemonMove) => {
        startEnemyAttack();
        setTimeout(() => {
            if (userHealth.value > 0) {
                attack(move)
                setTimeout(() => {
                    if (enemyHealth.value <= 0) {
                        enemyPokemonFainted()
                    }
                }, 3000)
            }
        }, 3000)
    }

    const enemyPokemonFainted = () => {
        updateText(enemyPokemon.name + " fainted")
        setCoins(prevState => prevState + generateRandom(10))
        setRound(prevState => prevState + 1)
        levelUp()
        setTimeout(() => setFainted(true), 1000)
        setTimeout(() => {
            setPokemon(generateRandom(500, 0))
            setTimeout(() => setFainted(false), 3000)
        }, 1000)
    }

    const startEnemyAttack = (pokemonId: number = null) => {
        enemyAttack();
        setTimeout(() => {
            if (userHealth.value <= 0 && team.length > 1 && !checkAllFainted(userHealth.value)) {
                nextPokemon(pokemonId)
            } else if (checkAllFainted(userHealth.value)) {
                gameOver()
            }
        }, 3000)
    }


    const nextPokemon = (pokemonId: number = null) => {
        const pokemon = pokemonId == null ? currentPokemon.name : team.filter(e => e.id == pokemonId)[0].name
        updateText(pokemon + " fainted")
        const id = (team.filter(e => e && e.id != currentPokemon.id && e.id != pokemonId && e.currentHp > 0)[0])
        setTimeout(() => changePokemon(id?.id), 2000)
        setTimeout(() => setUserFainted(true), 2000)
        setTimeout(() => setLockUI(false), 4000)
    }

    const gameOver = () => {
        updateText(currentPokemon.name + " fainted")
        setUserFainted(true)
        setLost(true)
        setLockUI(true)
        setTimeout(() => updateText(`All your pokemon have fainted, you made it to round ${round}`), 2000)
        setTimeout(() => navigation.navigate("Home"), 4000)
    }


    const { data: xp } = useQuery('xp', getXp)
    useEffect(() => {
        xpBar.value = xp != 0 ? xp : 0
    }, [xp])

    const levelUp = () => {
        const value = (xpBar.value + (10 * (enemyPokemon.level / 10)))
        xpBar.value = withTiming(value, { duration: 500 })

        if (value >= growthRate.filter(e => e.level == level)[0].xpRequired) {
            const xpRequired = (growthRate.filter(e => e.level == level)[0].xpRequired)
            const newValue = value - xpRequired
            levelUser()
            setTimeout(() => {
                xpBar.value = withTiming(newValue)
                refetch()
                postXp(newValue)
            }, 1000)
        } else {
            postXp(value)
        }
    }

    const xpBar = useSharedValue(0);
    const xpBarAnimation = useAnimatedStyle((): any => {
        const growth = growthRate.filter(e => e.level == level)[0]?.xpRequired
        return { width: interpolate(xpBar.value, [0, growth ? growth : 100], [0, 295], Extrapolation.CLAMP) }
    })

    const changePokemonTurn = (id: number) => {
        setUserFainted(true)
        setLockUI(true)
        changePokemon(id)
        startAnimation()
        setTimeout(() => {
            startEnemyAttack(id);
        }, 3000)
        setTimeout(() => {
            if (!checkAllFainted(userHealth.value)) setLockUI(false)
        }, 7000)
    }


    const ballThrowAnimation = useSharedValue(0);
    const ballThrowStyle = useAnimatedStyle((): any => {

        const value = {
            transform: [{
                translateX: interpolate(ballThrowAnimation.value, [0, .25, .5, .7, 1], [-50, 60, 70, 75, 80]),
            },
            {
                translateY: interpolate(ballThrowAnimation.value, [0, .25, .5, .7, 1], [10, -40, 0, 30, 60])
            },
            {
                rotate: `${interpolate(ballThrowAnimation.value, [0, .25, .5, .7, 1], [0, 360, 720, 1080, 1440])}deg`
            },
            ],
            opacity: interpolate(ballThrowAnimation.value, [0, 0.9, 1], [1, 1, 0]),
        }

        return value;
    })

    const startAnimation = () => {
        ballThrowAnimation.value = 0
        ballThrowAnimation.value = withTiming(1, { duration: 1500 })
        setTimeout(() => setUserFainted(false), 1000)
    }

    const pokemonOutStyle = useAnimatedStyle((): any => {
        return {
            opacity: interpolate(ballThrowAnimation.value, [0, 0.7, 0.8, 0.9, 1], [1, 1, 1, 0, 1]),
        }
    })


    return (
        <>
            <View className="absolute bottom-[465px] z-50 left-0 ">
                <Animated.Image style={ballThrowStyle} source={masterball} className="h-8 w-8" />
            </View>
            <View className="h-[100vh] relative">
                {showIntro && <Animated.Image exiting={FadeOut} source={gif} className="h-[270px] top-[170px] w-[100vw] l z-20 absolute" />}
                <BattleHeader level={level} coins={coins} round={round} xpBarAnimation={xpBarAnimation} />
                <BattleGround
                    pokemonOutStyle={pokemonOutStyle}
                    userFainted={userFainted}
                    currentPokemon={currentPokemon}
                    pokemonAttack={pokemonAttack}
                    healthWidth={healthWidth}
                    widthAnimation={widthAnimation}
                    userWidthAnimation={userWidthAnimation}
                    fainted={fainted}
                    flash={flash}
                    enemyFlash={enemyFlash}
                    enemyPokemon={enemyPokemon}
                    enemyPokemonAttack={enemyPokemonAttack}
                    width={width}
                />
                {currentPokemon && <BattleUI
                    setCoins={setCoins}
                    health={userHealth}
                    navigation={navigation}
                    team={team}
                    changePokemon={changePokemonTurn}
                    setTeam={setTeam}
                    setTeamIds={setTeamIds}
                    lockUI={lockUI}
                    pokemon={currentPokemon}
                    setCurrentPokemon={setCurrentPokemon}
                    attack={startAttack}
                    text={text}
                    coins={coins}
                    updateText={updateText}
                    resettingText={resettingText} />}
            </View >
        </>
    )

}