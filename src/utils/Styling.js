import {PixelRatio, StyleSheet} from "react-native";

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
});

export const getStyles = (darkMode) => styles[darkMode ? 'dark' : 'light']

export const pixels = (px) => px / PixelRatio.get()