import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import {Image} from "expo-image";

const utemGif = require('../assets/splash/utem.gif');
export default function Splash({ setReady }) {

    return <View style={styles.container}>
        <LinearGradient colors={['#1D8E5C', '#06607a']} style={styles.background}/>
        <View style={styles.logoContainer}>
            <Image
                source={utemGif}
                style={{width: 300, height: 300}}
                contentFit={'contain'}
                onLoadEnd={() => {
                    setTimeout(() => {
                        setReady(true)
                    },  3750)
                }}
            />
        </View>
        <StatusBar style={"dark"}/>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})