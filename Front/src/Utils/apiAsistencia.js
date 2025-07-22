// apiEventos.js (o dentro del archivo donde tengas tus utilidades API)
import { apiRequest } from './apiRequest'; // ajusta la ruta según tu estructura

export const asistirEventoAPI = (eventoId) => {
  return apiRequest(`eventos/asistir/${eventoId}`, { method: 'POST' });
};

export const cancelarAsistenciaEventoAPI = (eventoId) => {
  return apiRequest(`eventos/cancelar-asistir/${eventoId}`, { method: 'POST' });
};
