// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar'; 
// import useRole from '../hooks/useRole';
// // import useAuth from '../hooks/useAuth';


// const Dashboard = () => {
//   // const { user } = useAuth(); 
//   const [ role, isLoading ] = useRole(); // 'admin', 'agent', 'user'
// // console.log(role)
//   if (isLoading) return <div className="text-center mt-10">Loading Dashboard...</div>;

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar role={role} />
//       <div className="flex-1 p-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useRole from "../hooks/useRole";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole(); // 'user' | 'agent' | 'admin'

  // Dynamic title
  useTitle(`${role?.toUpperCase() || "Dashboard"} - Real Estate Platform`);

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200 text-base-content">
      {/* ✅ Drawer toggle for small screen */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* ✅ Top Navbar for small screen */}
        <div className="w-full sticky top-0 z-50 bg-base-100 shadow-md px-4 py-3 flex justify-between items-center lg:hidden">
          <label htmlFor="dashboard-drawer" className="btn btn-outline btn-sm drawer-button">
            ☰ Menu
          </label>
          <span className="text-lg font-semibold">
            {role?.toUpperCase()} Dashboard
          </span>
        </div>

        {/* ✅ Main content area */}
        <div className="p-4 max-w-7xl mx-auto w-full">
          <div className="bg-base-100 shadow-lg rounded-2xl p-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* ✅ Sidebar area */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <Sidebar role={role} />
      </div>
    </div>
  );
};

export default DashboardLayout;
