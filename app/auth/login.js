import {StyleSheet, Text, View} from "react-native";
import useStoredState from "../../src/storage/StoredState";
import {getStyles} from "../../src/utils/Styling";

export default function Login({ }) {
    const [darkMode, setDarkMode] = useStoredState("darkMode", false)

    return <View style={getStyles(darkMode).container}>
        <Text style={styles.text}>
            Hello, Login!
        </Text>
    </View>
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
    },
})