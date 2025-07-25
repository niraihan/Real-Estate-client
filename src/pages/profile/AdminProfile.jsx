// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthProvider";


// const AdminProfile = () => {
//   const { user } = useContext(AuthContext);
// console.log(user)
//   return (
//     <div className="max-w-xl mx-auto bg-base-100 p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
//       <div className="space-y-3">
//         <img src={user.photoURL} alt="Admin" className="w-28 h-28 rounded-full" />

//         <p><span className="font-semibold">Name:</span> {user.displayName}</p>
//         <p><span className="font-semibold">Email:</span> {user.email}</p>
//         <p><span className="font-semibold">Role:</span> Admin</p>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;



import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { AuthContext } from "../../context/AuthProvider";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);

  const {
    data: userInfo = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://real-estate-server-gamma.vercel.app/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.photoURL || "https://i.ibb.co/TkYLW7j/user.png"}
          alt="Admin"
          className="w-32 h-32 rounded-full border shadow"
        />
        <h2 className="text-xl font-bold">{userInfo.name}</h2>
        <p className="text-gray-600">{userInfo.email}</p>
        {userInfo.role && (
          <span className="badge badge-accent capitalize">
            Role: {userInfo.role}
          </span>
        )}
        {userInfo.phone && <p>Phone: {userInfo.phone}</p>}
        {userInfo.address && <p>Address: {userInfo.address}</p>}

        <button
          className="btn btn-sm btn-outline btn-accent mt-3"
          onClick={() =>
            document.getElementById("edit_profile_modal").showModal()
          }
        >
          <FaUserEdit className="mr-1" /> Edit Profile
        </button>
      </div>

      <EditProfileModal user={userInfo} refetch={refetch} />
    </div>
  );
};

export default AdminProfile;
