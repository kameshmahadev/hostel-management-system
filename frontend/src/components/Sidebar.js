import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/rooms" className="hover:underline">
            Rooms
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/bookings" className="hover:underline">
            Bookings
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/maintenance" className="hover:underline">
            Maintenance
          </Link>
        </li>
        <li>
          <Link to="/dashboard/billing" className="hover:underline">
            Billing
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
