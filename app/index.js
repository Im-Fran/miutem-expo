import {useEffect, useState} from "react";
import useStoredState from "../src/storage/StoredState";
import { getStyles } from "../src/utils/Styling";

import {Button, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Splash from "./splash";
import {useRouter} from "expo-router";

export default function App() {
    const router = useRouter()
    const [isReady, setReady] = useState(false)
    const [darkMode, setDarkMode] = useStoredState("darkMode", false)

    useEffect(() => {
        setReady(false)
    }, [])

    useEffect(() => {
        if(isReady) {
            // Redirect to '/login'
            router.push('/auth/login')
        }
    }, [isReady]);

    return isReady ? <View style={getStyles(darkMode).container}>
        <Text style={getStyles(darkMode).text} onPress={() => setDarkMode(!darkMode)}>Hello, World!</Text>
        <StatusBar style={darkMode ? 'light' : 'dark'}/>
    </View> : <Splash setReady={setReady}/>;
}
