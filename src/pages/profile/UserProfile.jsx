import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { AuthContext } from "../../context/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
console.log(user)
  const {
    data: userInfo = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
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
          src={userInfo.photoURL || "https://i.ibb.co/TkYLW7j/user.png"}
          alt="User"
          className="w-32 h-32 rounded-full border shadow"
        />
        <h2 className="text-xl font-bold">{userInfo.name}</h2>
        <p className="text-gray-600">{userInfo.email}</p>
        {userInfo.role && (
          <span className="badge badge-info capitalize">
            Role: {userInfo.role}
          </span>
        )}
        {userInfo.phone && <p>Phone: {userInfo.phone}</p>}
        {userInfo.address && <p>Address: {userInfo.address}</p>}

        <button
          className="btn btn-sm btn-outline btn-primary mt-3"
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

export default UserProfile;
