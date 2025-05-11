import React, { useEffect, useState } from "react";
import axios from "axios";

const Billing = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/invoices")
      .then(res => setInvoices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Billing</h1>
      <div className="grid grid-cols-3 gap-4">
        {invoices.map(invoice => (
          <div key={invoice._id} className="border p-4 rounded-lg">
            <p>Amount: ${invoice.amount}</p>
            <p>Status: {invoice.paymentStatus}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">
              Pay Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Billing;
