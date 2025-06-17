export const obtenerEventosConAsistentes = () => {
  const eventosPorId = {};

  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);

    if (clave.startsWith('eventosAsistire_')) {
      const eventosUsuario = JSON.parse(localStorage.getItem(clave)) || [];
      const userName = clave.replace('eventosAsistire_', '');

      for (const evento of eventosUsuario) {
        if (!eventosPorId[evento._id]) {
          eventosPorId[evento._id] = {
            ...evento,
            asistentes: new Set()
          };
        }
        eventosPorId[evento._id].asistentes.add(userName);
      }
    }
  }

  return Object.values(eventosPorId).map((evento) => ({
    ...evento,
    asistentes: Array.from(evento.asistentes)
  }));
};

export const obtenerEventosDelUsuario = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.userName) return [];

  const clave = `eventosAsistire_${user.userName}`;
  return JSON.parse(localStorage.getItem(clave)) || [];
};

export const toggleEventoAsistire = (evento, userName) => {
  if (!evento || !evento._id || !userName) return;

  const claveUsuario = `eventosAsistire_${userName}`;
  let eventosUsuario = JSON.parse(localStorage.getItem(claveUsuario)) || [];

  const index = eventosUsuario.findIndex((e) => e._id === evento._id);

  if (index !== -1) {
    eventosUsuario.splice(index, 1);
  } else {
    eventosUsuario.push({
      _id: evento._id,
      titulo: evento.titulo,
      portada: evento.portada,
      fecha: evento.fecha,
      ubicacion: evento.ubicacion
    });
  }

  if (eventosUsuario.length > 0) {
    localStorage.setItem(claveUsuario, JSON.stringify(eventosUsuario));
  } else {
    localStorage.removeItem(claveUsuario);
  }
};
