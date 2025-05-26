import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const BookingHistory = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/api/bookings/user/${user._id}`);
        setBookings(res.data);
      } catch (err) {
        toast.error('Failed to load bookings');
      }
    };

    fetchBookings();
  }, [user]);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      toast.success('Booking cancelled');
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      toast.error('Cancel failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li
              key={b._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Room:</strong> {b.room?.number} - {b.room?.type}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(b.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => cancelBooking(b._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
