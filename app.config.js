import 'dotenv/config'

module.exports = {
    name: "MiUTEM",
    slug: "miutem",
    version: "3.0.0",
    orientation: "portrait",
    scheme: "miutem",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "cover",
    },
    assetBundlePatterns: ["**/*"],
    plugins: [
        [
            "expo-av",
            {
                microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone.",
            },
        ],
        [
            "expo-build-properties",
            {
                ios: {
                    flipper: false,
                },
            },
        ],
    ],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "cl.franciscosolis.miutem",
        config: {
            usesNonExemptEncryption: false,
        },
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff",
        },
        permissions: [
            "android.permission.RECORD_AUDIO",
            "android.permission.MODIFY_AUDIO_SETTINGS",
        ],
        package: "cl.franciscosolis.miutem",
    },
    extra: {
        apiUrl: process.env.MI_UTEM_API_DEBUG || 'https://api.exdev.cl',
        eas: {
            projectId: "21238e95-a7b0-4d25-a22c-9b86841151d6",
        },
    },
    owner: "imfran",
};
