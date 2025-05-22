import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/bills';

export const getAllBills = () => axios.get(BASE_URL);
export const getBillById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createBill = (billData) => axios.post(BASE_URL, billData);
export const updateBill = (id, billData) => axios.put(`${BASE_URL}/${id}`, billData);
export const deleteBill = (id) => axios.delete(`${BASE_URL}/${id}`);
