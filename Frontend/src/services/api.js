// src/services/api.js
import axios from 'axios';

// Permite configurar la URL del backend mediante una variable de entorno
const baseURL = process.env.REACT_APP_API_URL || 'https://orbis-seguridad.onrender.com';

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common.Authorization;
  }
};

export const clearAuthToken = () => {
  delete API.defaults.headers.common.Authorization;
};

export default API;
