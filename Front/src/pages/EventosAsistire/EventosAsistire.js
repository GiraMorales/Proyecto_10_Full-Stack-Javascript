import './EventosAsistire.css';
import { obtenerEventosDelUsuario } from '../../services/eventosService';

export const EventosAsistire = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.userName) {
    main.innerHTML = '<p>Debes iniciar sesión para ver tus eventos.</p>';
    return;
  }

  // Obtener todos los eventos con asistentes
  const eventosGuardados = obtenerEventosDelUsuario();

  if (!eventosGuardados.length) {
    main.innerHTML = '<p>No tienes eventos guardados.</p>';
    return;
  }

  const userMessage = document.createElement('h3');
  userMessage.textContent = `Hola, ${user.userName}. Aquí tienes tus eventos:`;
  main.append(userMessage);

  pintarEventos(eventosGuardados, main);
};

const pintarEventos = (eventosGuardados, elementoPadre) => {
  for (const evento of eventosGuardados) {
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
    asistentesLista.innerHTML =
      evento.asistentes.length > 0
        ? evento.asistentes.map((asistente) => `<li>${asistente}</li>`).join('')
        : '<li>Aún no hay asistentes.</li>';

    divEvento.append(h2, imagen, p, tituloAsistentes, asistentesLista);
    elementoPadre.append(divEvento);
  }
};

const toggleEventoAsistire = (evento) => {
  if (!evento || !evento._id) {
    console.error('El evento no es válido:', evento);
    return;
  }

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.userName) {
    console.warn('❌ Usuario no válido o no logueado.');
    return;
  }

  const claveUsuario = `eventosAsistire_${user.userName}`;
  let eventosUsuario = JSON.parse(localStorage.getItem(claveUsuario)) || [];

  const eventoIndex = eventosUsuario.findIndex((e) => e._id === evento._id);

  if (eventoIndex !== -1) {
    // Si el evento ya está guardado, quitarlo
    eventosUsuario.splice(eventoIndex, 1);
  } else {
    // Si no está guardado, agregarlo
    eventosUsuario.push({
      _id: evento._id,
      titulo: evento.titulo,
      portada: evento.portada,
      fecha: evento.fecha,
      ubicacion: evento.ubicacion
    });
  }

  // Si quedan eventos, guardar la lista; si no, eliminar la clave
  if (eventosUsuario.length > 0) {
    localStorage.setItem(claveUsuario, JSON.stringify(eventosUsuario));
  } else {
    localStorage.removeItem(claveUsuario);
  }
};
