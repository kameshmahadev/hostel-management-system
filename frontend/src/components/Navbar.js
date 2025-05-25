// src/components/Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex gap-6 font-semibold">
        <NavLink to="/dashboard/home" className={({ isActive }) => isActive ? 'underline' : ''}>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/rooms" className={({ isActive }) => isActive ? 'underline' : ''}>
          Rooms
        </NavLink>
        <NavLink to="/dashboard/bookings" className={({ isActive }) => isActive ? 'underline' : ''}>
          Bookings
        </NavLink>
        <NavLink to="/dashboard/maintenance" className={({ isActive }) => isActive ? 'underline' : ''}>
          Maintenance
        </NavLink>
        <NavLink to="/dashboard/billing" className={({ isActive }) => isActive ? 'underline' : ''}>
          Billing
        </NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
