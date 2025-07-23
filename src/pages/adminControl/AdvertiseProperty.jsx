import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdvertiseProperty = () => {
  const queryClient = useQueryClient();
  const [axiosSecure] = useAxiosSecure();


  // fetch only verified properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/advertise");
      return res.data;
    },
  });

  const advertiseMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/admin/advertise/${id}`);
    },
    onSuccess: () => {
      toast.success("Property Advertised");
      queryClient.invalidateQueries(["verifiedProperties"]);
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Advertise Verified Properties</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price Range</th>
              <th>Agent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p._id}>
                <td>
                  <img src={p.image} alt="property" className="w-16 h-12 rounded object-cover" />
                </td>
                <td>{p.title}</td>
                <td>${p.priceMin} - ${p.priceMax}</td>
                <td>{p.agentName}</td>
                <td>
                  {p.advertised ? (
                    <button
                      onClick={() => advertiseMutation.mutate(p._id)}
                      className="btn btn-xs btn-warning"
                    >
                      Unadvertise
                    </button>
                  ) : (
                    <button
                      onClick={() => advertiseMutation.mutate(p._id)}
                      className="btn btn-xs btn-info"
                    >
                      Advertise
                    </button>
                  )}
                  {/* {p.advertised ? (
                    <span className="badge badge-success">Advertised</span>
                  ) : (
                    <button
                      onClick={() => advertiseMutation.mutate(p._id)}
                      className="btn btn-xs btn-info"
                    >
                      Advertise
                    </button>
                  )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseProperty;