import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]); // State to store rooms
  const [error, setError] = useState(''); // State to store errors

  // Fetch rooms from the backend
  const fetchRooms = async () => {
  try {
    console.log('Fetching rooms...');
    const response = await axios.get('http://localhost:5000/api/rooms');
    console.log('Rooms fetched:', response.data);
    setRooms(response.data);
  } catch (err) {
    console.error('Error fetching rooms:', err);
    setError('Failed to fetch rooms. Please try again later.');
  }
};

  // Fetch rooms when the component loads
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Rooms</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
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
