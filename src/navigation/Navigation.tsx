import { AuthNavigation } from "./AuthStack";
import { AdminNavigation } from "./AdminStack";
import { DealerNavigation } from "./DealerStack";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Text } from "react-native";
export const Navigation = () => {
    const { role, loading
    } = useContext(AuthContext)
    if (loading) {
        return <Text>Loading</Text>
    }
    switch (role) {
        case 'admin':
            return <AdminNavigation />;
        case 'dealer':
            return <DealerNavigation />;
        case 'guest':
            return <AuthNavigation />;
    }
};