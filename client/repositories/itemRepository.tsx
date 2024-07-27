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

    const countedItems: any[] = []
    items.map(e => {
        if (countedItems && countedItems.some(i => i.name == e.name)) {
            const item = countedItems.filter(i => i.name == e.name)[0]
            item.count = item.count += 1
        } else {
            e.count = 1;
            countedItems.push(e)
        }
    })

    return countedItems
}

export type IItem = {
    id: number
    name: string;
    image: any;
}