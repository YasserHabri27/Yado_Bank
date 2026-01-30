import { Navigate, Outlet } from ;
import { useAuth } from ;

const RouteProtegee = ({ allowedRoles }) => {
    const { utilisateur, chargement } = useAuth();

    if (chargement) {
        return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
    }

    if (!utilisateur) {
        return <Navigate to="/connexion" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(utilisateur.role)) {
        return <Navigate to="/non-autorise" replace />;
    }

    return <Outlet />;
};

export default RouteProtegee;
