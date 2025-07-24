import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PropertyBought = () => {
  const { user } = useContext(AuthContext);

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["userOffers", user?.email],
    queryFn: async () => {
      const token = localStorage.getItem("access-token");
      const res = await axios.get(`http://localhost:5000/offers/${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">My Property Offers</h2>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t made any offers yet</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((item) => (
            <div key={item._id} className="card bg-base-100 border shadow">
              <figure>
                <img src={item.propertyImage} alt={item.title} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.propertyTitle}</h2>
                <p>📍 {item.propertyLocation}</p>
                <p>Agent: {item.agentName}</p>
                <p>💵 Offered: ${item.offeredAmount}</p>
                <p>Status:
                  <span className={`font-semibold ${item.status === 'pending' ? 'text-yellow-500' : item.status === 'accepted' ? 'text-green-600' : 'text-blue-600'}`}>
                    {item.status}
                  </span>
                </p>

                {item.status === "accepted" && !item.transactionId && (
                  <Link to={`/dashboard/payment/${item._id}`} className="btn btn-sm btn-primary mt-2">
                    Pay Now
                  </Link>
                )}

                {item.status === "bought" && (
                  <p className="text-sm mt-2">
                    ✅ Transaction ID: <span className="font-mono">{item.transactionId}</span>
                  </p>
                )}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default PropertyBought;
