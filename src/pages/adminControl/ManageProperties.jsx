import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const ManageProperties = () => {
  const queryClient = useQueryClient();

  // Fetch all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["allProperties"],
    queryFn: async () => {
      // const res = await axios.get("https://real-estate-server-gamma.vercel.app/admin/properties");
      const res = await axios.get("https://real-estate-server-gamma.vercel.app/admin/properties", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`
        }
      });


      return res.data;
    },
  });

 // Verify Mutation
const verifyMutation = useMutation({
  mutationFn: async (id) => {
    return await axios.patch(
      `https://real-estate-server-gamma.vercel.app/admin/properties/verify/${id}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    );
  },
  onSuccess: () => {
    toast.success("Property verified");
    queryClient.invalidateQueries(["allProperties"]);
  },
});

// Reject Mutation
const rejectMutation = useMutation({
  mutationFn: async (id) => {
    return await axios.patch(
      `https://real-estate-server-gamma.vercel.app/admin/properties/reject/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    );
  },
  onSuccess: () => {
    toast.success("Property rejected");
    queryClient.invalidateQueries(["allProperties"]);
  },
});

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Properties</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Agent</th>
            <th>Price Range</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>{p.location}</td>
              <td>
                {p.agentName}
                <br />
                <span className="text-sm text-gray-500">{p.agentEmail}</span>
              </td>
              <td>
                ${p.priceMin} - ${p.priceMax}
              </td>
              <td>
                <span className={`badge ${p.status === 'verified' ? 'badge-success' : p.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                  {p.status}
                </span>
              </td>
              <td>
                {p.verificationStatus === "pending" && (
                  <>
                    <button
                      onClick={() => verifyMutation.mutate(p._id)}
                      className="btn btn-xs btn-success mr-2"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(p._id)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
                  </>
                )}
                {(p.status === "verified" || p.status === "rejected") && <span className="italic">{p.status}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperties;