import {StatusBar} from "expo-status-bar";
import { Image } from "expo-image";
import {StyleSheet, Text, View} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import logoIsotipoNegativo from "../assets/utem/utem_isotipo_negativo.png";
import {pixels} from "../src/utils/Styling";

// The background should be a linear gradient from top right to bottom left using colors #1D8E5C to #06607a

export default function Splash() {

    return <View style={styles.container}>
        <LinearGradient colors={['#1D8E5C', '#06607a']} style={styles.background}/>
        <View style={styles.logoContainer}>
            <Image
                style={styles.logo}
                source={logoIsotipoNegativo}
                placeholder={"Logo UTEM"}
                contentFit={"contain"}
                contentPosition={"center"}
            />
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: pixels(200),
    },
    logo: {
        height: pixels(150),
        width: pixels(150),
        transform: [
            {translateX: -pixels(500)}
        ],
    },
})