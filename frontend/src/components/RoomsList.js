import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rooms');
      setRooms(response.data);
    } catch (err) {
      setError('Failed to fetch rooms. Please try again later.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h1 style={{ textAlign: 'center' }}>Rooms List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Type</th>
            <th>Price</th>
            <th>Occupied</th>
          </tr>
        </thead>
        <tbody>
          {rooms && rooms.length > 0 ? (
            rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.number || 'N/A'}</td>
                <td>{room.type || 'N/A'}</td>
                <td>{room.price || 'N/A'}</td>
                <td>{room.occupied ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No rooms available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsList;