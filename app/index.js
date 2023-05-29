import { getStyles } from "../src/utils/Styling";

import {StatusBar} from 'expo-status-bar';
import {Button, Text, View} from 'react-native';
import {useMMKV, useMMKVBoolean} from "react-native-mmkv";

export default function App() {
    const [darkMode, setDarkMode] = useMMKVBoolean('darkMode')
    useMMKV().set()

    return (
        <View style={getStyles(darkMode).container}>
            <Text style={getStyles(darkMode).text} onPress={() => setDarkMode(prev => !prev)}>Hello, World!</Text>
            <StatusBar style={darkMode ? 'light' : 'dark'}/>
        </View>
    );
}
