import {Video} from "expo-av";
import {Image} from "expo-image";
import {StatusBar} from "expo-status-bar";
import {Text, TextInput, View} from "react-native";

const backgroundVideo = require('../../assets/login/background.mp4')
const logoUTEM = require('../../assets/utem/utem_logo_color_blanco.png')

export default function Login({ }) {
    return <View className={"flex-1 items-center justify-center"}>
        <Video
            source={backgroundVideo}
            rate={1}
            isMuted
            resizeMode="cover"
            shouldPlay
            isLooping
            className={"absolute w-full h-full inset-0"}
        />

        <View className={"absolute w-full h-full inset-0 bg-black/40"}/>

        <View className={"flex-1 relative py-20 items-center"}>
            <Image
                source={logoUTEM}
                contentFit={'contain'}
                className={"my-10 bg-contain w-64 h-32"}
            />

            <Text className={"absolute bottom-0 mb-10 text-white text-center text-[16px]"}>Hecho con ❤️ por el <Text className={"font-bold"}>Club de Desarrollo Experimental</Text> junto a SISEI</Text>
        </View>
        <StatusBar style={'dark'}/>
    </View>
}