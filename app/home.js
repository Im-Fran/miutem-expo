import {useRouter} from "expo-router";
import {useEffect} from "react";

import {Text, useColorScheme } from 'react-native';
import Layout from "./layouts/Layout";

export default function App() {
    const router = useRouter()
    const { toggleColorScheme } = useColorScheme()

    useEffect(() => {
        router.push('/auth/login')
    }, [])

    return <Layout className={"bg-white dark:bg-gray-800"}>
        <Text className={"text-black dark:text-white"} onPress={toggleColorScheme}>Hello, World!</Text>
    </Layout>;
}
