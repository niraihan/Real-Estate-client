import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageReviews = () => {
  const queryClient = useQueryClient();
  const [axiosSecure] = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reviews"); // ✅ now works!
      return res.data;
    },
  });
  // console.log("Reviews =>", reviews);

  // const { data: reviews = [], isLoading } = useQuery({
  //   queryKey: ["allReviews"],
  //   queryFn: async () => {
  //     const res = await axios.get("http://localhost:5000/admin/reviews");
  //     return res.data;
  //   },
  // });

  const deleteReview = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/admin/reviews/${id}`);
    },
    onSuccess: () => {
      toast.success("Review deleted");
      queryClient.invalidateQueries(["allReviews"]);
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage All Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-base-100 p-4 rounded shadow space-y-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={review.userImage}
                alt={review.userImage}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-bold">{review.userName}</p>
                <p className="text-sm text-gray-500">{review.userEmail}</p>
              </div>
            </div>
            <p className="text-sm">
              <span className="font-semibold">Property:</span>{" "}
              {review.propertyTitle}
            </p>
            <p>{review.review}</p>
            <button
              onClick={() => deleteReview.mutate(review._id)}
              className="btn btn-sm btn-error"
            >
              Delete Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;