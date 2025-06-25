import { Header } from '../../components/Header/Header';
import './Home.css';

export const Home = async () => {
  const main = document.querySelector('main');
  if (!main) {
    console.error('❌ ERROR: <main> no encontrado en el DOM');
    return;
  }

  main.innerHTML = '';
  Header(); // Llamada a Header para que se ejecute al cargar la página

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
      const contenedorVacio = document.createElement('div');
      contenedorVacio.classList.add('no-eventos');
      contenedorVacio.innerHTML = `
        <p>No hay eventos disponibles.</p>
        <button id="reloadEvents">Recargar eventos</button>`;

      // main.appendChild(contenedorVacio);
      document.getElementById('reloadEvents').addEventListener('click', () => {
        Home(); // Llamada para recargar los eventos
      });
      return;
    } else {
      console.log('Eventos disponibles:', eventos.length);
    }

    // Verificar si el usuario es administrador y mostrar opciones
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.rol === 'admin') {
      // Aquí podrías mostrar botones extra para admins
    }

    pintarEventos(eventos, main);
  } catch (error) {
    console.error('❌ Error al obtener eventos:', error);
    main.innerHTML = `<p>Error al cargar los eventos: ${error.message}</p>`;
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

    const divTitulo = document.createElement('div');
    divTitulo.classList.add('evento-titulo');
    const h2 = document.createElement('h2');
    h2.textContent = evento.titulo;
    divTitulo.appendChild(h2);

    const divDescripcion = document.createElement('div');
    divDescripcion.classList.add('evento-descripcion');

    const imagen = document.createElement('img');
    imagen.src = evento.portada;
    imagen.alt = `Imagen de ${evento.titulo}`;

    const p = document.createElement('p');
    p.textContent = evento.descripcion;
    divDescripcion.append(imagen, p);

    const divInfo = document.createElement('div');
    divInfo.classList.add('evento-info');
    divInfo.innerHTML = `
      <p><strong>Fecha:</strong> ${evento.fecha}</p>
      <p><strong>Ubicación:</strong> ${evento.ubicacion}</p>
    `;

    const divBoton = document.createElement('div');
    divBoton.classList.add('evento-boton');

    if (token) {
      const btnAsistir = document.createElement('button');
      actualizarBotonAsistir(evento, btnAsistir);

      btnAsistir.addEventListener('click', () => {
        toggleEventoAsistire(evento);
        actualizarBotonAsistir(evento, btnAsistir);
      });

      divBoton.appendChild(btnAsistir);
    }

    divEvento.append(divTitulo, divDescripcion, divInfo, divBoton);
    elementoPadre.append(divEvento);
  }

  const divEvento = document.createElement('div');
  divEvento.classList.add('evento');
};

const actualizarBotonAsistir = (evento, boton) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.userName) return;

  const eventosGuardados =
    JSON.parse(localStorage.getItem(`eventosAsistire_${user.userName}`)) || [];
  const asistiendo = eventosGuardados.some((e) => e._id === evento._id);
  boton.textContent = asistiendo ? 'Voy a ir' : 'No voy';
  boton.classList.toggle('activo', asistiendo);
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
};
