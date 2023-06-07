import {useColorScheme, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function Layout({ children, hideStatusBar = false }) {
    const { darkMode } = useColorScheme();

    return <View className={"flex-1 items-center justify-center"}>
        <StatusBar style={darkMode ? 'light' : 'dark'} hidden={hideStatusBar}/>

        {children}
    </View>
}