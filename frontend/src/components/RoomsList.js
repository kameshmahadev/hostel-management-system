import React, { useEffect, useState, useContext } from 'react';
import api from '../service/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get('http://localhost:5000/api/rooms', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setRooms(res.data);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
        toast.error('Error fetching rooms');
      }
    };

    if (user?.token) fetchRooms();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;

    try {
      await api.delete(`http://localhost:5000/api/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setRooms((prev) => prev.filter((room) => room._id !== id));
      toast.success('Room deleted successfully');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">Room List</h2>
        {user.role !== 'resident' && (
          <Link
            to="/add-room"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Room
          </Link>
        )}
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border border-gray-200 shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Room No</th>
              <th className="p-3 border text-left">Type</th>
              <th className="p-3 border text-left">Capacity</th>
              <th className="p-3 border text-left">Status</th>
              {user.role !== 'resident' && <th className="p-3 border text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No rooms found.
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{room.number}</td>
                  <td className="p-3 border">{room.type}</td>
                  <td className="p-3 border">{room.capacity}</td>
                  <td className="p-3 border">{room.status}</td>
                  {user.role !== 'resident' && (
                    <td className="p-3 border">
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsList;
