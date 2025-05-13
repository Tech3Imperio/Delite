// utils/apiBase.ts
import { Platform } from "react-native";

export const getApiBaseUrl = () => {
    if (Platform.OS === "android") return "http://10.0.2.2:8000";
    return "http://localhost:8000";
};
