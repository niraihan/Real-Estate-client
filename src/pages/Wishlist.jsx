import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Wishlist fetch
  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const token = localStorage.getItem("access-token");  
      const res = await axios.get(`https://real-estate-server-gamma.vercel.app/wishlist/${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    }
  });


  // ✅ Delete mutation
  const mutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("access-token");
      const res = await axios.delete(`https://real-estate-server-gamma.vercel.app/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries(["wishlist", user?.email]);
    }
  });


  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">My Wishlist 🧡</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">No properties in wishlist</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((property) => (
            <div key={property._id} className="card bg-base-100 shadow border">
              <figure>
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{property.title}</h2>
                <p>📍 {property.location}</p>
                <div className="flex items-center gap-3">
                  <img src={property.agentImage} className="w-10 h-10 rounded-full" />
                  <p>{property.agentName}</p>
                </div>
                <p>💰 ${property.priceMin} - ${property.priceMax}</p>
                <p>Status: <span className="text-green-600">{property.verificationStatus}</span></p>
                <div className="flex gap-2 mt-3">
                  <Link to={`/dashboard/make-offer/${property.propertyId}`} className="btn btn-outline btn-sm">
                    Make an Offer
                  </Link>
                  <button
                    onClick={() => mutation.mutate(property._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;