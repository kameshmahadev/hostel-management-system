import React, { useEffect, useState } from 'react';
import { getAllBills, deleteBill } from '../api/billingApi';
import { useNavigate } from 'react-router-dom';

const BillList = () => {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const res = await getAllBills();
      setBills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      await deleteBill(id);
      loadBills();
    }
  };

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
          {bills.map(bill => (
            <tr key={bill._id}>
              <td>{bill.resident?.name || bill.resident}</td>
              <td>{bill.amount}</td>
              <td>{bill.status}</td>
              <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
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
