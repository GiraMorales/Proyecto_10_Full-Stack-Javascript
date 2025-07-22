import './EventosAsistentes.css';
import { obtenerEventos } from '../../services/eventosService';

export const EventosAsistentes = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const contenedor = document.createElement('div');
  contenedor.classList.add('eventos-asistentes-contenedor');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Eventos y Asistentes';
  titulo.classList.add('titulo-eventos-asistentes');
  contenedor.appendChild(titulo);

  try {
    const eventos = await obtenerEventos();

    // Filtrar solo los eventos que tengan al menos un asistente
    const eventosConAsistentes = eventos.filter(
      (evento) => evento.relatedUsers && evento.relatedUsers.length > 0
    );

    if (eventosConAsistentes.length === 0) {
      const mensaje = document.createElement('p');
      mensaje.textContent = 'No hay eventos con asistentes.';
      contenedor.appendChild(mensaje);
      main.appendChild(contenedor);
      return;
    }

    eventosConAsistentes.forEach((evento) => {
      const divEvento = document.createElement('div');
      divEvento.classList.add('evento');

      const nombresAsistentes = evento.relatedUsers
        .map((user) => (user.userName ? user.userName : user)) // si viene populado, usar userName, si no, mostrar el ID
        .join(', ');

      divEvento.innerHTML = `
        <h4>${evento.titulo}</h4>
        <p>Fecha: ${evento.fecha} | Ubicación: ${evento.ubicacion}</p>
        <p><strong>Asistentes:</strong> ${nombresAsistentes}</p>
      `;

      contenedor.appendChild(divEvento);
    });

    main.appendChild(contenedor);
  } catch (error) {
    console.error('Error al cargar eventos:', error);
    const mensaje = document.createElement('p');
    mensaje.textContent = 'Error al cargar los eventos.';
    contenedor.appendChild(mensaje);
    main.appendChild(contenedor);
  }
};
