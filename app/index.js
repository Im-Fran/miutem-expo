import {useRouter} from "expo-router";
import {useEffect, useState} from "react";

import {Button, Text, useColorScheme, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Splash from "./splash";

export default function App() {
    const router = useRouter()
    const [isReady, setReady] = useState(false)
    const { toggleColorScheme, darkMode } = useColorScheme()

    useEffect(() => {
        setReady(false)
    }, [])

    useEffect(() => {
        if(isReady) {
            // Redirect to '/login'
            router.push('/auth/login')
        }
    }, [isReady]);

    return isReady ? <View className={"flex-1 items-center justify-center bg-white dark:bg-gray-800"}>
        <Text className={"text-black dark:text-white"} onPress={toggleColorScheme}>Hello, World!</Text>
        <StatusBar style={darkMode ? 'light' : 'dark'}/>
    </View> : <Splash setReady={setReady}/>;
}
