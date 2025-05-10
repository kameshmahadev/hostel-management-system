// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-blue-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">🏨 Hostel Admin</h2>
      <nav className="flex flex-col space-y-4">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-yellow-200"}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-yellow-200"}>
          👨‍🎓 Students
        </NavLink>
        <NavLink to="/rooms" className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-yellow-200"}>
          🛏️ Rooms
        </NavLink>
        <NavLink to="/bookings" className={({ isActive }) => isActive ? "text-yellow-300" : "hover:text-yellow-200"}>
          📅 Bookings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
