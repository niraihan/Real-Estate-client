// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import {
//     BarChart,
//     Bar,
//     CartesianGrid,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
//     Cell,
// } from "recharts";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { AuthContext } from "../../context/AuthProvider";

// // Custom Bar Shape (rounded top bars)
// const CustomBar = (props) => {
//     const { x, y, width, height, fill } = props;
//     return (
//         <path
//             d={`
//         M${x},${y + height}
//         L${x},${y + 10}
//         Q${x + width / 2},${y} ${x + width},${y + 10}
//         L${x + width},${y + height}
//         Z
//       `}
//             fill={fill}
//         />
//     );
// };

// const SellingStatistics = () => {
//     const { user } = useContext(AuthContext);
//     const [axiosSecure] = useAxiosSecure();

//     const { data: soldProperties = [], isLoading } = useQuery({
//         queryKey: ["agentSoldProperties", user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/sold-properties/agent/${user?.email}`);
//             return res.data;
//         },
//         enabled: !!user?.email,
//     });

//     const chartData = soldProperties.map((property) => ({
//         name: property?.propertyTitle?.slice(0, 15) + "...",
//         price: property?.soldPrice,
//     }));

//     const colors = ["#facc15", "#60a5fa", "#34d399", "#f472b6", "#a78bfa", "#fb923c"];

//     return (
//         <div className="p-5 min-h-[60vh] dark:bg-gray-900 bg-white rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-4 text-center dark:text-white text-gray-800">
//                 Your Selling Statistics
//             </h2>

//             {isLoading ? (
//                 <p className="text-center dark:text-white">Loading...</p>
//             ) : soldProperties.length === 0 ? (
//                 <p className="text-center text-gray-500 dark:text-gray-300">No sold properties yet.</p>
//             ) : (
//                 <ResponsiveContainer width="100%" height={400}>
//                     <BarChart
//                         data={chartData}
//                         margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis
//                             dataKey="name"
//                             tick={{ fill: "#9ca3af" }}
//                             stroke="#d1d5db"
//                             interval={0}
//                             angle={-10}
//                             textAnchor="end"
//                         />
//                         <YAxis tick={{ fill: "#9ca3af" }} stroke="#d1d5db" />
//                         <Tooltip
//                             contentStyle={{ backgroundColor: "#f9fafb", borderRadius: 10, borderColor: "#e5e7eb" }}
//                             labelStyle={{ color: "#374151" }}
//                         />
//                         <Bar
//                             dataKey="price"
//                             shape={<CustomBar />}
//                             label={{ position: "top", fill: "#4b5563", fontSize: 12 }}
//                         >
//                             {chartData.map((_, index) => (
//                                 <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//                             ))}
//                         </Bar>
//                     </BarChart>
//                 </ResponsiveContainer>
//             )}
//         </div>
//     );
// };

// export default SellingStatistics;





import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthProvider";

// Custom colors for pie slices
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28'];

const SellingStatistics = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  // Fetch sold properties for the logged-in agent
  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["agentSoldProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties/agent/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Prepare data for the PieChart
  const chartData = soldProperties.map((property) => ({
    name: property?.propertyTitle?.slice(0, 20) + "...",
    value: property?.soldPrice,
  }));

  return (
    <div className="p-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        📊 Selling Statistics (Pie Chart)
      </h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : soldProperties.length === 0 ? (
        <p className="text-center text-gray-500">No sold properties found.</p>
      ) : (
        <div className="w-full h-[400px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SellingStatistics;
