import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider"; // পথ মিলিয়ে নাও

const EditProfileModal = ({ user, refetch }) => {
  // user = DB থেকে আসা ইউজার অবজেক্ট (name, email, photoURL, phone, address, role ইত্যাদি)
  const { updateUserInfo, userInfo } = useContext(AuthContext);

  // react-hook-form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name || "",
      photoURL: user?.photoURL || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  // যখন parent থেকে user প্রপ বদলাবে, ফর্মও আপডেট হবে
  useEffect(() => {
    reset({
      name: user?.name || "",
      photoURL: user?.photoURL || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
  }, [user, reset]);

  // ফর্ম সাবমিট b-115
  const onSubmit = async (data) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/users/update/${user?.email}`,
        data
      );

      if (res.data?.modifiedCount > 0) {
        toast.success("Profile updated!");

        // ✅ Context + localStorage real-time আপডেট
        const updated = {
          ...userInfo, // আগের যেটা ছিল
          ...user,     // প্রপ থেকে আসা DB ইউজার (যদি কিছু থাকে)
          ...data,     // নতুন ফর্ম ডেটা
        };
        updateUserInfo(updated);

        // ✅ মডাল বন্ধ
        document.getElementById("edit_profile_modal").close();

        // ✅ সার্ভার ডেটা sync করতে refetch
        if (refetch) refetch();
      } else {
        toast("No changes detected.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  return (
    <dialog id="edit_profile_modal" className="modal">
      <div className="modal-box bg-base-100 text-base-content">
        <h3 className="font-bold text-lg mb-4">Edit Your Profile</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            {...register("name")}
            placeholder="Your Name"
            className="input input-bordered w-full"
          />

          {/* Email (read-only / disabled) */}
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />

          {/* Photo URL */}
          <input
            type="text"
            {...register("photoURL")}
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />

          {/* Phone */}
          <input
            type="text"
            {...register("phone")}
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />

          {/* Address */}
          <input
            type="text"
            {...register("address")}
            placeholder="Address"
            className="input input-bordered w-full"
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("edit_profile_modal").close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditProfileModal;
