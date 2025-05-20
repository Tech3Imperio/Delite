import { AuthNavigation } from "./AuthStack";
import { AdminNavigation } from "./AdminStack";
import { DealerNavigation } from "./DealerStack";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
export const Navigation = () => {
    const { role,
    } = useContext(AuthContext)
    switch (role) {
        case 'admin':
            return <AdminNavigation />;
        case 'dealer':
            return <DealerNavigation />;
        case 'guest':
            return <AuthNavigation />;
    }
};