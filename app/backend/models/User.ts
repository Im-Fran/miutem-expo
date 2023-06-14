import createSecureStore from "@neverdull-agency/expo-unlimited-secure-store";

const secureStore = createSecureStore()

// Variables: Rut, Nombre Completo, Usuario, Correo
export default class User {
    rut: string  // 123456789
    nombres: string // FRANCISCO ESTEBAN
    apellidos: string // SOLIS MATURANA
    nombreCompleto: string // FRANCISCO ESTEBAN SOLIS MATURANA
    username: string // fsolism
    correo: string // fsolism@utem.cl

    constructor({ rut = '', nombres = '', apellidos = '', nombreCompleto = '', username = '', correo = '' }) {
        this.rut = rut
        this.nombres = nombres
        this.apellidos = apellidos
        this.nombreCompleto = nombreCompleto
        this.username = username
        this.correo = correo
    }

    getNombre() {
        return this.nombres.split(' ')[0]
    }

    static parse(data) {
        if(typeof data === 'string') {
            data = JSON.parse(data)
        }

        return new User({
            ...data
        })
    }

    static async getToken() {
        return secureStore.getItem('token')
    }
}