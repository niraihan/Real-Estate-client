import { useQuery } from "@tanstack/react-query";

const LatestReviewSection = () => {
  const { data: reviews = [] } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/latest/reviews");
      return res.json();
    }
  
  });
console.log(reviews)
  return (
    <div className="my-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Latest Reviews 🌟</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(review => (
          <div key={review._id} className="card bg-base-100 border p-4 shadow">
            <div className="flex items-center gap-3 mb-2">
              <img src={review.userImage} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold">{review.userName}</p>
                <p className="text-sm text-gray-500">{review.propertyTitle}</p>
              </div>
            </div>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviewSection;