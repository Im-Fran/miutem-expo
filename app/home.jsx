import {useRouter} from "expo-router";
import {useEffect, useState} from "react";
import { useColorScheme } from "nativewind";

import {Text } from 'react-native';
import Layout from "./layouts/Layout";
import AuthService from "./backend/services/AuthService";

export default function App() {
    const router = useRouter()
    const { toggleColorScheme } = useColorScheme()
    const [user, setUser] = useState({})

    useEffect(() => {
        AuthService.hasValidToken().then((valid) => {
            if(!valid) {
                router.push('/auth/login')
            } else {
                AuthService.fetchUser().then(setUser)
            }
        })

    }, [])

    return <Layout>
        <Text className={"text-black"} onPress={() => AuthService.logout()}>Hello, { user.nombreCompleto }!</Text>
    </Layout>;
}
