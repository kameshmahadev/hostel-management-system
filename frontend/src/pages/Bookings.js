import React, { useState, useEffect } from 'react';
import api from '../service/api';
import Sidebar from '../components/Sidebar';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Bookings</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Room</th>
              <th className="border border-gray-300 p-2">User</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border border-gray-300 p-2">{booking.roomId}</td>
                <td className="border border-gray-300 p-2">{booking.userId}</td>
                <td className="border border-gray-300 p-2">{booking.startDate}</td>
                <td className="border border-gray-300 p-2">{booking.endDate}</td>
                <td className="border border-gray-300 p-2">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;