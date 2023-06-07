import {useRouter} from "expo-router";
import {useEffect, useState} from "react";

import {Text, useColorScheme } from 'react-native';
import Splash from "./splash";
import Layout from "./layouts/Layout";

export default function App() {
    const router = useRouter()
    const [isReady, setReady] = useState(false)
    const { toggleColorScheme } = useColorScheme()

    useEffect(() => {
        setReady(false)
    }, [])

    useEffect(() => {
        if(isReady) {
            // Redirect to '/login'
            router.push('/auth/login')
        }
    }, [isReady]);

    return isReady ? <Layout className={"bg-white dark:bg-gray-800"}>
        <Text className={"text-black dark:text-white"} onPress={toggleColorScheme}>Hello, World!</Text>
    </Layout> : <Splash setReady={setReady}/>;
}
