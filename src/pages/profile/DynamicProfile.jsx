import { useContext } from "react";


import { AuthContext } from "../../context/AuthProvider";
import useRole from "../../hooks/useRole";
import AdminProfile from "./AdminProfile";
import MyProfile from "./MyProfile";
import UserProfile from "./UserProfile";
;


const DynamicProfile = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [role, isLoading] = useRole();

  if (authLoading || isLoading) {
    return  <p>Loading...</p>
  }

  if (role === "admin") return <AdminProfile />;
  if (role === "agent") return <MyProfile />;
  return <UserProfile />;
};

export default DynamicProfile;
