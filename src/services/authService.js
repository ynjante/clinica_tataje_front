import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'auth';


/* ========================= LOGIN ========================= */

// Iniciar sesión como personal clínico
export const loginPersonalClinico = async (credenciales) => {
  const response = await axios.post(`${API_URL}/Login/Personal_clinico`, credenciales);
  return response.data; // Retorna { token, usuario } o como lo tengas definido
};

// Iniciar sesión como paciente
export const loginPaciente = async (credenciales) => {
  const response = await axios.post(`${API_URL}/Login/Paciente`, credenciales);
  return response.data;
};
