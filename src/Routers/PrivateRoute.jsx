import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hook/UseAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex w-52 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        );
    }

    if (!user) {
        // Save current location so Login can redirect back after successful login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
