import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const RequestedProperties = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch offers for agent's properties
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["requestedOffers", user?.email],
    queryFn: async () => {

      const token = localStorage.getItem("access-token"); //b-255
      const res = await axios.get(
        `https://real-estate-server-gamma.vercel.app/offers/agent/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });
  console.log(offers)
  // Accept offer mutation
  const acceptMutation = useMutation({
    mutationFn: async (offerId) => {
      const token = localStorage.getItem("access-token");
      return await axios.put(
        `https://real-estate-server-gamma.vercel.app/offers/accept/${offerId}`,
        { agentEmail: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Offer accepted successfully");
      queryClient.invalidateQueries(["requestedOffers"]);
    },
    onError: () => {
      toast.error("Failed to accept offer");
    },
  });

  // Reject offer mutation
  const rejectMutation = useMutation({
    mutationFn: async (offerId) => {
      const token = localStorage.getItem("access-token");
      return await axios.put(
        `https://real-estate-server-gamma.vercel.app/offers/reject/${offerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Offer rejected successfully");
      queryClient.invalidateQueries(["requestedOffers"]);
    },
    onError: () => {
      toast.error("Failed to reject offer");
    },
  });


  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Requested / Offered Properties</h2>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500">No offers received yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Property Title</th>
                <th>Location</th>
                <th>Buyer Email</th>
                <th>Buyer Name</th>
                <th>Offered Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer._id}>
                  <td>{offer.propertyTitle}</td>
                  <td>{offer.propertyLocation}</td>
                  <td>{offer.buyerEmail}</td>
                  <td>{offer.buyerName}</td>
                  {/* <td>${offer.offeredAmount.toLocaleString()}</td> */}
                  <td>
                    {typeof offer.offeredAmount === "number"
                      ? `$${offer.offeredAmount.toLocaleString()}`
                      : "N/A"}
                  </td>
                  <td>
                    {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                  </td>
                  <td>
                    {offer.status === "pending" && (
                      <>
                        <button
                          className="btn btn-xs btn-success mr-2"
                          onClick={() => acceptMutation.mutate(offer._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => rejectMutation.mutate(offer._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {(offer.status === "accepted" || offer.status === "rejected") && (
                      <span className="italic">{offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestedProperties;