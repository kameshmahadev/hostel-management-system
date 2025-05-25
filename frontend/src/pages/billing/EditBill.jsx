// src/pages/billing/EditBill.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBill = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/bills/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        reset(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch bill details");
      }
    };
    fetchBill();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/bills/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Bill updated successfully");
      navigate("/billing");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update bill");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Bill</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">User ID</label>
          <input
            type="text"
            {...register("userId", { required: "User ID is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            step="0.01"
            {...register("amount", { required: "Amount is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            {...register("dueDate", { required: "Due date is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Update Bill
        </button>
      </form>
    </div>
  );
};

export default EditBill;
