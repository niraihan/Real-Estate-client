import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const LatestReviewSection = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(4);
  const { user } = useContext(AuthContext);
// console.log(user)
  const { data: reviews = [] } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/latest/reviews");
      return res.json();
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to submit a review");
      return;
    }
    // const review = {
    //   userName: user.displayName || "User",
    //   userImage: user.photoURL || "https://i.ibb.co/YTjt2Lp/avater.jpg",
    //   propertyTitle: user.propertyTitle || "Luxury Apartment", 
    //   review: reviewText,
    //   rating: rating,
    // };

    try {
      await axios.post("http://localhost:5000/reviews", review, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowModal(false);
      setReviewText("");
      setRating(4);
      queryClient.invalidateQueries(["latestReviews"]);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!reviews.length) return null;

  return (
    <div className="my-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-6 text-secondary">
        Latest Reviews 🌟
      </h2>

      {/* Review Button */}
      {/* <div className="text-center mb-10">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary btn-sm"
        >
          Write a Review ✍️
        </button>
      </div> */}

      {/* Modal */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Submit Your Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>

              {/* ⭐ Rating Input */}
              <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={rating === i}
                    onChange={() => setRating(i)}
                  />
                ))}
              </div>

              <div className="modal-action flex justify-between">
                <button
                  type="submit"
                  className="btn btn-success btn-sm"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-error btn-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* All Reviews */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="card border border-base-200 bg-base-100 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="card-body space-y-3">
              <div className="flex items-center gap-4">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                />
                <div>
                  <p className="font-bold text-base-content">{review.userName}</p>
                  <p className="text-sm text-base-content/70">{review.propertyTitle}</p>
                </div>
              </div>

              {/* ⭐ Rating */}
              <div
                className="rating rating-sm tooltip"
                data-tip={`Rated ${review.rating || 4} Stars`}
              >
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

              <div className="divider my-2"></div>

              <p className="text-sm text-base-content leading-relaxed">
                {review.review.length > 200
                  ? review.review.slice(0, 200) + "..."
                  : review.review}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviewSection;
