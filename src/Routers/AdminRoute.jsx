

import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../Hook/UseAuth';

const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();

    const adminEmails = [
        "porag2024@gmail.com",
        "sabbirahamed3132@gmail.com",

  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-blue-600"></span>
      </div>
    );
  }

  if (user && adminEmails.includes(user.email)) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;