import { TouchableOpacity, View, Image } from "react-native";
import Animated, { RollInLeft } from "react-native-reanimated";
import { MyText } from "../utils/MyText";
import { generateRandom } from "../../utils/utils";
import { IItem } from "../../repositories/itemRepository";
import { SetStateAction, useState } from "react";
import React from "react";

interface ItemShopProps {
    items: IItem[]
    setMyItemsIds: React.Dispatch<React.SetStateAction<number[]>>
    setCoins: React.Dispatch<SetStateAction<number>>
    coins: number
}

export const ItemShop: React.FC<ItemShopProps> = ({ items, setMyItemsIds, coins, setCoins }) => {
    const [buy, setBuy] = useState(false)
    const [rolledItems, setRolledItems] = useState([
        items[generateRandom(items.length)],
        items[generateRandom(items.length)],
        items[generateRandom(items.length)],
        items[generateRandom(items.length)],
        items[generateRandom(items.length)],
        items[generateRandom(items.length)],
        items[generateRandom(items.length)],
        items[generateRandom(items.length)],
    ]);

    const rollItems = () => {
        setBuy(false)
        setRolledItems(
            [items[generateRandom(items.length)],
            items[generateRandom(items.length)],
            items[generateRandom(items.length)],
            items[generateRandom(items.length)],
            items[generateRandom(items.length)],
            items[generateRandom(items.length)],
            items[generateRandom(items.length)],
            items[generateRandom(items.length)]]
        ),


            setTimeout(() => setBuy(true), 500)
    }

    return (
        <View className="h-[85%] w-[100%]">
            {buy &&
                <View className="flex mt-1 flex-row flex-wrap">
                    {rolledItems.map((item, i) =>
                        <RolledItem
                            coins={coins} setCoins={setCoins}
                            key={i} item={item} i={i} setMyItemIds={setMyItemsIds} />)}
                </View>}
            <TouchableOpacity onPress={() => rollItems()}
                className=" rounded-sm  bg-transparent border-white 
                relartive w-32 bg-green-500 border-[1px] ml-auto mx-auto -mb-1 mt-auto">
                <MyText style="text-xl mx-auto  text-white">Roll</MyText>
            </TouchableOpacity>
        </View>
    )
}

interface RolledItemProps {
    item: IItem;
    i: number;
    setMyItemIds: React.Dispatch<React.SetStateAction<number[]>>
    setCoins: React.Dispatch<SetStateAction<number>>
    coins: number
}

export const RolledItem: React.FC<RolledItemProps> = ({ item, i, setMyItemIds, coins, setCoins }) => {
    return (
        <Animated.View entering={RollInLeft.duration(200).delay(50 * i)} className=" w-20 mx-[5px]">
            <TouchableOpacity onPress={() => {
                if (coins >= 10) {
                    setCoins(prevState => prevState - 10)
                    setMyItemIds(prevState => [...prevState, item.id])
                }
            }}>
                <Image className="w-12 h-10 ml-2 mx-auto" source={{ uri: item.image }} />
                <MyText style="text-md text-white text-center">{item.name} 10$</MyText>
            </TouchableOpacity>
        </Animated.View>
    )

}