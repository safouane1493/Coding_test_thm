import axios from '../tools/api';

const API = '/api';
const AUTH = `${API}/auth`;
const USER = `${API}/user`;

export const getUserInfo = ({ email, password }) => axios.post(`${AUTH}/login`, { email, password });

export const getUserById = (id) => axios.get(`${USER}/${id}`);

export const userUpdateProfile = (data, id) => axios.put(`${USER}/${id}`, data);
