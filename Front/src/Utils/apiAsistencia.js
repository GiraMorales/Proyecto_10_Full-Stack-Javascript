// apiEventos.js (o dentro del archivo donde tengas tus utilidades API)

export const asistirEventoAPI = (eventoId) => {
  return apiRequest(`events/${eventoId}/asistir`, {
    method: 'POST'
  });
};

export const cancelarAsistenciaEventoAPI = (eventoId) => {
  return apiRequest(`events/${eventoId}/asistir`, {
    method: 'DELETE'
  });
};
