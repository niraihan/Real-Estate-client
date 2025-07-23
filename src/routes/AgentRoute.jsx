import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";


const AgentRoute = ({ children }) => {
  // const { user, loading, role } = useAuth(); // role যেন 'agent' হয়
  // const [ user, loading, role ] = useAuth(); // role যেন 'agent' হয়

  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();

  const location = useLocation();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  if (user && role === 'agent') {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AgentRoute;
