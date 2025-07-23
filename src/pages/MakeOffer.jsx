import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const MakeOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // ✅ Fetch Property Info
  const { data: property = {} } = useQuery({
    queryKey: ["singleProperty", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/properties/${id}`); //b-455
      return res.data;
    }
  });
console.log(property)
console.log("Fetched ID from URL:", id);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const form = e.target;

  //   const offerAmount = parseFloat(form.offerAmount.value);
  //   const buyingDate = form.buyingDate.value;

  //   // Validation
  //   if (offerAmount < property.priceMin || offerAmount > property.priceMax) {
  //     return toast.error("Offer must be between price range!");
  //   }

  //   const offerData = {
  //     propertyId: id,
  //     propertyTitle: property.title,
  //     propertyLocation: property.location,
  //     propertyImage: property.image,
  //     agentName: property.agentName,
  //     buyerEmail: user.email,
  //     buyerName: user.displayName,
  //     buyerImage: user.photoURL,
  //     offeredAmount: offerAmount,
  //     buyingDate,
  //     status: "pending"
  //   };


  //   const token = localStorage.getItem("access-token");
  //   const res = await axios.post(
  //     "http://localhost:5000/offers",
  //     offerData,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //   );
  //   if (res.data.insertedId) {
  //     toast.success("Offer submitted successfully!");
  //     navigate("/dashboard/property-bought");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const offerAmount = parseFloat(form.offerAmount.value);
    const buyingDate = form.buyingDate.value;

    if (offerAmount < property.priceMin || offerAmount > property.priceMax) {
      return toast.error("Offer must be between price range!");
    }

    const offerData = {
      propertyId: id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      propertyImage: property.image,
      agentName: property.agentName,
      agentEmail:property.agentEmail,
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyerImage: user.photoURL,
      offeredAmount: offerAmount,
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
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.insertedId) {
        toast.success("Offer submitted successfully!");
        navigate("/dashboard/property-bought");
      }
    } catch (error) {
      console.error("Offer submission error:", error.response || error);
      toast.error("Failed to submit offer");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 bg-base-100 rounded shadow my-10">
      <h2 className="text-2xl font-bold mb-6">Make an Offer for 🏠 {property.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" value={property.title} className="input input-bordered" readOnly />
          <input type="text" value={property.location} className="input input-bordered" readOnly />
          <input type="text" value={property.agentName} className="input input-bordered" readOnly />
          <input type="text" value={property.agentEmail} className="input input-bordered" readOnly />
          <input type="text" value={user.displayName} className="input input-bordered" readOnly />
          <input type="email" value={user.email} className="input input-bordered" readOnly />
          <input
            type="number"
            name="offerAmount"
            required
            placeholder={`Offer Amount ($${property.priceMin} - $${property.priceMax})`}
            className="input input-bordered"
          />
        </div>
        <div>
          <label className="label">Buying Date</label>
          <input type="date" name="buyingDate" required className="input input-bordered w-full" />
        </div>
        <button className="btn btn-primary mt-4">Submit Offer</button>
      </form>
    </div>
  );
};

export default MakeOffer;