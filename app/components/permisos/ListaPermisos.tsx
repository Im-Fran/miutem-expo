import {useEffect, useState} from "react";
import User from "../../backend/models/User";
import VistaPermiso from "./VistaPermiso";
import Permiso from "../../backend/models/Permiso";
import {Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";

export default function ListaPermisos({ user }: { user?: User }) {
    const [loading, setLoading] = useState(true)
    const [permisos, setPermisos] = useState([])

    useEffect(() => {
        if(!user) return;

        Permiso.fetch().then(setPermisos).finally(() => setLoading(true))
    }, [user]);

    // @ts-ignore
    return !loading ? permisos.map((it, index) => <VistaPermiso key={index}/>) : <View className={"border border-[#BDBDBD] rounded-2xl bg-white w-4/6 h-40 shadow"}>
        {/* @ts-ignore */}
        <View className={"flex-1 flex-col justify-center items-center h-full"}>
            {/* @ts-ignore */}
            <View className={"flex-1 gap-2 flex-row justify-start items-center h-3/4 w-full px-2.5"}>
                <AntDesign
                    name={"qrcode"}
                    size={60}
                />

                {/* @ts-ignore */}
                <View className={"flex-1 flex-col justify-center items-start w-full h-2/3"}>
                    {/* @ts-ignore */}
                    <Text className={"text-gray-500"} style={{ fontSize: 14 }}>Estudiante</Text>
                    {/* @ts-ignore */}
                    <Text className={"text-primary font-bold"} style={{ fontSize: 16 }}>Permiso académico</Text>
                    {/* @ts-ignore */}
                    <Text className={"text-primary font-bold"} style={{ fontSize: 16 }}>de ingreso a clases</Text>
                </View>
            </View>
            {/* @ts-ignore */}
            <View className={"border-t border-[#BDBDBD] h-1/4 w-full items-center justify-center"} onPress={() => alert('Ver QR')}>
                {/* @ts-ignore */}
                <Text className={"font-bold"}>Ver QR</Text>
            </View>
        </View>
    </View>
}