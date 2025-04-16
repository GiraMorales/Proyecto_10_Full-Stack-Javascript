import './EventosAsistentes.css';
export const EventosAsistentes = () => {
  const main = document.querySelector('main');
  main.innerHTML = ''; // Limpiar el contenido del main

  // Crear un contenedor para el título y los eventos
  const contenedor = document.createElement('div');
  contenedor.classList.add('eventos-asistentes-contenedor'); // Clase para el contenedor

  // Crear el título
  const titulo = document.createElement('h2');
  titulo.textContent = 'Eventos y Asistentes';
  titulo.classList.add('titulo-eventos-asistentes'); // Clase para el título

  // Agregar el título al contenedor
  contenedor.appendChild(titulo);

  const eventosConAsistentes = obtenerEventosConAsistentes();

  if (eventosConAsistentes.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'No hay eventos con asistentes.';
    contenedor.appendChild(mensaje);
    main.appendChild(contenedor);
    return;
  }

  eventosConAsistentes.forEach((evento) => {
    if (evento.asistentes && evento.asistentes.length > 0) {
      const divEvento = document.createElement('div');
      divEvento.classList.add('evento');

      divEvento.innerHTML = `
        <h4>${evento.titulo}</h4>
        <p>Fecha: ${evento.fecha} | Ubicación: ${evento.ubicacion}</p>
        <p><strong>Asistentes:</strong> ${evento.asistentes.join(', ')}</p>
      `;

      contenedor.appendChild(divEvento);
    }
  });

  // Agregar el contenedor al main
  main.appendChild(contenedor);
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
