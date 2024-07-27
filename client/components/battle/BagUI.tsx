import { useQuery } from "react-query"
import { getMyItems } from "../../repositories/itemRepository"
import { TouchableOpacity, View, Image, FlatList } from "react-native"
import { MyText } from "../utils/MyText"
import { TeamPokemon } from "../../repositories/pokemonRepository"
import { Pokemon } from "../../types/types"
import { useEffect, useState } from "react"
import { capitalizeFirstLetter } from "../../utils/utils"

interface BagUIProps {
    itemIds: number[]
    teamPokemon: Pokemon[]
}

export const BagUI: React.FC<BagUIProps> = ({ itemIds, teamPokemon }) => {
    const { data: items, isSuccess } = useQuery(["myItems", itemIds], getMyItems)

    return (
        isSuccess &&
        <FlatList className="" data={items} numColumns={4}
            renderItem={((item) => {
                return (
                    <TouchableOpacity key={item.index} className="mx-3" onPress={() => console.log("pressed")}>
                        <MyText style="text-md text-white absolute">x{item.item.count}</MyText>
                        <Image className="w-12 h-12 ml-2 mx-auto" source={{ uri: item.item.sprites.default }} />
                        <MyText style="text-md text-white text-center">{capitalizeFirstLetter(item.item.name)}</MyText>
                    </TouchableOpacity>
                )
            })} />
    )
}