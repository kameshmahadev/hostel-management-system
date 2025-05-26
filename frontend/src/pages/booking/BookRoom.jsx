import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const BookRoom = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [bookingDate, setBookingDate] = useState('');

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const res = await axios.get('/api/rooms');
        const available = res.data.filter((room) => !room.assignedTo);
        setRooms(available);
      } catch (err) {
        toast.error('Failed to fetch rooms');
      }
    };

    fetchAvailableRooms();
  }, []);

  const handleBooking = async () => {
    if (!selectedRoomId || !bookingDate) {
      toast.error('Please select room and date');
      return;
    }

    try {
      await axios.post('/api/bookings', {
        userId: user._id,
        roomId: selectedRoomId,
        date: bookingDate,
      });
      toast.success('Room booked successfully');
      setSelectedRoomId('');
      setBookingDate('');
    } catch (err) {
      toast.error('Booking failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book a Room</h2>

      <div className="mb-4">
        <label className="block mb-1">Select Room</label>
        <select
          value={selectedRoomId}
          onChange={(e) => setSelectedRoomId(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">-- Select --</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.number} - {room.type}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Booking Date</label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookRoom;
