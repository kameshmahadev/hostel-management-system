// src/App.js
import React from 'react';
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
import AdminDashboard from './pages/AdminDashboard'; // ✅ NEW
import Navbar from './components/Navbar';
import ErrorFallback from './components/ErrorFallback';
import { useAuth } from './context/AuthContext';

const Forbidden = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold text-red-600">403 - Forbidden</h1>
    <p className="mt-4 text-gray-600">You do not have permission to access this page.</p>
  </div>
);

const NotFound = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
    <p className="mt-4 text-gray-600">The requested page does not exist.</p>
  </div>
);

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Forbidden />;

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
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

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
          <Route
            path="admin-only"
            element={
              <ProtectedRoute role="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  </Router>
);

export default App;
