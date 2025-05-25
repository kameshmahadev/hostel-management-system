// src/components/AssignRoomForm.js
import React, { useEffect, useState } from 'react';
import api from '../service/api';
import toast from 'react-hot-toast';

const AssignRoomForm = ({ roomId, onAssigned }) => {
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState('');

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const res = await api.get('/users?role=resident');
        setResidents(res.data);
      } catch (err) {
        toast.error('Failed to load residents');
      }
    };
    fetchResidents();
  }, []);

  const handleAssign = async () => {
    if (!selectedResident) return toast.error('Please select a resident');

    try {
      await api.put(`/rooms/${roomId}/assign`, { residentId: selectedResident });
      toast.success('Room assigned successfully');
      onAssigned();
    } catch (err) {
      toast.error('Assignment failed');
    }
  };

  return (
    <div className="mt-2">
      <select
        className="border px-2 py-1 rounded mr-2"
        value={selectedResident}
        onChange={(e) => setSelectedResident(e.target.value)}
      >
        <option value="">Select Resident</option>
        {residents.map((r) => (
          <option key={r._id} value={r._id}>
            {r.name} ({r.username})
          </option>
        ))}
      </select>
      <button
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        onClick={handleAssign}
      >
        Assign
      </button>
    </div>
  );
};

export default AssignRoomForm;