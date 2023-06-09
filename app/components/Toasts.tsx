import { useState, useEffect } from 'react';

import { View, Text, StyleSheet, DeviceEventEmitter, Animated, PanResponder } from 'react-native';
import Constants from "expo-constants";

export default function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const listener = DeviceEventEmitter.addListener('toast', ({ message, ...rest }) => {
            if(rest.debug && Constants.expoConfig.extra.env !== 'production') {
                console.debug(rest.debug)
            }

            setToasts(prevToasts => [
                ...prevToasts,
                {
                    id: new Date().getTime(),
                    message,
                    ...rest,
                },
            ]);
        });

        return () => listener.remove();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            // Only remove toasts older than 7 seconds
            setToasts(prevToasts =>
                prevToasts.filter(toast => new Date().getTime() - toast.id < 7000)
            );
        }, 500);

        return () => clearInterval(timer);
    }, [toasts]);

    return (
        <>
            {children}
            <View style={styles.container}>
                {toasts.map(toast => (
                    <Toast key={toast.id} toast={toast} setToasts={setToasts} />
                ))}
            </View>
        </>
    );
}

const Toast = ({ toast, setToasts }) => {
    const [animation] = useState(new Animated.Value(0));
    const [translateX] = useState(new Animated.Value(0));
    const [progressAnimation] = useState(new Animated.Value(0)); // Separate animation for the progress bar

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const x = Math.abs(gestureState.dx)
            if (x <= -80 || x >= 80) {
                translateX.setValue(gestureState.dx);
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            const x = Math.abs(gestureState.dx)
            if (x <= -80 || x >= 80) {
                dismissToast();
            } else {
                translateX.setValue(0);
            }
        },
    });

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();

        const progressAnimationDuration = 7000; // Duration for the progress bar animation
        Animated.timing(progressAnimation, {
            toValue: 1,
            duration: progressAnimationDuration,
            useNativeDriver: false,
        }).start();

        const dismissTimer = setTimeout(() => dismissToast(), 7000);

        return () => {
            clearTimeout(dismissTimer);
        };
    }, [animation, toast]);

    const dismissToast = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            // Remove the toast from the state
            setToasts((prevToasts) => {
                if(toast.callback && typeof toast.callback === 'function') {
                    toast.callback();
                }
                return prevToasts.filter((prevToast) => prevToast.id !== toast.id)
            });
        });
    };

    const progressBarWidth = progressAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['100%', '0%'],
    });

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                styles.toast,
                {
                    backgroundColor: toast.color || '#009d9b',
                    opacity: animation,
                    transform: [
                        {
                            translateX: translateX.interpolate({
                                inputRange: [-200, 0, 200],
                                outputRange: [-200, 0, 200],
                            }),
                        },
                    ],
                },
            ]}
        >
            {toast.title && <Text style={styles.toastTitle}>{toast.title}</Text>}
            <Text style={styles.toastMessage}>{toast.message}</Text>
            <View style={styles.progressBar}>
                <Animated.View
                    style={[
                        styles.progressBarFill,
                        {
                            width: progressBarWidth,
                        },
                    ]}
                />
            </View>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 5,
        marginBottom: 24,
    },
    toast: {
        position: 'relative',
        borderTopLeftRadius: 8,
        borderTopRight: 8,
        padding: 16,
        marginBottom: 8,
    },
    toastTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    toastMessage: {
        color: '#FFF',
        fontSize: 16,
    },
    progressBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginTop: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 2,
    },
});

export const useToast = () => {
    const toast = (data: any) => {
        let { message, ...rest } = typeof data === 'string' ? { message: data } : data;
        DeviceEventEmitter.emit('toast', {
            message,
            ...rest,
        });
    }

    return { toast };
};
