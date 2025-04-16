import './Home.css';

//'http://localhost:3000/api/v1/users/eventos'
export const Home = async () => {
  console.log('✅ Home() ejecutado');

  const main = document.querySelector('main');
  if (!main) {
    console.error('❌ ERROR: <main> no encontrado en el DOM');
    return;
  }

  main.innerHTML = '';

  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch('http://localhost:3000/api/v1/eventos', {
      headers
    });

    if (!res.ok) throw new Error(`❌ Error en la solicitud: ${res.status}`);

    const eventos = await res.json();
    console.log('eventos recibidos:', eventos);

    if (!Array.isArray(eventos) || eventos.length === 0) {
      main.innerHTML = `
        <p>No hay eventos disponibles.</p>
        <button id="reloadEvents">Recargar eventos</button>
      `;

      document.getElementById('reloadEvents').addEventListener('click', () => {
        Home(); // Llamada para recargar los eventos
      });
      return;
    }

    // Verificar si el usuario es administrador y mostrar opciones
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.rol === 'admin') {
      mostrarOpcionesAdmin();
    }

    pintarEventos(eventos, main);
  } catch (error) {
    console.error('❌ Error al obtener eventos:', error);
    main.innerHTML =
      '<p>Error al cargar los eventos. Intenta de nuevo más tarde.</p>';
  }
};

const pintarEventos = (eventos, elementoPadre) => {
  console.log('✅ Ejecutando pintarEventos()', eventos);

  const token = localStorage.getItem('token'); // Verificar si el usuario está autenticado
  const eventosGuardados =
    JSON.parse(localStorage.getItem('eventosAsistire')) || [];
  console.log('eventosGuardados:', eventosGuardados);

  for (const evento of eventos) {
    if (
      !evento.titulo ||
      !evento.portada ||
      !evento.descripcion ||
      !evento._id
    ) {
      console.warn('❌ Evento inválido:', evento);
      continue;
    }

    const divEvento = document.createElement('div');
    divEvento.classList.add('evento');

    const h2 = document.createElement('h2');
    h2.textContent = evento.titulo;

    const imagen = document.createElement('img');
    imagen.src = evento.portada;
    imagen.alt = `Imagen de ${evento.titulo}`;

    const p = document.createElement('p');
    p.classList.add('descripcion');
    p.textContent = evento.descripcion;

    const info = document.createElement('div');
    info.classList.add('info');
    info.innerHTML = `<p>Fecha: ${evento.fecha}</p>
    <p>Ubicación: ${evento.ubicacion}</p>`;

    divEvento.append(h2, p, info, imagen);

    if (token) {
      const btnAsistir = document.createElement('button');
      actualizarBotonAsistir(evento, btnAsistir);

      btnAsistir.addEventListener('click', () => {
        toggleEventoAsistire(evento);
        actualizarBotonAsistir(evento, btnAsistir);
      });

      divEvento.append(btnAsistir);
    }

    elementoPadre.append(divEvento);
  }
};

const actualizarBotonAsistir = (evento, boton) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.userName) return;

  const eventosGuardados =
    JSON.parse(localStorage.getItem(`eventosAsistire_${user.userName}`)) || [];
  const asistiendo = eventosGuardados.some((e) => e._id === evento._id);
  boton.textContent = asistiendo ? 'No voy' : 'Voy a ir';
  boton.classList.toggle('activo', asistiendo);
};
// ✅ Alterna la asistencia a eventos en localStorage
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

  const key = `eventosAsistire_${user.userName}`;
  let eventosAsistire = JSON.parse(localStorage.getItem(key)) || [];

  const eventoIndex = eventosAsistire.findIndex((e) => e._id === evento._id);

  if (eventoIndex !== -1) {
    eventosAsistire.splice(eventoIndex, 1);
  } else {
    eventosAsistire.push({
      _id: evento._id,
      titulo: evento.titulo,
      portada: evento.portada,
      fecha: evento.fecha,
      ubicacion: evento.ubicacion,
      asistentes: [user.userName]
    });
  }

  localStorage.setItem(key, JSON.stringify(eventosAsistire));
  console.log(
    `✅ Evento actualizado en localStorage para ${user.userName}:`,
    eventosAsistire
  );

  if (user.rol === 'admin') {
    mostrarOpcionesAdmin?.(); // Usamos ?. para evitar error si no está definida
  }
};

// Mostrar opciones de administrador
function mostrarOpcionesAdmin() {
  const nav = document.querySelector('nav'); // Asegúrate de que el <nav> existe
  if (!nav) {
    console.warn('❌ No se encontró <nav> en el DOM');
    return;
  }

  // Crear los enlaces del panel de administrador
  const eventosAdmin = document.createElement('a');
  eventosAdmin.href = '#/eventos-asistentes';
  eventosAdmin.textContent = 'Eventos y Asistentes';

  const crearEvento = document.createElement('a');
  crearEvento.href = '#/crear-evento';
  crearEvento.textContent = 'Crear Evento';

  // Agregar los enlaces al <nav>
  nav.append(eventosAdmin, crearEvento);
}
