import './Home.css';

//'http://localhost:3000/api/v1/users/eventos'
export const Home = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:3000/api/v1/eventos', {
    headers: {
      Authorization: `Bearer ${token}` // 👈 Mandamos el token al backend
    }
  });

  if (res.status === 401) {
    console.error('No autorizado. Debes iniciar sesión.');
    main.innerHTML =
      '<p>No tienes permisos para ver esta página. Inicia sesión.</p>';
    return;
  }
  const eventos = await res.json();
  console.log(eventos);

  pintarEventos(eventos, main);
};

const pintarEventos = (eventos, elementoPadre) => {
  // const divEventos = document.createElement('div');
  for (const evento of eventos) {
    const divEvento = document.createElement('div');
    const h2 = document.createElement('h2');
    const imagen = document.createElement('img');
    const p = document.createElement('p');
    const info = document.createElement('div');

    divEvento.classList.add('evento');
    // divEventos.classList.add('eventos');
    p.classList.add('descripcion');
    info.classList.add('info');

    h2.textContent = evento.titulo;
    imagen.src = evento.portada;
    p.textContent = evento.descripcion;

    info.innerHTML = `<p> Fecha: ${evento.fecha}</p>
    <p>Ubicación: ${evento.ubicacion}</p>
    <p>Lista de asistentes: ${evento.relatedUsers
      .map((user) => `${user.userName} (${user.email})`)
      .join(', ')}</p>`;

    divEvento.append(h2, imagen, p, info);
    elementoPadre.append(divEvento);
    // divEventos.append(divEvento);
  }
  // elementoPadre.append(divEventos);
};
