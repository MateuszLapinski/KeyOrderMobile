import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:5000/api', // dla Android emulatora
  // baseURL: 'https://1234abcd.ngrok.io/api', // dla ngrok/public API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;