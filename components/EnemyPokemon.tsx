import { useEffect, useState } from "react"
import { TouchableOpacity, View, Text, Image, Animated} from "react-native"

interface EnemyPokemonProps {
    attack: any
pokemon2: any
health2: number
}

export const EnemyPokemon:React.FC<EnemyPokemonProps> = ({attack, pokemon2, health2}) => {
  const [healthBar2, setHealthBar2] = useState(128)
  useEffect(() => {
setHealthBar2((((health2/ pokemon2?.hp)) * 128) ? (((health2 / pokemon2?.hp)) * 128) : 1)
  }, [health2])


    return (
            <View className="relative">
              <View className="h-4 z-1 w-32 bg-red-500 absolute top-10 left-8 border-white border-[1px] rounded-md" />
              <View style={{ width: healthBar2}} className="h-4 z-1 w-32 bg-green-500 absolute top-10 left-8 rounded-md" />
              <Text className="absolute top-10 left-10 text-white ">HP: {health2}</Text>
              <TouchableOpacity onPress={() => attack()}>
                <Image className="mt-14" source={{ uri:  pokemon2.front }} height={200} width={200} />
              </TouchableOpacity>
            </View>
    )
}