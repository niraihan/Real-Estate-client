import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import EditProfileModal from "./EditProfileModal";
import useRole from "../../hooks/useRole";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [ role, isLoading ] = useRole(); // ✅ object destructuring

    if (isLoading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    return (
        <>
            <div className="p-6 max-w-xl mx-auto bg-base-100 rounded-xl shadow-lg space-y-4 text-center">
                <img
                    src={user?.photoURL || "https://i.ibb.co/2YjB3Wb/user.png"}
                    alt="User"
                    className="w-24 h-24 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                />
                <h2 className="text-xl font-bold">{user?.displayName || "Unnamed User"}</h2>
                <p className="text-gray-500">{user?.email}</p>

                <span className="badge badge-info mt-2 capitalize">{role}</span>

                <div className="divider" />

                <p className="text-base text-gray-700">
                    Welcome to your profile. You are logged in as a {" "}
                    <span className="font-semibold capitalize">{role}</span>.
                </p>

                {/* ✅ Edit Profile Button */}
                <button
                    onClick={() => document.getElementById("edit_profile_modal").showModal()}
                    className="btn btn-sm btn-info mt-4"
                >
                    Edit Profile
                </button>
            </div>

            {/* ✅ Pass only user to modal for now */}
            <EditProfileModal user={user} />
        </>
    );
};

export default MyProfile;
