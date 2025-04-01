import './EventosAsistire.css';

export const EventosAsistire = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const user = JSON.parse(localStorage.getItem('user'));
  const eventosGuardados =
    JSON.parse(localStorage.getItem('eventosAsistire')) || [];

  console.log('Eventos guardados:', eventosGuardados);

  if (!eventosGuardados.length) {
    main.innerHTML = '<p>No tienes eventos guardados.</p>';
    return;
  }

  if (user && user.userName) {
    const userMessage = document.createElement('h3');
    userMessage.textContent = `Hola, ${user.userName}. Aquí tienes tus eventos:`;
    main.append(userMessage);
  }

  pintarEventos(eventosGuardados, main);
};

const pintarEventos = (eventosGuardados, elementoPadre) => {
  console.log('✅ Mostrando eventos guardados:', eventosGuardados);
  // elementoPadre.innerHTML = ''; // Limpiar el contenido previo

  if (eventosGuardados.length === 0) {
    elementoPadre.innerHTML =
      '<p>No tienes eventos guardados para mostrar.</p>';
    return;
  }

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

    // Mostrar lista de asistentes
    const asistentesLista = document.createElement('ul');
    asistentesLista.classList.add('asistentes');
    asistentesLista.innerHTML =
      evento.asistentes && evento.asistentes.length > 0
        ? evento.asistentes.map((asistente) => `<li>${asistente}</li>`).join('')
        : '<li>Aún no hay asistentes.</li>';

    divEvento.append(h2, imagen, p, asistentesLista);
    elementoPadre.append(divEvento);
  }
};
