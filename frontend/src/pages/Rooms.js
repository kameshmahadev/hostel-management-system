import React, { useEffect, useState, useContext, useCallback } from 'react'; // Import useCallback
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AddRoomForm from '../components/AddRoom';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const { user } = useContext(AuthContext);
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);

  // Memoize fetchRooms to prevent it from changing on every render,
  // which satisfies the useEffect dependency rule.
  const fetchRooms = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/rooms', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setRooms(res.data);
    } catch (err) {
      console.error('Failed to fetch rooms:', err.response?.data?.message || err.message);
      alert('Failed to load rooms. Please try again.');
    }
  }, [user]); // fetchRooms depends on 'user'

  useEffect(() => {
    if (user?.token) {
      fetchRooms();
    }
  }, [user, fetchRooms]); // Now fetchRooms is a stable dependency

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchRooms();
      alert('Room deleted successfully!');
    } catch (err) {
      console.error('Delete failed:', err.response?.data?.message || err.message);
      alert('Delete failed. ' + (err.response?.data?.message || 'Please try again.'));
    }
  };

  const handleRoomAdded = () => {
    fetchRooms();
    setShowAddRoomForm(false);
  };

  const handleEdit = (roomId) => {
    console.log('Edit room with ID:', roomId);
    alert('Edit functionality not yet implemented.');
  };

  const handleAssignResident = (roomId) => {
    console.log('Assign resident to room with ID:', roomId);
    alert('Assign Resident functionality not yet implemented.');
  };

  const handleCheckOut = (roomId) => {
    console.log('Check out resident from room with ID:', roomId);
    alert('Check Out functionality not yet implemented.');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
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
            <AddRoomForm onRoomAdded={handleRoomAdded} />
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">All Rooms</h3>
          {rooms.length === 0 ? (
            <p className="text-gray-600">No rooms found. Add a new room to get started.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border text-left text-sm font-semibold text-gray-700">Room No</th>
                    <th className="p-3 border text-left text-sm font-semibold text-gray-700">Type</th>
                    <th className="p-3 border text-left text-sm font-semibold text-gray-700">Capacity</th>
                    <th className="p-3 border text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="p-3 border text-left text-sm font-semibold text-gray-700">Status</th>
                    {user.role !== 'resident' && <th className="p-3 border text-left text-sm font-semibold text-gray-700">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room._id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="p-3 border text-sm text-gray-800">{room.number}</td>
                      <td className="p-3 border text-sm text-gray-800">{room.type}</td>
                      <td className="p-3 border text-sm text-gray-800">{room.capacity}</td>
                      <td className="p-3 border text-sm text-gray-800">${room.price.toFixed(2)}</td>
                      <td className="p-3 border text-sm text-gray-800">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${room.status === 'Occupied' ? 'bg-red-100 text-red-800' :
                             room.status === 'Available' ? 'bg-green-100 text-green-800' :
                             'bg-yellow-100 text-yellow-800'
                          }`}>
                          {room.status || (room.occupied ? 'Occupied' : 'Available')}
                        </span>
                      </td>
                      {user.role !== 'resident' && (
                        <td className="p-3 border space-x-2">
                          <button
                            onClick={() => handleEdit(room._id)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(room._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                          >
                            Delete
                          </button>
                          {room.status === 'Available' && (
                             <button
                               onClick={() => handleAssignResident(room._id)}
                               className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                             >
                               Assign Resident
                             </button>
                          )}
                          {room.status === 'Occupied' && (
                             <button
                               onClick={() => handleCheckOut(room._id)}
                               className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm"
                             >
                               Check Out
                             </button>
                          )}
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
    </div>
  );
};

export default Rooms;