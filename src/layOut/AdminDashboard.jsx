import { Outlet, NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-200">
      {/* Sidebar */}
      <div className="md:w-64 bg-base-100 p-4 shadow">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <ul className="space-y-2">
          <li><NavLink to="/dashboard/admin-profile" className="link">Admin Profile</NavLink></li>
          <li><NavLink to="/dashboard/manage-properties" className="link">Manage Properties</NavLink></li>
          <li><NavLink to="/dashboard/manage-users" className="link">Manage Users</NavLink></li>
          <li><NavLink to="/dashboard/manage-reviews" className="link">Manage Reviews</NavLink></li>
          <li><NavLink to="/dashboard/advertise-property" className="link">Advertise Property</NavLink></li>
        </ul>
      </div>

      {/* Outlet */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;