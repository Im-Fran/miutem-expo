import AuthService from "../backend/services/AuthService";

import {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {useToast} from "../components/Toasts"
import useStoredState from "../backend/storage/StoredState";

import {AntDesign} from '@expo/vector-icons';
import {ResizeMode, Video} from "expo-av";
import {Image} from "expo-image";
import {Button, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard} from "react-native";
import Layout from "../layouts/Layout";
import Constants from "expo-constants";
import {useLoadingToast} from "../components/LoadingToasts";
import dayjs from "dayjs";

const backgroundVideo = require('../../assets/login/background.mp4')
const logoUTEM = require('../../assets/utem/utem_logo_color_blanco.png')

export default function Login({ }) {

    // Utilities
    const router = useRouter();
    const {toast} = useToast();
    const loadingToast = useLoadingToast();

    /* Auth Form */
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [loginUnlocksAt, setLoginUnlocksAt] = useStoredState('loginUnlocksAt', 'none')
    const [lastLoginAt] = useStoredState('lastLoginAt')

    const [_, setTries] = useStoredState('loginTries', '0')

    useEffect(() => {
        if(!lastLoginAt) return
        loadingToast(true) // Mostrar toast cargando

        AuthService.hasValidToken().then(valid => { // Validar el token
            if(!valid) return

            if(lastLoginAt && dayjs(lastLoginAt).diff(dayjs(), 'hours') < 6) { // Si el login fue hace menos de 6 horas (el token dura 1 día)
                // Redirect to home
                router.push('/home')
                return
            }

            AuthService.refreshToken().then(async (loggedIn) => { // Refrescar token
                if(!loggedIn) {
                    await AuthService.logout() // No pudimos, solicitamos otro login
                } else {
                    router.push('/home') // Vamos al inicio!
                }
            })
        }).finally(() => {
            loadingToast(false) // Ocultar toast cargando
        })
    }, [lastLoginAt])

    useEffect(() => {
        if(Constants.expoConfig.extra.env !== 'production') { // Si no estamos en producción, no bloquear el login
            setLoginUnlocksAt('none')
            setTries('0')
        }
    }, [loginUnlocksAt])

    const submit = async () => {
        if(/^[a-zA-Z0-9._%+-]+@utem\.cl$/g.test(email) === false) { // Validar correo
            toast({
                message: 'El correo ingresado no es válido',
                color: 'red',
            })
            return
        }

        if(password?.length === 0) { // Validar contraseña
            toast({
                message: 'Debes ingresar una contraseña',
                color: 'red'
            })
            return
        }

        // Intenta login
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
                    {/* Correo */}
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

                    {/* Clave */}
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

                    {/* Botón login */}
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