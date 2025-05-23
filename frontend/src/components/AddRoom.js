import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext to get user token

// Renamed to AddRoomForm to avoid conflict with `AddRoom` from App.js import
const AddRoomForm = ({ onRoomAdded }) => { // Accept onRoomAdded callback
  const [formData, setFormData] = useState({
    number: '',
    type: 'Standard', // Default type for dropdown
    capacity: 1,      // Default capacity
    price: '',
    occupied: false,
    status: 'Available', // Add status field
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // New state for error messages
  const { user } = useContext(AuthContext); // Get user for token

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setError('');   // Clear previous errors

    // Basic client-side validation (backend validation is more robust)
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
      // Send price as a number, and capacity as a number
      const roomDataToSend = {
          ...formData,
          price: parseFloat(formData.price),
          capacity: parseInt(formData.capacity),
          // If 'occupied' is true, set status to 'Occupied', else 'Available'
          status: formData.occupied ? 'Occupied' : 'Available'
      };

      await axios.post('http://localhost:5000/api/rooms', roomDataToSend, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Include token for authenticated request
        },
      });
      setMessage('Room added successfully!');
      setFormData({ // Reset form after successful submission
        number: '',
        type: 'Standard',
        capacity: 1,
        price: '',
        occupied: false,
        status: 'Available',
      });
      if (onRoomAdded) {
        onRoomAdded(); // Call the callback to tell parent to re-fetch rooms
      }
    } catch (err) {
      console.error('Failed to add room:', err);
      // More specific error message from backend if available
      const errorMessage = err.response?.data?.message || 'Failed to add room. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">Room Number:</label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 101, 204A"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Dormitory">Dormitory</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">Capacity (Beds):</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            min="1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 1, 2, 4"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price ($):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01" // Allow decimal prices
            min="0"    // Minimum price is 0 (though ideally > 0 for a hostel)
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 50.00"
          />
        </div>
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="occupied"
            name="occupied"
            checked={formData.occupied}
            onChange={handleChange}
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="occupied" className="text-gray-700 text-sm font-bold">Occupied</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;