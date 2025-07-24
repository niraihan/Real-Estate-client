import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const AdvertisementSection = () => {
  const { data: ads = [] } = useQuery({
    queryKey: ["advertisedProperties"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/advertised");
      return res.data;
    }
  });

  if (!ads.length) return null;

  return (
    <div className="my-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">
        Featured Properties 🏘️
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ads.map(p => (
          <div
            key={p._id}
            className="card shadow-xl bg-base-100 border border-base-200 hover:shadow-2xl transition-all duration-300"
          >
            <figure className="h-48 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </figure>
            <div className="card-body space-y-2">
              <h2 className="card-title text-lg font-semibold">{p.title}</h2>
              <p className="text-sm text-base-content/80">{p.location}</p>
              <p className="text-sm">
                💰 <span className="font-medium">${p.priceMin}</span> - <span className="font-medium">${p.priceMax}</span>
              </p>
              <p className="text-sm">
                Buy Status:{" "}
                {p.status === "sold" ? (
                  <span className="text-error font-semibold">❌ Sold</span>
                ) : (
                  <span className="text-success font-medium">{p.verificationStatus}</span>
                )}
              </p>
              <Link
                to={`/property/${p._id}`}
                className="btn btn-sm btn-outline btn-primary mt-3"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSection;
