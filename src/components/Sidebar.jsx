import { Link } from 'react-router-dom';
// import AgentDashboardLayout from '../layOut/AgentDashboardLayout';

const Sidebar = ({ role }) => {
  // console.log(role)
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li><Link to="/dashboard/profile">My Profile</Link></li>
        {role === 'user' && (
          <>
           <h2 className="text-xl font-bold mb-4"> user Dashboard</h2>
            <li><Link to="/dashboard/wishlist">Wishlist</Link></li>
            <li><Link to="/dashboard/property-bought">Property Bought</Link></li> 
            <li><Link to="/dashboard/my-reviews">My Reviews</Link></li> 
          </>
        )}
        {role === 'agent' && (
          <>
            <li><Link to="/dashboard/add-property">Add Property</Link></li>
            <li><Link to="/dashboard/my-added-properties">My Added Properties</Link></li>
            <li><Link to="/dashboard/requested-properties">Requested Properties</Link></li>
            <li><Link to="/dashboard/my-sold-properties">My Sold Properties</Link></li>
           
          </>
        )}
        {role === 'admin' && (
          <>
            <li><Link to="/dashboard/manage-properties">Manage Properties</Link></li>
            <li><Link to="/dashboard/manage-users">Manage Users</Link></li>
            <li><Link to="/dashboard/manage-reviews">Manage Reviews</Link></li>
            {/* <li><Link to="/dashboard/add-property">Add Property</Link></li> */}
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
