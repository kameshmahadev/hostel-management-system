// src/pages/Rooms.js
import React, { useEffect, useState, useCallback } from 'react';
import api from '../service/api';
import { useAuth } from '../context/AuthContext';
import AddRoomForm from '../components/AddRoomForm';
import { toast } from 'react-hot-toast';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch rooms from API
  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/rooms');
      setRooms(res.data);
      setError(null);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch rooms.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchRooms();
    }
  }, [fetchRooms]);

  // Delete room handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await api.delete(`/rooms/${id}`);
      toast.success('Room deleted.');
      fetchRooms();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Room Management</h2>
        {user?.role !== 'resident' && (
          <button
            onClick={() => setShowAddRoomForm(!showAddRoomForm)}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            {showAddRoomForm ? 'Cancel' : '+ Add Room'}
          </button>
        )}
      </div>

      {showAddRoomForm && user?.role !== 'resident' && (
        <div className="mb-6">
          <AddRoomForm
            onRoomAdded={() => {
              fetchRooms();
              setShowAddRoomForm(false);
            }}
          />
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Rooms</h3>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-600">
            <p>{error}</p>
            <button
              onClick={fetchRooms}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retry
            </button>
          </div>
        ) : rooms.length === 0 ? (
          <p className="text-gray-500">No rooms available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Room No</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Capacity</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Status</th>
                  {user.role !== 'resident' && <th className="p-2 border">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id}>
                    <td className="p-2 border">{room.number}</td>
                    <td className="p-2 border">{room.type}</td>
                    <td className="p-2 border">{room.capacity}</td>
                    <td className="p-2 border">${room.price?.toFixed(2)}</td>
                    <td className="p-2 border">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-semibold 
                          ${
                            room.status === 'Occupied'
                              ? 'bg-red-100 text-red-700'
                              : room.status === 'Available'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                      >
                        {room.status}
                      </span>
                    </td>
                    {user.role !== 'resident' && (
                      <td className="p-2 border">
                        <button
                          onClick={() => handleDelete(room._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
