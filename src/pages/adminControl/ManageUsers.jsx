import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // আপনার প্রকল্প অনুসারে পথ ঠিক করুন

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [axiosSecure] = useAxiosSecure();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Update user role mutation
  const updateRole = useMutation({
    mutationFn: async ({ id, role }) => {
      return await axiosSecure.patch(`/users/${id}`, { role });
    },
    onSuccess: () => {
      toast.success("Role updated successfully");
      queryClient.invalidateQueries(["allUsers"]);
    },
    onError: () => {
      toast.error("Failed to update role");
    },
  });

  // Mark user as fraud mutation
  const markFraud = useMutation({
    mutationFn: async (id) => {
     
      return await axiosSecure.patch(`/users/fraud/${id}`);
    },
    onSuccess: () => {
      toast.success("User marked as fraud");
      queryClient.invalidateQueries(["allUsers"]);
    },
    onError: () => {
      toast.error("Failed to mark user as fraud");
    },
  });

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: async ({ id, email }) => {
      return await axiosSecure.delete(`/users/${id}?email=${email}`);
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries(["allUsers"]);
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Fraud Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="capitalize">{user.role}</td>
              <td>
                {user.isFraud ? (
                  <span className="badge badge-error">Fraud</span>
                ) : (
                  "—"
                )}
              </td>
              <td className="space-x-2">
                {!user.isFraud && user.role !== "admin" && (
                  <>
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() =>
                        updateRole.mutate({ id: user._id, role: "admin" })
                      }
                    >
                      Make Admin
                    </button>
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() =>
                        updateRole.mutate({ id: user._id, role: "agent" })
                      }
                    >
                      Make Agent
                    </button>
                  </>
                )}
                {user.role === "agent" && !user.isFraud && (
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => markFraud.mutate(user._id)}
                  >
                    Mark as Fraud
                  </button>
                )}
                <button
                  className="btn btn-xs btn-error"
                  onClick={() =>
                    deleteUser.mutate({ id: user._id, email: user.email })
                  }
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
