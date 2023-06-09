import AuthService from "../backend/services/AuthService";

import {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {useToast} from "../components/Toasts"
import useStoredState from "../backend/storage/StoredState";
import * as SecureStore from "expo-secure-store";

import {AntDesign} from '@expo/vector-icons';
import {ResizeMode, Video} from "expo-av";
import {Image} from "expo-image";
import {Button, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard} from "react-native";
import Layout from "../layouts/Layout";
import Constants from "expo-constants";
import {useLoadingToast} from "../components/LoadingToasts";
import {useTime} from "../backend/services/TimeService";

const backgroundVideo = require('../../assets/login/background.mp4')
const logoUTEM = require('../../assets/utem/utem_logo_color_blanco.png')

export default function Login({ }) {

    // Utilities
    const router = useRouter();
    const {toast} = useToast();
    const loadingToast = useLoadingToast();
    const dayjs = useTime()

    /* Auth Form */
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [loginUnlocksAt, setLoginUnlocksAt] = useStoredState('loginUnlocksAt', 'none')
    const [lastLoginAt] = useStoredState('lastLoginAt', 'none')

    const [_, setTries] = useStoredState('loginTries', 0)

    useEffect(() => {
        AuthService.hasValidToken().then(valid => {
            if(valid) {
                // Set loading toast
                loadingToast(true)

                // If last login was less than 6 hours ago
                const lastLogin = dayjs(lastLoginAt)
                if(lastLogin.diff(dayjs(), 'hours') < 6) {
                    // Redirect to home
                    loadingToast(false)
                    router.push('/home')
                } else {
                    AuthService.refreshToken().then(async (loggedIn) => {
                        if(!loggedIn) {
                            await AuthService.logout()
                        }
                    })
                }
            }
        })
    }, [])

    useEffect(() => {
        if(Constants.expoConfig.extra.env !== 'production') {
            setLoginUnlocksAt('none')
            setTries(0)
        }
    }, [loginUnlocksAt])

    const submit = async () => {
        if(/^[a-zA-Z0-9._%+-]+@utem\.cl$/g.test(email) === false) {
            toast({
                message: 'El correo ingresado no es válido',
                color: 'red',
            })
            return
        }

        if(password?.length === 0) {
            toast({
                message: 'Debes ingresar una contraseña',
                color: 'red'
            })
            return
        }

        // Show loading toast
        AuthService.attemptLogin(email, password).then(loggedIn => {
            if(loggedIn) {
                router.push('/home')
            }
        })
    }

    return <Layout hideStatusBar>
        <Video
            source={backgroundVideo}
            rate={1}
            isMuted
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            style={StyleSheet.absoluteFill}
        />

        <View style={StyleSheet.absoluteFill} className={"bg-black/40"}/>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        </TouchableWithoutFeedback>
    </Layout>
}