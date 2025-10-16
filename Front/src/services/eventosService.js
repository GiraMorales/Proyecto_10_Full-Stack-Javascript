export const obtenerEventos = async () => {
  return await apiRequest('api/v1/eventos', { method: 'GET' });
};

export const obtenerEventosDelUsuario = async () => {
  const eventos = await obtenerEventos();
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return [];

  return eventos.filter((evento) =>
    evento.relatedUsers?.some(
      (userId) => userId === user._id || userId._id === user._id
    )
  );
};

export const toggleEventoAsistire = async (evento, userName) => {
  if (!evento || !evento._id || !userName) return null;

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Debes iniciar sesión para apuntarte a eventos.');
    return null;
  }

  const yaEstoyApuntado = evento.relatedUsers?.some(
    (user) => user._id === userName || user === userName
  );

  const endpoint = yaEstoyApuntado
    ? `api/v1/eventos/cancelar-asistir/${evento._id}`
    : `api/v1/eventos/asistir/${evento._id}`;

  try {
    const data = await apiRequest(endpoint, { method: 'POST' });

    alert(
      yaEstoyApuntado
        ? 'Has cancelado tu asistencia al evento'
        : 'Te has apuntado al evento'
    );

    return data.evento; // Evento actualizado
  } catch (error) {
    console.error('Error en toggleEventoAsistire:', error);
    alert('Error al cambiar tu estado de asistencia');
    return null;
  }
};
