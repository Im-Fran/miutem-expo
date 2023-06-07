import {useEffect, useRef} from "react";
import Constants from "expo-constants"
import {StyleSheet, Animated, Text} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Image} from "expo-image";
import Layout from "./layouts/Layout";

const isotipoNegativo = require('../assets/utem/utem_isotipo_negativo.png')
const utemTexto = require('../assets/utem/UTEM_Texto.png')

export default function Splash({ setReady }) {

    const opacity = useRef(new Animated.Value(1)).current
    const width = useRef(new Animated.Value(0)).current

    useEffect(() => {
        width.setValue(0)
        opacity.setValue(1)

        Animated.sequence([
            Animated.delay(1000),
            Animated.timing(width, {
                toValue: 300,
                duration: 700,
                useNativeDriver: false,
            }),
            Animated.delay(750),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            })
        ]).start(({finished}) => {
            setReady(finished)
        })
    }, [width, opacity, setReady])

    return <Layout>
        <LinearGradient colors={['#1D8E5C', '#06607a']} style={StyleSheet.absoluteFill}/>
        <Animated.View className={"flex-1 flex-row items-center justify-center w-full"} style={[{ opacity }]}>
            <Image
                source={isotipoNegativo}
                className={"w-20 h-20"}
                contentFit={'contain'}
            />
            <Animated.View
                className={"h-20 overflow-hidden"}
                style={[
                    {
                        maxWidth: 230,
                        width: width,
                    },
                ]}
            >
                <Image
                    source={utemTexto}
                    className={"w-full h-full"}
                    contentFit={'cover'}
                    contentPosition={'left'}
                />
            </Animated.View>
        </Animated.View>
        <Animated.View style={[{ opacity }]}>
            <Text className={"mb-5 text-white text-lg"}>Versión <Text className={"font-bold"}>{Constants.expoConfig.version}</Text></Text>
        </Animated.View>
    </Layout>
}