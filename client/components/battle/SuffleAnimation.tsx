import { useFocusEffect } from "@react-navigation/native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Animated, { FadeOut, useSharedValue } from "react-native-reanimated"
import { ShuffleItem } from "./ShuffleItem"

interface ShuffleAnimationProps {
    data: any[]
    method: (item: any) => void
}

export const ShuffleAnimation: React.FC<ShuffleAnimationProps> = ({ data, method }) => {
    const [rendered, setRendered] = useState(false)
    const contentOffset = useSharedValue(0)
    const flatList = useRef(null)
    useEffect(() => {
        if (rendered && data) random();
    }, [rendered, data])

    useCallback(() => {
        useFocusEffect(() => {
            if (rendered) random()
        })
    }, [])

    const random = () => {
        flatList.current.scrollToOffset({ offset: 3000, animated: true })
        setTimeout(() => flatList.current.scrollToOffset({ offset: 3000, animated: true }), 200)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4000, animated: true }), 400)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4500, animated: true }), 600)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4600, animated: true }), 800)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4700, animated: true }), 1000)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4750, animated: true }), 1200)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4800, animated: true }), 1400)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4850, animated: true }), 1600)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4890, animated: true }), 1800)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4920, animated: true }), 2000)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4940, animated: true }), 2200)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4960, animated: true }), 2400)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 4980, animated: true }), 2600)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 5020, animated: true }), 2800)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 5040, animated: true }), 3000)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 5060, animated: true }), 3200)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 5070, animated: true }), 3400)
        setTimeout(() => flatList.current.scrollToOffset({ offset: 5080, animated: true }), 3600)

        const newItem = data[127]
        setTimeout(() => method(newItem), 5000)
    }

    return (
        <Animated.View className="h-[90%]" exiting={FadeOut}>
            <Animated.FlatList
                ref={flatList}
                onLayout={() => setRendered(true)}
                style={{ paddingTop: 80 }}
                pagingEnabled
                snapToInterval={32}
                onScroll={(e) => {
                    contentOffset.value = e.nativeEvent.contentOffset.y
                }}
                scrollEventThrottle={16}
                keyExtractor={(_, i) => i.toString()}
                className="mx-auto" data={data} renderItem={(item) => {
                    return <ShuffleItem item={item} contentOffset={contentOffset} />
                }} />
        </Animated.View>)
}