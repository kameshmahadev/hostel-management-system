import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 p-4 text-white">
        <h2 className="text-xl font-bold">Hostel System</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar - Hidden on mobile when closed */}
      <aside 
        className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-gray-800 text-white p-4 space-y-4 transition-all duration-300`}
      >
        <h2 className="hidden md:block text-xl font-bold">Hostel System</h2>
        <nav className="space-y-2">
          <Link to="/dashboard" className="block hover:underline p-2 hover:bg-gray-700 rounded">Dashboard</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="block hover:underline p-2 hover:bg-gray-700 rounded">
              Admin Panel
            </Link>
          )}
        </nav>
        <button 
          onClick={handleLogout} 
          className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600 w-full"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-4 md:p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;