import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const stats = [
    { title: "Room Status", values: ["Available: 12", "Occupied: 48"], link: "/rooms" },
    { title: "Pending Requests", values: ["4 new maintenance issues"], link: "/maintenance" },
    { title: "Billing Overview", values: ["This Month: ₹40,000"], link: "/billing" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
        Hostel Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Link 
            to={stat.link} 
            key={index}
            className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-3 text-gray-800">{stat.title}</h2>
            <div className="space-y-1">
              {stat.values.map((value, i) => (
                <p key={i} className="text-gray-600">{value}</p>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            to="/add-room"
            className="bg-blue-50 text-blue-700 p-3 rounded-lg text-center hover:bg-blue-100 transition"
          >
            Add Room
          </Link>
          <Link
            to="/maintenance/new"
            className="bg-green-50 text-green-700 p-3 rounded-lg text-center hover:bg-green-100 transition"
          >
            New Request
          </Link>
          <Link
            to="/billing/create"
            className="bg-purple-50 text-purple-700 p-3 rounded-lg text-center hover:bg-purple-100 transition"
          >
            Create Bill
          </Link>
          <Link
            to="/reports"
            className="bg-orange-50 text-orange-700 p-3 rounded-lg text-center hover:bg-orange-100 transition"
          >
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;