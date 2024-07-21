import React, { useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { getBackgroundColour } from '../battle/FightUI';

interface TirangleProps {
    xCor1: number;
    xCor2: number;
    yCor1: number;
    yCor2: number
    type: string
}

export const Triangle: React.FC<TirangleProps> = ({ xCor1, xCor2, yCor1, yCor2, type }) => {

    const startPointX = 167
    const startPointY = 127

    const centerX = useSharedValue(startPointX);
    const centerY = useSharedValue(startPointY);
    const corner1X = useSharedValue(startPointX) // Left corner
    const corner1Y = useSharedValue(startPointY)
    const corner2X = useSharedValue(startPointX)
    const corner2Y = useSharedValue(startPointY)

    const animatedStyle = useAnimatedStyle((): any => {
        return {
            points: `${corner1X.value},${corner1Y.value} ${centerX.value},${centerY.value} ${corner2X.value},${corner2Y.value}`,
        };
    });

    useEffect(() => {
        centerX.value = startPointX
        centerY.value = startPointY
        corner1X.value = startPointX
        corner1Y.value = startPointY
        corner2X.value = startPointX
        corner2Y.value = startPointY

        centerX.value = withTiming(startPointX);
        centerY.value = withTiming(startPointY);
        corner1X.value = withTiming(startPointX + xCor1, { duration: 2000 }); // Left corner
        corner1Y.value = withTiming(startPointY + yCor1, { duration: 2000 });
        corner2X.value = withTiming(startPointX + xCor2, { duration: 2000 }); // Right corner
        corner2Y.value = withTiming(startPointY + yCor2, { duration: 2000 });


    }, [xCor1, xCor2, yCor1, yCor2])


    return (
        <View style={styles.container} className="absolute opacity-60">
            <Svg height="500" width="300">
                <AnimatedPolygon
                    points={`${corner1X.value},${corner1Y.value} ${centerX.value},${centerY.value} ${corner2X.value},${corner2Y.value}`}
                    fill={getBackgroundColour(type)}
                    animatedProps={animatedStyle}
                />
            </Svg>
        </View>
    );
};

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
