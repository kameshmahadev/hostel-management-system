import React, { useState, useEffect } from 'react';
import api from '../service/api';
import { toast } from 'react-hot-toast';

const Maintenance = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    resident: '',
    room: '',
    issue: '',
    priority: 'Low',
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setFormData(prev => ({ ...prev, resident: userId }));
    }

    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/maintenance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        toast.error(
          error.response?.data?.message || 'Failed to load maintenance data.'
        );
      }
    };

    fetchRequests();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!formData.room || !formData.issue || !formData.priority || !userId) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const payload = { ...formData, resident: userId };

    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/maintenance', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Maintenance request submitted!');
      setRequests(prev => [...prev, response.data]);
      setFormData(prev => ({
        ...prev,
        room: '',
        issue: '',
        priority: 'Low',
      }));
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
      toast.error(
        error.response?.data?.message || 'Failed to submit request.'
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Maintenance Requests</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="room"
          placeholder="Room ID"
          value={formData.room}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          name="issue"
          placeholder="Describe the issue"
          value={formData.issue}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit Request
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Room</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Priority</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-600">
                No maintenance requests found.
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req._id}>
                <td className="border border-gray-300 p-2">{req.room}</td>
                <td className="border border-gray-300 p-2">{req.issue}</td>
                <td className="border border-gray-300 p-2">{req.priority}</td>
                <td className="border border-gray-300 p-2">{req.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance;
