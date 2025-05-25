// src/pages/Residents.js
import React, { useEffect, useState } from 'react';
import api from '../service/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchResidents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users?role=resident');
      setResidents(res.data);
      setError(null);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resident?')) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('Resident deleted.');
      fetchResidents();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed.');
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') fetchResidents();
  }, [user]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Resident Management</h2>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Residents</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="text-red-600">
            <p>{error}</p>
            <button
              onClick={fetchResidents}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retry
            </button>
          </div>
        ) : residents.length === 0 ? (
          <p className="text-gray-500">No residents available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Username</th>
                  <th className="p-2 border">Created</th>
                  {user.role === 'admin' && <th className="p-2 border">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {residents.map((resident) => (
                  <tr key={resident._id}>
                    <td className="p-2 border">{resident.name}</td>
                    <td className="p-2 border">{resident.email}</td>
                    <td className="p-2 border">{resident.username}</td>
                    <td className="p-2 border">{new Date(resident.createdAt).toLocaleDateString()}</td>
                    {user.role === 'admin' && (
                      <td className="p-2 border">
                        <button
                          onClick={() => handleDelete(resident._id)}
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

export default Residents;
