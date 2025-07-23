import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import useRole from '../hooks/useRole';
// import useAuth from '../hooks/useAuth';




const Dashboard = () => {
  // const { user } = useAuth(); 
  const [ role, isLoading ] = useRole(); // 'admin', 'agent', 'user'
// console.log(role)
  if (isLoading) return <div className="text-center mt-10">Loading Dashboard...</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
