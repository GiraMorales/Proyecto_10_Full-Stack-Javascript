import './Home.css';

//'http://localhost:3000/api/v1/users/eventos'
export const Home = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch('http://localhost:3000/api/v1/eventos', {
      headers
    });

    const eventos = await res.json();
    console.log(eventos);

    pintarEventos(eventos, main);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    main.innerHTML =
      '<p>Error al cargar los eventos. Intenta de nuevo más tarde.</p>';
  }
};

// const token = localStorage.getItem('token');

// if (!token) {
//   console.warn('Usuario no logueado. Mostrando mensaje de acceso.');
//   main.innerHTML = '<p>Bienvenido a Home. Inicia sesión para ver eventos.</p>';
//   return; // 🔹 No hacemos la petición al backend si no hay token
// }

//   const res = await fetch('http://localhost:3000/api/v1/eventos', {
//     headers: {
//       Authorization: `Bearer ${token}` // 👈 Mandamos el token al backend
//     }
//   });

//   if (res.status === 401) {
//     console.error('No autorizado. Debes iniciar sesión.');
//     main.innerHTML =
//       '<p>No tienes permisos para ver esta página. Inicia sesión.</p>';
//     return;
//   }
//   const eventos = await res.json();
//   console.log(eventos);

//   pintarEventos(eventos, main);
// };

const pintarEventos = (eventos, elementoPadre) => {
  const token = localStorage.getItem('token'); // Verificar si el usuario está autenticado
  const eventosGuardados =
    JSON.parse(localStorage.getItem('eventosAsistire')) || [];

  for (const evento of eventos) {
    const divEvento = document.createElement('div');
    const h2 = document.createElement('h2');
    const imagen = document.createElement('img');
    const p = document.createElement('p');
    const info = document.createElement('div');

    divEvento.classList.add('evento');
    p.classList.add('descripcion');
    info.classList.add('info');

    h2.textContent = evento.titulo;
    imagen.src = evento.portada;
    p.textContent = evento.descripcion;

    info.innerHTML = `<p> Fecha: ${evento.fecha}</p>
    <p>Ubicación: ${evento.ubicacion}</p>`;

    divEvento.append(h2, p, info, imagen);

    if (token) {
      const btnAsistir = document.createElement('button');
      btnAsistir.textContent = eventosGuardados.includes(evento.id)
        ? 'Ya vas a ir'
        : 'Voy a ir';
      btnAsistir.disabled = eventosGuardados.includes(evento.id);

      btnAsistir.addEventListener('click', () => {
        agregarEventoAAsistire(evento);
        btnAsistir.textContent = 'Ya vas a ir';
        btnAsistir.disabled = true;
      });

      divEvento.append(btnAsistir);
    }

    elementoPadre.append(divEvento);
  }
};

const agregarEventoAAsistire = (evento) => {
  let eventosAsistire =
    JSON.parse(localStorage.getItem('eventosAsistire')) || [];
  if (!eventosAsistire.includes(evento.id)) {
    eventosAsistire.push(evento.id);
    localStorage.setItem('eventosAsistire', JSON.stringify(eventosAsistire));
  }
};
