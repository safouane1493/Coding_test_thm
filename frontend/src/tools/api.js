import axios from 'axios';

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = '/';
axios.interceptors.request.use(
  (request) => {
    request.headers['Content-Type'] = 'application/json';
    request.headers.Accept = 'application/json';
    if (!request.headers.Authorization) {
      const token = localStorage ? localStorage.getItem('token') : '';
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }
    return request;
  },
  (error) => Promise.reject(error),
);

export default axios;
