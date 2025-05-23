import React from "react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-6">
        Hostel Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Room Status</h2>
          <p className="text-gray-600">Available: 12</p>
          <p className="text-gray-600">Occupied: 48</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Pending Requests</h2>
          <p className="text-gray-600">4 new maintenance issues</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Billing Overview</h2>
          <p className="text-gray-600">This Month: ₹40,000</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
