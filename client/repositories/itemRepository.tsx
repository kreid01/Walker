import { ItemClient } from "pokenode-ts"

export const getItemQuery = async () => {
    const api = new ItemClient();
    const data = await api.listItems(0, 304)

    var items: IItem[] = await Promise.all(data.results.map(async (i) => {
        var item = await api.getItemByName(i.name)
        return { name: i.name, image: item.sprites.default, id: item.id }
    }))

    return items;
}

export const getMyItems = async ({ queryKey }: { queryKey: any }) => {
    const api = new ItemClient();
    var items = await Promise.all(queryKey[1].map(async (id) => {
        return await api.getItemById(id)
    }))

    return items
}

export type IItem = {
    id: number
    name: string;
    image: any;
}