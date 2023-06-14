import {StatusBar} from "expo-status-bar";
import {StyleSheet, useColorScheme} from "react-native";
import ToastProvider from "../components/Toasts";
import LoadingToastProvider from "../components/LoadingToasts";
import {LinearGradient} from "expo-linear-gradient";

export default function Layout({ children, bgGradient = false, statusBarStyle = null, hideStatusBar = false }) {
    const { darkMode } = useColorScheme();

    return <ToastProvider>
        {bgGradient && <LinearGradient colors={['#1D8E5C', '#06607a']} style={StyleSheet.absoluteFill} start={{ x: 1, y: 0 }} end={{ x:0, y: 1 }}/>}
        <LoadingToastProvider>
            {children}
            <StatusBar style={statusBarStyle || (darkMode ? 'light' : 'dark')} hidden={hideStatusBar}/>
        </LoadingToastProvider>
    </ToastProvider>
}