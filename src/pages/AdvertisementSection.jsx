import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const AdvertisementSection = () => {
  const { data: ads = [] } = useQuery({
    queryKey: ["advertisedProperties"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/advertised");
       return res.data//.filter(p => p.status !== "sold"); // শুধু unsold
    }

  });

  return (
    <div className="my-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Featured Properties 🏘️</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {ads.map(p => (
          <div key={p._id} className="card bg-base-100 shadow">
            <figure><img src={p.image} alt={p.title} className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
              <h2 className="card-title">{p.title}</h2>
              <p>{p.location}</p>
              <p>💰 ${p.priceMin} - ${p.priceMax}</p>
              {/* <p>Status: {p.verificationStatus}</p> */}
              <p>Buy Status: {p.status === "sold" ? "❌ Sold" : p.verificationStatus}</p>
              <Link to={`/property/${p._id}`} className="btn btn-sm btn-outline mt-2">Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSection;