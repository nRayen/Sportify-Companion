import * as SecureStore from 'expo-secure-store';

export const getAuthCookies = async () => {
    const cookies = await SecureStore.getItemAsync('jwt');
    return cookies;
}

export const setAuthCookies = async (token: string) => {
    await SecureStore.setItemAsync('jwt', token);
}

export const deleteAuthCookies = async () => {
    await SecureStore.deleteItemAsync('jwt');
}







