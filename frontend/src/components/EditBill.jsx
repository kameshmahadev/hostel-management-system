import React, { useEffect, useState } from 'react';
import { getBillById, updateBill } from '../api/billingApi';
import { useNavigate, useParams } from 'react-router-dom';

const EditBill = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getBillById(id)
      .then(res => setForm(res.data))
      .catch(() => setError('Failed to load bill'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await updateBill(id, form);
      navigate('/bills');
    } catch {
      setError('Failed to update bill');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!form) return null;

  return (
    <div>
      <h2>Edit Bill</h2>
      <form onSubmit={handleSubmit}>
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
            value={form.dueDate ? form.dueDate.split('T')[0] : ''}
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
            value={form.description || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default EditBill;
