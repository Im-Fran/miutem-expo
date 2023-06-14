import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';
import * as SecureStore from 'expo-secure-store'
import {useToast} from "../../components/Toasts";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useLoadingToast} from "../../components/LoadingToasts";
import axios from "axios";
import dayjs from "dayjs";
import User from "../models/User";

class AuthService {

    private static secureStore = createSecureStore();

    static async hasValidToken(): Promise<boolean> {
        const token = await this.secureStore.getItem('token') // Obtener token del Secure Store
        if (!token) return false // Si no hay token, no es valido

        const lastLogin = await AsyncStorage.getItem('lastLoginAt') // Obtener ultimo login
        if (!lastLogin) return false // Si no hay ultimo login, no es valido

        const user = await this.fetchUser()
        if(!user) return false

        let code; // Codigo, deberia de ser 200
        try {
            const res = await axios.get(Constants.expoConfig.extra.apiUrl + '/v1/carreras', { // Intenta obtener las carreras
                headers: {
                    'authorization': `Bearer ${token}` // El token va en el header
                }
            })

            code = res.status // Codigo de respuesta
        } catch (e) {
            code = e?.status || 0 // Aquí claramente es un error
        }

        return code === 200 && (dayjs(lastLogin).diff(dayjs(), 'hours') < 6) // Si el codigo es 200 y el ultimo login fue hace menos de 6 horas, es valido
    }

    // Intenta el login
    static async attemptLogin(username: string, password: string) {
        const { toast } = useToast()
        const loadingToast = useLoadingToast()
        const tries = parseInt(await AsyncStorage.getItem('loginTries')) || 0
        const loginUnlocksAt = await AsyncStorage.getItem('loginUnlocksAt') || 'none'

        loadingToast(true)

        // Maneja los intentos
        if(!await this.handleTries(dayjs, toast, loadingToast, tries, loginUnlocksAt)) return false

        // Incrementa el cantidad de intentos
        await AsyncStorage.setItem('loginTries', `${tries + 1}`)

        // Asegurarse que el usuario sea en minusculas
        username = username.toLowerCase()

        // Intenta autenticar
        const response = await this.postLogin(username, password)

        if(response.status === 200) { // Login exitoso
            // Guardar usuario, clave, token, ultimo login, y reiniciar intentos
            const data = response.data
            await this.saveTokens(username, password, data.token)
            await this.saveUser(data)

            loadingToast(false) // Desactiva el loading toast
            return true
        }

        toast({
            message: response.status === 404 ? 'Usuario o contraseña incorrectos!' : 'Error al contactar el servidor! Por favor intenta más tarde.',
            color: 'red',
            debug: {
                message: 'AuthService#attemptLogin.IncorrectCredentials',
                code: response.status,
                response: response.statusText,
                uri: Constants.expoConfig.extra.apiUrl + '/v1/auth',
            }
        })

        loadingToast(false) // Desactiva el loading toast
        return false
    }

    static async refreshToken() {
        const username = await SecureStore.getItemAsync('username')
        const password = await SecureStore.getItemAsync('password')

        if (!username || !password) return false

        // Borra los token para evitar loops
        await this.logout()

        // Intenta obtener nuevas claves
        const response = await this.postLogin(username, password)
        if(response.status === 200) {
            // Guarda las nuevas claves
            const data = response.data
            await this.saveTokens(username, password, data.token, false)
            await this.saveUser(data)
            return true
        }

        return false
    }

    static async fetchUser() {
        let userData = await this.secureStore.getItem('user')
        if(!userData) return null
        let user = JSON.parse(userData)

        if(dayjs(user.requestedAt).diff(dayjs(), 'minutes') > 15) {
            const username = await SecureStore.getItemAsync('username')
            const password = await SecureStore.getItemAsync('password')

            if (!username || !password) return null

            // Intenta obtener nuevos datos
            const response = await this.postLogin(username, password)
            if(response.status === 200) {
                // Guarda los nuevos datos
                const data = response.data
                await this.saveTokens(username, password, data.token, false)
                await this.saveUser(data)
                user = data
            } else {
                await this.logout()
                return null
            }
        }

        return new User({
            ...user,
        })
    }

    static async logout() {
        // Delete token and lastLoginAt
        await this.secureStore.removeItem('token')
        await this.secureStore.removeItem('user')
        await AsyncStorage.removeItem('lastLoginAt')
        await SecureStore.deleteItemAsync('username')
        await SecureStore.deleteItemAsync('password')
    }

    private static async saveUser(data) {
        delete data.token
        await this.secureStore.setItem('user', JSON.stringify({
            ...data,
            requestedAt: dayjs().toISOString(),
        }))
    }

    private static async postLogin(username: string, password: string) {
        try {
            return await axios.post(Constants.expoConfig.extra.apiUrl + '/v1/auth', {
                correo: username,
                contrasenia: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        } catch (response) {
            console.debug(response.status, response.statusText, '/v1/auth', new Date().toISOString())
            return response
        }
    }

    private static async saveTokens(username: string, password: string, token: string, resetTries: boolean = true) {
        await SecureStore.setItemAsync('username', username)
        await SecureStore.setItemAsync('password', password)
        await this.secureStore.setItem('token', token)
        await AsyncStorage.setItem('lastLoginAt', dayjs().toISOString())

        if(resetTries) {
            await AsyncStorage.setItem('loginTries', '0')
        }
    }

    private static async handleTries(dayjs, toast, loadingToast, tries: number, loginUnlocksAt: string) {
        // Administra el tiempo restante.
        if(tries >= 3) { // Si hay mas de 3 intentos fallidos
            let seconds = dayjs(loginUnlocksAt).diff(dayjs(), 'seconds') // Obtener la cantidad de segundos para desbloquear
            if(isNaN(seconds)) { // Si no es un numero (none) se asigna 0
                seconds = 0
            }

            // Si aun falta, o es primera vez que se bloquea
            if(seconds >= 0 || loginUnlocksAt === 'none') {

                if(seconds == 0) { // Primera vez que se bloquea, se asigna el tiempo y los segundos restantes
                    await AsyncStorage.setItem('loginUnlocksAt', dayjs().add(2, 'hour').toISOString())
                    seconds = 7200
                }

                toast({ // Muestra error y tiempo restantes
                    message: `Has intentado demasiadas veces! No podrás volver intentar hasta dentro de ${seconds < 120 ? (`${seconds} segundos`)  : (seconds < 3600 ? (`${Math.ceil(seconds/60)} minutos`) : (`${Math.ceil(seconds/3600)} horas`))}.`,
                    color: 'red',
                })
            } else { // Menor a 0, significa que ya pasó el tiempo de espera
                await AsyncStorage.multiSet([ // Se reinicia el contador y el tiempo
                    ['loginTries', '0'],
                    ['loginUnlocksAt', 'none']
                ])
            }

            loadingToast(false, {
                message: 'AuthService#attemptLogin.loadingToastEnd-tries',
                tries,
                loginUnlocksAt,
                seconds,
            }) // Desactiva el loading toast
            return false
        }

        return true
    }
}

export default AuthService