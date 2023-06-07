import {StatusBar} from "expo-status-bar";
import {useColorScheme, View} from "react-native";


export default function Layout({ children, className = '', statusBarStyle = null, hideStatusBar = false }) {
    const { darkMode } = useColorScheme();

    return <>
        <>
            <View className={`flex-1 items-center justify-center ${className}`}>

                {children}
            </View>
        </>
        <StatusBar style={statusBarStyle || (darkMode ? 'light' : 'dark')} hidden={hideStatusBar}/>
    </>
}