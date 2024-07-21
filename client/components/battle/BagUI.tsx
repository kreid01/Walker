import { useQuery } from "react-query"
import { getMyItems } from "../../repositories/itemRepository"
import { TouchableOpacity, View, Image } from "react-native"
import { MyText } from "../utils/MyText"
import { TeamPokemon } from "../../repositories/pokemonRepository"

interface BagUIProps {
    itemIds: number[]
    teamPokemon: TeamPokemon[]
}

export const BagUI: React.FC<BagUIProps> = ({ itemIds, teamPokemon }) => {
    const { data: items, isSuccess } = useQuery(["myItems", itemIds], getMyItems)

    return (
        isSuccess &&
        <View className="flex flex-row flex-wrap">
            {items.map((item, i) => {
                return (
                    <TouchableOpacity key={i} className="mx-3" onPress={() => console.log("pressed")}>
                        <Image className="w-12 h-12 ml-2 mx-auto" source={{ uri: item.sprites.default }} />
                        <MyText style="text-md text-white text-center">{item.name}</MyText>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}