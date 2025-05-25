import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCheck, FaUserSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

export const AdminRoomAssignment = () => {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomRes = await axios.get('/api/rooms');
        const userRes = await axios.get('/api/users');
        setRooms(roomRes.data);
        setUsers(userRes.data);
      } catch (error) {
        toast.error('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const assignRoom = async () => {
    if (!selectedRoom || !selectedUser) {
      return toast.error('Please select both room and user');
    }

    try {
      await axios.post(`/api/rooms/${selectedRoom}/assign`, { residentId: selectedUser });
      toast.success('Room assigned!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Assignment failed');
    }
  };

  const clearAssignment = async (roomId) => {
    try {
      await axios.put(`/api/rooms/${roomId}`, {
        currentResident: null
      });
      toast.success('Assignment cleared');
    } catch (err) {
      toast.error('Failed to clear assignment');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          className="p-2 border rounded"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.number} - {room.status}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={assignRoom}
      >
        Assign Room
      </button>

      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room._id} className="p-4 border rounded shadow">
            <h3 className="font-bold mb-2">Room {room.number}</h3>
            <p>Status: {room.status}</p>
            <p>
              Assigned to:{' '}
              {room.currentResident ? (
                <>
                  {room.currentResident.name} <FaUserCheck className="inline text-green-600 ml-1" />
                </>
              ) : (
                <>
                  None <FaUserSlash className="inline text-red-600 ml-1" />
                </>
              )}
            </p>

            {room.currentResident && (
              <button
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                onClick={() => clearAssignment(room._id)}
              >
                Clear Assignment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
