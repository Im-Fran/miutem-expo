import {StatusBar} from "expo-status-bar";
import {SafeAreaView, useColorScheme} from "react-native";
import ToastProvider from "../components/Toasts";
import LoadingToastProvider from "../components/LoadingToasts";

export default function Layout({ children, className = '', statusBarStyle = null, hideStatusBar = false }) {
    const { darkMode } = useColorScheme();

    return <ToastProvider>
        <LoadingToastProvider>
            <SafeAreaView className={`flex-1 items-center justify-center ${className}`}>
                {children}
            </SafeAreaView>
            <StatusBar style={statusBarStyle || (darkMode ? 'light' : 'dark')} hidden={hideStatusBar}/>
        </LoadingToastProvider>
    </ToastProvider>
}