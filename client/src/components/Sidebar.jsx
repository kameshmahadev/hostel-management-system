import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5 fixed">
      <h2 className="text-2xl font-bold mb-8">🏠 Hostel System</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:text-yellow-400">Dashboard</Link>
        </li>
        <li>
          <Link to="/students" className="hover:text-yellow-400">Students</Link>
        </li>
        <li>
          <Link to="/rooms" className="hover:text-yellow-400">Rooms</Link>
        </li>
        <li>
          <Link to="/bookings" className="hover:text-yellow-400">Bookings</Link>
        </li>
        <li>
          <Link to="/logout" className="hover:text-yellow-400">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
