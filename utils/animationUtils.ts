export const getTransformAnimation = (x1: number, x2: number, y1: number, y2: number, animation: any) => {
    return {
      transform: [
        {
          scale: animation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        },
        {
          translateX: animation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [x1, x2]
          })
        },
        {
          translateY: animation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [y1, y2]
          })
        },
      ]
    }
  }
