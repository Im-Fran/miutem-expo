import {useRouter} from "expo-router";
import {useEffect} from "react";

import {Text, useColorScheme } from 'react-native';
import Layout from "./layouts/Layout";
import AuthService from "./backend/services/AuthService";

export default function App() {
    const router = useRouter()
    const { toggleColorScheme } = useColorScheme()

    useEffect(() => {
        AuthService.hasValidToken().then(valid => {
            if(!valid) {
                router.push('/auth/login')
            }
        })
    }, [])

    return <Layout>
        <Text className={"text-black"} onPress={toggleColorScheme}>Hello, World!</Text>
    </Layout>;
}
