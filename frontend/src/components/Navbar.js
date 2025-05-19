import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Hostel Management System</h1>
        <div>
          <Link to="/dashboard" className="mr-4 hover:underline">
            Dashboard
          </Link>
          <Link to="/rooms" className="mr-4 hover:underline">
            Rooms
          </Link>
          <Link to="/bookings" className="mr-4 hover:underline">
            Bookings
          </Link>
          <Link to="/maintenance" className="mr-4 hover:underline">
            Maintenance
          </Link>
          <Link to="/billing" className="hover:underline">
            Billing
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;