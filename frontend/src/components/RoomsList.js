// components/RoomsList.js
import React, { useEffect, useState, useContext } from 'react';
import api from '../service/api'; // Adjust the path if needed
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

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
      }
    };

    if (user?.token) fetchRooms();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setRooms((prev) => prev.filter((room) => room._id !== id));
    } catch (err) {
      toast.success('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Room List</h2>
        {user.role !== 'resident' && (
          <Link
            to="/add-room"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Room
          </Link>
        )}
      </div>
      <table className="w-full border shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Room No</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Capacity</th>
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
              <td className="p-2 border">{room.occupied ? 'Occupied' : 'Available'}</td>
              {user.role !== 'resident' && (
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
  );
};

export default RoomsList;
