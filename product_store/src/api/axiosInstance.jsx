import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',

  //timeout implementation
  
  headers: {
    'Content-Type': 'application/json',
     withCredentials: true,
  },
});

export default axiosInstance;