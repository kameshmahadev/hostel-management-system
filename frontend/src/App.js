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

// ProtectedRoute component
const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
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

        {/* ✅ NEW BILLING ROUTES */}
        <Route
          path="/bills"
          element={
            <ProtectedRoute>
              <BillList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bills/new"
          element={
            <ProtectedRoute>
              <CreateBill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bills/edit/:id"
          element={
            <ProtectedRoute>
              <EditBill />
            </ProtectedRoute>
          }
        />

        {/* 404 page */}
        <Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;