export function setStorage(key: string, value: any) {
    uni.setStorageSync(key, value);
}

export function getStorage(key: string) {
    return uni.getStorageSync(key);
}
export function clearStorage() {
    uni.clearStorageSync();
}

export const Token = {
    set(value: any) {
        setStorage("ACCEPT_TOKEN", value);
    },
    get() {
        return getStorage("ACCEPT_TOKEN");
    },
    remove() {
        setStorage("ACCEPT_TOKEN", "");
    }
};
