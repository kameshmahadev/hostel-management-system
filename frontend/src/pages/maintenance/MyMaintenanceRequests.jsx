import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const MyMaintenanceRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:3000/api/maintenance/user/${user?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Failed to fetch maintenance requests:', err);
        setError('Failed to fetch maintenance requests');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchRequests();
    }
  }, [user]);

  if (!user) return <p className="text-center text-red-500">User is not authenticated</p>;
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Maintenance Requests</h2>
      
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No maintenance requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold mb-1">{req.title}</h3>
              <p className="text-sm text-gray-600 mb-2 break-words">{req.description}</p>
              <p className="text-sm mb-1">
                <span className="font-medium">Status:</span> {req.status}
              </p>
              <p className="text-sm text-gray-500">
                Submitted on: {new Date(req.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMaintenanceRequests;
