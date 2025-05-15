import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import { SECRET_KEY, TOKEN_KEY } from '@env';
const secretKey = SECRET_KEY
const tokenKey = TOKEN_KEY
// Encrypt the token
export const encryptToken = (token: string): string => {
    console.log("Env variables", tokenKey, secretKey)
    return CryptoJS.AES.encrypt(token, secretKey).toString();
};

// Decrypt the token
export const decryptToken = (ciphertext: string): string => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

// Save encrypted token
export const storeToken = async (token: string): Promise<void> => {
    const encrypted = encryptToken(token);
    await AsyncStorage.setItem(tokenKey, encrypted);
};

// Retrieve and decrypt token
export const getToken = async (): Promise<string | null> => {
    const encrypted = await AsyncStorage.getItem(tokenKey);
    if (!encrypted) return null;
    return decryptToken(encrypted);
};

// Remove token
export const removeToken = async (): Promise<void> => {
    await AsyncStorage.removeItem(tokenKey);
};
