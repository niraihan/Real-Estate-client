// import React from "react";
// import { Outlet, Link } from "react-router-dom";
// import useAuth from "../hooks/useAuth";



// const AgentDashboardLayout = () => {
//   const { user } = useAuth();

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Sidebar */}
//       <aside className="bg-base-200 w-full md:w-64 p-4">
//         <h2 className="text-xl font-bold mb-4">Agent Dashboard</h2>
//         <ul className="space-y-2">
//           <li><Link to="/dashboard/profile">Agent Profile</Link></li>
//           <li><Link to="/dashboard/add-property">Add Property</Link></li>
//           <li><Link to="/dashboard/my-added-properties">My Added Properties</Link></li>
//           <li><Link to="/dashboard/my-sold-properties">My Sold Properties</Link></li>
//           <li><Link to="/dashboard/requested-properties">Requested Properties</Link></li>
//           {/* <li><Link to="/dashboard/selling-stats">Selling Statistics</Link></li> */}
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AgentDashboardLayout;
