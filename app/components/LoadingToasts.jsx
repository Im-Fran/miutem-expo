import React, { useEffect, useState, useRef } from 'react';
import { DeviceEventEmitter, View } from 'react-native';
import { Animated } from "react-native";
import Constants from "expo-constants";

export default function LoadingToastProvider({ children }) {
    const [isLoading, setLoading] = useState(false);
    const bigCircleAnimation = useRef(new Animated.Value(24)).current;
    const smallCircleAnimation = useRef(new Animated.Value(64)).current;

    useEffect(() => {
        const listener = DeviceEventEmitter.addListener('loading-toast', setLoading);

        return () => listener.remove();
    }, []);

    useEffect(() => {

        const animateCircles = (iteration = 1) => {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(bigCircleAnimation, {
                        toValue: 24,
                        duration: 350,
                        useNativeDriver: false,
                    }),
                    Animated.timing(smallCircleAnimation, {
                        toValue: 54,
                        duration: 350,
                        useNativeDriver: false,
                    }),
                ]),

                Animated.parallel([
                    Animated.timing(bigCircleAnimation, {
                        toValue: 54,
                        duration: 350,
                        useNativeDriver: false,
                    }),
                    Animated.timing(smallCircleAnimation, {
                        toValue: iteration%5 === 0 ? 12 : 24,
                        duration: iteration%5 === 0 ? 500 : 350,
                        useNativeDriver: false,
                    }),
                ]),
            ]).start(() => animateCircles(iteration + 1))
        };

        animateCircles();
    }, []);

    return (
        <>
            {children}
            {isLoading && <View className={"flex-1 absolute w-full h-full justify-center items-center"}>
                <Animated.View
                    className={"flex justify-center items-center bg-primary/20 rounded-full"}
                    style={[
                        {width: bigCircleAnimation, height: bigCircleAnimation}
                    ]}
                >
                    <Animated.View
                        className={"flex justify-center items-center bg-primary rounded-full"}
                        style={[
                            {width: smallCircleAnimation, height: smallCircleAnimation}
                        ]}
                    />
                </Animated.View>
            </View>}
        </>
    );
}

export const useLoadingToast = () => (loading, debug = null) => {
    if(debug && Constants.expoConfig.extra.env !== 'production') {
        console.debug(debug)
    }
    DeviceEventEmitter.emit('loading-toast', loading);
};
