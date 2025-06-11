import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Revenue: 4000, Expenses: 2400 },
  { name: 'Feb', Revenue: 3000, Expenses: 1398 },
  { name: 'Mar', Revenue: 2000, Expenses: 9800 },
  { name: 'Apr', Revenue: 2780, Expenses: 3908 },
  { name: 'May', Revenue: 1890, Expenses: 4800 },  { name: 'Jun', Revenue: 2390, Expenses: 3800 },
  { name: 'Jul', Revenue: 3490, Expenses: 4300 }
];

const Reports = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Financial Reports</h2>
      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Revenue" fill="#4f46e5" />
            <Bar dataKey="Expenses" fill="#f59e42" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Reports;
