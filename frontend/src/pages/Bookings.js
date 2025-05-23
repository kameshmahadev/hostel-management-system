import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import api from '../service/api';

const Booking = () => {
  const schema = Yup.object().shape({
    room: Yup.string().required('Room ID is required'),
    date: Yup.date()
      .required('Booking date is required')
      .min(new Date(), 'Booking date must be in the future'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      const payload = {
        ...data,
        resident: userId,
      };

      await api.post('/bookings', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Booking successful!');
      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to make the booking.'
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-96"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-4">Book a Room</h2>

        <input
          type="text"
          placeholder="Room ID"
          {...register('room')}
          className={`w-full p-2 mb-1 border rounded ${
            errors.room ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.room && (
          <p className="text-red-500 mb-2 text-sm">{errors.room.message}</p>
        )}

        <input
          type="date"
          {...register('date')}
          className={`w-full p-2 mb-1 border rounded ${
            errors.date ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.date && (
          <p className="text-red-500 mb-2 text-sm">{errors.date.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
