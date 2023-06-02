import {StatusBar} from "expo-status-bar";
import {StyleSheet, Animated, View} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Image} from "expo-image";
import {useEffect, useRef, useState} from "react";
import AnimatedView from "react-native-web/src/vendor/react-native/Animated/components/AnimatedView";

const isotipoNegativo = require('../assets/utem/utem_isotipo_negativo.png')
const utemTexto = require('../assets/utem/UTEM_Texto.png')
export default function Splash({ setReady }) {

    const width = useRef(new Animated.Value(0)).current

    useEffect(() => {
        width.setValue(0)

        Animated.sequence([
            Animated.delay(1000),
            Animated.timing(width, {
                toValue: 300,
                duration: 700,
                useNativeDriver: false,
            })
        ]).start()
    }, [width])

    return <View style={styles.container}>
        <LinearGradient colors={['#1D8E5C', '#06607a']} style={styles.background}/>
        <View style={styles.logoContainer}>
            <Image
                source={isotipoNegativo}
                style={styles.isotipo}
                contentFit={'contain'}
            />
            <Animated.Image
                source={utemTexto}
                style={[
                    {
                        height: 75,
                        maxWidth: 230,
                        marginLeft: 5,
                        width,
                    },
                ]}
                resizeMode={'cover'}
            />
        </View>
        <StatusBar style={"dark"}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    isotipo: {
        width: 65,
        height: 65,
    },

})