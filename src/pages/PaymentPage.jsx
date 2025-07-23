import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_API_STRIPE_PK_KEY); // Replace with your Stripe publishable key

const CheckoutForm = ({ offer }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [processing, setProcessing] = useState(false);

  const mutation = useMutation({

    mutationFn: async (paymentInfo) => {
      const token = localStorage.getItem("access-token"); // ✅ তোমার JWT token
      return await axios.patch(
        `http://localhost:5000/offers/${offer._id}/pay`,
        paymentInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    // mutationFn: async (paymentInfo) => {
    //   return await axios.patch(`http://localhost:5000/offers/${offer._id}/pay`, paymentInfo);
    // },
    onSuccess: () => {
      toast.success("Payment successful!");
      queryClient.invalidateQueries(["userOffers"]);
      navigate("/dashboard/property-bought");
    },
    onError: () => {
      toast.error("Payment failed, try again.");
      setProcessing(false);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card
    });
    // console.log(paymentMethod)
    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    // Simulate payment process (in real case, create PaymentIntent server-side)
    const paymentInfo = {
      transactionId: paymentMethod.id,
      status: "bought"
    };

    mutation.mutate(paymentInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-base-100 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Pay for {offer.propertyTitle}</h2>
      <p className="mb-4">Amount to pay: <strong>${offer.offeredAmount}</strong></p>

      <CardElement className="p-3 border rounded mb-4" options={{ hidePostalCode: true }} />

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary w-full"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const { offerId } = useParams();


  const { data: offer, isLoading } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/offers/single/${offerId}`);
      return res.data;
    }
  });
  // console.log('Offer ID:', offerId); //b-315

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!offer) return <p className="text-center mt-10">Offer not found</p>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm offer={offer} />
    </Elements>
  );
};

export default PaymentPage;