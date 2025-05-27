// src/components/RoomsList.js
import React, { useEffect, useState } from 'react';
import api from '../service/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Spinner } from './Spinner'; // Ensure this exists

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('/api/rooms', {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setRooms(res.data);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
        setError('Failed to load rooms. Please try again.');
        toast.error('Error fetching rooms');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchRooms();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;

    try {
      await api.delete(`/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setRooms((prev) => prev.filter((room) => room._id !== id));
      toast.success('Room deleted successfully');
    } catch (err) {
      toast.error('Delete failed: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Room List</h2>
        {user?.role !== 'resident' && (
          <Link
            to="/add-room"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition whitespace-nowrap"
          >
            + Add Room
          </Link>
        )}
      </div>

      {rooms.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg">No rooms found</p>
          {user?.role !== 'resident' && (
            <Link
              to="/add-room"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Your First Room
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Room No</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Capacity</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                {user?.role !== 'resident' && (
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room._id} className="hover:bg-gray-50">
                  <td className="p-3 whitespace-nowrap">{room.number}</td>
                  <td className="p-3 whitespace-nowrap">{room.type}</td>
                  <td className="p-3 whitespace-nowrap">{room.capacity}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        room.status === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : room.status === 'Occupied'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  {user?.role !== 'resident' && (
                    <td className="p-3 whitespace-nowrap space-x-2">
                      <Link
                        to={`/edit-room/${room._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="text-red-600 hover:text-red-800"
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
  );
};

export default RoomsList;
