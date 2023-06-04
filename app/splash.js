import {useEffect, useRef} from "react";
import Constants from "expo-constants"
import {StatusBar} from "expo-status-bar";
import {StyleSheet, Animated, View, Text} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Image} from "expo-image";

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

    return <View style={styles.container}>
        <LinearGradient colors={['#1D8E5C', '#06607a']} style={styles.background}/>
        <Animated.View style={[
            {
                ...styles.logoContainer,
                opacity,
            }
        ]}>
            <Image
                source={isotipoNegativo}
                style={styles.isotipo}
                contentFit={'contain'}
            />
            <Animated.View
                style={[
                    {
                        height: 75,
                        overflow: 'hidden',
                        maxWidth: 230,
                        width: width,
                    },
                ]}
            >
                <Image
                    source={utemTexto}
                    style={{
                        height: 75,
                        width: '100%',
                    }}
                    contentFit={'cover'}
                    contentPosition={'left'}
                />
            </Animated.View>
        </Animated.View>
        <Animated.View style={[
            {
                opacity,
            }
        ]}>
            <Text style={styles.version}>Versión <Text style={{ fontWeight: 'bold' }}>{Constants.expoConfig.version}</Text></Text>
        </Animated.View>
        <StatusBar hidden/>
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

    version: {
        marginBottom: 20,
        color: 'white',
        fontSize: 16,
    },
})