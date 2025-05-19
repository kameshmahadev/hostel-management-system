import React, { useState, useEffect } from 'react';
import api from '../service/api';
import Sidebar from '../components/Sidebar';

const Maintenance = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    roomId: '',
    description: '',
    priority: 'Low',
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('/maintenance');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/maintenance', formData);
      alert('Maintenance request submitted!');
      setRequests([...requests, response.data]);
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
      alert('Failed to submit request.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Maintenance Requests</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            name="roomId"
            placeholder="Room ID"
            value={formData.roomId}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
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
              <th className="border border-gray-300 p-2">Room ID</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Priority</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="border border-gray-300 p-2">{request.roomId}</td>
                <td className="border border-gray-300 p-2">{request.description}</td>
                <td className="border border-gray-300 p-2">{request.priority}</td>
                <td className="border border-gray-300 p-2">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Maintenance;