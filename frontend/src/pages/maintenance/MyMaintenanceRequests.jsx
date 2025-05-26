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

  if (!user) return <p>User is not authenticated</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Maintenance Requests</h2>
      {requests.length === 0 ? (
        <p>No maintenance requests found.</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '1rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <h3 className="text-lg font-semibold">{req.title}</h3>
              <p className="text-sm text-gray-600">{req.description}</p>
              <p className="text-sm mt-1">
                <strong>Status:</strong> {req.status}
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
