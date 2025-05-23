import React, { useEffect, useState, useContext, useCallback } from 'react';
import api from '../service/api'; // Your centralized axios instance
import { AuthContext } from '../context/AuthContext';
import AddRoomForm from '../components/AddRoomForm';
import { toast } from 'react-hot-toast';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AuthContext);
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);

  const fetchRooms = useCallback(async () => {
    try {
      const res = await api.get('/rooms', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRooms(res.data);
    } catch (err) {
      console.error('Failed to fetch rooms:', err.response?.data?.message || err.message);
      toast.error('Failed to load rooms. Please try again.');
    }
  }, [user]);

  useEffect(() => {
    if (user?.token) {
      fetchRooms();
    }
  }, [user, fetchRooms]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;

    try {
      await api.delete(`/rooms/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success('Room deleted successfully!');
      fetchRooms();
    } catch (err) {
      console.error('Delete failed:', err.response?.data?.message || err.message);
      toast.error('Delete failed. ' + (err.response?.data?.message || 'Please try again.'));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Room Management</h2>
        {user.role !== 'resident' && (
          <button
            onClick={() => setShowAddRoomForm(!showAddRoomForm)}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            {showAddRoomForm ? 'Hide Add Room Form' : '+ Add New Room'}
          </button>
        )}
      </div>

      {showAddRoomForm && user.role !== 'resident' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Add a New Room</h3>
          <AddRoomForm onRoomAdded={() => { fetchRooms(); setShowAddRoomForm(false); }} />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">All Rooms</h3>
        {rooms.length === 0 ? (
          <p className="text-gray-600">No rooms found. Add a new room to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
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
                  <tr key={room._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{room.number}</td>
                    <td className="p-2 border">{room.type}</td>
                    <td className="p-2 border">{room.capacity}</td>
                    <td className="p-2 border">${room.price?.toFixed(2) || 'N/A'}</td>
                    <td className="p-2 border">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${
                            room.status === 'Occupied'
                              ? 'bg-red-100 text-red-800'
                              : room.status === 'Available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                      >
                        {room.status || 'N/A'}
                      </span>
                    </td>
                    {user.role !== 'resident' && (
                      <td className="p-2 border space-x-2">
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
