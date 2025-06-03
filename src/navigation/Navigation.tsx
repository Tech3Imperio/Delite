import { AuthNavigation } from "./auth/AuthStack";
import { AdminNavigation } from "./admin/AdminStack";
import { DealerStackNavigation } from "./dealer/DealerStackNavigation";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
export const Navigation = () => {
    const { role,
    } = useContext(AuthContext)
    switch (role) {
        case 'admin':
            return <AdminNavigation />;
        case 'dealer':
            return <DealerStackNavigation />;
        case 'guest':
            return <AuthNavigation />;
    }
};