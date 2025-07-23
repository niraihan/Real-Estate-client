import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <span className="loading loading-spinner"></span>;

  if (user) return children;

  return <Navigate to="/loginRegister" state={{ from: location }} replace />;
};

export default PrivateRoute;
