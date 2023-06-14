import {useRouter} from "expo-router";
import {useEffect, useState} from "react";

import {SafeAreaView, Text, View} from 'react-native';
import AuthService from "./backend/services/AuthService";
import Navigation from "./components/Navigation";
import Layout from "./layouts/Layout";
import {useLoadingToast} from "./components/LoadingToasts";
import useAuth from "./backend/services/UserService";
import User from "./backend/models/User";
import ListaPermisos from "./components/permisos/ListaPermisos";

export default function App({ }) {
    const router = useRouter()
    const loadingToast = useLoadingToast();
    const [isLoggedIn, userData] = useAuth();
    const [user, setUser] = useState(null)

    useEffect(() => {
        loadingToast(true)
        if(!isLoggedIn) {
            router.push('/auth/login')
        }

        loadingToast(false)
    }, [isLoggedIn])

    useEffect(() => {
        setUser(User.parse(userData))
    }, [userData])

    return <>
        <Navigation pageTitle={"Inicio"}/>
        <SafeAreaView className={"flex-1 items-center justify-start w-full mx-5"}>
            <Layout>
                <View className={"w-full"}>
                    <Text className={"text-black text-left w-full text-4xl"} onPress={() => AuthService.logout()}>
                        Tiempo sin vernos,
                    </Text>
                    <Text className={"text-black text-left w-full text-4xl font-semibold capitalize"}>{ user?.getNombre() }</Text>
                </View>

                <View className={"w-full mt-5"}>
                    <Text className={"font-bold text-xl"}>PERMISOS ACTIVOS</Text>
                    <ListaPermisos user={user}/>
                </View>
            </Layout>
        </SafeAreaView>
    </>
}
