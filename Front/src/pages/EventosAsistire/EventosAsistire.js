import './EventosAsistire.css';

export const EventosAsistire = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.userName) {
    main.innerHTML = '<p>Debes iniciar sesión para ver tus eventos.</p>';
    return;
  }

  // Obtener todos los eventos con asistentes
  const todosLosEventos = obtenerEventosConAsistentes();

  // Filtrar solo los eventos a los que va el usuario actual
  const eventosGuardados = todosLosEventos.filter((evento) =>
    evento.asistentes.includes(user.userName)
  );

  if (!eventosGuardados.length) {
    main.innerHTML = '<p>No tienes eventos guardados.</p>';
    return;
  }

  const userMessage = document.createElement('h3');
  userMessage.textContent = `Hola, ${user.userName}. Aquí tienes tus eventos:`;
  main.append(userMessage);

  pintarEventos(eventosGuardados, main);
};

// 🔁 Agrupa asistentes por evento leyendo todas las claves del localStorage
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

  // Convertir los sets en arrays
  return Object.values(eventosPorId).map((evento) => ({
    ...evento,
    asistentes: Array.from(evento.asistentes)
  }));
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

    const asistentesLista = document.createElement('ul');
    asistentesLista.classList.add('asistentes');
    asistentesLista.innerHTML =
      evento.asistentes.length > 0
        ? evento.asistentes.map((asistente) => `<li>${asistente}</li>`).join('')
        : '<li>Aún no hay asistentes.</li>';

    divEvento.append(h2, imagen, p, asistentesLista);
    elementoPadre.append(divEvento);
  }
};

const toggleEventoAsistire = (evento) => {
  if (!evento || !evento._id) {
    console.error('El evento no es válido:', evento);
    return;
  }

  let eventosAsistire =
    JSON.parse(localStorage.getItem('eventosAsistire')) || [];
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.userName) {
    console.warn('❌ Usuario no válido o no logueado.');
    return;
  }

  const eventoIndex = eventosAsistire.findIndex((e) => e._id === evento._id);

  if (eventoIndex !== -1) {
    // Si el evento ya está guardado, agregar o eliminar al usuario de la lista de asistentes
    const asistentes = eventosAsistire[eventoIndex].asistentes || [];
    const userIndex = asistentes.indexOf(user.userName);

    if (userIndex !== -1) {
      // Si el usuario ya está en la lista, eliminarlo
      asistentes.splice(userIndex, 1);
    } else {
      // Si el usuario no está en la lista, agregarlo
      asistentes.push(user.userName);
    }

    // Actualizar la lista de asistentes en el evento
    eventosAsistire[eventoIndex].asistentes = asistentes;

    // Si no quedan asistentes, elimina el evento
    if (asistentes.length === 0) {
      eventosAsistire.splice(eventoIndex, 1);
    }
  } else {
    // Si no está guardado, agregarlo con el usuario como asistente
    eventosAsistire.push({
      _id: evento._id,
      titulo: evento.titulo,
      portada: evento.portada,
      fecha: evento.fecha,
      ubicacion: evento.ubicacion,
      asistentes: [user.userName] // Agregar el usuario actual como asistente
    });
  }

  // Guardar la lista actualizada en localStorage
  localStorage.setItem('eventosAsistire', JSON.stringify(eventosAsistire));
};
