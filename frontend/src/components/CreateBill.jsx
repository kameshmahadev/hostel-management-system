import React, { useState, useEffect } from 'react';
import { createBill } from '../api/billingApi';
import API from '../service/api'; // use centralized axios instance with token
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
  const [loadingResidents, setLoadingResidents] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingResidents(true);
    API.get('/users')
      .then(res => setResidents(res.data))
      .catch(() => setError('Failed to load residents'))
      .finally(() => setLoadingResidents(false));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createBill(form);
      navigate('/bills');
    } catch {
      setError('Failed to create bill');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create Bill</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Resident:
          {loadingResidents ? (
            <p>Loading residents...</p>
          ) : (
            <select name="resident" value={form.resident} onChange={handleChange} required>
              <option value="">Select...</option>
              {residents.map(r => (
                <option key={r._id} value={r._id}>{r.name}</option>
              ))}
            </select>
          )}
        </label>
        <label>
          Amount:
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange} required>
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateBill;
