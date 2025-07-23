import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";


const AdminProfile = () => {
  const { user } = useContext(AuthContext);
console.log(user)
  return (
    <div className="max-w-xl mx-auto bg-base-100 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <div className="space-y-3">
        <img src={user.photoURL} alt="Admin" className="w-28 h-28 rounded-full" />

        <p><span className="font-semibold">Name:</span> {user.displayName}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Role:</span> Admin</p>
      </div>
    </div>
  );
};

export default AdminProfile;