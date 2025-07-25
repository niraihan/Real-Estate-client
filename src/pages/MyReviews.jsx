import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch user reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://real-estate-server-gamma.vercel.app/reviews/user/${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`
        }
      });
      return res.data;

    }
  });
  // console.log(reviews)

  // Mutation to delete review
  const deleteMutation = useMutation({
  mutationFn: async (id) => {
    return await axios.delete(`https://real-estate-server-gamma.vercel.app/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });
  },
  onSuccess: () => {
    toast.success("Review deleted successfully");
    queryClient.invalidateQueries(["myReviews"]);
  },
  onError: () => {
    toast.error("Failed to delete review");
  },
});


  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">You have not added any reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow border p-4">
              <div className="flex items-center mb-3">
                <img
                  src={review.userImage || "https://via.placeholder.com/50"}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{review.userName}</h3>
                  <p className="text-sm text-gray-500">{new Date(review.time).toLocaleString()}</p>
                </div>
              </div>
              <p className="mb-2">
                <span className="font-semibold">Property:</span> {review.propertyTitle}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Agent:</span> {review.agentName}
              </p>
              <p className="mb-4">{review.review}</p>
              <button
                onClick={() => deleteMutation.mutate(review._id)}
                className="btn btn-sm btn-error"
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;