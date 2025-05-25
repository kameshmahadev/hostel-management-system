// pages/StaffDashboard.js
import React, { useEffect, useState } from 'react';
import api from '../service/api';

const StaffDashboard = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await api.get('/rooms');
      setRooms(res.data);
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Staff Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Status</th>
            <th>Assigned Resident</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.number}</td>
              <td>{room.status}</td>
              <td>{room.assignedResident ? room.assignedResident.name : 'Unassigned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDashboard;
