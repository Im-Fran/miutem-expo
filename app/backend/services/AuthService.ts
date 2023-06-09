import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';
import * as SecureStore from 'expo-secure-store'
import {useToast} from "../../components/Toasts";
import {useTime} from "./TimeService";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useLoadingToast} from "../../components/LoadingToasts";
import axios, {AxiosError} from "axios";

class AuthService {

    private static secureStore = createSecureStore();

    static async hasValidToken(): Promise<boolean> {
        const token = await this.secureStore.getItem('token')
        if (!token) return false

        let code;
        try {
            const res = await axios.get(Constants.expoConfig.extra.apiUrl + '/v1/carreras', {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })

            code = res.status
        } catch (e) {
            code = e?.status || 0
        }

        return code === 200
    }

    // Intenta el login
    static async attemptLogin(username: string, password: string, noToast = false) {
        const { toast } = useToast()
        const loadingToast = useLoadingToast()
        const dayjs = useTime();
        const tries = parseInt(await AsyncStorage.getItem('loginTries')) || 0
        const loginUnlocksAt = await AsyncStorage.getItem('loginUnlocksAt') || 'none'

        loadingToast(true)

        if(tries >= 3) {
            let seconds = dayjs(loginUnlocksAt).diff(dayjs(), 'seconds')
            if(isNaN(seconds)) {
                seconds = 0
            }
            if(seconds >= 0 || loginUnlocksAt === 'none') { // Primera vez bloqueado o aun falta
                if(seconds == 0) { // Primera vez
                    await AsyncStorage.setItem('loginUnlocksAt', dayjs().add(2, 'hour').toISOString())
                    seconds = 7200
                }

                if(!noToast) {
                    toast({
                        message: `Has intentado demasiadas veces! No podrás volver intentar hasta dentro de ${seconds < 120 ? (`${seconds} segundos`)  : (seconds < 3600 ? (`${Math.ceil(seconds/60)} minutos`) : (`${Math.ceil(seconds/3600)} horas`))}.`,
                        color: 'red',
                    })
                }
            } else { // Menor a 0, significa que ya pasó el tiempo de espera
                await AsyncStorage.multiSet([
                    ['loginTries', '0'],
                    ['loginUnlocksAt', 'none']
                ])
            }

            if(!noToast){
                loadingToast(false, {
                    message: 'AuthService#attemptLogin.loadingToastEnd-tries',
                    tries,
                    loginUnlocksAt,
                    seconds,
                })
            }
            return false
        }

        await AsyncStorage.setItem('loginTries', `${tries + 1}`)
        username = username.toLowerCase()

        try {
            const response = await axios.post(Constants.expoConfig.extra.apiUrl + '/v1/auth', {
                correo: username,
                contrasenia: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Guardar claves
            await SecureStore.setItemAsync('username', username)
            await SecureStore.setItemAsync('password', password)
            await this.secureStore.setItem('token', response.data.token) // Store in Secure Store for large data
            await AsyncStorage.setItem('lastLoginAt', dayjs().toISOString())
            if(!noToast){
                loadingToast(false)
            }
            return true
        } catch (response) {
            if (response.status === 404) {
                if(!noToast){
                    toast({
                        message: 'Usuario o contraseña incorrectos!',
                        color: 'red',
                        debug: {
                            uri: Constants.expoConfig.extra.apiUrl + '/v1/auth',
                            response: JSON.stringify(response),
                        }
                    })
                }
            } else {
                if(!noToast){
                    toast({
                        message: 'Error al contactar el servidor! Por favor intenta más tarde.',
                        color: 'red',
                        debug: {
                            message: 'AuthService#attemptLogin.toast-IncorrectCredentials_',
                            code: response.status,
                            uri: Constants.expoConfig.extra.apiUrl + '/v1/auth',
                            data: await response.data,
                        }
                    })
                }
            }
            console.log(response)
        }
        if(!noToast)
            loadingToast(false)
        return false
    }

    static async refreshToken() {
        const username = await SecureStore.getItemAsync('username')
        const password = await SecureStore.getItemAsync('password')

        if (!username || !password) return false

        // Delete token to avoid loops
        await this.logout()

        return await this.attemptLogin(username, password, true)
    }

    static async logout() {
        // Delete token and lastLoginAt
        await this.secureStore.removeItem('token')
        await AsyncStorage.removeItem('lastLoginAt')
        await SecureStore.deleteItemAsync('username')
        await SecureStore.deleteItemAsync('password')
    }
}

export default AuthService