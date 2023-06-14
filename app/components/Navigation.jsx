import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {AntDesign, Octicons} from "@expo/vector-icons";

export default function Navigation({ pageTitle }) {
    return <SafeAreaView className={"w-full h-24 mb-2.5"}>
        <LinearGradient colors={['#1D8E5C', '#06607a']} style={StyleSheet.absoluteFill} start={{ x: 1, y: 0 }} end={{ x:0, y: 1 }}/>
        <View className={"relative flex-1 flex-row items-center justify-center px-5 w-full"}>
            <View className={"absolute flex-1 left-0 items-center justify-center ml-5"}>
                <Text className={"text-white"}>
                    <Octicons
                        name={"three-bars"}
                        size={24}
                        color={"white"}
                    />
                </Text>
            </View>
            <Text className={"flex-1 text-center text-white text-lg font-bold"}>
                { pageTitle }
            </Text>
        </View>
    </SafeAreaView>
}