// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaTimesCircle, FaUserSlash } from 'react-icons/fa';

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms');
      setRooms(data);
    } catch (error) {
      toast.error('Error fetching rooms');
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/users');
      setUsers(data);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  const assignRoom = async (roomId, residentId) => {
    try {
      await axios.post(`/api/rooms/${roomId}/assign`, { residentId });
      toast.success('Room assigned successfully');
      fetchRooms();
    } catch (error) {
      toast.error('Assignment failed');
    }
  };

  const clearAssignment = async (roomId) => {
    try {
      await axios.put(`/api/rooms/${roomId}`, {
        currentResident: null,
        status: 'Available',
      });
      toast.success('Assignment cleared');
      fetchRooms();
    } catch (error) {
      toast.error('Failed to clear assignment');
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchUsers();
  }, []);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Admin Room Assignment</h2>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-500">No rooms available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-1">Room {room.number}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Status: {room.status}{' '}
                  {room.currentResident ? (
                    <FaCheckCircle className="inline text-green-500 ml-1" />
                  ) : (
                    <FaTimesCircle className="inline text-red-500 ml-1" />
                  )}
                </p>
                <p className="text-sm mb-1">Type: {room.type}</p>
                <p className="text-sm mb-1">Capacity: {room.capacity}</p>
                <p className="text-sm mb-2">Price: ${room.price}</p>

                {room.currentResident && (
                  <p className="text-sm text-blue-600 mb-2">
                    Assigned to: {room.currentResident.name}
                  </p>
                )}
              </div>

              <div className="mt-3">
                <select
                  className="border border-gray-300 rounded-md p-2 w-full text-sm mb-2"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                >
                  <option value="">Select a user to assign</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => assignRoom(room._id, selectedUserId)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  disabled={!selectedUserId}
                >
                  Assign Room
                </button>

                {room.currentResident && (
                  <button
                    onClick={() => clearAssignment(room._id)}
                    className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center"
                  >
                    <FaUserSlash className="mr-2" /> Check-out
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
