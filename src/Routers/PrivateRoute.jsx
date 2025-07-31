import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hook/UseAuth";



const PrivateRoute = ({ children }) => {
    // console.log(children)
    const { user, loading } = UseAuth();
    const location = useLocation();
    // console.log(location.pathname)
    // console.log(loading)
    if (loading) {
        return <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    }
    if (user) {
        return children;
    }
    else return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;