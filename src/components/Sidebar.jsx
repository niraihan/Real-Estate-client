import { NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const getTitle = () => {
    if (role === 'user') return 'User Dashboard';
    if (role === 'agent') return 'Agent Dashboard';
    if (role === 'admin') return 'Admin Dashboard';
    return 'Dashboard';
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'block px-4 py-2 bg-yellow-500 text-black font-semibold rounded'
      : 'block px-4 py-2 hover:bg-yellow-600 hover:text-white rounded transition';

  return (
    <div className="w-64 bg-gray-900 text-white p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">{getTitle()}</h2>
      <ul className="space-y-2">
        {/* <li><NavLink to="/dashboard/profile" className={navLinkClass}>My Profile</NavLink></li> */}

        {role === 'user' && (
          <>
          <li><NavLink to="/dashboard/user-profile" className={navLinkClass}>User Profile</NavLink></li>
            <li><NavLink to="/dashboard/wishlist" className={navLinkClass}>Wishlist</NavLink></li>
            <li><NavLink to="/dashboard/property-bought" className={navLinkClass}>Property Bought</NavLink></li>
            <li><NavLink to="/dashboard/my-reviews" className={navLinkClass}>My Reviews</NavLink></li>
          </>
        )}

        {role === 'agent' && (
          <>
            <li><NavLink to="/dashboard/agent-profile" className={navLinkClass}>Agent Profile</NavLink></li>
            <li><NavLink to="/dashboard/add-property" className={navLinkClass}>Add Property</NavLink></li>
            <li><NavLink to="/dashboard/my-added-properties" className={navLinkClass}>My Added Properties</NavLink></li>
            <li><NavLink to="/dashboard/requested-properties" className={navLinkClass}>Requested Properties</NavLink></li>
            <li><NavLink to="/dashboard/my-sold-properties" className={navLinkClass}>My Sold Properties</NavLink></li>
          </>
        )}

        {role === 'admin' && (
          <>
           <li><NavLink to="/dashboard/admin-profile" className={navLinkClass}>Admin Profile</NavLink></li> 
            <li><NavLink to="/dashboard/manage-properties" className={navLinkClass}>Manage Properties</NavLink></li>
            <li><NavLink to="/dashboard/manage-users" className={navLinkClass}>Manage Users</NavLink></li>
            <li><NavLink to="/dashboard/manage-reviews" className={navLinkClass}>Manage Reviews</NavLink></li>
            <li><NavLink to="/dashboard/advertise-property" className={navLinkClass}>Advertise Property</NavLink></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
