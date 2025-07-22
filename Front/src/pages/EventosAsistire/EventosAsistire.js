import './EventosAsistire.css';
import { obtenerEventos } from '../../services/eventosService';
import {
  asistirEventoAPI,
  cancelarAsistenciaEventoAPI
} from '../../Utils/apiAsistencia';

export const EventosAsistire = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user._id) {
    main.innerHTML = '<p>Debes iniciar sesión para ver tus eventos.</p>';
    return;
  }

  const eventosGuardados = await obtenerEventos();

  const eventosDelUsuario = eventosGuardados.filter((evento) =>
    evento.asistentes.some((asistente) => {
      // Asistente puede ser ObjectId, string o un objeto con _id
      if (!asistente) return false;
      if (typeof asistente === 'string') {
        return asistente === user._id;
      }
      if (typeof asistente === 'object') {
        if (asistente._id) {
          return asistente._id.toString() === user._id.toString();
        }
        // En caso asistente sea ObjectId (no string)
        return asistente.toString() === user._id.toString();
      }
      return false;
    })
  );

  const userMessage = document.createElement('h3');
  userMessage.textContent = `Hola, ${user.userName}. Aquí tienes tus eventos:`;
  main.append(userMessage);

  pintarEventos(eventosDelUsuario, main);
};

const pintarEventos = (eventosDelUsuario, elementoPadre) => {
  for (const evento of eventosDelUsuario) {
    const divEvento = document.createElement('div');
    divEvento.classList.add('evento');

    const h2 = document.createElement('h2');
    h2.textContent = evento.titulo;

    const imagen = document.createElement('img');
    imagen.src = evento.portada;
    imagen.alt = `Imagen de ${evento.titulo}`;

    const p = document.createElement('p');
    p.classList.add('descripcion');
    p.textContent = `Fecha: ${evento.fecha} | Ubicación: ${evento.ubicacion}`;

    const tituloAsistentes = document.createElement('h4');
    tituloAsistentes.textContent = 'Lista de asistentes:';

    const asistentesLista = document.createElement('ul');
    asistentesLista.classList.add('asistentes');

    if (evento.asistentes && evento.asistentes.length > 0) {
      asistentesLista.innerHTML =
        evento.asistentes.length > 0
          ? evento.asistentes
              .map((asistente) => {
                if (!asistente) return '';
                if (typeof asistente === 'string')
                  return `<li>${asistente}</li>`;
                if (typeof asistente === 'object') {
                  return `<li>${
                    asistente.userName ||
                    asistente.email ||
                    asistente._id ||
                    'Sin nombre'
                  }</li>`;
                }
                return '';
              })
              .join('')
          : '<li>Aún no hay asistentes.</li>';
    }

    divEvento.append(h2, imagen, p, tituloAsistentes, asistentesLista);
    elementoPadre.append(divEvento);
  }
};

const toggleEventoAsistire = async (evento) => {
  if (!evento || !evento._id) {
    console.error('El evento no es válido:', evento);
    return;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user._id) {
    console.warn('❌ Usuario no válido o no logueado.');
    return;
  }

  try {
    const yaEstoyApuntado = evento.asistentes?.some(
      (asistente) =>
        (typeof asistente === 'string' && asistente === user._id) ||
        (asistente._id && asistente._id === user._id)
    );

    if (yaEstoyApuntado) {
      await cancelarAsistenciaEventoAPI(evento._id);
      alert(`Has cancelado tu asistencia al evento "${evento.titulo}"`);
    } else {
      await asistirEventoAPI(evento._id);
      alert(`Te has apuntado al evento "${evento.titulo}"`);
    }

    EventosAsistire();
  } catch (error) {
    console.error('Error actualizando asistencia en backend:', error);
    alert('Error al actualizar tu asistencia. Intenta más tarde.');
  }
};
