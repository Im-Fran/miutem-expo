import {useEffect, useState} from "react";
import useStoredState from "../src/storage/StoredState";
import { getStyles } from "../src/utils/Styling";

import {Button, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import Splash from "./splash";

export default function App() {
    const [isReady, setReady] = useState(false)
    const [darkMode, setDarkMode] = useStoredState("darkMode", false)

    useEffect(() => {
        setReady(false)
        setTimeout(() => {
            // setReady(true)
        }, 5000)
    }, [])

    return isReady ? (
        <View style={getStyles(darkMode).container}>
            <Text style={getStyles(darkMode).text} onPress={() => setDarkMode(!darkMode)}>Hello, World!</Text>
            <StatusBar style={darkMode ? 'light' : 'dark'}/>
        </View>
    ) : <Splash/>;
}
