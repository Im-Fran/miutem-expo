import {useState} from "react";

import { useToast } from "../components/Toasts"
import { AntDesign } from '@expo/vector-icons';
import {Video} from "expo-av";
import {Image} from "expo-image";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import Layout from "../layouts/Layout";

const backgroundVideo = require('../../assets/login/background.mp4')
const logoUTEM = require('../../assets/utem/utem_logo_color_blanco.png')

export default function Login({ }) {

    const {toast} = useToast();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        if(/^[a-zA-Z0-9._%+-]+@utem\.cl$/g.test(email) === false) {
            toast('El correo ingresado no es válido')
            return
        }
        alert(`${email}:${password}`)
    }

    return <Layout hideStatusBar>
        <Video
            source={backgroundVideo}
            rate={1}
            isMuted
            resizeMode="cover"
            shouldPlay
            isLooping
            style={StyleSheet.absoluteFill}
        />

        <View style={StyleSheet.absoluteFill} className={"bg-black/40"}/>

        <View className={"flex-1 w-full relative py-20 items-center"}>
            <Image
                source={logoUTEM}
                contentFit={'contain'}
                className={"my-10 bg-contain w-64 h-32"}
            />

            <View className={"flex items-center w-full h-full gap-5"}>
                {/* Email */}
                <View className={"flex flex-row items-center bg-black/40 border border-white/60 rounded-full px-2"}>
                    <View className={"py-4 px-2 rounded-l-lg h-full"}>
                        <AntDesign
                            name={"user"}
                            size={24}
                            color={"white"}
                        />
                    </View>
                    <TextInput
                        className={"text-white py-4 px-2 rounded-r-lg w-3/4 h-full"}
                        placeholder={"usuario@utem.cl"}
                        autoComplete={"username"}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password */}
                <View className={"flex flex-row items-center bg-black/40 border border-white/60 rounded-full px-2"}>
                    <View className={"py-4 px-2 rounded-l-lg h-full"}>
                        <AntDesign
                            name={"key"}
                            size={24}
                            color={"white"}
                        />
                    </View>

                    <TextInput
                        className={"text-white py-4 px-2 rounded-r-lg w-3/4 h-full"}
                        placeholder={"• • • • • • • • •"}
                        value={password}
                        onChangeText={setPassword}
                        textContentType={"password"}
                        secureTextEntry={true}
                        autoComplete={"current-password"}
                    />
                </View>

                {/* Login Button */}
                <View className={"bg-primary-100 rounded-full px-2"}>
                    <Button
                        color={"white"}
                        title={"Iniciar Sesión"}
                        onPress={() => submit()}
                    />
                </View>

            </View>

            <Text className={"absolute bottom-0 text-white text-center text-[16px]"}>Hecho con ❤️ por el <Text className={"font-bold"}>Club de Desarrollo Experimental</Text> junto a SISEI</Text>
        </View>
    </Layout>
}