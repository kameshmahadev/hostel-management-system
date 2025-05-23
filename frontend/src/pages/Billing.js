import React, { useState, useEffect } from 'react';
import api from '../service/api';
import { toast } from 'react-hot-toast';

const Billing = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/bills', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBills(response.data);
      } catch (error) {
        console.error('Error fetching bills:', error);
        toast.error(
          error.response?.data?.message ||
            'Failed to fetch billing information. Please try again.'
        );
      }
    };

    fetchBills();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Billing</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Resident</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Due Date</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bills.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-600">
                No bills found.
              </td>
            </tr>
          ) : (
            bills.map((bill) => (
              <tr key={bill._id}>
                <td className="border border-gray-300 p-2">
                  {bill.resident?.name || bill.resident || 'N/A'}
                </td>
                <td className="border border-gray-300 p-2">₹{bill.amount}</td>
                <td className="border border-gray-300 p-2">
                  {bill.dueDate
                    ? new Date(bill.dueDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="border border-gray-300 p-2">{bill.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Billing;
