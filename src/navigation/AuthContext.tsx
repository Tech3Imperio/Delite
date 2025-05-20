import React, { createContext, useEffect, useState } from 'react';
import { AuthContextType, Role } from '../types/auth/AuthTypes';
import { getToken } from '../utils/auth/session';
import { getApiBaseUrl } from '../utils/auth/baseAPI';
import BootSplash from "react-native-bootsplash";

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<Role>(Role.GUEST)
    const [loading, setLoading] = useState<boolean>(true)
    const signIn = (role: Role) => {
        setRole(role)
    }
    const signOut = () => {
        setRole(Role.GUEST)
    }
    useEffect(() => {
        loadStorageData();
    }, []);

    async function loadStorageData(): Promise<void> {
        try {
            const token = await getToken()
            if (token) {
                try {
                    const response = await fetch(`${getApiBaseUrl()}/auth/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ token }),
                    });
                    const result = await response.json();
                    if (result) {
                        setRole(result.role)
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        console.error("Sign-in error:", error.message);
                    } else {
                        console.error("Sign-in error:", error);
                    }
                }
            } else {
                setRole(Role.GUEST)
            }
        } catch (error) {
        } finally {
            setLoading(false);
            await BootSplash.hide({ fade: true });
        }
    }
    const value: AuthContextType = {
        role, loading, signIn, signOut
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider