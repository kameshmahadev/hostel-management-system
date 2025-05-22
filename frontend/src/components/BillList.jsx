import React, { useEffect, useState } from 'react';
import { getAllBills, deleteBill } from '../api/billingApi';
import { useNavigate } from 'react-router-dom';

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadBills = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllBills();
      setBills(res.data);
    } catch (err) {
      setError('Failed to load bills');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      try {
        await deleteBill(id);
        loadBills();
      } catch (err) {
        alert('Failed to delete bill.');
      }
    }
  };

  if (loading) return <p>Loading bills...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Bills</h2>
      <button onClick={() => navigate('/bills/new')}>+ Create New Bill</button>
      <table>
        <thead>
          <tr>
            <th>Resident</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.length === 0 && (
            <tr><td colSpan="5">No bills found.</td></tr>
          )}
          {bills.map(bill => (
            <tr key={bill._id}>
              <td>{bill.resident?.name || 'N/A'}</td>
              <td>${bill.amount}</td>
              <td>{bill.status}</td>
              <td>{bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : 'N/A'}</td>
              <td>
                <button onClick={() => navigate(`/bills/edit/${bill._id}`)}>Edit</button>
                <button onClick={() => handleDelete(bill._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillList;
