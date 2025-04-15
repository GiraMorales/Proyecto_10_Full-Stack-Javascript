export const EventosAsistentes = () => {
  const main = document.querySelector('main');
  main.innerHTML = '<h2>Eventos y Asistentes</h2>';

  const eventosConAsistentes = obtenerEventosConAsistentes();

  if (eventosConAsistentes.length === 0) {
    main.innerHTML += '<p>No hay eventos con asistentes.</p>';
    return;
  }

  eventosConAsistentes.forEach((evento) => {
    if (evento.asistentes && evento.asistentes.length > 0) {
      const divEvento = document.createElement('div');
      divEvento.classList.add('evento');

      divEvento.innerHTML = `
        <h3>${evento.titulo}</h3>
        <p>Fecha: ${evento.fecha} | Ubicación: ${evento.ubicacion}</p>
        <p><strong>Asistentes:</strong> ${evento.asistentes.join(', ')}</p>
      `;

      main.appendChild(divEvento);
    }
  });
};

// 🔁 Reutiliza la misma lógica que en EventosAsistire.js
const obtenerEventosConAsistentes = () => {
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
