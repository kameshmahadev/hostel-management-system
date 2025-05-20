import React, { useState } from 'react';
import axios from 'axios';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    number: '',
    type: '',
    price: '',
    occupied: false,
  });
  const [message, setMessage] = useState('');

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
    try {
      const response = await axios.post('http://localhost:5000/api/rooms', formData);
      setMessage('Room added successfully!');
      setFormData({ number: '', type: '', price: '', occupied: false }); // Reset form
    } catch (err) {
      setMessage('Failed to add room. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Add a New Room</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room Number:</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Occupied:</label>
          <input
            type="checkbox"
            name="occupied"
            checked={formData.occupied}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;