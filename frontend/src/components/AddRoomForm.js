import React, { useState } from 'react';
import api from '../service/api';
import { toast } from 'react-hot-toast';
import { Spinner } from './Spinner';

const AddRoomForm = ({ onRoomAdded }) => {
  const [formData, setFormData] = useState({
    number: '',
    type: 'Standard',
    capacity: 1,
    price: '',
    occupied: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { number, type, price, capacity, occupied } = formData;

    if (!number || !type || !price || !capacity) {
      toast.error('All fields are required.');
      setSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/rooms',
        {
          number,
          type,
          price: parseFloat(price),
          capacity: parseInt(capacity),
          status: occupied ? 'Occupied' : 'Available',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Room added successfully!');
      setFormData({
        number: '',
        type: 'Standard',
        capacity: 1,
        price: '',
        occupied: false,
      });
      if (onRoomAdded) onRoomAdded();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add room.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Add New Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Room Number*</label>
            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Room Type*</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Dormitory">Dormitory</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Capacity*</label>
            <input
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price ($)*</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="occupied"
            name="occupied"
            type="checkbox"
            checked={formData.occupied}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="occupied" className="ml-2">
            Currently Occupied
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 flex justify-center items-center"
        >
          {submitting ? <Spinner size="small" /> : 'Add Room'}
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;