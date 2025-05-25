// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';

import Register from './pages/Register';
import Login from './pages/Login';
import DashboardHome from './pages/DashboardHome';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Maintenance from './pages/Maintenance';
import Billing from './pages/Billing';
import BillList from './components/BillList';
import CreateBill from './components/CreateBill';
import EditBill from './components/EditBill';
import AdminPage from './pages/AdminPage';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import ErrorFallback from './components/ErrorFallback';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // Or return a spinner/loading indicator if desired

  if (!user) return <Navigate to="/login" replace />;
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

const DashboardLayout = () => (
  <>
    <Navbar />
    <div className="p-4">
      <Outlet />
    </div>
  </>
);

const App = () => (
  <Router>
    <Toaster position="top-right" />
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="billing" element={<Billing />} />
          <Route path="bills" element={<BillList />} />
          <Route path="bills/new" element={<CreateBill />} />
          <Route path="bills/edit/:id" element={<EditBill />} />

          {/* Admin-only route */}
          <Route
            path="admin-only"
            element={
              <ProtectedRoute role="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* Nested 404 within dashboard */}
          <Route
            path="*"
            element={
              <div className="p-10 text-center">
                <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
                <p className="mt-4 text-gray-600">The requested page does not exist.</p>
              </div>
            }
          />
        </Route>

        {/* Global 404 */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-10 text-3xl font-bold text-red-600">404 - Page Not Found</h1>
          }
        />
      </Routes>
    </ErrorBoundary>
  </Router>
);

export default App;
