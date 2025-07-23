import { Link, Navigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Navigate("/"); // ✅ Redirect to home after logout
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };
  const navItems = (
    <>
      <li><NavLink to="/" end>Home</NavLink></li>
      <li><NavLink to="/all-properties">All Properties</NavLink></li>
      {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white px-4 shadow-md">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Hamburger Dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
          >
            {navItems}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-xl font-bold ml-2 lg:ml-0">
          🏡 UrbanNest
        </Link>
      </div>

      {/* Navbar Center (Desktop Only) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">{navItems}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <img className="w-10 h-10 rounded-full" src={user.photoURL} alt="user" />
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-black"
            >
              <li><p className="font-semibold">{user.displayName}</p></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/loginRegister" className="btn btn-outline text-white border-white hover:bg-white hover:text-black">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
