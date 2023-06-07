import {StatusBar} from "expo-status-bar";
import {SafeAreaView, useColorScheme, View} from "react-native";
import {ToastProvider} from 'react-native-toast-notifications'

export default function Layout({ children, className = '', statusBarStyle = null, hideStatusBar = false }) {
    const { darkMode } = useColorScheme();

    return <ToastProvider
        placement="bottom"
    >
        <SafeAreaView className={`flex-1 items-center justify-center ${className}`}>
            {children}
        </SafeAreaView>
        <StatusBar style={statusBarStyle || (darkMode ? 'light' : 'dark')} hidden={hideStatusBar}/>
    </ToastProvider>
}