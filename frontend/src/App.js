import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register'; // Ensure this file exists and is correctly exported
import Login from './pages/Login'; // Ensure this file exists and is correctly exported
import Dashboard from './pages/Dashboard'; // Ensure this file exists and is correctly exported
import Bookings from './pages/Bookings'; // Ensure this file exists and is correctly exported
import Maintenance from './pages/Maintenance'; // Ensure this file exists and is correctly exported
import Billing from './pages/Billing'; // Ensure this file exists and is correctly exported
import RoomsList from './components/RoomsList'; // Ensure this file exists and is correctly exported
import AddRoom from './components/AddRoom'; // Ensure this file exists and is correctly exported

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Define all valid routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<RoomsList />} /> {/* Route for Rooms Page */}
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/add-room" element={<AddRoom />} /> {/* Route for Add Room Page */}
        <Route path="" element={<h1>404 - Page Not Found</h1>} /> {/ Catch-all route */}
      </Routes>
    </Router>
  );
};

export default App;