import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllProperties = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const {
    data: properties = [],
    refetch,
  } = useQuery({
    queryKey: ["allProperties"],
    queryFn: async () => {
      const res = await axios.get(
        `https://real-estate-server-gamma.vercel.app/properties?search=${search}&sort=${sortOrder}`
      );
      return res.data.filter(
        (p) => p.status === "verified" || p.status === "sold"
      ); //eikhane verifi O sold reject item gulo filter korchi ..aikhan ami vukkori
    },
  });

  // ✅ search বা sortOrder পরিবর্তন হলে refetch
  useEffect(() => {
    refetch();
  }, [search, sortOrder, refetch]);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-4">All Verified Properties</h2>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by location"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      {/* Property Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property._id} className="card bg-base-100 shadow border">
            <figure>
              <img
                src={property.image}
                alt={property.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{property.title}</h2>
              <p>📍 {property.location}</p>
              <div className="flex items-center gap-3">
                <img
                  src={property.agentImage}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <p>{property.agentName}</p>
              </div>
              <p>
                💰 ${property.priceMin} - ${property.priceMax}
              </p>
              <p className="flex items-center gap-1">
                {property.status === "sold" ? (
                  <>
                    ❌{" "}
                    <span className="text-red-600 capitalize">
                      {property.status}
                    </span>
                  </>
                ) : property.status === "verified" ? (
                  <>
                    ✅{" "}
                    <span className="text-green-600 capitalize">
                      {property.status}
                    </span>
                  </>
                ) : (
                  <>
                    ⚠️{" "}
                    <span className="text-yellow-600 capitalize">
                      {property.status}
                    </span>
                  </>
                )}
              </p>
              <Link
                to={`/property/${property._id}`}
                className="btn btn-sm btn-outline mt-2"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
