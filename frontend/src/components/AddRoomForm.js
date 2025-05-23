import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AddRoomForm = ({ onRoomAdded }) => {
  const [formData, setFormData] = useState({
    number: '',
    type: 'Standard',
    capacity: 1,
    price: '',
    occupied: false,
    status: 'Available',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!formData.number || !formData.type || !formData.price || !formData.capacity) {
      setError('Please fill in all required fields.');
      return;
    }
    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('Price must be a positive number.');
      return;
    }
    if (isNaN(formData.capacity) || parseInt(formData.capacity) <= 0) {
      setError('Capacity must be a positive number.');
      return;
    }

    try {
      const roomDataToSend = {
        ...formData,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
        status: formData.occupied ? 'Occupied' : 'Available',
      };

      await axios.post('http://localhost:5000/api/rooms', roomDataToSend, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setMessage('Room added successfully!');
      setFormData({
        number: '',
        type: 'Standard',
        capacity: 1,
        price: '',
        occupied: false,
        status: 'Available',
      });

      if (onRoomAdded) onRoomAdded();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add room. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <h2 className="text-xl font-semibold mb-4 text-center">Add New Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Room Number</label>
          <input
            name="number"
            type="text"
            value={formData.number}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Room Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Dormitory">Dormitory</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Capacity</label>
          <input
            name="capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-6 flex items-center">
          <input
            id="occupied"
            name="occupied"
            type="checkbox"
            checked={formData.occupied}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="occupied" className="ml-2 block text-sm text-gray-700">
            Occupied
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;