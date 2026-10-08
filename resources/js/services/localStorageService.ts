export enum StorageKey {
    CHAT_SESSION = 'reliable_chat_session',
}

export const localStorage = {
    getStorageDataByKey<TData>(key: StorageKey): TData | null {
        const data = window.localStorage.getItem(key)

        if (!data) {
            return null
        }

        try {
            return JSON.parse(data) as TData
        } catch {
            return data as TData
        }
    },

    setStorageDataByKey<TData>(key: StorageKey, data: TData): void {
        window.localStorage.setItem(key, JSON.stringify(data))
    },

    removeStorageDataByKey(key: StorageKey): void {
        window.localStorage.removeItem(key)
    },

    hasStorageDataByKey(key: StorageKey): boolean {
        return window.localStorage.getItem(key) !== null
    },
}