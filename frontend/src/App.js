import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Maintenance from './pages/Maintenance';
import Billing from './pages/Billing';
import RoomsList from './components/RoomsList';
import AddRoom from './components/AddRoom';
import BillList from './components/BillList';
import CreateBill from './components/CreateBill';
import EditBill from './components/EditBill';
import { AuthContext } from './context/AuthContext';

// ProtectedRoute component: checks if user is logged in and optionally checks role
const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // Logged in but unauthorized role
    return <Navigate to="/dashboard" />; // or an Unauthorized page
  }

  // Authorized, render children
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes - all require login */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rooms"
          element={
            <ProtectedRoute role="admin">
              <RoomsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-room"
          element={
            <ProtectedRoute role="admin">
              <AddRoom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maintenance"
          element={
            <ProtectedRoute>
              <Maintenance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        {/* Catch all unmatched routes */}
        <Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;