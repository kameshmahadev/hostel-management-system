// src/components/AddRoomForm.js
import React, { useState } from 'react';
import api from '../service/api';
import { toast } from 'react-hot-toast';

const AddRoomForm = ({ onRoomAdded }) => {
  const [formData, setFormData] = useState({
    number: '',
    type: 'Standard',
    capacity: 1,
    price: '',
    occupied: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { number, type, price, capacity, occupied } = formData;

    if (!number || !type || !price || !capacity) {
      toast.error('All fields are required.');
      return;
    }

    const roomData = {
      number,
      type,
      price: parseFloat(price),
      capacity: parseInt(capacity),
      status: occupied ? 'Occupied' : 'Available',
    };

    try {
      await api.post('/rooms', roomData);
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md max-w-lg mx-auto"
    >
      <div className="mb-4">
        <label className="block mb-1 font-medium">Room Number</label>
        <input
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Room Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
          <option value="Dormitory">Dormitory</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Capacity</label>
        <input
          name="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          min="1"
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Price ($)</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          id="occupied"
          name="occupied"
          type="checkbox"
          checked={formData.occupied}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 rounded"
        />
        <label htmlFor="occupied" className="ml-2 text-sm">
          Occupied
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
      >
        Add Room
      </button>
    </form>
  );
};

export default AddRoomForm;
