import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => console.error("Logout Error:", error));
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "text-white font-bold underline" : "hover:text-white"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-properties"
          className={({ isActive }) =>
            isActive ? "text-white font-bold underline" : "hover:text-white"
          }
        >
          All Properties
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-white font-bold underline" : "hover:text-white"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 text-white shadow-md px-4 sticky top-0 z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-56 text-black dark:bg-gray-800 dark:text-white"
          >
            {navItems}
          </ul>
        </div>

        {/* Logo */}
        
        <Link to="/" className="text-2xl font-bold ml-2 lg:ml-0 flex items-center gap-1">
          <img className="w-14 md:w-16 rounded-2xl bg-white" src="/public/logo.png" alt="" />
        </Link>
        {/* <Link to="/" className="text-2xl font-bold ml-2 lg:ml-0 flex items-center gap-1">
          🏡 <span className="text-white">UrbanNest</span>
        </Link> */}
      </div>

      {/* Navbar Center (Large Device) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{navItems}</ul>
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
              className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box w-56 text-black dark:text-white"
            >
              <li>
                <p className="font-semibold truncate">{user.displayName}</p>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:bg-gray-200 dark:hover:bg-gray-700">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/loginRegister"
            className="btn border border-white text-white hover:bg-white hover:text-black transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
