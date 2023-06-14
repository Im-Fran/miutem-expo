import createSecureStore from "@neverdull-agency/expo-unlimited-secure-store";

const secureStore = createSecureStore()

/**
 * Remember a given value for a given time
 * @param key the key of the stored value
 * @param ttl the time to live in seconds
 * @param value the value to store
 */
export async function remember(key: string, ttl: number, value: any) {
    const data = JSON.parse((await secureStore.getItem(key)) || '{"ttl": 0}')
    const now = Date.now()
    if (data.ttl > now) {
        return data.value
    }

    await secureStore.setItem(key, JSON.stringify({
        value,
        ttl: now + (ttl * 1000),
    }))

    return value
}

/**
 * Forget a given value
 * @param key the key of the stored value
 */

export async function forget(key: string) {
    return secureStore.removeItem(key)
}