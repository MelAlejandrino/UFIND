import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Import AuthContext hook
import {
  MdDashboard,
  MdOutlineSearch,
  MdOutlineCheckCircle,
  MdOutlineListAlt,
  MdOutlineAssignmentTurnedIn,
  MdAccountCircle,
  MdLogout,
} from "react-icons/md";

const Sidebar = () => {
  const { logout } = useAuth(); // Get user and logout function from AuthContext
  const navigate = useNavigate(); // For navigation after logout

  // Logout handler function
  const handleLogout = () => {
    logout(); // Perform logout from AuthContext
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="h-full w-70 bg-gradient-to-b from-blue-600 to-blue-500 text-white shadow-lg flex flex-col">
      {/* Logo and Profile */}
      <div className="p-6 text-center border-b border-blue-400">
        <div className="flex justify-center mb-4">
          <img
            src="/src/assets/PROFILE.png" // Replace with actual profile image path
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
        </div>
        <h2 className="text-lg font-bold">Jared Rara</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 overflow-y-auto">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <MdDashboard size={24} />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/itemLost"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <MdOutlineSearch size={24} />
              <span>Item Lost</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/itemFound"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <MdOutlineCheckCircle size={24} />
              <span>Item Found</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/activeTicket"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <MdOutlineListAlt size={24} />
              <span>Active Tickets</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/turnoverTicket"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <MdOutlineAssignmentTurnedIn size={24} />
              <span>Turnover Tickets</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/myAccount"
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-blue-700 transition"
            >
              <MdAccountCircle size={24} />
              <span>My Account</span>
            </NavLink>
          </li>

          {/* Logout Link */}
          <li>
            <button
              onClick={handleLogout} // Trigger the logout function
              className="flex items-center space-x-3 p-1 rounded-lg hover:bg-red-600 transition w-full text-left"
            >
              <MdLogout size={24} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
