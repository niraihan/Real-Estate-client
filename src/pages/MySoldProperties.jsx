import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";


const MySoldProperties = () => {
    const { user } = useContext(AuthContext);

    const { data: soldProperties = [], isLoading } = useQuery({
        queryKey: ["mySoldProperties", user?.email],
        queryFn: async () => {
            // const res = await axios.get(`https://real-estate-server-gamma.vercel.app/sold-properties/agent/${user.email}`);
            const res = await axios.get(
                `https://real-estate-server-gamma.vercel.app/sold-properties/agent/${user.email}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
                    },
                }
            );

            return res.data;
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    // Calculate total sold amount
    const totalSoldAmount = soldProperties.reduce((sum, item) => sum + item.soldPrice, 0);

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold mb-6">My Sold Properties</h2>

            {soldProperties.length === 0 ? (
                <p className="text-center text-gray-500">You have no sold properties yet.</p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Property Title</th>
                                    <th>Location</th>
                                    <th>Buyer Email</th>
                                    <th>Buyer Name</th>
                                    <th>Sold Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {soldProperties.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.propertyTitle}</td>
                                        <td>{item.propertyLocation}</td>
                                        <td>{item.buyerEmail}</td>
                                        <td>{item.buyerName}</td>
                                        <td>${item.soldPrice.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 text-right font-semibold text-lg">
                        Total Sold Amount: <span className="text-primary">${totalSoldAmount.toLocaleString()}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default MySoldProperties;