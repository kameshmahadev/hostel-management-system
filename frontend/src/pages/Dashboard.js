import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to the Hostel Management System Dashboard!</p>

        {/* Renders nested route components here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;