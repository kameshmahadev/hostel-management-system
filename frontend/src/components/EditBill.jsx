import React, { useEffect, useState } from 'react';
import { getBillById, updateBill } from '../api/billingApi';
import { useNavigate, useParams } from 'react-router-dom';

const EditBill = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBillById(id).then(res => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBill(id, form);
    navigate('/bills');
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Bill</h2>
      <form onSubmit={handleSubmit}>
        <label>Amount: <input name="amount" value={form.amount} onChange={handleChange} /></label>
        <label>Due Date: <input name="dueDate" type="date" value={form.dueDate.split('T')[0]} onChange={handleChange} /></label>
        <label>Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Unpaid</option>
            <option>Paid</option>
          </select>
        </label>
        <label>Description: <textarea name="description" value={form.description} onChange={handleChange} /></label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditBill;
