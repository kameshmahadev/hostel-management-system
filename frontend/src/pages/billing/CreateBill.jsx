// src/pages/billing/CreateBill.jsx
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBill = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/bills", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Bill created successfully");
      navigate("/billing");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create bill");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Bill</h2>
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

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create Bill
        </button>
      </form>
    </div>
  );
};

export default CreateBill;
