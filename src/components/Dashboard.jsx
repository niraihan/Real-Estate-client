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

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole(); // 'user' | 'agent' | 'admin'

  return (
    <div className="drawer lg:drawer-open">
      {/* ✅ Drawer toggle for small screen */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* ✅ Top navbar (Mobile) */}
        <div className="w-full bg-base-300 p-4 flex justify-between lg:hidden">
          <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button">
            ☰
          </label>
          <span className="text-lg font-bold">{role?.toUpperCase()} Dashboard</span>
        </div>

        {/* ✅ Main content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* ✅ Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <Sidebar role={role} />
      </div>
    </div>
  );
};

export default DashboardLayout;
