import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    light: {
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },

        text: {
            color: '#000'
        },
    },
    dark: {
        container: {
            flex: 1,
            backgroundColor: '#1f1f1f',
            alignItems: 'center',
            justifyContent: 'center',
        },

        text: {
            color: '#fff'
        },
    }
})

export function loadStyles(theme = 'dark') {
    return styles[theme] || styles['light'];
}