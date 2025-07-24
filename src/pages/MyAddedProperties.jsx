// import { useContext } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";

// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthProvider";

// const MyAddedProperties = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   // Fetch properties added by agent
//   const { data: properties = [], isLoading } = useQuery({
//     queryKey: ["myProperties", user?.email],
//     queryFn: async () => {
//       // const res = await axios.get(`http://localhost:5000/properties/agent/${user.email}`);
//       const res = await axios.get(
//         `http://localhost:5000/properties/agent/${user.email}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access-token")}`,
//           },
//         }
//       );
//       return res.data;
//     },
//   });

//   // Delete mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       return await axios.delete(`http://localhost:5000/properties/${id}`);
//     },
//     onSuccess: () => {
//       toast.success("Property deleted successfully");
//       queryClient.invalidateQueries(["myProperties"]);
//     },
//     onError: () => {
//       toast.error("Failed to delete property");
//     },
//   });

//   if (isLoading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="max-w-7xl mx-auto py-10 px-4">
//       <h2 className="text-3xl font-bold mb-6">My Added Properties</h2>

//       {properties.length === 0 ? (
//         <p className="text-center text-gray-500">You have not added any properties yet.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {properties.map((property) => (
//             <div key={property._id} className="card bg-base-100 shadow border rounded overflow-hidden">
//               <img
//                 src={property.image || "https://via.placeholder.com/400x250"}
//                 alt={property.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg">{property.title}</h3>
//                 <p className="text-sm text-gray-600">{property.location}</p>
//                  <img
//                   src={property.agentImage || "Agent Image"}
//                   alt={property.agentName}
//                   className="w-12 h-12 mt-2 rounded-full mr-4"
//                 />
//                 <p className="mt-2">
//                   <span className="font-semibold">Price:</span> ${property.priceMin} - ${property.priceMax}
//                 </p>
//                 <p className="mt-1">
//                   <span className="font-semibold">Status:</span>{" "}
//                   <span
//                     className={
//                       property.verificationStatus === "verified"
//                         ? "text-green-600"
//                         : property.verificationStatus === "pending"
//                           ? "text-yellow-600"
//                           : "text-red-600"
//                     }
//                   >
//                     {property.verificationStatus.charAt(0).toUpperCase() +
//                       property.verificationStatus.slice(1)}
//                   </span>
//                 </p>

//                 <div className="mt-4 flex gap-2">
//                   {/* Update button visible only if status != rejected */}
//                   {property.verificationStatus !== "rejected" && (
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => navigate(`/dashboard/update-property/${property._id}`)}
//                     >
//                       Update
//                     </button>
//                   )}
//                   <button
//                     className="btn btn-sm btn-error"
//                     onClick={() => {
//                       if (window.confirm("Are you sure to delete this property?")) {
//                         deleteMutation.mutate(property._id);
//                       }
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAddedProperties;



import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const MyAddedProperties = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["myProperties", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/properties/agent/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`http://localhost:5000/properties/${id}`);
    },
    onSuccess: () => {
      toast.success("Property deleted successfully");
      queryClient.invalidateQueries(["myProperties"]);
    },
    onError: () => {
      toast.error("Failed to delete property");
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Added Properties</h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          You have not added any properties yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div
              key={property._id}
              className="card bg-base-100 shadow-lg border rounded-xl flex flex-col"
            >
              <figure className="w-full h-48 overflow-hidden">
                <img
                  src={property.image || "https://via.placeholder.com/400x250"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="flex-1 flex flex-col justify-between p-4">
                <div>
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{property.location}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <img
                      src={property.agentImage || "https://via.placeholder.com/40"}
                      alt={property.agentName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <p className="text-sm font-medium">{property.agentName}</p>
                  </div>

                  <p className="mt-3 text-sm">
                    <span className="font-semibold">Price:</span> ${property.priceMin} - ${property.priceMax}
                  </p>

                  <p className="mt-1 text-sm">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={
                        property.status === "verified"
                          ? "text-green-600 font-medium"
                          : property.status === "pending"
                            ? "text-yellow-600 font-medium"
                            : "text-red-600 font-medium"
                      }
                    >
                      {property.verificationStatus.charAt(0).toUpperCase() +
                        property.verificationStatus.slice(1)}
                    </span>
                  </p>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  {property.status !== "rejected" && property.status !== "sold" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/dashboard/update-property/${property._id}`)}
                    >
                      Update
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => {
                      if (window.confirm("Are you sure to delete this property?")) {
                        deleteMutation.mutate(property._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedProperties;

