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
//     <div className="flex flex-col justify-center items-center md:justify-start md:items-start md:flex-row md:min-h-screen">
//       <Sidebar role={role} />
//       <div className="flex-1 p-2">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import useRole from '../hooks/useRole';
import { FaBars } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, isLoading] = useRole();

  if (isLoading) return <div className="text-center mt-10">Loading Dashboard...</div>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Toggle Button for small devices */}
      <div className="md:hidden flex justify-between items-center p-4 bg-base-200 ">
        <h2 className="text-xl font-bold">{role?.toUpperCase()} Dashboard</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed z-50 md:relative md:translate-x-0 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:flex`}>
        <Sidebar role={role} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 bg-base-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;


