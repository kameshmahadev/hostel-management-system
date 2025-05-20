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
      await axios.post('http://localhost:5000/api/rooms', formData);
      setMessage('Room added successfully!');
      setFormData({ number: '', type: '', price: '', occupied: false }); // Reset form
    } catch (err) {
      setMessage('Failed to add room. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center' }}>Add a New Room</h1>
      {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Room Number:</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Occupied:</label>
          <input
            type="checkbox"
            name="occupied"
            checked={formData.occupied}
            onChange={handleChange}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;