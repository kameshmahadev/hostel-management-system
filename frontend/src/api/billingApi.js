import API from '../service/api';

const BASE_URL = '/bills';

export const getAllBills = () => API.get(BASE_URL);
export const getBillById = (id) => API.get(`${BASE_URL}/${id}`);
export const createBill = (billData) => API.post(BASE_URL, billData);
export const updateBill = (id, billData) => API.put(`${BASE_URL}/${id}`, billData);
export const deleteBill = (id) => API.delete(`${BASE_URL}/${id}`);
