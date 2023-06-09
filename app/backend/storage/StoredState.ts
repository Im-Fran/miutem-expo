import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect, useCallback } from 'react'

const useStoredState = (key: string, defaultValue: string = null): [string, (newValue: string) => void, boolean] => {
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
                value = fromStorage || defaultValue
            } catch (e) { console.debug({ key, error: e }) }

            return value
        }
        pullFromStorage().then((value) => {
            setState({ hydrated: true, storageValue: value })
        })

        // We don't want to update when the defaultValue changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key])

    const updateStorage = useCallback(async (newValue: string) => {
        setState({hydrated: true, storageValue: newValue})
        await AsyncStorage.setItem(key, newValue)
    }, [key])

    return [storageValue, updateStorage, hydrated]
}

export default useStoredState