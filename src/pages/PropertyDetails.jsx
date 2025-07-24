import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";

import toast from "react-hot-toast";
import ReviewModal from "./ReviewModal";
import { AuthContext } from "../context/AuthProvider";
import useTitle from "../hooks/useTitle";

const PropertyDetails = () => {


  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch property by ID
  const { data: property = {}, refetch } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/properties/${id}`);
      return res.data;
    }
  });

  useTitle(property?.title ? `Details of ${property.title}` : "Property Details");

  // ✅ Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["propertyReviews", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/reviews/${id}`);
      return res.data;
    }
  });
  console.log(reviews)

  // ✅ Wishlist handler
  const handleAddToWishlist = async () => {
    const wishlistData = {
      propertyId: id,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      title: property.title,
      image: property.image,
      location: property.location,
      priceMin: property.priceMin,
      priceMax: property.priceMax,
      agentName: property.agentName,
      agentImage: property.agentImage,
      verificationStatus: property.verificationStatus
    };

    try {
      const token = localStorage.getItem("access-token"); // আপনার টোকেন এখানে রাখুন 

      const res = await axios.post("http://localhost:5000/wishlist", wishlistData, {
        headers: {
          Authorization: `Bearer ${token}`,  // ✨ এখানে টোকেন যুক্ত করুন b-149
        }
      });

      if (res.data.insertedId) {
        toast.success("✅ Added to Wishlist");
      } else {
        toast.error("❌ Already in wishlist");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // ✅ Report handler
  const handleReport = async (e) => {
    e.preventDefault();
    const description = e.target.description.value;

    const report = {
      propertyId: property._id,
      propertyTitle: property.title,
      agentName: property.agentName,
      reporterName: user?.displayName,
      reporterEmail: user?.email,
      reportDescription: description,
      timestamp: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:5000/report-property", report);
      if (res.data.insertedId) {
        toast.success("✅ Report submitted");
        document.getElementById("report_modal").close();
      }
    } catch (err) {
      toast.error("❌ Failed to report");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 bg-base-100 text-base-content">
      <div className="grid md:grid-cols-2 gap-10">
        <img src={property.image} className="w-full h-96 object-cover rounded" />
        <div>
          <h2 className="text-3xl font-bold">{property.title}</h2>
          <p className="text-gray-500 my-2">{property.location}</p>
          <p className="mb-2">{property.description}</p>
          <p className="mb-2">💰 Price: ${property.priceMin} - ${property.priceMax}</p>
          <div className="flex items-center gap-3">
            <img src={property.agentImage} className="w-10 h-10 rounded-full" />
            <p>Agent: {property.agentName}</p>
          </div>
          <p className="mt-2">Status: {property.verificationStatus}</p>

          {/* Add to Wishlist Button */}
          <button onClick={handleAddToWishlist} className="btn btn-outline btn-sm mt-4">
            ❤️ Add to Wishlist
          </button>

          {/* Report Button */}
          <button
            onClick={() => document.getElementById("report_modal").showModal()}
            className="btn btn-sm btn-error mt-4 ml-4"
          >
            🚫 Report this Property
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-base-content">User Reviews</h3>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-sm btn-primary">
            ➕ Add a Review
          </button>
        </div>

        {reviews.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="card border border-base-200 bg-base-100 shadow hover:shadow-md transition-all duration-200"
              >
                <div className="card-body space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                    />
                    <div>
                      <p className="font-semibold text-base-content">{review.userName}</p>
                      <p className="text-xs text-base-content/60">{new Date(review.time).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* ⭐ Rating */}
                  <div className="rating rating-sm">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <input
                        key={i}
                        type="radio"
                        name={`rating-${review._id}`}
                        className="mask mask-star-2 bg-orange-400"
                        checked={i === Math.round(review.rating || 4)}
                        readOnly
                      />
                    ))}
                  </div>

                  <p className="text-sm text-base-content leading-relaxed">
                    {review.review.length > 300
                      ? review.review.slice(0, 300) + "..."
                      : review.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base-content/60">No reviews yet.</p>
        )}
      </div>


      {/* Review Modal */}
      {isModalOpen && (
        <ReviewModal
          propertyId={id}
          user={user}
          agentEmail={property.agentEmail} 
          agentName={property.agentName}  
          onClose={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}

      {/* Report Modal */}
      <dialog id="report_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Report This Property</h3>
          <form onSubmit={handleReport}>
            <textarea
              name="description"
              required
              placeholder="Write your reason here..."
              className="textarea textarea-bordered w-full mb-4"
            />
            <div className="modal-action">
              <button type="submit" className="btn btn-error">Submit Report</button>
              <button type="button" className="btn" onClick={() => document.getElementById("report_modal").close()}>Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default PropertyDetails;
