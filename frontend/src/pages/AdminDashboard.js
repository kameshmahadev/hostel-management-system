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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Room Assignment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map(room => (
          <div key={room._id} className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="text-lg font-semibold">Room {room.number}</h3>
            <p className="text-sm text-gray-600">Status: {room.status} {room.currentResident ? <FaCheckCircle className="inline text-green-500 ml-1" /> : <FaTimesCircle className="inline text-red-500 ml-1" />}</p>
            <p className="text-sm">Type: {room.type}</p>
            <p className="text-sm">Capacity: {room.capacity}</p>
            <p className="text-sm">Price: ${room.price}</p>

            {room.currentResident && (
              <p className="text-sm text-blue-600">Assigned to: {room.currentResident.name}</p>
            )}

            <div className="mt-4">
              <select
                className="border p-2 w-full mb-2"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Select a User to Assign</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
                ))}
              </select>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                onClick={() => assignRoom(room._id, selectedUserId)}
                disabled={!selectedUserId}
              >
                Assign Room
              </button>
              {room.currentResident && (
                <button
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full flex items-center justify-center"
                  onClick={() => clearAssignment(room._id)}
                >
                  <FaUserSlash className="mr-2" /> Check-out
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;