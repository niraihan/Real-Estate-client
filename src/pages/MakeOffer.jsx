import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const MakeOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Offer Amount & Date → to avoid uncontrolled input warning
  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");

  // ✅ Fetch Property Info
  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["singleProperty", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/properties/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center my-10">Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = parseFloat(offerAmount);
    if (amount < property.priceMin || amount > property.priceMax) {
      return toast.error("Offer must be between price range!");
    }

    const offerData = {
      propertyId: id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      propertyImage: property.image,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyerImage: user.photoURL,
      offeredAmount: amount,
      buyingDate,
      status: "pending",
    };

    try {
      const token = localStorage.getItem("access-token");
      if (!token) {
        toast.error("You must be logged in to make an offer");
        return;
      }

      const res = await axios.post("http://localhost:5000/offers", offerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Offer submitted ");
      navigate("/dashboard/property-bought");
      //-----
      // ✅ Property Update API Call (Sold)
      // if (res.data.insertedId) {
      //   await axios.put(`http://localhost:5000/properties/sold/${id}`, {}, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });

      //   toast.success("Offer submitted & property marked as sold!");
      //   navigate("/dashboard/property-bought");
      // }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit offer");
      console.error("Offer submission error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 bg-base-100 rounded shadow my-10">
      <h2 className="text-2xl font-bold mb-6">Make an Offer for 🏠 {property.title}</h2>

      {property.status === "sold" ? (
        <div className="text-red-600 text-xl font-bold">
          This property is already sold. You cannot make an offer.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" value={property.title || ""} className="input input-bordered" readOnly />
            <input type="text" value={property.location || ""} className="input input-bordered" readOnly />
            <input type="text" value={property.agentName || ""} className="input input-bordered" readOnly />
            <input type="text" value={property.agentEmail || ""} className="input input-bordered" readOnly />
            <input type="text" value={user.displayName || ""} className="input input-bordered" readOnly />
            <input type="email" value={user.email || ""} className="input input-bordered" readOnly />

            <input
              type="number"
              name="offerAmount"
              required
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              placeholder={`Offer Amount ($${property.priceMin} - $${property.priceMax})`}
              className="input input-bordered"
            />
          </div>
          <div>
            <label className="label">Buying Date</label>
            <input
              type="date"
              name="buyingDate"
              required
              value={buyingDate}
              onChange={(e) => setBuyingDate(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button className="btn btn-primary mt-4" type="submit">
            Submit Offer
          </button>
        </form>
      )}
    </div>
  );
};

export default MakeOffer;
