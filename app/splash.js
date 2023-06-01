import {StatusBar} from "expo-status-bar";
import {Image} from "expo-image";
import {Animated, PanResponder, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {useEffect, useRef} from "react";

const utemIconoNegativo = require('../assets/utem/utem_isotipo_negativo.png')
const utemLogoNegativo = require("../assets/utem/utem_logo_negativo.png");

export default function Splash() {

    const fadeAnimIcon = useRef(new Animated.Value(0)).current;
    const translateXIcon = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        translateXIcon.setValue(0);
        fadeAnimIcon.setValue(0);

        const fadeInIcon = Animated.timing(fadeAnimIcon, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        });

        const slideLeftIcon = Animated.timing(translateXIcon, {
            toValue: -100,
            duration: 850,
            useNativeDriver: true,
        });

        const slideRightLogo = Animated.timing(translateXIcon, {
            toValue: 250, // Width of the image
            duration: 850,
            useNativeDriver: true,
        });

        const fadeOutIcon = Animated.timing(fadeAnimIcon, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        });

        Animated.sequence([fadeInIcon, slideLeftIcon, slideRightLogo, fadeOutIcon]).start();
    }, []);

    return <View style={styles.container}>
        <LinearGradient colors={['#1D8E5C', '#06607a']} style={styles.background}/>
        <View style={styles.logoContainer}>
            <Animated.View
                style={{
                    position: 'relative',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: fadeAnimIcon,
                    transform: [{translateX: translateXIcon}],
                }}
            >
                <Image
                    style={{
                        width: 70,
                        height: 68,
                    }}
                    source={utemIconoNegativo}
                    placeholder={"Isotipo UTEM"}
                    contentFit={"contain"}
                    contentPosition={"center"}
                />
            </Animated.View>


            <Animated.View
                style={{
                    position: 'absolute',
                }}
            >
                <Image
                    style={{
                        width: 250,
                        height: 250,
                    }}
                    source={utemLogoNegativo}
                    placeholder={"Logo UTEM"}
                    contentFit={"contain"}
                    contentPosition={"center"}
                />
            </Animated.View>
        </View>
        <StatusBar hidden/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
    },
    logoContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
})