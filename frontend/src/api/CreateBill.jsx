import React, { useState, useEffect } from 'react';
import { createBill } from '../api/billingApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBill = () => {
  const [form, setForm] = useState({
    resident: '',
    amount: '',
    dueDate: '',
    status: 'Unpaid',
    description: '',
  });
  const [residents, setResidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setResidents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBill(form);
    navigate('/bills');
  };

  return (
    <div>
      <h2>Create Bill</h2>
      <form onSubmit={handleSubmit}>
        <label>Resident:
          <select name="resident" value={form.resident} onChange={handleChange}>
            <option value="">Select...</option>
            {residents.map(r => (
              <option key={r._id} value={r._id}>{r.name}</option>
            ))}
          </select>
        </label>
        <label>Amount: <input name="amount" type="number" value={form.amount} onChange={handleChange} /></label>
        <label>Due Date: <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} /></label>
        <label>Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Unpaid</option>
            <option>Paid</option>
          </select>
        </label>
        <label>Description:
          <textarea name="description" value={form.description} onChange={handleChange}></textarea>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBill;
