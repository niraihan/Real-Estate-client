import axios from "axios";
import toast from "react-hot-toast";

const ReviewModal = ({ propertyId, user, onClose, refetch }) => {
  const handleReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reviewText = form.review.value;

    const review = {
      propertyId,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      review: reviewText,
      propertyTitle: form.propertyTitle.value,
      time: new Date().toLocaleString()
    };

    try {
      const token = localStorage.getItem("access-token"); // আপনার JWT টোকেন নিন আমি ভুল করি 

      const res = await axios.post("http://localhost:5000/reviews", review, {
        headers: {
          Authorization: `Bearer ${token}`, // হেডারে টোকেন যোগ করুন
        },
      });

      if (res.data.insertedId) {
        toast.success("✅ Review Added");
        onClose();
        refetch();
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <form
        onSubmit={handleReview}
        className="bg-base-100 text-base-content p-6 rounded w-96 shadow-md space-y-3"
      >
        <h2 className="text-xl font-bold">Add a Review</h2>
        <input type="hidden" name="propertyTitle" value="Property" />
        <textarea
          name="review"
          className="textarea textarea-bordered w-full"
          placeholder="Your review"
          required
        />
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onClose} className="btn btn-sm">Cancel</button>
          <button type="submit" className="btn btn-sm btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;