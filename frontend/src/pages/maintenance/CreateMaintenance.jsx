// src/pages/maintenance/CreateMaintenance.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const CreateMaintenance = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !category) {
      toast.error('All fields required');
      return;
    }

    try {
      await axios.post('/api/maintenance', {
        userId: user._id,
        description,
        category,
      });
      toast.success('Request submitted');
      setDescription('');
      setCategory('');
    } catch (err) {
      toast.error('Submission failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">New Maintenance Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Select --</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Furniture">Furniture</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateMaintenance;
