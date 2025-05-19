// utils/apiBase.ts
import { Platform } from "react-native";
export const getApiBaseUrl = () => {
    if (__DEV__) {
        if (Platform.OS === "android") return "http://10.0.2.2:8000";
        return "http://localhost:8000";
    } else {
        return "https://delite-backend-3lhu.onrender.com"
    }
};
