import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Hostel System</h2>
        <nav className="space-y-2">
          <Link to="/dashboard" className="block hover:underline">Dashboard</Link>
          {user?.role === 'admin' && <Link to="/admin" className="block hover:underline">Admin Panel</Link>}
        </nav>
        <button onClick={handleLogout} className="mt-4 bg-red-500 px-4 py-2 rounded">Logout</button>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;
