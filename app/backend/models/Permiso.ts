import Constants from "expo-constants";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {remember} from "../services/CachedService";

export default class Permiso {
    id: string
    codigoQr: string
    perfil: string
    motivo: string
    campus: string
    dependencia: string
    jornada: string
    vigencia: string
    fechaSolicitud: Date

    constructor({id, codigoQr, perfil, motivo, campus, dependencia, jornada, vigencia, fechaSolicitud}: Permiso) {
        this.id = id
        this.codigoQr = codigoQr
        this.perfil = perfil
        this.motivo = motivo
        this.campus = campus
        this.dependencia = dependencia
        this.jornada = jornada
        this.vigencia = vigencia
        this.fechaSolicitud = fechaSolicitud
    }

    static async fetch() {
        try {
            return (await remember('permisos', 60, async () => {
                const username = await SecureStore.getItemAsync('username')
                const password = await SecureStore.getItemAsync('password')
                const res = await axios.post(Constants.expoConfig.extra.apiUrl + '/v1/permisos', {
                    correo: username,
                    contrasenia: password,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                return res.data.map((permiso) => new Permiso({...permiso}))
            }))
        } catch(e) {
            console.debug({
                point: 'Permiso.fetch',
                uri: Constants.expoConfig.extra.apiUrl + '/v1/permisos',
                e,
            })
        }

        return new Promise((resolve) => resolve([]))
    }
}