import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect, useCallback } from 'react'

const useStoredState = <T>(key: string, defaultValue: T): [T, (newValue: T) => void, boolean] => {
    const [state, setState] = useState({
        hydrated: false,
        storageValue: defaultValue,
    })
    const {hydrated, storageValue} = state

    useEffect(() => {
        const pullFromStorage = async () => {
            let value = defaultValue
            try {
                const fromStorage = await AsyncStorage.getItem(key)
                if (fromStorage) {
                    let json = null
                    try {
                        json = JSON.parse(fromStorage)
                    }catch (_){}

                    value = json != null ? json : fromStorage
                }
            } catch (e) {
                console.log({
                    key,
                    error: e,
                })
            }

            return value
        }
        pullFromStorage().then((value) => {
            setState({hydrated: true, storageValue: value})
        })

        // We don't want to update when the defaultValue changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key])

    const updateStorage = useCallback(async (newValue: T) => {
        setState({hydrated: true, storageValue: newValue})
        const stringifyValue = JSON.stringify(newValue)
        await AsyncStorage.setItem(key, stringifyValue)
    }, [key])

    return [storageValue, updateStorage, hydrated]
}

export default useStoredState