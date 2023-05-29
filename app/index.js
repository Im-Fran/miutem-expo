import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import {createStyles, loadStyles} from "../src/utils/Styling";

export default function App() {

    const [theme, setTheme] = useState('dark')

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

    return (
        <View style={loadStyles(theme).container}>
            <Text style={loadStyles(theme).text} onPress={toggleTheme}>Hello, World!</Text>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'}/>
        </View>
    );
}
