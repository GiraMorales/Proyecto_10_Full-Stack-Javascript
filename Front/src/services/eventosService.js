export const obtenerEventos = async () => {
  const response = await fetch('http://localhost:3000/api/v1/eventos');
  if (!response.ok) throw new Error('No se pudieron cargar los eventos');
  return await response.json();
};

export const obtenerEventosDelUsuario = async () => {
  const eventos = await obtenerEventos();
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return [];

  return eventos.filter((evento) =>
    evento.relatedUsers.some(
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

  const url = yaEstoyApuntado
    ? `http://localhost:3000/api/v1/eventos/cancelar-asistir/${evento._id}`
    : `http://localhost:3000/api/v1/eventos/asistir/${evento._id}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al cambiar asistencia');

    const data = await response.json();

    alert(
      yaEstoyApuntado
        ? 'Has cancelado tu asistencia al evento'
        : 'Te has apuntado al evento'
    );

    return data.evento; // <- Devolvemos el evento actualizado
  } catch (error) {
    console.error('Error en toggleEventoAsistire:', error);
    alert('Error al cambiar tu estado de asistencia');
    return null;
  }
};
