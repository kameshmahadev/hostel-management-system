import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Maintenance from './pages/Maintenance';
import Billing from './pages/Billing';
import Rooms from './pages/Rooms'; // <--- THIS IS THE CORRECT IMPORT FOR Rooms
// Removed 'AddRoomForm' import as it's now used inside Rooms.js directly.
import BillList from './components/BillList';
import CreateBill from './components/CreateBill';
import EditBill from './components/EditBill';
import { AuthContext } from './context/AuthContext';


// ProtectedRoute component (restored the 403 Forbidden UI)
const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600">403 - Forbidden</h1>
        <p className="mt-4 text-gray-600">You do not have permission to access this page.</p>
      </div>
    );
  }

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
            <ProtectedRoute>
              <Rooms /> {/* Renders the Rooms page which includes the AddRoomForm */}
            </ProtectedRoute>
          }
        />

        {/* Since AddRoomForm is now integrated into Rooms.js,
            you no longer need a separate route for it.
            You can remove this block entirely.
        */}
        {/*
        <Route
          path="/add-room"
          element={
            <ProtectedRoute>
              <AddRoomForm />
            </ProtectedRoute>
          }
        />
        */}

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

        {/* NEW BILLING ROUTES */}
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